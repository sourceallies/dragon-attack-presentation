using Backend;
using Orleans;
using Orleans.Hosting;
using Orleans.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddCors()
    .AddSingleton<Query>()
    .AddSingleton<Mutation>()
    .AddSingleton<Subscription>();

builder.Services
    .AddGraphQLServer()
    .InitializeOnStartup()
    .AddDocumentFromFile("schema.graphql")
    .BindRuntimeType<Query>()
    .BindRuntimeType<Mutation>()
    .BindRuntimeType<Subscription>()
    .BindRuntimeType<HealthChangeEvent>()
    .BindRuntimeType<GameCharacter>();

builder.Host.UseOrleans(siloBuilder =>
{
    siloBuilder.UseLocalhostClustering();
    siloBuilder.AddMemoryGrainStorageAsDefault();

    siloBuilder.AddSimpleMessageStreamProvider("default");
    siloBuilder.AddMemoryGrainStorage("PubSubStore");
});

var app = builder.Build();
app.UseWebSockets();
app.MapGraphQL();
app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
});

app.Run("http://0.0.0.0:5000");
