import { Router } from "express";
import { createCargo, getCargo, deleteCargo, getCargos, updateCargo } from "../controllers/cargos.controller.js";

const router = Router()

router.get('/cargos', getCargos);

router.get('/cargos/:id', getCargo);

router.post('/cargos',createCargo);

router.put('/cargos/:id', updateCargo);

router.delete('/cargos/:id', deleteCargo);

export default router