
import React, { useState, useEffect } from "react";
import swal from 'sweetalert2';

function ModalEmptyFields() {
    console.log('ffffffffffffff')
    const EmptyField = () => {
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
    
    return (<div>{EmptyField()}</div>)
}
export default ModalEmptyFields;