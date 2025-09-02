import { Request, Response } from 'express';
import { EmpresaService } from '../services/index';

export class EmpresaController {
  private empresaService: EmpresaService;

  constructor() {
    this.empresaService = new EmpresaService();
  }

  async createEmpresa(req: Request, res: Response) {
    try {
      const empresa = await this.empresaService.createEmpresa(req.body);
      res.status(201).json(empresa);
    } catch (error: any) {
      if (
        error.message === 'NUIT inválido' ||
        error.message === 'NUIT já cadastrado' ||
        error.message === 'CNPJ inválido' ||
        error.message === 'CNPJ já cadastrado' ||
        error.message === 'Informe NUIT ou CNPJ'
      ) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getEmpresaById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const empresa = await this.empresaService.getEmpresaById(id);
      res.json(empresa);
    } catch (error: any) {
      if (error.message === 'Empresa não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAllEmpresas(req: Request, res: Response) {
    try {
      const empresas = await this.empresaService.getAllEmpresas();
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async updateEmpresa(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const empresa = await this.empresaService.updateEmpresa(id, req.body);
      res.json(empresa);
    } catch (error: any) {
      if (error.message === 'Empresa não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      if (
        error.message === 'NUIT inválido' ||
        error.message === 'NUIT já cadastrado' ||
        error.message === 'CNPJ inválido' ||
        error.message === 'CNPJ já cadastrado'
      ) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async deleteEmpresa(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const result = await this.empresaService.deleteEmpresa(id);
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Empresa não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
