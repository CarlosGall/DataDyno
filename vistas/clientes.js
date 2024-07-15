
async function createCliente() {
    let cedula = document.getElementById("cedula").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let apellido = document.getElementById("apellido").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let correo = document.getElementById("correo").value.trim();

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cedula || !nombre || !apellido || !telefono || !correo) {
        alert("Todos los campos son obligatorios");
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
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo
    };

    console.log('Datos a enviar:', data);

    try {
        const response = await fetch(`http://localhost:3000/clientes`, {
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

        document.getElementById("cedula").value = '';
        document.getElementById("nombre").value = '';
        document.getElementById("apellido").value = '';
        document.getElementById("telefono").value = '';
        document.getElementById("correo").value = '';

        alert("Cliente registrado");

    } catch (error) {
        console.error('Error:', error);
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrar_cliente").addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            await createCliente();
        } finally {
            fillDataGridViewcliente();
            updateComboBoxcliente();
        }
    });
});


const selectElement_cliente = document.getElementById("miComboBox_cliente");

const xhr_cliente = new XMLHttpRequest();
xhr_cliente.open("GET", "http://localhost:3000/clientes", true);
xhr_cliente.onload = function () {
    if (xhr_cliente.status === 200) {

        const data = JSON.parse(xhr_cliente.responseText);


        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id_cliente;
            option.text = item.nombre;
            selectElement_cliente.appendChild(option);
        });
    } else {
        console.error("Error al cargar los datos: ", xhr_cliente.status);
    }
};
xhr_cliente.send();


async function updateCliente(id) {
    const cedula = document.getElementById("cedula_actualizar").value;
    const nombre = document.getElementById("nombre_actualizar").value;
    const apellido = document.getElementById("apellido_actualizar").value;
    const telefono = document.getElementById("telefono_actualizar").value;
    const correo = document.getElementById("correo_actualizar").value;

    if (id === 'opcion1') {
        alert("Por favor selecciona un cliente");
        return false;
    }

    const data = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo
    };

    console.log("Datos a enviar en la solicitud PUT:", data);

    try {
        const response = await fetch(`http://localhost:3000/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData);

        document.getElementById("miComboBox_cliente").value = '';
        document.getElementById("cedula_actualizar").value = '';
        document.getElementById("nombre_actualizar").value = '';
        document.getElementById("apellido_actualizar").value = '';
        document.getElementById("telefono_actualizar").value = '';
        document.getElementById("correo_actualizar").value = '';

        alert("Cliente actualizado");
        updateComboBoxclientebox();

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("actualizar_cliente").addEventListener("click", async function (event) {
        event.preventDefault();
        const id = document.getElementById("miComboBox_cliente").value;
        if (!id) {
            console.error('No se ha seleccionado ningún cliente para actualizar');
            return;
        }
        
        try {
            await updateCliente(id);
        } finally {
            fillDataGridViewcliente();
        }
        
    });
});

async function fillDataGridViewcliente() {
    try {
        const clientes = await getClientes();
        const datagridBody_cliente = document.getElementById('datagrid-body-cliente');
        datagridBody_cliente.innerHTML = '';
        clientes.forEach(cliente => {
            const row = `
                <tr>
                    <td>${cliente.id_cliente}</td>
                    <td>${cliente.cedula}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.correo}</td>
                    <td><button class="eliminar_cliente" data-id="${cliente.id_cliente}">Eliminar</button></td>
                </tr>
            `;
            datagridBody_cliente.innerHTML += row;
        });
    } catch (error) {
        console.error('Error al llenar la tabla:', error);
    }
}



document.getElementById("consultarBtn-cliente").addEventListener("click", async function (event) {
    event.preventDefault();
    await fillDataGridViewcliente();
});

async function getClientes() {
    try {
        const response = await fetch(`http://localhost:3000/clientes`);
        if (!response.ok) {
            throw new Error('Error al obtener los clientes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const selectElement3 = document.getElementById("miComboBox_cliente");
    selectElement3.addEventListener("change", async function () {
      const clienteId = this.value;
      if (!clienteId || clienteId === 'opcion1') {
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/clientes/${clienteId}`);
        const clienteData = await response.json();
        document.getElementById("miComboBox_cliente").value = clienteData.id_cliente;
        document.getElementById("cedula_actualizar").value = clienteData.cedula;
        document.getElementById("nombre_actualizar").value = clienteData.nombre;
        document.getElementById("apellido_actualizar").value = clienteData.apellido;
        document.getElementById("telefono_actualizar").value = clienteData.telefono;
        document.getElementById("correo_actualizar").value = clienteData.correo;
  
      } catch (error) {
        console.error('Error al obtener los detalles del cliente:', error);
      }
    });
  });

  
document.getElementById('datagrid-body-cliente').addEventListener('click', async function (event) {
    if (event.target && event.target.matches('button.eliminar_cliente')) {
      const id = event.target.dataset.id;
      const confirmacion = confirm('¿Estás seguro de que quieres eliminar este cliente?');
      if (confirmacion) {
        await deleteCliente(id);
      }
    }
  });
  
  function filterCliente(clientes, searchTerm) {
    return clientes.filter(cliente => {
      return cliente.id_cliente.toString().includes(searchTerm) ||
      cliente.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.correo.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  async function updateComboBoxclientebox() {
    const selectElement3 = document.getElementById("miComboBox_cliente");
    selectElement3.innerHTML = ""; 
  
    try {
        const response = await fetch("http://localhost:3000/clientes");
        const data = await response.json();
  
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id_cliente; 
            option.text = item.nombre; 
            selectElement3.appendChild(option);
        });
  
    } catch (error) {
        console.error("Error al cargar los datos del combobox: ", error);
    }
  }

  async function deleteCliente(id) {
    try {
        const response = await fetch(`http://localhost:3000/clientes/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el cliente: ${response.statusText}`);
        }
        alert("Cliente eliminado correctamente");
        fillDataGridViewcliente(); 
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
    }
}


async function updateComboBoxcliente() {
    const selectElementclientegrilla = document.getElementById("miComboBox_cliente");
    selectElementclientegrilla.innerHTML = ""; 
  
    try {
        const response = await fetch("http://localhost:3000/clientes");
        const data = await response.json();
  
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id_cliente; 
            option.text = item.nombre; 
            selectElementclientegrilla.appendChild(option);
        });
  
    } catch (error) {
        console.error("Error al cargar los datos del combobox: ", error);
    }
  }

  document.getElementById("searchInputcliente").addEventListener("input", async function () {
    const searchTerm = this.value.trim();
    const clientes = await getClientes();
    const filteredClientes = filterCliente(clientes, searchTerm);
    const datagridBody_cliente = document.getElementById('datagrid-body-cliente');
    datagridBody_cliente.innerHTML = '';
    filteredClientes.forEach(cliente => {
      const row = `
        <tr>
          <td>${cliente.id_cliente}</td>
          <td>${cliente.cedula}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.apellido}</td>
          <td>${cliente.telefono}</td>
          <td>${cliente.correo}</td>
          <td><button class="eliminar_cliente" data-id="${cliente.id_cliente}">Eliminar</button></td>
        </tr>
      `;
      datagridBody_cliente.innerHTML += row;
    });
  });
