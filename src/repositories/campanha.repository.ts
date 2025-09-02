import { Campanhas, Empresas } from '../models/index';

export class CampanhaRepository {
  async create(data: { nome: string; empresa_id: number; data_inicio: string; data_fim?: string }) {
    return await Campanhas.create(data);
  }

  async findById(id: number) {
    return await Campanhas.findByPk(id, {
      include: [{ model: Empresas, as: 'empresa' }]
    });
  }

  async findAll() {
    return await Campanhas.findAll({
      include: [{ model: Empresas, as: 'empresa' }]
    });
  }

  async findByEmpresaId(empresaId: number) {
    return await Campanhas.findAll({
      where: { empresa_id: empresaId },
      include: [{ model: Empresas, as: 'empresa' }]
    });
  }

  async update(id: number, data: Partial<{ nome: string; empresa_id: number; data_inicio: string; data_fim: string }>) {
    const [affectedCount] = await Campanhas.update(data, { where: { id } });
    return affectedCount > 0;
  }

  async delete(id: number) {
    const affectedCount = await Campanhas.destroy({ where: { id } });
    return affectedCount > 0;
  }
}
