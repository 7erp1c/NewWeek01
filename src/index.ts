import {SETTING} from "./setting";
import {initApp} from "./app";

const app = initApp();

app.listen(SETTING.PORT,()=>{
    console.log(`Listen port: ${SETTING.PORT}`)
})