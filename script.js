
import Carrito from "./Carrito.js";


const carrito = new Carrito();



document.addEventListener('DOMContentLoaded',function(event){

    function cargarTabla(productos){
        const tablaProducts = document.getElementById("tablaProductos");

      productos.forEach(prod => {

        const SKUcell = document.createElement('td');

        const element = document.createElement('p');
        element.innerText = prod.title;

        const skuElement = document.createElement('p');
        skuElement.innerText = ("REF: " + prod.SKU);
        skuElement.classList.add('sku');

        SKUcell.appendChild(element);
        SKUcell.appendChild(skuElement);


        const cantidad = document.createElement('td');

        const miDiv = document.createElement('div');
        miDiv.style.display = 'flex'; 


        const miButtonMenos = document.createElement('button');
        miButtonMenos.textContent = "-";

        const miButtonMas = document.createElement('button');
        miButtonMas.textContent = "+";

        const contador = document.createElement('input');
        contador.type = "number";
        contador.value = 0;
        contador.min = 0;
        contador.style.width = '40px';

        miDiv.append(miButtonMenos,contador,miButtonMas);
        cantidad.appendChild(miDiv);
    
        const precioCelda = document.createElement('td');
        precioCelda.innerText = prod.price + euro;

       const totalCelda = document.createElement('td');
       totalCelda.innerText = "0" + euro;

        
      function actualizarTotal(){

       const cantidadActual = parseInt(contador.value) || 0;
       carrito.actualizarUnidades(prod.SKU,cantidadActual,prod.title,prod.price);
       const producto = carrito.obtenerInformacionProducto(prod.SKU);
       const total = producto.quantity * prod.price;
       totalCelda.innerText = total.toFixed(2) + euro;

       actualizarInformacionCarrito();
      }

        miButtonMenos.addEventListener('click', function(){
            let cantidadActual = parseInt(contador.value) || 0;

            if (cantidadActual > 0) {
                cantidadActual--;
                contador.value = cantidadActual;
                actualizarTotal(); 
            }
        });

        miButtonMas.addEventListener('click', function () {
            let cantidadActual = parseInt(contador.value) || 0;
            cantidadActual++;
            contador.value = cantidadActual;
            actualizarTotal(); 
        });


        //  para introducir la cantidad manualmente
        contador.addEventListener('input', function () {
            let cantidadActual = parseInt(contador.value);
            if (isNaN(cantidadActual) || cantidadActual < 0) {
                contador.value = 0; // Restablecer a 0 si el valor es inválido o menor que 0
            }
            actualizarTotal(); // Actualizar el total después de modificar la cantidad manualmente
        });

        const tr = document.createElement('tr');
        tr.append(SKUcell,cantidad,precioCelda,totalCelda);

        tablaProducts.appendChild(tr);
    });
}

        function actualizarInformacionCarrito(){
         
            const infoProducto = document.getElementById("unidadesPorProducto");
            const infoPrecio = document.getElementById("unidadesPorPrecioUnitario")
            const totalFinal = document.getElementById("totalFinal");
             infoProducto.innerHTML="";
             infoPrecio.innerHTML = "";


            const carritoInfo = carrito.obtenerCarrito();
            carritoInfo.products.forEach(prod => {
                if (prod.quantity > 0){
                   const prodInfoProducto = document.createElement('p');
                   prodInfoProducto.innerText = `${prod.quantity} x ${prod.title}`;
                  infoProducto.appendChild(prodInfoProducto);

                  const prodInfoPrecio = document.createElement('p');
                  prodInfoPrecio.innerText = `${prod.quantity} x ${(prod.quantity * prod.price).toFixed(2)}` + euro;
                  infoPrecio.appendChild(prodInfoPrecio);
                }
            });

            totalFinal.innerText = `${carritoInfo.total}`+ euro;

}
  
var productos =[];
let euro = "€";
             fetch('https://jsonblob.com/api/1300409435493883904')
            .then (response => response.json())
            .then ( pro => {
                 productos = pro.products;
                 euro = pro.currency;
                 cargarTabla(productos);
             
                });


});
