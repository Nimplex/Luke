/*
* PM2 ecosystem configuration file.
* To start Luke using pm2 use:
* pm2 start ecosystem.config.js
*/

module.exports = {
    apps: [{
        name: "LukeBot",
        script: "./dist/index.js",
        watch: false,
        interpreter: "node@14.15.5"
    }]
}
