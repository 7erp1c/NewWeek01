/*
===Инициализируем node приложение:
yarn init --yes

===Устанавливаем express:
yarn add express

===Устанавливаем nodemon в devDependencies:
yarn add nodemon --dev

===Устанавливаем typescript и типы для express, node:
yarn add typescript ts-node @types/node @types/express --dev

===Генерируем tsconfig (или создаем вручную файл tsconfig.json в корневой папке проекта):
yarn tsc --init

===Предпочтительные настройки (содержимое) tsconfig.json:
 {
 "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
//* "include": ["src/**///(слева один слеш, а не 3)*"],
//"exclude": ["node_modules", "**/*.test.ts"]
//}
/*
===В package.json добавляем scripts:
"scripts": {
    "dev": "yarn nodemon --inspect dist/index.js",
    "watch": "tsc -w"
  },
 */
