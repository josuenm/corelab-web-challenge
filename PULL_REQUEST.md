# Alterações feitas na aplicação

## Typescript

No arquivo `tsconfig.json` eu configurei os caminhos modificados para as pastas, então em vez de chamar uma pasta colocando vários "../../src/pages" eu posso chamar apenas por "src/pages/[pagina]"

<hr />

## Página de login

Fiz uma tela de login básica com autenticação JWT(json web token) e encriptamento de senha.

<hr />

## Página de registro

Também foi uma tela básica assim como a de login.

<hr />

## Página de início

Fiz algo bem simples usando a regra do <a href="https://www.youtube.com/watch?v=UWwNIMHFdW4">60-30-10</a> para cores, essa regra é usada em filmes de hollywood e todo tipo de design. <br />
<br />
Na parte de performance da lista eu apliquei o `memo` que é um hook para memorizar o componente fazendo com que ele só renderize quando de fato tiver uma propriedade alterada.
<br />
<br />
Como eu não precisei validar dados em tempo real no lado do cliente eu optei por usar o _Uncrontrolled Component_ que melhora a performance já que não vai ser disparado o evento de `onChange` a cada digito do usuário no `input`.

<hr />

## Context API

Dentro dessa Context API de veículos tem todos os métodos para manipular os veículos como insert, delete, update etc...<br />
<br />
A estratégia foi que eu não precisasse chamar a API do backend sempre que atualizar algo, então as atualização 95% das vezes vai ocorrer pelo lado do cliente.

<hr />

## Services

O único serviço que usei foi o <a href="https://axios-http.com/ptbr/docs/intro">axios</a> para fazer requisições. Eu organizei tudo em pastas, as requisições relacionadas ao usuário eu coloquei na pasta `/user` e dos veículos eu coloquei na pasta `/vehicle`

<hr />

## Autenticação

Como eu tinha dito no login, eu usei JWT e salvei tudo em cookies com expiração de 30 dias. Para salvar e manipular o token eu usei a biblioteca <a href="https://github.com/maticzav/nookies">nookies</a>.

<hr />

## Feedback visual

"Aqui eu quero deixar um comentário: se eu fosse fazer uma aplicação real do dia a dia eu colocaria loading em tudo que esteja esperando uma promise, mas estava sem tempo para fazer de todos".

- Quando faz o login ou registro o botão desativa para evitar que o usuário fique clicando sem saber se esta funcionando.
- Loading na lista.
<hr />

## Conclusão

Fiz tudo isso em pouco tempo porque estou ocupado e faltou comunicação quando enviei o email, mas não quero deixei que isso me atrapalhasse, ai esta a aplicação e espero que goste.
<br />
<br />
<strong>DETALHE:</strong> Tem muita coisa que pode melhorar, principalmente na lógica do código e na verbosidade, fiz isso muito rápido então espero que levem em consideração.
