﻿using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Layer.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using System;
using System.Linq;
using System.Text;


namespace Layer.Services.Services
{
    public class UserService : IUserService
    {

        // Vamo adicionar o contexto do banco de dados
        private readonly AppDbContext _dbcontext;
        private readonly IEmailSender _emailSender;
        private readonly IHashingPasswordService hashingPasswordService;
        private readonly ApplicationLog _applicationLog;

        public UserService(AppDbContext dbcontext, IEmailSender emailSender, IHashingPasswordService hashingPasswordService, ApplicationLog applicationLog)
        {
            _dbcontext = dbcontext;
            _emailSender = emailSender;
            this.hashingPasswordService = hashingPasswordService;
            _applicationLog = applicationLog;
        }

        private static string RandomString(int length)
        {

            var random = new Random();

            const string pool = "abcdefghijklmnopqrstuvwxyz0123456789";
            var chars = Enumerable.Range(0, length)
                .Select(x => pool[random.Next(0, pool.Length)]);
            return new string(chars.ToArray());
        }

        public async Task<List<UserDetailsModel>> GetAllUsersWithDetailsAsync()
        {
            var users = await _dbcontext.Usuarios
                .Include(u => u.Locador)
                .Include(u => u.Locatario)
                .Include(u => u.Colaborador)
                .Select(u => new UserDetailsModel
                {
                    UsuarioId = u.UsuarioId,
                    Email = u.Email,
                    TipoUsuario = u.TipoUsuario,
                    Ativo = u.Ativo,
                    DataRegistro = u.DataRegistro,
                    Locador = u.Locador == null ? null : new LocadorDetails
                    {
                        LocadorId = u.Locador.LocadorId,
                        NomeCompletoLocador = u.Locador.NomeCompletoLocador,
                        CPF = u.Locador.CPF,
                        CNPJ = u.Locador.CNPJ,
                        Telefone = u.Locador.NumeroTelefone,
                        Nacionalidade = u.Locador.Nacionalidade,
                        Endereco = u.Locador.Endereco,
                        RG = u.Locador.RG,
                    },
                    Locatario = u.Locatario == null ? null : new LocatarioDetails
                    {
                        LocatarioId = u.Locatario.LocatarioId,
                        NomeCompletoLocatario = u.Locatario.NomeCompletoLocatario,
                        CPF = u.Locatario.CPF,
                        CNPJ = u.Locatario.CNPJ,
                        Telefone = u.Locatario.NumeroTelefone,
                        Nacionalidade = u.Locatario.Nacionalidade,
                        Endereco = u.Locatario.Endereco,
                        RG = u.Locatario.RG,
                        Passaporte = u.Locatario.Passaporte,
                    },
                    Colaborador = u.Colaborador == null ? null : new ColaboradorDetails
                    {
                        ColaboradorId = u.Colaborador.ColaboradorId,
                        NomeCompleto = u.Colaborador.NomeCompleto
                    }
                })
                .ToListAsync();

            return users;
        }



        public async Task<List<User>> GetUsuariosAsync()
        {
            try
            {
                return await _dbcontext.Usuarios.AsNoTracking().ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter os usuários: {ex.Message}");

                throw new Exception("Ocorreu um erro ao buscar os usuários no banco de dados.", ex);
            }
        }


        public async Task<User> InsertNewUser(User user, bool generatePassword)
        {
            // Criar senha aleatória
            if (generatePassword)
            {
                string password = RandomString(8);

                user.Senha = password;

                // Hashing da senha

                user.Senha = await hashingPasswordService.HashPassword(password);
            }

            await _dbcontext.Usuarios.AddAsync(user);
            await _dbcontext.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UserExist(User user)
        {
            var userCheck = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == user.Email);
            
            if (userCheck == null)
            {
                return false;
            }else{
                return true;
            }
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User> GetUserByCPF(string cpf)
        {
            // Chekar se o usuário existe, em cada tabela locadores, locatários e juridico
            var locadorCheck = await _dbcontext.Locadores.FirstOrDefaultAsync(x => x.CPF == cpf);
            // var locatarioCheck = await _dbcontext.Locatarios.FirstOrDefaultAsync(x => x.CPF == cpf);
            // var juridicoCheck = await _dbcontext.Juridicos.FirstOrDefaultAsync(x => x.CNPJ == cpf);

            if (locadorCheck != null)
            {
                return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == locadorCheck.UsuarioId);
            }
            // else if (locatarioCheck != null)
            // {
            //     return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == locatarioCheck.UsuarioId);
            // }
            // else if (juridicoCheck != null)
            // {
            //     return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == juridicoCheck.UsuarioId);
            // }
            else
            {
                return null;
            }

        }

        public async Task<User> GetUserById(int userId)
        {
            return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == userId);
        }

        public async Task<User> UpdateUser(User userToUpdate)
        {
            _dbcontext.Usuarios.Update(userToUpdate);
            await _dbcontext.SaveChangesAsync();
            return userToUpdate;
        }

        public async Task<User> DeleteUser(string email)
        {
            var user = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                return null;
            }

            _dbcontext.Usuarios.Remove(user);
            await _dbcontext.SaveChangesAsync();

            return user;
        }

        public async Task<bool> LastUpdate(int UserId)
        {
            var user = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == UserId);

            if (user == null)
            {
                return false;
            }

/*            TimeZoneInfo brtZone = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");

            // Converte a data e hora para o fuso de brasileira
            DateTime brasiliaTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, brtZone);

            user.DataAtualizacao = brasiliaTime;*/

            user.DataAtualizacao = DateTime.Now;

            _dbcontext.Usuarios.Update(user);

            await _dbcontext.SaveChangesAsync();

            return true;
        }


        public async Task<bool> InactivateUser(string email)
        {
            var user = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                return false;
            }

            user.Ativo = false;

            _dbcontext.Usuarios.Update(user);

            await _dbcontext.SaveChangesAsync();

            return true;
        }

        public async Task<(User, Locador)> IsertNewUserLocador(string email, Locador locador)
        {
            // Verificar se o usuário já existe
            // Criar senha aleatoria
            // Criar usuário com email e senha aleatorio
            // Criar locador com o usuário criado
            // Retornar o usuário e o locador

            var userCheck = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

            if (userCheck != null)
            {
                throw new InvalidOperationException("Usuário com esse email já existe.");
            }

            // Criar senha aleatória

            string password = RandomString(8);

            // Enviar email com a senha aleatória

            await _emailSender.SendEmailAsync(email, password, "NovoUsuario");

            // Hashing da senha

            password = await hashingPasswordService.HashPassword(password);

            // Montar o objeto usuário com o email e a senha aleatória e inserir no banco de dados
            var user = new User
            {
                Email = email,
                Senha = password,
                TipoUsuario = "Locador",
                Ativo = true,
                DataRegistro = DateTime.Now,
                DataAtualizacao = DateTime.Now
            };

            await InsertNewUser(user, false);

            // Pegar o usuário criado

            var userCreated = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

            // Montar o objeto Locador

            if (userCreated != null) {
                var locadorNew = new Locador
                {
                    UsuarioId = userCreated.UsuarioId,
                    PessoaJuridica = locador.PessoaJuridica,
                    CPF = locador.CPF,
                    Nacionalidade = locador.Nacionalidade,
                    NumeroTelefone = locador.NumeroTelefone,
                    NomeCompletoLocador = locador.NomeCompletoLocador,
                    CNPJ = locador.CNPJ,
                    Endereco = locador.Endereco,
                    Passaporte = locador.Passaporte,
                    RG = locador.RG
                };

                // Inserir o locador no banco de dados
                await _dbcontext.Locadores.AddAsync(locadorNew);
                await _dbcontext.SaveChangesAsync();

                // Pegar o locador criado
                var locadorCreated = await _dbcontext.Locadores.FirstOrDefaultAsync(x => x.UsuarioId == userCreated.UsuarioId);
    
                return (userCreated, locadorCreated);
            }
            else
            {
                throw new InvalidOperationException("Usuário não foi criado corretamente");
            }
        }

        public async Task<(User, Locatario)> IsertNewUserLocatario(string email, Locatario locatario)
        {
            var userCheck = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

            if (userCheck != null)
            {
                throw new InvalidOperationException("Usuário com esse email já existe.");
            }

            // Criar senha aleatória

            string password = RandomString(8);

            // Enviar email com a senha aleatória

            await _emailSender.SendEmailAsync(email, password, "NovoUsuario");

            // Hashing da senha
            
            password = await hashingPasswordService.HashPassword(password);

            // Montar o objeto usuário com o email e a senha aleatória e inserir no banco de dados

            var user = new User
            {
                Email = email,
                Senha = password,
                TipoUsuario = "Locatario",
                Ativo = true,
                DataRegistro = DateTime.Now,
                DataAtualizacao = DateTime.Now
            };

            await InsertNewUser(user, false);

            // Pegar o usuário criado

            var userCreated = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

            // Montar o objeto Locatario

            if (userCreated == null)
            {
                throw new InvalidOperationException("Usuário não foi criado corretamente"
                );
            }

            var locatarioNew = new Locatario
            {
                UsuarioId = userCreated.UsuarioId,
                CPF = locatario.CPF,
                Nacionalidade = locatario.Nacionalidade,
                NumeroTelefone = locatario.NumeroTelefone,
                NomeCompletoLocatario = locatario.NomeCompletoLocatario,
                CNPJ = locatario.CNPJ,
                Endereco = locatario.Endereco,
                Passaporte = locatario.Passaporte,
                RG = locatario.RG
            };

            // Inserir o locatario no banco de dados

            await _dbcontext.Locatarios.AddAsync(locatarioNew);
            await _dbcontext.SaveChangesAsync();

            // Pegar o locatario criado

            var locatarioCreated = await _dbcontext.Locatarios.FirstOrDefaultAsync(x => x.UsuarioId == userCreated.UsuarioId);

            return (userCreated, locatarioCreated);
        }

        public Task<List<User>> VerifyInactivityUser()
        {
            try
            {
                int days = 1; // Colocar 1 dia só para testar
                var users = _dbcontext.Usuarios.FromSqlRaw($@"SELECT * FROM usuarios WHERE ativo = false AND data_atualizacao < NOW() - INTERVAL '{days} DAY';").ToListAsync();

                return users;
            }
            catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao verificar os usuários inativos.", ex);
            }
        }

        public async Task<string> UserForgotPassword(string email)
        {
            try
            {
                var userCheck = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (userCheck == null)
                {
                    throw new InvalidOperationException("Usuário não existente.");
                }

                // Criar senha aleatória

                string password = RandomString(8);

                // Enviar email com a senha aleatória

                await _emailSender.SendEmailAsync(email, password, "RecuperarSenha");

                // Hashing da senha

                password = await hashingPasswordService.HashPassword(password);

                // Atualizar a senha do usuário

                userCheck.Senha = password;

                _dbcontext.Usuarios.Update(userCheck);

                await _dbcontext.SaveChangesAsync();

                return "Senha redifina com sucesso";
            } catch (Exception ex)
            {

               throw new Exception("Ocorreu um erro ao redefinir a senha do usuário.", ex);
            }

        }

        public async Task<string> ChangePassword(string email, string oldPassword, string newPassword)
        {

            try
            {
                // Chekar se o usuário existe

                var userCheck = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (userCheck == null)
                {
                    throw new InvalidOperationException("Usuário não encontrado.");
                }

                // Verificar se a senha antiga está correta

                if (!hashingPasswordService.VerifyPassword(oldPassword, userCheck.Senha).Result)
                {
                    throw new InvalidOperationException("Senha antiga incorreta.");
                }

                // Hashing da nova senha

                newPassword = await hashingPasswordService.HashPassword(newPassword);

                // Atualizar a senha do usuário

                userCheck.Senha = newPassword;

                _dbcontext.Usuarios.Update(userCheck);

                await _dbcontext.SaveChangesAsync();

                return "Senha alterada com sucesso";
            }
            catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao alterar a senha do usuário.", ex);
            }
        }

        public async Task<(User, Colaborador)> InsertNewUserColaborador(string email, Colaborador colaborador)
        {
            try
            {
                var userCheck = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (userCheck != null)
                {
                    throw new InvalidOperationException("Usuário com esse email já existe.");
                }

                // Criar senha aleatória

                string password = RandomString(8);

                // Enviar email com a senha aleatória

                await _emailSender.SendEmailAsync(email, password, "NovoUsuario");

                // Hashing da senha

                password = await hashingPasswordService.HashPassword(password);

                // Montar o objeto usuário com o email e a senha aleatória e inserir no banco de dados
                var user = new User
                {
                    Email = email,
                    Senha = password,
                    TipoUsuario = colaborador.TipoColaborador,
                    Ativo = true,
                    DataRegistro = DateTime.Now,
                    DataAtualizacao = DateTime.Now
                };

                await InsertNewUser(user, false);

                // Pegar o usuário criado

                var userCreated = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                // Montar o objeto colaborador

                if (userCreated != null)
                {
                    var colaboradorNew = new Colaborador
                    {
                        UsuarioId = userCreated.UsuarioId,
                        NomeCompleto = colaborador.NomeCompleto,
                        TipoColaborador = colaborador.TipoColaborador
                    };

                    // Inserir o colaborador no banco de dados
                    await _dbcontext.Colaboradores.AddAsync(colaboradorNew);
                    await _dbcontext.SaveChangesAsync();

                    // Pegar o colaborador criado
                    var colaboradorCreated = await _dbcontext.Colaboradores.FirstOrDefaultAsync(x => x.UsuarioId == userCreated.UsuarioId);

                    return (userCreated, colaboradorCreated);
                }
                else
                {
                    throw new InvalidOperationException("Usuário não foi criado corretamente");
                }
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao inserir um novo colaborador.", ex);
            }
        }
    }
}
