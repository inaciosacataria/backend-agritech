import { Request, Response } from 'express';
import { CampanhaService } from '../services/index';

export class CampanhaController {
  private campanhaService: CampanhaService;

  constructor() {
    this.campanhaService = new CampanhaService();
  }

  async createCampanha(req: Request, res: Response) {
    try {
      const campanha = await this.campanhaService.createCampanha(req.body);
      res.status(201).json(campanha);
    } catch (error: any) {
      if (error.message === 'Empresa não encontrada' || 
          error.message.includes('Data') || 
          error.message.includes('formato')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getCampanhaById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const campanha = await this.campanhaService.getCampanhaById(id);
      res.json(campanha);
    } catch (error: any) {
      if (error.message === 'Campanha não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAllCampanhas(req: Request, res: Response) {
    try {
      const campanhas = await this.campanhaService.getAllCampanhas();
      res.json(campanhas);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getCampanhasByEmpresaId(req: Request, res: Response) {
    try {
      const empresaId = parseInt(req.params.empresaId);
      if (isNaN(empresaId)) {
        return res.status(400).json({ error: 'ID da empresa inválido' });
      }

      const campanhas = await this.campanhaService.getCampanhasByEmpresaId(empresaId);
      res.json(campanhas);
    } catch (error: any) {
      if (error.message === 'Empresa não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async updateCampanha(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const campanha = await this.campanhaService.updateCampanha(id, req.body);
      res.json(campanha);
    } catch (error: any) {
      if (error.message === 'Campanha não encontrada' || 
          error.message === 'Empresa não encontrada' ||
          error.message.includes('Data') || 
          error.message.includes('formato')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async deleteCampanha(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const result = await this.campanhaService.deleteCampanha(id);
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Campanha não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
