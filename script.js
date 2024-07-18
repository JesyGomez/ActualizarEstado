document.addEventListener('DOMContentLoaded', function() {
    const leadSelect = document.getElementById('leadSelect');
    const logTableBody = document.querySelector('#logTable tbody');
  
    // Simulación de datos obtenidos de Google Sheets
    const leads = [
      { id: 1, name: 'Juanjo', email: 'closer1@example.com' },
      { id: 2, name: 'JuanJo', email: 'closer2@example.com' },
      { id: 3, name: 'Pedro1', email: 'closer1@example.com' }
    ];
  
    const closerEmail = 'closer1@example.com'; // Email del closer actual
  
    // Filtrar leads asociados al closer
    const closerLeads = leads.filter(lead => lead.email === closerEmail);
  
    // Población del selector de leads
    closerLeads.forEach(lead => {
      const option = document.createElement('option');
      option.value = lead.id;
      option.textContent = lead.name;
      leadSelect.appendChild(option);
    });
  
    // Función para actualizar el estado del lead
    window.updateLeadStatus = function() {
      const leadId = leadSelect.value;
      const status = document.getElementById('statusSelect').value;
  
      if (leadId && status) {
        const leadName = closerLeads.find(lead => lead.id == leadId).name;
  
        // Registro del cambio en la tabla de log
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${new Date().toLocaleString()}</td>
          <td>${leadName}</td>
          <td>${status}</td>
        `;
        logTableBody.appendChild(newRow);
  
        // Notificación por correo si el estado es "Win"
        if (status === 'Win') {
          sendEmailNotification(leadName, status);
        }
      }
    };
  
    // Función para enviar una notificación por correo
    function sendEmailNotification(leadName, status) {
      const email = 'ivan@mycontent.agency';
      const subject = 'Notificación de Lead Ganado';
      const message = `El lead ${leadName} ha sido actualizado a estado: ${status}`;
  
      // Simulación del envío de correo
      console.log(`Enviando correo a ${email} con asunto "${subject}" y mensaje "${message}"`);
    }
  
    // Función para mostrar pestañas
    window.showTab = function(tabId) {
      const tabs = document.querySelectorAll('.tab-content');
      tabs.forEach(tab => {
        tab.style.display = 'none';
      });
      document.getElementById(tabId).style.display = 'block';
    }
  
    // Mostrar la primera pestaña por defecto
    showTab('updateForm');
  });
  