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
import ExamenModalsUpdate from "layouts/Services/Examenes/ExamenModalsUpdate.js"

// Images
import pic from "assets/images/examen.jpg";

let tableView = [];

function Examen_codigo({ image, id_examen }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        <SoftTypography variant="caption" color="secondary">
          {id_examen}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Examen({ nombre_examen, examen_selected }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {nombre_examen}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {examen_selected}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Descripcion({ descripcion_examen }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" color="text">
        {descripcion_examen}
      </SoftTypography>
    </SoftBox>
  );
}

// Componente para el botón de eliminar
export function Button({ id_examen }) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function deleteExamen() {
    try {
      await axios.delete(`http://localhost:5000/api/fcc/examen/${id_examen}`);
    // Recargar la página después de la eliminación exitosa
    window.location.reload();   
    } catch (error) {
      console.error("Error al eliminar el examen", error);
    }
  }

  return (
    <div>
      <IconButton onClick={() => deleteExamen(id_examen)} color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={openModal} color="primary">
        <UpdateIcon />
      </IconButton>
      {/* Renderizar el modal si está abierto */}
      {modalOpen && <ExamenModalsUpdate idExamen={id_examen} onClose={closeModal} />}
    </div>
  );
}


async function table() {
  await axios.get("http://localhost:5000/api/fcc/examen").then((response) => {
    let examenes = response.data;
    examenes.map(async (examen) => {
      const auxTipo= await axios.get(`http://localhost:5000/api/fcc/tipo_examen/${examen.id_tipo_examen}`);
      const tipoExamen=auxTipo.data.nombre_tipo_examen;
      let aux = {
        codigo: <Examen_codigo key={examen.id_examen} image={pic} id_examen={examen.id_examen} />,
        examen: <Examen nombre_examen={examen.nombre_examen} examen_selected={tipoExamen} />,
        descripcion: <Descripcion descripcion_examen={examen.descripcion_examen} />,
      };
      tableView.push(aux);
    });
  });
}

let ExamenTableData={}
table().then(
  ExamenTableData = {
    columns: [
      { name: "codigo", align: "left" },
      { name: "examen", align: "left" },
      { name: "descripcion", align: "left" },
      { name: "accion", align: "left" },
    ],
  
    rows: [
      tableView
    ],
  }
);


export default ExamenTableData;
