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

Build the container
```
docker compose build
```

Up the container
```
docker compose up
```

After that, access the bash using
```
docker compose exec web bash
```

And run
```
npx prisma generate dev
```

Ps.: Don't forget to set the Database enviroment variables.

## Screenshots

#### Empty state ao criar paciente
![Empty state ao criar paciente](https://github.com/pedrohcarvalhom/pill-reminder/assets/109979933/1fcf2c8c-422d-49fe-8b84-df5bdfda7913)

#### Formulário de criação
![Formulário](https://github.com/pedrohcarvalhom/pill-reminder/assets/109979933/acc4e5b3-ba69-4bf7-a27b-3b108ffd5ebd)

#### Empty state após criar/ter pacientes sem remédios cadastrados
![image](https://github.com/pedrohcarvalhom/pill-reminder/assets/109979933/9088cc67-edbf-465b-b9a1-5701d34c4637)

#### Formulário para criar um remédio
![image](https://github.com/pedrohcarvalhom/pill-reminder/assets/109979933/862d00fb-ef2e-4151-8c06-f5be37ddd67b)

#### Página do remédio no mobile
![image](https://github.com/pedrohcarvalhom/pill-reminder/assets/109979933/f4e3ece3-48e3-4689-9255-357724384824)

## TODO

- Feat: Validação de usuário no backen
- Fix: Hydration Mismatch
- Feat: Editar mais dados do remédio****
- Feat: Editar dados do paciente
- Feat: Evitar problemas de concorrência ao marcar como dado um remédio naquele dia

