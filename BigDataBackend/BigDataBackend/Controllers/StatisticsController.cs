using BigDataBackend.Context;
using BigDataBackend.Dtos;
using BigDataBackend.Model;
using BigDataBackend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BigDataBackend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsRepository _statisticsRepository;

        public StatisticsController(IStatisticsRepository statisticsRepository)
        {
            _statisticsRepository = statisticsRepository;
        }

        [HttpGet("on-scene")]
        public ActionResult<int> NumOfOnSceneReported()
        {
            return _statisticsRepository.NumOfOnSceneReported();
        }

        [HttpGet("month")]
        public ActionResult<List<int>> CountAllByMonthNum()
        {
            return _statisticsRepository.CountAllByMonthNum();
        }

        [HttpGet("day-of-week/{dayOfWeekNum}")]
        public ActionResult<int> CountAllByDayOfWeekNum(int dayOfWeekNum)
        {
            return _statisticsRepository.CountAllByDayOfWeekNum(dayOfWeekNum);
        }

        [HttpGet("{id}")]
        public ActionResult<Crash> GetById(string id)
        {
            return _statisticsRepository.GetById(id);
        }

        [HttpGet("regression")]
        public ActionResult<Dictionary<string, double>> PerformLinearRegression()
        {
            return _statisticsRepository.PerformLinearRegression();
        }

        [HttpGet("coordinates")]
        public ActionResult<List<CoordinatesDto>> GetCoordinates()
        {
            return _statisticsRepository.GetCoordinates();
        }

        [HttpGet("clasters")]
        public ActionResult<List<ClusterDto>> CountCrashesByCluster()
        {
            return _statisticsRepository.CountCrashesByCluster(18);
        }
    }
}
