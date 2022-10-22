
import React from 'react'
import swal from 'sweetalert2'
import { useEffect } from 'react'



function ModalRecoveryPassword() {
useEffect(() => {
    RecoveryPassword()
}, [])

const RecoveryPassword = () => {
    swal.fire({
        
        imageUrl: 'https://indrasolutions.cl/wp-content/uploads/2022/09/Group-163.png',
        title: 'Contraseña cambiada con éxito',
        text  : "Su contraseña ha sido cambiada con éxito, haga click en el botón para continuar.",
        confirmButtonText: 'continuar',
        
    })
}
    return (    
        <div>
        </div>

    )

}
export default ModalRecoveryPassword;