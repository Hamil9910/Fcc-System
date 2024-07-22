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
import TipoExaModalsUpdate from "layouts/Services/TipoExamen/TipoExaModalsUpdate.js"

// Images
import pic from "assets/images/examen.jpg";

let tableView = [];

function TipoExamen_codigo({ image, id_tipo_examen }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        <SoftTypography variant="button" color="secondary">
          {id_tipo_examen}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function TipoExamen({nombre_tipo_examen}) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {nombre_tipo_examen}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Componente para el botón de eliminar
export function Button({ id_tipo_examen }) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function deleteTipoExamen() {
    try {
      await axios.delete(`http://localhost:5000/api/fcc/tipo_examen/${id_tipo_examen}`);
    // Recargar la página después de la eliminación exitosa
    window.location.reload();  
    } catch (error) {
      console.error("Error al eliminar el tipo de examen", error);
    }
  }

  return (
    <div>
      <IconButton onClick={() => deleteTipoExamen(id_tipo_examen)} color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={openModal} color="primary">
        <UpdateIcon />
      </IconButton>
      {/* Renderizar el modal si está abierto */}
      {modalOpen && <TipoExaModalsUpdate idTipoExamen={id_tipo_examen} onClose={closeModal} />}
    </div>
  );
}


async function table() {
  await axios.get("http://localhost:5000/api/fcc/tipo_examen").then((response) => {
    let tipos = response.data;
    tipos.map((tipo_examen) => {
      let aux = {
        codigo: <TipoExamen_codigo key={tipo_examen.id_tipo_examen} image={pic} id_tipo_examen={tipo_examen.id_tipo_examen} />,
        Tipo: <TipoExamen nombre_tipo_examen={tipo_examen.nombre_tipo_examen} />,
        accion: <Button id_tipo_examen={tipo_examen.id_tipo_examen} />,
      };
      tableView.push(aux);
    });
  });
}

let TipoExaTableData={}
table().then(
  TipoExaTableData = {
    columns: [
      { name: "codigo", align: "left" },
      { name: "Tipo", align: "left" },      
      { name: "accion", align: "center" },
    ],
  
    rows: [
      tableView
    ],
  }
);


export default TipoExaTableData;
