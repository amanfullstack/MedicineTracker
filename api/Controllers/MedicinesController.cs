using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicinesController : ControllerBase
{
    private readonly IMedicineRepository _medicineRepository;

    public MedicinesController(IMedicineRepository medicineRepository)
    {
        _medicineRepository = medicineRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Medicine>>> GetMedicines([FromQuery] string? search)
    {
        return Ok(await _medicineRepository.GetMedicinesAsync(search));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Medicine>> GetMedicine(Guid id)
    {
        var medicine = await _medicineRepository.GetMedicineAsync(id);
        return medicine is null ? NotFound() : Ok(medicine);
    }

    [HttpPost]
    public async Task<ActionResult<Medicine>> AddMedicine([FromBody] CreateMedicineRequest request)
    {
        if (request.ExpiryDate is null)
        {
            return BadRequest(new { message = "Expiry date is required." });
        }

        var medicine = await _medicineRepository.AddMedicineAsync(request);
        return CreatedAtAction(nameof(GetMedicine), new { id = medicine.Id }, medicine);
    }

    [HttpPost("{id:guid}/sales")]
    public async Task<ActionResult<SaleRecord>> RecordSale(Guid id, [FromBody] CreateSaleRequest request)
    {
        try
        {
            var sale = await _medicineRepository.RecordSaleAsync(id, request.QuantitySold);
            return Ok(sale);
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { message = "Medicine not found." });
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }
}
