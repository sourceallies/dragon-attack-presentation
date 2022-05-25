using Orleans;

namespace Backend
{
    public class Query
    {
        public Task<int> Counter([Service] IClusterClient clusterClient)
        {
            var grain = clusterClient.GetGrain<ICounterGrain>(Guid.Empty);
            return grain.GetValue();
        }
    }
}