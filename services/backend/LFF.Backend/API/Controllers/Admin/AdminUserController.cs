using LFF.API.Extensions;
using LFF.API.Helpers.Authorization;
using LFF.API.Helpers.Authorization.Users;
using LFF.Core.DTOs.Users.Requests;
using LFF.Core.Services.UserServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace LFF.API.Controllers.Admin
{
    [Authorize(UserRoles.Admin, UserRoles.Staff)]
    [ApiController]
    [Route("api/v1.0/admin/user")]
    [ApiExplorerSettings(GroupName = "admin-controller")]
    public class AdminUserController : ControllerBase
    {
        private readonly IUserService _userService;

        public AdminUserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateUser(CreateUserRequest model)
        {
            var result = await this._userService.CreateUserAsync(model);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpGet("")]
        public async Task<IActionResult> ListUsers()
        {
            var queries = this.TransferHttpQueriesToDomainSearchQueries();
            var result = await this._userService.ListUserAsync(queries);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var result = await this._userService.GetUserByIdAsync(id);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateUser(Guid id, UpdateUserRequest model)
        {
            var result = await this._userService.UpdateUserByIdAsync(id, model);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var result = await this._userService.DeleteUserByIdAsync(id);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpPost("{id:guid}/update-password")]
        public async Task<IActionResult> UpdatePassword(Guid id, UpdatePasswordRequest request)
        {
            request.UserId = id;
            var result = await this._userService.UpdatePasswordByIdAsync(request);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
        {
            request.UserId = this.GetCurrentLoginedUser().Id;
            var result = await this._userService.ChangePasswordByIdAsync(request);
            return this.StatusCode((int)result.GetStatusCode(), result);
        }
    }
}
