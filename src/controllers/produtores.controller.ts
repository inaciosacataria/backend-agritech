import { Request, Response } from 'express';
import { ProdutorService } from '../services/index';

export class ProdutorController {
  private produtorService: ProdutorService;

  constructor() {
    this.produtorService = new ProdutorService();
  }

  async createProdutor(req: Request, res: Response) {
    try {
      const produtor = await this.produtorService.createProdutor(req.body);
      res.status(201).json(produtor);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getProdutorById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const produtor = await this.produtorService.getProdutorById(id);
      res.json(produtor);
    } catch (error: any) {
      if (error.message === 'Produtor não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAllProdutores(req: Request, res: Response) {
    try {
      const produtores = await this.produtorService.getAllProdutores();
      res.json(produtores);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async updateProdutor(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const produtor = await this.produtorService.updateProdutor(id, req.body);
      res.json(produtor);
    } catch (error: any) {
      if (error.message === 'Produtor não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async deleteProdutor(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const result = await this.produtorService.deleteProdutor(id);
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Produtor não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async atribuirProdutor(req: Request, res: Response) {
    try {
      const result = await this.produtorService.atribuirProdutor(req.body);
      res.status(201).json({ 
        message: 'Produtor atribuído com sucesso', 
        relacionamento: result 
      });
    } catch (error: any) {
      if (error.message === 'Produtor não encontrado' || 
          error.message === 'Técnico não encontrado' ||
          error.message === 'Campanha não encontrada' ||
          error.message === 'Técnico deve estar na mesma campanha' ||
          error.message === 'Produtor já está atribuído a esta campanha') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async transferirProdutor(req: Request, res: Response) {
    try {
      const result = await this.produtorService.transferirProdutor(req.body);
      res.json({ 
        message: 'Produtor transferido com sucesso', 
        relacionamento: result 
      });
    } catch (error: any) {
      if (error.message === 'Produtor não encontrado' || 
          error.message === 'Técnico antigo não encontrado' ||
          error.message === 'Técnico novo não encontrado' ||
          error.message === 'Campanha não encontrada' ||
          error.message === 'Ambos técnicos devem estar na mesma campanha' ||
          error.message === 'Produtor não está atribuído ao técnico antigo nesta campanha') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAtribuicoesByProdutorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const atribuicoes = await this.produtorService.getAtribuicoesByProdutorId(id);
      res.json(atribuicoes);
    } catch (error: any) {
      if (error.message === 'Produtor não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}