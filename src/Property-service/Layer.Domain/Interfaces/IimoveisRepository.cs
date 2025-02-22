﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Layer.Domain.Entities;

using Layer.Domain.Entites;
using Microsoft.AspNetCore.Http;

namespace Layer.Domain.Interfaces
{
    public interface IimoveisRepository
    {
        Task<List<Imoveis>> GetImoveisAsync();
        Task<Imoveis> GetByIdImoveisAsync(int id);
        Task<Imoveis> PostImoveisAsync(Imoveis imovel);
        Task<int> UpdateImoveisAsync(int id, Imoveis imovel);
        Task<Imoveis> AddImoveisWithPhotosAsync(Imoveis imovel, IFormFileCollection files);
        Task<int> DeleteImoveisAsync(int id);
        Task<IEnumerable<Imoveis>> GetImoveisByIdLocador (int locadorId);
        Task<IEnumerable<Imoveis>> GetImoveisByIdLocatario (int locatarioId);
        Task<String> GenerateSignedUrlOfImovelImageAsync(string objectName);
        Task<List<string>> GenerateSignedUrlsOfImovelImagesAsync(List<string> objectNames);
        Task<List<string>> AddImovelPhotosAsync(int id, IFormFileCollection files);
        Task<int> DeleteImovelPhotoAsync(int id, string objectName);

       // Task<string> UpdateImovelPhotoAsync(int id, string TempFilePath, string objectName);
    }
}