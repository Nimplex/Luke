<h1 align="center"> LukeBot </h1>
<br>
<h3 align="center"><a href="https://nimplex.xyz">Website</a> | <a href="https://nimplex.xyz/contact">Contact</a></h3>
<p align="center">(Several things in the code were copied from <a href="https://badosz.com">badosz's bot</a>)</p>
<br>
<h1 align="center">Installation</h1>

Install all dependencies using:
```sh
yarn add package.json
```
Compile source code:
```sh
yarn build
```
Create `tokens.json` file inside `files` directory, and put this code into this file:
```json
{
    "discord": "discord.bot.token"
}
```
Start bot:
```sh
yarn start
```