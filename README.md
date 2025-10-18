🚀 HelpDesk - App de HelpDesk

Um aplicativo de HelpDesk completo, desenvolvido com React Native e Expo, utilizando Supabase como backend.

📝 Sobre o Projeto

Este projeto é um sistema de HelpDesk móvel onde os usuários podem abrir, acompanhar e gerenciar chamados de suporte. Ele é construído usando uma stack moderna e de rápido desenvolvimento, ideal para prototipagem e produção.

O backend é totalmente gerenciado pelo Supabase (autenticação, banco de dados e armazenamento), enquanto o frontend é construído com React Native e gerenciado pelo Expo, facilitando o desenvolvimento e a compilação para iOS e Android.

🛠️ Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias e bibliotecas principais:

React Native: Framework principal para o desenvolvimento mobile multiplataforma.

Expo: Plataforma e ferramentas para facilitar o desenvolvimento (incluindo expo-image-picker, expo-file-system, expo-status-bar).

Supabase: Backend como Serviço (BaaS) para banco de dados (PostgreSQL), autenticação e armazenamento de arquivos.

React Navigation: Biblioteca para gerenciamento de rotas e navegação entre telas.

Expo Vector Icons: Biblioteca de ícones (Feather, AntDesign) utilizada na interface.

React Native Picker: Componente para listas de seleção (selects).

✨ Funcionalidades Principais

Autenticação de Usuários: Login e cadastro utilizando o Supabase Auth.

Dashboard: Tela principal com visualização da quantidade de chamados baseado nos status e mostrado em cards.

Criação de Chamados: Formulários para abertura de novos tickets de suporte.

Listagem de Chamados: Uso de FlatList para exibir todos os chamados do usuário e chamados feitos para o departamento do usuário.

Exclusão de chamados: Permite que o usuário exclua chamados que ele tenha feito.

Atualização de Status: Permite que o técnico altere o status do chamado (ex: "Aberto", "Em Andamento", "Fechado").

Personalização de perfil: Permite que o usuário possa mudar seus dados de perfil.

Upload de Anexos: Capacidade de anexar uma imagem à foto de perfil (usando expo-image-picker).
