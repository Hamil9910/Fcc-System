// @mui material components
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

//React components
import PropTypes from "prop-types";
import { useState, useCallback, useEffect, useLayoutEffect } from "react";

// Soft UI Dashboard React components
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

//Sweetalert components
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TipoEnfModalsForm({ onClose }) {
  const [formData, setFormData] = useState({
    nombre_tipo_enfermedad: "",
  });

  const [errors, setErrors] = useState({
    nombre_tipo_enfermedad: false,
  });

  const handleClose = () => {
    setFormData({
      nombre_tipo_enfermedad: "",
      });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validarDatos = () => {
    let newErrors = {
      nombre_tipo_enfermedad: !formData.nombre_tipo_enfermedad,
      nombre_tipo_enfermedad: !/^[A-Za-z\s]+$/.test(formData.nombre_tipo_enfermedad),
    };
    
    setErrors(newErrors);
    
    return Object.values(newErrors).every((error) => !error);
  };

  const generarIdUnico = () => {
    const aleatorio = Math.floor(Math.random() * 1000); // Generar un número aleatorio entre 0 y 999
    return `${aleatorio}`; // Formar un ID
  };

  const enviarDatos = async () => {
    if (!validarDatos()) {
      return;
    }
    const dataParaEnviar = {
      id_tipo_enfermedad : generarIdUnico(), // Genera un ID único
      nombre_tipo_enfermedad: formData.nombre_tipo_enfermedad,
    };
    try {
      await axios
        .post("http://localhost:5000/api/fcc/tipo_enfermedad", dataParaEnviar)
      // Muestra un mensaje de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Tipo de Enfermedad agregado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        // Verifica si el botón "Ok" fue presionado
        if (result.isConfirmed) {
          // Recarga la página
          location.reload();
        }
      });

      // Limpia el formulario y cierra el modal
      handleClose();
    } catch (error) {
      console.error("Error al enviar datos", error);
      // Muestra un mensaje de error
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al agregar el Tipo de Enfermedad",
        icon: "error",
        confirmButtonText: "Ok",
      }).then((result) => {
        // Verifica si el botón "Ok" fue presionado
        if (result.isConfirmed) {
          // Recarga la página
          location.reload();
        }
      });
    }
  };

  const handleSaveChanges = () => {
    enviarDatos();
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <SoftTypography id="modal-title" variant="h4" component="h2">
          AGREGAR NUEVO Tipo de Enfermedad
        </SoftTypography>
        <InputLabel>Tipo de Enfermedad:</InputLabel>
        <TextField
          id="nombre_tipo_enfermedad"
          name="nombre_tipo_enfermedad"
          type="text"
          fullWidth
          margin="normal"
          error={errors.nombre_tipo_enfermedad}
          helperText={errors.nombre_tipo_enfermedad ? "* Obligatorio - Solo admite letras." : ""}
          onChange={handleChange}
          value={formData.nombre_tipo_enfermedad}
        />    
        <SoftButton variant="contained" color="primary" onClick={handleSaveChanges}>
          Agregar
        </SoftButton>
        <SoftButton variant="contained" color="primary" onClick={handleClose}>
          Cancelar
        </SoftButton>
      </Box>
    </Modal>
  );
}

TipoEnfModalsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TipoEnfModalsForm;
