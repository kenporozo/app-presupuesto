const ingresos = [
    new Ingreso('Salario', 900000),
    new Ingreso('Bono Solidario', 50000)
];

const egresos = [
    new Egreso('Nueva computadora', 650000),
    new Egreso('Ropa', 35000)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for (const iterator of ingresos) {
        totalIngreso += iterator.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for (const iterator of egresos) {
        totalEgreso += iterator.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {

    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {

    return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 0 })
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (const iterator of ingresos) {
        ingresosHTML += crearIngresosHTML(iterator);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const cargarEgresos = () =>{
    let egresosHTML = '';
    for (const iterator of egresos) {
        egresosHTML += crearEgresosHTML(iterator);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearIngresosHTML = (ingreso) => {
    let ingresoHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
               <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>`;
    return ingresoHTML;
}

const crearEgresosHTML = (egreso) =>{
    let porcentaje = totalEgresos() / totalIngresos();
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
           <button class="elemento_eliminar--btn">
              <ion-icon name="close-circle-outline" onclick='eliminarEgreso(${egreso.id})'></ion-icon>
           </button>
       </div>
    </div>
    </div>`;
    return egresoHTML;
}

const eliminarIngreso = (id) =>{

    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) =>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const agregarDatos = () =>{
  let forma = document.forms['forma'];
  let tipo = forma['tipo'];
  let descripcion = forma['descripcion'];
  let valor = forma['valor'];
  if(descripcion.value !== '' && valor.value !== ''){
      if(tipo.value === 'ingreso'){
        ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
        cargarCabecero();
        cargarIngresos();
      }else{
          egresos.push(new Egreso(descripcion.value, +valor.value));
          cargarCabecero();
          cargarEgresos();
      }
  }
}