using Layer.Domain.Entites;
using Layer.Domain.Interfaces;
using Layer.Infrastructure.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Services.Services
{
    public class ContratoService : IContratosRepository
    {
        private readonly ApplicationDbContext _dbcontext;
        private readonly GoogleCloudStorageService _storageService;

        public ContratoService(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "administradora-kk-firebase-adminsdk-1fa3k-7b4c700bd8.json");

            if (!File.Exists(filePath))
            {
                filePath = "/etc/secrets/administradora-kk-firebase-adminsdk-1fa3k-7b4c700bd8.json";
            }
            //var credentialsPath = @"C:\Users\Inteli\Desktop\Imobiliaria\src\Property-service\Layer.Application\imobiliaria-kk-firebase-adminsdk-f1416-d5111edc74.json";
            var bucketName = "administradora-kk.appspot.com"; // Substitua pelo nome correto do seu bucket
            _storageService = new GoogleCloudStorageService(filePath, bucketName);
        }

        public async Task<Contratos> AddAsync(Contratos contrato, IFormFile file)
        {
            if (file != null && file.Length > 0)
            {
                var tempFilePath = Path.GetTempFileName();
                using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var objectName = $"uploads/{file.FileName}";
                var publicUrl = await _storageService.UploadFileAsync(tempFilePath, objectName);

                contrato.Documentos = publicUrl;
            }

            await _dbcontext.Contratos.AddAsync(contrato);
            await _dbcontext.SaveChangesAsync();
            return contrato;
        }

        public async Task<string> AddDocumentToContractAsync(int contractId, IFormFile file)
        {
            var contrato = await GetByIdAsync(contractId);
            if (contrato == null)
            {
                return null;
            }

            try
            {
                // Caminho para upload no Firebase Storage
                string fileName = $"contratos/{contractId}/{Guid.NewGuid()}_{file.FileName}";
                
                // Upload para o Firebase usando o método adequado
                string documentUrl;
                
                // Criar arquivo temporário para upload
                var tempFilePath = Path.GetTempFileName();
                using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                
                // Upload do arquivo para o Firebase
                documentUrl = await _storageService.UploadFileAsync(tempFilePath, fileName);
                
                // Atualizar a lista de documentos no contrato
                List<string> documentos = new List<string>();
                
                if (!string.IsNullOrEmpty(contrato.Documentos))
                {
                    // Split por ',' ou ';' dependendo do formato usado em seu sistema
                    documentos = contrato.Documentos.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries).ToList();
                }
                
                documentos.Add(documentUrl);
                
                // Atualizar o campo Documentos com a string resultante
                contrato.Documentos = string.Join(";", documentos);
                
                // Atualizar o contrato no banco de dados
                await UpdateAsync(contractId, contrato);
                
                return documentUrl;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao fazer upload do documento: {ex.Message}");
                return null;
            }
        }

        public async Task<List<string>> GenerateSignedUrlsOfPdfsAsync(List<string> objectNames)
        {
            return await _storageService.GenerateSignedUrlsAsync(objectNames, 5);
        }


        public async Task<Contratos> AddAsyncWithMultipleFiles(Contratos contrato, IFormFileCollection files)
        {
            var documentos = new List<string>();

            if (files != null && files.Count > 0)
            {
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var tempFilePath = Path.GetTempFileName();
                        using (var stream = new FileStream(tempFilePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var objectName = $"uploads/{file.FileName}";
                        // Printar o nome do arquivo temporário
                        Console.WriteLine($"Nome do arquivo temporário: {tempFilePath}");
                        var publicUrl = await _storageService.UploadFileAsync(tempFilePath, objectName);

                        documentos.Add(publicUrl);
                    }
                }

                // Aqui você pode concatenar os documentos ou salvá-los como uma lista, dependendo da sua estrutura
                contrato.Documentos = string.Join(";", documentos);
            }

            await _dbcontext.Contratos.AddAsync(contrato);
            await _dbcontext.SaveChangesAsync();
            return contrato;
        }

        public async Task<Contratos> GetByIdAsync(int id)
        {
            return await _dbcontext.Contratos.FindAsync(id);
        }

        public async Task<List<Contratos>> GetAllAsync()
        {
            return await _dbcontext.Contratos.ToListAsync();
        }
        public async Task UpdateAsync(Contratos contrato)
        {
            _dbcontext.Contratos.Update(contrato);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(int id)
        {
            var contrato = await _dbcontext.Contratos.FindAsync(id);
            if (contrato == null)
            {
                return 0;
            }

            _dbcontext.Contratos.Remove(contrato);
            return await _dbcontext.SaveChangesAsync();
        }
        public async Task<int> UpdateAsync(int id, Contratos contratoAtualizado)
        {
            // Busca o contrato pelo id
            var contrato = await _dbcontext.Contratos.FindAsync(id);

            // Verifica se o contrato existe
            if (contrato == null)
            {
                return 0; // Retorna 0 se não encontrado
            }

            // Atualiza os campos do contrato
            contrato.Documentos = contratoAtualizado.Documentos;
            contrato.ValorAluguel = contratoAtualizado.ValorAluguel;
            contrato.DataInicio = contratoAtualizado.DataInicio;
            contrato.DataEncerramento = contratoAtualizado.DataEncerramento;
            contrato.LocadorId = contratoAtualizado.LocadorId;
            contrato.LocatarioId = contratoAtualizado.LocatarioId;
            contrato.ImovelId = contratoAtualizado.ImovelId;
            contrato.TipoGarantia = contratoAtualizado.TipoGarantia;
            contrato.CondicoesEspeciais = contratoAtualizado.CondicoesEspeciais;
            contrato.Status = contratoAtualizado.Status;
            contrato.Iptu = contratoAtualizado.Iptu;
            contrato.DataPagamento = contratoAtualizado.DataPagamento;
            contrato.TaxaAdm = contratoAtualizado.TaxaAdm;
            contrato.DataRescisao = contratoAtualizado.DataRescisao;
            contrato.Renovado = contratoAtualizado.Renovado;
            contrato.DataEncerramentoRenovacao = contratoAtualizado.DataEncerramentoRenovacao;
            contrato.ValorReajuste = contratoAtualizado.ValorReajuste;

            // Marca a entidade como atualizada
            _dbcontext.Contratos.Update(contrato);

            // Salva as mudanças e retorna o número de registros afetados
            return await _dbcontext.SaveChangesAsync();
        }
        public async Task<List<Contratos>> ObterContratosProximosReajusteAsync()
        {
            var dataAtual = DateTime.UtcNow.Date;
            var dataLimite = dataAtual.AddDays(7); // Busca contratos com reajuste nos próximos 7 dias

            return await _dbcontext.Contratos
                .Where(c => c.DataReajuste >= dataAtual && c.DataReajuste <= dataLimite)
                .Include(c => c.Locatario) // Inclui os dados do locatário
                .ToListAsync();
        }

        public async Task<List<Contratos>> GetContratosParaReajusteAsync(CancellationToken cancellationToken)
        {
            return await _dbcontext.Contratos
                .Where(c => c.DataReajuste.HasValue 
                            && c.DataReajuste.Value.Date == DateTime.UtcNow.Date 
                            && c.ValorReajuste.HasValue)
                .ToListAsync(cancellationToken);
        }

        public async Task<Contratos> GetByIdContratoAsync(int id)
        {
            return await _dbcontext.Contratos
                .Include(c => c.Locador)
                .Include(c => c.Locatario)
                .Include(c => c.Imovel)
                .FirstOrDefaultAsync(c => c.ImovelId == id);
        }

        public async Task<List<Contratos>> GetByImovelIdAsync(int imovelId)
        {
            return await _dbcontext.Contratos
                .Where(c => c.ImovelId == imovelId)
                .ToListAsync();
        }

        public async Task<Contratos?> GetContratoAtivoPorImovelIdAsync(int imovelId)
        {
            return await _dbcontext.Contratos
                .Where(c => c.ImovelId == imovelId && c.Status == "Ativo") // Filtra pelo status ativo
                .FirstOrDefaultAsync(); // Pega apenas um contrato (se existir)
        }



        // Método que aplica o reajuste no valor do aluguel e atualiza a data de reajuste
        public async Task AplicarReajusteAsync(Contratos contrato, CancellationToken cancellationToken)
        {
            contrato.ValorAluguel += contrato.ValorReajuste.Value;
            contrato.DataReajuste = DateTime.UtcNow.AddYears(1);  // Atualiza para o próximo ano

            _dbcontext.Contratos.Update(contrato);
            await _dbcontext.SaveChangesAsync(cancellationToken);
        }

        public async Task<bool> DeleteDocumentFromContractAsync(int contractId, string documentUrl)
        {
            var contrato = await _dbcontext.Contratos.FindAsync(contractId);
            if (contrato == null)
            {
                return false;
            }

            try {
                // Extrair o caminho do objeto do Storage a partir da URL completa
                string objectName;
                
                // Verificar se é uma URL do Google Storage
                if (documentUrl.Contains("storage.googleapis.com"))
                {
                    // Formato: https://storage.googleapis.com/administradora-kk.appspot.com/contratos/123/guid_arquivo.pdf
                    var uri = new Uri(documentUrl);
                    
                    // Remover parâmetros de query string
                    string path = uri.GetLeftPart(UriPartial.Path);
                    var segments = new Uri(path).PathAndQuery.Split('/');
                    
                    // Pular o primeiro segmento vazio e o nome do bucket
                    objectName = string.Join("/", segments.Skip(2));
                    
                    // Decodificar a URL (converter %C3%BA para ú, %20 para espaço, etc.)
                    objectName = Uri.UnescapeDataString(objectName);
                    
                    Console.WriteLine($"URL original: {documentUrl}");
                    Console.WriteLine($"Caminho extraído: {objectName}");
                }
                else
                {
                    // Se não for uma URL completa, usar o caminho como está (sem query string)
                    int queryIndex = documentUrl.IndexOf('?');
                    objectName = queryIndex > 0 ? documentUrl.Substring(0, queryIndex) : documentUrl;
                    
                    // Decodificar a URL mesmo para caminhos não completos
                    objectName = Uri.UnescapeDataString(objectName);
                    
                    Console.WriteLine($"URL original: {documentUrl}");
                    Console.WriteLine($"Caminho extraído: {objectName}");
                }
                
                // Deleta o arquivo do storage usando o caminho completo
                await _storageService.DeleteFileAsync(objectName);

                // Atualiza o campo Documentos no contrato usando o separador correto
                var documentos = new List<string>();
                if (!string.IsNullOrEmpty(contrato.Documentos))
                {
                    // Considerar ambos os separadores possíveis
                    documentos = contrato.Documentos.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries).ToList();
                }
                
                documentos.Remove(documentUrl);
                contrato.Documentos = string.Join(";", documentos);
                
                // Salva as alterações
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex) 
            {
                Console.WriteLine($"Erro ao deletar documento: {ex.Message}");
                return false;
            }
        }
    }
}
