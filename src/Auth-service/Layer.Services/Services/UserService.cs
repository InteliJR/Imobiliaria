using Layer.Domain.Entities;
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

        public UserService(AppDbContext dbcontext, IEmailSender emailSender, IHashingPasswordService hashingPasswordService)
        {
            _dbcontext = dbcontext;
            _emailSender = emailSender;
            this.hashingPasswordService = hashingPasswordService;
        }

        private static string RandomString(int length)
        {

            var random = new Random();

            const string pool = "abcdefghijklmnopqrstuvwxyz0123456789";
            var chars = Enumerable.Range(0, length)
                .Select(x => pool[random.Next(0, pool.Length)]);
            return new string(chars.ToArray());
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

        public async Task<User> GetUsserById(int userId)
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

            await _emailSender.SendEmailAsync(email, password);

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
                    ImovelId = locador.ImovelId,
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

            await _emailSender.SendEmailAsync(email, password);

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
                ImovelId = locatario.ImovelId,
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

    }
}
