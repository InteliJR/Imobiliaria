using Microsoft.AspNetCore.Mvc;
using Layer.Infrastructure.Database;
using Microsoft.AspNetCore.Authorization;
using Layer.Domain.Enums;

namespace Layer.Application.Controllers
{
    public class LogsController : Controller
    {
        private readonly ApplicationLog _applicationLog;

        public LogsController(ApplicationLog applicationLog)
        {
            _applicationLog = applicationLog;
        }

        [HttpGet("PegarTodosLogs")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetAllLogs()
        {
            var logs = await _applicationLog.GetAllLogs();
            return Ok(logs);
        }
    }
}