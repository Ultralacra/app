import React from "react";
import swal from "sweetalert2";
import { useEffect } from "react";

function ModalRecoveryPassword() {
  useEffect(() => {
    RecoveryPassword();
  }, []);

  const RecoveryPassword = () => {
    swal
      .fire({
        imageUrl:
          "http://valinkgroup.com/wp-content/uploads/2022/12/Group-163.webp",
        title: "Contraseña cambiada con éxito",
        text: "Su contraseña ha sido cambiada con éxito, haga click en el botón para continuar.",
        confirmButtonText: "continuar",
        confirmButtonColor: "#ffb200",
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
  };
  return <div></div>;
}
export default ModalRecoveryPassword;
