
async function createCargo() {
    let nombre = document.getElementById("nombre_cargo").value.trim();
    let area = document.getElementById("area").value.trim();
    let descripcion = document.getElementById("descripcion").value.trim();

    if (!nombre || !area || !descripcion) {
        alert("Todos los campos son obligatorios");
        return false;
    }

    const data = {
        nombre_cargo: nombre,
        area: area,
        descripcion: descripcion
    };

    console.log('Datos a enviar:', data);  

    try {
        const response = await fetch(`http://localhost:3000/cargos`, {
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

        document.getElementById("nombre_cargo").value = '';
        document.getElementById("area").value = '';
        document.getElementById("descripcion").value = '';

        alert("Cargo registrado");

        updateComboBox();

    } catch (error) {
        console.error('Error:', error);
    }
    return true;
}

async function updateComboBox() {
    const selectElement = document.getElementById("miComboBox");
    selectElement.innerHTML = ""; 

    try {
        const response = await fetch("http://localhost:3000/cargos");
        const data = await response.json();

        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id_cargo; 
            option.text = item.nombre_cargo; 
            selectElement.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar los datos del combobox: ", error);
    }
}

async function updateComboBox2() {
    const selectElement2 = document.getElementById("miComboBox_empleado_cargo");
    selectElement2.innerHTML = ""; 

    try {
        const response = await fetch("http://localhost:3000/cargos");
        const data = await response.json();

        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id_cargo; 
            option.text = item.nombre_cargo; 
            selectElement2.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar los datos del combobox: ", error);
    }
}

async function updateComboBox3() {
    const selectElement2 = document.getElementById("miComboBox_empleado_cargo_2");
    selectElement2.innerHTML = ""; 

    try {
        const response = await fetch("http://localhost:3000/cargos");
        const data = await response.json();

        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id_cargo; 
            option.text = item.nombre_cargo; 
            selectElement2.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar los datos del combobox: ", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registrar_cargo").addEventListener("click", async function(event) {
        event.preventDefault();  
        try {
            await createCargo();
        } finally {
            fillDataGridView();
            updateComboBox2();
            updateComboBox3();
        }
    });
});

const selectElement = document.getElementById("miComboBox");

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/cargos", true);
xhr.onload = function () {
    if (xhr.status === 200) {
        
        const data = JSON.parse(xhr.responseText);
        
        
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id_cargo; 
            option.text = item.nombre_cargo; 
            selectElement.appendChild(option);
        });
    } else {
        console.error("Error al cargar los datos: ", xhr.status);
    }
};
xhr.send();

document.addEventListener("DOMContentLoaded", function() {
    const selectElement1 = document.getElementById("miComboBox");

    selectElement1.addEventListener("change", async function() {
        const cargoId = this.value;

        if (!cargoId || cargoId === 'opcion1') {
            return; 
        }

        try {
            
            const response = await fetch(`http://localhost:3000/cargos/${cargoId}`);
            const cargoData = await response.json();

            
            document.getElementById("nombre_cargo_actualizar").value = cargoData.nombre_cargo;
            document.getElementById("area_actualizar").value = cargoData.area;
            document.getElementById("descripcion_actualizar").value = cargoData.descripcion;

        } catch (error) {
            console.error('Error al obtener los detalles del cargo:', error);
        }
    });
});


async function updateCargo(id) {
    const nombre = document.getElementById("nombre_cargo_actualizar").value;
    const area = document.getElementById("area_actualizar").value;
    const descripcion = document.getElementById("descripcion_actualizar").value;

    const data = {
        nombre_cargo: nombre,
        area: area,
        descripcion: descripcion
    };

    if (id === 'opcion1'){
        alert("Por favor selecciona un cargo");
        return false;
    }

    console.log("Datos a enviar en la solicitud PUT:", data); 

    try {
        const response = await fetch(`http://localhost:3000/cargos/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData);

        document.getElementById("miComboBox").value = '';
        document.getElementById("nombre_cargo_actualizar").value = '';
        document.getElementById("area_actualizar").value = '';
        document.getElementById("descripcion_actualizar").value = '';

        alert("Cargo actualizado");

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("actualizar_cargo").addEventListener("click", async function(event) {
        event.preventDefault();  
        const id = document.getElementById("miComboBox").value;
        if (!id) {
            console.error('No se ha seleccionado ningún cargo para actualizar');
            return; 
        }

        try {
            await updateCargo(id);
        } finally {
            fillDataGridView();
        }
    });
});

async function getCargos() {
    try {
      const response = await fetch(`http://localhost:3000/cargos`);
      if (!response.ok) {
        throw new Error('Error al obtener los cargos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  async function fillDataGridView() {
    try {
        const cargos = await getCargos(); 
        const datagridBody = document.getElementById('datagrid-body');
        datagridBody.innerHTML = '';
        cargos.forEach(cargo => {
            const row = `
                <tr>
                    <td>${cargo.id_cargo}</td>
                    <td>${cargo.nombre_cargo}</td>
                    <td>${cargo.area}</td>
                    <td>${cargo.descripcion}</td>
                    <td><button class="eliminar_cargo" data-id="${cargo.id_cargo}">Eliminar</button></td>
                </tr>
            `;
            datagridBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error al llenar la tabla:', error);
    }
}


document.getElementById("consultarBtn").addEventListener("click", async function(event) {
    event.preventDefault();  
    await fillDataGridView(); 
});

function filterCargos(cargos, searchTerm) {
    return cargos.filter(cargo => {
        return cargo.id_cargo.toString().includes(searchTerm) ||
            cargo.nombre_cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cargo.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cargo.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    });
}

async function deleteCargo(id) {
    try {
        const response = await fetch(`http://localhost:3000/cargos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el cargo: ${response.statusText}`);
        }
        alert("Cargo eliminado correctamente");
        fillDataGridView(); 
    } catch (error) {
        console.error('Error al eliminar el cargo:', error);
    }
}


document.getElementById('datagrid-body').addEventListener('click', async function(event) {
    if (event.target && event.target.matches('button.eliminar_cargo')) {
        const id = event.target.dataset.id;
        const confirmacion = confirm('¿Estás seguro de que quieres eliminar este cargo?');
        if (confirmacion) {
            await deleteCargo(id);
        }
    }
});



document.getElementById("searchInput").addEventListener("input", async function() {
    const searchTerm = this.value.trim();
    const cargos = await getCargos();
    const filteredCargos = filterCargos(cargos, searchTerm);
    const datagridBody = document.getElementById('datagrid-body');
    datagridBody.innerHTML = '';
    filteredCargos.forEach(cargo => {
        const row = `
            <tr>
                <td>${cargo.id_cargo}</td>
                <td>${cargo.nombre_cargo}</td>
                <td>${cargo.area}</td>
                <td>${cargo.descripcion}</td>
                <td><button class="eliminar_cargo" data-id="${cargo.id_cargo}">Eliminar</button></td>
            </tr>
        `;
        datagridBody.innerHTML += row;
    });
});