using companyManagementAPI.Data;
using companyManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace companyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : Controller
    {
        private readonly CompanyDbContext _companyDbContext;

        public CompanyController(CompanyDbContext companyDbContext)
        {
            _companyDbContext = companyDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCompanies()
        {
            var companies = await _companyDbContext.Companies.ToListAsync();

            return Ok(companies);
        }

        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] Company companyRequest)
        {
            companyRequest.Id = Guid.NewGuid();
            await _companyDbContext.Companies.AddAsync(companyRequest);
            await _companyDbContext.SaveChangesAsync();
            return Ok(companyRequest);

        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCompanyById([FromRoute]Guid id)
        {
            var companyRecord = await _companyDbContext.Companies.FirstOrDefaultAsync(x=> x.Id == id);

            if(companyRecord == null)
            {
                return NotFound();
            }
            return Ok(companyRecord);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCompanyById([FromRoute] Guid id, Company updateCompanyRequest)
        {
            var companyRecord = await _companyDbContext.Companies.FindAsync(id);
            
            if (companyRecord == null)
            {
                return NotFound();
            }

            companyRecord.Name = updateCompanyRequest.Name;
            companyRecord.Industry = updateCompanyRequest.Industry;
            companyRecord.City = updateCompanyRequest.City;
            companyRecord.NumberOfEmployees = updateCompanyRequest.NumberOfEmployees;
            companyRecord.ParentCompanyId = updateCompanyRequest.ParentCompanyId;
            
            await _companyDbContext.SaveChangesAsync();

            return Ok(companyRecord);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCompanyById([FromRoute] Guid id)
        {
            var companyRecord = await _companyDbContext.Companies.FindAsync(id);

            if (companyRecord == null)
            {
                return NotFound();
            }

            _companyDbContext.Remove(companyRecord);
            await _companyDbContext.SaveChangesAsync();

            return Ok(companyRecord);
        }
    }
}
