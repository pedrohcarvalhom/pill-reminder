# Pill Reminder - [Work In Progress]

Esse projeto visa possibilitar o cadastro e controle de remédios/medicações no geral de um mesmo paciente. Este paciente pode ser desde um idoso até mesmo um cachorro. A ideia é centralizar informações relevantes e facilitar o acesso para múltiplos cuidadores ou até mesmo entre a própria família.

## Como funciona?

Após realizar o registro e o login, cadastre o seu paciente. É nele que as informações importantes ficarão contidas. Após preencher quantos pacientes quiser, será hora de cadastrar o primeiro remédio. Seu remédio conterá informações como quantidade, nome, frequência e horários no dia.

## Tech

Foi utilizado Nuxt de ponta a ponta com o intuito de aprender mais sobre o framework. Para facilitar as coisas, utilizei Prisma como ORM.

### Estilização
Foi utilizado Tailwind e Shadcn Vue em 95% dos componentes. O restante utilizei os componentes do PrimeVue ou criei por conta propria.

### Entidades
De maneira geral, esse é o fluxograma (simples) das relações
![image](https://github.com/pedrohcarvalhom/pill-reminder/assets/109979933/c60ae494-4539-4cdc-8180-1cd0aabbbd52)


## Setup
[Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Instale as dependências:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

