// api/index.js - API CRUD com MongoDB
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// String de conexão MongoDB (usar variável de ambiente)
const MONGODB_URI = process.env.MONGODB_URI || 'https://cloud.mongodb.com/v2/693b3d4cd76c3c2244386be2#/clusters/connect?clusterId=Cluster0';

let db;
let tarefasCollection;

// Conectar ao MongoDB
async function connectDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    db = client.db('tarefas_db');
    tarefasCollection = db.collection('tarefas');
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar MongoDB:', error);
  }
}

connectDB();

// DOCUMENTAÇÃO SWAGGER (JSON)
const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'API CRUD de Tarefas com MongoDB',
    version: '1.0.0',
    description: 'Sistema completo de gerenciamento de tarefas usando MongoDB'
  },
  servers: [
    { url: 'https://sua-api.vercel.app', description: 'Produção' }
  ],
  paths: {
    '/api/tarefas': {
      get: {
        summary: 'Listar todas as tarefas',
        tags: ['Tarefas'],
        responses: {
          200: {
            description: 'Lista de tarefas',
            content: {
              'application/json': {
                example: {
                  success: true,
                  data: [
                    {
                      _id: '673b4db631854701e7c3ac66',
                      Descricao: 'tarefa demonstração aula 13',
                      DataInicial: '2024-11-18T18:50:14.314Z',
                      DataFinal: '2024-11-18T19:47:22.314Z',
                      Status: 'Feito'
                    }
                  ],
                  total: 1
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Criar nova tarefa',
        tags: ['Tarefas'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['Descricao', 'DataInicial', 'DataFinal', 'Status'],
                properties: {
                  Descricao: { type: 'string', example: 'tarefa demonstração aula 13' },
                  DataInicial: { type: 'string', example: '2024-11-18T18:50:14.314Z' },
                  DataFinal: { type: 'string', example: '2024-11-18T19:47:22.314Z' },
                  Status: { type: 'string', example: 'Feito' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Tarefa criada com sucesso' }
        }
      }
    },
    '/api/tarefas/{id}': {
      get: {
        summary: 'Buscar tarefa por ID',
        tags: ['Tarefas'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Tarefa encontrada' },
          404: { description: 'Tarefa não encontrada' }
        }
      },
      put: {
        summary: 'Atualizar tarefa',
        tags: ['Tarefas'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  Descricao: { type: 'string' },
                  DataInicial: { type: 'string' },
                  DataFinal: { type: 'string' },
                  Status: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Tarefa atualizada' }
        }
      },
      delete: {
        summary: 'Deletar tarefa',
        tags: ['Tarefas'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Tarefa deletada' }
        }
      }
    }
  }
};

// ROTA PRINCIPAL
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API CRUD com MongoDB - Sistema de Tarefas',
    documentation: '/api-docs',
    endpoints: {
      'GET /api/tarefas': 'Listar todas as tarefas',
      'GET /api/tarefas/:id': 'Buscar tarefa por ID',
      'POST /api/tarefas': 'Criar nova tarefa',
      'PUT /api/tarefas/:id': 'Atualizar tarefa',
      'DELETE /api/tarefas/:id': 'Deletar tarefa'
    },
    exemplo_post: {
      Descricao: 'tarefa demonstração aula 13',
      DataInicial: '2024-11-18T18:50:14.314Z',
      DataFinal: '2024-11-18T19:47:22.314Z',
      Status: 'Feito'
    }
  });
});

// DOCUMENTAÇÃO SWAGGER
app.get('/api-docs', (req, res) => {
  res.json(swaggerDoc);
});

// CREATE - Criar nova tarefa
app.post('/api/tarefas', async (req, res) => {
  try {
    const { Descricao, DataInicial, DataFinal, Status } = req.body;

    if (!Descricao || !DataInicial || !DataFinal || !Status) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios: Descricao, DataInicial, DataFinal, Status'
      });
    }

    const novaTarefa = {
      Descricao,
      DataInicial,
      DataFinal,
      Status,
      criadoEm: new Date().toISOString()
    };

    const result = await tarefasCollection.insertOne(novaTarefa);

    res.status(201).json({
      success: true,
      message: 'Tarefa criada com sucesso',
      data: {
        _id: result.insertedId,
        ...novaTarefa
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar tarefa',
      error: error.message
    });
  }
});

// READ - Listar todas as tarefas
app.get('/api/tarefas', async (req, res) => {
  try {
    const tarefas = await tarefasCollection.find({}).toArray();

    res.json({
      success: true,
      data: tarefas,
      total: tarefas.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar tarefas',
      error: error.message
    });
  }
});

// READ - Buscar tarefa por ID
app.get('/api/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const tarefa = await tarefasCollection.findOne({ _id: new ObjectId(id) });

    if (!tarefa) {
      return res.status(404).json({
        success: false,
        message: 'Tarefa não encontrada'
      });
    }

    res.json({
      success: true,
      data: tarefa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar tarefa',
      error: error.message
    });
  }
});

// UPDATE - Atualizar tarefa
app.put('/api/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Descricao, DataInicial, DataFinal, Status } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const updateData = {};
    if (Descricao !== undefined) updateData.Descricao = Descricao;
    if (DataInicial !== undefined) updateData.DataInicial = DataInicial;
    if (DataFinal !== undefined) updateData.DataFinal = DataFinal;
    if (Status !== undefined) updateData.Status = Status;
    updateData.atualizadoEm = new Date().toISOString();

    const result = await tarefasCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({
        success: false,
        message: 'Tarefa não encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Tarefa atualizada com sucesso',
      data: result.value
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar tarefa',
      error: error.message
    });
  }
});

// DELETE - Deletar tarefa
app.delete('/api/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const result = await tarefasCollection.findOneAndDelete({ _id: new ObjectId(id) });

    if (!result.value) {
      return res.status(404).json({
        success: false,
        message: 'Tarefa não encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Tarefa deletada com sucesso',
      data: result.value
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar tarefa',
      error: error.message
    });
  }
});

// Iniciar servidor (para testes locais)
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação: http://localhost:${PORT}/api-docs`);
  });
}

// Exportar para Vercel
module.exports = app;
