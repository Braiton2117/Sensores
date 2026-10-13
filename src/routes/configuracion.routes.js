import { Router } from 'express';
import { getConfiguracion, updateConfiguracion } from '../controladores/configuracionCtrl.js';

const router = Router();

router.get('/configuracion', getConfiguracion); // Para leer (ESP8266 y App)
router.put('/configuracion', updateConfiguracion); // Para guardar (App)

export default router;
