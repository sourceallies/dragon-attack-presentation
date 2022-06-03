using Orleans;

namespace Backend
{
    public class Query
    {
        public Task<GameCharacter> GameCharacter([Service] IClusterClient clusterClient, Guid id)
        {
            var grain = clusterClient.GetGrain<IGameCharacterGrain>(id);
            return grain.GetValue();
        }
    }
}