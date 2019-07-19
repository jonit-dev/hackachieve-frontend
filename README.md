# Hackachieve

Hackachieve is a productivity SaaS focused on scrum applied to personal goals.

## Onboarding Videos

Before proceeding, please check our short onboarding videos

- [Project Management](https://drive.google.com/file/d/1hsQn5W298bo5ar1p13SAJooecn7Ko3sH/view?usp=sharing) - How do we manage our project goals

## References

Please check additional project references on the documents below

- [Project Documentation Files](https://docs.google.com/spreadsheets/d/1XaLITuGNUd2Y8iBDdIui7wCFxUaCd165xmohOt0zjp4/edit#gid=0) - Everything you need is here

## Getting Started

- Make sure you have all dependencies installed

```
npm install
```

- Create a file called env.json or modify it if its already created, at /src folder.
  It will point to our Backend production API

```
{
  "env":"dev",
  "path":"http://localhost:8000/",
  "adminEmail": "joaopaulofurtado@live.com",
  "productionUrl": "https://hackachieve.com"
}
```

- Start the server

```
yarn start
```
