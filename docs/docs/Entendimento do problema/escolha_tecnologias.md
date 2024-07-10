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

|                 | Curva de Aprendizado | Documentação, Comunidade e Suporte | Flexibilidade         | Visão de Mercado |
| --------------- | -------------------- | ---------------------------------- | --------------------- | ---------------- |
| React<br><br>   | Moderada             | Alto \*                            | Alta                  | Alta             |
| Angular<br><br> | Moderada-Difícil     | Alto                               | Regular               | Alta             |
| Vue<br><br>     | Suave                | Regular                            | Altíssima (Excessiva) | Baixa            |

|              | Curva de Aprendizado | Robustez e Performance | Documentação, Comunidade e Suporte | Visão de Mercado |
| ------------ | -------------------- | ---------------------- | ---------------------------------- | ---------------- |
| Express      | Suave                | Regular                | Alta                               | Médio            |
| Spring Boot  | Moderada-Difícil     | Alta                   | Alta                               | Grande porte     |
| Django       | Suave                | Limitado               | Alta                               | Médio            |
| ASP.NET Core | Moderada-Difícil     | Alta                   | Alta                               | Grande porte     |

|                            | SQL (Relacional) | NoSQL (Não-relacional) |
| -------------------------- | ---------------- | ---------------------- |
| Escalabilidade             | Vertical         | Horizontal             |
| Consultas complexas        | Otimizado        | Restrito               |
| Consistência e Integridade | Garantida        | Eventual               |
| Rastreabilidade            | Otimizado        | Restrito               |
| Desempenho                 | Regular          | Alto                   |

## Possibilidades de escolha de tecnologia 
&emsp;&emsp;Considerando o escopo do projeto, com seus requisitos funcionais e não-funcionais, o aperfeiçoamento técnico da equipe e as vantagens e desvantagens das tecnologias mencionadas, sugere-se de forma produtiva as seguintes escolhas de tecnologias:

| Escolha Principal | Stack                |
| ----------------- | -------------------- |
| Front-End         | Angular (Typescript) |
| Back-End          | Express.js (Node.js) |
| Banco de Dados    | SQL (Postgres)       |

| Escolha Secundária | Stack           |
| ------------------ | --------------- |
| Front-End          | Angular         |
| Back-End           | ASP.NET Core    |
| Banco de Dados     | MySQL ou SQLite |

## Justificativa

### Front-End
&emsp;&emsp;Para o Front-End, apesar da curva de aprendizado razoável, a escolha do Angular se baseia no uso difundido no mercado e no suporte contínuo do Google, assim como, na grande comunidade atual e conteúdo disponível na internet.<br/>
&emsp;&emsp;De forma alternativa, React ou Vue podem ser utilizados, mas o React foi secundarizado por sua declarada descontinuidade de desenvolvimento, enquanto o Vue foi desconsiderado pelo seu uso tímido em grandes empresas.<br/>

### Back-End
&emsp;&emsp;Para o Back-End, há duas opções principais diretas: Express.js ou ASP.NET Core. Primeiramente, Express.js tem curva de aprendizado suave, ampla comunidade e suporte disponíveis na internet e escalabilidade horizontal – o que culmina em um período de desenvolvimento mais veloz, eficaz e eficiente.
&emsp;&emsp;Em segundo lugar, ASP.NET Core possui grande robustez e performance, com escalabilidade vertical e uso amplo em empresas/aplicações de grande porte – o que possibilita grande aprendizado para o time e uma enorme robustez na aplicação, embora o prazo possa se tornar uma dificuldade.
&emsp;&emsp;Cabe ao time de desenvolvimento escolher qual é a melhor tecnologia, considerando sobretudo o tempo de aprendizagem inerente e os requisitos da aplicação. <br/>
&emsp;&emsp;Alternativamente, Django ou Spring Boot também eram opções, sobretudo, por seu amplo uso no mercado. Contudo, embora o Django proporcione um desenvolvimento rápido, não possui a robustez necessária para o projeto. Nesse sentido, o Java com Spring Boot oferece uma robustez admirável, porém, a curva de aprendizagem seria um impeditivo potencial, tendo em vista o prazo do projeto – além disso, em uma conversa com o prof. Afonso (Inteli), a transição C# - Java é mais suave e recomendada do que o inverso.<br/>

### Banco de Dados
&emsp;&emsp;Por fim, com a análise comparativa apontada acima, recomenda-se a utilização de um banco de dados relacional para a aplicação.<br/>
&emsp;&emsp;Nesse sentido, considerando a seriedade e a sensibilidade dos dados processados e processos envolvidos, existe a necessidade de armazenar os dados de forma íntegra (de forma adequada e precisa) e consistente (com um mesmo formato), as quais são características quase intrínsecas aos bancos de dados relacionais.<br/>
&emsp;&emsp;Além disso, a consulta desses dados armazenados necessita de precisão, as quais serão realizadas por meio de consultas SQL complexas, as quais são otimizadas em bancos de dados relacionais.<br/>
&emsp;&emsp;Desse modo, compreende-se que, embora bancos NoSQL possuam performance superior em ambientes de grandes volumes de dados, a aplicação será otimizada como bancos de dados SQL.<br/>
&emsp;&emsp;Ademais, para a escolha do banco de dados, recomenda-se o uso de PostgreSQL, database mais utilizado segundo Stack Overflow Survey 2023 - empregado amplamente em empresas de diferentes portes. Contudo, MySQL e SQLite também se destacam como opções viáveis, as quais correspondem aos requisitos do projeto.<br/>
&emsp;&emsp;Finalmente, cabe à equipe de desenvolvimento escolher um database para o projeto, considerando afinidade ou interesse no aprendizado.

