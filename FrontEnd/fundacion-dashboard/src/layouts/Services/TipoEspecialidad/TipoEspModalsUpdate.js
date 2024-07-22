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

function TipoEspModalsUpdate(id_tipoEspecialidad,{  onClose }) {  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    descripcion_tipo_especialidad: "",
  });

  const [errors, setErrors] = useState({
    descripcion_tipo_especialidad: false,
  });

  useLayoutEffect(() => {
    const cargarDatosPaciente = async () => {
      if (id_tipoEspecialidad) {
        try {
          const respuesta = await axios.get(`http://localhost:5000/api/fcc/tipo_especialidad/${id_tipoEspecialidad.id_tipoEspecialidad}`);
          setFormData(respuesta.data);
        } catch (error) {
          console.error("Error al cargar el tipo de especialidad", error);
        }
      }
    };
    cargarDatosPaciente()
    .then((res)=>{
      setIsLoading(true)
    })
  }, [isLoading]);

  const handleClose = () => {
    setFormData({
      descripcion_tipo_especialidad: "",
      });
      id_tipoEspecialidad.onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validarDatos = () => {
    if (!validarDatos()) {
      return;
    }
    let newErrors = {
      descripcion_tipo_especialidad: !formData.descripcion_tipo_especialidad,
      descripcion_tipo_especialidad: !/^[A-Za-z\s]+$/.test(formData.descripcion_tipo_especialidad),
    };
    
    setErrors(newErrors);
    
    return Object.values(newErrors).every((error) => !error);
  };

  const enviarDatos = async () => {
    const dataParaEnviar = {
      descripcion_tipo_especialidad: formData.descripcion_tipo_especialidad,
    };
    try {
      await axios
        .put(`http://localhost:5000/api/fcc/tipo_especialidad/${id_tipoEspecialidad.id_tipoEspecialidad}`, dataParaEnviar)
      // Muestra un mensaje de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Tipo de Especialidad modificado correctamente",
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
        text: "Hubo un problema al modificar el Tipo de Especialidad",
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
          MODIFICAR Tipo de Especialidad
        </SoftTypography>
        <InputLabel>Tipo de Especialidad:</InputLabel>
        <TextField
          id="descripcion_tipo_especialidad"
          name="descripcion_tipo_especialidad"
          type="text"
          fullWidth
          margin="normal"
          error={errors.descripcion_tipo_especialidad}
          helperText={errors.descripcion_tipo_especialidad ? "* Obligatorio - Solo admite letras." : ""}
          onChange={handleChange}
          value={formData.descripcion_tipo_especialidad}
        />    
        <SoftButton variant="contained" color="primary" onClick={handleSaveChanges}>
          Modificar
        </SoftButton>
        <SoftButton variant="contained" color="primary" onClick={handleClose}>
          Cancelar
        </SoftButton>
      </Box>
    </Modal>
  );
}

TipoEspModalsUpdate.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TipoEspModalsUpdate;
