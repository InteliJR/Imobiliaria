---
title: Serviços de pagamentos
sidebar_position: 10
description: Detalhamento dos serviços de pagamentos disponíveis no mercado, que poderiamos usar no nosso projeto.
---


# Serviço de Pagamento

## Stripe
[Stripe](https://stripe.com/en-mx) é uma plataforma com uma gama bem grande de serviços para pagamentos online.

- **Taxa:** Varia dependendo do serviço, mas tem uma média de 3.6% + uma taxa fixa por transação.
- **Vantagens:**
  - Altamente customizável e escalável devido a quantidade de serviços disponiveis.
  - Suporte global a várias moedas e métodos de pagamento.
  - Documentação boa e fácil de usar.
  - **Suporte a notificações e acompanhamentos:** Webhooks e APIs para avisos e acompanhamento de pagamentos.
- **Desvantagens:**
  - Pode ser complexa para pequenos negócios devido às inúmeras opções e configurações.
  - Taxas podem ser altas para volumes menores de transações.

## PayPal
[PayPal](https://www.paypal.com/pt/business/payment-for-services) é uma das plataformas de pagamento online mais reconhecidas globalmente. Tem uma integração fácil e suporta várias de moedas e métodos de pagamento.

- **Taxa para Transações Comerciais:** 4,79% + R$0,60 por transação.
- [Documentação para Desenvolvedores](https://developer.paypal.com/home/?_ga=2.239191491.1961640710.1720488914-892885593.1720488914)
- **Vantagens:**
  - Reconhecimento e confiança global.
  - Fácil de integrar e usar.
  - Suporte a pagamentos internacionais.
  - **Suporte a notificações e acompanhamentos:** Ferramentas para envio de notificações e rastreamento de transações.
- **Desvantagens:**
  - Taxas relativamente altas.
  - Pode haver atrasos nas transferências para contas bancárias.

## PagSeguro
[PagSeguro](https://pagseguro.uol.com.br/para-seu-negocio/online/) é uma plataforma brasileira que oferece uma grande variedade de serviços de pagamento, incluindo cartões de crédito, débito, e boletos.

- **Taxa:** 4,99% + R$0,40 por transação.
- [Documentação para Desenvolvedores](https://dev.pagbank.uol.com.br/)
- **Vantagens:**
  - Boa integração com o mercado brasileiro.
  - Diversidade de métodos de pagamento.
  - Facilidade na implementação.
  - Opções de parcelamento para clientes.
  - É utilizada em diversos e-commerces no Brasil.
  - **Suporte a notificações e acompanhamentos:** Integrações para notificações de pagamento e rastreamento.
- **Desvantagens:**
  - Taxas mais altas comparadas a outras plataformas.
  - Suporte ao cliente pode ser demorado.

## Mercado Pago
[Mercado Pago](https://www.mercadopago.com.br/ferramentas-para-vender/check-out) é uma plataforma de pagamento muito utilizada na América Latina, especialmente no Brasil e Argentina. Oferece diversos métodos de pagamento e é conhecida pela sua integração fácil com o Mercado Livre.

- **Taxa para Crédito:** 4,98%
- **Taxa para Pix:** 0,99%
- **Vantagens:**
  - Integração fácil com Mercado Livre e outras plataformas.
  - Diversidade de métodos de pagamento.
  - Facilidade na implmentação
  - Boa aceitação na América Latina.
  - **Suporte a notificações e acompanhamentos:** Ferramentas para acompanhar o status dos pagamentos.
- **Desvantagens:**
  - Taxas variáveis dependendo do método de pagamento.
  - Suporte ao cliente pode ser inconsistente.

## PicPay
[PicPay](https://picpay.com/plataforma-para-receber-pagamentos-online) é uma plataforma popular no Brasil para pagamentos via QR code, transferências entre usuários, e pagamento de contas. É conhecida por sua simplicidade e rapidez nas transações.

- **Taxa:** Varia com o prazo de recebimento:
  - 1 dia: 5,19%
  - 14 dias: 4,61%
  - 30 dias: 3,89%
- **Vantagens:**
  - Facilidade de uso para usuários finais.
  - Rápidas transações via QR code.
  - Popularidade crescente no Brasil.
  - **Suporte a notificações e acompanhamentos:** Opções para alertas de pagamento e rastreamento de status.
- **Desvantagens:**
  - Menos recursos comparados a outras plataformas.
  - Taxas podem ser menos competitivas.

## Pagar.me
[Pagar.me](https://pagar.me/ofertas/?utm_source=google&utm_medium=cpc&utm_campaign=search_generica_bp&utm_content=gateway_de_pagamento&origin=search&media=google&type=pago&campaign=13911926808&ad_group=125370285323&ad=583531115279&theme=gateway%20de%20pagamento&gad_source=1&gclid=CjwKCAjwnK60BhA9EiwAmpHZw_D87jFeAjmUEK3Tbwapx_BsxFq4f_yUPo2z6j4ZTcRocrukSLhgCxoC9rUQAvD_BwE) é uma plataforma brasileira que oferece serviços de pagamento integrados com uma alta flexibilidade e customização para atender às necessidades de negócios de diversos tamanhos.

- **Taxa:** A vista: 3,49% + R$0, 99
- **Vantagens:**
  - Altamente customizável para diferentes negócios.
  - Boa integração com o mercado brasileiro.
  - Suporte técnico eficiente.
  - **Suporte a notificações e acompanhamentos:** APIs e webhooks para avisos de pagamento e acompanhamento.
- **Desvantagens:**
  - Curva de aprendizado pode ser um pouco ingrime.
  - Taxas podem não ser as mais competitivas sem negociação.

## Considerações Finais

Acredito que para tomar essa decisão exista alguns pontos que precisam ser discutidos e alinhado com a cliente:

- Volume de Transações
  - Algumas plataformas oferecem taxas reduzidas para volumes maiores de transações. É importante validar com a cliente o volume esperado para negociar melhores condições.

- Antecipação de pagametnos
  - Verificar se a cliente precisa de antecipação dos pagamentos. Algumas plataformas oferecem preços diferentes dependendo do prazo em que o dinheiro será disponibilizado na conta.

- Tipo de Pagamento
  - Avaliar se a cliente precisa de todos os tipos de pagamento disponíveis. Optar por menos tipos de pagamento pode reduzir os custos do serviço. Isso inclui também avalisar a necessidade de parcelamento.
