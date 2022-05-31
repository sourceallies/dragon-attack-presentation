using Orleans;

namespace Backend
{
    public class Query
    {
        public Task<GameCharacter> GameCharacter([Service] IClusterClient clusterClient)
        {
            var grain = clusterClient.GetGrain<IGameCharacterGrain>(Guid.Empty);
            return grain.GetValue();
        }
    }
}