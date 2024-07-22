/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Loop';
import axios from 'axios';

//Modal De Actualización
import EspecialidadModalsUpdate from "layouts/Services/Especialidades/EspecialidadModalsUpdate.js"

// Images
import pic from "assets/images/especialidad.jpg";

let tableView = [];

function Especialidad_codigo({ image, id_especialidad }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        <SoftTypography variant="caption" color="secondary">
          {id_especialidad}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Especialidad({ nombre_especialidad }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {nombre_especialidad}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Clase({ especialidad_selected }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" color="secondary">
        {especialidad_selected}
      </SoftTypography>
    </SoftBox>
  );
}

// Componente para el botón de eliminar
export function Button({ id_especialidad }) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function deleteEspecialidad() {
    try {
      await axios.delete(`http://localhost:5000/api/fcc/especialidad/${id_especialidad}`);
    // Recargar la página después de la eliminación exitosa
    window.location.reload();   
    } catch (error) {
      console.error("Error al eliminar la especialidad", error);
    }
  }

  return (
    <div>
      <IconButton onClick={() => deleteEspecialidad(id_especialidad)} color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={openModal} color="primary">
        <UpdateIcon />
      </IconButton>
      {/* Renderizar el modal si está abierto */}
      {modalOpen && <EspecialidadModalsUpdate idEspecialidad={id_especialidad} onClose={closeModal} />}
    </div>
  );
}


async function table() {
  await axios.get("http://localhost:5000/api/fcc/especialidad").then((response) => {
    let especialidades = response.data;
    especialidades.map(async (especialidad) => {
      const auxTipo= await axios.get(`http://localhost:5000/api/fcc/tipo_especialidad/${especialidad.id_tipo_especialidad}`);
      const tipoEspecialidad=auxTipo.data.descripcion_tipo_especialidad;
      console.log(tipoEspecialidad)
      let aux = {
        codigo: <Especialidad_codigo key={especialidad.id_especialidad} image={pic} id_especialidad={especialidad.id_especialidad} />,
        especialidad: <Especialidad nombre_especialidad={especialidad.nombre_especialidad} especialidad_selected={tipoEspecialidad} />,
        clase: <Clase especialidad_selected={tipoEspecialidad} />,
      };
      tableView.push(aux);
    });
  });
}

let EspecialidadTableData={}
table().then(
  EspecialidadTableData = {
    columns: [
      { name: "codigo", align: "left" },
      { name: "especialidad", align: "left" },
      { name: "clase", align: "left" },
      { name: "accion", align: "left" },
    ],
  
    rows: [
      tableView
    ],
  }
);


export default EspecialidadTableData;
