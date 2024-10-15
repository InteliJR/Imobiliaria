using Layer.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;

public class HangfireJobsHelper
{
    private readonly IServiceScopeFactory _scopeFactory;

    public HangfireJobsHelper(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task VerificarUsuariosInativos()
    {
        using (var scope = _scopeFactory.CreateScope())
        {
            var cronoJobsService = scope.ServiceProvider.GetRequiredService<IUserService>();
            await cronoJobsService.VerifyInactivityUser();
        }
    }
}
