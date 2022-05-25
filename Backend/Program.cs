using Backend;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddSingleton<Query>()
    .AddSingleton<Mutation>();

builder.Services
    .AddGraphQLServer()
    .AddDocumentFromFile("schema.graphql")
    .BindRuntimeType<Query>()
    .BindRuntimeType<Mutation>();

var app = builder.Build();

app.MapGraphQL();

app.Run("http://0.0.0.0:5000");