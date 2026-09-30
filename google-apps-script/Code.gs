/*
  GOOGLE SHEETS + RSVP
  ------------------------------------------
  1. Crea una hoja nueva en Google Sheets.
  2. Extensiones > Apps Script.
  3. Borra el contenido y pega este código.
  4. Cambia SHEET_NAME si quieres otro nombre.
  5. Implementar > Nueva implementación > Aplicación web.
  6. Ejecutar como: Tú.
  7. Quién tiene acceso: Cualquiera.
  8. Copia la URL terminada en /exec.
  9. Pégala en src/config.js -> googleSheetsUrl.
*/

const SHEET_NAME = "Confirmaciones";

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "RSVP activo" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const sheet = getSheet_();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha de registro",
        "Nombre",
        "Teléfono / WhatsApp",
        "Asistentes",
        "Mensaje",
        "Evento",
        "Fecha del evento"
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.nombre || "",
      data.telefono || "",
      Number(data.asistentes || 1),
      data.mensaje || "",
      data.evento || "",
      data.fechaEvento || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: String(error)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  return sheet;
}
