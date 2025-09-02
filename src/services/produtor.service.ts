import { ProdutorRepository, TecnicoRepository, CampanhaRepository, ProdutoresCampanhasRepository } from '../repositories/index';

export class ProdutorService {
  private produtorRepository: ProdutorRepository;
  private tecnicoRepository: TecnicoRepository;
  private campanhaRepository: CampanhaRepository;
  private produtoresCampanhasRepository: ProdutoresCampanhasRepository;

  constructor() {
    this.produtorRepository = new ProdutorRepository();
    this.tecnicoRepository = new TecnicoRepository();
    this.campanhaRepository = new CampanhaRepository();
    this.produtoresCampanhasRepository = new ProdutoresCampanhasRepository();
  }

  async createProdutor(data: { nome: string; localizacao: string }) {
    return await this.produtorRepository.create(data);
  }

  async getProdutorById(id: number) {
    const produtor = await this.produtorRepository.findById(id);
    if (!produtor) {
      throw new Error('Produtor não encontrado');
    }
    return produtor;
  }

  async getAllProdutores() {
    return await this.produtorRepository.findAll();
  }

  async updateProdutor(id: number, data: Partial<{ nome: string; localizacao: string }>) {
    const produtor = await this.produtorRepository.findById(id);
    if (!produtor) {
      throw new Error('Produtor não encontrado');
    }

    const sucesso = await this.produtorRepository.update(id, data);
    if (!sucesso) {
      throw new Error('Erro ao atualizar produtor');
    }

    return await this.produtorRepository.findById(id);
  }

  async deleteProdutor(id: number) {
    const produtor = await this.produtorRepository.findById(id);
    if (!produtor) {
      throw new Error('Produtor não encontrado');
    }

    const sucesso = await this.produtorRepository.delete(id);
    if (!sucesso) {
      throw new Error('Erro ao deletar produtor');
    }

    return { message: 'Produtor deletado com sucesso' };
  }

  async atribuirProdutor(data: { produtor_id: number; tecnico_id: number; campanha_id: number }) {
    // Validar se produtor existe
    const produtor = await this.produtorRepository.findById(data.produtor_id);
    if (!produtor) {
      throw new Error('Produtor não encontrado');
    }

    // Validar se técnico existe
    const tecnico = await this.tecnicoRepository.findById(data.tecnico_id);
    if (!tecnico) {
      throw new Error('Técnico não encontrado');
    }

    // Validar se campanha existe
    const campanha = await this.campanhaRepository.findById(data.campanha_id);
    if (!campanha) {
      throw new Error('Campanha não encontrada');
    }

    // Validar se técnico está na mesma campanha
    if ((tecnico as any).campanha_id !== data.campanha_id) {
      throw new Error('Técnico deve estar na mesma campanha');
    }

    // Verificar se produtor já está atribuído a esta campanha
    const atribuicaoExistente = await this.produtoresCampanhasRepository.findAtribuicaoAtiva(data.produtor_id, data.campanha_id);
    if (atribuicaoExistente) {
      throw new Error('Produtor já está atribuído a esta campanha');
    }

    return await this.produtoresCampanhasRepository.atribuirProdutor(data.produtor_id, data.tecnico_id, data.campanha_id);
  }

  async transferirProdutor(data: { produtor_id: number; tecnico_antigo_id: number; tecnico_novo_id: number; campanha_id: number }) {
    // Validar se produtor existe
    const produtor = await this.produtorRepository.findById(data.produtor_id);
    if (!produtor) {
      throw new Error('Produtor não encontrado');
    }

    // Validar se técnico antigo existe
    const tecnicoAntigo = await this.tecnicoRepository.findById(data.tecnico_antigo_id);
    if (!tecnicoAntigo) {
      throw new Error('Técnico antigo não encontrado');
    }

    // Validar se técnico novo existe
    const tecnicoNovo = await this.tecnicoRepository.findById(data.tecnico_novo_id);
    if (!tecnicoNovo) {
      throw new Error('Técnico novo não encontrado');
    }

    // Validar se campanha existe
    const campanha = await this.campanhaRepository.findById(data.campanha_id);
    if (!campanha) {
      throw new Error('Campanha não encontrada');
    }

    // Validar se ambos técnicos estão na mesma campanha
    if ((tecnicoAntigo as any).campanha_id !== data.campanha_id || (tecnicoNovo as any).campanha_id !== data.campanha_id) {
      throw new Error('Ambos técnicos devem estar na mesma campanha');
    }

    // Verificar se produtor está atribuído ao técnico antigo nesta campanha
    const atribuicaoAtual = await this.produtoresCampanhasRepository.findAtribuicaoAtiva(data.produtor_id, data.campanha_id);
    if (!atribuicaoAtual || (atribuicaoAtual as any).tecnico_id !== data.tecnico_antigo_id) {
      throw new Error('Produtor não está atribuído ao técnico antigo nesta campanha');
    }

    return await this.produtoresCampanhasRepository.transferirProdutor(
      data.produtor_id,
      data.tecnico_antigo_id,
      data.tecnico_novo_id,
      data.campanha_id
    );
  }

  async getAtribuicoesByProdutorId(produtorId: number) {
    const produtor = await this.produtorRepository.findById(produtorId);
    if (!produtor) {
      throw new Error('Produtor não encontrado');
    }

    return await this.produtorRepository.findAtribuicoesByProdutorId(produtorId);
  }
}