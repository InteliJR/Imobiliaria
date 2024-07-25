---
title: Modelo Fisico
sidebar_position: 1
description: Modelo Fisico do Banco de Dados do projeto.
---

# Modelo Fisico

<img src={require('../../static/img/modelo_fisico_imob.png').default} alt= "Example banner" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>

Com a modelagem conceitual pronta, a próxima etapa é a implementação do modelo físico. O modelo físico é a representação mais próxima da estrutura real do banco de dados, incluindo detalhes como a alocação de espaço em disco, a organização dos dados em armazenamento e a otimização para consultas. Este modelo é responsável por traduzir o modelo lógico (neste caso, o modelo conceitual) em estruturas de armazenamento físico, garantindo que os dados sejam armazenados de forma eficiente e acessíveis de maneira rápida e segura. A implementação do modelo físico envolve a definição de índices, a escolha de tipos de dados específicos para otimização de espaço e a configuração de parâmetros de armazenamento para melhorar o desempenho das operações de banco de dados.

#### Tabelas e Relações

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As tabelas definidas no projeto incluem:

- Tabela: **Contratos**: Armazena informações especificas dos contratos armazenados na plataforma
- Tabela: **Pagamentos**:Armazena informações de todos os pagamentos listados na plataforma
- Tabela: **Alugueis**:Armazena informações a respeito de todos alugueis ativos na plataforma
- Tabela: **Imoveis**:Armazena informações a respeito de todos os imoveis listados na plataforma
- Tabela: **Locatarios**:Armazena informações sobre os locatarios presentes na plataforma
- Tabela: **Usuarios**:Armazena dados específicos do usuário, incluindo informações pessoais e de contato.
- Tabela: **Administradores**:Armazena informações 
- Tabela: **Locadores**:Armazena informações sobre os locadores presentes na plataforma


#### Relacionamentos
- **Administradores**: Armazena informações relacionadas aos logins dos administradores da plataforma
  - **Contratos**: Um Locador pode ter contratos com vários imóveis, ou seja, (`1:N`). A chave estrangeira `id_locadores` na tabela contratos agora é única para refletir essa relação. Um Locatário pode ter contratos com vários imóveis, ou seja, (`1:N`). A chave estrangeira `id_locatarios` na tabela contratos agora é única para refletir essa relação. Um Imóvel pode possuir diversos contratos, sejam eles renovados ou reacordados, ou seja, (`1:N`). A chave estrangeira `id_imoveis` na tabela contratos agora é única para refletir essa relação.
  - **Pagamentos**: Um contrato pode ter vários pagamentos, estipulados pelo prazo do contrato dentro da plataforma (`1:N`). A chave estrangeira `id_contratos` na tabela pagamentos agora é única para refletir essa relação.
  - **Aluguéis**: Um aluguel pode ter vários pagamentos, devido à recorrência de meses no imóvel (`1:N`). E o mesmo imóvel pode ter mais de um contrato, devido à alteração ou reafirmação de contratos, porém apenas um deles estará ativo, ou seja, no futuro (`1:1`).
  - **Imóveis**: A tabela de imóveis não recebe relações diretas de outras tabelas.
  - **Locatário**: Um usuário locatário pode estar associado a apenas um perfil de locatários, ou seja, (`1:1`). A chave estrangeira `id_usuarios` na tabela locatários agora é única para refletir essa relação.
  - **Locadores**: Um usuário locador pode estar associado a apenas um perfil de locadores, ou seja, (`1:1`). A chave estrangeira `id_usuarios` na tabela locadores agora é única para refletir essa relação.
- **Usuários**: A tabela usuários armazena informações relacionadas ao login de usuários na plataforma.
  