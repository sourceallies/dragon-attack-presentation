using Orleans;

namespace Backend
{
    public class Mutation
    {
        public Task<int> Attack([Service] IClusterClient clusterClient)
        {
            var grain = clusterClient.GetGrain<IGameCharacterGrain>(Guid.Empty);
            return grain.TakeDamage(1);
        }
    }
}