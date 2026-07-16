using api.Models;

namespace api.Services;

public interface IMedicineRepository
{
    Task<IReadOnlyList<Medicine>> GetMedicinesAsync(string? search = null);

    Task<Medicine?> GetMedicineAsync(Guid id);

    Task<Medicine> AddMedicineAsync(CreateMedicineRequest request);

    Task<SaleRecord> RecordSaleAsync(Guid medicineId, int quantitySold);

    Task<IReadOnlyList<SaleRecord>> GetSalesAsync();
}
