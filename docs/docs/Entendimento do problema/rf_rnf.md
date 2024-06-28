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

<br>

### RF-02: Funcionalidade de Login com Google
O usuário deve ser capaz de realizar login através da integração com a API do Google para acessar os serviços da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                  |
| ----- | -------------------------------------------------------------------------- |
| CT-05 | Verifica se o usuário pode se conectar com credenciais válidas             |
| CT-06 | Verifica se uma mensagem de erro é mostrada para credenciais inválidas     |
| CT-07 | Verifica se o serviço de autenticação retorna o nível de acesso do usuário |

<br>

### RF-03: Funcionalidade de Persistência de Login
O sistema deve ser capaz de manter uma sessão de usuário ativa por um período de tempo estendido ou até que o usuário faça logout.

**Casos de Teste**

| ID    | Descrição                                                               |
| ----- | ----------------------------------------------------------------------- |
| CT-08 | Verificar se a opção "Lembre de mim" é registrada com sucesso           |
| CT-09 | Verificar se a sessão é armazenada no cache do navegador                |
| CT-10 | Verificar se a persistência de login expira conforme o tempo configurado |
| CT-11 | Verificar se a persistência de login expira após realização de logout    |

<br>

### RF-04: Funcionalidade de Logout
O usuário deve ser capaz de realizar logout para encerrar sua sessão ativa dentro da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                           |
| ----- | ----------------------------------------------------------------------------------- |
| CT-12 | Verificar se o usuário pode realizar logout corretamente                            |
| CT-13 | Verificar se o usuário não pode acessar áreas protegidas após realizar logout       |
| CT-14 | Verificar se o logout afeta apenas a sessão atual, não afetando outros dispositivos |

<br>

### RF-05: Visualização de Perfil
O usuário deve ser capaz de visualizar e acessar informações pessoais e detalhes da conta na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                       |
| ----- | ------------------------------------------------------------------------------- |
| CT-15 | Verificar se o usuário consegue acessar a página de visualização de perfil       |
| CT-16 | Verificar se as informações exibidas no perfil estão corretas                   |
| CT-17 | Verificar se uma mensagem de erro é retornada em caso de falha na requisição       |

<br>

### RF-06: Edição de Perfil
O usuário deve ser capaz de editar informações pessoais e atualizar sua conta na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                 |
| ----- | ------------------------------------------------------------------------- |
| CT-18 | Verificar se o usuário consegue editar as informações pessoais com sucesso |
| CT-19 | Verificar se o usuário consegue alterar a senha com sucesso                |
| CT-20 | Verificar se uma mensagem de erro é exibida para entradas inválidas        |
| CT-21 | Verificar se uma confirmação é enviada por e-mail                          |

<br>

### RF-07: Redirecionamento para Suporte por WhatsApp
O usuário deve ser capaz de ser redirecionado para o suporte via WhatsApp de forma direta.

**Casos de Teste**

| ID    | Descrição                                                            |
| ----- | -------------------------------------------------------------------- |
| CT-22 | Verificar se o usuário consegue acessar o suporte via WhatsApp       |
| CT-23 | Verificar se o redirecionamento para o WhatsApp ocorre corretamente  |

<br>

### RF-08: Assinatura de Contratos por Assinatura Digital
O usuário deve ser capaz de assinar digitalmente os contratos através da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-24 | Verificar se o usuário consegue assinar digitalmente os contratos            |
| CT-25 | Verificar se a assinatura digital é registrada corretamente                  |
| CT-26 | Verificar se uma mensagem de erro é exibida quando a assinatura falha        |

<br>

### RF-09: Visualização de Contratos Assinados
O locatário deve ser capaz de visualizar os contratos que já foram assinados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-27 | Verificar se o locatário consegue acessar a lista de contratos assinados     |
| CT-28 | Verificar se os contratos exibidos estão corretos                            |
| CT-29 | Verificar se uma mensagem é exibida quando não há contratos assinados         |
| CT-30 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento |

<br>

### RF-10: Visualização de Contratos Pendentes
O locatário deve ser capaz de visualizar os contratos que estão pendentes de assinatura na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-31 | Verificar se o locatário consegue acessar a lista de contratos pendentes      |
| CT-32 | Verificar se os contratos pendentes exibidos estão corretos                   |
| CT-33 | Verificar se uma mensagem é exibida quando não há contratos pendentes         |
| CT-34 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento |

<br>

### RF-11: Visualização de Boletos Pendentes
O locatário deve ser capaz de visualizar os boletos de aluguel que estão pendentes de pagamento na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-35 | Verificar se o locatário consegue acessar a lista de boletos pendentes        |
| CT-36 | Verificar se os boletos pendentes exibidos estão corretos                     |
| CT-37 | Verificar se uma mensagem é exibida quando não há boletos pendentes           |
| CT-38 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento  |

<br>

### RF-12: Visualização de Histórico de Pagamentos
O locatário deve ser capaz de visualizar o histórico de pagamentos de aluguel realizados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-39 | Verificar se o locatário consegue acessar o histórico de pagamentos           |
| CT-40 | Verificar se o histórico de pagamentos exibe corretamente as transações       |
| CT-41 | Verificar se uma mensagem é exibida quando não há histórico de pagamentos      |
| CT-42 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento  |

<br>

### RF-13: Filtro de Boletos por Data
O locatário deve ser capaz de aplicar filtros por data para encontrar boletos específicos na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                    |
| ----- | -------------------------------------------------------------------------------------------- |
| CT-43 | Verificar se o locatário consegue aplicar filtros de data para boletos                        |
| CT-44 | Verificar se os boletos exibidos correspondem aos filtros aplicados                           |
| CT-45 | Verificar se uma mensagem de erro é exibida quando não há boletos correspondentes aos filtros |

<br>

### RF-14: Visualização de Contrato Específico
O locatário deve ser capaz de visualizar detalhes específicos de um contrato na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-46 | Verificar se o locatário consegue acessar um contrato específico                                             |
| CT-47 | Verificar se as informações do contrato específico estão corretas                                            |
| CT-48 | Verificar se uma mensagem de erro é exibida quando o contrato solicitado não está disponível                 |
| CT-49 | Verificar se os dados principais, como número do contrato, estão disponíveis para copiar e colar             |

<br>

### RF-15: Visualização de Boleto Específico
O locatário deve ser capaz de visualizar detalhes específicos de um boleto na

 plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-50 | Verificar se o locatário consegue acessar um boleto específico                                               |
| CT-51 | Verificar se as informações do boleto específico estão corretas                                              |
| CT-52 | Verificar se uma mensagem de erro é exibida quando o boleto solicitado não está disponível                   |
| CT-53 | Verificar se os dados principais, como número do boleto, estão dispostos textualmente para copiar e colar               |

<br>

### RF-16: Download de Contrato
O locatário deve ser capaz de baixar contratos em formato PDF através da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-54 | Verificar se o locatário pode baixar um contrato em formato PDF                                              |
| CT-55 | Verificar se o arquivo PDF baixado está completo e legível                                                   |
| CT-56 | Verificar se uma mensagem de erro é exibida quando ocorre falha no download                                  |
| CT-57 | Verificar se o contrato baixado pode ser aberto em diferentes leitores de PDF                                |

<br>

### RF-17: Download de Boleto
O locatário deve ser capaz de baixar boletos em formato PDF através da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-58 | Verificar se o locatário pode baixar um boleto em formato PDF                                                |
| CT-59 | Verificar se o arquivo PDF do boleto baixado está completo e legível                                         |
| CT-60 | Verificar se uma mensagem de erro é exibida quando ocorre falha no download                                  |
| CT-61 | Verificar se o boleto baixado pode ser aberto em diferentes leitores de PDF                                  |

<br>

### RF-18: Visualizar Imóveis
O locador deve ser capaz de visualizar os imóveis cadastrados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                    |
| ----- | ---------------------------------------------------------------------------- |
| CT-62 | Verificar se o locador consegue acessar a lista de imóveis cadastrados       |
| CT-63 | Verificar se os imóveis exibidos estão corretos                              |
| CT-64 | Verificar se uma mensagem é exibida quando não há imóveis cadastrados        |
| CT-65 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento |

<br>

### RF-19: Visualizar Valores Recebidos pela Imobiliária
O locador deve ser capaz de visualizar os valores recebidos pela imobiliária através da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-66 | Verificar se o locador consegue acessar os valores recebidos pela imobiliária                                |
| CT-67 | Verificar se há um relatório de cada valor depositado                                |
| CT-68 | Verificar se uma mensagem é exibida quando não há valores recebidos                                          |
| CT-69 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento                                 |

<br>

### RF-20: Visualizar Comprovante de Pagamento de IPTU pela Imobiliária
O locador deve ser capaz de visualizar os comprovantes de pagamento de IPTU realizados pela imobiliária.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-70 | Verificar se o locador consegue acessar os comprovantes de pagamento de IPTU                                |
| CT-71 | Verificar se os comprovantes exibidos estão corretos                                                        |
| CT-72 | Verificar se uma mensagem é exibida quando não há comprovantes disponíveis                                  |
| CT-73 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento                                 |

<br>

### RF-21: Criação de Conta de Usuários
A imobiliária deve ser capaz de criar contas de usuários manualmente ou através do upload de um arquivo CSV.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-74 | Verificar se a imobiliária pode criar uma conta de usuário manualmente                                       |
| CT-75 | Verificar se a imobiliária pode criar contas de usuários através do upload de um arquivo CSV                |
| CT-76 | Verificar se uma mensagem de confirmação é exibida após a criação de uma conta                               |
| CT-77 | Verificar se um email com as credenciais é enviado para o usuário após a criação da conta                  |
<br>

### RF-22: Gerenciamento de Nível de Acesso
A imobiliária deve ser capaz de gerenciar o nível de acesso dos usuários cadastrados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-78 | Verificar se a imobiliária pode alterar o nível de acesso de um usuário                                     |
| CT-79 | Verificar se a imobiliária pode visualizar o nível de acesso atual de um usuário                             |
| CT-80 | Verificar se uma mensagem de confirmação é exibida após a alteração do nível de acesso                       |
| CT-81 | Verificar se uma mensagem de erro é exibida quando ocorre falha na alteração do nível de acesso              |

<br>

### RF-23: Visualização de Todos os Usuários
A imobiliária deve ser capaz de visualizar todos os usuários cadastrados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-82 | Verificar se a imobiliária pode acessar a lista completa de usuários cadastrados                             |
| CT-83 | Verificar se os usuários exibidos correspondem aos cadastrados na plataforma                                 |
| CT-84 | Verificar se uma mensagem é exibida quando não há usuários cadastrados                                       |
| CT-85 | Verificar se uma mensagem de erro é exibida em caso de falha no carregamento                                 |

<br>

### RF-24: Visualização de um Usuário Específico
A imobiliária deve ser capaz de visualizar informações detalhadas de um usuário específico na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-86 | Verificar se a imobiliária pode acessar informações detalhadas de um usuário específico                       |
| CT-87 | Verificar se as informações exibidas correspondem ao usuário específico buscado                              |
| CT-88 | Verificar se uma mensagem de erro é exibida quando o usuário específico não é encontrado                      |
| CT-89 | Verificar se os dados principais, como nome e e-mail, estão disponíveis para copiar e colar                   |

<br>

### RF-25: Remoção de Conta de Usuário
A imobiliária deve ser capaz de remover contas de usuários da plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-90 | Verificar se a imobiliária pode remover uma conta de usuário da plataforma                                   |
| CT-91 | Verificar se uma mensagem de confirmação é exibida após a remoção da conta                                   |
| CT-92 | Verificar se uma mensagem de erro é exibida quando ocorre falha na remoção da conta                           |
| CT-93 | Verificar se a conta removida não pode mais acessar a plataforma após a remoção                              |

<br>

### RF-26: Cadastro de Imóveis
A imobiliária deve ser capaz de cadastrar novos imóveis na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-94 | Verificar se a imobiliária pode cadastrar um novo imóvel na plataforma                                       |
| CT-95 | Verificar se uma mensagem de confirmação é exibida após o cadastro do imóvel                                  |
| CT-96 | Verificar se uma mensagem de erro é exibida quando ocorre falha no cadastro do imóvel                          |
| CT-97 | Verificar se o imóvel cadastrado está disponível para visualização após o cadastro                           |

<br>

### RF-27: Cadastro de Contratos
A imobiliária deve ser capaz de cadastrar novos contratos na plataforma, incluindo campos como valor, aluguel, reajuste, tempo de contrato, condomínio e IPTU.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-98 | Verificar se a imobiliária pode cadastrar um novo contrato na plataforma                                     |
| CT-99 | Verificar se todos os campos obrigatórios são validados corretamente durante o cadastro do contrato           |
| CT-100| Verificar se uma mensagem de confirmação é exibida após o cadastro do contrato                                |
| CT-101| Verificar se uma mensagem de erro é exibida quando ocorre falha no cadastro do contrato                        |

<br>

### RF-28: Upload de Contrato por PDF
A imobiliária deve ser capaz de realizar o upload de contratos em formato PDF na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-102| Verificar se a imobiliária pode fazer o upload de um contrato em formato PDF                                 |
| CT-103| Verificar se o contrato PDF está completo e legível após o upload                                            |
| CT-104| Verificar se uma mensagem de confirmação é exibida após o upload do contrato                                  |
| CT-105| Verificar se uma mensagem de erro é exibida quando ocorre falha no upload do contrato                         |

<br>

### RF-29: Upload de Boleto por PDF
A imobiliária deve ser capaz de realizar o upload de boletos em formato PDF na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-106| Verificar se a imobiliária pode fazer o upload de um boleto em formato PDF                                   |
| CT-107| Verificar se o boleto PDF está completo e legível após o upload                                              |
| CT-108| Verificar se uma mensagem de confirmação é exibida após o upload do boleto                                    |
| CT-109| Verificar se uma mensagem de erro é exibida quando ocorre falha no upload do boleto                           |

<br>

### RF-30: Leitura de Contratos e Boletos por IA
O sistema deve ser capaz de utilizar inteligência artificial para ler documentos e extrair informações para transcrevê-los em campos de copiar e colar.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-110| Verificar se o sistema pode extrair informações de contratos em PDF utilizando IA                            |
| CT-111| Verificar se o sistema pode extrair informações de boletos em PDF utilizando IA                              |
| CT-112| Verificar se as informações extraídas são precisas e estão disponíveis para uso na plataforma                |
| CT-113| Verificar se uma mensagem de erro é exibida quando ocorre falha na extração das informações                   |

<br>

### RF-31: Gerar Boletos com API Externa
O sistema deve ser capaz de gerar boletos de pagamento utilizando uma API externa.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-114| Verificar se o sistema pode gerar boletos utilizando a API externa                                          |
| CT-115| Verificar se os boletos gerados estão completos e válidos para pagamento                                     |
| CT-116| Verificar se uma mensagem de confirmação é exibida após a geração do boleto                                  |
| CT-117| Verificar se uma mensagem de erro é exibida quando ocorre falha na geração do boleto                          |

<br>

### RF-32: Verificação de Vencimento de Contratos
O sistema deve ser capaz de verificar automaticamente o vencimento dos contratos cadastrados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-118| Verificar se o sistema pode verificar o vencimento dos contratos automaticamente                             |
| CT-119| Verificar se o sistema envia notificações quando um contrato está próximo do vencimento                      |
| CT-120| Verificar se uma mensagem de erro é exibida quando ocorre falha na verificação do vencimento do contrato      |

<br>

### RF-33: Verificação de Vencimento de Boletos
O sistema deve ser capaz de verificar automaticamente o vencimento dos boletos de pagamento gerados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-121| Verificar se o sistema pode verificar o vencimento dos boletos automaticamente                               |
| CT-122| Verificar se o sistema envia notificações quando um boleto está próximo do vencimento                        |
| CT-123| Verificar se uma mensagem de erro é exibida quando ocorre falha na verificação do vencimento do boleto        |

<br>

### RF-34: Envio de Notificação de Vencimento por E-mail
O sistema deve ser capaz de enviar notificações por e-mail aos usuários quando contratos ou boletos estão próximos do vencimento.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-124| Verificar se o sistema pode enviar notificações por e-mail para contratos próximos do vencimento             |
| CT-125| Verificar se o sistema pode enviar notificações por e-mail para boletos próximos do vencimento               |
| CT-126| Verificar se uma mensagem de confirmação é exibida após o envio da notificação por e-mail                    |
| CT-127| Verificar se uma mensagem de erro é exibida quando ocorre falha no envio da notificação por e-mail            |

<br>

### RF-35: Envio de Notificação de Boleto Gerado por E-mail
O sistema deve ser capaz de enviar notificações por e-mail aos usuários quando novos boletos de pagamento são gerados.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-128| Verificar se o sistema pode enviar notificações por e-mail quando novos boletos são gerados                  |
| CT-129| Verificar se o sistema envia o boleto gerado como anexo no e-mail                                            |
| CT-130| Verificar se uma mensagem de confirmação é exibida após o envio da notificação por e-mail                    |
| CT-131| Verificar se uma mensagem de erro é exibida quando ocorre falha no envio da notificação por e-mail            |

<br>

### RF-36: Envio de Notificação de Contrato Assinado por E-mail
O sistema deve ser capaz de enviar notificações por e-mail aos usuários quando novos contratos são assinados digitalmente.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-132| Verificar se o sistema pode enviar notificações por e-mail quando novos contratos são assinados digitalmente         |
| CT-133| Verificar se o sistema envia o contrato assinado como anexo no e-mail                                        |
| CT-134| Verificar se o sistema notifica quando todas as partes assinaram o contrato                                     |
| CT-135| Verificar se uma mensagem de erro é exibida quando ocorre falha no envio da notificação por e-mail            |

<br>

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
