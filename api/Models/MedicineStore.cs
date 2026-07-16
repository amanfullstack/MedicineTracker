namespace api.Models;

public class MedicineStore
{
    public List<Medicine> Medicines { get; set; } = new();

    public List<SaleRecord> Sales { get; set; } = new();
}
