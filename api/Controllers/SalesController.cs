using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    private readonly IMedicineRepository _medicineRepository;

    public SalesController(IMedicineRepository medicineRepository)
    {
        _medicineRepository = medicineRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<SaleRecord>>> GetSales()
    {
        return Ok(await _medicineRepository.GetSalesAsync());
    }
}
