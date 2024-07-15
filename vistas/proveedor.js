
async function getProveedores() {
    try {
      const response = await fetch(`http://localhost:3000/proveedores`);
      if (!response.ok) {
        throw new Error('Error al obtener los proveedores');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  async function fillDataGridViewproveedor() {
    try {
        const proveedores = await getProveedores(); 
        const datagridBody_proveedor = document.getElementById('datagrid-body-proveedor');
        datagridBody_proveedor.innerHTML = '';
        proveedores.forEach(proveedor => {
            const row = `
                <tr>
                    <td>${proveedor.codigo_proveedor}</td>
                    <td>${proveedor.nit}</td>
                    <td>${proveedor.razon_social}</td>
                    <td>${proveedor.area}</td>
                    <td>${proveedor.telefono}</td>
                    <td>${proveedor.correo}</td>
                    <td><button class="eliminar_proveedor" data-id="${proveedor.codigo_proveedor}">Eliminar</button></td>
                </tr>
            `;
            datagridBody_proveedor.innerHTML += row;
        });
    } catch (error) {
        console.error('Error al llenar la tabla:', error);
    }
}

document.getElementById("consultarBtn-proveedor").addEventListener("click", async function(event) {
    event.preventDefault();  
    await fillDataGridViewproveedor(); 
});

async function createProveedor() {
    let nit = document.getElementById("nit_registrar_proveedor").value.trim();
    let razon_social = document.getElementById("razonsocial_registrar_proveedor").value.trim();
    let area = document.getElementById("area_registrar_proveedor").value.trim();
    let telefono = document.getElementById("telefono_registrar_proveedor").value.trim();
    let correo = document.getElementById("correo_registrar_proveedor").value.trim();

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nit || !razon_social || !area|| !telefono|| !correo) {
        alert("Todos los campos son obligatorios");
        return false;
    }

    if (telefono.length !== 10) {
        alert("Por favor ingresa un telefono de proveedor válido (10 dígitos).");
        return false;
    }

    if (!correoValido.test(correo)) {
        alert("Por favor ingresa un correo electrónico válido.");
        return false;
    }

    const data = {
        nit: nit,
        razon_social: razon_social,
        area: area,
        telefono: telefono,
        correo: correo
    };

    console.log('Datos a enviar:', data);  

    try {
        const response = await fetch(`http://localhost:3000/proveedores`, {
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

        document.getElementById("nit_registrar_proveedor").value = '';
        document.getElementById("razonsocial_registrar_proveedor").value = '';
        document.getElementById("area_registrar_proveedor").value = '';
        document.getElementById("telefono_registrar_proveedor").value = '';
        document.getElementById("correo_registrar_proveedor").value = '';

        alert("Proveedor registrado");
        fillDataGridViewproveedor();
        updateComboBoxproveedorbox();

    } catch (error) {
        console.error('Error:', error);
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registrar_proveedor").addEventListener("click", async function(event) {
        event.preventDefault();  
        await createProveedor();
    });
});

async function updateComboBoxproveedorbox() {
    const selectElement5 = document.getElementById("miComboBox_proveedor_actualizar");
    selectElement5.innerHTML = ""; 
  
    try {
        const response = await fetch("http://localhost:3000/proveedores");
        const data = await response.json();
  
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.codigo_proveedor; 
            option.text = item.nit; 
            selectElement5.appendChild(option);
        });
  
    } catch (error) {
        console.error("Error al cargar los datos del combobox: ", error);
    }
  }

const selectElement_proveedor_actualizar = document.getElementById("miComboBox_proveedor_actualizar");

const xhr_proveedor = new XMLHttpRequest();
xhr_proveedor.open("GET", "http://localhost:3000/proveedores", true);
xhr_proveedor.onload = function () {
    if (xhr_proveedor.status === 200) {
        
        const data = JSON.parse(xhr_proveedor.responseText);
        
        
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.codigo_proveedor; 
            option.text = item.nit; 
            selectElement_proveedor_actualizar.appendChild(option);
        });
    } else {
        console.error("Error al cargar los datos: ", xhr_proveedor.status);
    }
};
xhr_proveedor.send();

async function updateProveedor(id) {
    const nit = document.getElementById("nit_proveedor_actualizar").value;
    const razon_social = document.getElementById("razonsocial_proveedor_actualizar").value;
    const area = document.getElementById("area_proveedor_actualizar").value;
    const telefono = document.getElementById("telefono_proveedor_actualizar").value;
    const correo = document.getElementById("correo_proveedor_actualizar").value;

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (id === 'opcion1'){
        alert("Por favor selecciona un proveedor");
        return false;
    }

    if (telefono.length !== 10) {
        alert("Por favor ingresa un telefono de proveedor válido (10 dígitos).");
        return false;
    }

    
    if (!correoValido.test(correo)) {
        alert("Por favor ingresa un correo electrónico válido.");
        return false;
    }

    const data = {
        nit: nit,
        razon_social: razon_social,
        area: area,
        telefono: telefono,
        correo: correo
    };

    console.log("Datos a enviar en la solicitud PUT:", data); 

    try {
        const response = await fetch(`http://localhost:3000/proveedores/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData);

        document.getElementById("miComboBox_proveedor_actualizar").value = '';
        document.getElementById("nit_proveedor_actualizar").value = '';
        document.getElementById("razonsocial_proveedor_actualizar").value = '';
        document.getElementById("area_proveedor_actualizar").value = '';
        document.getElementById("telefono_proveedor_actualizar").value = '';
        document.getElementById("correo_proveedor_actualizar").value = '';

        alert("Proveedor actualizado");
        fillDataGridViewproveedor();
        updateComboBoxproveedorbox();

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("actualizar_proveedor").addEventListener("click", async function(event) {
        event.preventDefault();  
        const id = document.getElementById("miComboBox_proveedor_actualizar").value;
        if (!id) {
            console.error('No se ha seleccionado ningún proveedor para actualizar');
            return; 
        }
        await updateProveedor(id);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const selectElement10 = document.getElementById("miComboBox_proveedor_actualizar");
    selectElement10.addEventListener("change", async function () {
      const proveedorId = this.value;
      if (!proveedorId || proveedorId === 'opcion1') {
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/proveedores/${proveedorId}`);
        const proveedorData = await response.json();
        document.getElementById("miComboBox_proveedor_actualizar").value = proveedorData.codigo_proveedor;
        document.getElementById("nit_proveedor_actualizar").value = proveedorData.nit;
        document.getElementById("razonsocial_proveedor_actualizar").value = proveedorData.razon_social;
        document.getElementById("area_proveedor_actualizar").value = proveedorData.area;
        document.getElementById("telefono_proveedor_actualizar").value = proveedorData.telefono;
        document.getElementById("correo_proveedor_actualizar").value = proveedorData.correo;
  
      } catch (error) {
        console.error('Error al obtener los detalles del cliente:', error);
      }
    });
  });
  
document.getElementById('datagrid-body-proveedor').addEventListener('click', async function (event) {
    if (event.target && event.target.matches('button.eliminar_proveedor')) {
      const id = event.target.dataset.id;
      const confirmacion = confirm('¿Estás seguro de que quieres eliminar este proveedor?');
      if (confirmacion) {
        await deleteProveedor(id);
      }
    }
  });
  
  function filterProveedor(proveedores, searchTerm) {
    return proveedores.filter(proveedor => {
      return proveedor.codigo_proveedor.toString().includes(searchTerm) ||
      proveedor.nit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.razon_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.correo.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  
  async function deleteProveedor(id) {
    try {
        const response = await fetch(`http://localhost:3000/proveedores/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el proveedor: ${response.statusText}`);
        }
        alert("Proveedor eliminado correctamente");
        fillDataGridViewproveedor(); 
        updateComboBoxproveedorbox();
    } catch (error) {
        console.error('Error al eliminar el proveedor:', error);
    }
}

async function getProveedores() {
    try {
        const response = await fetch(`http://localhost:3000/proveedores`);
        if (!response.ok) {
            throw new Error('Error al obtener los proveedores');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}


document.getElementById("searchInputproveedor").addEventListener("input", async function () {
    const searchTerm = this.value.trim();
    const proveedores = await getProveedores();
    const filteredProveedores = filterProveedor(proveedores, searchTerm);
    const datagridBody_proveedor = document.getElementById('datagrid-body-proveedor');
    datagridBody_proveedor.innerHTML = '';
    filteredProveedores.forEach(proveedor => {
      const row = `
        <tr>
          <td>${proveedor.codigo_proveedor}</td>
          <td>${proveedor.nit}</td>
          <td>${proveedor.razon_social}</td>
          <td>${proveedor.area}</td>
          <td>${proveedor.telefono}</td>
          <td>${proveedor.correo}</td>
          <td><button class="eliminar_proveedor" data-id="${proveedor.codigo_proveedor}">Eliminar</button></td>
        </tr>
      `;
      datagridBody_proveedor.innerHTML += row;
    });
  });