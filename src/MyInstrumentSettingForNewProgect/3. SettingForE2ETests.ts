/*
1. Установка и настройка библиотек:
yarn add jest ts-jest @types/jest supertest @types/supertest

yarn ts-jest config:init

"scripts": {
    "test": "jest"
},


2. В корне проекта создаем папку  __tests__

3. В папке  __tests__  создаем файл  name.e2e.test.ts

4. В случае, когда число файлов с тестами становится больше одного, как на картинке ниже, возникает ряд проблем.

Одна из которых - одновременный запуск всех тестовых файлов.
Чтобы избежать этой проблемы в файл package.json в scripts нужно подправить команду запуска jest:
"scripts": {
    "test": "jest -i" //OR "jest": "jest --runInBand"
},







*
*
*
*
*
* */