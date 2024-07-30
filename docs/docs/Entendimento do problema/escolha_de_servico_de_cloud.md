---
title: Escolha de serviço de cloud
sidebar_position: 11
description: Benchmark de serviços de cloud para implementação no projeto.
---

## Benchmark de Serviços de Cloud para implementação na aplicação

### Introdução

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Este documento compara serviços de cloud para hospedar o projeto, um sistema de gestão de imóveis de pequeno a médio porte. Nesse sentido, a fim de estudar a viabilidade de implementação das opções disponíveis no mercado atualmente, estima-se uma aplicação com capacidade para 50 acessos simultâneos, para realização de consultas à base de dados e interações com a aplicação, sem estresse do sistema. Além disso, adota-se também que seja possível o acesso simultâneo para tarefas de administrador, como gravação e edição na base de dados, com escala menor (cerca de 20 usuários), dada a maior exigência dessas operações.<br/>
        &emsp;&emsp;Nessa análise, com o objetivo de escalabilidade futura e de manutenção da aplicação em produção, avaliamos 5 (cinco) fornecedores principais de serviço na nuvem: Google Cloud Platform (GCP), Oracle Cloud Infrastructure (OCI), Microsoft Azure, Amazon Web Services (AWS) e Firebase. Finalmente, o objetivo é identificar a opção mais custo-efetiva e adequada às necessidades da aplicação.
    </p>
</div>

### Opções de Hospedagem da Aplicação na Nuvem

**Configurações**:
<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Essa seção compara os serviços de hospedagem para a aplicação na nuvem. Nesse sentido, alguns critérios foram adotados para a comparação entre os players, levando em conta as exigências do sistema:<br/>
        &emsp;&emsp;<b>Uso mensal de 730 horas</b>: A aplicação precisa estar em pleno funcionamento durante todo mês, durante 24 horas por dia; desse modo, o padrão dos serviços de hospedagem é de 730 horas mensais (cerca de 30 dias).<br/>
        &emsp;&emsp;<b>Uso do Sistema Operacional Linux/UNIX</b>: O uso do Linux/UNIX é recomendado para hospedagem de servidores e back-end, dado a sua maior performance e menor memória exigida em relação ao Windows; além disso, o uso do Windows implica na contratação de uma licença da Microsoft, o que eleva os custos de desenvolvimento.<br/> 
        &emsp;&emsp;<b>Uso de 2 vCPUs</b>: Ao considerar a quantidade e natureza das operações realizadas pela aplicação (consulta, gravação e edição de dados em volume razoável), referentes a um sistema de gestão de imóveis, inicialmente, de pequeno a médio porte, considera-se que o uso de um processador com dois núcleos virtuais é suficiente.<br/>
        &emsp;&emsp;<b>Memória RAM entre 1 e 2 GB</b>: A memória RAM indicada mostra-se eficiente para servidores com até 200 usuários ativos, desse modo, considerando a estimativa inicial de 50 acessos simultâneos com operações simples, tal armazenamento permite escalabilidade futura e funcionamento garantido mesmo com estresse acima da capacidade esperada.  <br/> 
        &emsp;&emsp;<b>Armazenamento em bloco na região de São Paulo</b>: Ao tratar de uma máquina virtual, mostra-se necessária a instalação de sistema operacional, a configuração de ambiente de execução e a inicialização de dependências; assim, o armazenamento em bloco (conjugado à máquina virtual) é usado para esse fim. Estima-se que, ao todo, serão usados cerca de 30 GB para configuração total da máquina virtual (adicionalmente, 20 GB são preparados para expansões futuras da aplicação). Por fim, a escolha pela região de São Paulo diminui a latência e o tempo de resposta do servidor que mantém a aplicação. <br/>
    </p>
</div>

### Benchmark de serviços de hospedagem na nuvem

| Serviço                       | Horas Mensais | Sistema Operacional | vCPUs | Memória RAM      | Armazenamento de Disco    | Preço        |
|-------------------------------|----------------|----------------------|-------|--------------|---------------------|--------------|
| Google Cloud Platform (GCP)   | 730            | Linux                | 2     | 2 GB       | 50 GB | 360 R$/mês <sub>Fidelidade de 1 ano</sub>      |
| Oracle Cloud Infrastructure (OCI) | 730        | Linux                | 2     | 2 GB         | 200 GB | 105 R$/mês      |
| Microsoft Azure               | 730            | Linux                | 2     | 1.75 GB       | 40 GB | 220 R$/mês     |
| Amazon EC2 (AWS)              | 730            | Linux                | 2     | 2.2 GB       | 50 GB | 105 R$/mês <sub>Fidelidade de 1 ano</sub> |
| Firebase                      | 730            | Linux                | 2 <sub>(5,250mi vCPU-segundos)</sub>     | 2 GB <sub>(5,250mi GB-segundos)</sub> | 50 GB | 350 R$/mês |

<div align="center">
<sub><b>Fonte</b>: Material produzido pelos autores (2024).</sub>
</div>

### Conclusão

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Para um sistema de gestão de imóveis de pequeno a médio porte, <b>Oracle Cloud Infrastructure</b> e <b>AWS EC2</b> são as opções mais econômicas, oferecendo excelente capacidade e custo-benefício.<br/>
        &emsp;&emsp;Em comparação direta, <b>AWS EC2</b> apresenta memória RAM ligeiramente maior, contudo, exige o compromisso de cobrança anual. Por outro lado, <b>OCI</b> oferece maior flexibilidade, com cobrança mensal sem compromisso, e armazenamento de disco superior, com 200 GB gratuito.<br/>
        &emsp;&emsp;Alternativamente, entre as opções apresentadas, o desempenho de outros provedores é similar, contudo, com faixas de preço consideravelmente mais altas; desse modo, tais opções foram desconsideradas em função do menor custo-benefício, sem ganhos expressivos;
        Portanto, <b>OCI</b> se apresenta como melhor opção de hospedagem da aplicação em nuvem, levando em conta os critérios de desempenho, de flexibilidade e de custo-benefício.
    </p>
</div>

### Benchmark de Serviços de Armazenamento na Nuvem

#### Configurações:

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Nesta seção, comparamos cinco serviços de cloud storage: AWS, Oracle Cloud (OCI), Google Cloud (GCP), Microsoft Azure e Firebase.<br/>
        &emsp;&emsp;Inicialmente, o sistema deve suportar o armazenamento, consulta e edição de arquivos, sobretudo, no formato de documentos, como contratos e laudos de imóvel. Nesse sentido, a estimativa de armazenamento deve contemplar os requisitos atuais para funcionamento do sistema, bem como, suportar a possibilidade de escalabilidade posterior, conforme alinhado com as expectativas da cliente. <br/>
        &emsp;&emsp;Dessa forma, a partir dos arquivos fornecidos pela imobiliária para estudo da equipe de desenvolvimento, estima-se que cada imóvel deve possuir ao menos dois arquivos relacionados (um contrato e um laudo de vistoria do imóvel), os quais ocupam cerca de 1MB, no total. A seguir, aplica-se um coeficiente de segurança de 2, reservando 2MB para cada imóvel, além disso, exige-se 1MB complementar para a foto do usuário na plataforma.<br/>
        &emsp;&emsp;Portanto, a partir dessa estimativa de 3MB por imóvel, conclui-se que 10.000 imóveis exigiriam 30 GB. A seguir, com um coeficiente arbitrário de escalabilidade futura de 50%, chegamos a cerca de 45 GB de armazenamento na nuvem, com uma capacidade final de, ao menos, 15.000 imóveis.
    </p>
</div>

### Quadro de serviços de armazenamento na nuvem

| Serviço                        | Armazenamento | Requisições | Preço         | Região      | Capacidade         |
|--------------------------------|---------------|-------------|---------------|-------------|--------------------|
| AWS S3                         | 50 GB         | 20 GB <sub>(select query)</sub> | R$11,46/mês  | São Paulo   | Reservada          |
| OCI (Oracle Cloud Infrastructure) | 50 GB       | 20k <sub>(primeiros 50k gratuitos)</sub> | R$6,01/mês | São Paulo   | Reservada          |
| GCP (Google Cloud Platform)    | 50 GB         | 5 GB <sub>(select query)</sub>  | R$12,80/mês  | São Paulo   | Reservada          |
| Microsoft Azure Blob Storage   | 50 GB         | 20k         | R$12,47/mês  | São Paulo   | Pay as You Go      |
| Firebase                       | 50 GB         | 30 GB <sub>(210k uploads/1890k downloads)</sub> | R$6,57/mês  | São Paulo   | Reservada          |      

<div align="center">
<sub><b>Fonte</b>: Material produzido pelos autores (2024).</sub>
</div>


#### Conclusão

<div style={{ textAlign: 'justify' }}>
    <p>
    &emsp;&emsp;Inicialmente, <b>OCI</b> e <b>Firebase</b> são as opções mais econômicas dentre os principais provedores de serviço em nuvem.<br/>
    &emsp;&emsp;Em comparação direta, <b>OCI</b> apresenta o menor preço e condição das primeiras 50k requisições gratuitamente; Por outro lado, <b>Firebase</b> possui um modelo de cobrança diferente para uploads/downloads, as quais serão as operações mais usadas na aplicação; possibilitando o uso mensal intensivo de transferência de dados (210k uploads/1890k downloads) sem custos adicionais - o que pode resultar em um ganho expressivo, com a escalabilidade da aplicação.<br/>
    &emsp;&emsp;Alternativamente, outros provedores, como Microsoft Azure Blob Storage, AWS S3 e GCP, apresentam faixas de preço maiores, com condições mais restritas em relação à transferência de dados. Dessa forma, tais opções foram secundarizadas, por seu custo-benefício comparativamente menor.<br/>
    &emsp;&emsp;Portanto, <b>OCI</b> é a opção com maior custo-benefício no curto e médio prazo, com infraestrutura ampla e econômica, além de condições especiais de início. Em paralelo, considerando um ganho expressivo de escalabilidade, com um uso futuro intensivo de requisições e transferência de dados, <b>Firebase</b> apresenta maior economia e robustez no longo prazo. 
    </p>
</div>

### Opção de orçamento 

<div style={{ textAlign: 'justify' }}>
    <p>&emsp;&emsp;Por fim, conforme todos os critérios adotados na escolha e na análise dos provedores, indica-se o seguinte orçamento para a manutenção da aplicação com serviços em nuvem.</p>
</div>

<div align="center">
<sup><b>Quadro de orçamento de serviços na nuvem</b></sup>

| Serviço na nuvem | Provedor | Preço mensal |
|        ---       |     ---      |    ---   |
| Hospedagem da aplicação |    OCI   |   R$105 |
| Armazenamento de arquivos |   OCI  |   R$6   |
| Total |            |                   **R$121** |

<sub><b>Fonte</b>: Material produzido pelos autores (2024).</sub>
</div>
