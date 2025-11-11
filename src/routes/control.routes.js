import {Router} from 'express'
import {postcontrol,
    getcontrolxid,
    getcontrol} from '../controladores/controlCtrl.js'
const router=Router()
// armar nuestras rutas

router.get('/control',getcontrol) //select
router.post('/control',postcontrol) //insert
router.get('/control/:id',getcontrolxid)//select x id


export default router