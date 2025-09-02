import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';

export const Empresas = sequelize.define('empresas', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(255), allowNull: false },
  // NUIT (Moçambique) 9 dígitos, opcional porém validado na aplicação
  nuit: { type: DataTypes.STRING(9), allowNull: true, unique: true },
  telefone: { type: DataTypes.STRING(15) },
  email: { type: DataTypes.STRING(100) },
});

export const Campanhas = sequelize.define('campanhas', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(255), allowNull: false },
  empresa_id: { type: DataTypes.INTEGER },
  data_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  data_fim: { type: DataTypes.DATEONLY },
});

export const Tecnicos = sequelize.define('tecnicos', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(255), allowNull: false },
  campanha_id: { type: DataTypes.INTEGER },
});

export const Produtores = sequelize.define('produtores', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(255), allowNull: false },
  localizacao: { type: DataTypes.STRING(255) },
});

export const ProdutoresCampanhas = sequelize.define('produtores_campanhas', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  produtor_id: { type: DataTypes.INTEGER, allowNull: false },
  campanha_id: { type: DataTypes.INTEGER, allowNull: false },
  tecnico_id: { type: DataTypes.INTEGER, allowNull: false },
  data_registro: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  data_transferencia: { type: DataTypes.DATE },
});

// Associations with aliases
Campanhas.belongsTo(Empresas, { foreignKey: 'empresa_id', as: 'empresa' });
Empresas.hasMany(Campanhas, { foreignKey: 'empresa_id', as: 'campanhas' });

Tecnicos.belongsTo(Campanhas, { foreignKey: 'campanha_id', as: 'campanha' });
Campanhas.hasMany(Tecnicos, { foreignKey: 'campanha_id', as: 'tecnicos' });

ProdutoresCampanhas.belongsTo(Produtores, { foreignKey: 'produtor_id', as: 'produtor' });
Produtores.hasMany(ProdutoresCampanhas, { foreignKey: 'produtor_id', as: 'atribuicoes' });

ProdutoresCampanhas.belongsTo(Campanhas, { foreignKey: 'campanha_id', as: 'campanha' });
Campanhas.hasMany(ProdutoresCampanhas, { foreignKey: 'campanha_id', as: 'atribuicoes' });

ProdutoresCampanhas.belongsTo(Tecnicos, { foreignKey: 'tecnico_id', as: 'tecnico' });
Tecnicos.hasMany(ProdutoresCampanhas, { foreignKey: 'tecnico_id', as: 'atribuicoes' });

export const db = {
  sequelize,
  Empresas,
  Campanhas,
  Tecnicos,
  Produtores,
  ProdutoresCampanhas,
};
