using LFF.API.Extensions;
using LFF.API.Helpers.Authorization;
using LFF.API.Helpers.Authorization.Users;
using LFF.Core.DTOs.Lectures.Requests;
using LFF.Core.Services.LectureServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace LFF.API.Controllers.Admin
{
    [Authorize(UserRoles.Admin, UserRoles.Staff)]
    [ApiController]
    [Route("api/v1.0/admin/lecture")]
    [ApiExplorerSettings(GroupName = "admin-controller")]
    public class AdminLectureController : ControllerBase
    {
        private readonly ILectureService _lectureService;

        public AdminLectureController(ILectureService lectureService)
        {
            this._lectureService = lectureService;
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateLecture(CreateLectureRequest model)
        {
            var result = await this._lectureService.CreateLectureAsync(model);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpGet("")]
        public async Task<IActionResult> ListLectures()
        {
            var queries = this.TransferHttpQueriesToDomainSearchQueries();
            var result = await this._lectureService.ListLectureAsync(queries);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetLecture(Guid id)
        {
            var result = await this._lectureService.GetLectureByIdAsync(id);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateLecture(Guid id, UpdateLectureRequest model)
        {
            var result = await this._lectureService.UpdateLectureByIdAsync(id, model);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteLecture(Guid id)
        {
            var result = await this._lectureService.DeleteLectureByIdAsync(id);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }
    }
}
