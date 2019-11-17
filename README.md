# Hackachieve

Hackachieve is a productivity SaaS focused on scrum applied to personal goals.

## Get added to our project

## Main Links

- [Trello board](https://trello.com/b/Z4LkfUxm/hackachieve-open-source) - This is the read-only version.

## General rules

- You can only do a task that’s assigned to you and on the “sprint” column
- Your weekly limit varies according to my sprint planning. In every week, I estimate how many hours I will assign you and I adjust it properly
  Please, remember to move your assigned cards between Trello’s columns, according to its status (Backlog, ongoing, done), so I can know your current progress. You should also use the card status dropdown whenever possible.
- If you finish your tasks earlier than your weekly limit, let me know. If you log unnecessary hours just to reach the limit, I’ll remove you from the team as soon as I notice it.
- Please, make sure your PR is production-ready before submitting it. (for devs only)
- Clean all react console warnings after you finish (for ReactJS devs only)
- Your weekly hours are related to your efficiency and company needs (how much can you deliver and the time spent on each task). I'll increase or decrease according to it, your hourly rate and the company needs.
- If you have any issues, refer to the documentation first (check "documentation" column on trello). If it's not there, let me know and I'll be glad to help.

## Onboarding

Before starting, please check our onboarding material:

- [Onboarding checklist](https://docs.google.com/document/d/1pDb5k5inDOZ1L3jFc897x1jhrHCByFX53V6clIvLrQI/edit?usp=sharing) - your first steps!

- [Documentation](https://docs.google.com/spreadsheets/d/1XaLITuGNUd2Y8iBDdIui7wCFxUaCd165xmohOt0zjp4/edit?usp=sharing) - A list with all of our relevant project documents

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
