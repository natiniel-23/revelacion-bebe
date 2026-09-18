const SHEET_ID = '1hFwZugSahRK5sk8lzP4QxcLW4A9i3AJxz1g_w5Z8FPM';
const SHEET_NAME = ''; // Déjalo vacío para usar la primera pestaña del archivo.

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return SHEET_NAME ? spreadsheet.getSheetByName(SHEET_NAME) : spreadsheet.getSheets()[0];
}

function getVotes_() {
  const values = getSheet_().getRange('B2:B').getValues().flat();
  return values.reduce((votes, value) => {
    const vote = String(value).trim().toUpperCase();
    if (vote === 'M') votes.M += 1;
    if (vote === 'F') votes.F += 1;
    return votes;
  }, { M: 0, F: 0 });
}

function getVoterNames_() {
  return getSheet_().getRange('A2:A').getValues().flat()
    .map(value => String(value).trim())
    .filter(Boolean);
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return jsonResponse_({ votes: getVotes_(), names: getVoterNames_() });
}

function doPost(event) {
  try {
    const body = JSON.parse(event.postData.contents || '{}');
    const name = String(body.name || '').trim();
    const vote = String(body.vote || '').trim().toUpperCase();

    if (!name || !['M', 'F'].includes(vote)) {
      return jsonResponse_({ success: false, error: 'Nombre o voto inválido.' });
    }

    const normalizedName = name.toLocaleLowerCase().replace(/\s+/g, ' ');
    const nameExists = getVoterNames_().some(
      existingName => existingName.toLocaleLowerCase().replace(/\s+/g, ' ') === normalizedName
    );
    if (nameExists) {
      return jsonResponse_({ success: false, duplicate: true, error: 'Este nombre ya registró un voto.' });
    }

    getSheet_().appendRow([name, vote]);
    return jsonResponse_({ success: true, votes: getVotes_(), names: getVoterNames_() });
  } catch (error) {
    return jsonResponse_({ success: false, error: error.message });
  }
}
