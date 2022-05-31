Counter.cs -> GameCharacter.cs

```C#
// ICounterGrain -> IGameCharacterGrain
public class GameCharacter
{
    public int CurrentHealth { get; set; }
}
public Task<GameCharacter> GetValue();

// GameCharacterGrain
private int currentHealth = 100;

public async Task<int> TakeDamage(int amount)
{
    currentHealth -= amount;
    var stream = clusterClient.GetStreamProvider("default")
        .GetStream<HealthChangeEvent>(this.GetPrimaryKey(), nameof(IGameCharacterGrain));
    await stream.OnNextAsync(new HealthChangeEvent
    {
        NewHealth = currentHealth
    });
    return currentHealth;
}
```

Program.cs
schema.graphql
Subscription.cs

```C#
.BindRuntimeType<GameCharacter>();
```

DecrementCounter.graphql -> Attack
WatchCounter -> WatchCharacter
DecrementButton -> AttackButton
Imports