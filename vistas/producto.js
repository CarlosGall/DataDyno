
async function createProducto() {
    let producto = document.getElementById("producto_registrar_producto").value.trim();
    let precio = document.getElementById("precio_registrar_producto").value.trim();
    let unidades = document.getElementById("unidades_registrar_producto").value.trim();
    let descripcion = document.getElementById("descripcion_registrar_producto").value.trim();

    if (!producto || !precio || !unidades|| !descripcion) {
        alert("Todos los campos son obligatorios");
        return false;
    }

    const data = {
        producto: producto,
        precio: precio,
        unidades: unidades,
        descripcion: descripcion
    };

    console.log('Datos a enviar:', data);  

    try {
        const response = await fetch(`http://localhost:3000/productos`, {
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
        alert("Pruducto registrado");

        document.getElementById("producto_registrar_producto").value = '';
        document.getElementById("precio_registrar_producto").value = '';
        document.getElementById("unidades_registrar_producto").value = '';
        document.getElementById("descripcion_registrar_producto").value = '';

        fillDataGridViewproducto();
        updateComboBoxproductobox();


    } catch (error) {
        console.error('Error:', error);
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registrar_producto").addEventListener("click", async function(event) {
        event.preventDefault();  
        await createProducto();
    });
});

async function getProductos() {
    try {
      const response = await fetch(`http://localhost:3000/productos`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  async function fillDataGridViewproducto() {
    try {
        const productos = await getProductos(); 
        const datagridbodyproducto = document.getElementById('datagrid-body-producto');
        datagridbodyproducto.innerHTML = '';
        productos.forEach(producto => {
            const row = `
                <tr>
                    <td>${producto.codigo_producto}</td>
                    <td>${producto.producto}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.unidades}</td>
                    <td>${producto.descripcion}</td>
                    <td><button class="eliminar_producto" data-id="${producto.codigo_producto}">Eliminar</button></td>
                </tr>
            `;
            datagridbodyproducto.innerHTML += row;
        });
    } catch (error) {
        console.error('Error al llenar la tabla:', error);
    }
}

document.getElementById("consultarBtn-producto").addEventListener("click", async function(event) {
    event.preventDefault();  
    await fillDataGridViewproducto(); 
});

const selectElement_producto = document.getElementById("miComboBox_producto_actualizar");

const xhr_productos = new XMLHttpRequest();
xhr_productos.open("GET", "http://localhost:3000/productos", true);
xhr_productos.onload = function () {
    if (xhr_productos.status === 200) {
        
        const data = JSON.parse(xhr_productos.responseText);
        
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.codigo_producto; 
            option.text = item.producto; 
            selectElement_producto.appendChild(option);
        });
    } else {
        console.error("Error al cargar los datos: ", xhr_productos.status);
    }
};
xhr_productos.send();


async function updateProducto(id) {
    const producto = document.getElementById("producto_producto_actualizar").value;
    const precio = document.getElementById("precio_producto_actualizar").value;
    const unidades = document.getElementById("unidades_producto_actualizar").value;
    const descripcion = document.getElementById("descripcion_producto_actualizar").value;

    if (id === 'opcion1'){
        alert("Por favor selecciona un producto");
        return false;
    }

    const data = {
        producto: producto,
        precio: precio,
        unidades: unidades,
        descripcion: descripcion
    };

    console.log("Datos a enviar en la solicitud PUT:", data); 

    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData);

        document.getElementById("producto_producto_actualizar").value = '';
        document.getElementById("precio_producto_actualizar").value = '';
        document.getElementById("unidades_producto_actualizar").value = '';
        document.getElementById("descripcion_producto_actualizar").value = '';

        alert("Producto actualizado");
        fillDataGridViewproducto();
        updateComboBoxproductobox();

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("actualizar_producto").addEventListener("click", async function(event) {
        event.preventDefault();  
        const id = document.getElementById("miComboBox_producto_actualizar").value;
        if (!id) {
            console.error('No se ha seleccionado ningún producto para actualizar');
            return; 
        }
        await updateProducto(id);
    });
});


async function updateComboBoxproductobox() {
    try {
        const response = await fetch(`http://localhost:3000/productos`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const productos = await response.json();
        const comboBox = document.getElementById("miComboBox_pedido_producto");

        comboBox.innerHTML = '<option value="opcion1" disabled selected>Selecciona un producto</option>';

        productos.forEach(producto => {
            const option = document.createElement("option");
            option.value = producto.codigo_producto;  // Asumiendo que cada producto tiene un ID único
            option.text = producto.producto;  // Asumiendo que cada producto tiene un nombre
            option.dataset.precio = producto.precio;  // Almacenar el precio en un atributo de datos
            comboBox.appendChild(option);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

  document.addEventListener("DOMContentLoaded", function () {
    const selectElement1 = document.getElementById("miComboBox_producto_actualizar");
    selectElement1.addEventListener("change", async function () {
      const productoId = this.value;
      if (!productoId || productoId === 'opcion1') {
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/productos/${productoId}`);
        const productoData = await response.json();
        document.getElementById("miComboBox_producto_actualizar").value = productoData.codigo_producto;
        document.getElementById("producto_producto_actualizar").value = productoData.producto;
        document.getElementById("precio_producto_actualizar").value = productoData.precio;
        document.getElementById("unidades_producto_actualizar").value = productoData.unidades;
        document.getElementById("descripcion_producto_actualizar").value = productoData.descripcion;
  
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    });
  });

  
document.getElementById('datagrid-body-producto').addEventListener('click', async function (event) {
    if (event.target && event.target.matches('button.eliminar_producto')) {
      const id = event.target.dataset.id;
      const confirmacion = confirm('¿Estás seguro de que quieres eliminar este producto?');
      if (confirmacion) {
        await deleteProducto(id);
      }
    }
  });
  
  function filterProducto(productos, searchTerm) {
    return productos.filter(producto => {
      return producto.codigo_producto.toString().includes(searchTerm) ||
      producto.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.precio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.unidades.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    });
  }

  
  async function deleteProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el producto: ${response.statusText}`);
        }
        alert("Producto eliminado correctamente");
        fillDataGridViewproducto(); 
        updateComboBoxproductobox();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}


document.getElementById("searchInputproducto").addEventListener("input", async function () {
    const searchTerm = this.value.trim();
    const productos = await getProductos();
    const filteredProductos = filterProducto(productos, searchTerm);
    const datagridBody_producto = document.getElementById('datagrid-body-producto');
    datagridBody_producto.innerHTML = '';
    filteredProductos.forEach(producto => {
      const row = `
        <tr>
          <td>${producto.codigo_producto}</td>
          <td>${producto.producto}</td>
          <td>${producto.precio}</td>
          <td>${producto.unidades}</td>
          <td>${producto.descripcion}</td>
          <td><button class="eliminar_producto" data-id="${producto.codigo_producto}">Eliminar</button></td>
        </tr>
      `;
      datagridBody_producto.innerHTML += row;
    });
  });

  document.getElementById("miComboBox_pedido_producto").addEventListener("change", async function() {
    const selectedOption = this.options[this.selectedIndex];
    if (selectedOption && selectedOption.value !== "opcion1") {
        const precio = selectedOption.dataset.precio;
        document.getElementById("precio_registrar_pedido").value = precio;
    }
});

async function updateComboBoxproductobox() {
    try {
        const response = await fetch(`http://localhost:3000/productos`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const productos = await response.json();
        const comboBox = document.getElementById("miComboBox_pedido_producto");

        comboBox.innerHTML = '<option value="opcion1" disabled selected>Selecciona un producto</option>';

        productos.forEach(producto => {
            const option = document.createElement("option");
            option.value = producto.codigo_producto;  // Asumiendo que cada producto tiene un ID único
            option.text = producto.producto;  // Asumiendo que cada producto tiene un nombre
            option.dataset.precio = producto.precio;  // Almacenar el precio en un atributo de datos
            comboBox.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
    
document.getElementById("miComboBox_pedido_producto").addEventListener("change", async function() {
    const selectedOption = this.options[this.selectedIndex];
    if (selectedOption && selectedOption.value !== "opcion1") {
        const precio = selectedOption.dataset.precio;
        document.getElementById("precio_registrar_pedido").value = precio;
    }
});

updateComboBoxproductobox();