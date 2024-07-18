# Actualización de Estado de Leads

## Descripción

Este proyecto proporciona una interfaz gráfica para que el equipo comercial (los closers) puedan actualizar el estado de sus agendaciones de llamada registradas en Google Sheets. La aplicación permite seleccionar un lead, actualizar su estado, y registrar los cambios en una pestaña separada. Además, se envía una notificación por correo cuando un lead se actualiza al estado "Win".

## Funcionalidades

1. **Menú personalizado para actualizar el estado**: Un formulario sencillo y accesible permite a los closers seleccionar un lead y actualizar su estado.
2. **Formulario emergente para seleccionar el estado**: Utiliza un modal para una mejor experiencia del usuario.
3. **Registro de cambios en una pestaña separada**: Los cambios se registran y se muestran en una tabla en una pestaña separada dentro de la interfaz.
4. **Acceso sin necesidad de entrar en la base de datos**: Toda la actividad se realiza desde la aplicación, sin necesidad de acceder manualmente a la base de datos de Google Sheets.

## Tecnologías Utilizadas

- HTML: [Enlace al archivo HTML](#)
- CSS: [Enlace al archivo CSS](#)
- JavaScript: [Enlace al archivo JavaScript](#)
- Google Apps Script: [Enlace al código de Google Apps Script](#)
- Google Sheets: [Enlace a la base de datos en Google Sheets](#)

## Configuración

### Google Apps Script

1. Abre [Google Apps Script](https://script.google.com/).
2. Crea un nuevo proyecto y pega el siguiente código en el editor de scripts:

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getLeads() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  const rows = sheet.getDataRange().getValues();
  return rows.slice(1).map(row => ({
    id: row[0],
    name: row[1],
    email: row[2]
  }));
}

function updateLeadStatus(leadId, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] == leadId) {
      sheet.getRange(i + 1, 4).setValue(status);
      logChange(leadId, status);
      return;
    }
  }
}

function logChange(leadId, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log');
  sheet.appendRow([new Date(), leadId, status]);
}
