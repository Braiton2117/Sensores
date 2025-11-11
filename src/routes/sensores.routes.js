import {Router} from 'express'
import {getSensores,
    getregistrosxid,
    postSensores,
    deleteSensores} from '../controladores/sensoreCtrl.js'
const router=Router()
// armar nuestras rutas

router.get('/sensores',getSensores) //select
router.get('/sensores/:id',getregistrosxid)//select x id
router.post('/sensores',postSensores) //insert
router.delete('/sensores/:id',deleteSensores)//delete

export default router