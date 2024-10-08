using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;

public class FirebaseService
{
    public FirebaseService()
    {
        // Inicializando o Firebase Admin SDK com a chave privada
        FirebaseApp.Create(new AppOptions()
        {
            Credential = GoogleCredential.FromFile("caminho-para-o-arquivo-json.json")
        });
    }

    public async Task<string> UploadDocumentAsync(string filePath, string fileName)
    {
        var storage = StorageClient.Create();
        var bucketName = "seu-projeto.appspot.com"; // Nome do bucket Firebase

        using (var fileStream = File.OpenRead(filePath))
        {
            var storageObject = await storage.UploadObjectAsync(bucketName, fileName, null, fileStream);
            return $"https://storage.googleapis.com/{bucketName}/{fileName}";
        }
    }
}
