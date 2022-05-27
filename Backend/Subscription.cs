using HotChocolate.Execution;
using Orleans;

namespace Backend
{
    public class Subscription 
    {
        private readonly IClusterClient clusterClient;

        public Subscription(IClusterClient clusterClient)
        {
            this.clusterClient = clusterClient;
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<CounterEvent>> WatchCounter()
        {
            var streamProvider = clusterClient.GetStreamProvider("default");
            var stream = streamProvider.GetStream<CounterEvent>(Guid.Empty, nameof(ICounterGrain));
            ISourceStream<CounterEvent> sourceStream = new OrleansStreamSourceStream<CounterEvent>(stream);
            return ValueTask.FromResult(sourceStream);
        }
    }
}