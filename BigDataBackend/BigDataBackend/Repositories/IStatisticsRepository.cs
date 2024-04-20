using BigDataBackend.Dtos;
using BigDataBackend.Model;

namespace BigDataBackend.Repositories
{
    public interface IStatisticsRepository
    {
        public int NumOfOnSceneReported();
        public int GetTotalRecordsCount();
        public List<int> CountAllByMonthNum();
        public int CountAllByDayOfWeekNum(int dayOfWeek);
        public Crash GetById(string id);
        public Dictionary<string, double> PerformLinearRegression();
        public List<CoordinatesDto> GetCoordinates();
        public List<ClusterDto> CountCrashesByCluster(int k);
    }
}
