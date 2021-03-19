<h1 align="center"> Luke </h1>
<br>
<h3 align="center"><a href="https://lukebot.xyz">Website</a> | <a href="https://nimplex.xyz/contact">Contact</a> | <a href="https://discord.gg/VFHgtc4">Discord</a></h3>
<p align="center">(Several things in the code were copied from <a href="https://badosz.com">badosz's bot and Mike</a>)</p>
<br>
<h1 align="center">Installation</h1>

Install all dependencies using:
```sh
yarn
```
Compile source code:
```sh
yarn build
```
Create `tokens.json` file inside `files` directory, and put this code into this file:
```json
{
    "discord": "discord-token",
    "secret": "client-secret",
    "session_secret": "session-secret (for example: asdasdasdasdasd)",
    "mongo": {
        "ip": "mongodb_database_address",
        "database": "Luke",
        "username": "mongodb_username",
        "password": "mongodb_password",
        "authDatabase": "admin"
    },
	"obrazium": "https://obrazium.com"
}
```
Start bot:
```sh
yarn start
```
