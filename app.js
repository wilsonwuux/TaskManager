// tomar encuenta 
// CLASES
// MODELO DE DATOS PERSONA 
// UI MANIPULACION DEL DOM 
// LOCALSTORAGE DATOS

class Task {
    //modelo de objeto libro para localstorage 
    constructor(actividad,lugar,description,id)
{
    // referncia.parametro = parametro
    this.actividad=actividad,
    this.lugar=lugar,
    this.description=description,
    this.id=id
}
//
}
// manejar interface grafica DOM 
class  Ui{
    // no es instanciable uso estatic 
    // mostrar dentro de la interface grafica table 
    static mostrarTareas(){
        let tareas = Datos.traerTareas();
        tareas.forEach((tarea)=>Ui.agregarTareaLista(tarea))
    }
    // agraga libro a la interfas obtiene del valor libro 
    static agregarTareaLista(tarea){
        const lista = document.querySelector('#tarea-list')
        const filas=document.createElement('tr');
        filas.innerHTML=`
            <td>${tarea.actividad}</td>
             <td>${tarea.lugar}</td>
              <td>${tarea.description}</td>
              <td>${tarea.id}</td>
               <td> <a href="#" class="btn btn-danger btn-sm delete">X</a></td>`

               lista.appendChild(filas)
    }
    
    static eliminarTarea(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            Ui.mostrarAlerta('ACTIVIDAD TERMINADA','secondary')
        }
    }
    //mensaje para mostrar en la infaz grafica 
    static mostrarAlerta(mensaje, className){
        const div = document.createElement('div')
        div.className=`text-uppercase text-center alert alert-${className}`;
        div.appendChild(document.createTextNode(mensaje));
        const container = document.querySelector('.container');
        const divColla =document.querySelector('#newAct')
        const btnColla =document.querySelector('#btnCollapse')
        const form = document.querySelector('#tarea-form')
        // ubicar la alerta en el centro
        // el contenedor inserta el div antes de el form 
        container.insertBefore(div,btnColla,divColla,form)
        setTimeout(()=>document.querySelector('.alert').remove(),3000)
    }

    // limpiar los labes o inpputs 
    static limpiarCampos(){
        document.querySelector('#actividad').value=''
         document.querySelector('#lugar').value=''
          document.querySelector('#description').value=''
    }
}

class Datos{
    //consulta a local storage si existen libro 
    //retorna arreglo con los mismo caso contrario
    //retorna un arreglo vacio 
    static traerTareas(){
        let tareas
        // pregunta exite libros retorna vacio sino convienrte json todo el arreglo
        if(localStorage.getItem('tareas') === null){
            tareas=[];
        }else{
            tareas=JSON.parse(localStorage.getItem('tareas'))
        }
        return tareas;
    }
    //agragar elemento a localstorage
    static agregarUntarea(tarea){
        // obeter arreglo del metodo superior
        const tareas = Datos.traerTareas()
        tareas.push(tarea)
        let resultado = tareas.map(a => a.id +=1)
        localStorage.setItem('tareas',JSON.stringify(tareas));
    }
    // eliminar mediante un codigo unico 
    static removerTarea(id){
        const tareas = Datos.traerTareas()

        tareas.forEach((tarea,index)=>{
            if(tarea.id == id){
                tareas.splice(index,1)
            }
        });
        localStorage.setItem('tareas',JSON.stringify(tareas))
    }
}

//mostar datos de localstorage al iniciar pagina 
document.addEventListener('DOMContentLoaded',Ui.mostrarTareas())

//control de evento submit que no recargue la pag
document.querySelector('#tarea-form').addEventListener('submit',(e)=>{
   e.preventDefault()
    const actividad = document.querySelector('#actividad').value;
    const lugar = document.querySelector('#lugar').value;
    const description = document.querySelector('#description').value;
    const id=0;
    if(actividad ===''&& lugar===''&& description===''){ 
        Ui.mostrarAlerta('COMPLETE LOS CAMPOS','danger')
        }else if(actividad ===''){
    //mostar mensaje de clase ui 
    Ui.mostrarAlerta('complete campo ACTIVIDAD','danger')
    }else if(lugar===''){ 
    Ui.mostrarAlerta('complete campo LUGAR','danger')
    }else if(description===''){ 
    Ui.mostrarAlerta('complete campo DESCRIPCION','danger')
    }else{
        // ya validado ubica informacion en la clase libro 
        const tarea = new Task(actividad,lugar,description,id);
        Datos.agregarUntarea(tarea)

        Ui.agregarTareaLista(tarea)
        Ui.mostrarAlerta('ACTIVIDAD AGREGADA','success')
        Ui.limpiarCampos()
        location.reload()
    }
})

document.querySelector('#tarea-list').addEventListener('click',(e)=>{
   
    Ui.eliminarTarea(e.target)
    Datos.removerTarea(e.target.parentElement.previousElementSibling.textContent)
   
})