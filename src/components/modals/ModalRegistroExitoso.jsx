import React from "react";
import swal from "sweetalert2";
import { useEffect } from "react";

function RegisterSuccesfullAlert() {
  useEffect(() => {
    AlertRegister();
  }, []);

  const AlertRegister = () => {
    swal
      .fire({
        imageUrl:
          "https://indrasolutions.cl/wp-content/uploads/2022/09/Group-163.png",
        title: "¡Registro exitoso!",
        text: "Usuario registrado correctamente, haga click en el botón para continuar.",
        confirmButtonText: "continuar",
        confirmButtonColor: "#006D8E",
        showCloseButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
  };
  return <div></div>;
}
export default RegisterSuccesfullAlert;
