import { CampanhaRepository, EmpresaRepository } from '../repositories/index';

export class CampanhaService {
  private campanhaRepository: CampanhaRepository;
  private empresaRepository: EmpresaRepository;

  constructor() {
    this.campanhaRepository = new CampanhaRepository();
    this.empresaRepository = new EmpresaRepository();
  }

  async createCampanha(data: { nome: string; empresa_id: number; data_inicio: string; data_fim?: string }) {
    // Validar se empresa existe
    const empresa = await this.empresaRepository.findById(data.empresa_id);
    if (!empresa) {
      throw new Error('Empresa não encontrada');
    }

    // Validar formato das datas
    if (!this.validarData(data.data_inicio)) {
      throw new Error('Data de início inválida. Use o formato YYYY-MM-DD');
    }

    if (data.data_fim && !this.validarData(data.data_fim)) {
      throw new Error('Data de fim inválida. Use o formato YYYY-MM-DD');
    }

    // Validar se data_fim >= data_inicio
    if (data.data_fim && new Date(data.data_fim) < new Date(data.data_inicio)) {
      throw new Error('Data de fim deve ser maior ou igual à data de início');
    }

    return await this.campanhaRepository.create(data);
  }

  async getCampanhaById(id: number) {
    const campanha = await this.campanhaRepository.findById(id);
    if (!campanha) {
      throw new Error('Campanha não encontrada');
    }
    return campanha;
  }

  async getAllCampanhas() {
    return await this.campanhaRepository.findAll();
  }

  async getCampanhasByEmpresaId(empresaId: number) {
    const empresa = await this.empresaRepository.findById(empresaId);
    if (!empresa) {
      throw new Error('Empresa não encontrada');
    }

    return await this.campanhaRepository.findByEmpresaId(empresaId);
  }

  async updateCampanha(id: number, data: Partial<{ nome: string; empresa_id: number; data_inicio: string; data_fim: string }>) {
    const campanha = await this.campanhaRepository.findById(id);
    if (!campanha) {
      throw new Error('Campanha não encontrada');
    }

    // Se está alterando a empresa, validar se existe
    if (data.empresa_id && data.empresa_id !== (campanha as any).empresa_id) {
      const empresa = await this.empresaRepository.findById(data.empresa_id);
      if (!empresa) {
        throw new Error('Empresa não encontrada');
      }
    }

    // Validar formato das datas se fornecidas
    if (data.data_inicio && !this.validarData(data.data_inicio)) {
      throw new Error('Data de início inválida. Use o formato YYYY-MM-DD');
    }

    if (data.data_fim && !this.validarData(data.data_fim)) {
      throw new Error('Data de fim inválida. Use o formato YYYY-MM-DD');
    }

    // Validar se data_fim >= data_inicio
    const dataInicio = data.data_inicio || (campanha as any).data_inicio;
    const dataFim = data.data_fim || (campanha as any).data_fim;
    
    if (dataFim && new Date(dataFim) < new Date(dataInicio)) {
      throw new Error('Data de fim deve ser maior ou igual à data de início');
    }

    const sucesso = await this.campanhaRepository.update(id, data);
    if (!sucesso) {
      throw new Error('Erro ao atualizar campanha');
    }

    return await this.campanhaRepository.findById(id);
  }

  async deleteCampanha(id: number) {
    const campanha = await this.campanhaRepository.findById(id);
    if (!campanha) {
      throw new Error('Campanha não encontrada');
    }

    const sucesso = await this.campanhaRepository.delete(id);
    if (!sucesso) {
      throw new Error('Erro ao deletar campanha');
    }

    return { message: 'Campanha deletada com sucesso' };
  }

  private validarData(data: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(data)) return false;
    
    const date = new Date(data);
    return date instanceof Date && !isNaN(date.getTime());
  }
}
