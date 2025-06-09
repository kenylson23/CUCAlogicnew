# Guia Completo de Deploy CUCA no Netlify

## ✅ Configuração Completa

Seu projeto CUCA está configurado com **frontend estático + backend via Netlify Functions** para funcionalidade completa incluindo login.

## 📁 Estrutura do Deploy

```
projeto/
├── client/               # Frontend React
├── netlify/functions/    # Backend API
├── dist/public/         # Build do frontend
├── netlify.toml         # Configuração Netlify
└── package.json         # Dependências
```

## 🔧 Funcionalidades Incluídas

### Frontend
- ✅ Landing page responsiva da CUCA
- ✅ Galeria de fotos dos fãs
- ✅ Página de pontos de venda
- ✅ Painel administrativo
- ✅ Sistema de login funcional

### Backend (Netlify Functions)
- ✅ Autenticação com login/logout
- ✅ API para fotos dos fãs
- ✅ API para mensagens de contato
- ✅ API para produtos
- ✅ CORS configurado

## 🚀 Como Fazer o Deploy

### 1. Conectar Repositório
- Faça push do código para GitHub/GitLab
- Conecte ao Netlify
- Selecione este repositório

### 2. Configurações Automáticas
- Build command: `vite build`
- Publish directory: `dist/public`
- Functions directory: `netlify/functions`

### 3. Credenciais de Login
Após o deploy, use estas credenciais para testar:
- **Usuário:** admin
- **Senha:** admin123

## 🔐 Como Funciona a Autenticação

1. **Frontend:** React com token-based auth
2. **Backend:** Netlify Functions com validação simples
3. **Storage:** LocalStorage para persistência

## 📱 URLs Funcionais

Após deploy, estas rotas estarão disponíveis:
- `/` - Landing page principal
- `/login` - Página de login
- `/admin` - Painel administrativo (requer login)
- `/galeria-fas` - Galeria de fotos
- `/pontos-venda` - Pontos de venda

## 🛠 APIs Disponíveis

- `POST /api/auth/login` - Login
- `GET /api/auth/user` - Dados do usuário
- `POST /api/auth/logout` - Logout
- `GET /api/fan-photos` - Fotos dos fãs
- `POST /api/fan-photos` - Enviar foto
- `POST /api/contact` - Mensagem de contato
- `GET /api/products` - Produtos

## ⚡ Resultado Final

Você terá um site completo da CUCA com:
- Landing page profissional
- Sistema de login funcional
- Painel administrativo
- APIs funcionais via Netlify Functions
- Todas as funcionalidades do projeto original

## 🔄 Para Atualizações

1. Faça alterações no código
2. Push para o repositório
3. Netlify faz deploy automático
4. Site atualizado em segundos

O projeto está pronto para deploy completo no Netlify!