---
title: Requisitos Funcionais e Não Funcionais
sidebar_position: 4
description: Requisitos Funcionais e Não Funcionais do projeto.
---

## Requisitos Funcionais e Não Funcionais

&emsp;&emsp; Requisitos, no contexto de software, são as funcionalidades e restrições que o sistema deve atender para satisfazer as necessidades dos usuários. Eles são divididos em dois tipos: requisitos funcionais e requisitos não funcionais.

&emsp;&emsp; Os **requisitos funcionais** descrevem as funcionalidades específicas que o sistema deve oferecer, como ações que o usuário pode realizar, operações do sistema e interações entre o usuário e o sistema. Já os **requisitos não funcionais** descrevem as características do sistema que não estão diretamente relacionadas às funcionalidades, como desempenho, segurança, usabilidade e compatibilidade.

&emsp;&emsp; A seguir, são apresentados os requisitos funcionais e não funcionais do projeto:

## Requisitos Funcionais

### RF-01: Funcionalidade de Login
O usuário deve ser capaz de realizar login para acessar os serviços da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                  |
| ----- | -------------------------------------------------------------------------- |
| CT-01 | Verifica se o usuário pode se conectar com credenciais válidas             |
| CT-02 | Verifica se uma mensagem de erro é mostrada para credenciais inválidas     |
| CT-03 | Verifica se o link de "Esqueceu sua Senha" redireciona corretamente        |
| CT-04 | Verifica se o serviço de autenticação retorna o nível de acesso do usuário |

### RF-02: Funcionalidade de Persistência de Login
O sistema deve ser capaz de manter uma sessão de usuário ativa por um período de tempo estendido ou até que o usuário faça logout.

**Casos de Teste**

| ID    | Descrição                                                               |
| ----- | ----------------------------------------------------------------------- |
| CT-05 | Verificar se a opção "Lembre de mim" é registrada com sucesso           |
| CT-06 | Verificar se a sessão é armazenada no cache do navegador                |
| CT-07 | Verificar se a persistência de login expira conforme o tempo configurado |
| CT-08 | Verificar se a persistência de login expira após realização de logout    |

### RF-03: Funcionalidade de Logout
O usuário deve ser capaz de realizar logout para encerrar sua sessão ativa dentro da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                           |
| ----- | ----------------------------------------------------------------------------------- |
| CT-09 | Verificar se o usuário pode realizar logout corretamente                            |
| CT-10 | Verificar se o usuário não pode acessar áreas protegidas após realizar logout       |
| CT-11 | Verificar se o logout afeta apenas a sessão atual, não afetando outros dispositivos |

### RF-04: Visualização de Perfil
O usuário deve ser capaz de visualizar e acessar informações pessoais e detalhes da conta na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                       |
| ----- | ------------------------------------------------------------------------------- |
| CT-12 | Verificar se o usuário consegue acessar a página de visualização de perfil       |
| CT-13 | Verificar se as informações exibidas no perfil estão corretas                   |
| CT-14 | Verificar se uma mensagem de erro é retornada em caso de falha na requisição    |

### RF-05: Edição de Perfil
A administradora deve ser capaz de editar informações dos usuários. Usuários devem ser capazes de alterar sua senha de acesso.

**Casos de Teste**

| ID    | Descrição                                                                 |
| ----- | ------------------------------------------------------------------------- |
| CT-15 | Verificar se a administradora consegue editar as informações de perfil com sucesso |
| CT-16 | Verificar se o usuário consegue alterar a senha com sucesso                |
| CT-17 | Verificar se uma mensagem de erro é exibida para entradas inválidas        |
| CT-18 | Verificar se uma confirmação é enviada por e-mail para ambas as partes     |

### RF-06: Redirecionamento para Suporte por WhatsApp
O usuário deve ser capaz de ser redirecionado para o suporte via WhatsApp de forma direta.

**Casos de Teste**

| ID    | Descrição                                                            |
| ----- | -------------------------------------------------------------------- |
| CT-19 | Verificar se o usuário consegue acessar o suporte via WhatsApp       |
| CT-20 | Verificar se o redirecionamento para o WhatsApp ocorre corretamente  |

### RF-07: Visualização de Contratos Assinados
O locador e locatário devem ser capazes de visualizar os seus contratos dentro da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-21 | Verificar se o locador e locatário conseguem acessar a lista de contratos     |
| CT-22 | Verificar se os contratos exibidos estão corretos                            |
| CT-23 | Verificar se uma mensagem é exibida quando não há contratos assinados         |
| CT-24 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento |

### RF-08: Visualização de Boletos Pendentes
O locatário deve ser capaz de visualizar os boletos de aluguel que estão pendentes de pagamento na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-25 | Verificar se o locatário consegue acessar a lista de boletos pendentes        |
| CT-26 | Verificar se os boletos pendentes exibidos estão corretos                     |
| CT-27 | Verificar se uma mensagem é exibida quando não há boletos pendentes           |
| CT-28 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento  |

### RF-09: Visualização de Histórico de Pagamentos
O locatário deve ser capaz de visualizar o histórico de pagamentos de aluguel realizados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-29 | Verificar se o locatário consegue acessar o histórico de pagamentos           |
| CT-30 | Verificar se o histórico de pagamentos exibe corretamente as transações       |
| CT-31 | Verificar se uma mensagem é exibida quando não há histórico de pagamentos      |
| CT-32 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento  |

### RF-10: Filtro de Boletos por Data
O locatário deve ser capaz de aplicar filtros por data para encontrar boletos específicos na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                    |
| ----- | -------------------------------------------------------------------------------------------- |
| CT-33 | Verificar se o locatário consegue aplicar filtros de data para boletos                        |
| CT-34 | Verificar se os boletos exibidos correspondem aos filtros aplicados                           |
| CT-35 | Verificar se uma mensagem de erro é exibida quando não há boletos correspondentes aos filtros |

### RF-11: Visualização de Contrato Específico
Os usuários devem ser capazes de visualizar detalhes específicos de um contrato na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-36 | Verificar se o usuário consegue acessar um contrato específico                                             |
| CT-37 | Verificar se as informações do contrato específico estão corretas                                            |
| CT-38 | Verificar se uma mensagem de erro é exibida quando o contrato solicitado não está disponível                 |
| CT-39 | Verificar se os dados principais, como número do contrato, estão disponíveis para copiar e colar             |

### RF-12: Visualização de Boleto Específico
O locatário deve ser capaz de visualizar detalhes específicos de um boleto na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-40 | Verificar se o locatário consegue acessar um boleto específico                                               |
| CT-41 | Verificar se as informações do boleto específico estão corretas                                              |
| CT-42 | Verificar se uma mensagem de erro é exibida quando o boleto solicitado não está disponível                   |
| CT-43 | Verificar se os dados principais, como número do boleto, estão dispostos textualmente para copiar e colar    |

### RF-13: Download de Contrato
O locatário deve ser capaz de baixar contratos em formato PDF através da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-44 | Verificar se o locatário pode baixar um contrato em formato PDF                                              |
| CT-45 | Verificar se o arquivo PDF baixado está completo e legível                                                   |
| CT-46 | Verificar se uma mensagem de erro é exibida quando ocorre falha no download                                  |
| CT-47 | Verificar se o contrato baixado pode ser aberto em diferentes leitores de PDF                                |

### RF-14: Download de Boleto
O locatário deve ser capaz de baixar boletos em formato PDF através da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-48 | Verificar se o locatário pode baixar um boleto em formato PDF                                                |
| CT-49 | Verificar se o arquivo PDF do boleto baixado está completo e legível                                         |
| CT-50 | Verificar se uma mensagem de erro é exibida quando ocorre falha no download                                  |
| CT-51 | Verificar se o boleto baixado pode ser aberto em diferentes leitores de PDF                                  |

### RF-15: Visualizar Imóveis
O locador deve ser capaz de visualizar os imóveis cadastrados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-52 | Verificar se o locador consegue acessar a lista de imóveis cadastrados       |
| CT-53 | Verificar se os imóveis exibidos estão corretos                              |
| CT-54 | Verificar se uma mensagem é exibida quando não há imóveis cadastrados        |
| CT-55 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento |

### RF-16: Visualizar Valores Recebidos pela Administradora
O locador deve ser capaz de visualizar os valores recebidos pela administradora através da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-56 | Verificar se o locador consegue acessar os valores recebidos pela administradora                                |
| CT-57 | Verificar se há um relatório de cada valor depositado                                |
| CT-58 | Verificar se uma mensagem é exibida quando não há valores recebidos                                          |
| CT-59 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento                                 |

### RF-17: Visualizar Comprovante de Pagamento de IPTU pela Administradora
O locador deve ser capaz de visualizar os comprovantes de pagamento de IPTU realizados pela administradora.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-60 | Verificar se o locador consegue acessar os comprovantes de pagamento de IPTU                                |
| CT-61 | Verificar se os comprovantes exibidos estão corretos                                                        |
| CT-62 | Verificar se uma mensagem é exibida quando não há comprovantes disponíveis                                  |
| CT-63 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento                                 |

### RF-18: Criação de Conta de Usuários
A administradora deve ser capaz de criar contas de usuários manualmente ou através do upload de um arquivo CSV.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-64 | Verificar se a administradora pode criar uma conta de usuário manualmente                                       |
| CT-65 | Verificar se a administradora pode criar contas de usuários através do upload de um arquivo CSV                |
| CT-66 | Verificar se uma mensagem de confirmação é exibida após a criação de uma conta                               |
| CT-67 | Verificar se um email com as credenciais é enviado para o usuário após a criação da conta                    |

### RF-19: Gerenciamento de Nível de Acesso
A administradora deve ser capaz de gerenciar o nível de acesso dos usuários cadastrados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-68 | Verificar se a administradora pode alterar o nível de acesso de um usuário                                     |
| CT-69 | Verificar se a administradora pode visualizar o nível de acesso atual de um usuário                             |
| CT-70 | Verificar se uma mensagem de confirmação é exibida após a alteração do nível de acesso                       |
| CT-71 | Verificar se uma mensagem de erro é exibida quando ocorre falha na alteração do nível de acesso              |

### RF-20: Visualização de Todos os Usuários
A administradora deve ser capaz de visualizar todos os usuários cadastrados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-72 | Verificar se a administradora pode acessar a lista completa de usuários cadastrados                             |
| CT-73 | Verificar se os usuários exibidos correspondem aos cadastrados na plataforma                                 |
| CT-74 | Verificar se uma mensagem é exibida quando não há usuários cadastrados                                       |
| CT-75 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento                                 |

### RF-21: Visualização de um Usuário Específico
A administradora deve ser capaz de visualizar informações detalhadas de um usuário específico na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-76 | Verificar se a administradora pode acessar informações detalhadas de um usuário específico                       |
| CT-77 | Verificar se as informações exibidas correspondem ao usuário específico buscado                              |
| CT-78 | Verificar se uma mensagem de erro é exibida quando o usuário específico não é encontrado                      |
| CT-79 | Verificar se os dados principais, como nome e e-mail, estão disponíveis para copiar e colar                   |

### RF-22: Remoção de Conta de Usuário
A administradora deve ser capaz de remover contas de usuários da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-80 | Verificar se a administradora pode remover uma conta de usuário da plataforma                                   |
| CT-81 | Verificar se uma mensagem de confirmação é exibida após a remoção da conta                                   |
| CT-82 | Verificar se uma mensagem de erro é exibida quando ocorre falha na remoção da conta                           |
| CT-83 | Verificar se a conta removida não pode mais acessar a plataforma após a remoção                              |

### RF-23: Cadastro de Imóveis
A administradora deve ser capaz de cadastrar novos imóveis na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-84 | Verificar se a administradora pode cadastrar um novo imóvel na plataforma                                       |
| CT-85 | Verificar se uma mensagem de confirmação é exibida após o cadastro do imóvel                                  |
| CT-86 | Verificar se uma mensagem de erro é exibida quando ocorre falha no cadastro do imóvel                          |
| CT-87 | Verificar se o imóvel cadastrado está disponível para visualização após o cadastro                           |

### RF-24: Cadastro de Contratos
A administradora deve ser capaz de cadastrar novos contratos na plataforma, incluindo campos como valor, aluguel, reajuste, tempo de contrato, condomínio e IPTU.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-88 | Verificar se a administradora pode cadastrar um novo contrato na plataforma                                     |
| CT-89 | Verificar se todos os campos obrigatórios são validados corretamente durante o cadastro do contrato           |
| CT-90 | Verificar se uma mensagem de confirmação é exibida após o cadastro do contrato                                |
| CT-91 | Verificar se uma mensagem de erro é exibida quando ocorre falha no cadastro do contrato                        |

### RF-25: Upload de Contrato por PDF
A administradora deve ser capaz de realizar o upload de contratos em formato PDF na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-92 | Verificar se a administradora pode fazer o upload de um contrato em formato PDF                              |
| CT-93 | Verificar se o contrato PDF está completo e legível após o upload                                            |
| CT-94 | Verificar se uma mensagem de confirmação é exibida após o upload do contrato                                  |
| CT-95 | Verificar se uma mensagem de erro é exibida quando ocorre falha no upload do contrato                         |

### RF-27: Verificação de Vencimento de Contratos
O sistema deve ser capaz de verificar automaticamente o vencimento dos contratos cadastrados na plataforma.

**Casos de Teste**

| ID      | Descrição                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------- |
| CT-100  | Verificar se o sistema pode verificar o vencimento dos contratos automaticamente                             |
| CT-101  | Verificar se o sistema envia notificações quando um contrato está próximo do vencimento                      |
| CT-102  | Verificar se uma mensagem de erro é exibida quando ocorre falha na verificação do vencimento do contrato     |


### RF-29: Envio de Notificação de Pagamento Próximo por E-mail
O sistema deve ser capaz de enviar notificações por e-mail aos usuários quando contratos ou boletos estão próximos do vencimento ou quando ocorrem ajustes.

**Casos de Teste**

| ID      | Descrição                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------- |
| CT-106  | Verificar se o sistema pode enviar notificações por e-mail para contratos próximos do vencimento ou com ajustes  |
| CT-107  | Verificar se o sistema pode enviar notificações por e-mail para boletos próximos do vencimento               |
| CT-108  | Verificar se uma mensagem de confirmação é exibida após o envio da notificação por e-mail                    |
| CT-109  | Verificar se uma mensagem de erro é exibida quando ocorre falha no envio da notificação por e-mail           |

### RF-30: Envio de Notificação de Boleto Gerado por E-mail
O sistema deve ser capaz de enviar notificações por e-mail aos usuários quando novos boletos de pagamento são gerados.

**Casos de Teste**

| ID      | Descrição                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------- |
| CT-110  | Verificar se o sistema pode enviar notificações por e-mail quando novos boletos são gerados                  |
| CT-111  | Verificar se o sistema envia o boleto gerado como anexo no e-mail                                            |
| CT-112  | Verificar se uma mensagem de confirmação é exibida após o envio da notificação por e-mail                    |
| CT-113  | Verificar se uma mensagem de erro é exibida quando ocorre falha no envio da notificação por e-mail           |

### RF-32: Dashboard de Contratos para Locador
O sistema deve fornecer ao locador um painel que mostre todos os imóveis que ele possui em contrato, incluindo o status de pagamentos, próximos reajustes e histórico de interações.

**Casos de Teste**

| ID    | Descrição                                                                            |
| ----- | ------------------------------------------------------------------------------------ |
| CT-118 | Verificar se o locador consegue acessar o painel de contratos                          |
| CT-119 | Verificar se o painel exibe corretamente o status de pagamentos para cada imóvel      |
| CT-120 | Verificar se o painel exibe corretamente as informações de próximos reajustes         |
| CT-121 | Verificar se o painel exibe corretamente o histórico de interações relacionadas aos imóveis  |

### RF-33: Acompanhamento Financeiro para Locador
O sistema deve permitir ao locador visualizar os recebimentos de aluguéis, multas e outras receitas, com a opção de gerar extratos mensais e relatórios financeiros.

**Casos de Teste**

| ID    | Descrição                                                                                    |
| ----- | -------------------------------------------------------------------------------------------- |
| CT-122 | Verificar se o locador consegue visualizar os recebimentos de aluguéis, multas e outras receitas |
| CT-123 | Verificar se o locador consegue gerar extratos mensais                                        |
| CT-124 | Verificar se o locador consegue gerar relatórios financeiros                                  |
| CT-125 | Verificar se os extratos e relatórios gerados estão corretos e completos                     |

### RF-34: Acesso a Documentos para Locador
O sistema deve permitir ao locador visualizar e baixar contratos, laudos de vistoria e documentos jurídicos relacionados aos imóveis que possui.

**Casos de Teste**

| ID    | Descrição                                                                                    |
| ----- | -------------------------------------------------------------------------------------------- |
| CT-126 | Verificar se o locador consegue acessar a lista de documentos relacionados aos seus imóveis |
| CT-127 | Verificar se o locador consegue visualizar contratos, laudos de vistoria e documentos jurídicos  |
| CT-128 | Verificar se o locador consegue baixar os documentos visualizados                              |
| CT-129 | Verificar se os documentos baixados estão completos e legíveis                                 |

### RF-35: Dashboard de Pagamentos para Locatário
O sistema deve fornecer ao locatário um painel que mostre os próximos pagamentos, o histórico de pagamentos efetuados e possíveis pendências.

**Casos de Teste**

| ID    | Descrição                                                                             |
| ----- | ------------------------------------------------------------------------------------- |
| CT-130 | Verificar se o locatário consegue acessar o painel de pagamentos                      |
| CT-131 | Verificar se o painel exibe corretamente os próximos pagamentos                       |
| CT-132 | Verificar se o painel exibe corretamente o histórico de pagamentos efetuados          |
| CT-133 | Verificar se o painel exibe corretamente as pendências de pagamento                   |


### RF-33.3: Solicitações de Manutenção para Locatário
O sistema deve fornecer uma ferramenta para que o locatário solicite reparos e acompanhe o status das solicitações, com comunicação realizada via API do WhatsApp.

**Casos de Teste**

| ID    | Descrição                                                                              |
| ----- | -------------------------------------------------------------------------------------- |
| CT-138 | Verificar se o locatário consegue abrir uma solicitação de manutenção na plataforma    |
| CT-139 | Verificar se o locatário consegue acompanhar o status das solicitações de manutenção   |
| CT-140 | Verificar se a comunicação via WhatsApp é iniciada corretamente para as solicitações   |
| CT-141 | Verificar se uma mensagem de erro é exibida em caso de falha na abertura da solicitação |

### RF-33.5: Gestão de Documentos para Locatário
O sistema deve permitir ao locatário acessar contratos e laudos de vistoria relacionados ao imóvel que está locando.

**Casos de Teste**

| ID    | Descrição                                                                              |
| ----- | -------------------------------------------------------------------------------------- |
| CT-146 | Verificar se o locatário consegue acessar a lista de contratos e laudos de vistoria   |
| CT-147 | Verificar se o locatário consegue visualizar os documentos relacionados ao imóvel     |
| CT-148 | Verificar se os documentos acessados estão completos e legíveis                       |
| CT-149 | Verificar se uma mensagem de erro é exibida em caso de falha ao acessar os documentos |

### RF-33.6: Comunicação com a Administração para Locatário
O sistema deve oferecer um canal direto para que o locatário possa se comunicar com o administrador sobre questões relacionadas ao imóvel, utilizando o WhatsApp.

**Casos de Teste**

| ID    | Descrição                                                                              |
| ----- | -------------------------------------------------------------------------------------- |
| CT-150 | Verificar se o locatário consegue acessar o canal de comunicação com a administração  |
| CT-151 | Verificar se a comunicação via WhatsApp é iniciada corretamente                       |
| CT-152 | Verificar se as mensagens enviadas pelo locatário são registradas no sistema          |
| CT-153 | Verificar se uma mensagem de erro é exibida em caso de falha na comunicação           |

### RF-34.1: Gestão Centralizada para Administrador
O sistema deve fornecer ao administrador um painel centralizado para gerenciar todos os contratos, imóveis, usuários (locadores e locatários) e processos financeiros.

**Casos de Teste**

| ID    | Descrição                                                                                     |
| ----- | --------------------------------------------------------------------------------------------- |
| CT-154 | Verificar se o administrador consegue acessar o painel centralizado                          |
| CT-155 | Verificar se o painel permite a visualização e gestão de todos os contratos                   |
| CT-156 | Verificar se o painel permite a visualização e gestão de todos os imóveis                     |
| CT-157 | Verificar se o painel permite a visualização e gestão de todos os usuários                    |
| CT-158 | Verificar se o painel permite a visualização e gestão de todos os processos financeiros       |

### RF-34.2: Gestão de Contratos para Administrador
O sistema deve permitir ao administrador criar, editar e cancelar contratos, definir prazos, reajustes.

**Casos de Teste**

| ID    | Descrição                                                                                     |
| ----- | --------------------------------------------------------------------------------------------- |
| CT-159 | Verificar se o administrador consegue criar novos contratos                                   |
| CT-160 | Verificar se o administrador consegue editar contratos existentes                             |
| CT-161 | Verificar se o administrador consegue cancelar contratos                                      |
| CT-162 | Verificar se o sistema permite definir prazos e reajustes para os contratos                   |
| CT-163 | Verificar se o sistema envia notificações automáticas relacionadas aos contratos              |
| CT-164 | Verificar se uma mensagem de erro é exibida em caso de falha na criação, edição ou cancelamento de contratos |

### RF-34.3: Gestão de Pagamentos para Administrador
O sistema deve permitir ao administrador controlar a emissão de boletos, o recebimento de pagamentos, a aplicação de multas e juros, e o repasse dos valores ao locador.

**Casos de Teste**

| ID    | Descrição                                                                                     |
| ----- | --------------------------------------------------------------------------------------------- |
| CT-165 | Verificar se o administrador consegue emitir boletos de pagamento                             |
| CT-166 | Verificar se o administrador consegue registrar o recebimento de pagamentos                   |
| CT-167 | Verificar se o administrador consegue aplicar multas e juros quando necessário                |
| CT-168 | Verificar se o sistema permite o repasse dos valores recebidos ao locador                     |
| CT-169 | Verificar se uma mensagem de erro é exibida em caso de falha na emissão ou controle dos pagamentos |

### RF-34.4: Comunicação e Notificações para Administrador
O sistema deve permitir ao administrador enviar notificações e comunicados aos locadores e locatários, registrando todas as comunicações realizadas.

**Casos de Teste**

| ID    | Descrição                                                                                     |
| ----- | --------------------------------------------------------------------------------------------- |
| CT-170 | Verificar se o administrador consegue enviar notificações para locadores e locatários         |
| CT-171 | Verificar se as notificações enviadas são registradas no sistema                              |
| CT-172 | Verificar se o administrador consegue enviar comunicados gerais                               |
| CT-173 | Verificar se uma mensagem de erro é exibida em caso de falha no envio das notificações ou comunicados |

### RF-34.5: Relatórios e Auditoria para Administrador
O sistema deve permitir ao administrador gerar relatórios financeiros e contratuais, com logs detalhados das atividades de todos os usuários no sistema.

**Casos de Teste**

| ID    | Descrição                                                                                     |
| ----- | --------------------------------------------------------------------------------------------- |
| CT-174 | Verificar se o administrador consegue gerar relatórios financeiros                           |
| CT-175 | Verificar se o administrador consegue gerar relatórios contratuais                            |
| CT-176 | Verificar se o sistema registra logs detalhados das atividades dos usuários                   |
| CT-177 | Verificar se os relatórios gerados estão corretos e completos                                 |
| CT-178 | Verificar se uma mensagem de erro é exibida em caso de falha na geração de relatórios ou logs  |

### RF-34.6: Dashboards para Controle de Usuários para Administrador
O sistema deve fornecer ao administrador dashboards para a visualização e gestão de usuários cadastrados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                     |
| ----- | --------------------------------------------------------------------------------------------- |
| CT-179 | Verificar se o administrador consegue acessar os dashboards de controle de usuários           |
| CT-180 | Verificar se os dashboards permitem a visualização de todos os usuários cadastrados           |
| CT-181 | Verificar se o administrador consegue gerenciar (editar, ativar/desativar) usuários através dos dashboards |
| CT-182 | Verificar se uma mensagem de erro é exibida em caso de falha na visualização ou gestão dos usuários  |

### RF-35.1: Acesso a Contratos e Documentos Jurídicos para Time Jurídico
O sistema deve permitir ao time jurídico visualizar e fazer o download de todos os contratos e documentos jurídicos relacionados a locações.

**Casos de Teste**

| ID    | Descrição                                                                              |
| ----- | -------------------------------------------------------------------------------------- |
| CT-183 | Verificar se o time jurídico consegue acessar a lista de contratos relacionados às locações  |
| CT-184 | Verificar se o time jurídico consegue visualizar os contratos disponíveis               |
| CT-185 | Verificar se o time jurídico consegue fazer o download dos contratos visualizados       |
| CT-186 | Verificar se o time jurídico consegue acessar a lista de documentos jurídicos relacionados às locações |
| CT-187 | Verificar se o time jurídico consegue visualizar os documentos jurídicos disponíveis     |
| CT-188 | Verificar se o time jurídico consegue fazer o download dos documentos jurídicos visualizados |
| CT-189 | Verificar se os documentos baixados estão completos e legíveis                          |
| CT-190 | Verificar se uma mensagem de erro é exibida em caso de falha ao acessar ou baixar os documentos  |

### RF-35.2: Visualização de Logs de Atividades Relacionadas aos Litígios para Time Jurídico
O sistema deve permitir ao time jurídico visualizar logs detalhados das atividades relacionadas aos litígios.

**Casos de Teste**

| ID    | Descrição                                                                                      |
| ----- | ------------------------------------------------------------------------------------------------|
| CT-191 | Verificar se o time jurídico consegue acessar os logs de atividades relacionadas aos litígios   |
| CT-192 | Verificar se os logs exibem detalhes completos das atividades realizadas                        |
| CT-193 | Verificar se o sistema permite a filtragem dos logs por data, tipo de atividade ou usuário       |
| CT-194 | Verificar se os logs exibidos estão corretos e atualizados                                       |
| CT-195 | Verificar se uma mensagem de erro é exibida em caso de falha ao acessar ou visualizar os logs    |


### RF-32.4: Acesso Restrito para Locador
O sistema deve garantir que o locador tenha acesso somente aos imóveis e contratos nos quais ele está envolvido.

**Casos de Teste**

| ID    | Descrição                                                                                      |
| ----- | ------------------------------------------------------------------------------------------------|
| CT-201 | Verificar se o locador só consegue visualizar os imóveis nos quais ele é parte envolvida         |
| CT-202 | Verificar se o locador só consegue visualizar os contratos nos quais ele é parte envolvida       |
| CT-203 | Verificar se o locador não consegue acessar imóveis ou contratos nos quais ele não está envolvido |
| CT-204 | Verificar se uma mensagem de erro é exibida em caso de tentativa de acesso não autorizado         |

### RF-33.7: Acesso Restrito para Locatário
O sistema deve garantir que o locatário tenha acesso limitado ao contrato e imóvel que ele está locando.

**Casos de Teste**

| ID    | Descrição                                                                                      |
| ----- | ------------------------------------------------------------------------------------------------|
| CT-205 | Verificar se o locatário só consegue visualizar o imóvel que ele está locando                   |
| CT-206 | Verificar se o locatário só consegue visualizar o contrato relacionado ao imóvel que ele está locando |
| CT-207 | Verificar se o locatário não consegue acessar imóveis ou contratos que não estão relacionados a ele |
| CT-208 | Verificar se uma mensagem de erro é exibida em caso de tentativa de acesso não autorizado         |

### RF-34.8: Deletar Usuários Inativos
O sistema deve deletar automaticamente os usuários inativos que não tenham contratos ativos após 30 dias de inatividade.

**Casos de Teste**

| ID    | Descrição                                                                                              |
| ----- | ------------------------------------------------------------------------------------------------------ |
| CT-209 | Verificar se o sistema identifica corretamente os usuários inativos sem contratos ativos               |
| CT-210 | Verificar se o sistema deleta os usuários inativos que não tenham contratos ativos após 30 dias        |
| CT-211 | Verificar se o sistema notifica o administrador antes de deletar os usuários inativos                   |
| CT-212 | Verificar se uma mensagem de erro é exibida em caso de falha ao tentar deletar usuários inativos        |
| CT-213 | Verificar se os usuários deletados não conseguem mais acessar a plataforma após a exclusão              |

### RF-34.9: Notificação de Reajuste de Aluguel
O sistema deve notificar o administrador um mês antes do reajuste de aluguel programado para cada contrato.

**Casos de Teste**

| ID    | Descrição                                                                                          |
| ----- | -------------------------------------------------------------------------------------------------- |
| CT-214 | Verificar se o sistema identifica corretamente os contratos com reajuste de aluguel programado     |
| CT-215 | Verificar se o sistema envia uma notificação ao administrador um mês antes do reajuste de aluguel  |
| CT-216 | Verificar se a notificação contém todas as informações relevantes sobre o contrato e o reajuste    |
| CT-217 | Verificar se uma mensagem de erro é exibida em caso de falha ao enviar a notificação                |

### RF-34.10: Inserção de Atraso por Administrador
O sistema deve permitir que o administrador insira um atraso nos pagamentos e justifique o motivo dentro do fluxo de pagamento.

**Casos de Teste**

| ID    | Descrição                                                                                          |
| ----- | -------------------------------------------------------------------------------------------------- |
| CT-218 | Verificar se o administrador consegue inserir um atraso nos pagamentos                             |
| CT-219 | Verificar se o sistema permite ao administrador justificar o motivo do atraso                       |
| CT-220 | Verificar se o atraso e a justificativa são registrados corretamente no sistema                     |
| CT-221 | Verificar se uma mensagem de erro é exibida em caso de falha ao inserir o atraso ou a justificativa |

### RF-34.11: Campo de Justificativa no Fluxo de Pagamento
O sistema deve permitir ao administrador adicionar um campo de justificativa para um determinado pagamento dentro do fluxo de pagamento.

**Casos de Teste**

| ID    | Descrição                                                                                          |
| ----- | -------------------------------------------------------------------------------------------------- |
| CT-222 | Verificar se o sistema permite ao administrador adicionar uma justificativa para um pagamento      |
| CT-223 | Verificar se o campo de justificativa é exibido corretamente no fluxo de pagamento                 |
| CT-224 | Verificar se a justificativa inserida é armazenada corretamente no sistema                         |
| CT-225 | Verificar se a justificativa está associada corretamente ao pagamento específico                   |
| CT-226 | Verificar se uma mensagem de erro é exibida em caso de falha ao adicionar ou salvar a justificativa |

### RF-34.12: Registro de Rescisão de Contrato pelo Administrador
O sistema deve permitir que o administrador registre a rescisão de contratos, incluindo as informações relevantes sobre a rescisão.

**Casos de Teste**

| ID    | Descrição                                                                                          |
| ----- | -------------------------------------------------------------------------------------------------- |
| CT-227 | Verificar se o administrador consegue acessar a opção de registrar a rescisão de contrato           |
| CT-228 | Verificar se o sistema permite ao administrador inserir todas as informações necessárias para a rescisão |
| CT-229 | Verificar se o contrato é marcado como rescindido após o registro pelo administrador                 |
| CT-230 | Verificar se o sistema atualiza o status do imóvel relacionado à rescisão (por exemplo, desocupado) |
| CT-231 | Verificar se uma mensagem de erro é exibida em caso de falha ao registrar a rescisão de contrato     |


## **Requisitos Não Funcionais**

### **Usabilidade**
1. **Nota de Usabilidade:**
   - O sistema deve alcançar uma nota mínima de 70 de acordo com a **System Usability Scale (SUS)**.

### **Segurança**
2. **Conformidade com a LGPD:**
   - O sistema deve estar em total conformidade com a **Lei Geral de Proteção de Dados (LGPD)**, garantindo a proteção dos dados pessoais dos usuários.
   
3. **Criptografia de Dados Sensíveis:**
   - 100% dos dados sensíveis devem ser armazenados de forma criptografada, utilizando algoritmos robustos como **AES (Advanced Encryption Standard)**.
   
4. **Autenticação Multifator:**
   - O sistema deve implementar **autenticação multifator (MFA)** para o acesso de todos os usuários, aumentando a segurança contra acessos não autorizados.

### **Eficiência**
5. **Tempo de Resposta:**
   - O sistema deve ser capaz de responder a 90% das requisições em até **2 segundos**.
   
6. **Capacidade de Suporte a Requisições Simultâneas:**
   - O sistema deve suportar um volume de até **400 requisições simultâneas** sem apresentar oscilação.

### **Compatibilidade**
7. **Compatibilidade com Navegadores:**
   - O sistema deve ser plenamente funcional nas versões mais recentes dos principais navegadores, incluindo:
     - **Google Chrome** (últimas 3 versões)
     - **Mozilla Firefox** (últimas 3 versões)
     - **Microsoft Edge** (últimas 3 versões)
     - **Apple Safari** (últimas 3 versões)
     - **Opera** (últimas 3 versões)
   
8. **Compatibilidade com Sistemas Operacionais e Dispositivos:**
   - O sistema deve operar corretamente em dispositivos com diferentes sistemas operacionais, incluindo:
     - **Desktops e Laptops:**
       - **Windows 10** e **Windows 11**
       - **macOS 10.15** ou superior
       - Distribuições **Linux**
     - **Tablets:**
       - iOS (últimas 3 versões)
       - Android (últimas 3 versões)
     - **Smartphones:**
       - iOS (últimas 3 versões)
       - Android (últimas 3 versões)

### Acessibilidade
9. **Conformidade com WCAG:**
    - O sistema deve estar em conformidade com as diretrizes WCAG 2.1 no nível A, obrigatoriamente, e no nível AA, preferencialmente.

### **Portabilidade**
10. **Portabilidade de Dados:**
    - O sistema deve permitir a exportação e importação de dados em formatos comuns, como CSV, para facilitar a migração de dados entre diferentes sistemas.
