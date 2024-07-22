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

function EnfermedadesModalsForm({ onClose }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);  
  const [uploadedFiles2, setUploadedFiles2] = useState([]);  
  const [uploadedFiles3, setUploadedFiles3] = useState([]);
  const [tiposEnfermedade, setTipos] = useState([]);
  const [tipos, setTiposView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre_enfermedad: "",
    id_tipo_enfermedad: "Sin seleccion...",
    descripcion_enfermedad: "",
    documento_enfermedad: "",
  });

  const [errors, setErrors] = useState({
    nombre_enfermedad: false,
    id_tipo_enfermedad: false,
    descripcion_enfermedad: false,
    documento_enfermedad: false,
  });

  useLayoutEffect(() => {
    const tiposDeEnfermedades = async () => {
      let aux = [];
      await axios.get("http://localhost:5000/api/fcc/tipo_enfermedad").then((response) => {
        setTipos(response.data);
        tiposEnfermedade.map((tipo) => {
          aux.push(
            <MenuItem value={tipo.id_tipo_enfermedad}>{tipo.nombre_tipo_enfermedad}</MenuItem>
          );
        });
        setTiposView(aux);
      });
      setIsLoading(true);
    };
    tiposDeEnfermedades();
  }, [isLoading]);

  const handleClose = () => {
    setFormData({
      nombre_enfermedad: "",
      id_tipo_enfermedad: "",
      descripcion_enfermedad: "",
      documento_enfermedad: "",
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

  const handleFileChange = (acceptedFiles) => {
    const newFile = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }));
    setUploadedFiles(newFile);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prevState) => {
      const updatedFiles = [...prevState];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const validarDatos = () => {
    let newErrors = {
      nombre_enfermedad: !formData.nombre_enfermedad,
      id_tipo_enfermedad: formData.id_tipo_enfermedad === "Sin seleccion...",
      descripcion_enfermedad: !formData.descripcion_enfermedad,
      documento_enfermedad: uploadedFiles.length === 0,
    };
    
    setErrors(newErrors);
    
    return Object.values(newErrors).every((error) => !error);
  };

  const enviarDatos = async () => {
    if (!validarDatos()) {
      return;
    }
    const dataParaEnviar = {
      nombre_enfermedad: formData.nombre_enfermedad,
      id_tipo_enfermedad: formData.id_tipo_enfermedad,
      descripcion_enfermedad: formData.descripcion_enfermedad,
      documento_enfermedad : uploadedFiles[0].name
    };
    try {
      await axios
        .post("http://localhost:5000/api/fcc/enfermedades", dataParaEnviar)
        .then(function (response) {
          // manejar respuesta exitosa
        })
        .catch((error)=>{
          console.log(error);
        })

      // Muestra un mensaje de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Enfermedad agregada correctamente",
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
        text: "Hubo un problema al agregar la enfermedad",
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ handleFileChange });

  const acceptedFileItems = uploadedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      hello = {"Hola"}
    >
      <Box sx={style}>
        <SoftTypography id="modal-title" variant="h4" component="h2">
          AGREGAR ENFERMEDAD
        </SoftTypography>
        <InputLabel>Nombre de la Enfermedad:</InputLabel>
        <TextField
          id="nombre_enfermedad"
          name="nombre_enfermedad"
          type="text"
          fullWidth
          margin="normal"
          error={errors.nombre_enfermedad}
          helperText={errors.nombre_enfermedad ? "* Este campo es requerido." : ""}
          onChange={handleChange}
          value={formData.nombre_enfermedad}
        />
        <InputLabel id="tipo-enfermedad-label">Tipo de Enfermedad:</InputLabel>
        <Select
          labelId="tipo-enfermedad-label"
          id="id_tipo_enfermedad"
          name="id_tipo_enfermedad"
          error={errors.id_tipo_enfermedad}
          value={formData.id_tipo_enfermedad}
          onChange={handleChange}
          defaultValue="Sin seleccion..."
        >
          <MenuItem value="Sin seleccion...">Sin seleccion...</MenuItem>
          {tipos}
        </Select>        
        {errors.id_tipo_enfermedad && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            * Este campo es requerido.
          </p>
        )}
        <InputLabel style={{ marginTop: "10px" }}>Descripción de la Enfermedad:</InputLabel>
        <TextareaAutosize
          id="descripcion_enfermedad"
          name="descripcion_enfermedad"
          minRows={4}
          value={formData.descripcion_enfermedad}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        {errors.descripcion_enfermedad && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            * Este campo es requerido.
          </p>
        )}
        <InputLabel>Documento Adjunto:</InputLabel>
        <Dropzone  maxFiles={1} onDrop={handleFileChange} accept={"image/"}>
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #888",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
                cursor: "pointer",
                marginBottom: "16px",
              }}
            >
              <input {...getInputProps()} />
              <SoftTypography variant="body2" color="textSecondary">
                Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno.
              </SoftTypography>
            </Box>
          )}
        </Dropzone>
        {uploadedFiles.length > 0 && (
          <div style={{ fontSize: "12px" }}>
            {" "}
            {/* Aplica un tamaño de fuente pequeño al contenedor */}
            <h4>Archivos Subidos:</h4>
            <ul>
              {uploadedFiles.map((uploadedFiles, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {uploadedFiles.name} ({uploadedFiles.size} bytes)
                  <SoftButton
                    variant="caption"
                    color="secondary"
                    onClick={() => handleRemoveFile(index)}
                    sx={{
                      fontSize: "8px", // Tamaño de fuente del botón
                      padding: "2px 6px", // Reduce el relleno para hacer el botón más pequeño
                      lineHeight: "1", // Ajusta la altura de la línea para compactar el texto
                      minWidth: "auto", // Evita que el botón sea demasiado ancho
                    }}
                  >
                    Eliminar
                  </SoftButton>
                </li>
              ))}
            </ul>
          </div>
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

EnfermedadesModalsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EnfermedadesModalsForm;
