using LFF.API.Extensions;
using LFF.API.Helpers.Authorization;
using LFF.API.Helpers.Authorization.Users;
using LFF.Core.DTOs.Tests.Requests;
using LFF.Core.Services.TestServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace LFF.API.Controllers.Teacher
{
    [Authorize(UserRoles.Teacher)]
    [ApiController]
    [Route("api/v1.0/teacher/test")]
    [ApiExplorerSettings(GroupName = "teacher-controller")]
    public class TeacherTestController : ControllerBase
    {
        private readonly ITestService _testService;

        public TeacherTestController(ITestService testService)
        {
            this._testService = testService;
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateTest(CreateTestRequest model)
        {
            var result = await this._testService.CreateTestAsync(model);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpGet("")]
        public async Task<IActionResult> ListTests()
        {
            var queries = this.TransferHttpQueriesToDomainSearchQueries();
            var result = await this._testService.ListTestAsync(queries);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetTest(Guid id)
        {
            var result = await this._testService.GetTestByIdAsync(id);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateTest(Guid id, UpdateTestRequest model)
        {
            var result = await this._testService.UpdateTestByIdAsync(id, model);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteTest(Guid id)
        {
            var result = await this._testService.DeleteTestByIdAsync(id);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpPost("{id:guid}/upload")]
        public async Task<IActionResult> UploadListQuestions(Guid id, [FromForm] ImportListQuestionsRequest request)
        {
            request.TestId = id;
            var result = await this._testService.ImportListQuestions(request);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }
    }
}
