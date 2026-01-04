# 🚀 Projeto Ravenna - Articles & Services Platform

Plataforma moderna de gestão de conteúdo (CMS) e catálogo de serviços corporativos, desenvolvida com **Django REST Framework** no backend e **Next.js 15** no frontend. O projeto foi desenhado para alta performance, escalabilidade e facilidade de deploy via Docker.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 5 + Django REST Framework
- **Banco de Dados**: PostgreSQL 15
- **Autenticação**: JWT (SimpleJWT)
- **Documentação API**: Swagger / OpenAPI (via `drf-spectacular`)
- **Gestão de Mídia**: Suporte local e S3/MinIO

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Componentes**: Lucide React, TinyMCE (Editor Rico)
- **Estado**: React Query (TanStack Query)

### Infraestrutura
- **Containerização**: Docker e Docker Compose
- **Servidor Web**: Gunicorn (Backend), Next.js Standalone (Frontend)
- **Proxy/Tunnel**: Cloudflare Tunnel (Recomendado para produção)

---

## 📦 Estrutura do Projeto

```bash
articles/
├── backend/            # Código fonte da API Django
│   ├── apps/           # Aplicações modulares do Django
│   ├── config/         # Configurações do projeto (settings.py)
│   ├── Dockerfile      # Definição da imagem Docker do Backend
│   └── requirements.txt
├── frontend/           # Código fonte do Next.js
│   ├── src/app/        # Páginas e Rotas (App Router)
│   ├── Dockerfile      # Definição da imagem Docker do Frontend
│   └── next.config.ts  # Configurações do Next.js
├── docker-compose.yml  # Orquestração dos containers (Full Stack)
├── DEPLOY.md           # Guia rápido de deploy específico
└── README.md           # Esta documentação
```

---

## ⚡ Guia de Instalação e Execução

### Opção 1: Rodando Localmente (Desenvolvimento)

#### Pré-requisitos
- Python 3.12+
- Node.js 20+
- PostgreSQL (opcional, pode usar SQLite localmente)

#### 1. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# API rodando em http://localhost:8000
```

#### 2. Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend rodando em http://localhost:3001
```

---

### Opção 2: Rodando com Docker (Produção / Homologação)

O projeto está totalmente configurado para rodar "containerizado" com uma única linha de comando. Isso inclui o Banco de Dados, Backend e Frontend na mesma rede interna.

#### Configuração de Ambiente (.env)

O `docker-compose.yml` já traz configurações padrão otimizadas para o domínio **projetoravenna.cloud**.

**Configuração do Backend**:
Crie ou edite o arquivo `backend/.env` (no servidor):
```env
# Segurança
SECRET_KEY=gere-uma-chave-forte-aqui
DEBUG=False

# Banco de Dados (Injetado automaticamente pelo Docker Compose, mas pode ser sobrescrito)
# DATABASE_URL=postgres://postgres:postgres@db:5432/articles_db
```

**Nota**: As variáveis `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` e `CSRF_TRUSTED_ORIGINS` já estão configuradas no `docker-compose.yml` para aceitar `projetoravenna.cloud`.

#### Subindo os Containers

Na raiz do projeto (onde está o `docker-compose.yml`):

1. **Inicie os serviços**:
   ```bash
   docker-compose up -d --build
   ```
   *O parâmetro `-d` roda em background (detached) e `--build` força a recriação das imagens.*

2. **Crie o Superusuário (Admin do Django)**:
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

3. **Verifique os Logs**:
   ```bash
   docker-compose logs -f
   ```

---

## 🌐 Configuração de Domínio (Cloudflare Tunnel)

Esta aplicação foi configurada para ser exposta via **Cloudflare Tunnel**, o que elimina a necessidade de abrir portas no firewall ou configurar Nginx manualmente para SSL.

No painel do Cloudflare Zero Trust:

1. **Frontend**:
   - Domínio: `projetoravenna.cloud`
   - Serviço: `http://localhost:3001`

2. **Backend (API)**:
   - Domínio: `api.projetoravenna.cloud`
   - Serviço: `http://localhost:8000`

> **Nota**: O PostgreSQL está exposto na porta **5433** do host para evitar conflitos com instalações locais.

---

## 🛠️ Comandos Úteis

| Ação | Comando |
|------|---------|
| Parar Containers | `docker-compose down` |
| Ver Logs Backend | `docker-compose logs -f backend` |
| Ver Logs Frontend | `docker-compose logs -f frontend` |
| Shell no Backend | `docker-compose exec backend bash` |
| Shell no Banco | `docker-compose exec db psql -U postgres` |

---

## 📝 Documentação da API

A API possui documentação interativa gerada automaticamente (Swagger UI).
Após subir o servidor, acesse:
- **Swagger UI**: `/api/schema/swagger-ui/`
- **Redoc**: `/api/schema/redoc/`

---

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request
