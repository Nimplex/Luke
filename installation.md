# Installation
1. Download latest code from <a href="https://github.com/Nimplex/Luke">GitHub</a> repository.
2. Install all dependencies.
  * ```npm install --save```
3. Build code.
  * ```npm run build```
4. Create new directory called "files".
  * ```mkdir files```
5. Create new file inside "files" directory called "config.json".
  * ```cd files && touch config.json```
6. Edit content of "config.json", it should look like this.
```json
{
  "prefix": ".",
  "developers": ["YourDiscordId"]
}
```
7. Create ".env" file in root directory of project.
  * ```touch .env```
8. Edit content of ".env", it should look like this.
```
token=YOUR_DISCORD_BOT_TOKEN
```