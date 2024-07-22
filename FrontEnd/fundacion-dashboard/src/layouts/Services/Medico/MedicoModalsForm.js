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
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MedicoModalsForm({ onClose }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [Especialidad, setEspecialidad] = useState([]);
  const [tipos, setTiposView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombres_medico: "",
    id_especialidad: "Sin seleccion...",
    apellidos_medico: "",
    cedula_medico: "",
    titulos_medico: "",
    telefono_medico: "",
    direccion_medico: "",
    email_medico: "",
    hdv_medico: "",
    foto_medico: "",
    postgrado_medico: "",
  });

  const [errors, setErrors] = useState({
    nombres_medico: false,
    id_especialidad: false,
    apellidos_medico: false,
    cedula_medico: false,
    titulos_medico: false,
    telefono_medico: false,
    direccion_medico: false,
    email_medico: false,
    hdv_medico: false,
    foto_medico: false,
    postgrado_medico: false,
  });

  useLayoutEffect(() => {
    const EspecialidadMedicos = async () => {
      let aux = [];
      await axios.get("http://localhost:5000/api/fcc/especialidad").then((response) => {
        setEspecialidad(response.data);
        Especialidad.map((esp) => {
          aux.push(
            <MenuItem value={esp.id_especialidad}>{esp.nombre_especialidad}</MenuItem>
          );
        });
        setTiposView(aux);
      });
      setIsLoading(true);
    };
    EspecialidadMedicos();
  }, [isLoading]);

  const handleClose = () => {
    setFormData({
      nombres_medico: "",
      id_especialidad: "Sin seleccion...",
      apellidos_medico: "",
      cedula_medico: "",
      titulos_medico: "",
      telefono_medico: "",
      direccion_medico: "",
      email_medico: "",
      hdv_medico: "",
      foto_medico: "",
      postgrado_medico: "",
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
      nombres_medico: !formData.nombres_medico,      
      nombres_medico: !/^[A-Za-z\s]+$/.test(formData.nombres_medico),
      id_especialidad: formData.id_especialidad === "Sin seleccion...",
      apellidos_medico: !formData.apellidos_medico,
      apellidos_medico: !/^[A-Za-z\s]+$/.test(formData.apellidos_medico),
      cedula_medico: !formData.cedula_medico,      
      cedula_medico: !/^\d{10}$/.test(formData.cedula_medico),
      cedula_medico: !validarCedula(formData.cedula_medico),
      titulos_medico: !formData.titulos_medico,
      telefono_medico: !formData.telefono_medico,
      telefono_medico: !/^\d+$/.test(formData.telefono_medico),
      direccion_medico: !formData.direccion_medico,
      email_medico: !formData.email_medico,
      hdv_medico: uploadedFiles.length === 0,
      foto_medico: uploadedFiles.length === 0,
      postgrado_medico: uploadedFiles.length === 0,
    };    
    setErrors(newErrors);    
    return Object.values(newErrors).every((error) => !error);
  };

  const enviarDatos = async () => {
    if (!validarDatos()) {
      return;
    }
    const dataParaEnviar = {
      nombres_medico: formData.nombres_medico,
      id_especialidad: formData.id_especialidad,
      apellidos_medico: formData.apellidos_medico,
      cedula_medico: formData.cedula_medico,
      titulos_medico: formData.titulos_medico,
      telefono_medico: formData.telefono_medico,
      direccion_medico: formData.direccion_medico,
      email_medico: formData.email_medico,
      hdv_medico: uploadedFiles[0].name,
      foto_medico: uploadedFiles[0].name,
      postgrado_medico: uploadedFiles[0].name,
    };
    var toast = {
      title: "",
      text: "",
      icon: "",
    };
    await axios
      .post("http://localhost:5000/api/fcc/medicos"
      , dataParaEnviar
      )
      // Muestra un mensaje de éxito
      .then(function (response) {
        toast.title = "¡Éxito!";
        toast.text = "Médico creado correctamente";
        toast.icon = "success";
      })
      // Muestra un mensaje de error
      .catch((error) => {
        toast.title = "¡Error!";
        toast.text = "Hubo un problema al crear un Médico";
        toast.icon = "error";
      })
      .finally(() => {
        Swal.fire({
          ...toast,
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
      });
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
      aria-describedby="modal-description">
      <Box sx={style}>
        <SoftTypography id="modal-title" variant="h4" component="h2">
          AGREGAR NUEVO MÉDICO
        </SoftTypography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel>Nombre del Médico:</InputLabel>
            <TextField
              id="nombres_medico"
              name="nombres_medico"
              type="text"
              fullWidth
              margin="normal"
              error={errors.nombres_medico}
              helperText={errors.nombres_medico ? "* Obligatorio - Solo letras." : ""}
              onChange={handleChange}
              value={formData.nombres_medico}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Apellido del Médico:</InputLabel>
            <TextField
              id="apellidos_medico"
              name="apellidos_medico"
              type="text"
              fullWidth
              margin="normal"
              error={errors.apellidos_medico}
              helperText={errors.apellidos_medico ? "* Obligatorio - Solo letras." : ""}
              onChange={handleChange}
              value={formData.apellidos_medico}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel>Cedula:</InputLabel>
            <TextField
              id="cedula_medico"
              name="cedula_medico"
              type="text"
              fullWidth
              margin="normal"
              error={errors.cedula_medico}
              helperText={errors.cedula_medico ? "* Obligatorio - Solo números." : ""}
              onChange={handleChange}
              value={formData.cedula_medico}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Teléfono:</InputLabel>
            <TextField
              id="telefono_medico"
              name="telefono_medico"
              type="text"
              fullWidth
              margin="normal"
              error={errors.telefono_medico}
              helperText={errors.telefono_medico ? "* Obligatorio - Solo números." : ""}
              onChange={handleChange}
              value={formData.telefono_medico}
            />
          </Grid>
        </Grid>        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel>Títulos Médicos:</InputLabel>
            <TextField
              id="titulos_medico"
              name="titulos_medico"
              type="text"
              fullWidth
              margin="normal"
              error={errors.titulos_medico}
              helperText={errors.titulos_medico ? "* Obligatorio - Solo letras." : ""}
              onChange={handleChange}
              value={formData.titulos_medico}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="especialidad">Especialidad Médica:</InputLabel>
            <Select
              labelId="especialidad"
              id="id_especialidad"
              name="id_especialidad"
              error={errors.id_especialidad}
              value={formData.id_especialidad}              
              style={{ marginTop: "1rem" }}
              onChange={handleChange}
              defaultValue="Sin seleccion...">
              <MenuItem value="Sin seleccion...">Sin seleccion...</MenuItem>
              {tipos}
            </Select>        
              {errors.id_especialidad && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  * Este campo es requerido.
                </p>
              )}
          </Grid>
        </Grid>
        <InputLabel>Hoja de Vida:</InputLabel>
        <Dropzone  maxFiles={1} onDrop={handleFileChange}>
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #888",
                borderRadius: "4px",
                padding: "4px",
                textAlign: "center",
                cursor: "pointer",
                marginBottom: "16px",
              }}
            >
              <input {...getInputProps()} />
              <SoftTypography variant="body2" color="textSecondary">
                Arrastra y suelta un archivo aquí, o selecciona uno.
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
        <InputLabel>Fotografia Médico:</InputLabel>
        <Dropzone  maxFiles={1} onDrop={handleFileChange}>
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #888",
                borderRadius: "4px",
                padding: "4px",
                textAlign: "center",
                cursor: "pointer",
                marginBottom: "16px",
              }}
            >
              <input {...getInputProps()} />
              <SoftTypography variant="body2" color="textSecondary">
                Arrastra y suelta un archivo aquí, o selecciona uno.
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
        <InputLabel>PostGrado Médico:</InputLabel>
        <Dropzone  maxFiles={1} onDrop={handleFileChange}>
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #888",
                borderRadius: "4px",
                padding: "4px",
                textAlign: "center",
                cursor: "pointer",
                marginBottom: "16px",
              }}
            >
              <input {...getInputProps()} />
              <SoftTypography variant="body2" color="textSecondary">
                Arrastra y suelta un archivo aquí, o selecciona uno.
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

MedicoModalsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MedicoModalsForm;
