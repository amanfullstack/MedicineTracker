using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Medicine
{
    public Guid Id { get; set; }

    [Required]
    public string FullName { get; set; } = string.Empty;

    public string Notes { get; set; } = string.Empty;

    public DateTime ExpiryDate { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    [Required]
    public string Brand { get; set; } = string.Empty;
}
