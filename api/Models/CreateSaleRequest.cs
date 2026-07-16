using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class CreateSaleRequest
{
    [Range(1, int.MaxValue)]
    public int QuantitySold { get; set; }
}
