const productos = [
  { id: 0, nombre: 'Aqua', precio: 200 },
  { id: 1, nombre: 'Emoción', precio: 180 },
  { id: 2, nombre: 'Alegría', precio: 160 },
  { id: 3, nombre: 'Frescura', precio: 150 }
];

const vendedores = [
  { id: 0, nombre: 'Juana' },
  { id: 1, nombre: 'Pedro' }
];

let ventas = [];

function ventaRegistrada(vendedorId, productoId) {
  for (let i = 0; i < ventas.length; i++) {
    if (ventas[i].vendedorId === parseInt(vendedorId) && ventas[i].productoId === parseInt(productoId)) {
      return true;
    }
  }
  return false;
}

function registrarVenta() {
  let vendedorId = document.getElementById("vendedor").value;
  let productoId = document.getElementById("producto").value;
  let cantidad = parseInt(document.getElementById("valorVentas").value);

  if (!isNaN(cantidad) && cantidad > 0 || cantidad === "") {
    ventas.push({ vendedorId: parseInt(vendedorId), productoId: parseInt(productoId), cantidad: cantidad });
    registrarTablaVentas(vendedorId, productoId, cantidad);
  } else {
    alert("Por favor, ingrese una cantidad válida y mayor a cero.");
  }
  cantidad.value = "";
}

function registrarTablaVentas() {
  let columnasVentasVendedor = document.getElementById("columnasVentasVendedor");
  let ventasVendedorHTML = "";

  for (let i = 0; i < vendedores.length; i++) {
    let vendedor = vendedores[i];
    let ventasVendedor = ventas.filter(function (venta) {
      return venta.vendedorId === vendedor.id;
    });

    if (ventasVendedor.length > 0) {

      for (let j = 0; j < ventasVendedor.length; j++) {
        let venta = ventasVendedor[j];
        let producto = productos.find(function (producto) {
          return producto.id === venta.productoId;
        });

        ventasVendedorHTML += "<tr><td>" + vendedor.nombre + "</td>" +
          "<td>" + producto.nombre + "</td>" +
          "<td>" + venta.cantidad + "</td>" +
          "<td>" + (venta.cantidad * producto.precio) + " USD</td></tr>";
      }
    }
  }

  columnasVentasVendedor.innerHTML = ventasVendedorHTML;
}

function mostrarResultados() {
  let columnasVentasTotal = document.getElementById("columnasVentasTotal");
  let ventasTotalHTML = "";

  let ventasPorVendedor = {};

  for (let i = 0; i < vendedores.length; i++) {
    let vendedor = vendedores[i];
    let ventasVendedor = ventas.filter(function (venta) {
      return venta.vendedorId === vendedor.id;
    });

    if (ventasVendedor.length > 0) {
      let ventasPorProducto = {};

      for (let j = 0; j < ventasVendedor.length; j++) {
        let venta = ventasVendedor[j];
        let producto = productos.find(function (producto) {
          return producto.id === venta.productoId;
        });

        let cantidad = venta.cantidad;

        if (ventasPorProducto[producto.nombre]) {
          ventasPorProducto[producto.nombre].cantidad += cantidad;
        } else {
          ventasPorProducto[producto.nombre] = {
            cantidad: cantidad
          };
        }
      }

      ventasTotalHTML += "<tr>";
      ventasTotalHTML += "<td rowspan='" + Object.keys(ventasPorProducto).length + "'>" + vendedor.nombre + "</td>";

      let totalVentasVendedor = 0;
      let isFirstRow = true;

      for (let productoNombre in ventasPorProducto) {
        let producto = ventasPorProducto[productoNombre];
        let cantidad = producto.cantidad;

        if (!isFirstRow) {
          ventasTotalHTML += "<tr>";
        }

        ventasTotalHTML += "<td>" + productoNombre + "</td>";
        ventasTotalHTML += "<td>" + cantidad + "</td>";
        ventasTotalHTML += "</tr>";

        let productoObj = productos.find(function (prod) {
          return prod.nombre === productoNombre;
        });

        totalVentasVendedor += cantidad * productoObj.precio;

        isFirstRow = false;
      }

      ventasTotalHTML += "<tr>";
      ventasTotalHTML += "<td colspan='2'>Total Ventas:</td>";
      ventasTotalHTML += "<td>" + totalVentasVendedor + " USD</td>";
      ventasTotalHTML += "</tr>";

      ventasPorVendedor[vendedor.nombre] = totalVentasVendedor;
    }
  }

  columnasVentasTotal.innerHTML = ventasTotalHTML;

  let empleadoDelMes = "";
  let maxVentas = 0;
  let empate = false;

  for (let vendedorNombre in ventasPorVendedor) {
    let totalVentasVendedor = ventasPorVendedor[vendedorNombre];

    if (totalVentasVendedor > maxVentas) {
      maxVentas = totalVentasVendedor;
      empleadoDelMes = vendedorNombre;
      empate = false;
    } else if (totalVentasVendedor === maxVentas) {
      empate = true;
    }
  }

  let empleadoMes = document.getElementById("empleadoMes");

  if (empate) {
    empleadoMes.textContent = "¡Empate entre los empleados!";
  } else if (empleadoDelMes !== "") {
    empleadoMes.textContent = "¡Empleado del mes: " + empleadoDelMes + "!";
  } else {
    empleadoMes.textContent = "";
  }
}
function limpiar(){
  empleadoMes.textContent = "";
  columnasVentasTotal.innerHTML = "";
  columnasVentasVendedor.innerHTML = "";
  ventas = [];
}


