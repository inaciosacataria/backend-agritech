import { Tecnicos, Campanhas, ProdutoresCampanhas, Produtores } from '../models/index';

export class TecnicoRepository {
  async create(data: { nome: string; campanha_id: number }) {
    return await Tecnicos.create(data);
  }

  async findById(id: number) {
    return await Tecnicos.findByPk(id, {
      include: [{ model: Campanhas, as: 'campanha' }]
    });
  }

  async findAll() {
    return await Tecnicos.findAll({
      include: [{ model: Campanhas, as: 'campanha' }]
    });
  }

  async findByCampanhaId(campanhaId: number) {
    return await Tecnicos.findAll({
      where: { campanha_id: campanhaId },
      include: [{ model: Campanhas, as: 'campanha' }]
    });
  }

  async findProdutoresByTecnicoId(tecnicoId: number) {
    return await ProdutoresCampanhas.findAll({
      where: { tecnico_id: tecnicoId },
      include: [
        { model: Produtores, as: 'produtor' },
        { model: Campanhas, as: 'campanha' }
      ]
    });
  }

  async update(id: number, data: Partial<{ nome: string; campanha_id: number }>) {
    const [affectedCount] = await Tecnicos.update(data, { where: { id } });
    return affectedCount > 0;
  }

  async delete(id: number) {
    const affectedCount = await Tecnicos.destroy({ where: { id } });
    return affectedCount > 0;
  }
}
