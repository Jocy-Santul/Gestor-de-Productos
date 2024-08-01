let Catalogo = [];

let menuAgregar = document.getElementById('form_content');
let menuActualizarStock = document.getElementById('menu_para_actualizar_stock');
let menuBusquedaPorCategoria = document.getElementById('buscar_por_categoria');
let menuEliminarProductos = document.getElementById('eliminar_producto');
let valorTotalInventario = document.getElementById("valorTotalCatalogo")

const elegirOpciones = () => {
    let opciones = parseInt(prompt(`Elija:
        1 para agregar productos al catalogo
        2 para actualizar el stock de algun producto
        3 para buscar algun/os producto/s por su categoria
        4 para eliminar algun producto
        5 para mostrar el valor total del catalogo
        6 para mostrar solo la tabla con los productos
        `))    

    switch (opciones) {
        case 1:
            menuAgregar.removeAttribute('hidden');
            menuActualizarStock.setAttribute('hidden', true);
            menuBusquedaPorCategoria.setAttribute('hidden', true);
            menuEliminarProductos.setAttribute('hidden', true);
            valorTotalInventario.setAttribute("hidden", true)
            break;
        case 2:
            menuActualizarStock.removeAttribute('hidden');
            menuAgregar.setAttribute('hidden', true);
            menuBusquedaPorCategoria.setAttribute('hidden', true);
            menuEliminarProductos.setAttribute('hidden', true);
            valorTotalInventario.setAttribute("hidden", true)
            break;
        case 3:
            menuBusquedaPorCategoria.removeAttribute('hidden');
            menuAgregar.setAttribute('hidden', true);
            menuActualizarStock.setAttribute('hidden', true);
            menuEliminarProductos.setAttribute('hidden', true);
            valorTotalInventario.setAttribute("hidden", true)
            break;
        case 4:
            menuEliminarProductos.removeAttribute('hidden');
            menuBusquedaPorCategoria.setAttribute('hidden', true);
            menuAgregar.setAttribute('hidden', true);
            menuActualizarStock.setAttribute('hidden', true);
            valorTotalInventario.setAttribute("hidden", true)
            break;
        case 5:
            valorTotalInventario.removeAttribute("hidden")
            menuEliminarProductos.setAttribute('hidden', true);
            menuBusquedaPorCategoria.setAttribute('hidden', true);
            menuAgregar.setAttribute('hidden', true);
            menuActualizarStock.setAttribute('hidden', true);   
            calcularValorTotalDelInventario()         
            break;
        case 6:
            menuEliminarProductos.setAttribute('hidden', true);
            menuBusquedaPorCategoria.setAttribute('hidden', true);
            menuAgregar.setAttribute('hidden', true);
            menuActualizarStock.setAttribute('hidden', true);
            valorTotalInventario.setAttribute("hidden", true)
            hacerTablaHtml(Catalogo)
            break;
        default:
            alert('Ingrese un numero dentro de la lista');
            elegirOpciones();
            break;
    }
}  

let tabla = document.querySelector('tbody')
//punto 3
const hacerTablaHtml = (catal) => {
    tabla.innerHTML = '';
    catal.forEach( cat => {
        tabla.innerHTML += `<tr>
            <td>${cat.Nombre}</td>
            <td>$${cat.Precio}</td>
            <td>${cat.Stock}</td>
            <td>${cat.Categoría}</td>
        </tr>`        
    });
}

//punto 1-2
const agregarAlCatalogo = (nombre, precio, stock, categoria) => {
    let productoRepetido = 0
    if ((!nombre) || (!precio) || (!stock) || (!categoria)){
        alert('La información está incompleta');
    } 
    Catalogo.forEach( names => {
        if (names.Nombre === nombre){
            alert('Ya existe ese producto');
            hacerTablaHtml(Catalogo)
            productoRepetido = true
        }
    });
    if ((nombre && precio && stock && categoria) && (productoRepetido !== true)){
        Catalogo.push({
            Nombre: nombre,
            Precio: parseFloat(precio),
            Stock: parseInt(stock),
            Categoría: categoria
        });
        alert('El producto se ha agregado');
        hacerTablaHtml(Catalogo);
    };
};

//punto 4-5
const buscarPorCategoria = (cat) => {
    let categoriaBuscada = [];
    if (!cat){
        alert('No se ingreso la categoria');
        hacerTablaHtml(Catalogo);
    }
    else if (cat) {
        Catalogo.forEach( categ => {
            if (categ.Categoría === cat){
                categoriaBuscada.push(categ);
                hacerTablaHtml(categoriaBuscada);
            }
        })
    }
}

//punto 6
const cambiarStock = (nombreDelProducto) => {
    let nuevoStock = 0;
    Catalogo.forEach( cambioStock => {
        if (cambioStock.Nombre === nombreDelProducto){
            nuevoStock = parseInt(prompt('Ingrese el stock actualizado para el producto'));
            cambioStock.Stock = nuevoStock;
            console.log(Catalogo)
            alert('Se cambio el stock del producto con exito');
        }
        hacerTablaHtml(Catalogo);
    });
}

//punto 7
const eliminarProductoDelCatalogo = (nombreDelEliminado) => {
    for (let i = 0; i < Catalogo.length; i++) {
        if (Catalogo[i].Nombre === nombreDelEliminado){
            Catalogo.splice(i, 1)
            hacerTablaHtml(Catalogo)
        }   
        else if (nombreDelEliminado !== Catalogo.Nombre) {
            alert("No existe ese producto")
        }
    }
}

//punto 8
const calcularValorTotalDelInventario = () => {
    let valorTotalFinal = 0
    Catalogo.forEach( valorTotalCatalogo => {
        valorTotalFinal += (valorTotalCatalogo.Precio*valorTotalCatalogo.Stock)
        valorTotalInventario.innerHTML = `Valor total del inventario = $${valorTotalFinal}`
    })
}