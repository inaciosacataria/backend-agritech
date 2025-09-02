import { Router } from 'express';
import { CampanhaController } from '../controllers/index';
import { validateBody } from '../middlewares/validate';
import { createCampanhaSchema } from '../validators/schemas';

const router = Router();
const campanhaController = new CampanhaController();

// POST /campanhas - Cadastrar campanha
router.post('/', validateBody(createCampanhaSchema), campanhaController.createCampanha.bind(campanhaController));

// GET /campanhas - Listar todas as campanhas
router.get('/', campanhaController.getAllCampanhas.bind(campanhaController));

// GET /campanhas/empresa/:empresaId - Listar campanhas de uma empresa
router.get('/empresa/:empresaId', campanhaController.getCampanhasByEmpresaId.bind(campanhaController));

// GET /campanhas/:id - Buscar campanha por ID
router.get('/:id', campanhaController.getCampanhaById.bind(campanhaController));

// PUT /campanhas/:id - Atualizar campanha
router.put('/:id', validateBody(createCampanhaSchema.partial()), campanhaController.updateCampanha.bind(campanhaController));

// DELETE /campanhas/:id - Deletar campanha
router.delete('/:id', campanhaController.deleteCampanha.bind(campanhaController));

export default router;
