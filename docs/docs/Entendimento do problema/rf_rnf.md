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
| CT-14 | Verificar se uma mensagem de erro é retornada em caso de falha na requisição       |



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
O locador e locatário deve ser capazes de visualizar os seus contratos dentro da plataforma.

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
| CT-43 | Verificar se os dados principais, como número do boleto, estão dispostos textualmente para copiar e colar               |



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
| CT-67 | Verificar se um email com as credenciais é enviado para o usuário após a criação da conta                  |


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
| CT-90| Verificar se uma mensagem de confirmação é exibida após o cadastro do contrato                                |
| CT-91| Verificar se uma mensagem de erro é exibida quando ocorre falha no cadastro do contrato                        |



### RF-25: Upload de Contrato por PDF
A administradora deve ser capaz de realizar o upload de contratos em formato PDF na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-92| Verificar se a administradora pode fazer o upload de um contrato em formato PDF                                 |
| CT-93| Verificar se o contrato PDF está completo e legível após o upload                                            |
| CT-94| Verificar se uma mensagem de confirmação é exibida após o upload do contrato                                  |
| CT-95| Verificar se uma mensagem de erro é exibida quando ocorre falha no upload do contrato                         |


### RF-26: Gerar Boletos com API Externa
O sistema deve ser capaz de gerar boletos de pagamento utilizando uma API externa.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-96| Verificar se o sistema pode gerar boletos utilizando a API externa                                          |
| CT-97| Verificar se os boletos gerados estão completos e válidos para pagamento                                     |
| CT-98| Verificar se uma mensagem de confirmação é exibida após a geração do boleto                                  |
| CT-99| Verificar se uma mensagem de erro é exibida quando ocorre falha na geração do boleto                          |



### RF-27: Verificação de Vencimento de Contratos
O sistema deve ser capaz de verificar automaticamente o vencimento dos contratos cadastrados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-100| Verificar se o sistema pode verificar o vencimento dos contratos automaticamente                             |
| CT-101| Verificar se o sistema envia notificações quando um contrato está próximo do vencimento                      |
| CT-102| Verificar se uma mensagem de erro é exibida quando ocorre falha na verificação do vencimento do contrato      |



### RF-28: Verificação de Vencimento de Boletos
O sistema deve ser capaz de verificar automaticamente o vencimento dos boletos de pagamento gerados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-103| Verificar se o sistema pode verificar o vencimento dos boletos automaticamente                               |
| CT-104| Verificar se o sistema envia notificações quando um boleto está próximo do vencimento                        |
| CT-105| Verificar se uma mensagem de erro é exibida quando ocorre falha na verificação do vencimento do boleto        |



### RF-29: Envio de Notificação de Vencimento por E-mail
O sistema deve ser capaz de enviar notificações por e-mail aos usuários quando contratos ou boletos estão próximos do vencimento ou quando ocorrem ajustes.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-106| Verificar se o sistema pode enviar notificações por e-mail para contratos próximos do vencimento ou com ajustes             |
| CT-107| Verificar se o sistema pode enviar notificações por e-mail para boletos próximos do vencimento               |
| CT-108| Verificar se uma mensagem de confirmação é exibida após o envio da notificação por e-mail                    |
| CT-109| Verificar se uma mensagem de erro é exibida quando ocorre falha no envio da notificação por e-mail            |



### RF-30: Envio de Notificação de Boleto Gerado por E-mail
O sistema deve ser capaz de enviar notificações por e-mail aos usuários quando novos boletos de pagamento são gerados.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-110| Verificar se o sistema pode enviar notificações por e-mail quando novos boletos são gerados                  |
| CT-111| Verificar se o sistema envia o boleto gerado como anexo no e-mail                                            |
| CT-112| Verificar se uma mensagem de confirmação é exibida após o envio da notificação por e-mail                    |
| CT-113| Verificar se uma mensagem de erro é exibida quando ocorre falha no envio da notificação por e-mail            |



### RF-31: Envio de Notificação de Contrato Assinado por E-mail
O sistema deve ser capaz de enviar notificações por e-mail aos usuários quando novos contratos são adicionados na plataforma.

**Casos de Teste**

| ID    | Descrição                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| CT-114| Verificar se o sistema pode enviar notificações por e-mail quando novos contratos são adicionados, bem como o imóvel referente         |
| CT-115| Verificar se o sistema envia o contrato como anexo no e-mail                                        |
| CT-116| Verificar se o sistema notifica quando todas as partes assinaram o contrato                                     |
| CT-117| Verificar se uma mensagem de erro é exibida quando ocorre falha no envio da notificação por e-mail            |



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
