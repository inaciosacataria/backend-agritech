import { Router } from 'express';
import { TecnicoController } from '../controllers/index';
import { validateBody } from '../middlewares/validate';
import { createTecnicoSchema } from '../validators/schemas';

const router = Router();
const tecnicoController = new TecnicoController();

// POST /tecnicos - Cadastrar técnico
router.post('/', validateBody(createTecnicoSchema), tecnicoController.createTecnico.bind(tecnicoController));

// GET /tecnicos - Listar todos os técnicos
router.get('/', tecnicoController.getAllTecnicos.bind(tecnicoController));

// GET /tecnicos/campanha/:campanhaId - Listar técnicos de uma campanha
router.get('/campanha/:campanhaId', tecnicoController.getTecnicosByCampanhaId.bind(tecnicoController));

// GET /tecnicos/:id/produtores - Listar produtores de um técnico
router.get('/:id/produtores', tecnicoController.getProdutoresByTecnicoId.bind(tecnicoController));

// GET /tecnicos/:id - Buscar técnico por ID
router.get('/:id', tecnicoController.getTecnicoById.bind(tecnicoController));

// PUT /tecnicos/:id - Atualizar técnico
router.put('/:id', validateBody(createTecnicoSchema.partial()), tecnicoController.updateTecnico.bind(tecnicoController));

// DELETE /tecnicos/:id - Deletar técnico
router.delete('/:id', tecnicoController.deleteTecnico.bind(tecnicoController));

export default router;