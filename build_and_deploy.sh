#!/bin/bash

# delete builded files
rm -rf dist
rm -rf public/css

# build
yarn build:ts
yarn build:sass

# deploy bot
pm2 restart LukeBot