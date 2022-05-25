using Orleans;

namespace Backend
{
    public interface ICounterGrain : IGrainWithGuidKey
    {
        public Task<int> GetValue();

        public Task<int> Decrement();
    }

    public class CounterGrain : Grain, ICounterGrain
    {
        private int value = 100;

        public Task<int> GetValue()
        {
            return Task.FromResult(value);
        }

        public Task<int> Decrement()
        {
            return Task.FromResult(--value);
        }
    }
}