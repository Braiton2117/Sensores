import { conmysql } from '../db.js'

/**
 * SENSORES_DATA: Obtiene la ÚLTIMA lectura de los sensores
 * Endpoint: GET /api/v1/sensores/ultima-lectura
 */
export const getSensores=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from SENSORES_DATA ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar mediciones"})
        }
    }

/**
 * SENSORES_DATA: Registra una NUEVA lectura de los sensores (usada por el ESP8266)
 * Endpoint: POST /api/v1/sensores/registrar-lectura
 */
export const postSensores =
    async (req, res) => {

        console.log('HEADERS de la solicitud:', req.headers['content-type']);
        console.log('Cuerpo de la solicitud (req.body):', req.body);

        try {
            const { ID_Zona, Humedad_Suelo_Vol, Temperatura_Aire } = req.body;

            if (ID_Zona === undefined || Humedad_Suelo_Vol === undefined || Temperatura_Aire === undefined) {
                return res.status(400).json({ 
                    message: "Faltan parámetros requeridos: ID_Zona, Humedad_Suelo_Vol o Temperatura_Aire." // Mensaje en español
                });
            }

            const query = `
                INSERT INTO SENSORES_DATA 
                (ID_Zona, Humedad_Suelo_Vol, Temperatura_Aire) 
                VALUES (?, ?, ?)
            `;
            const values = [ID_Zona, Humedad_Suelo_Vol, Temperatura_Aire];

            const [rows] = await conmysql.query(query, values);
            
            res.status(201).json({
                message: 'Lectura registrada con éxito.', // Mensaje en español
                id: rows.insertId
            });

        } catch (error) {
            console.error('Error al registrar la nueva lectura:', error);
            return res.status(500).json({ 
                message: "Error del lado del servidor al registrar la lectura." // Mensaje en español
            });
        }
    }

/**
 * CONTROL_RIEGO: Registra el INICIO de una acción de riego.
 * Endpoint: POST /api/v1/sensores/control/iniciar
 * CORRECCIÓN: Se usa NOW() de MySQL
 */


// Funciones placeholder que puedes eliminar si no las usas
export const getregistrosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from SENSORES_DATA where ID_Lectura=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Mediciones no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
export const deleteSensores = (req, res) => res.status(501).json({ message: "Not Implemented" });