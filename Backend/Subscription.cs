using Orleans;
using HotChocolate.Execution;
using Orleans.Streams;
using HotChocolate.Subscriptions.InMemory;
using System.Threading.Channels;

namespace Backend
{
    public class Subscription
    {
        [SubscribeAndResolve]
        [GraphQLType("HealthChangeEvent!")]
        public ValueTask<ISourceStream<HealthChangeEvent>> WatchCharacter([Service] IClusterClient clusterClient)
        {
            var stream = clusterClient.GetStreamProvider("default")
                .GetStream<HealthChangeEvent>(Guid.Empty, nameof(IGameCharacterGrain));
            ISourceStream<HealthChangeEvent> sourceStream = new OrleansStreamSourceStream<HealthChangeEvent>(stream);
            return ValueTask.FromResult(sourceStream);
        }
    }

    public class OrleansStreamSourceStream<T> : ISourceStream<T> where T : class
    {
        private readonly Channel<T> channel;
        private readonly IAsyncStream<T> stream;
        private InMemorySourceStream<T> channelWrapper;
        private StreamSubscriptionHandle<T>? subscriptionHandle;

        public OrleansStreamSourceStream(IAsyncStream<T> stream)
        {
            this.stream = stream;
            this.channel = Channel.CreateBounded<T>(100);
            this.channelWrapper = new InMemorySourceStream<T>(channel);
        }

        public async IAsyncEnumerable<T> ReadEventsAsync()
        {
            subscriptionHandle = await stream.SubscribeAsync<T>(HandleEvent);
            await foreach (var ev in channelWrapper.ReadEventsAsync())
            {
                yield return ev;
            }
        }

        private async Task HandleEvent(T obj, StreamSequenceToken token) => await channel.Writer.WriteAsync(obj);

        public async ValueTask DisposeAsync()
        {
            if (subscriptionHandle != null)
            {
                await subscriptionHandle.UnsubscribeAsync();
            }
            await channelWrapper.DisposeAsync();
        }

        IAsyncEnumerable<object> ISourceStream.ReadEventsAsync() => ReadEventsAsync();
    }
}