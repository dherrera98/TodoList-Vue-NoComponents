"use strict"

const app = new Vue({
    el:"#app",
    data:{
        titulo:"TodoList",
        tareas:[],
        inputNuevo: "",
    },
    beforeMount(){
        if(JSON.parse(localStorage.getItem("tareas") != null)){
            this.tareas = JSON.parse(localStorage.getItem("tareas"))
        }
    },
    methods:{
        eliminarTarea(key){
            this.tareas.splice(key,1)
            let tareasStorage = localStorage.setItem("tareas",JSON.stringify(this.tareas))
        },

        completarTarea(key){
            this.tareas[key].completada = !this.tareas[key].completada
            let tareasStorage = localStorage.setItem("tareas",JSON.stringify(this.tareas))
        },

        anadir(){
            if(this.inputNuevo != ""){
                this.tareas.unshift({
                    nombre: this.inputNuevo,
                    prioridad: false,
                    completada: false
                })
                this.inputNuevo = ""
            }
            let tareasStorage = localStorage.setItem("tareas",JSON.stringify(this.tareas))
        }
    },
   computed:{
       max(){
        return screen.width/17
       },
       total(){
           if(this.tareas != null){
               return this.tareas.length
           }
       },
       sinCompletar(){
           var contador = 0
           this.tareas.forEach(tarea => {
               if(tarea.completada == false){
                    contador++
               }
           });
           return contador
       },
       completada(){
            var contador = 0
            this.tareas.forEach(tarea => {
                if(tarea.completada){
                     contador++
                }
            });
            return contador
       }
   },
    filters:{
        upperCase(data){
            data.toString()
            return data[0].toUpperCase() + data.slice(1,data.length).toLowerCase()
        },
    }

})