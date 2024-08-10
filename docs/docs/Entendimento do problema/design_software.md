---
title: Design de Software
sidebar_position: 12
description: Modelo proposto para o design de software do projeto.
---

# O que é Design de Software?
Design de software é o padrão escolhido para a escrita do código, define a arquitetura, componentes, interfaces e outros aspectos de um sistema para atender aos requisitos especificados. É uma fase muito importante para o desenvolvimento, pois consolida como o software será estruturado e implementado.

# Por que definir um modelo para o Design de Software é importante?
“Se eu tivesse 8 horas para cortar uma árvore, gastaria 6 horas afiando meu machado” (Abraham Lincoln).
O modelo de design de software define como o problema será solucionado, os métodos e recursos utilizados pela equipe de desenvolvimento no processo de implementação. O papel dessa etapa está sobretudo relacionado a organização de um processo de desenvolvimento efetivo e eficaz, sem o qual criar um software pode se transformar em um processo maçante e sem sentido, quase um 'go horse'.

# Qual a diferença entre design de software e arquitetura?
Arquitetura de software e design possuem papéis diferentes dentro do planejamento de um sistema, no entanto estão ligados por príncipios e filosofias que guiam a construção do produto final.
Entende-se por arquitetura, segundo o ISO/IEC/IEE 42010:2022:

"Arquitetura de software é a estrutura fundamental ou o esqueleto de um sistema de software, que define seus componentes, suas relações e seus princípios de projeto e evolução."

Ou seja, o objetivo da Arquitetura é mapear o sistema de modo geral, olhando os componentes que fazem o sistema funcionar e como eles estão relacionados. A definição de uma arquitetura para um projeto, também, direciona o padrão a ser seguido na evolução do sistema.

Agora, o design de software se preocupa com o 'micro', isto é, para a forma como a escrita do software é feita. Isso não quer dizer que o padrão escolhido para a arquitetura deve ser absolutamente diferente do padrão do design de software, na verdade eles devem andar juntos.

O cerne da definição de ambos os conceitos, é o modelo de negócio do sistema a ser implementado. Dessa forma, não existe um modelo de design ou arquitetura que caiba para qualquer sistema, pois eles variam de acordo com os requisitos e objetivos do projeto.

# Modelo de Design proposto
Tendo em vista a complexidade do software a ser desenvolvido pela equipe, bem como a expertise e tempo do projeto, o modelo de design proposto para o desenvolvimento da plataforma de gerenciamento de imóveis é: arquitetura em camadas (Layer Architecture).

Os modelos de design de software existentes, como: Clean Architecture, MVC, MVVM, Layer Architecture, entre outros, são baseados na filosofia DDD (Domain Driven Design). O DDD tem o objetivo de facilitar a implementação de regras e processos complexos, visando a divisão de responsabilidades por camadas e é independente da tecnologia a ser utilizada.

<div align="center">
    <p> Arquitetura em camadas em alto nível </p>
    <img src={require('../../static/img/layer-architecture.png').default} alt="Example banner" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>
    <p><b>Fonte:</b> Antonieta, Yari. Layered Architecture for NodeJs. Disponível em: [site](https://ctrly.blog/nodejs-layered-architecture/).</p>
</div>

## Arquitetura em camadas
Esse padrão de design em camadas propõe uma divisão clara do software, separação de responsabilidades e acoplamento fraco.
Acredito, que cabe aqui uma breve explicação do que é "acoplamento", tendo em vista a importância do conceito para o entendimento do leitor: o termo "acoplamento" em engenharia de software, refere-se ao grau de interdependência entre os módulos e componentes do sistema, indica o quanto um módulo depende de outro para funcionar corretamente. De modo que um acoplamento fraco é uma boa característica para um design de software.
Com o objetivo de reduzir o acoplamento de um sistema são realizadas as seguintes tarefas no desenvolvimento:
1. Uso de interfaces e abstrações;
2. Injeção de dependências;
3. Utilização do princípio de responsabilidade única (Single Responsability Principle);
4. Encapsulamento (manter os detalhes internos de um módulo escondidos de outros módulos, expondo apenas o que é necessário através de interfaces públicas).

Reduzir o acoplamento é um dos objetivos principais do design de software modular e bem estruturado. Ele contribui para a criação de sistemas mais robustos, flexíveis e fáceis de manter.

A imagem a seguir demonstra de modo visual o fluxo das iterações entre os módulos de um sistema desenvolvido com a arquitetura em camadas. Tendo como principais módulos: Application (aplicação), Service (serviço), Infrastructure (Infraestrutura) e Domain (Domínio). Cada um desses módulos possuem suas reponsabilidades e conexões, realizadas por meio de interfaces.

<div align="center">
    <p> Fluxo da arquitetura em camadas </p>
    <img src={require('../../static/img/arquitetura_em_camadas.png').default} alt="Example banner" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>
    <p><b>Fonte:</b> ALVES, A. Começando com .NET Core, com Arquitetura em Camadas. Disponível em: [site](https://alexalvess.medium.com/criando-uma-api-em-net-core-baseado-na-arquitetura-ddd-2c6a409c686).</p>
</div>

```
    1. Camada de aplicação: responsável pelo projeto principal, pois é onde será desenvolvido os controladores e serviços da API. Tem a função de receber todas as requisições e direcioná-las a algum serviço para executar uma determinada ação.
    Possui referências das camadas Service e Domain.
    2. Camada de domínio: responsável pela implementação de classes/modelos, as quais serão mapeadas para o banco de dados, além de obter as declarações de interfaces, constantes, DTOs (Data Transfer Object) e enums.
    4. Camada de serviço: seria o “coração” do projeto, pois é nela que é feita todas as regras de negócio e todas as validações, antes de persistir os dados no banco de dados.
    Possui referências das camadas Domain, Infra.Data e Infra.CrossCutting.
    5. Camada de infraestrutura: é dividida em duas sub-camadas
    - Data: realiza a persistência com o banco de dados, utilizando, ou não, algum ORM.
    - Cross-Cutting: uma camada a parte que não obedece a hierarquia de camada. Como o próprio nome diz, essa camada cruza toda a hierarquia. Contém as funcionalidades que pode ser utilizada em qualquer parte do código, como, por exemplo, validação de CPF/CNPJ, consumo de API externa e utilização de alguma segurança.
    Possui referências da camada Domain.
```
<sup><a href="#referencia-1">1</a></sup>

# Projeto de exemplo:
Para facilitar o entendimento da estrutura sugerida para a criação do projeto, desenvolvi baseado em um outro projeto que encontrei na internet, atualizações em uma api simples para demonstrar a estrutura de um sistema criado baseado na Arquitetura em Camadas.

Segue o link do repositório: [Layer Architecture by Example](https://github.com/omatheu/layer-architecture).


**Referências:**

1. <a name="referencia-1"></a> ALVES, A. Começando com .NET Core, com Arquitetura em Camadas. Disponível em: https://alexalvess.medium.com/criando-uma-api-em-net-core-baseado-na-arquitetura-ddd-2c6a409c686.