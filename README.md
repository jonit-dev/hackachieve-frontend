<p align="center">
  <img width="300" height="300" src="https://www.hackachieve.com/landing_resources/images/hackachieve-logo-vertical.svg">
</p>

# Hackachieve Community Version: Open-source alternative to project management

Hackachieve is a productivity management system oriented towards short term and long term goals, where users can collaborate with each other to achieve their personal or business goals!

[Support this initiative through Patreon](https://www.patreon.com/hackachieve)

![](https://www.hackachieve.com/landing_resources/images/dashboard.webp)

![](https://www.hackachieve.com/landing_resources/images/team-work.png)

**Features**

- Authentication: e-mail/password, social login (facebook)
- Onboarding tutorial
- Goals categories
- Create long-term or short-term goals
- Invite members to your board, add members to goal
- Tasks
- Organize your projects
- Prioritize goals
- Goal status: on going, done
- Upload files to goals
- Add checklists inside your goals
- Deadlines
- Card description, link support
- Goals tags
- Filter by goal type

**Front-end technology stack**:

- ReactJS, Redux, Redux-thunk

**Back-end technology stack**:

- Django, Django rest framework

## Onboarding

- [Click here to join us!](https://forms.gle/2B9C9yqA5ghbgQgw8)

- [Slack link](https://join.slack.com/t/hackachieve/shared_invite/enQtODI1MTQ3MDc1OTcwLWI2NThkYzY1ZWJiMmU2MjlmNjhlNDFiMTFiMGEyMzhiMmVmYzZmNjg4MGZjNTQ5ZTUzY2FkNTVjNjlmZTFkY2Q)

- [Onboarding checklist](https://docs.google.com/document/d/1pDb5k5inDOZ1L3jFc897x1jhrHCByFX53V6clIvLrQI/edit?usp=sharing) - your first steps!

- [Trello board](https://trello.com/b/Z4LkfUxm/hackachieve-open-source) - This is the read-only version only. Please request to join the project to get a member access

- [Documentation](https://docs.google.com/spreadsheets/d/1XaLITuGNUd2Y8iBDdIui7wCFxUaCd165xmohOt0zjp4/edit?usp=sharing) - A list with all of our relevant project documents

- [How do we manage our project](https://drive.google.com/drive/folders/1cSQEKJkNba2ly5yc_iHvwc7c-sd2NUr2):

- [Review our system flow](https://drive.google.com/file/d/1SUSOs3Wy9wxO8bx50Tn1ZuVmohrwDEK-/view?usp=sharing)

- [Canvas](https://canvanizer.com/canvas/rAEaPKu4VDWDV)

- [Project Management](https://drive.google.com/file/d/1hsQn5W298bo5ar1p13SAJooecn7Ko3sH/view?usp=sharing) - How do we manage our project goals

- [Code quality standards](https://drive.google.com/file/d/1GXOZkpDfXBBymKP4H5yN7u2xHyPaRBTn/view?usp=sharing)

## General guidelines

- You can only do a task that’s assigned to you and on the “sprint” column
- Your weekly limit varies according to my sprint planning. In every week, I estimate how many hours I will assign you and I adjust it properly
  Please, remember to move your assigned cards between Trello’s columns, according to its status (Backlog, ongoing, done), so I can know your current progress. You should also use the card status dropdown whenever possible.
- If you finish your tasks earlier than your weekly limit, let me know. If you log unnecessary hours just to reach the limit, I’ll remove you from the team as soon as I notice it.
- Please, make sure your PR is production-ready before submitting it. (for devs only)
- Clean all react console warnings after you finish (for ReactJS devs only)
- Your weekly hours are related to your efficiency and company needs (how much can you deliver and the time spent on each task). I'll increase or decrease according to it, your hourly rate and the company needs.
- If you have any issues, refer to the documentation first (check "documentation" column on trello). If it's not there, let me know and I'll be glad to help.

## Installation

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
  "adminEmail": "youremail@hotmail.com",
  "productionUrl": "https://hackachieve.com"
}
```

- Start the server

```
yarn start
```

- This is the front-end installation only. You should also do the back-end server steps.

## Licensing

- **_GPL v2 (GNU General Public License):_**
  - By using Hackachieve you agree to [GPL License link](https://opensource.org/licenses/GPL-2.0)
- **_Hackachieve enterprise license_**
  - For licensing inquiries, please contact [Hackachieve Foundation](mailto:joaopaulofurtado@live.com)
  - Required if:
    - You wish to use Hackachieve as part of a proprietary application
