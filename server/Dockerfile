# Use uma imagem oficial do Node.js com suporte a ES e ferramentas modernas
FROM node:20-slim

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários para instalar as dependências primeiro (cache do Docker)
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para dentro do container
COPY . .

# Expõe a porta padrão (confirme se é 3000 ou outra)
EXPOSE 3000

# Comando para rodar o backend em produção
CMD ["npm", "run", "start"]
