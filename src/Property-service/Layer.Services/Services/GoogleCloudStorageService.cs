using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using System;
using System.IO;
using System.Threading.Tasks;
using Google.Cloud.Storage.V1;


public class GoogleCloudStorageService
{
    private readonly StorageClient _storageClient;
    private readonly string _bucketName;
    private readonly UrlSigner _urlSigner;

    public GoogleCloudStorageService(string credentialsPath, string bucketName)
    {
        // Carrega as credenciais da conta de serviço
        var googleCredential = GoogleCredential.FromFile(credentialsPath);

        var urlSigner = UrlSigner.FromCredential(googleCredential);
        _urlSigner = urlSigner;

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
                // Faz o upload do arquivo para o bucket, definindo o ContentType
                var storageObject = await _storageClient.UploadObjectAsync(
                    bucket: _bucketName,
                    objectName: objectName,
                    contentType: "image/jpeg",
                    source: fileStream
                );

                Console.WriteLine($"Arquivo {storageObject.Name} enviado para o bucket {storageObject.Bucket}.");

                // Ajusta o ContentDisposition para inline
                storageObject.ContentDisposition = "inline; filename=\"image.jpg\"";

                // Atualiza o objeto no Storage
                storageObject = await _storageClient.UpdateObjectAsync(storageObject);

                // Agora, a URL pública deve exibir a imagem inline no navegador
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
            throw new ArgumentException("A lista de arquivos e de nomes dos objetos devem ter o mesmo tamanho.");
        }

        var publicUrls = new List<string>();

        for (int i = 0; i < localFilePaths.Count; i++)
        {
            try
            {
                using (var fileStream = File.OpenRead(localFilePaths[i]))
                {
                    // Faz o upload do arquivo, definindo o ContentType
                    var storageObject = await _storageClient.UploadObjectAsync(
                        bucket: _bucketName,
                        objectName: objectNames[i],
                        contentType: "image/jpeg",
                        source: fileStream
                    );

                    Console.WriteLine($"Arquivo {storageObject.Name} enviado para o bucket {storageObject.Bucket}.");

                    // Ajusta o ContentDisposition para inline
                    storageObject.ContentDisposition = "inline; filename=\"image.jpg\"";
                    storageObject = await _storageClient.UpdateObjectAsync(storageObject);

                    // Adiciona a URL pública
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

    public async Task<string> GenerateSignedUrlAsync(string objectName, int expiryDurationInMinutes)
    {
        try
        {
            var requestTemplate = UrlSigner.RequestTemplate
                .FromBucket(_bucketName)
                .WithObjectName(objectName)
                .WithHttpMethod(HttpMethod.Get);

            var options = UrlSigner.Options.FromDuration(TimeSpan.FromMinutes(expiryDurationInMinutes));

            string signedUrl = _urlSigner.Sign(requestTemplate, options);

            return await Task.FromResult(signedUrl);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao gerar URL assinada: {ex.Message}");
            throw;
        }
    }

    public async Task<List<string>> GenerateSignedUrlsAsync(List<string> objectNames, int expiryDurationInMinutes)
    {
        var signedUrls = new List<string>();

        foreach (var objectName in objectNames)
        {
            try
            {
                var requestTemplate = UrlSigner.RequestTemplate
                    .FromBucket(_bucketName)
                    .WithObjectName(objectName)
                    .WithHttpMethod(HttpMethod.Get);

                var options = UrlSigner.Options.FromDuration(TimeSpan.FromMinutes(expiryDurationInMinutes));

                string signedUrl = _urlSigner.Sign(requestTemplate, options);

                // Console.WriteLine($"URL assinada para o objeto {objectName}: {signedUrl}");

                signedUrls.Add(signedUrl);
            }
            catch (Exception ex)
            {
                Console.WriteLine($" Erro ao gerar URL assinada para o objeto {objectName}: {ex.Message}");
                throw;
            }
        }

        return await Task.FromResult(signedUrls);
    }
}
