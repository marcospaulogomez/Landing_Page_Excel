// 1. Nomeada como myFunction para já funcionar direto no botão "▷ Executar"
function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("ATENÇÃO: Abra este script de dentro da sua Planilha Google indo no menu Extensões > Apps Script.");
  }

  var sheet = ss.getActiveSheet();
  var cabecalhos = ["Data / Hora", "Nome Completo", "E-mail", "WhatsApp", "Origem", "Status Comercial"];

  sheet.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);

  // Formatação no padrão Método DDF (Verde Excel #107c41 + Texto Branco)
  var headerRange = sheet.getRange(1, 1, 1, cabecalhos.length);
  headerRange.setBackground("#107c41");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 220);
  sheet.setColumnWidth(3, 240);
  sheet.setColumnWidth(4, 150);
  sheet.setColumnWidth(5, 220);
  sheet.setColumnWidth(6, 150);

  Logger.log("✅ Planilha configurada com sucesso! Agora você já pode clicar em Implantar.");
}

// 2. Esta função recebe automaticamente os leads vindos da sua Landing Page
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Se a planilha ainda estiver em branco, cria o cabeçalho verde na hora
    if (sheet.getLastRow() === 0) {
      myFunction();
    }

    if (!e) {
      return ContentService.createTextOutput("Planilha pronta!");
    }

    var dados = {};

    if (e.parameter && (e.parameter.nome || e.parameter.email)) {
      dados = e.parameter;
    } else if (e.postData && e.postData.contents) {
      dados = JSON.parse(e.postData.contents);
    }

    var dataHora = dados.data || new Date().toLocaleString("pt-BR");
    var nome = dados.nome || "";
    var email = dados.email || "";
    var whatsapp = dados.whatsapp || "";
    var origem = dados.origem || "Landing Page Excel - Prof. Marcos";

    sheet.appendRow([
      dataHora,
      nome,
      email,
      whatsapp,
      origem,
      "Novo Lead"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "sucesso" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    Logger.log("Erro no doPost: " + erro.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: "erro", mensagem: erro.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 3. Caso alguém abra o link /exec direto no navegador, mostra que está online
function doGet(e) {
  return ContentService.createTextOutput("✅ Servidor de Leads do Curso de Excel está ONLINE e funcionando!");
}
