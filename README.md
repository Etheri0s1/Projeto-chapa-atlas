# 🌍 Chapa Atlas Estudantil - Plataforma Web

![Status](https://img.shields.io/badge/Status-Concluído-success)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)

## 📖 Sobre o Projeto
Este projeto foi desenvolvido como uma solução tecnológica real para a campanha da **Chapa Atlas Estudantil**, concorrente ao Centro Acadêmico de Geografia (CAGEO) da UNEB - Campus V. 

A plataforma foi criada para ser mais do que um panfleto digital: ela atua como um hub centralizando as propostas da chapa, apresentando a equipe de forma interativa e fornecendo uma ferramenta útil para os estudantes (um calendário de eventos com exportação direta para agendas pessoais). É a união da tecnologia com o movimento estudantil ativo.

## 📌 Funcionalidades
* **Interface Cartográfica:** Design UI/UX temático com rosa dos ventos vetorial, malhas de coordenadas, alfinetes de mapa e texturas de diário de campo.
* **Nossas Rotas (Propostas):** Layout interativo em formato de "Caderno de Anotações" para leitura dinâmica do plano de gestão.
* **Expedicionários (Equipe):** Sistema de "Seleção de Personagens" (Character Select) para visualizar os membros da chapa e suas biografias de forma limpa.
* **Calendário de Eventos:** Integração com API REST para buscar próximos eventos do CAGEO em tempo real.
* **Exportação ICS:** Botão para salvar eventos diretamente na agenda do usuário (Google Calendar).

## 🛠️ Tecnologias e Infraestrutura

### Frontend (Interface)
* **[React.js](https://react.dev/)** - Biblioteca principal para construção da interface.
* **[Vite](https://vitejs.dev/)** - Ferramenta de build super rápida.
* **[React Icons](https://react-icons.github.io/react-icons/)** - Iconografia da interface e redes sociais.
* **CSS3 Customizado** - Estilização com tema cartográfico, layout responsivo e animações 3D (Globo de Loading).

### Backend (API e Dados)
* **API RESTful** - Responsável por fornecer os dados dos eventos e geração do arquivo `.ics`.
* **[Render](https://render.com/)** - Plataforma utilizada para o deploy e hospedagem do Backend.
* **[Ngrok](https://ngrok.com/)** - Utilizado pontualmente durante o desenvolvimento para criar túneis seguros e testar a API localmente.

### Hospedagem e Deploy
* **[Netlify](https://www.netlify.com/)** - Plataforma escolhida para o deploy contínuo do frontend.
* **[GitHub](https://github.com/)** - Versionamento de código e gatilho de CI/CD.

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório
```bash
git clone [https://github.com/SEU-USUARIO/projeto-chapa-atlas.git](https://github.com/SEU-USUARIO/projeto-chapa-atlas.git)
cd projeto-chapa-atlas