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

function ExamenModalsForm({ onClose }) {
  const [tiposExamen, setTipos] = useState([]);
  const [tipos, setTiposView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre_examen: "",
    id_tipo_examen: "Sin seleccion...",
    descripcion_examen: "",
  });

  const [errors, setErrors] = useState({
    nombre_examen: false,
    id_tipo_examen: false,
    descripcion_examen: false,
  });

  useLayoutEffect(() => {
    const tiposDeExamen = async () => {
      let aux = [];
      await axios.get("http://localhost:5000/api/fcc/tipo_examen").then((response) => {
        setTipos(response.data);
        tiposExamen.map((tipo) => {
          aux.push(
            <MenuItem value={tipo.id_tipo_examen}>{tipo.nombre_tipo_examen}</MenuItem>
          );
        });
        setTiposView(aux);
      });
      setIsLoading(true);
    };
    tiposDeExamen();
  }, [isLoading]);

  const handleClose = () => {
    setFormData({
      nombre_examen: "",
      id_tipo_examen: "",
      descripcion_examen: "",
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
      nombre_examen: !formData.nombre_examen,
      nombre_examen: !/^[A-Za-z\s]+$/.test(formData.nombre_examen),
      id_tipo_examen: formData.id_tipo_examen === "Sin seleccion...",
      descripcion_examen: !formData.descripcion_examen,
    };
    
    setErrors(newErrors);
    
    return Object.values(newErrors).every((error) => !error);
  };

  const enviarDatos = async () => {
    if (!validarDatos()) {
      return;
    }
    const dataParaEnviar = {
      nombre_examen: formData.nombre_examen,
      id_tipo_examen: formData.id_tipo_examen,
      descripcion_examen: formData.descripcion_examen,
    };
    try {
      await axios
        .post("http://localhost:5000/api/fcc/examen", dataParaEnviar)
      // Muestra un mensaje de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Examen agregado correctamente",
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
        text: "Hubo un problema al agregar el Examen",
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
          AGREGAR EXAMEN
        </SoftTypography>
        <InputLabel>Nombre del examen:</InputLabel>
        <TextField
          id="nombre_examen"
          name="nombre_examen"
          type="text"
          fullWidth
          margin="normal"
          error={errors.nombre_examen}
          helperText={errors.nombre_examen ? "* Obligatorio - Solo admite letras." : ""}
          onChange={handleChange}
          value={formData.nombre_examen}
        />
        <InputLabel id="tipo-examen-label">Tipo de Examen:</InputLabel>
        <Select
          labelId="tipo-examen-label"
          id="id_tipo_examen"
          name="id_tipo_examen"
          error={errors.id_tipo_examen}
          value={formData.id_tipo_examen}
          onChange={handleChange}
          defaultValue="Sin seleccion..."
        >
          <MenuItem value="Sin seleccion...">Sin seleccion...</MenuItem>
          {tipos}
        </Select>        
        {errors.id_tipo_examen && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            * Este campo es requerido.
          </p>
        )}
        <InputLabel style={{ marginTop: "10px" }}>Descripción del Examen:</InputLabel>
        <TextareaAutosize
          id="descripcion_examen"
          name="descripcion_examen"
          minRows={4}
          value={formData.descripcion_examen}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        {errors.descripcion_examen && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            * Este campo es requerido.
          </p>
        )}
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

ExamenModalsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ExamenModalsForm;
