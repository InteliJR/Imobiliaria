---
title: Escolha de serviço de cloud
sidebar_position: 11
description: Benchmark de serviços de cloud para implementação no projeto.
---

## Benchmark de Serviços de Cloud para Hospedagem da Aplicação

### Introdução

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Este documento compara serviços de cloud para hospedar o projeto, um sistema de gestão de imóveis de pequeno a médio porte. Avaliamos Google Cloud Platform (GCP), Oracle Cloud Infrastructure (OCI), Microsoft Azure, Amazon EC2 (AWS) e Firebase, com base em uso mensal de 730 horas, Linux, 2 vCPUs, memória entre 3.5 e 4.3 GB, e armazenamento em bloco na região de São Paulo. O objetivo é identificar a opção mais custo-efetiva e adequada às necessidades da aplicação.
    </p>
</div>

### Opções de Serviço de Cloud

#### Google Cloud Platform (GCP)

**Configuração:**
- 730 horas mensais
- Linux
- 2 vCPUs, 3.5 GB de memória
- 70 GB Block Storage

**Preço**: $76/mês

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;GCP oferece flexibilidade e fácil integração com outros serviços Google. No entanto, tem um custo relativamente alto, sendo mais adequado para quem já utiliza a infraestrutura Google.
    </p>
</div>

#### Oracle Cloud Infrastructure (OCI)

**Configuração:**
- 730 horas mensais
- Linux
- 2 vCPUs, 4 GB de memória
- 200 GB Block Storage

**Preço**: $23/mês

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;OCI é a opção mais econômica, oferecendo maior capacidade de armazenamento e memória por um custo muito baixo. Ideal para pequenas e médias empresas que precisam de um serviço acessível e eficiente.
    </p>
</div>

#### Microsoft Azure

**Configuração:**
- 730 horas mensais
- Linux
- 2 vCPUs, 3.5 GB de memória
- 10 GB Block Storage (50 GB por $100)

**Preço**: $10/mês

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Azure tem um custo inicial baixo, mas o preço aumenta significativamente com mais armazenamento. É adequado para cargas de trabalho com baixo armazenamento inicial.
    </p>
</div>

#### Amazon EC2 (AWS)

**Configuração:**
- 730 horas mensais
- Linux
- 2 vCPUs, 4.3 GB de memória
- 70 GB Block Storage

**Preço**: $33/mês (1 ano de compromisso)

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;AWS oferece um bom equilíbrio entre custo e capacidade, com alta confiabilidade e uma ampla gama de serviços. Ideal para uma solução de longo prazo com alta disponibilidade.
    </p>
</div>

#### Firebase
**Configuração**:

- 730 horas mensais
- Linux
- 2 vCPUs (5,256mi vCPUs-segundos), 4 GB de memória (10,512mi GB-segundos)
- 50 GB de Block Storage (30 GB iniciais gratuitos)

**Preço**: US$ 73/mês

<div style={{ textAlign: 'justify' }}>
    <p>
        Firebase oferece uma condição de armazenamento gratuito inicial e integração com os serviços da Google, contudo, para as capacidades de processamento e memória exigidas pelo projeto, não apresentou preços competitivos .
    </p>
</div>


### Conclusão

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Para um sistema de gestão de imóveis de pequeno a médio porte, <b>Oracle Cloud Infrastructure</b> é a opção mais econômica, oferecendo excelente capacidade e custo-benefício. Para quem busca confiabilidade e suporte robusto, <b>Amazon EC2</b> é uma escolha sólida com um compromisso de 1 ano.
    </p>
</div>

### Benchmark de Serviços de Armazenamento na Nuvem

#### Introdução

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Nesta seção, comparamos cinco serviços de cloud storage: AWS, Oracle Cloud (OCI), Google Cloud (GCP), Microsoft Azure e Firebase. Avaliamos capacidade, custos e a região de operação, considerando 50 GB de armazenamento na região de São Paulo.
    </p>
</div>

#### AWS S3

**Configuração:**
- Armazenamento: 50 GB
- Requisições: 20 GB select
- Preço: US$ 2.04/mês
- Região: São Paulo
- Capacidade: Reservada

**Descrição:**
<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;AWS S3 oferece alta durabilidade e disponibilidade. Com capacidade reservada, você garante disponibilidade e previsibilidade de preços. Custo total de US$ 2.04/mês.
    </p>
</div>

#### OCI (Oracle Cloud Infrastructure)

**Configuração:**
- Armazenamento: 50 GB
- Requisições: 20k (primeiros 50k gratuitos)
- Preço: US$ 1.07/mês
- Região: São Paulo
- Capacidade: Reservada

**Descrição:**
<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;OCI é uma solução econômica, oferecendo 50 GB de armazenamento e 20 mil requisições por US$ 1.07/mês, com as primeiras 50 mil requisições gratuitas.
    </p>
</div>

#### GCP (Google Cloud Platform)

**Configuração:**
- Armazenamento: 50 GB
- Requisições: 5 GB select
- Preço: US$ 2.28/mês
- Região: São Paulo
- Capacidade: Reservada

**Descrição:**
<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Google Cloud Storage integra-se bem com outros serviços GCP. Oferece 50 GB de armazenamento e 5 GB de requisições select por US$ 2.28/mês.
    </p>
</div>

#### Microsoft Azure Blob Storage

**Configuração:**
- Armazenamento: 50 GB
- Requisições: 20k
- Preço: US$ 2.22/mês
- Região: São Paulo
- Capacidade: Pay as You Go

**Descrição:**

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;Azure Blob Storage é flexível e bem integrado ao ecossistema Azure. Com "Pay as You Go", custa US$ 2.22/mês para 50 GB de armazenamento e 20 mil requisições.
    </p>
</div>

#### Firebase

**Configuração:**
- Armazenamento: 50 GB
- Requisições: 30 GB
- Operações: 210k (uploads)/ 1890k (downloads)
- Preço: US$ 1.17/mês
- Região: São Paulo
- Capacidade: Reservada

**Descrição:**

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;O Firebase oferece uma solução de armazenamento acessível e eficiente, com capacidade reservada. Por US$ 1.17/mês, você obtém 50 GB de armazenamento, 30 GB de requisições, e 210 mil uploads e 1.89 milhões de downloads. É uma escolha econômica para quem busca uma integração fácil com outros serviços Firebase e um gerenciamento simples de dados na nuvem.
    </p>
</div>

#### Conclusão

#### Conclusão

<div style={{ textAlign: 'justify' }}>
    <p>
        &emsp;&emsp;<b>OCI</b> é a opção mais econômica, com 50 GB por US$ 1.07/mês. <b>Firebase</b> é também competitivo, custando US$ 1.17/mês, e oferece boa capacidade de operações. <b>AWS S3</b> e <b>Microsoft Azure</b> são intermediários, com preços de US$ 2.04 e US$ 2.22/mês, respectivamente, e boa integração com seus ecossistemas. <b>GCP</b> é a mais cara a US$ 2.28/mês, mas é robusta e se integra bem com outros serviços Google. A escolha ideal vai depender do equilíbrio entre custo, integração e recursos necessários.
    </p>
</div>
