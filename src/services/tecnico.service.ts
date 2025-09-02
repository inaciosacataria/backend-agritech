import { TecnicoRepository, CampanhaRepository } from '../repositories/index';

export class TecnicoService {
  private tecnicoRepository: TecnicoRepository;
  private campanhaRepository: CampanhaRepository;

  constructor() {
    this.tecnicoRepository = new TecnicoRepository();
    this.campanhaRepository = new CampanhaRepository();
  }

  async createTecnico(data: { nome: string; campanha_id: number }) {
    // Validar se campanha existe
    const campanha = await this.campanhaRepository.findById(data.campanha_id);
    if (!campanha) {
      throw new Error('Campanha não encontrada');
    }

    return await this.tecnicoRepository.create(data);
  }

  async getTecnicoById(id: number) {
    const tecnico = await this.tecnicoRepository.findById(id);
    if (!tecnico) {
      throw new Error('Técnico não encontrado');
    }
    return tecnico;
  }

  async getAllTecnicos() {
    return await this.tecnicoRepository.findAll();
  }

  async getTecnicosByCampanhaId(campanhaId: number) {
    const campanha = await this.campanhaRepository.findById(campanhaId);
    if (!campanha) {
      throw new Error('Campanha não encontrada');
    }

    return await this.tecnicoRepository.findByCampanhaId(campanhaId);
  }

  async getProdutoresByTecnicoId(tecnicoId: number) {
    const tecnico = await this.tecnicoRepository.findById(tecnicoId);
    if (!tecnico) {
      throw new Error('Técnico não encontrado');
    }

    return await this.tecnicoRepository.findProdutoresByTecnicoId(tecnicoId);
  }

  async updateTecnico(id: number, data: Partial<{ nome: string; campanha_id: number }>) {
    const tecnico = await this.tecnicoRepository.findById(id);
    if (!tecnico) {
      throw new Error('Técnico não encontrado');
    }

    // Se está alterando a campanha, validar se existe
    if (data.campanha_id && data.campanha_id !== (tecnico as any).campanha_id) {
      const campanha = await this.campanhaRepository.findById(data.campanha_id);
      if (!campanha) {
        throw new Error('Campanha não encontrada');
      }
    }

    const sucesso = await this.tecnicoRepository.update(id, data);
    if (!sucesso) {
      throw new Error('Erro ao atualizar técnico');
    }

    return await this.tecnicoRepository.findById(id);
  }

  async deleteTecnico(id: number) {
    const tecnico = await this.tecnicoRepository.findById(id);
    if (!tecnico) {
      throw new Error('Técnico não encontrado');
    }

    const sucesso = await this.tecnicoRepository.delete(id);
    if (!sucesso) {
      throw new Error('Erro ao deletar técnico');
    }

    return { message: 'Técnico deletado com sucesso' };
  }
}