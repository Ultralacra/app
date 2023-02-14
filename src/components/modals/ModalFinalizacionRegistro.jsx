
import React from 'react'
import swal from 'sweetalert2'
import { useEffect } from 'react'



function ModalFinalizacionRegistro() {
useEffect(() => {
    AlertRegister()
}, [])

const AlertRegister = () => {
    swal.fire({
        
        imageUrl: 'https://indrasolutions.cl/wp-content/uploads/2022/09/Group-163.png',
        title: '¡Registro exitoso!',
        text  : "Usuario registrado correctamente, para visualizar sus credenciales debe dirigirse a la sección de 'Integraciones'",
        confirmButtonText: 'continuar',
        confirmButtonColor: '#006D8E',
        showCloseButton: true,
    
    })
}
    return (    
        <div>
        </div>

    )

}
export default ModalFinalizacionRegistro;