// @mui material components
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Grid from '@mui/material/Grid';
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

function PacienteModalsForm({ onClose }) {
  const [formData, setFormData] = useState({
    nombre_paciente: "",
    apellidos_paciente: "",
    cedula_paciente: "",
    direccion_paciente: "",
    telefono_paciente: "",
    email_paciente: "",
    redes_paciente: "",
    edad_paciente: "",
    fecha_paciente: "",
    genero_paciente: "Sin seleccion...",

  });

  const [errors, setErrors] = useState({
    nombre_paciente: false,
    apellidos_paciente: false,
    cedula_paciente: false,
    direccion_paciente: false,
    telefono_paciente: false,
    email_paciente: false,
    edad_paciente: false,
    fecha_paciente: false,
    genero_paciente: false,
  });

  const handleClose = () => {
    setFormData({
        nombre_paciente: "",
        apellidos_paciente: "",
        cedula_paciente: "",
        direccion_paciente: "",
        telefono_paciente: "",
        email_paciente: "",
        redes_paciente: "",
        edad_paciente: "",
        fecha_paciente: "",
        genero_paciente: "",
    
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

  function validarCedula(cedula) {
    // Verificar que la cédula tenga 10 dígitos
    if (cedula.length !== 10) {
        return false;
    }

    // Verificar que los dos primeros dígitos estén en el rango correcto
    var provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 0 || provincia > 24) {
        return false;
    }

    // Verificar que el tercer dígito sea menor a 6
    var tercerDigito = parseInt(cedula.charAt(2), 10);
    if (tercerDigito >= 6) {
        return false;
    }

    // Calcular el dígito verificador
    var coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    var total = 0;
    for (var i = 0; i < coeficientes.length; i++) {
        var digito = parseInt(cedula.charAt(i), 10);
        var producto = digito * coeficientes[i];
        total += producto >= 10 ? producto - 9 : producto;
    }
    var modulo = total % 10;
    var digitoVerificador = modulo === 0 ? 0 : 10 - modulo;

    // Comparar el dígito verificador calculado con el de la cédula
    var ultimoDigito = parseInt(cedula.charAt(9), 10);
    return digitoVerificador === ultimoDigito;
}

const validarDatos = () => {
  let newErrors = {
    nombre_paciente: !formData.nombre_paciente ,
    nombre_paciente: !/^[A-Za-z\s]+$/.test(formData.nombre_paciente),
    apellidos_paciente: !formData.apellidos_paciente,      
    apellidos_paciente: !/^[A-Za-z\s]+$/.test(formData.apellidos_paciente),
    cedula_paciente: !formData.cedula_paciente,
    cedula_paciente: !/^\d{10}$/.test(formData.cedula_paciente),
    cedula_paciente: !validarCedula(formData.cedula_paciente),
    direccion_paciente: !formData.direccion_paciente,
    telefono_paciente: !formData.telefono_paciente,      
    telefono_paciente: !/^\d+$/.test(formData.telefono_paciente),
    email_paciente: !formData.email_paciente,
    edad_paciente: !formData.edad_paciente,      
    edad_paciente: isNaN(formData.edad_paciente) && (new Date().getFullYear() - new Date(formData.fecha_paciente).getFullYear()) < formData.edad_paciente,      
    edad_paciente: (new Date().getFullYear() - new Date(formData.fecha_paciente).getFullYear()) < formData.edad_paciente,
    fecha_paciente: !formData.fecha_paciente,      
    fecha_paciente: new Date(formData.fecha_paciente).getFullYear() > 2023,
    genero_paciente: !formData.genero_paciente === "Sin seleccion...",
};
    
    setErrors(newErrors);
    
    return Object.values(newErrors).every((error) => !error);
  };

  const enviarDatos = async () => {
    if (!validarDatos()) {
      return;
    }
    const dataParaEnviar = {
      nombre_paciente: formData.nombre_paciente,
      apellidos_paciente: formData.apellidos_paciente,
      cedula_paciente: formData.cedula_paciente,
      direccion_paciente: formData.direccion_paciente,
      telefono_paciente: formData.telefono_paciente,
      email_paciente: formData.email_paciente,
      fecha_paciente: formData.fecha_paciente,
      edad_paciente: formData.edad_paciente,
      genero_paciente: formData.genero_paciente,
    };
    console.log(dataParaEnviar);
    try {
      await axios
        .post("http://localhost:5000/api/fcc/paciente", dataParaEnviar)
        .then(function (response) {
          // manejar respuesta exitosa
          console.log(response.data);
        });

      // Muestra un mensaje de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Paciente agregado correctamente",
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
        text: "Hubo un problema al agregar al Paciente",
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
          AGREGAR NUEVO PACIENTE
        </SoftTypography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel>Nombre del Paciente</InputLabel>
            <TextField
              id="nombre_paciente"
              name="nombre_paciente"
              type="text"
              fullWidth
              margin="normal"
              error={errors.nombre_paciente}
              helperText={errors.nombre_paciente ? "* Obligatorio - Solo admite letras." : ""}
              onChange={handleChange}
              value={formData.nombre_paciente}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Apellidos del Paciente:</InputLabel>
            <TextField
              id="apellidos_paciente"
              name="apellidos_paciente"
              type="text"
              fullWidth
              margin="normal"
              error={errors.apellidos_paciente}
              helperText={errors.apellidos_paciente ? "* Obligatorio - Solo admite letras." : ""}
              onChange={handleChange}
              value={formData.apellidos_paciente}
            />
          </Grid>
        </Grid>
        <InputLabel>Cedula del Paciente:</InputLabel>
        <TextField
          id="cedula_paciente"
          name="cedula_paciente"
          type="text"
          fullWidth
          margin="normal"
          error={errors.cedula_paciente}
          helperText={errors.cedula_paciente ? "* Obligatorio - Cedula Inválida." : ""}
          onChange={handleChange}
          value={formData.cedula_paciente}
        />
        <InputLabel>Dirección del Paciente:</InputLabel>
        <TextField
          id="direccion_paciente"
          name="direccion_paciente"
          type="text"
          fullWidth
          margin="normal"
          error={errors.direccion_paciente}
          helperText={errors.direccion_paciente ? "* Este campo es requerido." : ""}
          onChange={handleChange}
          value={formData.direccion_paciente}
        />
        <InputLabel>Correo del Paciente:</InputLabel>
        <TextField
          id="email_paciente"
          name="email_paciente"
          type="text"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.email_paciente}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}> 
            <InputLabel>Teléfono del Paciente:</InputLabel>
            <TextField
              id="telefono_paciente"
              name="telefono_paciente"
              type="text"
              fullWidth
              margin="normal"
              error={errors.telefono_paciente}
              helperText={errors.telefono_paciente ? "* Obligatorio - Solo admite números." : ""}
              onChange={handleChange}
              value={formData.telefono_paciente}
            />
          </Grid>
          <Grid item xs={6}>       
          <InputLabel>Fecha de nacimiento:</InputLabel>
            <TextField
              id="fecha_paciente"
              name="fecha_paciente"
              type="date"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={errors.fecha_paciente}
              helperText={errors.fecha_paciente ? "* Obligatorio - Fecha inválida" : ""}
              value={formData.fecha_paciente.substring(0,10)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>        
        <Grid container spacing={2}>
          <Grid item xs={6}> 
            <InputLabel>Edad del Paciente:</InputLabel>
            <TextField
              id="edad_paciente"
              name="edad_paciente"
              type="text"
              fullWidth
              margin="normal"
              error={errors.edad_paciente}
              helperText={errors.edad_paciente ? "* Obligatorio - Solo admite números." : ""}
              onChange={handleChange}
              value={formData.edad_paciente}
            />
          </Grid>
          <Grid item xs={6}>       
            <InputLabel id="genero_paciente">Genero del Paciente: </InputLabel>
            <Select
              labelId="genero_paciente"
              id="genero_paciente"
              name="genero_paciente"
              error={errors.genero_paciente}
              value={formData.genero_paciente}
              onChange={handleChange}
              style={{ marginTop: "1rem" }}
              defaultValue="Sin seleccion...">
              <MenuItem value="Sin seleccion...">Sin seleccion...</MenuItem>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Femenino">Femenino</MenuItem>
            </Select>
            {errors.genero_paciente && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                * Este campo es requerido.
              </p>
            )}    
          </Grid>
        </Grid>             
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

PacienteModalsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PacienteModalsForm;
