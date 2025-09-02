import { Router } from 'express';
import { ProdutorController } from '../controllers/index';
import { validateBody } from '../middlewares/validate';
import { atribuirProdutorSchema, createProdutorSchema, transferirProdutorSchema } from '../validators/schemas';

const router = Router();
const produtorController = new ProdutorController();

// POST /produtores - Cadastrar produtor
router.post('/', validateBody(createProdutorSchema), produtorController.createProdutor.bind(produtorController));

// GET /produtores - Listar todos os produtores
router.get('/', produtorController.getAllProdutores.bind(produtorController));

// POST /produtores/atribuir - Atribuir produtor a técnico
router.post('/atribuir', validateBody(atribuirProdutorSchema), produtorController.atribuirProdutor.bind(produtorController));

// PUT /produtores/transferir - Transferir produtor entre técnicos
router.put('/transferir', validateBody(transferirProdutorSchema), produtorController.transferirProdutor.bind(produtorController));

// GET /produtores/:id/atribuicoes - Listar atribuições de um produtor
router.get('/:id/atribuicoes', produtorController.getAtribuicoesByProdutorId.bind(produtorController));

// GET /produtores/:id - Buscar produtor por ID
router.get('/:id', produtorController.getProdutorById.bind(produtorController));

// PUT /produtores/:id - Atualizar produtor
router.put('/:id', validateBody(createProdutorSchema.partial()), produtorController.updateProdutor.bind(produtorController));

// DELETE /produtores/:id - Deletar produtor
router.delete('/:id', produtorController.deleteProdutor.bind(produtorController));

export default router;