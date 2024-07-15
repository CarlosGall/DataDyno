

async function createEmpleado() {
  let cargo = document.getElementById("miComboBox_empleado_cargo").value.trim();
  let cedula = document.getElementById("cedula_empleado").value.trim();
  let nombre = document.getElementById("nombre_empleado").value.trim();
  let apellido = document.getElementById("apellido_empleado").value.trim();
  let direccion = document.getElementById("direccion_empleado").value.trim();
  let telefono = document.getElementById("telefono_empleado").value.trim();
  let correo = document.getElementById("correo_empleado").value.trim();

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!cedula || !nombre || !apellido || !direccion || !telefono || !correo) {
    alert("Todos los campos son obligatorios");
    return false;
  }

  if (cargo === 'opcion1') {
    alert("Por favor selecciona un cargo");
    return false;
  }

  if (cedula.length !== 10) {
    alert("Por favor ingresa una cedula de empleado válido (10 dígitos).");
    return false;
  }

  if (telefono.length !== 10) {
    alert("Por favor ingresa un telefono de empleado válido (10 dígitos).");
    return false;
  }

  if (!correoValido.test(correo)) {
    alert("Por favor ingresa un correo electrónico válido.");
    return false;
  }

  const data = {
    cargo: cargo,
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    telefono: telefono,
    correo_corp: correo
  };

  console.log('Datos a enviar:', data);

  try {
    const response = await fetch(`http://localhost:3000/empleados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(responseData);

    document.getElementById("miComboBox_empleado_cargo").value = '';
    document.getElementById("cedula_empleado").value = '';
    document.getElementById("nombre_empleado").value = '';
    document.getElementById("apellido_empleado").value = '';
    document.getElementById("direccion_empleado").value = '';
    document.getElementById("telefono_empleado").value = '';
    document.getElementById("correo_empleado").value = '';

    alert("Empleado registrado");

    updateComboBoxempleado();
    

  } catch (error) {
    console.error('Error:', error);
  }
  return true;
}

async function updateComboBoxempleado() {
  const selectElementempleadogrilla = document.getElementById("miComboBox_empleado_actualizar");
  selectElementempleadogrilla.innerHTML = ""; 

  try {
      const response = await fetch("http://localhost:3000/empleados");
      const data = await response.json();

      data.forEach(item => {
          const option = document.createElement("option");
          option.value = item.id_empleado; 
          option.text = item.nombre; 
          selectElementempleadogrilla.appendChild(option);
      });

  } catch (error) {
      console.error("Error al cargar los datos del combobox: ", error);
  }
}

async function fillDataGridViewempleado() {
    try {
    const empleados = await getEmpleados();
    const datagridbody_empleado = document.getElementById('datagrid-body-empleado');
    datagridbody_empleado.innerHTML = '';
    empleados.forEach(empleado => {
      const row = `
                <tr>
                    <td>${empleado.id_empleado}</td>
                    <td>${empleado.cargo}</td>
                    <td>${empleado.cedula}</td>
                    <td>${empleado.nombre}</td>
                    <td>${empleado.apellido}</td>
                    <td>${empleado.telefono}</td>
                    <td>${empleado.direccion}</td>
                    <td>${empleado.correo_corp}</td>
                    <td><button class="eliminar_empleado" data-id="${empleado.id_empleado}">Eliminar</button></td>
                </tr>
            `;

      datagridbody_empleado.innerHTML += row;

    });
  } catch (error) {
    console.error('Error al llenar la tabla:', error);
  }
}

document.getElementById("consultarBtn-empleado").addEventListener("click", async function (event) {
  event.preventDefault();
  await fillDataGridViewempleado();
});

async function getEmpleados() {
  try {
    const response = await fetch(`http://localhost:3000/empleados`);
    if (!response.ok) {
      throw new Error('Error al obtener los empleados');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


const selectElement_empleado_actualizar = document.getElementById("miComboBox_empleado_cargo");

const xhr_empleado_cargo = new XMLHttpRequest();
xhr_empleado_cargo.open("GET", "http://localhost:3000/cargos", true);
xhr_empleado_cargo.onload = function () {
  if (xhr_empleado_cargo.status === 200) {

    const data = JSON.parse(xhr_empleado_cargo.responseText);


    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id_cargo;
      option.text = item.nombre_cargo;

      selectElement_empleado_actualizar.appendChild(option);
    });
  } else {
    console.error("Error al cargar los datos: ", xhr_empleado_cargo.status);
  }
};
xhr_empleado_cargo.send();

const selectElement_empleado_actualizar_2 = document.getElementById("miComboBox_empleado_cargo_2");

const xhr_empleado_cargo_2 = new XMLHttpRequest();
xhr_empleado_cargo_2.open("GET", "http://localhost:3000/cargos", true);
xhr_empleado_cargo_2.onload = function () {
  if (xhr_empleado_cargo_2.status === 200) {

    const data = JSON.parse(xhr_empleado_cargo_2.responseText);


    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id_cargo;
      option.text = item.nombre_cargo;

      selectElement_empleado_actualizar_2.appendChild(option);
    });
  } else {
    console.error("Error al cargar los datos: ", xhr_empleado_cargo_2.status);
  }
};
xhr_empleado_cargo_2.send();

const selectElement_empleado = document.getElementById("miComboBox_empleado_actualizar");

const xhr_empleado = new XMLHttpRequest();
xhr_empleado.open("GET", "http://localhost:3000/empleados", true);
xhr_empleado.onload = function () {
  if (xhr_empleado.status === 200) {

    const data = JSON.parse(xhr_empleado.responseText);


    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id_empleado;
      option.text = item.nombre;

      selectElement_empleado.appendChild(option);
    });
  } else {
    console.error("Error al cargar los datos: ", xhr_empleado.status);
  }
};
xhr_empleado.send();




document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registrar_empleado").addEventListener("click", async function (event) {
    event.preventDefault();
    try {
      await createEmpleado();
    } finally {
      fillDataGridViewempleado();
    }
  });
});


async function updateEmpleado(id) {
  const cargo = document.getElementById("miComboBox_empleado_cargo_2").value;
  const cedula = document.getElementById("cedula_empleado_actualizar").value;
  const nombre = document.getElementById("nombre_empleado_actualizar").value;
  const apellido = document.getElementById("apellido_empleado_actualizar").value;
  const direccion = document.getElementById("direccion_empleado_actualizar").value;
  const telefono = document.getElementById("telefono_empleado_actualizar").value;
  const correo = document.getElementById("correo_empleado_actualizar").value;

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!cedula || !nombre || !apellido || !direccion || !telefono || !correo) {
    alert("Todos los campos son obligatorios");
    return false;
  }

  if (cargo === 'opcion1') {
    alert("Por favor selecciona un cargo");
    return false;
  }

  if (cedula.length !== 10) {
    alert("Por favor ingresa una cedula de empleado válido (10 dígitos).");
    return false;
  }

  if (telefono.length !== 10) {
    alert("Por favor ingresa un telefono de empleado válido (10 dígitos).");
    return false;
  }

  if (!correoValido.test(correo)) {
    alert("Por favor ingresa un correo electrónico válido.");
    return false;
  }

  const data = {
    cargo: cargo,
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    telefono: telefono,
    correo: correo
  };

  console.log("Datos a enviar en la solicitud PUT:", data);

  try {
    const response = await fetch(`http://localhost:3000/empleados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    console.log(responseData);

    document.getElementById("miComboBox_empleado_actualizar").value = '';
    document.getElementById("miComboBox_empleado_cargo_2").value = '';
    document.getElementById("cedula_empleado_actualizar").value = '';
    document.getElementById("nombre_empleado_actualizar").value = '';
    document.getElementById("apellido_empleado_actualizar").value = '';
    document.getElementById("direccion_empleado_actualizar").value = '';
    document.getElementById("telefono_empleado_actualizar").value = '';
    document.getElementById("correo_empleado_actualizar").value = '';

    alert("Empleado actualizado correctamente");
    fillDataGridViewempleado();
    updateComboBoxempleadonombre();

  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateComboBoxempleadonombre() {
  const selectElement2 = document.getElementById("miComboBox_empleado_actualizar");
  selectElement2.innerHTML = ""; 

  try {
      const response = await fetch("http://localhost:3000/empleados");
      const data = await response.json();

      data.forEach(item => {
          const option = document.createElement("option");
          option.value = item.id_empleado; 
          option.text = item.nombre; 
          selectElement2.appendChild(option);
      });

  } catch (error) {
      console.error("Error al cargar los datos del combobox: ", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("actualizar_empleado").addEventListener("click", async function (event) {
    event.preventDefault();
    const id = document.getElementById("miComboBox_empleado_actualizar").value;
    if (!id) {
      console.error('No se ha seleccionado ningún cliente para actualizar');
      return;
    }
    await updateEmpleado(id);
  });
});

async function deleteEmpleado(id) {
  try {
    const response = await fetch(`http://localhost:3000/empleados/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar el empleado: ${response.statusText}`);
    }
    alert("Empleado eliminado correctamente");
    fillDataGridViewempleado();
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
  }
}

document.getElementById("searchInputempleado").addEventListener("input", async function () {
  const searchTerm = this.value.trim();
  const empleados = await getEmpleados();
  const filteredEmpleados = filterEmpleados(empleados, searchTerm);
  const datagridbody_empleado = document.getElementById('datagrid-body-empleado');
  datagridbody_empleado.innerHTML = '';
  filteredEmpleados.forEach(empleado => {
    const row = `
      <tr>
        <td>${empleado.id_empleado}</td>
        <td>${empleado.cargo}</td>
        <td>${empleado.cedula}</td>
        <td>${empleado.nombre}</td>
        <td>${empleado.apellido}</td>
        <td>${empleado.telefono}</td>
        <td>${empleado.direccion}</td>
        <td>${empleado.correo_corp}</td>
        <td><button class="eliminar_empleado" data-id="${empleado.id_empleado}">Eliminar</button></td>
      </tr>
    `;
    datagridbody_empleado.innerHTML += row;
  });
});

document.getElementById('datagrid-body-empleado').addEventListener('click', async function (event) {
  if (event.target && event.target.matches('button.eliminar_empleado')) {
    const id = event.target.dataset.id;
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este empleado?');
    if (confirmacion) {
      await deleteEmpleado(id);
    }
  }
});

function filterEmpleados(empleados, searchTerm) {
  return empleados.filter(empleado => {
    return empleado.id_empleado.toString().includes(searchTerm) ||
      empleado.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.correo_corp.toLowerCase().includes(searchTerm.toLowerCase());
  });
}



document.addEventListener("DOMContentLoaded", function () {
  const selectElement2 = document.getElementById("miComboBox_empleado_actualizar");
  selectElement2.addEventListener("change", async function () {
    const empleadoId = this.value;
    if (!empleadoId || empleadoId === 'opcion1') {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/empleados/${empleadoId}`);
      const empleadoData = await response.json();
      document.getElementById("miComboBox_empleado_cargo_2").value = empleadoData.cargo;
      document.getElementById("cedula_empleado_actualizar").value = empleadoData.cedula;
      document.getElementById("nombre_empleado_actualizar").value = empleadoData.nombre;
      document.getElementById("apellido_empleado_actualizar").value = empleadoData.apellido;
      document.getElementById("direccion_empleado_actualizar").value = empleadoData.direccion;
      document.getElementById("telefono_empleado_actualizar").value = empleadoData.telefono;
      document.getElementById("correo_empleado_actualizar").value = empleadoData.correo_corp;

    } catch (error) {
      console.error('Error al obtener los detalles del cargo:', error);
    }
  });
});