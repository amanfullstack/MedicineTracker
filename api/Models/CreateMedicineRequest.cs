using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class CreateMedicineRequest
{
    [Required]
    public string FullName { get; set; } = string.Empty;

    public string Notes { get; set; } = string.Empty;

    [Required]
    public DateTime? ExpiryDate { get; set; }

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; }

    [Range(typeof(decimal), "0", "79228162514264337593543950335")]
    public decimal Price { get; set; }

    [Required]
    public string Brand { get; set; } = string.Empty;
}
