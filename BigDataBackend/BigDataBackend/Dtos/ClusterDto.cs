namespace BigDataBackend.Dtos
{
    public class ClusterDto
    {
        public string FirstCrashType { get; set; }
        public int Count { get; set; }

        public ClusterDto(string firstCrashType, int count)
        {
            FirstCrashType = firstCrashType;
            Count = count;
        }
    }
}
