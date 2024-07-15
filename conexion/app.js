import express from 'express';
import cargosRoutes from './routes/cargos.route.js'
import empleadosRoutes from './routes/empleados.route.js'
import clientesRoutes from './routes/clientes.route.js'
import proveedoresRoutes from './routes/proveedores.route.js'
import pedidosRoutes from './routes/pedidos.route.js'
import productoRoutes from './routes/productos.route.js'
import loginsRoutes from './routes/logins.route.js'

import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(cargosRoutes);
app.use(empleadosRoutes);
app.use(clientesRoutes);
app.use(proveedoresRoutes);
app.use(pedidosRoutes);
app.use(productoRoutes);
app.use(loginsRoutes);

export default app