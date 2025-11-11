import { conmysql } from '../db.js'

export const postcontrol = 
    async (req, res) => {
        try {
            const { ID_Zona, Duracion_Minutos, Motivo_Control } = req.body;

            if (ID_Zona === undefined || Duracion_Minutos === undefined || Motivo_Control === undefined) {
                return res.status(400).json({ 
                    message: "Faltan parámetros: ID_Zona, Duracion_Minutos, Motivo_Control." // Mensaje en español
                });
            }

            // Se usa NOW() para obtener la fecha y hora actual en MySQL (SOLUCIÓN al error GETDATE)
            const query = `
                INSERT INTO CONTROL_RIEGO 
                (ID_Zona, Fecha_Hora_Inicio, Duracion_Minutos, Motivo_Control, Fecha_Hora_Fin) 
                VALUES (?, NOW(), ?, ?, NULL)
            `;
            const values = [ID_Zona, Duracion_Minutos, Motivo_Control];

            const [rows] = await conmysql.query(query, values);

            res.status(201).json({
                message: 'Acción de control (riego) registrada como iniciada.', // Mensaje en español
                id: rows.insertId
            });

        } catch (error) {
            console.error('Error al registrar la acción de control:', error);
            return res.status(500).json({ 
                message: "Error del lado del servidor al iniciar el control de riego." // Mensaje en español
            });
        }
    }


/**
 * CONTROL_RIEGO: Obtiene la última acción de control registrada
 * Endpoint: GET /api/v1/sensores/control/ultima-accion
 */
export const getcontrol =
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from CONTROL_RIEGO ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar mediciones"})
        }
    }

export const getcontrolxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from CONTROL_RIEGO where ID_Accion=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Mediciones no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}