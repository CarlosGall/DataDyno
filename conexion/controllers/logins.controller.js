import { getConnection } from "../database/conexion.js";
import sql from 'mssql'


export const logins = async (req, res) => {
    const { correo, cedula } = req.body;
  
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input("correo", sql.VarChar, correo)
        .input("cedula", sql.VarChar, cedula)
        .query("SELECT * FROM empleado WHERE correo_corp = @correo AND cedula = @cedula");
  
      if (result.recordset.length === 1) {
        // Usuario autenticado correctamente
        res.json({ success: true });
      } else {
        // Usuario no encontrado o credenciales incorrectas
        res.json({ success: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  };