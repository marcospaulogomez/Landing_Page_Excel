/**
 * ============================================================================
 * INTEGRAÇÃO GRATUITA: FORMULÁRIO DA LANDING PAGE -> GOOGLE SHEETS
 * ============================================================================
 *
 * PASSO A PASSO PARA ATIVAR (Leva 2 minutos e é 100% gratuito):
 *
 * 1. Acesse https://sheets.new para criar uma nova Planilha Google
 *    (Dê o nome de "Leads - Curso de Excel").
 * 2. No menu superior da planilha, clique em: Extensões > Apps Script.
 * 3. Apague qualquer código que estiver lá e COLE TODO ESTE ARQUIVO.
 * 4. Clique no ícone de Disquete (Salvar) no topo.
 * 5. (Opcional) Selecione a função "configurarPlanilha" na barra superior e
 *    clique em "Executar" para já criar o cabeçalho verde formatado!
 * 6. Clique no botão azul "Implantar" (canto superior direito) > "Nova implantação".
 * 7. Clique na engrenagem ao lado de "Selecione o tipo" e escolha "App da Web".
 * 8. Configure assim:
 *    - Executar como: "Eu" (seu e-mail)
 *    - Quem pode acessar: "Qualquer pessoa" (MUITO IMPORTANTE para os alunos enviarem)
 * 9. Clique em "Implantar", autorize o acesso na sua conta Google e COPIE a
 *    "URL do app da Web" gerada (termina com /exec).
 * 10. Cole essa URL no seu arquivo `config.js` dentro de `LEAD_FORM_ENDPOINT`.
 * ============================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Se a planilha estiver vazia, cria e formata o cabeçalho automaticamente (Padrão DDF!)
    if (sheet.getLastRow() === 0) {
      configurarPlanilha();
    }

    var dados = JSON.parse(e.postData.contents);

    var dataHora = dados.data || new Date().toLocaleString("pt-BR");
    var nome = dados.nome || "";
    var email = dados.email || "";
    var whatsapp = dados.whatsapp || "";
    var origem = dados.origem || "Landing Page Excel";

    // Adiciona a nova linha na planilha
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
    return ContentService
      .createTextOutput(JSON.stringify({ status: "erro", mensagem: erro.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Cria o cabeçalho formatado no padrão DDF (Dados, Design e Função)
 */
function configurarPlanilha() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cabecalhos = ["Data / Hora", "Nome Completo", "E-mail", "WhatsApp", "Origem", "Status Comercial"];

  sheet.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);

  // Design do Cabeçalho (Verde Excel #107c41 com texto branco em negrito)
  var headerRange = sheet.getRange(1, 1, 1, cabecalhos.length);
  headerRange.setBackground("#107c41");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");

  // Congela a primeira linha e ajusta largura das colunas
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 160); // Data/Hora
  sheet.setColumnWidth(2, 220); // Nome
  sheet.setColumnWidth(3, 240); // E-mail
  sheet.setColumnWidth(4, 150); // WhatsApp
  sheet.setColumnWidth(5, 220); // Origem
  sheet.setColumnWidth(6, 150); // Status
}
