import { z } from 'zod';

const toDigits = (val: unknown) => String(val ?? '').replace(/[^\d]/g, '');

export const createEmpresaSchema = z.object({
  nome: z.string().min(1),
  // NUIT: aceita número ou string; normaliza para 9 dígitos e torna obrigatório
  nuit: z
    .preprocess((v) => toDigits(v as unknown), z.string())
    .refine((v) => /^\d{9}$/.test(v), 'NUIT deve ter 9 dígitos'),
  telefone: z.string().optional(),
  email: z.string().email().optional(),
});

export const createCampanhaSchema = z.object({
  nome: z.string().min(1),
  empresa_id: z.number().int(),
  data_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  data_fim: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const createTecnicoSchema = z.object({
  nome: z.string().min(1),
  campanha_id: z.number().int(),
});

export const createProdutorSchema = z.object({
  nome: z.string().min(1),
  localizacao: z.string().min(1),
});

export const atribuirProdutorSchema = z.object({
  produtor_id: z.number().int(),
  tecnico_id: z.number().int(),
  campanha_id: z.number().int(),
});

export const transferirProdutorSchema = z.object({
  produtor_id: z.number().int(),
  tecnico_antigo_id: z.number().int(),
  tecnico_novo_id: z.number().int(),
  campanha_id: z.number().int(),
});
