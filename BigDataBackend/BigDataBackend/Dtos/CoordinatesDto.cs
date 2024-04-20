namespace BigDataBackend.Dtos
{
    public class CoordinatesDto
    {
        public double Longitude {  get; set; }
        public double Latitude { get; set; }

        public CoordinatesDto(double longitude, double latitude)
        {
            Longitude = longitude;
            Latitude = latitude;
        }
    }
}
