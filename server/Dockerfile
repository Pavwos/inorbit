# Use uma imagem oficial do Node.js com suporte a ES e ferramentas modernas
FROM node:20-slim

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários para instalar as dependências primeiro (cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Instala tsx globalmente para executar TypeScript
RUN npm install -g tsx

# Copia o restante do código para dentro do container
COPY src/ ./src/

# Expõe a porta padrão (confirme se é 3000 ou outra)
EXPOSE 3000

# Comando para rodar o backend em produção
CMD ["npx", "tsx", "src/http/server.ts"]
