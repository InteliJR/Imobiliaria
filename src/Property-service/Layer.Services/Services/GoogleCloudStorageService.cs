using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using System;
using System.IO;
using System.Threading.Tasks;

public class GoogleCloudStorageService
{
    private readonly StorageClient _storageClient;
    private readonly string _bucketName;

    public GoogleCloudStorageService(string credentialsPath, string bucketName)
    {
        // Carrega as credenciais da conta de serviço
        var googleCredential = GoogleCredential.FromFile(credentialsPath);

        // Cria um cliente de storage
        _storageClient = StorageClient.Create(googleCredential);
        _bucketName = bucketName;
    }

    /// <summary>
    /// Faz upload de um arquivo para o Google Cloud Storage (Firebase Storage usa GCS).
    /// </summary>
    /// <param name="localFilePath">Caminho do arquivo local.</param>
    /// <param name="objectName">Nome do objeto no bucket de storage.</param>
    /// <returns>URL pública do arquivo.</returns>
    public async Task<string> UploadFileAsync(string localFilePath, string objectName)
    {
        try
        {
            using (var fileStream = File.OpenRead(localFilePath))
            {
                // Faz o upload do arquivo para o bucket
                var storageObject = await _storageClient.UploadObjectAsync(
                    bucket: _bucketName,
                    objectName: objectName,
                    contentType: null, // Pode ser ajustado para o tipo MIME do arquivo
                    source: fileStream);

                Console.WriteLine($"Arquivo {storageObject.Name} enviado para o bucket {storageObject.Bucket}.");

                // Retorna a URL pública do arquivo no Storage
                return $"https://storage.googleapis.com/{_bucketName}/{objectName}";
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao fazer upload do arquivo: {ex.Message}");
            throw;
        }
    }

    public async Task<List<string>> UploadMultipleFilesAsync(List<string> localFilePaths, List<string> objectNames)
    {
        if (localFilePaths.Count != objectNames.Count)
        {
            throw new ArgumentException("A lista de arquivos e de nomes dos objetos devem ter o memso tamanho.");
        }

        var publicUrls = new List<string>();

        for (int i = 0; i < localFilePaths.Count; i++)
        {
            try
            {
                using (var fileStream = File.OpenRead(localFilePaths[i]))
                {
                    var storageObject = await _storageClient.UploadObjectAsync(
                        bucket: _bucketName,
                        objectName: objectNames[i],
                        contentType: null,
                        source: fileStream
                    );

                    Console.WriteLine($"Arquivo {storageObject.Name} enviado para o bucket {storageObject.Bucket}.");

                    publicUrls.Add($"https://storage.googleapis.com/{_bucketName}/{objectNames[i]}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao fazer upload do arquivo {localFilePaths[i]}: {ex.Message}");
                throw;
            }
        }

        return publicUrls;
    }
}
