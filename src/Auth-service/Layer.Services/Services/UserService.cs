using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Layer.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

namespace Layer.Services.Services
{
    public class UserService : IUserService
    {

        // Vamo adicionar o contexto do banco de dados
        private readonly AppDbContext _dbcontext;
        private readonly IEmailSender _emailSender;

        public UserService(AppDbContext dbcontext, IEmailSender emailSender)
        {
            _dbcontext = dbcontext;
            _emailSender = emailSender;
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


        public async Task<User> InsertNewUser(User user)
        {
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

            var random = new Random();

            var password = random.Next(100000, 999999).ToString();

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

            await InsertNewUser(user);

            // Enviar email com a senha aleatória

            await _emailSender.SendEmailAsync(email, password);

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

    }
}
