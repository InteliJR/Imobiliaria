---
title: Modelo Fisico
sidebar_position: 1
description: Modelo Fisico do Banco de Dados do projeto.
---

# Modelo Fisico

<img src={require('../../static/img/modelo_fisico.jpeg').default} alt= "Example banner" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>

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

