import { Produtores, ProdutoresCampanhas, Tecnicos, Campanhas } from '../models/index';

export class ProdutorRepository {
  async create(data: { nome: string; localizacao: string }) {
    return await Produtores.create(data);
  }

  async findById(id: number) {
    return await Produtores.findByPk(id);
  }

  async findAll() {
    return await Produtores.findAll();
  }

  async update(id: number, data: Partial<{ nome: string; localizacao: string }>) {
    const [affectedCount] = await Produtores.update(data, { where: { id } });
    return affectedCount > 0;
  }

  async delete(id: number) {
    const affectedCount = await Produtores.destroy({ where: { id } });
    return affectedCount > 0;
  }

  async findAtribuicoesByProdutorId(produtorId: number) {
    return await ProdutoresCampanhas.findAll({
      where: { produtor_id: produtorId },
      include: [
        { model: Tecnicos, as: 'tecnico' },
        { model: Campanhas, as: 'campanha' }
      ]
    });
  }

  async findAtribuicaoAtiva(produtorId: number) {
    return await ProdutoresCampanhas.findOne({
      where: { 
        produtor_id: produtorId,
        data_transferencia: null
      },
      include: [
        { model: Tecnicos, as: 'tecnico' },
        { model: Campanhas, as: 'campanha' }
      ]
    });
  }
}
