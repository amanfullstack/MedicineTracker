using System.Text.Json;
using api.Models;

namespace api.Services;

public class JsonMedicineRepository : IMedicineRepository
{
    private readonly string _storePath;
    private readonly object _syncRoot = new();
    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        WriteIndented = true
    };

    public JsonMedicineRepository(IWebHostEnvironment environment)
    {
        _storePath = Path.Combine(environment.ContentRootPath, "Data", "medicines.json");
    }

    public Task<IReadOnlyList<Medicine>> GetMedicinesAsync(string? search = null)
    {
        lock (_syncRoot)
        {
            var store = LoadStore();
            var medicines = store.Medicines
                .Where(medicine => string.IsNullOrWhiteSpace(search) ||
                    medicine.FullName.Contains(search, StringComparison.OrdinalIgnoreCase))
                .OrderBy(medicine => medicine.FullName)
                .ToList();

            return Task.FromResult((IReadOnlyList<Medicine>)medicines);
        }
    }

    public Task<Medicine?> GetMedicineAsync(Guid id)
    {
        lock (_syncRoot)
        {
            var store = LoadStore();
            return Task.FromResult(store.Medicines.FirstOrDefault(medicine => medicine.Id == id));
        }
    }

    public Task<Medicine> AddMedicineAsync(CreateMedicineRequest request)
    {
        lock (_syncRoot)
        {
            var store = LoadStore();
            var medicine = new Medicine
            {
                Id = Guid.NewGuid(),
                FullName = request.FullName.Trim(),
                Notes = request.Notes.Trim(),
                ExpiryDate = request.ExpiryDate!.Value.Date,
                Quantity = request.Quantity,
                Price = request.Price,
                Brand = request.Brand.Trim()
            };

            store.Medicines.Add(medicine);
            SaveStore(store);
            return Task.FromResult(medicine);
        }
    }

    public Task<SaleRecord> RecordSaleAsync(Guid medicineId, int quantitySold)
    {
        lock (_syncRoot)
        {
            var store = LoadStore();
            var medicine = store.Medicines.FirstOrDefault(item => item.Id == medicineId)
                ?? throw new KeyNotFoundException("Medicine not found.");

            if (quantitySold > medicine.Quantity)
            {
                throw new InvalidOperationException("Requested quantity is greater than stock on hand.");
            }

            medicine.Quantity -= quantitySold;

            var sale = new SaleRecord
            {
                Id = Guid.NewGuid(),
                MedicineId = medicine.Id,
                MedicineName = medicine.FullName,
                QuantitySold = quantitySold,
                UnitPrice = medicine.Price,
                TotalAmount = quantitySold * medicine.Price,
                SoldOn = DateTime.UtcNow
            };

            store.Sales.Add(sale);
            SaveStore(store);
            return Task.FromResult(sale);
        }
    }

    public Task<IReadOnlyList<SaleRecord>> GetSalesAsync()
    {
        lock (_syncRoot)
        {
            var store = LoadStore();
            var sales = store.Sales
                .OrderByDescending(sale => sale.SoldOn)
                .ToList();

            return Task.FromResult((IReadOnlyList<SaleRecord>)sales);
        }
    }

    private MedicineStore LoadStore()
    {
        Directory.CreateDirectory(Path.GetDirectoryName(_storePath)!);

        if (!File.Exists(_storePath))
        {
            var seededStore = CreateSeedStore();
            SaveStore(seededStore);
            return seededStore;
        }

        var json = File.ReadAllText(_storePath);
        return JsonSerializer.Deserialize<MedicineStore>(json, _jsonOptions) ?? new MedicineStore();
    }

    private void SaveStore(MedicineStore store)
    {
        var json = JsonSerializer.Serialize(store, _jsonOptions);
        File.WriteAllText(_storePath, json);
    }

    private static MedicineStore CreateSeedStore()
    {
        var today = DateTime.UtcNow.Date;

        return new MedicineStore
        {
            Medicines = new List<Medicine>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    FullName = "Amoxicillin 500mg Capsules",
                    Notes = "Broad-spectrum antibiotic.",
                    ExpiryDate = today.AddDays(18),
                    Quantity = 8,
                    Price = 12.50m,
                    Brand = "MediCare"
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    FullName = "Paracetamol Tablets",
                    Notes = "For fever and mild pain.",
                    ExpiryDate = today.AddDays(90),
                    Quantity = 42,
                    Price = 4.75m,
                    Brand = "HealthPlus"
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    FullName = "Cough Syrup 100ml",
                    Notes = "Sugar-free syrup.",
                    ExpiryDate = today.AddDays(12),
                    Quantity = 6,
                    Price = 8.99m,
                    Brand = "PharmaCare"
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    FullName = "Vitamin D3 Capsules",
                    Notes = "Daily supplement.",
                    ExpiryDate = today.AddDays(210),
                    Quantity = 15,
                    Price = 19.95m,
                    Brand = "SunWell"
                }
            }
        };
    }
}
