//URL de la API
const API_URL = "https://retoolapi.dev/I9Lsrg/data";

//Función que manda a traer el JSON
async function obtenerPersonas() {
    //Respuesta del servidor
    const res = await fetch(API_URL);//Se hace una llamada al endpoint

    //Pasamos a JSON la respuesta del servidor
    const data = await res.json(); //Esto es un JSON

    //Enviamos el JSON que nos manda la API a la función que crea la tabla en HTML
    mostrarDatos(data);
}

function mostrarDatos(datos){
    //Se llama al tbody dentro del elemetno con id "tabla"
    const tabla = document.querySelector('#tabla tbody');
    tabla.innerHTML = ''; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
        <td>${persona.id}</td>
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.email}</td>
        <td>${persona.edad}</td>
       <td>
        <button>Editar</button>
        <button>Eliminar</button>
       </td>

        </tr>

        `
    } );
    
}

//Lamada inicial para que se carguen los datos que vienen del servidor
obtenerPersonas();