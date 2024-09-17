using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace property_management.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("newsletter")]
    public class Newsletter : BaseModel
    {
        [PrimaryKey("id", false)]
        public long Id { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column("name")]
        public string Name { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column("description")]
        public string Description { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column("read_time")]
        public int ReadTime { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.Column("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}
