//01.03.2024
/*В папку src/index.ts закидываем:
import express, {Request,Response} from 'express' //готовая библиотека

export const app = express()                      //создай нам сервер апликейшен

export const port = 3003                          //броним порт

app.listen(PORT,()=>{                             //говорим апп слушать этот порт
console.log(`Listen port: $(PORT)`
})

1.____Как делать по правилам  single-responsibility principle:
1) создаем новый файл setting.ts, выносим в него export const app = express(), app.use и роуты (пример ниже)
import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos',
    },
}
})
2.____В index.ts оставляем только порт и app.listen():
import {app} from './app'
import {SETTINGS} from './settings'

app.listen(SETTINGS.PORT, () => {
    console.log('...server started')
})
3.____ jest.config.ts
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 100000, //от этой ошибки! -> thrown: "Exceeded timeout of 5000 ms for a test.
    testRegex: '.e2e.test.ts$', //<-- чтобы запускались только файлы с расширением ".e2e.test.ts"
}



*
*
* */