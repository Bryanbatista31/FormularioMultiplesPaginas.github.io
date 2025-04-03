let currentPage = 1;
const formData = {
  datosPersonales: {},
  familiares: [],
  condicionesSalud: [],
  internamientos: []
};

// Mostrar página inicial
document.getElementById('page1').classList.add('active');

// Cambiar a la siguiente página
/*function nextPage(page) {
  if (validatePage(currentPage)) {
    saveData(currentPage);
    document.getElementById(`page${currentPage}`).classList.remove('active');
    currentPage = page;
    document.getElementById(`page${currentPage}`).classList.add('active');
    if (currentPage === 5) {
      showSummary();
    }
  }
}
*/

function nextPage(page) {
    saveData(currentPage); // Primero guarda los datos actuales
    if (validatePage(currentPage)) {
        document.getElementById(`page${currentPage}`).classList.remove('active');
        currentPage = page;
        document.getElementById(`page${currentPage}`).classList.add('active');
        if (currentPage === 5) {
            showSummary();
        }
    }
}

// Volver a la página anterior
function prevPage(page) {
  document.getElementById(`page${currentPage}`).classList.remove('active');
  currentPage = page;
  document.getElementById(`page${currentPage}`).classList.add('active');
}

// Validar datos de la página actual
function validatePage(page) {
  if (page === 1) {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    if (!nombre || !apellido || !fechaNacimiento) {
      alert('Por favor, complete todos los campos de datos personales.');
      return false;
    }
  } else if (page === 3) {
    if (formData.condicionesSalud.length === 0) {
      alert('Debe agregar al menos una condición de salud.');
      return false;
    }
  }
  return true;
}

// Guardar datos de la página actual
function saveData(page) {
  if (page === 1) {
    formData.datosPersonales = {
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      fechaNacimiento: document.getElementById('fechaNacimiento').value
    };
  } else if (page === 2) {
    const familiaresInputs = document.getElementById('familiaresContainer').querySelectorAll('div');
    formData.familiares = [];
    familiaresInputs.forEach(div => {
      const nombre = div.querySelector('[name="familiarNombre"]').value;
      const parentesco = div.querySelector('[name="familiarParentesco"]').value;
      const edad = div.querySelector('[name="familiarEdad"]').value;
      if (nombre && parentesco && edad) {
        formData.familiares.push({ nombre, parentesco, edad });
      }
    });
  } else if (page === 3) {
    const condicionesInputs = document.getElementById('condicionesContainer').querySelectorAll('div');
    formData.condicionesSalud = [];
    condicionesInputs.forEach(div => {
      const enfermedad = div.querySelector('[name="condicionEnfermedad"]').value;
      const tiempo = div.querySelector('[name="condicionTiempo"]').value;
      if (enfermedad && tiempo) {
        formData.condicionesSalud.push({ enfermedad, tiempo });
      }
    });
  } else if (page === 4) {
    const internamientosInputs = document.getElementById('internamientosContainer').querySelectorAll('div');
    formData.internamientos = [];
    internamientosInputs.forEach(div => {
      const fecha = div.querySelector('[name="internamientoFecha"]').value;
      const centroMedico = div.querySelector('[name="internamientoCentro"]').value;
      const diagnostico = div.querySelector('[name="internamientoDiagnostico"]').value;
      if (fecha && centroMedico && diagnostico) {
        formData.internamientos.push({ fecha, centroMedico, diagnostico });
      }
    });
  }
}

// Agregar campo dinámico para familiares
function addFamiliar() {
  const container = document.getElementById('familiaresContainer');
  const div = document.createElement('div');
  div.innerHTML = `
    <label>Nombre:</label>
    <input type="text" name="familiarNombre"><br>
    <label>Parentesco:</label>
    <input type="text" name="familiarParentesco"><br>
    <label>Edad:</label>
    <input type="number" name="familiarEdad"><br>
  `;
  container.appendChild(div);
}

// Agregar campo dinámico para condiciones de salud
function addCondicion() {
  const container = document.getElementById('condicionesContainer');
  const div = document.createElement('div');
  div.innerHTML = `
    <label>Enfermedad:</label>
    <input type="text" name="condicionEnfermedad"><br>
    <label>Tiempo con la Enfermedad:</label>
    <input type="text" name="condicionTiempo"><br>
  `;
  container.appendChild(div);
}

// Agregar campo dinámico para internamientos
function addInternamiento() {
  const container = document.getElementById('internamientosContainer');
  const div = document.createElement('div');
  div.innerHTML = `
    <label>Fecha:</label>
    <input type="date" name="internamientoFecha"><br>
    <label>Centro Médico:</label>
    <input type="text" name="internamientoCentro"><br>
    <label>Diagnóstico:</label>
    <input type="text" name="internamientoDiagnostico"><br>
  `;
  container.appendChild(div);
}

// Mostrar resumen de datos
function showSummary() {
  const resumen = document.getElementById('resumen');
  resumen.innerHTML = `
    <h3>Datos Personales</h3>
    <p>Nombre: ${formData.datosPersonales.nombre}</p>
    <p>Apellido: ${formData.datosPersonales.apellido}</p>
    <p>Fecha de Nacimiento: ${formData.datosPersonales.fechaNacimiento}</p>
    <h3>Familiares</h3>
    ${formData.familiares.length > 0 ? formData.familiares.map(f => `<p>${f.nombre}, ${f.parentesco}, ${f.edad}</p>`).join('') : '<p>No hay familiares registrados.</p>'}
    <h3>Condiciones de Salud</h3>
    ${formData.condicionesSalud.map(c => `<p>${c.enfermedad}, ${c.tiempo}</p>`).join('')}
    <h3>Internamientos</h3>
    ${formData.internamientos.length > 0 ? formData.internamientos.map(i => `<p>${i.fecha}, ${i.centroMedico}, ${i.diagnostico}</p>`).join('') : '<p>No hay internamientos registrados.</p>'}
  `;
}

// Manejar el envío del formulario
document.getElementById('multiPageForm').addEventListener('submit', function(e) {
  e.preventDefault();
  saveData(4); // Guardar datos de la página 4 antes de enviar
  console.log(JSON.stringify(formData));
  alert('Formulario enviado con éxito!');
});