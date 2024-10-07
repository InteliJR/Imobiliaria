﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Layer.Domain.Entities;

namespace Layer.Domain.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetUsuariosAsync();

        Task<User> InsertNewUser(User user);

        Task<bool> UserExist(User user);

        Task<User> GetUserByEmail(string email);

        Task<User> GetUserByCPF(string cpf);

        Task<User> GetUsserById(int userId);

        Task<User> UpdateUser(User userToUpdate);

        Task<User> DeleteUser(string email);

        Task<bool> LastUpdate(int UserId);

        Task<bool> InactivateUser(string email);

        Task<(User, Locador)> IsertNewUserLocador(string email, Locador locador);

    }
}
