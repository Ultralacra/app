
import React from 'react'
import swal from 'sweetalert2'
import { useEffect } from 'react'

function FieldsEmpty() {
useEffect(() => {
    AlertFieldsEmpty()
}, [])

const AlertFieldsEmpty = () => {
    swal.fire({
        
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'error',
        title: 'Uno o mas campos del formulario estan vacios, por favor completa todos los campos',

    })
}
    return (    
        <div>
        </div>

    )

}
export default FieldsEmpty;