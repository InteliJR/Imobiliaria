---
title: Escolha de tecnologias
sidebar_position: 9
description: Justificativa detalhadas das tecnologias escolhidas para o projeto.
---

# Escolha de tecnologias


## Introdução
&emsp;&emsp;Com o fim de escolher as tecnologias mais adequadas para o projeto, foram indicados os seguintes frameworks/suas linguagens de programação, com base em duas pesquisas comumente difundidas no nicho de desenvolvimento de software: Stack Overflow Survey 2023 e Pesquisa Código Fonte 2024. Dessa forma, espera-se acompanhar as tendências de mercado e de desenvolvimento atuais, com o fim de aumentar a vida útil do código e aprimorar os conhecimentos do time de desenvolvimento de forma produtiva, sob a ótica de mercado.

## Tecnologias mais utilizadas para Front-End
### 1. React (JavaScript/TypeScript)
#### Vantagens:
- Componentização: Baseado na reutilização de componentes, torna o desenvolvimento mais modular e gerenciável.
- Ecossistema Rico: Possui um vasto ecossistema de bibliotecas e ferramentas que aumentam a produtividade dos desenvolvedores.
- Virtual DOM: Melhora a performance ao minimizar as manipulações diretas do DOM.
#### Desvantagens:
- Curva de Aprendizado: Pode ser difícil para iniciantes, especialmente com conceitos avançados como hooks e context API.
- Atualizações frequentes: Atualizações constantes podem causar problemas de compatibilidade e exigir tempo para adaptação.
- Dependência de Bibliotecas Externas: Muitas funcionalidades comuns não estão incluídas no core, o que pode levar a uma dependência excessiva de bibliotecas externas.
### 2. Angular (TypeScript)
#### Vantagens:
- Framework Completo: Oferece uma solução completa para desenvolvimento de SPAs, incluindo roteamento, gerenciamento de estado, e injeção de dependências.
- Suporte Oficial do Google: O apoio do Google garante atualizações regulares e uma visão de longo prazo para o framework.
- Ferramentas Integradas: Ferramentas como Angular CLI facilitam a criação e o gerenciamento de projetos.
#### Desvantagens:
- Complexidade: Pode ser mais complexo de aprender e dominar devido ao seu tamanho e à quantidade de conceitos.
- Performance Inicial: A performance inicial de carregamento pode ser mais lenta devido ao tamanho do bundle.
- Rigidez: Menos flexível que outras opções, o que pode ser uma desvantagem para projetos que exigem muita customização.
### 3. Vue.js (JavaScript/TypeScript)
#### Vantagens:
- Curva de Aprendizado Suave: Fácil de aprender e entender, ideal para iniciantes.
- Integração Simples: Pode ser integrado em projetos existentes de forma muito simples.
- Documentação Excelente: A documentação oficial é clara e abrangente, ajudando desenvolvedores a resolverem problemas rapidamente.
#### Desvantagens:
- Menor Comunidade: Comparado a React e Angular, possui uma comunidade menor, o que pode resultar em menos recursos e plugins disponíveis.
- Flexibilidade Excessiva: A flexibilidade pode levar a inconsistências no código se não houver um guia de estilo rigoroso.
- Suporte Corporativo: Menor adoção em grandes corporações, o que pode resultar em menos casos de uso empresariais documentados.
## Tecnologias mais utilizadas para Back-End
### 1. Express.js (JavaScript/TypeScript)
#### Vantagens:
- Único Ecossistema: Permite o uso de JavaScript tanto no front-end quanto no back-end, simplificando o stack de desenvolvimento.
- Alta Performance: Utiliza um modelo assíncrono e não-bloqueante, o que resulta em alta performance para aplicações I/O intensivas.
- Grande Comunidade: Possui uma vasta comunidade e um repositório enorme de pacotes no npm.
#### Desvantagens:
- Modelo Assíncrono: A programação assíncrona pode ser difícil de dominar e pode levar a problemas como callback hell.
- Gerenciamento de Dependências: A grande quantidade de dependências externas pode tornar o gerenciamento do projeto complexo e suscetível a vulnerabilidades.
- Não Ideal para Processamento Pesado: Não é a melhor escolha para aplicações que requerem processamento intensivo de CPU.
### 2. Spring Boot (Java)
#### Vantagens:
- Robustez e Escalabilidade: Ideal para construir aplicações empresariais grandes e escaláveis.
- Configuração Simplificada: Spring Boot facilita a configuração inicial e o desenvolvimento rápido de aplicações Java.
- Suporte Corporativo: Amplamente adotado por grandes empresas, com forte suporte da comunidade e recursos empresariais.
#### Desvantagens:
- Complexidade: A curva de aprendizado pode ser íngreme devido à quantidade de conceitos e configurações.
- Tempo de Inicialização: Pode ter um tempo de inicialização mais lento em comparação com outras tecnologias.
- Consumo de Recursos: Pode ser mais pesado em termos de uso de memória e CPU, especialmente para aplicações menores.
### 3. Django (Python)
#### Vantagens:
- Desenvolvimento Rápido: Permite um desenvolvimento rápido com uma estrutura clara e funcionalidades incluídas por padrão.
- Segurança: Inclui muitas práticas de segurança por padrão, ajudando a proteger contra ataques comuns.
- Comunidade Ativa: Possui uma comunidade ativa que contribui com plugins, bibliotecas e documentação.
#### Desvantagens:
- Performance: Pode não ser a melhor escolha para aplicações de alta performance e escalabilidade.
- Monolítico: A abordagem monolítica pode ser uma desvantagem para projetos que requerem uma arquitetura de microsserviços.
- Flexibilidade: Menos flexível em termos de customização comparado a frameworks mais leves.
### 4. ASP.NET Core (C#)
#### Vantagens:
- Performance: ASP.NET Core é conhecido por sua alta performance, especialmente em ambientes de alta carga.
- Plataforma Cruzada: Pode ser executado em Windows, macOS e Linux, oferecendo flexibilidade no desenvolvimento e implantação.
- Ferramentas de Desenvolvimento: Excelente integração com o Visual Studio, que oferece ferramentas poderosas para desenvolvimento e depuração.
#### Desvantagens:
- Curva de Aprendizado: Pode ser difícil para desenvolvedores sem experiência prévia em .NET.
- Complexidade: A configuração inicial e a customização podem ser complexas.
- Comunidade Menor que JavaScript: Comparado a frameworks baseados em JavaScript, a comunidade e os recursos disponíveis são menores.


## Bancos de dados mais utilizados
### 1. PostgreSQL
#### Vantagens:
- Conformidade com Padrões SQL: Suporte robusto a SQL e extensões avançadas.
- Extensibilidade: Suporta uma ampla gama de tipos de dados personalizados e extensões.
- Desempenho e Escalabilidade: Altamente escalável e eficiente em termos de performance.
#### Desvantagens:
- Complexidade: A configuração e a manutenção podem ser complexas para iniciantes.
- Consumo de Recursos: Pode ser mais pesado em termos de consumo de recursos comparado a outros bancos de dados.
- Comunidade Menor: Embora tenha uma boa comunidade, é menor comparada ao MySQL.
### 2. MySQL
#### Vantagens:
- Popularidade e Suporte: Altamente popular e bem suportado por uma vasta gama de ferramentas e bibliotecas.
- Simplicidade: Fácil de configurar e usar, ideal para iniciantes.
- Performance: Boa performance em muitas aplicações web, especialmente em leituras rápidas.
#### Desvantagens:
- Conformidade SQL: Menos conforme aos padrões SQL em comparação com PostgreSQL.
- Escalabilidade: Pode ter limitações de escalabilidade para aplicativos de grande escala.
- Funcionalidades Avançadas: Menos funcionalidades avançadas e extensibilidade comparado ao PostgreSQL.
### 3. MongoDB
#### Vantagens:
- Flexibilidade de Schema: Permite a modelagem flexível de dados sem necessidade de um schema fixo.
- Escalabilidade: Projetado para escalabilidade horizontal, ideal para grandes volumes de dados.
- Facilidade de Uso: Fácil de começar e integrar em aplicações, especialmente para desenvolvedores de JavaScript.
#### Desvantagens:
- Consistência: Pode enfrentar problemas de consistência em alguns cenários devido à sua natureza eventual.
- Consultas Complexas: Não é tão eficiente em realizar consultas complexas como bancos de dados SQL.
- Ferramentas de Backup: As ferramentas de backup e recuperação podem ser menos maduras em comparação com bancos de dados relacionais.
