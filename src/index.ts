import {app} from "./app";
import {SETTING} from "./setting";





app.listen(SETTING.PORT,()=>{
    console.log(`Listen port: ${SETTING.PORT}`)
})