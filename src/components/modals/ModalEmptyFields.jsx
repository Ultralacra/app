
import React, { useState, useEffect } from "react";
import swal from 'sweetalert2'


// eslint-disable-next-line react-hooks/rules-of-hooks

function ModalEmptyFields() {

const EmptyField = () => {
    console.log('ffffffffff')
    swal.fire({
        
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: 'error',
        title: 'Debe completar todos los campos',

    })
}
    return (    
        <div>
        </div>
    )

}
export default ModalEmptyFields;