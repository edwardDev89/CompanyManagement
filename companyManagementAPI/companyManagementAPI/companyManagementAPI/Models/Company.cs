using System.ComponentModel.DataAnnotations;

namespace companyManagementAPI.Models
{
    public class Company
    {
        public Guid Id { get; set; }
        [Key]
        public string Name { get; set; }
        public string Industry { get; set; }
        public int NumberOfEmployees { get; set; }
        public string City { get; set; }

        // Changed type to Guid for representing the foreign key relationship
        public Guid? ParentCompanyId { get; set; }

        // Navigation property representing the parent company
        public Company ParentCompany { get; set; }
        public int Level { get { return ParentCompanyId.HasValue ? 1 : 0; } }
    }
}
