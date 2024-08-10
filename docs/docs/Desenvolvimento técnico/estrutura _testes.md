

---

## Introdução aos Testes

A qualidade e a confiabilidade de uma aplicação são fundamentais para garantir que ela funcione conforme esperado e atenda às necessidades dos usuários. Para alcançar esses objetivos, a implementação de uma estratégia de testes robusta é essencial. Nesta seção, apresentamos a estrutura de testes para a nossa API, incluindo testes unitários e de integração, que visam verificar a correta funcionalidade dos componentes individuais e a interação entre as diferentes partes do sistema.

### Objetivos dos Testes

Os principais objetivos dos testes são:

1. **Garantia de Qualidade**: Assegurar que todos os componentes da aplicação funcionem corretamente e de acordo com os requisitos especificados.
2. **Detecção Precoce de Defeitos**: Identificar e corrigir defeitos o mais cedo possível no ciclo de desenvolvimento, reduzindo custos e esforço de manutenção.
3. **Validação de Funcionalidades**: Verificar se todas as funcionalidades implementadas estão operando conforme esperado, através de diversos cenários de teste.
4. **Segurança e Robustez**: Garantir que a aplicação seja segura, robusta e capaz de lidar com entradas inválidas e situações inesperadas sem falhar.

### Tipos de Testes Implementados

Para assegurar a qualidade da aplicação, implementamos dois principais tipos de testes:

1. **Testes Unitários**: Focados em testar componentes individuais da aplicação, como funções ou métodos específicos. Utilizamos o framework `xUnit` para criar e executar testes unitários, garantindo que cada unidade de código funcione isoladamente de acordo com as especificações.

2. **Testes de Integração**: Focados em verificar a interação entre diferentes partes da aplicação. Estes testes garantem que os componentes funcionem corretamente quando integrados, validando o fluxo completo de uma funcionalidade através de múltiplos módulos ou sistemas.

### Estrutura de Testes

A estrutura de testes foi organizada de maneira a cobrir todos os aspectos críticos da aplicação:

- **Organização por Entidades**: Os testes são organizados em pastas e classes correspondentes a cada entidade da aplicação (ex. `Usuarios`, `Imoveis`, `Pagamentos`), facilitando a manutenção e a escalabilidade.
- **Cobertura de Funcionalidades Críticas**: Cada componente crítico da aplicação, como validações e operações de banco de dados, possui testes dedicados que garantem seu correto funcionamento.
- **Assertivas Detalhadas**: Utilizamos o `FluentAssertions` para tornar as assertivas mais legíveis e expressivas, facilitando a compreensão dos resultados dos testes.

### Benefícios dos Testes

A implementação de uma estratégia de testes abrangente traz diversos benefícios, incluindo:

- **Redução de Bugs em Produção**: Ao identificar e corrigir defeitos durante o desenvolvimento, reduzimos a probabilidade de problemas em produção.
- **Manutenção Facilitada**: Testes bem estruturados e organizados facilitam a manutenção e a refatoração do código, garantindo que mudanças não introduzam novos defeitos.
- **Confiança na Qualidade do Software**: Uma suite de testes robusta proporciona maior confiança na qualidade do software, permitindo que a equipe de desenvolvimento avance com maior segurança e agilidade.

### Execução dos Testes

Para executar os testes, utilizamos o `Test Explorer` no Visual Studio ou a linha de comando com o comando `dotnet test`. Este processo garante que todos os testes sejam executados e os resultados sejam coletados, permitindo a identificação rápida de quaisquer problemas.

---

## Estrutura de Testes para o Projeto

### Requisitos para os Testes

1. **Framework de Testes**:
   - Usar `xUnit` para testes unitários e de integração.
   - Utilizar `FluentAssertions` para assertivas mais legíveis e expressivas.

2. **Configuração Inicial**:
   - Adicionar as dependências necessárias no projeto (`xUnit`, `FluentAssertions`, `System.Net.Http.Json`).

3. **Cobertura dos Componentes Críticos**:
   - Testar todas as funcionalidades críticas como validações, criação de hash de senhas, e inserção de dados no banco.
   - Garantir que todos os componentes funcionem de maneira independente nos testes unitários e de maneira integrada nos testes de integração.

### Estrutura dos Testes Unitários

1. **Adicionar Dependências**:
    - No arquivo `.csproj`, adicionar as seguintes referências:

    ```xml
    <ItemGroup>
      <PackageReference Include="xunit" Version="2.4.1" />
      <PackageReference Include="xunit.runner.visualstudio" Version="2.4.3" />
      <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.9.4" />
      <PackageReference Include="FluentAssertions" Version="5.10.3" />
      <PackageReference Include="System.Net.Http.Json" Version="5.0.0" />
    </ItemGroup>
    ```

2. **Criar Projeto de Testes**:
    - Criar um projeto separado para os testes dentro da solução, chamado `Projeto.Tests`.

3. **Organização das Classes de Teste**:
    - Criar pastas para separar os testes por funcionalidades ou módulos, por exemplo:
        ```
        Projeto.Tests/
        ├── Usuarios/
        │   ├── UsuariosValidationTests.cs
        │   ├── PasswordHasherTests.cs
        ├── Imoveis/
        │   ├── ImoveisServiceTests.cs
        ├── Pagamentos/
        │   ├── PagamentosServiceTests.cs
        └── ...
        ```

4. **Exemplo de Classe de Teste Unitário**:
    - Para verificar a funcionalidade autônoma de hashing de senha, por exemplo, podemos ter um teste como o seguinte:

    ```csharp
    [Fact]
    public void HashPassword_ShouldReturnHashedPassword()
    {
        // Arrange
        var password = "minhasenha1234";
        var hasher = new PasswordHasher();

        // Act
        var hashedPassword = hasher.HashPassword(password);

        // Assert
        Assert.NotEqual(password, hashedPassword);
    }
    ```

### Estrutura dos Testes de Integração

1. **Configuração Inicial**:
    - Adicionar dependências de teste de integração no projeto (`xUnit`, `FluentAssertions`, `System.Net.Http.Json`).
    - Configurar um ambiente de teste que possa ser usado para rodar os testes de integração, como um banco de dados de teste.

2. **Organização dos Testes de Integração**:
    - Criar pastas e classes específicas para testes de integração, separando-os dos testes unitários.
        ```
        Projeto.Tests/
        ├── IntegrationTests/
        │   ├── UsuariosIntegrationTests.cs
        └── ...
        ```

3. **Exemplo de Classe de Teste de Integração**:
    - Dentro de cada classe de teste de integração, organize os métodos para testar o fluxo completo da funcionalidade, como a criação de um usuário que envolve validação, aplicação de regras de negócio e inserção no banco de dados:

    ```csharp
    [Fact]
    public async Task CreateUser_ShouldAddUserToDatabase()
    {
        // Arrange
        var newUser = new
        {
            email = "usuario@example.com",
            senha = "senha123",
            tipo_usuario = "administrador",
            ativo = true,
            data_de_criacao = "2024-07-27T12:00:00Z"
        };

        var client = new HttpClient
        {
            BaseAddress = new Uri("https://api.exemplo.com/v1/")
        };

        // Act
        var response = await client.PostAsJsonAsync("usuarios", newUser);
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);

        // Additional assertions can include verifying the user was correctly added to the database
    }
    ```

4. **Executar os Testes**:
    - Use o `Test Explorer` do Visual Studio para rodar e visualizar os resultados dos testes.
    - Para rodar os testes via linha de comando, use o comando:

    ```sh
    dotnet test
    ```

---

### Indicadores de Testes no xUnit

No xUnit, temos dois principais atributos que são utilizados para identificar e categorizar os testes: `Fact` e `Theory`. Ambos desempenham papéis importantes na estruturação dos testes, mas têm finalidades diferentes:

- **`Fact`**: Este atributo é usado para testes que são verdadeiros sob todas as circunstâncias. Em outras palavras, um teste decorado com `Fact` não depende de entradas externas ou variações de dados. Ele valida um fato único e absoluto sobre a aplicação.

    **Exemplo:**

    ```csharp
    [Fact]
    public void ShouldReturnTrueForValidUser()
    {
        var user = new User { IsActive = true };
        var result = user.IsActive;
        
        Assert.True(result);
    }
    ```

- **`Theory`**: Este atributo é usado para testes que precisam ser verificados sob várias condições ou com diferentes conjuntos de dados. `Theory` trabalha em conjunto com outros atributos como `InlineData`, que permite a passagem de múltiplas combinações de entradas para o teste.

    **Exemplo:**

    ```csharp
    [Theory]
    [InlineData(3, 5, 8)]
    [InlineData(2, 4, 6)]
    [InlineData(6, 6, 12)]
    public void AddNumbers_ShouldReturnCorrectSum(int a, int b, int

 expectedSum)
    {
        int sum = a + b;
        
        Assert.Equal(expectedSum, sum);
    }
    ```

### Cobertura de Código

Para garantir que a qualidade do código esteja sendo mantida, é recomendado definir uma meta mínima de cobertura de código. A cobertura de código é uma métrica que indica a porcentagem do código que é coberto pelos testes automatizados. Ao definir uma porcentagem mínima de cobertura, você assegura que a maioria das funcionalidades e fluxos de código estejam devidamente testados.

- **Meta de Cobertura de Código**: Sugerimos estabelecer uma meta mínima de **80%** de cobertura de código. Isso garante que a maioria do código seja testada, sem comprometer a agilidade do desenvolvimento. É importante monitorar essa métrica regularmente e integrar a verificação de cobertura de código no processo de integração contínua (CI).

    **Como Verificar a Cobertura de Código:**

    - Utilize ferramentas como `coverlet` para medir a cobertura de código em projetos .NET. Você pode integrá-lo ao Visual Studio ou rodar via linha de comando com:

    ```sh
    dotnet test /p:CollectCoverage=true
    ```

    - O relatório gerado indicará a porcentagem de código coberto e ajudará a identificar áreas que precisam de mais atenção nos testes.

---

### Fontes e Referências

1. **Documentação do xUnit**:
   - Site Oficial: [https://xunit.net/](https://xunit.net/)
   - Guia de Introdução: [https://xunit.net/docs/getting-started/netcore/cmdline](https://xunit.net/docs/getting-started/netcore/cmdline)
   - Exemplos e Tutoriais: [https://xunit.net/docs/comparisons](https://xunit.net/docs/comparisons)

2. **Documentação do FluentAssertions**:
   - Repositório GitHub: [https://github.com/fluentassertions/fluentassertions](https://github.com/fluentassertions/fluentassertions)
   - Guia de Uso: [https://fluentassertions.com/](https://fluentassertions.com/)
   - Exemplos Práticos: [https://fluentassertions.com/introduction](https://fluentassertions.com/introduction)

3. **Microsoft Docs**:
   - Testes Unitários no .NET: [https://docs.microsoft.com/pt-br/dotnet/core/testing/unit-testing-with-dotnet-test](https://docs.microsoft.com/pt-br/dotnet/core/testing/unit-testing-with-dotnet-test)
   - HttpClient para Testes: [https://docs.microsoft.com/pt-br/dotnet/api/system.net.http.httpclient?view=net-5.0](https://docs.microsoft.com/pt-br/dotnet/api/system.net.http.httpclient?view=net-5.0)
   - Testes de Integração no ASP.NET Core: [https://docs.microsoft.com/pt-br/aspnet/core/test/integration-tests?view=aspnetcore-5.0](https://docs.microsoft.com/pt-br/aspnet/core/test/integration-tests?view=aspnetcore-5.0)

4. **Blogs e Artigos**:
   - "Unit Testing in .NET Core using xUnit and Moq" por Code Maze: [https://code-maze.com/unit-testing-aspnetcore-web-api/](https://code-maze.com/unit-testing-aspnetcore-web-api/)
   - "Introduction to Integration Testing with xUnit and TestServer" por Andrew Lock: [https://andrewlock.net/introduction-to-integration-testing-with-xunit-and-testserver-in-asp-net-core/](https://andrewlock.net/introduction-to-integration-testing-with-xunit-and-testserver-in-asp-net-core/)

5. **Tutoriais em Vídeo**:
   - Pluralsight: "Testing .NET Core Applications with xUnit.net": [https://www.pluralsight.com/courses/xunit-dotnet-testing](https://www.pluralsight.com/courses/xunit-dotnet-testing)
   - YouTube: "Unit Testing in ASP.NET Core with xUnit" por Tim Corey: [https://www.youtube.com/watch?v=EXvIahupmJk](https://www.youtube.com/watch?v=EXvIahupmJk)

---
