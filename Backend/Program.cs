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
    .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = true)
    .AddDocumentFromFile("schema.graphql")
    .BindRuntimeType<Query>()
    .BindRuntimeType<Mutation>()
    .BindRuntimeType<Subscription>();

builder.Host.UseOrleans(siloBuilder =>
{
    siloBuilder.UseLocalhostClustering();
    siloBuilder.AddMemoryGrainStorageAsDefault();
    siloBuilder.AddMemoryGrainStorage("PubSubStore");
    siloBuilder.AddSimpleMessageStreamProvider("default");
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
