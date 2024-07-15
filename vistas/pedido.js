async function fillDataGridViewpedido() {
    try {
        const pedidos = await getPedidos(); 
        const datagridbody_pedido = document.getElementById('datagrid-body-pedido');
        datagridbody_pedido.innerHTML = '';
        pedidos.forEach(pedido => {
            const row = `
                <tr>
                    <td>${pedido.codigo_pedido}</td>
                    <td>${pedido.codigo_proveedor}</td>
                    <td>${pedido.id_empleado}</td>
                    <td>${pedido.codigo_producto}</td>
                    <td>${pedido.precio}</td>
                    <td>${pedido.unidades}</td>
                    <td>${pedido.total}</td>
                    <td><button class="imprimir_pedido" data-id="${pedido.codigo_pedido}">Imprimir</button></td>
                </tr>
            `;

            datagridbody_pedido.innerHTML += row;

        });
    } catch (error) {
        console.error('Error al llenar la tabla:', error);
    }
}

document.getElementById("consultarBtn-pedido").addEventListener("click", async function(event) {
    event.preventDefault();  
    await fillDataGridViewpedido(); 
});

async function getPedidos() {
  try {
    const response = await fetch(`http://localhost:3000/pedidos`);
    if (!response.ok) {
      throw new Error('Error al obtener los pedidos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function createPedido() {
    let id_empleado = document.getElementById("miComboBox_pedido_proveedor").value.trim();
    let codigo_proveedor = document.getElementById("miComboBox_pedido_empleado").value.trim();
    let codigo_producto = document.getElementById("miComboBox_pedido_producto").value.trim();
    let precio = document.getElementById("precio_registrar_pedido").value.trim();
    let unidades = document.getElementById("unidades_registrar_pedido").value.trim();
    let total = document.getElementById("descripcion_registrar_pedido").value.trim();

    if (!codigo_proveedor || !id_empleado || !codigo_producto || !precio || !unidades || !total) {
        alert("Todos los campos son obligatorios");
        return false;
    }

    let precioTotal = parseFloat(precio) * parseInt(unidades);

    descripcion = `${precioTotal.toFixed(2)} )`;

    const data = {
        codigo_proveedor: codigo_proveedor,
        id_empleado: id_empleado,
        codigo_producto: codigo_producto,
        precio: precio,
        unidades: unidades,
        total: total
    };

    console.log('Datos a enviar:', data);

    try {
        const response = await fetch(`http://localhost:3000/pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);

        document.getElementById("miComboBox_pedido_proveedor").value = '';
        document.getElementById("miComboBox_pedido_empleado").value = '';
        document.getElementById("miComboBox_pedido_producto").value = '';
        document.getElementById("precio_registrar_pedido").value = '';
        document.getElementById("unidades_registrar_pedido").value = '';
        document.getElementById("descripcion_registrar_pedido").value = '';
        


        if (response.ok && responseData.success) {
            alert('Pedido registrado');
            fillDataGridViewpedido();
        } else {
            alert('Error al registrar el pedido');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar el pedido');
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registrar_pedido").addEventListener("click", async function(event) {
        event.preventDefault();  
        await createPedido();
    });
});


const selectElement_pedido_proveedor = document.getElementById("miComboBox_pedido_proveedor");

const xhr_pedido_proveedor = new XMLHttpRequest();
xhr_pedido_proveedor.open("GET", "http://localhost:3000/proveedores", true);
xhr_pedido_proveedor.onload = function () {
    if (xhr_pedido_proveedor.status === 200) {
        
        const data = JSON.parse(xhr_pedido_proveedor.responseText);
        
        
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.codigo_proveedor; 
            option.text = item.nit; 

            selectElement_pedido_proveedor.appendChild(option);
        });
    } else {
        console.error("Error al cargar los datos: ", xhr_pedido_proveedor.status);
    }
};
xhr_pedido_proveedor.send();

const selectElement_pedido_empleado = document.getElementById("miComboBox_pedido_empleado");

const xhr_pedido_empleado = new XMLHttpRequest();
xhr_pedido_empleado.open("GET", "http://localhost:3000/empleados", true);
xhr_pedido_empleado.onload = function () {
    if (xhr_pedido_empleado.status === 200) {
        
        const data = JSON.parse(xhr_pedido_empleado.responseText);
        
        
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id_empleado; 
            option.text = item.nombre; 

            selectElement_pedido_empleado.appendChild(option);
        });
    } else {
        console.error("Error al cargar los datos: ", xhr_pedido_empleado.status);
    }
};
xhr_pedido_empleado.send();


document.addEventListener("click", function(event) {
    if (event.target.classList.contains("imprimir_pedido")) {
        const codigo_pedido = event.target.dataset.id;
        imprimirPedido(codigo_pedido);
    }
});


async function imprimirPedido(codigo_pedido) {
    try {
        
        const pedido = await obtenerPedidoPorID(codigo_pedido);
        
        let contenido = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #333; text-align: center; margin-bottom: 20px;">DataDyno - Pedido #${pedido.codigo_pedido}</h1>
            <div style="margin-bottom: 10px;">
                <p style="margin: 5px 0;"><strong style="color: #333;">Código Proveedor:</strong> ${pedido.codigo_proveedor}</p>
                <p style="margin: 5px 0;"><strong style="color: #333;">ID Empleado:</strong> ${pedido.id_empleado}</p>
                <p style="margin: 5px 0;"><strong style="color: #333;">Código Producto:</strong> ${pedido.codigo_producto}</p>
                <p style="margin: 5px 0;"><strong style="color: #333;">Precio:</strong> ${pedido.precio}</p>
                <p style="margin: 5px 0;"><strong style="color: #333;">Unidades:</strong> ${pedido.unidades}</p>
                <p style="margin: 5px 0;"><strong style="color: #333;">Total:</strong> ${pedido.total}</p>
            </div>
        </div>
        `;

        let ventanaImpresion = window.open("", "_blank");
        ventanaImpresion.document.open();
        ventanaImpresion.document.write(contenido);
        ventanaImpresion.document.close();

        ventanaImpresion.print();
    } catch (error) {
        console.error('Error al imprimir el pedido:', error);
        alert('Error al imprimir el pedido. Por favor, inténtalo de nuevo.');
    }
}

async function obtenerPedidoPorID(codigo_pedido) {
    try {
        const response = await fetch(`http://localhost:3000/pedidos/${codigo_pedido}`);
        if (!response.ok) {
            throw new Error(`Error al obtener el pedido: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error al obtener el pedido: ${error.message}`);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const precioInput = document.getElementById("precio_registrar_pedido");
    const unidadesInput = document.getElementById("unidades_registrar_pedido");
    const descripcionInput = document.getElementById("descripcion_registrar_pedido");

    precioInput.addEventListener('input', updateDescripcion);
    unidadesInput.addEventListener('input', updateDescripcion);

    function updateDescripcion() {
        const precio = parseFloat(precioInput.value);
        const unidades = parseInt(unidadesInput.value);
        if (!isNaN(precio) && !isNaN(unidades)) {
            const precioTotal = precio * unidades;
            descripcionInput.value = `${precioTotal.toFixed(2)}`;
        } else {
            descripcionInput.value = "";
        }
    }
});