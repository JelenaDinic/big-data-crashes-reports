using Accord.MachineLearning;
using BigDataBackend.Context;
using BigDataBackend.Dtos;
using BigDataBackend.Model;
using MathNet.Numerics.LinearAlgebra.Double;



namespace BigDataBackend.Repositories
{
    public class StatisticsRepository: IStatisticsRepository
    {
        private readonly ApplicationDbContext _context;

        public StatisticsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public int GetTotalRecordsCount()
        {
            return _context.Crashes.Count();
        }

        public int NumOfOnSceneReported()
        {
            return _context.Crashes.Count(record => record.REPORT_TYPE == "ON SCENE");
        }

        public List<int> CountAllByMonthNum()
        {
            return
            [
                .. _context.Crashes
                                .GroupBy(record => record.CRASH_MONTH)
                                .Select(group => group.Count())
,
            ];
        }

        public int CountAllByDayOfWeekNum(int dayOfWeek)
        {
            return _context.Crashes.Count(record => record.HIT_AND_RUN_I == "Y");
        }

        public Crash GetById(string id) => _context.Crashes.SingleOrDefault(record => record.CRASH_RECORD_ID == id);

        private bool IsNumeric(object value)
        {
            return value != null && double.TryParse(value.ToString(), out _);
        }

        public Dictionary<string, double> PerformLinearRegression()
        {
            var crashData = _context.Crashes
                            .Where(crash => crash.POSTED_SPEED_LIMIT != null
                                && crash.INJURIES_TOTAL != null
                                && crash.LANE_CNT != null)
                            .Take(10000)
                            .AsEnumerable()
                            .Where(crash => IsNumeric(crash.POSTED_SPEED_LIMIT)
                                         && IsNumeric(crash.INJURIES_TOTAL)
                                         && IsNumeric(crash.LANE_CNT))
                            .Select(crash => new {
                                Speed = crash.POSTED_SPEED_LIMIT,
                                InjuriesTotal = crash.INJURIES_TOTAL,
                                LaneCnt = crash.LANE_CNT
                            })
                            .ToList();

            var X = crashData.Select(crash => new double[] { 1.0, Convert.ToDouble(crash.Speed), Convert.ToDouble(crash.LaneCnt) }).ToArray();
            var y = crashData.Select(crash => Convert.ToDouble(crash.InjuriesTotal)).ToArray();

            var XMatrix = DenseMatrix.OfRows(X);
            var yVector = DenseVector.OfArray(y);

            var regression = XMatrix.QR().Solve(yVector);

            var coefficients = regression.ToArray();

            var results = new Dictionary<string, double>
            {
                { "intercept", coefficients[0] },
                { "speedCoefficient", coefficients[1] },
                { "laneCount", coefficients[2]}
            };

            return results;
        }

        public List<CoordinatesDto> GetCoordinates()
        {
            var coordinates = _context.Crashes
                .Take(8)
                .Select(crash => new CoordinatesDto(Convert.ToDouble(crash.LONGITUDE), Convert.ToDouble(crash.LATITUDE)))
                .ToList();

            return coordinates;
        }

        public List<ClusterDto> CountCrashesByCluster(int k)
        {
            var crashTypes = _context.Crashes.Select(crash => crash.FIRST_CRASH_TYPE).Distinct().ToArray();

            double[][] inputData = _context.Crashes.Select(crash => new double[] { Array.IndexOf(crashTypes, crash.FIRST_CRASH_TYPE) }).ToArray();

            var kmeans = new Accord.MachineLearning.KMeans(k);
            var clusters = kmeans.Learn(inputData);

            var clusterAssignments = clusters.Decide(inputData);

            var clusterCounts = new Dictionary<int, int>();
            for (int i = 0; i < clusterAssignments.Length; i++)
            {
                var clusterIndex = clusterAssignments[i];
                if (clusterCounts.ContainsKey(clusterIndex))
                {
                    clusterCounts[clusterIndex]++;
                }
                else
                {
                    clusterCounts[clusterIndex] = 1;
                }
            }

            var result = new List<ClusterDto>();
            foreach (var kvp in clusterCounts)
            {
                result.Add(new ClusterDto(crashTypes[kvp.Key], kvp.Value));
            }

            return result;
        }

    }
}
