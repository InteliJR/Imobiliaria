---
title: Arquitetura micro da solução
sidebar_position: 12
description: Segue a arquitetura mais detalhada da solução proposta para o projeto.
---

# Arquitetura micro da solução

A seguir será descrito a arquitetura micro da solução proposta para o projeto, na seção [Arquitetura MACRO da solução](/docs/Entendimento%20do%20problema/arquitetura.md) foi apresentado uma visão mais geral da arquitertura. Aqui será apresentado uma visão mais detalhada e específica da arquitetura da solução.

## Arquitetura da solução

A arquitetura pensada para esturar o projeto foi a monolítica, que é um padrão de arquitetura de software onde todos os componentes de uma aplicação estão interligados e executados como uma única unidade. Em uma arquitetura monolítica, todas as funcionalidades do sistema (como a interface do usuário, lógica de negócio, acesso a dados, etc.) estão integradas em uma única aplicação. 

### Justificativa da escolha

O motivo de escolhermos a arquitetura monolítica foi a simplicidade e facilidade de desenvolvimento, pois o projeto não é muito complexo e não possui muitas funcionalidades complexas No mercado atualmente uma outra arquitetura muito utilizada é a arquitetura de microsserviços, que é uma arquitetura de software que consiste em um conjunto de serviços pequenos e independentes que se comunicam entre si para formar uma aplicação completa. Justificando a escolha da arquitetura monolítica sob a de microsserviços, temos que a arquitetura de microsserviços é mais complexa e difícil de ser implementada e não vimos necessidade de isolar as funcionalidades do sistema em serviços independentes.

Segue abaixo um diagrama da arquitetura monolítica proposta para o projeto:

<div align="center">
    <p> Arquitetura</p>
    <img src={require('../../static/img/arquitetura_micro.png').default} alt="Arquitetura micro" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>
    <p><b>Fonte:</b> Autoria própria.</p>
</div>

### Camadas da Arquitetura

Dando um zoom nas camadas da aplicação em si, temos:

#### Camada de Apresentação (UI)

**Responsabilidade:**
- A camada de apresentação é a interface do usuário (UI) do sistema. Ela é responsável por capturar a entrada do usuário e apresentar os dados de forma amigável. Nesta camada, o foco é a experiência do usuário, garantindo que ele possa interagir facilmente com o sistema.

#### Camada de Aplicação

**Responsabilidade:**
- A camada de aplicação age como um intermediário entre a UI e a lógica de negócio. Ela gerencia as requisições da UI, aplica validações iniciais, e encaminha as operações para a camada de negócios. São compostas pelos controllers e ViewModels.
  
#### Camada de Negócio

**Responsabilidade:**
- A camada de negócio encapsula a lógica de negócio do sistema. É nela que as regras de negócio e as validações complexas são implementadas, garantindo que o sistema funcione de acordo com os requisitos definidos.

#### Camada de Acesso a Dados

**Responsabilidade:**
- A camada de acesso a dados é responsável por interagir com o banco de dados PostgreSQL. Ela usa padrões como Repository para abstrair as operações de banco de dados e garantir um acesso modular aos dados.

#### Banco de Dados (Persistence Layer)

**Responsabilidade:**
- O banco de dados é responsável pelo armazenamento persistente dos dados. No sistema, é utilizado o PostgreSQL para gerenciar todas as informações críticas, como dados de usuários, imóveis, contratos, e transações financeiras. Nele temos o banco de dados relacional utilizado para o armazenamento de dados e um serviço na nuvem para aramazenamento de arquivos.
  
### Testes Unitários e de Integração

**Responsabilidade:**
- Garantir a qualidade do software através de testes automatizados que verificam se cada camada e componente funciona conforme o esperado. Os testes cobrem tanto a lógica de negócio quanto as interações com o banco de dados e integrações feitas. 


## Exemplo de Fluxo de Interação: Cadastro de Novo Usuário

### 1. Administrador Acessa a Página de Cadastro

- **Camada de Apresentação (UI):**
  - O administrador acessa a página de cadastro de usuário e preenche o formulário com os dados do novo usuário.
- **Camada de Aplicação:**
  - O controlador de usuários recebe os dados do formulário e valida as informações.
  
### 2. Envio dos Dados para o Serviço de Cadastro

- **Camada de Aplicação:**
  - O controlador de usuários chama o serviço de gerenciamento de usuários para processar o cadastro.
- **Camada de Negócio:**
  - O serviço de gerenciamento de usuários verifica a existência de um usuário com o mesmo e-mail ou nome de usuário.
  - O serviço cria um novo objeto de usuário e aplica as regras de negócio necessárias (como a atribuição de um papel específico, ex.: locatário, locador, administrador).
  
### 3. Persistência dos Dados no Banco de Dados

- **Camada de Acesso a Dados:**
  - O repositório de usuários salva os dados do novo usuário no banco de dados PostgreSQL.
  
### 4. Retorno e Feedback para o Administrador

- **Banco de Dados:**
  - PostgreSQL armazena as informações do novo usuário.
- **Resposta:**
  - O serviço confirma a criação do novo usuário e o controlador retorna um feedback para a UI.
- **Camada de Apresentação (UI):**
  - A interface exibe uma mensagem de sucesso ou erro ao administrador, dependendo do resultado do cadastro.

