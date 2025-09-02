import { Empresas } from '../models/index';

export class EmpresaRepository {
  async create(data: { nome: string; nuit?: string; cnpj?: string; telefone?: string; email?: string }) {
    return await Empresas.create(data);
  }

  async findById(id: number) {
    return await Empresas.findByPk(id);
  }

  async findByNuit(nuit: string) {
    return await Empresas.findOne({ where: { nuit } });
  }

  async findAll() {
    return await Empresas.findAll();
  }

  async update(id: number, data: Partial<{ nome: string; nuit: string; cnpj: string; telefone: string; email: string }>) {
    const [affectedCount] = await Empresas.update(data, { where: { id } });
    return affectedCount > 0;
  }

  async delete(id: number) {
    const affectedCount = await Empresas.destroy({ where: { id } });
    return affectedCount > 0;
  }
}
