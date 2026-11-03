#  Carona Solidária Campus

Um sistema inteligente e seguro para estudantes e servidores universitários organizarem e compartilharem caronas para o campus, reduzindo custos, emissões de carbono e melhorando a mobilidade acadêmica.

---

##  Sumário

* [Sobre o Projeto](#-sobre-o-projeto)
* [Entidades do Sistema](#-entidades-do-sistema)
* [Funcionalidades Principais](#-funcionalidades-principais)
* [Regras de Negócio](#-regras-de-negócio)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Instalação e Execução](#-instalação-e-execução)
* [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
* [Licença](#-licença)

---

## 📖 Sobre o Projeto

O **Carona Solidária** visa conectar a comunidade universitária (alunos, professores e funcionários) facilitando a oferta e o pedido de caronas diárias. O sistema gerencia desde o cadastro dos veículos até o acompanhamento em tempo real dos pedidos de vaga, finalizando com um sistema de avaliações mútuas para promover a segurança e a confiança entre os usuários.

---

##  Entidades do Sistema

O modelo de dados do sistema baseia-se nas seguintes entidades centrais:

1. **Usuário:** Dados de identificação dos membros da comunidade universitária (motoristas e passageiros).
2. **Veículo:** Informações sobre os automóveis cadastrados para oferta de carona.
3. **Ponto de Encontro:** Locais estratégicos pré-definidos para embarque e desembarque.
4. **Oferta de Carona:** Detalhes do trajeto, data, horário e vagas oferecidas.
5. **Solicitação de Vaga:** Entidade de junção ($N:N$ entre Usuário e Oferta) gerenciando o status da solicitação.
6. **Avaliação:** Notas e comentários atribuídos entre participantes ao fim do trajeto.

---

##  Funcionalidades Principais

* **Gestão de Veículos:** Cadastro completo com modelo, cor, placa e capacidade de lugares.
* **Oferta de Caronas:** Publicação de trajetos definindo origem, destino, data, horário de saída, pontos de encontro e total de vagas disponíveis.
* **Busca e Solicitação de Vagas:** Filtros detalhados por bairro, data e horário, permitindo ao passageiro solicitar vaga com um clique.
* **Aprovação de Passageiros:** Painel onde o motorista aceita ou recusa solicitações, permitindo ao passageiro acompanhar o status em tempo real (`Pendente`, `Aceita`, `Recusada`).
* **Sistema de Avaliação:** Feedback mútuo entre motoristas e passageiros pós-viagem.
* **Relatórios e Métricas:**
  * Volume de caronas por bairro.
  * Distribuição de caronas por horário.
  * Ranking dos usuários mais bem avaliados.
* **(Opcional) Caronas Recorrentes:** Agendamento automático para trajetos diários (ex.: Segunda a Sexta, às 07:00).

---

##  Regras de Negócio

Para garantir a segurança e a consistência dos dados, o sistema aplica estritamente as seguintes validações:

* **Limite de Vagas do Veículo:** O número de vagas oferecidas não pode ser maior que o número total de lugares do veículo menos 1 (ocupado pelo próprio motorista).
  $$\text{Vagas Oferecidas} \le \text{Lugares do Veículo} - 1$$
* **Capacidade da Carona:** O motorista é impedido de aceitar mais solicitações do que a quantidade de vagas publicadas.
* **Auto-solicitação Bloqueada:** O criador de uma oferta de carona não pode solicitar vaga na sua própria oferta.
* **Conflito de Horário:** Um usuário (motorista ou passageiro) não pode participar de duas caronas no mesmo dia e intervalo de horário.
* **Validação de Avaliações:** Apenas usuários que tiveram solicitação `Aceita` na carona podem avaliar (e ser avaliados), e a avaliação só é liberada após a data e horário de realização do trajeto.

---

## Tecnologias Utilizadas

* **Linguagem / Framework:** Node.js
* **Banco de Dados:** MySQL
  
---

##  Instalação e Execução

### Pré-requisitos
* Git
* [Linguagem/Runtime instalado]
* Banco de dados configurado

### Passo a Passo

1. **Clonar o repositório:**
   
```bash
   git clone [https://github.com/seu-usuario/carona-solidaria.git](https://github.com/Alefe2010/Carona-Solidaria_ProjetoFinal.git)
   cd carona-solidaria
