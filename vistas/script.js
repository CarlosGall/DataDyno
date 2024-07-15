const body = document.querySelector('body'),
 sidebar = body.querySelector(".sidebar"),
 toggle = body.querySelector(".toggle"),
 searchBtn = body.querySelector(".search-box"),
 modeSwtich = body.querySelector(".toggle-switch"),
 modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
});

modeSwtich.addEventListener("click", () => {
    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        modeText.innerText = "Modo dia"
    }else{
        modeText.innerText = "Modo noche"
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const empleadoLink = document.getElementById("empleados-link");

    empleadoLink.addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelector('.form-column1').style.display = 'block';
        document.querySelector('.form-column2').style.display = 'block';
        document.querySelector('.datagrid-container-empleado').style.display = 'block';
        
        const divsToHide = document.querySelectorAll('.form-column3, .form-column4, .form-column5, .form-column6, .form-column7, .form-column8, .form-column9, .form-column11, .form-column12 .datagrid-container-proveedor, .datagrid-container, .datagrid-container-cliente, .consultarBtn-producto, .datagrid-container-pedido, .imagen-empresa');
        divsToHide.forEach(div => {
            div.style.display = 'none';
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const cargosLink = document.getElementById("cargos-link");

    cargosLink.addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelector('.form-column3').style.display = 'block';
        document.querySelector('.form-column4').style.display = 'block';
        document.querySelector('.datagrid-container').style.display = 'block';

        const divsToHide = document.querySelectorAll('.form-column1, .form-column2, .form-column5, .form-column6, .form-column7, .form-column8, .form-column9, .form-column10, .form-column11, .form-column12, .datagrid-container-proveedor, .datagrid-container-cliente, .datagrid-container-empleado, .datagrid-container-producto, .datagrid-container-pedido, .imagen-empresa');
        divsToHide.forEach(div => {
            div.style.display = 'none';
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const clientesLink = document.getElementById("clientes-link");

    clientesLink.addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelector('.form-column5').style.display = 'block';
        document.querySelector('.form-column6').style.display = 'block';
        document.querySelector('.datagrid-container-cliente').style.display = 'block';
        

        
        const divsToHide = document.querySelectorAll('.form-column1, .form-column2, .form-column3, .form-column4, .form-column7, .form-column8, .form-column9, .form-column10, .form-column11, .form-column12, .datagrid-container-proveedor, .datagrid-container, .datagrid-container-empleado, .datagrid-container-producto, .datagrid-container-pedido, .imagen-empresa');
        divsToHide.forEach(div => {
            div.style.display = 'none';
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const proveedoresLink = document.getElementById("proveedores-link");

    proveedoresLink.addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelector('.form-column7').style.display = 'block';
        document.querySelector('.form-column8').style.display = 'block';
        document.querySelector('.datagrid-container-proveedor').style.display = 'block';
        
        const divsToHide = document.querySelectorAll('.form-column1, .form-column2, .form-column3, .form-column4, .form-column5, .form-column6, .form-column9, .form-column10, .form-column11, .form-column12, .datagrid-container, .datagrid-container-cliente, .datagrid-container-empleado, .datagrid-container-pedido, .datagrid-container-producto, .imagen-empresa, .imagen-empresa');
        divsToHide.forEach(div => {
            div.style.display = 'none';
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const pedidosLink = document.getElementById("pedidos-link");

    pedidosLink.addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelector('.form-column9').style.display = 'block';
        document.querySelector('.datagrid-container-pedido').style.display = 'block';
        document.querySelector('.imagen-empresa').style.display = 'block';
        
        const divsToHide = document.querySelectorAll('.form-column1, .form-column2, .form-column3, .form-column4, .form-column5, .form-column6, .form-column7, .form-column8, .form-column11, .form-column12, .datagrid-container, .datagrid-container-cliente, .datagrid-container-empleado, .datagrid-container-proveedor, .datagrid-container-producto');
        divsToHide.forEach(div => {
            div.style.display = 'none';
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const productosLink = document.getElementById("productos-link");

    productosLink.addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelector('.form-column11').style.display = 'block';
        document.querySelector('.form-column12').style.display = 'block';
        document.querySelector('.datagrid-container-producto').style.display = 'block';
        
        const divsToHide = document.querySelectorAll('.form-column1, .form-column2, .form-column3, .form-column4, .form-column5, .form-column6, .form-column7, .form-column8, .form-column9, .form-column10, .datagrid-container, .datagrid-container-cliente, .datagrid-container-empleado, .datagrid-container-proveedor, .datagrid-container-pedido, .imagen-empresa');
        divsToHide.forEach(div => {
            div.style.display = 'none';
        });
    });
});

function deshabilitaRetroceso(){
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button" //chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}
}

document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace redireccione inmediatamente

    // Muestra un mensaje de confirmación
    if (confirm('¿Desea cerrar sesión?')) {
        // Si el usuario confirma, redirige al index2
        window.location.href = "index2.html";
    }
});
