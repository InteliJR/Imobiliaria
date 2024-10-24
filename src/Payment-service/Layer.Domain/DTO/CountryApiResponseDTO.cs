namespace Layer.Application.Models
{
    public class CountryApiResponseDTO
    {
        public Name Name { get; set; }
        public List<string> Capital { get; set; }
        public int Population { get; set; }
        public double Area { get; set; }
        public Flags Flags { get; set; }
    }

    public class Name
    {
        public string Common { get; set; }
        public string Official { get; set; }
    }

    public class Flags
    {
        public string Png { get; set; }
    }

}
