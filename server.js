const express = require('express');
const cors = require('cors');
const { caçarLicencasPR_Federal } = require('./scraper/environmentalScraper');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post('/api/cacar-licencas', async (req, res) => {
  const { cnpj, municipio } = req.body;
  if (!cnpj) {
    return res.status(400).json({ erro: "O campo CNPJ é obrigatório." });
  }
  try {
    console.log(`Recebida solicitação de caça para o CNPJ: ${cnpj}`);
    const licencas = await caçarLicencasPR_Federal(cnpj, municipio);
    return res.status(200).json({
      sucesso: true,
      total: licencas.length,
      licencas: licencas
    });
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend Ecolacqua rodando na porta ${PORT}`);
});
