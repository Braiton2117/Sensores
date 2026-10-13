import { conmysql } from '../db.js'

// GET: El ESP8266 y la App leen la configuración actual
export const getConfiguracion = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM CONFIGURACION_RIEGO WHERE ID_Zona = 1');
        if (result.length <= 0) return res.status(404).json({ message: "Configuración no encontrada" });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor al leer configuración" });
    }
}

// PUT: La App actualiza las reglas
export const updateConfiguracion = async (req, res) => {
    try {
        const { Humedad_Minima, Humedad_Maxima, Restriccion_Solar, Pausa_Lluvia, Forzar_Bomba } = req.body;
        
        const query = `
            UPDATE CONFIGURACION_RIEGO 
            SET Humedad_Minima = ?, Humedad_Maxima = ?, Restriccion_Solar = ?, Pausa_Lluvia = ?, Forzar_Bomba = ?
            WHERE ID_Zona = 1
        `;
        const values = [Humedad_Minima, Humedad_Maxima, Restriccion_Solar, Pausa_Lluvia, Forzar_Bomba];
        
        const [result] = await conmysql.query(query, values);
        
        if (result.affectedRows === 0) return res.status(404).json({ message: "Zona no encontrada" });
        
        res.json({ message: "Configuración de riego actualizada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la configuración" });
    }
}
