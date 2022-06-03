using Orleans;

namespace Backend
{
    public class Mutation
    {
        public Task<int> Attack([Service] IClusterClient clusterClient, Guid targetId)
        {
            var grain = clusterClient.GetGrain<IGameCharacterGrain>(targetId);
            return grain.TakeDamage(1);
        }
    }
}