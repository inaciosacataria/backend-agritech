import { Request, Response } from 'express';
import { TecnicoService } from '../services/index';

export class TecnicoController {
  private tecnicoService: TecnicoService;

  constructor() {
    this.tecnicoService = new TecnicoService();
  }

  async createTecnico(req: Request, res: Response) {
    try {
      const tecnico = await this.tecnicoService.createTecnico(req.body);
      res.status(201).json(tecnico);
    } catch (error: any) {
      if (error.message === 'Campanha não encontrada') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getTecnicoById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const tecnico = await this.tecnicoService.getTecnicoById(id);
      res.json(tecnico);
    } catch (error: any) {
      if (error.message === 'Técnico não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAllTecnicos(req: Request, res: Response) {
    try {
      const tecnicos = await this.tecnicoService.getAllTecnicos();
      res.json(tecnicos);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getTecnicosByCampanhaId(req: Request, res: Response) {
    try {
      const campanhaId = parseInt(req.params.campanhaId);
      if (isNaN(campanhaId)) {
        return res.status(400).json({ error: 'ID da campanha inválido' });
      }

      const tecnicos = await this.tecnicoService.getTecnicosByCampanhaId(campanhaId);
      res.json(tecnicos);
    } catch (error: any) {
      if (error.message === 'Campanha não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getProdutoresByTecnicoId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const produtores = await this.tecnicoService.getProdutoresByTecnicoId(id);
      res.json(produtores);
    } catch (error: any) {
      if (error.message === 'Técnico não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async updateTecnico(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const tecnico = await this.tecnicoService.updateTecnico(id, req.body);
      res.json(tecnico);
    } catch (error: any) {
      if (error.message === 'Técnico não encontrado' || error.message === 'Campanha não encontrada') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async deleteTecnico(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const result = await this.tecnicoService.deleteTecnico(id);
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Técnico não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}