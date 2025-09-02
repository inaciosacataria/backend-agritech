import { Router } from 'express';
import { EmpresaController } from '../controllers/index';
import { validateBody } from '../middlewares/validate';
import { createEmpresaSchema } from '../validators/schemas';

const router = Router();
const empresaController = new EmpresaController();

// POST /empresas - Cadastrar empresa
router.post('/', validateBody(createEmpresaSchema), empresaController.createEmpresa.bind(empresaController));

// GET /empresas - Listar todas as empresas
router.get('/', empresaController.getAllEmpresas.bind(empresaController));

// GET /empresas/:id - Buscar empresa por ID
router.get('/:id', empresaController.getEmpresaById.bind(empresaController));

// PUT /empresas/:id - Atualizar empresa
router.put('/:id', validateBody(createEmpresaSchema.partial()), empresaController.updateEmpresa.bind(empresaController));

// DELETE /empresas/:id - Deletar empresa
router.delete('/:id', empresaController.deleteEmpresa.bind(empresaController));

export default router;
