using Orleans;

namespace Backend
{
    public interface ICounterGrain : IGrainWithGuidKey
    {
        public Task<int> GetValue();

        public Task<int> Decrement();
    }

    public class CounterEvent
    {
        public int NewValue { get; set; }
    }

    public class CounterGrain : Grain, ICounterGrain
    {
        private int value = 100;
        private IClusterClient clusterClient;

        public CounterGrain(IClusterClient clusterClient)
        {
            this.clusterClient = clusterClient;
        }

        public Task<int> GetValue()
        {
            return Task.FromResult(value);
        }

        public async Task<int> Decrement()
        {
            var newValue = --value;
            var stream = clusterClient.GetStreamProvider("default")
                .GetStream<CounterEvent>(this.GetPrimaryKey(), nameof(ICounterGrain));
            await stream.OnNextAsync(new CounterEvent
            {
                NewValue = newValue
            });
            return newValue;
        }
    }
}