const express = require('express');
const cors = require('cors');
const { cacarLicencasPorCNPJ } = require('./scraper'); // Importa a lógica do arquivo scraper

const app = express();
app.use(cors());
app.use(express.json());

// Rota principal para caçar licenças por CNPJ
app.post('/api/cacar-licencas', async (req, res) => {
  const { cnpj } = req.body;
  
  if (!cnpj) {
    return res.status(400).json({ sucesso: false, erro: "CNPJ não informado." });
  }

  try {
    console.log(`Iniciando busca para o CNPJ: ${cnpj}`);
    
    // Executa a função do scraper
    const resultado = await cacarLicencasPorCNPJ(cnpj);
    
    res.json(resultado);
  } catch (error) {
    console.error("Erro no servidor ao caçar licenças:", error.message);
    res.status(500).json({ 
      sucesso: false, 
      erro: "Erro interno ao comunicar com o servidor backend." 
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor Ecolacqua rodando na porta ${PORT}`);
});
