*Read in [English](README.md)*

# Chat Example

Um chat feito usando [node](https://nodejs.org/) junto com algumas dependencias (olhar [package.json](package.json)) e socket.io

O chat tem a possibilidade de apenas informar um nome e ja usá-lo, usando mongodb para salvar as mensagens e mostrá-las quando alguém loga.

## Instalação

Somente baixe o projeto e execute ```npm install``` or ```yarn install``` para instalar as dependencias necessárias. Após isso apenas execute o node usando o arquivo index.js na raiz e abra o navegador na porta informada no arquivo.

## Coisas a Melhorar
- Criar sistema de login e registro, além de controle de autenticação
- Corrigir bug em que tags html serão consideradas(tags de audio e tags de imagem funcionarão para executar audio e mostrar imagens)
- Possibilidade de mostrar imagens e audio

## Autores e agradecimentos
- Agradeço a todos os desenvolvedores que criaram as imagens usadas para esse desenvolvimento
- A interface de frontend foi tirada do [Curso Completo do Desenvolvedor NodeJS e MongoDB](https://www.udemy.com/course/curso-completo-do-desenvolvedor-nodejs/) no udemy, obrigado [Jorge Sant Ana!](https://www.udemy.com/user/jorgetadeusantanasilva/)

## License
[MIT](https://choosealicense.com/licenses/mit/)