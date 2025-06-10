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

function mostrarDatos(datos) {
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
        <button onclick="AbrirModalEditar(${persona.id}, '${persona.nombre}', '${persona.apellido}', '${persona.email}', '${persona.edad}')">Editar</button>
        <button onClick= "EliminarPersona(${persona.id})">Eliminar</button>
       </td>

        </tr>

        `
    });

}

//Lamada inicial para que se carguen los datos que vienen del servidor
obtenerPersonas();

//Obtener un nuevo registro
const modal = document.getElementById("modal-agregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", () => {
    modal.showModal();
});

btnCerrar.addEventListener("click", () => {
    modal.close();
})

//Agregar un nuevo integrante desde el form
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa "submit" - Evota que el frm se envíe de golpe

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    //Validación básica
    if (!nombre || !apellido || !email || !edad) {
        alert("Complete todos los campos");
        return;
    }

    //Llamar a la API para enviar el usuario
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, email, edad })
    });

    if (respuesta.ok) {
        alert("El registro fue agregado correctamente");

        //Limpiar frm y cerrar el modal
        document.getElementById("frmAgregar").reset();
        modal.close();

        //Recargar tabla
        obtenerPersonas();
    } else {
        alert("Hubo un error al agregar");
    }


});

//Función para borrar registros

async function EliminarPersona(id) {
    const confirmacion = confirm("¿Realmente dese borrar el registro?");
    //Validamos si el user dijo sí
    if (confirmacion) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" }); // Y eso es asombroso
        //Recargamos la tabla para ver la eliminación
        obtenerPersonas();
    }
}

const modalEditar = document.getElementById("modal-editar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", () => {
    modalEditar.close(); //Cerrar modal
});

function AbrirModalEditar(id, nombre, apellido, email, edad) {
    //Se agregan los valores del registro en los input
    document.getElementById("idEditar").value = id;
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("emailEditar").value = email;
    document.getElementById("edadEditar").value = edad;
    modalEditar.showModal();

}

document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que el frm se envíe

    const id = document.getElementById("idEditar").value;
    const nombre = document.getElementById("nombreEditar").value;
    const apellido = document.getElementById("apellidoEditar").value;
    const email = document.getElementById("emailEditar").value;
    const edad = document.getElementById("edadEditar").value;

    if (!id || !nombre || !apellido || !email || !edad) {
        alert("Complete todos los campos")
        return;
    }

    //Llamada a la API
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({edad, email, nombre, apellido})
    });

    if(respuesta.ok){
        alert("Registro actualizado con éxito"); //Confirmación
        modalEditar.close(); //Cerramos el modal
        obtenerPersonas(); //Actualizamos la lista
    }
    else{
        alert("Hubo un error al actualizar");
    }

});


