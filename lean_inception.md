# Perfil de usuários da plataforma:
1. Colaborador da imobiliária, pessoal de contratos, parte administrativa da empresa;
2. Locatário de um imóvel;
3. Locador de um imóvel;
4. Vendedor de um imóvel;
5. Comprador de um imóvel;

# 4. Lean Inception

&emsp;&emsp;O Lean Inception é um método ágil de desenvolvimento de projetos que ajuda na objetificação do MVP(Produto Mínimo Viável). Seu objetivo é acelerar a entrega de produtos, garantindo maior assertividade e qualidade de acordo com o livro Lean Inception - Como alinhar pessoa e contruit o produto certo do Paulo Caroli<sup><a href="#referencia-8">8</a></sup>. Alinhando as áreas de negócios e meios para a construção do produto, veja  as seções a seguir onde se encontra detalhado:

- **Visão de Produto:** Definição clara do propósito e direção do produto.
- **O que o Produto É – Não É – Faz – Não Faz:** Esclarecimento das funcionalidades e limitações do produto.
- **Brainstorming de Funcionalidades:** Processo para identificar e priorizar as funcionalidades do produto.
- **MVP (Produto Mínimo Viável):** Desenvolvimento e implementação da versão simples do produto para validação.

### **4.1 Visão do Produto**

&emsp;&emsp;A visão de produto é onde se descreve o propósito, os objetivos e o valor que um produto pretende entregar aos usuários. Ela serve como um guia para toda a equipe de desenvolvimento, garantindo alinhamento e foco nas necessidades e expectativas dos stakeholders. A visão de produto define a direção a ser seguida durante o desenvolvimento, ajudando a orientar as decisões e prioridades ao longo do ciclo de desenvolvimento do produto.

- **Frase da Visão:** Para a área de comunicação e marketing da Uber que busca melhorar a percepção da marca em tempo real, o produto é um modelo de análise de sentimentos baseado em linguagem natural que, diferentemente de ferramentas de monitoramento convencionais, oferece análises precisas e envio de alertas imediatos para ações proativas.

- **Missão:** Desenvolver uma aplicação de análise de sentimentos para monitorar a percepção dos clientes em relação à Uber e fornecer insights acionáveis para melhorias estratégicas pelo Slack.
  
- **Visão:** Ser uma ferramenta de monitoramento de sentimentos da Uber, integrada ao Slack, para permitir ações proativas e preventivas com base no feedback dos clientes.
  
- **Valores:** 
  - Eficiência: Agir rapidamente em resposta aos alertas gerados.
  - Precisão: Utilizar análise de linguagem natural avançada para interpretação precisa dos sentimentos.
  - Colaboração: Fomentar a colaboração entre equipes para resolver problemas de percepção de marca.


### **4.2 O Produto (É – Não É – Faz – Não Faz)**

&emsp;&emsp;A matriz "É – Não É – Faz – Não Faz" é uma ferramenta para delimitar o escopo do MVP (Produto Mínimo Viável) de um produto, definindo as características e funcionalidades que o produto possui e deve realizar, ao mesmo tempo em que estabelece o que o produto não é e quais funcionalidades não devem ser incluídas. Ou seja, ela ajuda a focar nas características mais relevantes do produto, garantindo que o MVP seja desenvolvido alinhado com as necessidades do projeto.

<div align="center">
  <p> <b>Figura 5 </b> -Matriz (É – Não É – Faz – Não Faz)</p>
<img src="./outros/img/matrix_lean_incepion.png" alt="matrix_lean_incepion" />
  <p><b>Fonte:</b> elaborado pela equipe Bote.</p>
</div>

&emsp;&emsp;Veja a seguir a matriz transcrita com mais detallhamento: 

**É:**
- **Ferramenta de uso interno da Uber:**
  - Desenvolvida para atender às necessidades internas da Uber, especificamente para a área de comunicação e marketing.

- **Modelo de análise de sentimentos baseado em processamento de linguagem natural:**
  - Utiliza processamento de linguagem natural avançado para analisar e interpretar sentimentos dos clientes.

**Não É:**
- **Um produto momentâneo:**
  - Requer desenvolvimento contínuo e manutenção para se adaptar às mudanças nas percepções dos clientes.

- **Um dashboard executivo:**
  - Embora apresente informações de análise, não é um painel de controle executivo tradicional.

**Faz:**
- **Categorização de sentimento (negativo - neutro - positivo):**
  - Classifica entre positivo e negativo.

- **Envio de alertas no Slack:**
  - Notifica equipes internas sobre percepções de alta intensidade.

- **Analise  de banco de dados off-line:**
  - Dados forncecidos não se atualizam.

**Não Faz:**
- **Distinção de comentários entre motoristas e clientes:**
  - Não diferencia ou separa comentários com base na fonte, focando apenas na percepção da marca.

- **Monitoramento contínuo do Twitter:**
  - Coleta e analisa dados em tempo real para acompanhar a percepção da marca.

- **Analise de ironia.:**
  - Não foi analizado ironia no banco de dados.

- **Desenvolvimento de dashboards:**
  - Não foca no desenvolvimento de painéis, mas sim em análises de sentimentos e alertas.


### **4.3 Brainstorming de Funcionalidades**

&emsp;&emsp;Durante o kickoff com o parceiro e com base na análise do TAPI, documento que orienta os objetivos do projeto, foi conduzida uma sessão de brainstorming no dia 18/04/2024. Esta sessão teve como objetivo identificar e priorizar as funcionalidades mais relevantes e estratégicas para o produto. O processo colaborativo envolveu diversas visões dos stakeholders, incluindo o parceiro Uber, proporcionando uma perspectiva holística e alinhada das necessidades e expectativas do produto. Dessa forma se definui as seguintes funcionalidades da solução:

- **Monitoramento não Contínuo:** 
  - Monitorar o Twitter para perceber a percepção da marca com base no banco de dados fornecidos.
  
- **Termômetro de Sentimentos:** 
  - Desenvolver um termômetro visual para mostrar a intensidade dos sentimentos.
  

### **4.4 Canvas MVP**

&emsp;&emsp;O MVP(Produto Mínimo Viável) é a versão simplificada do produto que pode ser lançada no mercado para validar hipóteses e premissas comerciais iniciais. Esta abordagem  permite coletar feedbacks de usuários reais e iterar rapidamente com base em dados concretos e validados, garantindo uma evolução eficiente do produto necessario para atender as dores da Uber em não conseguir analisar de forma produtiva os comnetários de suas redes sociais.

<div align="center">
  <p> <b>Figura 6 </b> -Canva MVP</p>
<img src="./outros/img//canva_mvp.png" alt="canva_mvp" />
  <p><b>Fonte:</b> elaborado pela equipe Bote.</p>
</div>

Veja a seguir com mais detalhamneto cada tópico trago na matriz. 

**Segmento da Persona:**
- **Área de Comunicação, Marketing e Data Science da Uber:**
  - Responsáveis por monitorar e gerenciar a percepção da marca nas redes sociais.
  - Necessidade de análises rápidas e precisas para ações proativas e preventivas.


**Proposta do MVP:**
- **Modelo de Análise de Sentimentos:**
  - Serviço de análise de sentimento  baseada em processamento de linguagem natural com base offline..
  - Envio de alertas proativos no Slack para percepções negativas e positivas de potencial impacto no processo.

**Resultado Esperado:**
- **Ferramenta como suporte:**
  - Aumento da capacidade de identificar e abordar  feedbacks negativos.
  - Ferramenta como suporte futuro ao processo de tomada de decisões.


**Jornadas:**
- **Monitoramento e Análise aprimorado:**
  - Análise de dados do X.
  - Identificação de sentimentos e classificação.

- **Alerta e Ação:**
  - Facilitação na comunicação e coordenação entre as equipes internas para ações corretivas.


**Estrutura de Custo (aquilo que se espera ter um custo):**
- **Desenvolvimento e Manutenção do Modelo de Machine Learning:**
  - Investimento em tecnologia e recursos humanos especializados.

- **Integração com Slack:**
  - Desenvolvimento e configuração de integrações.
  
- **Monitoramento e Análise de Dados:**
  - Custos associados à coleta, processamento e análise contínua de dados.



**Features:**
- **Motor de Análise de Sentimentos Avançada::**
  - Uso de dados do banco fornecido.
  
- **Serviço de alerta no Slack:**
  - Envio de notificações automáticas para percepções negativas e positivas com potencial de impacto.
  
- **Termômetro de Sentimentos Visual:**
  - Representação visual da intensidade dos sentimentos coletados.


**Métricas para Validar as Hipóteses do Negócio:**
- **Taxa de Alertas Respondidos e Ações Tomadas:**
  - Avaliação da eficácia na resposta rápida aos alertas gerados, como algo interessante de se ter.
  
- **Feedback dos Usuários Internos:**
  - Coleta de feedbacks e percepções das equipes internas sobre a utilidade e eficácia da solução.