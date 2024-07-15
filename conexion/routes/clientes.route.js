import { Router } from "express";
import { getClientes, getCliente, createCliente, updateCliente, deleteCliente } from "../controllers/clientes.controller.js";

const router = Router()

router.get('/clientes', getClientes);

router.get('/clientes/:id', getCliente);

router.post('/clientes',createCliente);

router.put('/clientes/:id', updateCliente);

router.delete('/clientes/:id', deleteCliente);

export default router