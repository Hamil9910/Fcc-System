// @mui material components
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";

//React components
import PropTypes from "prop-types";
import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EspecialidadModalsUpdate(idEspecialidad,{  onClose }) {
  const [tiposEspecialidad, setTipos] = useState([]);
  const [tipos, setTiposView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre_especialidad: "",
    id_tipo_especialidad: "Sin seleccion...",
  });

  const [errors, setErrors] = useState({
    nombre_especialidad: false,
    id_tipo_especialidad: false,
  });

  useLayoutEffect(() => {
    const cargarDatosEspecialidad = async () => {
      if (idEspecialidad) {
        try {
          const respuesta = await axios.get(`http://localhost:5000/api/fcc/especialidad/${idEspecialidad.idEspecialidad}`);
          setFormData(respuesta.data);
        } catch (error) {
          console.error("Error al cargar la especialidad", error);
        }
      }
    };
    cargarDatosEspecialidad()
    .then((res)=>{
      setIsLoading(true)
    })
    const tiposDeEspecialidad = async () => {
      let aux = [];
      await axios.get("http://localhost:5000/api/fcc/tipo_especialidad").then((response) => {
        setTipos(response.data);
        tiposEspecialidad.map((tipo) => {
          aux.push(
            <MenuItem value={tipo.id_tipo_especialidad}>{tipo.descripcion_tipo_especialidad}</MenuItem>
          );
        });
        setTiposView(aux);
      });
      setIsLoading(true);
    };
    tiposDeEspecialidad();
  }, [isLoading]);

  const handleClose = () => {
    setFormData({
      nombre_especialidad: "",
      id_tipo_especialidad: "",
    });
    idEspecialidad.onClose();
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
      nombre_especialidad: !formData.nombre_especialidad,
      nombre_especialidad: !/^[A-Za-z\s]+$/.test(formData.nombre_especialidad),
      id_tipo_especialidad: formData.id_tipo_especialidad === "Sin seleccion...",
    };
    
    setErrors(newErrors);
    
    return Object.values(newErrors).every((error) => !error);
  };

  const enviarDatos = async () => {
    if (!validarDatos()) {
      return;
    }
    const dataParaEnviar = {
      nombre_especialidad: formData.nombre_especialidad,
      id_tipo_especialidad: formData.id_tipo_especialidad,
    };
    try {
      await axios
        .put(`http://localhost:5000/api/fcc/especialidad/${idEspecialidad.idEspecialidad}`, dataParaEnviar)
      // Muestra un mensaje de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Especialidad modificada correctamente",
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
        text: "Hubo un problema al modificar la especialidad",
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
          MODIFICAR EXAMEN
        </SoftTypography>
        <InputLabel>Nombre de la especialidad:</InputLabel>
        <TextField
          id="nombre_especialidad"
          name="nombre_especialidad"
          type="text"
          fullWidth
          margin="normal"
          error={errors.nombre_especialidad}
          helperText={errors.nombre_especialidad ? "* Obligatorio - Solo admite letras." : ""}
          onChange={handleChange}
          value={formData.nombre_especialidad}
        />
        <InputLabel id="tipo-especialidad-label">Tipo de Especialidad:</InputLabel>
        <Select
          labelId="tipo-especialidad-label"
          id="id_tipo_especialidad"
          name="id_tipo_especialidad"
          error={errors.id_tipo_especialidad}
          value={formData.id_tipo_especialidad}
          onChange={handleChange}
          defaultValue="Sin seleccion..."
        >
          <MenuItem value="Sin seleccion...">Sin seleccion...</MenuItem>
          {tipos}
        </Select>        
        {errors.id_tipo_especialidad && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            * Este campo es requerido.
          </p>
        )}
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

EspecialidadModalsUpdate.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EspecialidadModalsUpdate;
