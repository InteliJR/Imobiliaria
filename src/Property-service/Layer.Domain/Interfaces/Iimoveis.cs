using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Layer.Domain.Entities;

namespace Layer.Domain.Interfaces
{
    public interface Iimoveis
    {
        Task<List<Imoveis>> GetImoveisAsync();
    }
}