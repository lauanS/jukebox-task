# Jukebox Task

Jukebox Task é um gerenciador de tarefas desenvolvido utilizando Laravel e Vue.js. Este projeto utiliza Docker para facilitar a configuração do ambiente de desenvolvimento.

## Requisitos

- Docker
- Node.js v20.11

## Organização

- A pasta `docker` possui subpastas contendo arquivos de configurações para o Nginx e o PHP.
- A pasta `api` contém a API desenvolvida em Laravel.
- A pasta `web` contém a aplicação web desenvolvida em Vue.js.
- Os arquivos na raiz do projeto são responsáveis por instanciar os containers necessários para rodar a aplicação.

## Uso de Portas

- API PHP: 8989
- Portal Web: 3000
- MySQL: 3388
- phpMyAdmin: 8080

## Execução

### Servidor PHP

Para iniciar o servidor PHP, execute o seguinte comando na raiz do projeto:

```
docker compose up
```

Este comando instanciará os seguintes containers:

- **jukebox-task**: Imagem com PHP 8 FPM criada a partir do Dockerfile presente neste repositório.
- **nginx**: Servidor web Nginx, necessário para o PHP-FPM.
- **db**: Contêiner do MySQL para persistência de dados.
- **phpmyadmin**: Interface web para administração do banco de dados.

Além disso, será criada a rede `jukebox-task` para comunicação entre os containers.

Quando todas as imagens forem baixadas, acesse o container com 

```
docker-compose exec jukebox-task bash
```

#### Dentro do container:

O ponto de entrada do container é na pasta `/var/www` e é nela que os seguintes passos devem ser executados:

1. **Instale as Dependências**: Execute o comando

```
composer install
```

Isso instalará todas as dependências listadas no arquivo `composer.json`.

2. **Copie o Arquivo de Configuração .env**: Faça uma cópia do arquivo `.env.example` e renomeie-a para `.env`.

```
cp .env.example .env
```

3. **Gere a Chave de Criptografia**: Execute o comando `php artisan key:generate` para gerar uma chave de criptografia para sua aplicação.

```
php artisan key:generate
```


5. **Execute as Migrações do Banco de Dados (Opcional)**: Se houver migrações de banco de dados incluídas no projeto, você pode executá-las para criar as tabelas necessárias no banco de dados.

```
php artisan migrate
```

### Servidor Vue.js

Para iniciar o servidor da aplicação web Vue.js, navegue até a pasta `web/` no terminal e execute os seguintes comandos:

```
cd web
npm i
npm run serve
```

Isso instalará as dependências necessárias e iniciará o servidor de desenvolvimento Vue.js.

Agora você está pronto para começar a usar o Jukebox Task!

## Outras informações:

- Para acessar o phpmyadmin basta acessar http://localhost:8080/
  - Usuário: `username`
  - Senha: `userpass`

- A pasta API está mapeada para pasta `/var/www/` do container jukebox-task (php8-fpm), ou seja, modificações realizadas dentro ou fora do container nessas pastas são sincronizadas automáticamente.
