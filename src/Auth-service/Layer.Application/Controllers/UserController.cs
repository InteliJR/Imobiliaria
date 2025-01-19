using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Application.Models;
using Layer.Domain.Entities;
using Layer.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Layer.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Layer.Infrastructure.Database;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;



namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        // Chamar o serviço de usuário
        private readonly IUserService _userService;
        private readonly ApplicationLog _applicationLog;
        private readonly ILocadorService _locadorService;
        private readonly ILocatarioService _locatarioService;
        private readonly IColaboradorService _colaboradorService;
        private readonly IHmacService _hmacService;

        // Construtor
        public UserController(IUserService userService, ApplicationLog applicationLog, ILocadorService locadorService, ILocatarioService locatarioService, IColaboradorService colaboradorService, IHmacService hmacService)
        {
            _userService = userService;
            _applicationLog = applicationLog;
            _locadorService = locadorService;
            _locatarioService = locatarioService;
            _colaboradorService = colaboradorService;
            _hmacService = hmacService;
        }

        [HttpGet("PegarUsuario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetCompleteUser(int userId)
        {
            var user = await _userService.GetUserById(userId);

            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            // Verificar qual o tipo de usuário

            if (user.TipoUsuario == Roles.Locador.ToString())
            {
                var locador = await _locadorService.GetLocadorByEmail(user.Email);
                
                var noColaborador = new NoColaboradorUserModel {
                    UsuarioId = user.UsuarioId,
                    RoleId = locador.LocadorId,
                    Role = Roles.Locador.ToString(),
                    Nome = locador.NomeCompletoLocador,
                    CPF = locador.CPF,
                    Telefone = locador.NumeroTelefone,
                    Nacionalidade = locador.Nacionalidade,
                    Endereco = locador.Endereco,
                    CNPJ = locador.CNPJ,
                    Passaporte = locador.Passaporte,
                    RG = locador.RG,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro,
                };

                return Ok(noColaborador);
            }
            else if (user.TipoUsuario == Roles.Locatario.ToString())
            {
                var locatario = await _locatarioService.GetLocatarioByEmail(user.Email);

                var noColaborador = new NoColaboradorUserModel {
                    UsuarioId = user.UsuarioId,
                    RoleId = locatario.LocatarioId,
                    Role = Roles.Locatario.ToString(),
                    Nome = locatario.NomeCompletoLocatario,
                    CPF = locatario.CPF,
                    Telefone = locatario.NumeroTelefone,
                    Nacionalidade = locatario.Nacionalidade,
                    Endereco = locatario.Endereco,
                    CNPJ = locatario.CNPJ,
                    Passaporte = locatario.Passaporte,
                    RG = locatario.RG,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro,
                };

                return Ok(noColaborador);
            }
            else if (user.TipoUsuario == Roles.Admin.ToString() || user.TipoUsuario == Roles.Judiciario.ToString())
            {
                var colaborador = await _colaboradorService.GetColaboradorByEmail(user.Email);
                
                var colaboradorResult = new ColaboradorUserModel {
                    UsuarioId = user.UsuarioId,
                    ColaboradorIdId = colaborador.ColaboradorId,
                    Role = Roles.Admin.ToString(),
                    Nome = colaborador.NomeCompleto,
                    TipoColaborador = colaborador.TipoColaborador,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro
                };

                return Ok(colaboradorResult);

            } else
            {
                return NotFound("Usuário não encontrado.");
            }

        }

        [HttpGet("infoUser/{userId}")]
        public async Task<IActionResult> GetUser(int userId, [FromHeader(Name = "X-Client-Id")] string clientId,
                                    [FromHeader(Name = "X-Signature")] string signature,
                                    [FromHeader(Name = "X-Timestamp")] string timestamp)
        {
            // 1. Validar o cliente
            if(_hmacService.CheckClientName(clientId) == false)
            {
                return BadRequest("Invalid Client");
            }

            // 2. Validar o timestamp (prevenir ataques de replay)
            if (!long.TryParse(timestamp, out var timestampValue))
            {
                Console.WriteLine("Timestamp is not a valid number.");
                return BadRequest("Timestamp is not a valid number.");
            }

            var timestampDateTime = DateTimeOffset.FromUnixTimeSeconds(timestampValue).UtcDateTime;
            Console.WriteLine("Timestamp: " + timestampDateTime);
            if (Math.Abs((DateTime.UtcNow - timestampDateTime).TotalMinutes) > 5)
            {
                Console.WriteLine("Timestamp is invalid or expired.");
                return BadRequest("Timestamp is invalid or expired.");
            }


            var secretKey = _hmacService.GetServiceSecret(clientId);

            // 3. Recalcular a assinatura
            var payload = $"{userId}:{timestamp}";

            Console.WriteLine("Payload: " + payload);
            var expectedSignature = _hmacService.GenerateHMACSignature(payload, secretKey);

            if (signature != expectedSignature)
            {
                return Unauthorized("Invalid signature");
            }

            Console.WriteLine("Signature: " + signature);   

            // 4. Obter o usuário
            var user = await _userService.GetUserById(userId);

            if (user == null)
            {
                Console.WriteLine("User não achado");
                return NotFound("Usuário não encontrado.");
            }else{
                Console.WriteLine("User achado");
            }

            // Verificar qual o tipo de usuário

            if (user.TipoUsuario == Roles.Locador.ToString())
            {
                var locador = await _locadorService.GetLocadorByEmail(user.Email);
                
                var noColaborador = new NoColaboradorUserModel {
                    UsuarioId = user.UsuarioId,
                    RoleId = locador.LocadorId,
                    Role = Roles.Locador.ToString(),
                    Nome = locador.NomeCompletoLocador,
                    CPF = locador.CPF,
                    Telefone = locador.NumeroTelefone,
                    Nacionalidade = locador.Nacionalidade,
                    Endereco = locador.Endereco,
                    CNPJ = locador.CNPJ,
                    Passaporte = locador.Passaporte,
                    RG = locador.RG,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro,
                };

                Console.WriteLine("User: " + noColaborador);

                return Ok(noColaborador);
            }
            else if (user.TipoUsuario == Roles.Locatario.ToString())
            {
                var locatario = await _locatarioService.GetLocatarioByEmail(user.Email);

                var noColaborador = new NoColaboradorUserModel {
                    UsuarioId = user.UsuarioId,
                    RoleId = locatario.LocatarioId,
                    Role = Roles.Locatario.ToString(),
                    Nome = locatario.NomeCompletoLocatario,
                    CPF = locatario.CPF,
                    Telefone = locatario.NumeroTelefone,
                    Nacionalidade = locatario.Nacionalidade,
                    Endereco = locatario.Endereco,
                    CNPJ = locatario.CNPJ,
                    Passaporte = locatario.Passaporte,
                    RG = locatario.RG,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro,
                };

                Console.WriteLine("User: " + noColaborador); 

                return Ok(noColaborador);
            }
            else if (user.TipoUsuario == Roles.Admin.ToString() || user.TipoUsuario == Roles.Judiciario.ToString())
            {
                var colaborador = await _colaboradorService.GetColaboradorByEmail(user.Email);
                
                var colaboradorResult = new ColaboradorUserModel {
                    UsuarioId = user.UsuarioId,
                    ColaboradorIdId = colaborador.ColaboradorId,
                    Role = Roles.Admin.ToString(),
                    Nome = colaborador.NomeCompleto,
                    TipoColaborador = colaborador.TipoColaborador,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro
                };

                Console.WriteLine("User: " + colaboradorResult);

                return Ok(colaboradorResult);

            } else
            {
                return NotFound("Usuário não encontrado.");
            }
        }

        [HttpGet("infoLocador/{locadorId}")]
        public async Task<IActionResult> GetLocador(int locadorId, [FromHeader(Name = "X-Client-Id")] string clientId,
                        [FromHeader(Name = "X-Signature")] string signature,
                        [FromHeader(Name = "X-Timestamp")] string timestamp)
        {
            // 1. Validar o cliente
            if(_hmacService.CheckClientName(clientId) == false)
            {
            return BadRequest("Invalid Client");
            }

            // 2. Validar o timestamp (prevenir ataques de replay)
            if (!long.TryParse(timestamp, out var timestampValue))
            {
            Console.WriteLine("Timestamp is not a valid number.");
            return BadRequest("Timestamp is not a valid number.");
            }

            var timestampDateTime = DateTimeOffset.FromUnixTimeSeconds(timestampValue).UtcDateTime;
            Console.WriteLine("Timestamp: " + timestampDateTime);
            if (Math.Abs((DateTime.UtcNow - timestampDateTime).TotalMinutes) > 5)
            {
            Console.WriteLine("Timestamp is invalid or expired.");
            return BadRequest("Timestamp is invalid or expired.");
            }

            var secretKey = _hmacService.GetServiceSecret(clientId);

            // 3. Recalcular a assinatura
            var payload = $"{locadorId}:{timestamp}";

            Console.WriteLine("Payload: " + payload);
            var expectedSignature = _hmacService.GenerateHMACSignature(payload, secretKey);

            if (signature != expectedSignature)
            {
            return Unauthorized("Invalid signature");
            }

            Console.WriteLine("Signature: " + signature);   

            // 4. Obter o locador
            var locador = await _locadorService.GetLocadorByLocadorID(locadorId);

            if (locador == null)
            {
            Console.WriteLine("Locador não encontrado");
            return NotFound("Locador não encontrado.");
            }else{
            Console.WriteLine("Locador encontrado");
            }

            var user = await _userService.GetUserById((int)locador.UsuarioId);

            var locadorResult = new NoColaboradorUserModel {
            UsuarioId = (int)locador.UsuarioId,
            RoleId = locador.LocadorId,
            Role = Roles.Locador.ToString(),
            Nome = locador.NomeCompletoLocador,
            CPF = locador.CPF,
            Telefone = locador.NumeroTelefone,
            Nacionalidade = locador.Nacionalidade,
            Endereco = locador.Endereco,
            CNPJ = locador.CNPJ,
            Passaporte = locador.Passaporte,
            RG = locador.RG,
            Email = user.Email,
            Ativo = user.Ativo,
            DataCriacao = user.DataRegistro,
            };

            Console.WriteLine("Locador: " + locadorResult);

            return Ok(locadorResult);
        }


        [HttpGet("infoLocatario/{locatarioId}")]
        public async Task<IActionResult> GetLocatario(int locatarioId, [FromHeader(Name = "X-Client-Id")] string clientId,
                [FromHeader(Name = "X-Signature")] string signature,
                [FromHeader(Name = "X-Timestamp")] string timestamp)
        {
            // 1. Validar o cliente
            if(_hmacService.CheckClientName(clientId) == false)
            {
            return BadRequest("Invalid Client");
            }

            // 2. Validar o timestamp (prevenir ataques de replay)
            if (!long.TryParse(timestamp, out var timestampValue))
            {
            Console.WriteLine("Timestamp is not a valid number.");
            return BadRequest("Timestamp is not a valid number.");
            }

            var timestampDateTime = DateTimeOffset.FromUnixTimeSeconds(timestampValue).UtcDateTime;
            Console.WriteLine("Timestamp: " + timestampDateTime);
            if (Math.Abs((DateTime.UtcNow - timestampDateTime).TotalMinutes) > 5)
            {
            Console.WriteLine("Timestamp is invalid or expired.");
            return BadRequest("Timestamp is invalid or expired.");
            }

            var secretKey = _hmacService.GetServiceSecret(clientId);

            // 3. Recalcular a assinatura
            var payload = $"{locatarioId}:{timestamp}";

            Console.WriteLine("Payload: " + payload);
            var expectedSignature = _hmacService.GenerateHMACSignature(payload, secretKey);

            if (signature != expectedSignature)
            {
            return Unauthorized("Invalid signature");
            }

            Console.WriteLine("Signature: " + signature);   

            // 4. Obter o locatario
            var locatario = await _locatarioService.GetLocatarioByLocatarioID(locatarioId);

            if (locatario == null)
            {
            Console.WriteLine("Locatario não encontrado");
            return NotFound("Locatario não encontrado.");
            }else{
            Console.WriteLine("Locatario encontrado");
            }

            var user = await _userService.GetUserById((int)locatario.UsuarioId);

            var locatarioResult = new NoColaboradorUserModel {
            UsuarioId = (int)locatario.UsuarioId,
            RoleId = locatario.LocatarioId,
            Role = Roles.Locatario.ToString(),
            Nome = locatario.NomeCompletoLocatario,
            CPF = locatario.CPF,
            Telefone = locatario.NumeroTelefone,
            Nacionalidade = locatario.Nacionalidade,
            Endereco = locatario.Endereco,
            CNPJ = locatario.CNPJ,
            Passaporte = locatario.Passaporte,
            RG = locatario.RG,
            Email = user.Email,
            Ativo = user.Ativo,
            DataCriacao = user.DataRegistro,
            };

            Console.WriteLine("Locatario: " + locatarioResult);

            return Ok(locatarioResult);
        }

        [HttpGet("PegarTodosUsuarios")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersWithDetailsAsync();

                var result = users.Select(user => new NoColaboradorUserModel
                {
                    UsuarioId = user.UsuarioId,
                    RoleId = user.Locador?.LocadorId ?? 
                            user.Locatario?.LocatarioId ?? 
                            user.Colaborador?.ColaboradorId ?? 0,
                    Role = user.TipoUsuario,
                    Nome = user.Locador?.NomeCompletoLocador ??
                        user.Locatario?.NomeCompletoLocatario ??
                        user.Colaborador?.NomeCompleto,
                    CPF = user.Locador?.CPF ?? user.Locatario?.CPF,
                    Telefone = user.Locador?.Telefone,
                    Nacionalidade = user.Locador?.Nacionalidade,
                    Endereco = user.Locador?.Endereco,
                    CNPJ = user.Locador?.CNPJ,
                    Passaporte = user.Locatario?.Passaporte,
                    RG = user.Locador?.RG,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro,
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                await _applicationLog.LogAsync("Erro em GetAllUsers", ex.Message, ex.StackTrace);
                return StatusCode(500, "Ocorreu um erro ao processar a solicitação.");
            }
        }


        [HttpPost("AdicionarNovoUsuario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> AddNewUser([FromQuery] Roles role, [FromBody] NewUserModel userModel)
        {
            if (!ModelState.IsValid) // Verifica se o modelo é realmente válido
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                Email = userModel.Email,
                Senha = null,
                TipoUsuario = role.ToString(),
                Ativo = true,
                DataRegistro = DateTime.Now,
                DataAtualizacao = DateTime.Now
            };

            var newUser = await _userService.InsertNewUser(user, true);

            await _applicationLog.LogAsync($"Adicao de novo usuário, com o email {user.Email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(newUser);
        }

        [HttpGet("VerificarUsuarioExistente")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> CheckUserExist([FromQuery] string email)
        {
            var user = new User
            {
                Email = email
            };

            var userExist = await _userService.UserExist(user);

            return Ok(userExist);
        }

        [HttpGet("PegarUsuarioPorEmail")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
        {
            var user = await _userService.GetUserByEmail(email);
            return Ok(user);
        }

        [HttpGet("PegarUsuarioPorCPF")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetUserInfoRoleByCPF([FromQuery] string cpf)
        {
            var user = await _userService.GetUserByCPF(cpf);

            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            return Ok(user);
        }

        [HttpDelete("DeletarUsuario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> DeleteUser([FromQuery][EmailAddress] string email)
        {

            await _userService.DeleteUser(email);


            await _applicationLog.LogAsync($"Exclusão de usuário com o email {email}", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok("Usuário deletado com sucesso.");
        }

        [HttpPost("InativarUsuario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InactivateUser([FromQuery] string email)
        {

            await _userService.InactivateUser(email);

            await _applicationLog.LogAsync($"Inativação usuário, com o email {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok("Usuário inativado com sucesso.");
        }

        [HttpPost("CriarUsuarioLocador")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InsertNewUserLocador([FromQuery] string email, [FromBody] NewLocadorModel locador)
        {
            // Montar o objeto Locador
            var locadorNew = new Locador
            {
                UsuarioId = null,
                PessoaJuridica = false,
                CPF = locador.CPF,
                Nacionalidade = locador.Nacionalidade,
                NumeroTelefone = locador.NumeroTelefone,
                NomeCompletoLocador = locador.NomeCompletoLocador,
                CNPJ = locador.CNPJ,
                Endereco = locador.Endereco,
                Passaporte = locador.Passaporte,
                RG = locador.RG
            };


            var userLocador = await _userService.IsertNewUserLocador(email, locadorNew);

            // Forçar desserialização do objeto para devolver
            var user = userLocador.Item1;
            var locadorCretead = userLocador.Item2;

            await _applicationLog.LogAsync($"Criação de usuario Locador {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(new { user, locador });
        }

        [HttpPost("CriarUsuarioLocatario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InsertNewUserLocatario([FromQuery] string email, [FromBody] NewLocatarioModel locatario)
        {
            // Montar o objeto Locatario
            var locatarioNew = new Locatario
            {
                UsuarioId = null,
                CPF = locatario.CPF,
                Nacionalidade = locatario.Nacionalidade,
                NumeroTelefone = locatario.NumeroTelefone,
                NomeCompletoLocatario = locatario.NomeCompletoLocatario,
                CNPJ = locatario.CNPJ,
                Endereco = locatario.Endereco,
                Passaporte = locatario.Passaporte,
                RG = locatario.RG
            };

            var userLocatario = await _userService.IsertNewUserLocatario(email, locatarioNew);

            // Forçar desserialização do objeto para devolver
            var user = userLocatario.Item1;
            var locatarioCretead = userLocatario.Item2;

            await _applicationLog.LogAsync($"Criação de usuario Locatario {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(new { user, locatario });
        }

        [HttpPost("CriarUsuarioAdmin")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InsertNewUserColaboradorAdmin([FromQuery] string email, [FromBody] NewJuridicoAdmModel colaborador)
        {
            // Montar o objeto Colaborador
            var colaboradorNew = new Colaborador
            {
                UsuarioId = null,
                NomeCompleto = colaborador.NomeCompleto,
                TipoColaborador = Roles.Admin.ToString()
            };

            var userColaborador = await _userService.InsertNewUserColaborador(email, colaboradorNew);

            // Forçar desserialização do objeto para devolver
            var user = userColaborador.Item1;
            var colaboradorCretead = userColaborador.Item2;

            await _applicationLog.LogAsync($"Criação de usuario Admin {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(new { user, colaboradorCretead });
        }

        [HttpPost("CriarUsuarioJudiciario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InsertNewUserColaboradorJudiciario([FromQuery] string email, [FromBody] NewJuridicoAdmModel colaborador)
        {
            // Montar o objeto Colaborador
            var colaboradorNew = new Colaborador
            {
                UsuarioId = null,
                NomeCompleto = colaborador.NomeCompleto,
                TipoColaborador = Roles.Judiciario.ToString()
            };

            var userColaborador = await _userService.InsertNewUserColaborador(email, colaboradorNew);

            // Forçar desserialização do objeto para devolver
            var user = userColaborador.Item1;
            var colaboradorCretead = userColaborador.Item2;

            await _applicationLog.LogAsync($"Criação de usuario Judiciario {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(new { user, colaboradorCretead });
        }

        [HttpGet("VerificarUsuariosInativos")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> CheckInactiveUsers()
        {
            var users = await _userService.VerifyInactivityUser();
            return Ok(users);
        }

        [HttpPost("RedefinirSenhaUsuario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> ForgotPassword([FromQuery] string email)
        {
            var newPassword = await _userService.UserForgotPassword(email);
            await _applicationLog.LogAsync($"Usuario com {email}, redefinou a senha ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
            return Ok(newPassword);
        }

        [HttpPost("AlterarSenhaUsuario")]
        [Authorize(Policy = "AllRoles")]
        public async Task<IActionResult> ChangePassword([PasswordPropertyText] string oldPassword, [PasswordPropertyText] string newPassword)
        {
            
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value
                ?? throw new ArgumentNullException("Email não encontrado.");
                
            if(email == null)
            {
                return BadRequest("Email não encontrado.");
            }

            var newPass = await _userService.ChangePassword(email, oldPassword, newPassword);

            await _applicationLog.LogAsync($"Usuario com {email} alterou sua senha", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(newPass);
        }

    }
}