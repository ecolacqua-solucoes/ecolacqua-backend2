const puppeteer = require('puppeteer');

async function rasparIBAMA(page, cnpj) {
  let licencas = [];
  try {
    licencas.push({
      cliente: "EMPRESA CONSULTADA S.A.",
      cnpj: cnpj,
      tipo: "LO",
      numero: "IBAMA-FED-9988/2025",
      orgao: "IBAMA",
      vencimento: "2026-12-15",
      lat: -25.4284,
      lng: -49.2733,
      ficheiroNome: "licenca_federal_ibama.pdf",
      condicionantes: [{ descricao: "Relatório anual de emissões federais", prazo: "2026-06-30", ok: false }]
    });
  } catch (err) {
    console.error('[IBAMA] Erro:', err.message);
  }
  return licencas;
}

async function rasparIAT(page, cnpj) {
  let licencas = [];
  try {
    licencas.push({
      cliente: "EMPRESA CONSULTADA S.A.",
      cnpj: cnpj,
      tipo: "LI",
      numero: "IAT-PR-45892/2024",
      orgao: "IAT",
      vencimento: "2026-05-15",
      lat: -25.4300,
      lng: -49.2700,
      ficheiroNome: "licenca_estadual_iat.pdf",
      condicionantes: [{ descricao: "Laudo de estanqueidade dos tanques", prazo: "2026-04-10", ok: true }]
    });
  } catch (err) {
    console.error('[IAT] Erro:', err.message);
  }
  return licencas;
}

async function rasparMunicipalPR(page, cnpj, municipio) {
  let licencas = [];
  try {
    licencas.push({
      cliente: "EMPRESA CONSULTADA S.A.",
      cnpj: cnpj,
      tipo: "LAS",
      numero: "SMMA-PR-1029/2024",
      orgao: "SMA",
      vencimento: "2027-01-20",
      lat: -25.4350,
      lng: -49.2650,
      ficheiroNome: "licenca_municipal_pr.pdf",
      condicionantes: [{ descricao: "Limpeza da caixa de gordura e resíduos", prazo: "2026-08-10", ok: false }]
    });
  } catch (err) {
    console.error('[Municipal] Erro:', err.message);
  }
  return licencas;
}

async function caçarLicencasPR_Federal(cnpj, municipio) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  let resultados = [];
  try {
    const ibama = await rasparIBAMA(page, cnpj);
    const iat = await rasparIAT(page, cnpj);
    const municipal = await rasparMunicipalPR(page, cnpj, municipio);
    resultados = [...ibama, ...iat, ...municipal];
  } finally {
    await browser.close();
  }
  return resultados;
}

module.exports = { caçarLicencasPR_Federal };
