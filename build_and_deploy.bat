:: delete builded files
rmdir /q /s dist
rmdir /q /s public\css

:: build
yarn build:ts
yarn build:sass

:: deploy bot
pm2 restart LukeBot