1- install node js 
2- npm init --y -> install package jason
3- npm install -D tailwindcss postcss-cli autoprefixer -> install tilwind
4- npx tailwindcss init -> config tailwind
5- create file postcss.config.js
6- 
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
7- content: ["./public/**/*.html"], -> into module.exports before pugins
8- create folders basic -> public,src,...
9- main.css ->
@tailwind base;
@tailwind components;
@tailwind utilities;
10- package.json -> scripts :
"dev" : "postcss ./src/css/main.css -o ./public/build/tailwind.css --watch"
11- terminal : npm run dev

12- plugin form tailwind
npm install -D @tailwindcss/forms
13-tailwind.config.js ->  plugins: [require("@tailwindcss/forms")]