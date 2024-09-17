namespace property_management.Contracts
{
    public class CreateNewsletterRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int ReadTime { get; set; }
    }

    public class NewsLetterResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ReadTime { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
