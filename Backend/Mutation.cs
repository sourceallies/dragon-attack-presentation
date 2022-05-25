using Orleans;

namespace Backend
{
    public class Mutation
    {
        public Task<int> Decrement([Service] IClusterClient clusterClient)
        {
            var grain = clusterClient.GetGrain<ICounterGrain>(Guid.Empty);
            return grain.Decrement();
        }
    }
}