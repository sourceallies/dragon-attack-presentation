using Orleans;

namespace Backend
{
    public class GameCharacter
    {
        public int CurrentHealth {get; set;}
    }

    public interface IGameCharacterGrain : IGrainWithGuidKey
    {
        public Task<GameCharacter> GetValue();

        public Task<int> TakeDamage(int amount);
    }

    public class HealthChangedEvent
    {
        public int ResultingHealth { get; set; }
    }

    public class GameCharacterGrain : Grain, IGameCharacterGrain
    {
        private int currentHealth = 100;
        private IClusterClient clusterClient;

        public GameCharacterGrain(IClusterClient clusterClient)
        {
            this.clusterClient = clusterClient;
        }

        public Task<GameCharacter> GetValue()
        {
            return Task.FromResult(new GameCharacter
            {
                CurrentHealth = currentHealth
            });
        }

        public async Task<int> TakeDamage(int amount)
        {
            currentHealth -= amount;
            var stream = clusterClient.GetStreamProvider("default")
                .GetStream<HealthChangedEvent>(this.GetPrimaryKey(), nameof(IGameCharacterGrain));
            await stream.OnNextAsync(new HealthChangedEvent
            {
                ResultingHealth = currentHealth
            });
            return amount;
        }
    }
}