
// Elementos html

// init pomodoros
horasInput = document.querySelector("#horas");
minutosInput = document.querySelector("#minutos");
segundosInput = document.querySelector("#segundos");


horasView = document.querySelector(".horas-s");
minutosView = document.querySelector(".minutos-s")
segundosView= document.querySelector(".segundos-s")

btnIniciar =  document.querySelector(".btn-iniciar")
btnDetener = document.querySelector(".btn-detener")
btnReiniciar = document.querySelector(".btn-reiniciar")

contenedorTEjecucion = document.querySelector(".contenedor-tiempo_ejecucion")

ElementoContadorPomodoro = document.querySelector(".contandor-pomodoro")



//set time pomodoros
horasSet = document.querySelector("#horas-set");
minutosSet = document.querySelector("#minutos-set");
segundosSet = document.querySelector("#segundos-set");

contenedorSetTime = document.querySelector(".contenedor-tiempo_establecido")

//tiempo descanso

horasDescanso = document.querySelector("#horas-descanso");
minutosDescanso = document.querySelector("#minutos-descanso");
segundosDescanso = document.querySelector("#segundos-descanso");
intervaloDescanso = document.querySelector("#intervalo_descanso")



// add tasks

containerTasks = document.querySelector(".container-tasks");
inputAddTask = document.querySelector("#titulo-tarea");
btnAddTask =  document.querySelector(".btn-addTask");
spanNumberSetGoal = document.querySelector(".task-number-setGoal");
btnClimbGoal = document.querySelector(".btn-climbGoal");
btnLowerGoal = document.querySelector(".btn-lowerGoal");

//Variables publicas pomodoro

iniciado = false;
contandorPomodoro = 0;
contadorPomodoroRest = 0;
intervaloEnEjecucion = false;
descanso = false

TiempoBase = []

//public variables tasks

tareaSeleccionada = null;
counterGoalTask = 1;


//Valor inicial de pomodoro

TiempoPredeterminado = [ 0, 25, 0]

horasInput.textContent = TiempoPredeterminado[0];
minutosInput.textContent = TiempoPredeterminado[1];
segundosInput.textContent = TiempoPredeterminado[2];




// Sonido

let sound = new Audio("./alarma.mp3")


// Funciones

iniciarIntervalo = ()=>{

    if(parseInt(horasInput.textContent) != 0 || parseInt(minutosInput.textContent) != 0 || parseInt(segundosInput.textContent) != 0){
        btnIniciar.style.display = "none"
        btnDetener.style.display = "inline-block"
    }
   

    contenedorSetTime.style.display = "none"
    contenedorTEjecucion.style.display = "block" 


    if(parseInt(horasInput.textContent) == 0 && parseInt(minutosInput.textContent) == 0 && parseInt(segundosInput.textContent) == 0){
        console.log("Debe ingresar un valor")
    }else{
        if(iniciado == false){
            // console.log("valor - 1")
            intervalo(parseInt(horasInput.textContent),parseInt(minutosInput.textContent),parseInt(segundosInput.textContent),horasView, minutosView,segundosView)
            iniciado = true
        }else{
            // console.log("valor - 2")
            // console.log(document.querySelector(".segundos-s"))
            intervalo(parseInt(horasView.textContent),parseInt(minutosView.textContent),parseInt(segundosView.textContent),horasView, minutosView,segundosView)
        }    
    }
}


intervalo = (horas,minutos,segundos,outputHoras, outputMinutos,outputSegundos,rest)=>{
    minutosContador = minutos;
    segundosContador = segundos;
    horasContador = horas;


    var intervalorId = setInterval(() => {
       intervaloEnEjecucion = true 
        // console.log("dentro del intervalo")
        outputSegundos.textContent = segundosContador;
        outputMinutos.textContent = minutosContador;
        outputHoras.textContent = horasContador;
        if(segundosContador == 0){
            if (minutosContador != 0){
                minutosContador--;
                segundosContador = 60;
            }else if(minutosContador == 0){
                if(horasContador !=0){
                    horasContador--;
                    minutosContador = 59;
                    segundosContador = 60;

                }else{
                    console.log("El tiempo ha concluido");
                    sound.play()

                    contadorPomodoroRest++

                    if(descanso != true){
                        contandorPomodoro++
                    }
                    ElementoContadorPomodoro.textContent = contandorPomodoro
                    iniciado = false

                    clearInterval(intervalorId)
                    console.log(descanso)

                    btnIniciar.style.display = "inline-block"
                    btnIniciar.textContent = "Init"
                    
                    btnDetener.style.display = "none"

                    if(tareaSeleccionada != null ){


                        let tareaComplete = document.querySelector(".tarea-seleccionada").querySelector(".task-number-complete")

                        let tareaGoal = document.querySelector(".tarea-seleccionada").querySelector(".task-number-goal")
            
                         if(descanso != true){
                            tareaComplete.textContent = parseInt(tareaComplete.textContent) + 1;
                         }
                        
 
                         if(parseInt(tareaComplete.textContent) == parseInt(tareaGoal.textContent)){
                             document.querySelector(".tarea-seleccionada").classList.add("tarea-completada")
                         }
                     }


                    if(descanso == true){
                        //establecemos la configuracion base
                        descanso = false;
                        horasInput.textContent = TiempoBase[0];
                        minutosInput.textContent = TiempoBase[1];
                        segundosInput.textContent = TiempoBase[2];
                        contadorPomodoroRest = 0
                    }

                    if(contadorPomodoroRest == parseInt(intervaloDescanso.value)){
                        horasInput.textContent = horasDescanso.value;
                        minutosInput.textContent = minutosDescanso.value;
                        segundosInput.textContent = segundosDescanso.value;
                        contadorPomodoroRest = 0;
                        descanso = true
                        ElementoContadorPomodoro.textContent = "Break Time"

                    }


                  

                    intervaloEnEjecucion = false
                    // console.log(descanso)

                    // tiempos a mostrar

                    contenedorSetTime.style.display = "block"
                     contenedorTEjecucion.style.display = "none" 

                                    
                    horasView.textContent = horasInput.textContent;
                    minutosView.textContent = minutosInput.textContent;
                    segundosView.textContent = segundosInput.textContent;
                   
                }        
            }
            
        }
        segundosContador--;
    }, 1000);


    btnDetener.addEventListener("click",()=>{

        if(iniciado = true){
            btnIniciar.textContent = "Continue"
        }

        btnIniciar.style.display = "inline-block"
        btnDetener.style.display = "none"
        clearInterval(intervalorId)
    })
    
    btnReiniciar.addEventListener("click",()=>{
        clearInterval(intervalorId)  
        btnDetener.style.display = "none"
        btnIniciar.style.display = "inline-block"
        btnIniciar.textContent = "Init"
    })
}


// Eventos 

btnIniciar.addEventListener("click", iniciarIntervalo)


btnReiniciar.addEventListener("click",()=>{
    
    horasInput.textContent = TiempoBase[0];
    minutosInput.textContent = TiempoBase[1];
    segundosInput.textContent = TiempoBase[2];


    horasView.textContent = TiempoBase[0];
    minutosView.textContent = TiempoBase[1];
    segundosView.textContent = TiempoBase[2];

    iniciado = false
    ElementoContadorPomodoro.textContent = 0
    ContandorPomodoro = 0



})

//Tasks events

//Añadir tasks
btnAddTask.addEventListener("click",(e)=>{
    titleTask = inputAddTask.value;
    numberGoal = spanNumberSetGoal.textContent;
    numberAllTasks = containerTasks.childElementCount;
    className = `task-number-${numberAllTasks}`;

    containerTask = document.createElement("div")
    containerTask.innerHTML =  `
    <div class="container-tasks-first">
        <span id="span"><span class="tittle_task">${titleTask}</span> <input type="text" style="display: none;" class="input-modify_tittle"> <span class="task-number-complete">0</span> <span id="barra">/</span> <span class="task-number-goal">${numberGoal}</span></span>
        <div class="container-buttons">
            <button class="btn-modify-task btn btn-outline-dark"> <i class="fa-solid fa-ellipsis-vertical "></i>  </button>
            <button class="btn-select-task btn btn-outline-dark"><i class="fa-solid fa-check"></i> </button>
        </div>
    </div>
    <div class="container-task_options" style="margin: 20px 0px;">

        <div id="completed-goal_modify">
            <div id="completed-modify">
                <span>Completed</span>
                <input class="modify_completed" type="number" >
            </div>
            <div class="container-modify_goal">
                <div class="c-modify-goal_secundary">
                    <span><span id="barra-2">/</span>Goal</span>
                    <span class="modify_goal">0</span>
                </div>
                <div class="buttons_raise_lower">
                    <button class="raise_goal btn  btn-outline-dark"><i class="fas fa-arrow-up raise_goal"></i></button>
                    <button class="lower_goal lower_goal-btn btn  btn-outline-dark"><i class="fas fa-arrow-down lower_goal"></i></button>
                </div>
            </div>
        </div>

        <div id="buttons-modify">
            <button class="btn-delete_task btn btn-outline-danger">Delete</button>
            <div id="buttons-modify-success">
                <button class="btn-cancel_options btn btn-outline-dark ">Cancel</button>
                <button class="btn-accept_modify btn btn-outline-success">Accept</button>
            </div>
        </div>
    </div>
    
    `
  
  
    //add the task at the container
    containerTask.classList.add("container-task")
    containerTask.classList.add(className)
    containerTasks.appendChild(containerTask)

    //select the first tast of the container

    firstTask = containerTasks.children[0];

    if(document.querySelector(".container-tasks").childElementCount == 1){
        firstTask.classList.add("tarea-seleccionada")
    }
    
    if(tareaSeleccionada == null){
        tareaSeleccionada = true
    }
    
    //añadir limite a inputs de completados

    allInputModifyCompleted = document.querySelectorAll(".modify_completed")

    allInputModifyCompleted.forEach(InputModifyCompleted =>{
        InputModifyCompleted.addEventListener("input",(e)=>{
            let valor = parseFloat(InputModifyCompleted.value)
            if(valor < 0){
                InputModifyCompleted.value = "0"
            }

        })
    })
//fin del evento agregar tarea
})

//bottons taks events (Here I'm going to add the events at the all buttons of the tasks, putting the events in the container, for avoid the replication the events)

containerTasks = document.querySelector(".container-tasks")

containerTasks.addEventListener("click",(e)=>{
    
    //raise goal
    if (e.target.classList.contains("raise_goal")) {
        let modifyGoalTask = e.target.parentNode.parentNode.parentNode.querySelector(".modify_goal");
        let counterGoalModify = parseInt(modifyGoalTask.textContent);
        counterGoalModify = counterGoalModify + 1;
        modifyGoalTask.textContent = counterGoalModify;
    }

    //lower goal

    if (e.target.classList.contains("lower_goal")) {

        let modifyGoalTask = e.target.parentNode.parentNode.parentNode.querySelector(".modify_goal");
        if(modifyGoalTask.textContent >= 2){
            let counterGoalModify = parseInt(modifyGoalTask.textContent)
            counterGoalModify--
            modifyGoalTask.textContent = counterGoalModify
        }
        
    }

    //modify task
    if ( (e.target.classList.contains("btn-modify-task")) || (e.target.classList.contains("fa-ellipsis-vertical")) ) {

         // Coloca aquí tu código para manejar el evento
         console.log("evento modificar tarea")

         if(e.target.classList.contains("fa-ellipsis-vertical")){
            let tittleTask = e.target.parentNode.parentNode.parentNode.querySelector(".tittle_task")

            let inputModifyTask = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".input-modify_tittle")

            tittleTask.style.display = "none";
   
            inputModifyTask.value = tittleTask.textContent;
            inputModifyTask.style.display = "inline-block";
   
   
            let containerTaskOptions = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".container-task_options")
            console.log(e.target)
            containerTaskOptions.style.display = "block";
   
            let taskCompleted = e.target.parentNode.parentNode.parentNode.querySelector(".task-number-complete")
            let taskGoal = e.target.parentNode.parentNode.parentNode.querySelector(".task-number-goal")
   
            let modifyCompleted = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".modify_completed")
            let modifyGoal = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".modify_goal")

            
            modifyCompleted.value = taskCompleted.textContent
            modifyGoal.textContent = taskGoal.textContent
           
        }else{
            let tittleTask = e.target.parentNode.parentNode.querySelector(".tittle_task")

            let inputModifyTask = e.target.parentNode.parentNode.querySelector(".input-modify_tittle")

            tittleTask.style.display = "none";
   
            inputModifyTask.value = tittleTask.textContent;
            inputModifyTask.style.display = "inline-block";
   
   
            let containerTaskOptions = e.target.parentNode.parentNode.parentNode.querySelector(".container-task_options")
            console.log(e.target)
            containerTaskOptions.style.display = "block";
   
            let taskCompleted = e.target.parentNode.parentNode.querySelector(".task-number-complete")
            let taskGoal = e.target.parentNode.parentNode.querySelector(".task-number-goal")
   
            let modifyCompleted = e.target.parentNode.parentNode.parentNode.querySelector(".modify_completed")
            let modifyGoal = e.target.parentNode.parentNode.parentNode.querySelector(".modify_goal")

                
            modifyCompleted.value = taskCompleted.textContent
            modifyGoal.textContent = taskGoal.textContent
        }

    }

    //select task

    if((e.target.classList.contains("btn-select-task")) ||  (e.target.classList.contains("fa-check")) ){

        // console.log(e.target.parentNode.parentNode);
        // console.log("evento seleccionar tarea")
        
        // Elimina la clase "tarea-seleccionada" de todos los elementos con la clase "tarea-seleccionada"
        var selectedTasks = document.querySelectorAll(".tarea-seleccionada");
        selectedTasks.forEach(function(task) {
          task.classList.remove("tarea-seleccionada");
        });

        // Agrega la clase "tarea-seleccionada" al elemento clickeado
   
        // e.target.parentNode.parentNode.parentNode.classList.add("tarea-seleccionada");

        if(e.target.classList.contains("fa-check")){
            e.target.parentNode.parentNode.parentNode.parentNode.classList.add("tarea-seleccionada");
            console.log(e.target.parentNode.parentNode.parentNode.parentNode)
        }else{
            e.target.parentNode.parentNode.parentNode.classList.add("tarea-seleccionada");
        }

    }

    //accept task

    if(e.target.classList.contains("btn-accept_modify")){
     
        task_modificaciones = e.target.parentNode.parentNode.parentNode.children[0]  

        let task_tittle = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".tittle_task")
        console.log(task_tittle)
        let inputModifyTittle = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".input-modify_tittle")

        
        let modifyCompleted = e.target.parentNode.parentNode.parentNode.querySelector(".modify_completed")
        let modifyGoal = e.target.parentNode.parentNode.parentNode.querySelector(".modify_goal")

        let task_completed =  e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".task-number-complete")
        let task_goal =  e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".task-number-goal")
  
        task_tittle.style.display = "inline-block"
        inputModifyTittle.style.display = "none"

        task_tittle.textContent = inputModifyTittle.value
        task_completed.textContent = modifyCompleted.value
        task_goal.textContent = modifyGoal.textContent
  
        e.target.parentNode.parentNode.parentNode.style.display = "none"

        if(parseInt(task_completed.textContent) >= parseInt(task_goal.textContent)){
            e.target.parentNode.parentNode.parentNode.parentNode.classList.add("tarea-completada")
        }else if(parseInt(task_completed.textContent) < parseInt(task_goal.textContent)){
            if(e.target.parentNode.parentNode.parentNode.parentNode.classList.contains("tarea-completada")){
                e.target.parentNode.parentNode.parentNode.parentNode.classList.remove("tarea-completada")
            }
        }

    }

    // delete task

    if(e.target.classList.contains("btn-delete_task")){
        
        let containerTasks = document.querySelector(".container-tasks");
        let targetTask = e.target.parentNode.parentNode.parentNode

        //select if the task deleted was selected

        if(targetTask.classList.contains("tarea-seleccionada") && document.querySelector(".container-tasks").childElementCount >= 2){
            let nextTask = containerTasks.children[0];
            nextTask.classList.add("tarea-seleccionada")
        }

        //remove the task

        containerTasks.removeChild(targetTask)
        let firstTask = containerTasks.children[0];


        //Select the next task if there is only one task 

        if(document.querySelector(".container-tasks").childElementCount == 1){
            firstTask.classList.add("tarea-seleccionada")
        }

    }

    if(e.target.classList.contains("btn-cancel_options")){
        e.target.parentNode.parentNode.parentNode.style.display = "none"
        e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".input-modify_tittle").style.display = "none"
        e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".tittle_task").style.display = "inline-block"

    }

})


///////////////////////////////////////////////////////////// end tasks events

btnClimbGoal.addEventListener("click",()=>{
    counterGoalTask++
    console.log("hola")
    spanNumberSetGoal.textContent = counterGoalTask

})

btnLowerGoal.addEventListener("click",()=>{
    if(counterGoalTask == 1){
        console.log("El minimo de pomodoros es 1");

    }
    else{
        counterGoalTask--
        spanNumberSetGoal.textContent = counterGoalTask
    }
})

// Ventana Modal


//Valores de ventana Modal

horasSet.value = TiempoPredeterminado[0]
minutosSet.value = TiempoPredeterminado[1]
segundosSet.value = TiempoPredeterminado[2]

// Obtener elementos del DOM

var modal = document.getElementById("miModal");
var botonMostrar = document.getElementById("mostrarModal");
var botonCerrar = document.getElementById("cerrarModal");
var btnAcceptModal = document.querySelector(".btn-accept-modal")

botonMostrar.onclick = ()=> {
    modal.style.display = "block";
}

botonCerrar.onclick = ()=> {
    modal.style.display = "none";
    // iniciarIntervalo()
    horasInput.textContent = horasSet.value;
    minutosInput.textContent = minutosSet.value;
    segundosInput.textContent = segundosSet.value

    TiempoBase = [ horasInput.textContent,minutosInput.textContent, segundosInput.textContent]

    horasView.textContent = horasInput.textContent;
    minutosView.textContent = minutosInput.textContent;
    segundosView.textContent = segundosInput.textContent;

}

btnAcceptModal.onclick = ()=> {
    modal.style.display = "none";
    // iniciarIntervalo()
    horasInput.textContent = horasSet.value;
    minutosInput.textContent = minutosSet.value;
    segundosInput.textContent = segundosSet.value

    TiempoBase = [ horasInput.textContent,minutosInput.textContent, segundosInput.textContent]

    horasView.textContent = horasInput.textContent;
    minutosView.textContent = minutosInput.textContent;
    segundosView.textContent = segundosInput.textContent;

}


window.onclick = (event)=> {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

