---
title: Planejamento da implementação de segurança da informação
sidebar_position: 9
description: Planejamento da implementação de segurança da informação.
---

# Planejamento da implementação de segurança da informação

"A etapa de identificação dos riscos se encontra no planejamento do projeto, porém também é uma atividade a ser executada durante todo o desenvolvimento, só que em menor grau de detalhe."<sup><a href="#referencia-1">1</a></sup>.

## Segurança de Sessão e Cookies
Cookies: Assegure que os cookies sejam configurados com a flag HttpOnly para impedir o acesso via JavaScript e com a flag Secure para garantir que sejam transmitidos apenas por conexões HTTPS. Utilize também a flag SameSite para prevenir ataques de Cross-Site Request Forgery (CSRF).

Token de Sessão: Implemente tokens de sessão com um tempo de expiração adequado. Considere a utilização de JWT (JSON Web Tokens) para gerenciar sessões de forma segura e eficiente. Adote a rotação de tokens para minimizar os impactos em caso de comprometimento.

## Criptografia da informação
A criptografia de informações é uma prática fundamental para assegurar a confidencialidade e integridade dos dados armazenados e transmitidos. Recomenda-se o uso de algoritmos de criptografia robustos, como AES (Advanced Encryption Standard) para dados em repouso e TLS (Transport Layer Security) para dados em trânsito. Além disso, a gestão adequada de chaves criptográficas é crucial para a segurança do sistema, incluindo a rotação periódica de chaves e o armazenamento seguro das mesmas. A implementação de criptografia de ponta a ponta também deve ser considerada para proteger dados sensíveis ao longo de todo o ciclo de vida da informação.

## Proteção Contra SQL Injection
Utilize consultas parametrizadas ou prepared statements em vez de concatenar strings diretamente nas consultas SQL.
Adote um ORM (Object-Relational Mapping) que abstraia e proteja a interação com o banco de dados.
Realize a validação e sanitização de todas as entradas do usuário.

## Classificação dos Riscos
### Riscos Externos
- Os riscos externos incluem hacking, roubo de propriedade intelectual e todas as ameaças associadas ao acesso de cibercriminosos ao banco de dados. Tais riscos podem se materializar caso os desenvolvedores utilizem serviços, ferramentas e tecnologias de origem duvidosa durante o processo de desenvolvimento.

### Riscos Internos
- Os riscos internos estão relacionados a possíveis vazamentos de informações e dados sensíveis devido a falhas dos profissionais envolvidos no projeto. Esses vazamentos podem ocorrer intencionalmente ou acidentalmente.

### Medidas de Mitigação
Uso de Ferramentas Confiáveis: Assegure-se de que todos os membros da equipe utilizem apenas serviços, ferramentas e tecnologias de confiança comprovada.
Acordo de Não Divulgação (NDA): Firmar um NDA com todos os indivíduos que trabalharão no projeto, sejam colaboradores internos ou freelancers, para prevenir vazamentos indesejados de informações.
Garantia de Qualidade
Testes: Implemente uma estratégia de testes abrangente, incluindo testes automatizados e manuais. Alocar uma parte da equipe exclusivamente para a garantia de qualidade.
Dynamic Application Security Testing (DAST): Utilize ferramentas de DAST para identificar vulnerabilidades de segurança em aplicações em tempo real, simulando ataques externos.
Conformidade com a LGPD
Estude e implemente as exigências da LGPD (Lei Geral de Proteção de Dados) para garantir a privacidade e a segurança dos dados pessoais dos usuários. Isso inclui a coleta, armazenamento, processamento e compartilhamento de dados.

## Ferramentas e Práticas Recomendadas
Implementação de HTTPS: Garanta que todas as comunicações entre o cliente e o servidor sejam criptografadas utilizando HTTPS.
Firewall de Aplicação Web (WAF): Utilize um WAF para proteger a aplicação contra ataques comuns, como SQL injection e XSS (Cross-Site Scripting).
Controle de Acesso: Implemente um controle de acesso baseado em funções (RBAC) para garantir que apenas usuários autorizados possam acessar determinadas funcionalidades e dados.

**Referência:**

1. <a name="referencia-1"></a> DevMedia. (n.d.). Gerência de riscos em desenvolvimento de software. [online] Available at: https://www.devmedia.com.br/gerencia-de-riscos-em-desenvolvimento-de-software/28506.