using LFF.Core.Base;
using LFF.Core.DTOs.Users.Requests;
using LFF.Core.DTOs.Users.Responses;
using System;
using System.Threading.Tasks;

namespace LFF.Core.Services.UserServices
{
    public partial class UserService
    {

        public virtual async Task<ResponseBase> UpdateUserByIdAsync(Guid id, UpdateUserRequest model)
        {
            var userRepository = this.aggregateRepository.UserRepository;

            var entity = await userRepository.GetUserByIdAsync(id);

            if (entity == null)
                throw BaseDomainException.NotFound($"Không tìm thấy người dùng nào với Id = {id}");

            //Update
            entity.Username = model.Username;
            entity.FullName = model.FullName;
            entity.Email = model.Email;
            entity.DateOfBirth = model.DateOfBirth;
            entity.CMND = model.CMND;
            entity.Role = model.Role;

            //Validation
            if (string.IsNullOrEmpty(model.Username))
            {
                throw BaseDomainException.BadRequest("tên người dùng không được trống");
            }

            if (string.IsNullOrEmpty(model.FullName))
            {
                throw BaseDomainException.BadRequest("tên đầy đủ không được trống");
            }

            if (string.IsNullOrEmpty(model.Email))
            {
                throw BaseDomainException.BadRequest("email không được trống");
            }

            if (model.DateOfBirth is null)
            {
                throw BaseDomainException.BadRequest("ngày sinh không được trống");
            }

            if (string.IsNullOrEmpty(model.CMND))
            {
                throw BaseDomainException.BadRequest("Chứng minh nhân dân không được trống");
            }

            if (string.IsNullOrEmpty(model.Role))
            {
                throw BaseDomainException.BadRequest("quyền không được trống");
            }

            if (await userRepository.CheckUserExistedByUsernameExceptIdAsync(id, model.Username))
            {
                throw BaseDomainException.BadRequest($"tên người dùng '{model.Username}' đã tồn tại trên hệ thống");
            }

            if (await userRepository.CheckUserExistedByEmailExceptIdAsync(id, model.Email))
            {
                throw BaseDomainException.BadRequest($"email '{model.Email}' đã tồn tại trên hệ thống");
            }

            if (await userRepository.CheckUserExistedByCMNDExceptIdAsync(id, model.CMND))
            {
                throw BaseDomainException.BadRequest($"Chứng minh nhân dân '{model.CMND}' đã tồn tại trên hệ thống");
            }


            //Save
            await userRepository.UpdateAsync(entity);

            //Log

            return await Task.FromResult(new UpdateUserResponse(entity));
        }
    }
}