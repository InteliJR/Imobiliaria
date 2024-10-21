using Layer.Domain.Entities;
using Layer.Domain.Enums;
using Layer.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Layer.Services.Services
{
    public class TokenService : ITokenService
    {
        private readonly JwtSettings _jwtSettings;
        private readonly IUserService _userService;
        private readonly ILocadorService _locadorService;
        private readonly ILocatarioService _locatarioService;
        private readonly IColaboradorService _colaboradorService;

        public TokenService(JwtSettings jwtSettings, IUserService userService, ILocadorService locadorService, ILocatarioService locatarioService, IColaboradorService colaboradorService)
        {
            _jwtSettings = jwtSettings;
            _userService = userService;
            _locadorService = locadorService;
            _locatarioService = locatarioService;
            _colaboradorService = colaboradorService;
        }

        public string GenerateToken(User user)
        {
            if(_userService.UserExist(user).Result == false)
            {
                throw new Exception("Usuário não existe.");
            }

            string role = "";
            int roleID = 0;

            if (user.TipoUsuario.ToString() == Roles.Locador.ToString())
            {
                role += Roles.Locador.ToString();
                roleID = _locadorService.GetLocadorByUserId(user.UsuarioId).Result.LocadorId;
            }
            else if (user.TipoUsuario.ToString() == Roles.Locatario.ToString())
            {
                role += Roles.Locatario.ToString();
                roleID = _locatarioService.GetLocatarioByUserId(user.UsuarioId).Result.LocatarioId;
            }
            else if (user.TipoUsuario.ToString() == Roles.Admin.ToString())
            {
                role += Roles.Admin.ToString();
                roleID = _colaboradorService.GetColaboradorByUserId(user.UsuarioId).Result.ColaboradorId;

            } else if (user.TipoUsuario.ToString() == Roles.Judiciario.ToString())
            {
                role += Roles.Judiciario.ToString();
                roleID = _colaboradorService.GetColaboradorByUserId(user.UsuarioId).Result.ColaboradorId;
            }


            var claims = new List<Claim>
            {
                // Lista de coisas/infos que o token vai ter
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, role), // Adiciona o role no token
                new Claim("RoleID", roleID.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_jwtSettings.ExpiryMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
