import { ProdutoresCampanhas, Produtores, Tecnicos, Campanhas } from '../models/index';
import { sequelize } from '../db/sequelize';

export class ProdutoresCampanhasRepository {
  async create(data: { produtor_id: number; campanha_id: number; tecnico_id: number }) {
    return await ProdutoresCampanhas.create(data);
  }

  async findById(id: number) {
    return await ProdutoresCampanhas.findByPk(id, {
      include: [
        { model: Produtores, as: 'produtor' },
        { model: Tecnicos, as: 'tecnico' },
        { model: Campanhas, as: 'campanha' }
      ]
    });
  }

  async findAtribuicaoAtiva(produtorId: number, campanhaId: number) {
    return await ProdutoresCampanhas.findOne({
      where: { 
        produtor_id: produtorId,
        campanha_id: campanhaId,
        data_transferencia: null
      },
      include: [
        { model: Produtores, as: 'produtor' },
        { model: Tecnicos, as: 'tecnico' },
        { model: Campanhas, as: 'campanha' }
      ]
    });
  }

  async transferirProdutor(produtorId: number, tecnicoAntigoId: number, tecnicoNovoId: number, campanhaId: number) {
    const transaction = await sequelize.transaction();
    
    try {
      // Finalizar atribuição atual
      await ProdutoresCampanhas.update(
        { data_transferencia: new Date() },
        { 
          where: { 
            produtor_id: produtorId,
            tecnico_id: tecnicoAntigoId,
            campanha_id: campanhaId,
            data_transferencia: null
          },
          transaction
        }
      );

      // Criar nova atribuição
      const novaAtribuicao = await ProdutoresCampanhas.create({
        produtor_id: produtorId,
        tecnico_id: tecnicoNovoId,
        campanha_id: campanhaId
      }, { transaction });

      await transaction.commit();
      return novaAtribuicao;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async atribuirProdutor(produtorId: number, tecnicoId: number, campanhaId: number) {
    return await ProdutoresCampanhas.create({
      produtor_id: produtorId,
      tecnico_id: tecnicoId,
      campanha_id: campanhaId
    });
  }

  async findAll() {
    return await ProdutoresCampanhas.findAll({
      include: [
        { model: Produtores, as: 'produtor' },
        { model: Tecnicos, as: 'tecnico' },
        { model: Campanhas, as: 'campanha' }
      ]
    });
  }
}
