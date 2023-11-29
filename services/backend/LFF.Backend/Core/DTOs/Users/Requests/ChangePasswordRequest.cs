﻿using System;
using System.Collections.Generic;
using System.Text;

namespace LFF.Core.DTOs.Users.Requests
{
    public class ChangePasswordRequest
    {
        public Guid UserId { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
