---
title: User Stories
sidebar_position: 5
description: User Stories do projeto.
---

# User Stories
"User stories ou, em português, histórias de usuários, fazem parte de uma estrutura ágil e explicação informal que ilustra o recurso do software na perspectiva do usuário final ou cliente."

As User Stories descrevem as principais funcionalidades do projeto relacionando com as personas mapeadas. Cada história de usuário apresenta uma descrição clara das necessidades do usuário, permitindo que a equipe de desenvolvimento compreenda e implemente as funcionalidades de acordo com as expectativas. As histórias de usuário são fundamentais para o desenvolvimento ágil de software, pois orientam o planejamento, o desenvolvimento e a entrega de novas funcionalidades de forma incremental e centrada no usuário.

<div align="center">
  <p> <b>Tabela de User Stories </b> - User Story 1</p>

| Categoria             | Dados                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------|
| **Número**            | 1.1                                                                                   |
| **Título**            | Visualização de todas as informações dos contratos fechados                           |
| **Personas**          | Administrador(a) dos imóveis                                                          |
| **História**          | Eu, como responsável pela administração dos imóveis alugados, quero ter uma visualização completa de todos os contratos fechados (data de vencimento, data de pagamento, pdf's dos contratos, etc.).       |
| **Critérios de aceitação** | - **CR-01**: O usuário administrador consegue visualizar todas as informações dos contratos fechados. <br> - **Validação-01**: As informações estão organizadas de maneira clara. <br> - **Validação-02**: As informações mais relevantes de todos os contratos são encontradas. |
| **Testes de aceitação** | - **Critério de aceitação: CR-01** <br> a. O administrador seleciona determinado imóvel para visualizar suas informações. <br> – Os dados do contrato de locação do imóvel são visualizados = correto. <br> – Os dados do contrato de locação do imóvel não são visualizados = errado, deve ser corrigido. |


  <p><b>Fonte:</b> elaboração pela equipe.</p>
</div>

<div align="center">
  <p> <b>Tabela de User Stories </b> - User Story 2</p>

  | Categoria             | Dados                                                                                                               |
  |-----------------------|---------------------------------------------------------------------------------------------------------------------|
  | Número                | 1.2                                                                                                                 |
  | Título                | Emissão de boletos e envio de notificações de vencimento                                                                        |
  | Personas              | Administrador(a) dos imóveis                                                                                        |
  | História              | Eu, como responsável pela administração dos imóveis, quero emitir boletos e que aos locatários sejam notificados sobre a data de vencimento por e-mail e whatsapp para garantir que os pagamentos sejam feitos pontualmente. |
  | Critérios de aceitação| CR-01 - O sistema deve permitir a emissão de boletos de aluguel. <br /> Validação-01: Os boletos são gerados com todas as informações necessárias (valor, data de vencimento, etc.). <br /> Validação-02: Os boletos são notificados para os locatários dentro de 3 dias antes do vencimento. |
  | Testes de aceitação   | Critério de aceitação: <br /> CR-01 a. O administrador emite um boleto. <br /> – O boleto é gerado com todas as informações corretas = correto. <br /> – O boleto não contém todas as informações corretas = errado, deve ser corrigido. <br /> b. O administrador envia o boleto para o locatário. <br /> – O locatário recebe notificação por e-mail/whatsapp = correto. <br /> – O locatário não recebe notificação por e-mail/whatsapp = errado, deve ser corrigido. |

  <p><b>Fonte:</b> elaboração pela equipe.</p>
</div>

<div align="center">
  <p> <b>Tabela de User Stories </b> - User Story 3</p>

  | Categoria             | Dados                                                                                                               |
  |-----------------------|---------------------------------------------------------------------------------------------------------------------|
  | Número                | 1.3                                                                                                                 |
  | Título                | Diferentes tipos de usuários com visualizações específicas                                                          |
  | Personas              | Administrador(a) dos imóveis, Time Jurídico, Locador(a), Locatário(a)                                                              |
  | História              | Eu, como administrador dos imóveis, quero gerenciar as permissões e visualizações de diferentes tipos de usuários (locatário, locador, administrador, jurídico) para garantir que cada um tenha acesso apenas às informações pertinentes. |
  | Critérios de aceitação| CR-01 - O sistema deve permitir diferentes visualizações e permissões para cada tipo de usuário. <br /> Validação-01: O administrador consegue gerenciar as permissões de todos os usuários. <br /> Validação-02: Locatários veem apenas informações relevantes aos seus contratos. <br /> Validação-03: Locadores veem informações sobre os imóveis e contratos de seus inquilinos. <br /> Validação-03: Jurpidico veem informações sobre os imóveis e contratos sem restrições, porém sem acesso à edições e/ou inserções. |
  | Testes de aceitação   | Critério de aceitação: CR-01 a. O administrador define as permissões para um novo locatário. <br /> – O locatário vê apenas suas informações de contrato = correto. <br /> – O locatário vê informações não pertinentes = errado, deve ser corrigido. <br /> b. O administrador define as permissões para um novo locador. <br /> – O locador vê apenas informações dos imóveis e contratos pertinentes = correto. <br /> – O locador vê informações não pertinentes = errado, deve ser corrigido. <br /> – O jurídico visualiza informações de imóveis e contratos = correto. <br /> – O jurídico não visualiza informações de imóveis e contratos ou consegue editar informações = errado, deve ser corrigido. |

  <p><b>Fonte:</b> elaboração pela equipe.</p>
</div>

<div align="center">
  <p> <b>Tabela de User Stories </b> - User Story 4</p>

  | Categoria             | Dados                                                                                                               |
  |-----------------------|---------------------------------------------------------------------------------------------------------------------|
  | Número                | 1.4                                                                                                                 |
  | Título                | Cadastro de novos usuários pela administradora                                                                      |
  | Personas              | Administrador(a) dos imóveis                                                                                        |
  | História              | Eu, como administradora, quero cadastrar novos usuários na plataforma para garantir que somente pessoas autorizadas tenham acesso. |
  | Critérios de aceitação| CR-01 - O sistema deve permitir que apenas a administradora cadastre novos usuários. <br /> Validação-01: O cadastro deve incluir informações básicas (nome, e-mail, tipo de usuário, etc.). <br /> Validação-02: O usuário recém-cadastrado deve receber um e-mail de boas-vindas com instruções de acesso. |
  | Testes de aceitação   | Critério de aceitação: CR-01 a. A administradora cadastra um novo usuário. <br /> – O novo usuário é adicionado corretamente ao sistema = correto. <br /> – O novo usuário não é adicionado ou há erros no cadastro = errado, deve ser corrigido. b. O novo usuário recebe um e-mail de boas-vindas.<br /> – O e-mail é recebido com todas as informações corretas = correto. <br /> – O e-mail não é recebido ou contém informações incorretas = errado, deve ser corrigido. |

  <p><b>Fonte:</b> elaboração pela equipe.</p>
</div>

<div align="center">
  <p> <b>Tabela de User Stories </b> - User Story 5</p>

  | Categoria             | Dados                                                                                                               |
  |-----------------------|---------------------------------------------------------------------------------------------------------------------|
  | Número                | 1.5                                                                                                                 |
  | Título                | Cadastro de novos contratos                                                                      |
  | Personas              | Administrador(a) dos imóveis                                                                                        |
  | História              | Eu, como administradora, quero cadastrar novos contratos na plataforma. |
  | Critérios de aceitação| CR-01 - O sistema deve permitir que apenas a administradora cadastre novos contratos. <br /> Validação-01: O cadastro deve incluir informações gerais do contrato, bem como o envio do contrato em formato pdf. |
  | Testes de aceitação   | Critério de aceitação: CR-01 a. A administradora cadastra um novo contrato. <br /> – O novo usuário é adicionado corretamente ao sistema = correto. <br /> – O novo contrato não é adicionado ou há erros no cadastro = errado, deve ser corrigido. |

  <p><b>Fonte:</b> elaboração pela equipe.</p>
</div>

<div align="center">
  <p> <b>Tabela de User Stories </b> - User Story 6</p>

  | Categoria             | Dados                                                                                                               |
  |-----------------------|---------------------------------------------------------------------------------------------------------------------|
  | Número                | 1.6                                                                                                                 |
  | Título                | Salvamento de documentos pela administradora                                                                        |
  | Personas              | Administrador(a) dos imóveis                                                                                        |
  | História              | Eu, como administradora, quero salvar documentos como contratos e vistorias do imóvel na plataforma para ter um registro completo e acessível. |
  | Critérios de aceitação| CR-01 - O sistema deve permitir que a administradora salve documentos importantes. <br /> Validação-01: Os documentos são armazenados de maneira segura e acessível. <br /> Validação-02: Os documentos podem ser acessados rapidamente quando necessário. |
  | Testes de aceitação   | Critério de aceitação: CR-01 a. A administradora salva um contrato de aluguel. <br /> – O contrato é armazenado corretamente = correto. <br /> – O contrato não é armazenado ou ocorre um erro = errado, deve ser corrigido. <br /> b. A administradora acessa um documento salvo. <br /> – O documento é acessado sem problemas = correto. <br /> – O documento não pode ser acessado ou ocorre um erro = errado, deve ser corrigido. |

  <p><b>Fonte:</b> elaboração pela equipe.</p>
</div>

<div align="center">
  <p> <b>Tabela de User Stories </b> - User Story 7</p>

  | Categoria             | Dados                                                                                                               |
  |-----------------------|---------------------------------------------------------------------------------------------------------------------|
  | Número                | 1.7                                                                                                                 |
  | Título                | Relatório de informações básicas para os locadores                                                                  |
  | Personas              | Locador(a)                                                                                                          |
  | História              | Eu, como locador, quero receber um relatório mensal com informações básicas (imóveis, contratos, valores recebidos, IPTU, condomínio pagos e datas) para ter uma visão clara dos meus investimentos. |
  | Critérios de aceitação| CR-01 - O sistema deve gerar relatórios mensais para os locadores. Validação-01: Os relatórios contêm todas as informações relevantes e estão organizados de maneira clara. Validação-02: Os relatórios são enviados automaticamente por e-mail no final de cada mês. |
  | Testes de aceitação   | Critério de aceitação: CR-01 a. O sistema gera um relatório mensal. <br /> – O relatório contém todas as informações corretas = correto. <br /> – O relatório está faltando informações ou contém erros = errado, deve ser corrigido. <br /> b. O locador recebe o relatório por e-mail. <br /> – O e-mail é recebido com o relatório anexado = correto. <br /> – O e-mail não é recebido ou não contém o relatório = errado, deve ser corrigido. |

  <p><b>Fonte:</b> elaboração pela equipe.</p>
</div>

<div align="center">
  <p> <b>Tabela de User Stories </b> - User Story 8</p>

  | Categoria             | Dados                                                                                                               |
  |-----------------------|---------------------------------------------------------------------------------------------------------------------|
  | Número                | 1.7                                                                                                                 |
  | Título                | Envio de chamados de manutenção                                                                  |
  | Personas              | Locatário(a)                                                                                                          |
  | História              | Eu, como locatário, gostaria de poder notificar sobre a necessidade de manutenção dentro da plataforma da imobiliária |
  | Critérios de aceitação| CR-01 - O sistema deve permitir que os locatários enviem chamados de manutenção. <br /> Validação-01: Os chamados são enviados com todas as informações necessárias (tipo de problema, localização, etc.). <br /> Validação-02: Os chamados são registrados e acompanham o status de resolução. |
  | Testes de aceitação   | Critério de aceitação: CR-01 a. O locatário envia um chamado de manutenção. <br /> – O chamado é enviado corretamente = correto. <br /> – O chamado não é enviado ou contém informações incorretas = errado, deve ser corrigido. <br /> b. O locatário acompanha o status do chamado. <br /> – O status é atualizado corretamente = correto. <br /> – O status não é atualizado ou contém erros = errado, deve ser corrigido. |


  <p><b>Fonte:</b> elaboração pela equipe.</p>
</div>