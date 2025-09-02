import { EmpresaRepository } from '../repositories/index';

export class EmpresaService {
  private empresaRepository: EmpresaRepository;

  constructor() {
    this.empresaRepository = new EmpresaRepository();
  }

  async createEmpresa(data: { nome: string; nuit: string; telefone?: string; email?: string }) {
    // NUIT obrigatório
    if (!/^\d{9}$/.test(data.nuit)) {
      throw new Error('NUIT inválido');
    }
    const empresaNuit = await this.empresaRepository.findByNuit(data.nuit);
    if (empresaNuit) throw new Error('NUIT já cadastrado');

    return await this.empresaRepository.create(data);
  }

  async getEmpresaById(id: number) {
    const empresa = await this.empresaRepository.findById(id);
    if (!empresa) {
      throw new Error('Empresa não encontrada');
    }
  return empresa;
  }

  async getAllEmpresas() {
    return await this.empresaRepository.findAll();
  }

  async updateEmpresa(id: number, data: Partial<{ nome: string; nuit: string; telefone: string; email: string }>) {
    const empresa = await this.empresaRepository.findById(id);
    if (!empresa) {
      throw new Error('Empresa não encontrada');
    }

    // Se está alterando o NUIT, validar e checar duplicidade
    if (data.nuit && data.nuit !== (empresa as any).nuit) {
      if (!/^\d{9}$/.test(data.nuit)) {
        throw new Error('NUIT inválido');
      }
      const empresaNuit = await this.empresaRepository.findByNuit(data.nuit);
      if (empresaNuit) throw new Error('NUIT já cadastrado');
    }

    const sucesso = await this.empresaRepository.update(id, data);
    if (!sucesso) {
      throw new Error('Erro ao atualizar empresa');
    }

    return await this.empresaRepository.findById(id);
  }

  async deleteEmpresa(id: number) {
    const empresa = await this.empresaRepository.findById(id);
    if (!empresa) {
      throw new Error('Empresa não encontrada');
    }

    const sucesso = await this.empresaRepository.delete(id);
    if (!sucesso) {
      throw new Error('Erro ao deletar empresa');
    }

    return { message: 'Empresa deletada com sucesso' };
  }

  // Removido validador de CNPJ para contexto moçambicano
}
