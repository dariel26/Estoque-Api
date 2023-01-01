# Estoque

Esta api, serve para armazenar itens num banco de dados e poderem ser consumidos.
Este código está sendo por uma pequena loja de bebidas a qual quer saber o quanto de itens tem em estoque e os lucros obtidos pela venta destes.

## Para rodar localmente

Obs: Deve-se ter instalado o `node` na maquina junto do `npm` (este gerenciador de pacotes já vem imbutido ao instalar o node) ou o `yarn`.

- Adicione na raiz do projeto um arquivo chamado `.env` nele cole as informações do arquivo .exemplo_env. Mude essas informações conforme precisar.
- Instale todas as dependencias do código utilizando o comando: `npm install` ou `yarn`.
- Digite `npm run dev` para rodar o modo desenvolvimento na maquina.
- Abra o seu navegador e digite `http://localhost:port` (port nesse link deve ser substituido pelo valor da variavel de ambiente PORT que for escolhido).

## Testando antes de rodar

Para saber se a api vai se comportar corretamente foram desenvolvidos alguns testes. Para rodar estes testes basta digitar `npm run test` no terminal.