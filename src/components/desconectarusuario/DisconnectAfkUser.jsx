import React from 'react'

export const DisconnectAfkUser = () => {

    let timer;

    document.addEventListener('mousemove', function() {
        // Reiniciar el temporizador
        clearTimeout(timer);
        
        // Establecer el temporizador de 5 segundos
        timer = setTimeout(function() {
          // Llamar a la función para desconectar al usuario
          desconectarUsuario();
        }, 15000);
      });

      function desconectarUsuario() {
        // Cerrar sesión del usuario o redirigirlo a la página de inicio de sesión
        alert('Se ha cerrado su sesión debido a inactividad.');
        // Cerrar sesión de forma programática
        window.location = "/login";
        console.log('Se ha cerrado su sesión debido a inactividad.');
      }

  return (
    <div>


    </div>
  )
}

export default DisconnectAfkUser;
