<h2>🚀 HelpDesk - App de HelpDesk</h2>

Um aplicativo de HelpDesk completo, desenvolvido com React Native e Expo, utilizando Supabase como backend.

<h2>📝 Sobre o Projeto</h2>

Este projeto é um sistema de HelpDesk móvel onde os usuários podem abrir, acompanhar e gerenciar chamados de suporte. Ele é construído usando uma stack moderna e de rápido desenvolvimento, ideal para prototipagem e produção.

O backend é totalmente gerenciado pelo Supabase (autenticação, banco de dados e armazenamento), enquanto o frontend é construído com React Native e gerenciado pelo Expo, facilitando o desenvolvimento e a compilação para iOS e Android.

<h2>🛠️ Tecnologias Utilizadas</h2>

O projeto foi construído com as seguintes tecnologias e bibliotecas principais:

<ul>
  <li>React Native: Framework principal para o desenvolvimento mobile multiplataforma.</li>
  <li>Expo: Plataforma e ferramentas para facilitar o desenvolvimento (incluindo expo-image-picker, expo-file-system, expo-status-bar).</li>
  <li>Supabase: Backend como Serviço (BaaS) para banco de dados (PostgreSQL), autenticação e armazenamento de arquivos.</li>
  <li>React Navigation: Biblioteca para gerenciamento de rotas e navegação entre telas.</li>
  <li>Expo Vector Icons: Biblioteca de ícones (Feather, AntDesign) utilizada na interface.</li>
  <li>React Native Picker: Componente para listas de seleção (selects).</li>
</ul>

<h2>✨ Funcionalidades Principais</h2>

<ul>
  <li>Autenticação de Usuários: Login e cadastro utilizando o Supabase Auth.</li>
  <li>Dashboard: Tela principal com visualização da quantidade de chamados baseado nos status e mostrado em cards.</li>
  <li>Criação de Chamados: Formulários para abertura de novos tickets de suporte.</li>
  <li>Listagem de Chamados: Uso de FlatList para exibir todos os chamados do usuário e chamados feitos para o departamento do usuário.</li>
  <li>Exclusão de chamados: Permite que o usuário exclua chamados que ele tenha feito.</li>
  <li>Atualização de Status: Permite que o técnico altere o status do chamado (ex: "Aberto", "Em Andamento", "Fechado").</li>
  <li>Personalização de perfil: Permite que o usuário possa mudar seus dados de perfil.</li>
  <li>Upload de Anexos: Capacidade de anexar uma imagem à foto de perfil (usando expo-image-picker).</li>
</ul>

<h2>⚙️ Como Rodar o Projeto</h2>
Siga os passos abaixo para executar o projeto localmente.

Requisitos:

<ul>
  <li>Node.js (LTS)</li>
  <li>Conta no Supabase</li>
  <li>Expo CLI (ou npx expo)</li>
</ul>

**1 - Instalar as Dependências**

```
npm install
# ou
yarn install
```
**2 - Configurar o Supabase**
Você precisará de uma conta no Supabase para conectar ao backend.
<ol>
  <li>Crie um novo projeto no Supabase.</li>
  <li>Vá até "Project Settings" > "API".</li>
  <li>Encontre sua URL e sua Chave Anônima (anon key).</li>
  <li>Crie um arquivo .env na raiz do projeto (ou configure seu arquivo @lib/supabase.js) com essas chaves:.</li>
</ol>

```
// Exemplo de como seu arquivo supabase.js pode estar:
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'SUA_URL_DO_SUPABASE';
const supabaseAnonKey = 'SUA_CHAVE_ANON_DO_SUPABASE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  //... opções
});
```

**3 - Executar o Projeto com Expo**
```
npx expo start
```
Isso iniciará o Metro Bundler. Você pode então escanear o QR code com o aplicativo Expo Go no seu celular (Android ou iOS) ou executar em um simulador.
