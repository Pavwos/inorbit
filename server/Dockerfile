FROM node:20-slim

WORKDIR /app

# Copia os arquivos de dependência
COPY ./server/package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da pasta 'server'
COPY ./server ./

# Expõe a porta esperada (ajuste se necessário)
EXPOSE 3000

# Comando para rodar em modo dev
CMD ["npm", "run", "dev"]
