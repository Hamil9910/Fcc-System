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
import TipoEnfModalsUpdate from "layouts/Services/TipoEnfermedad/TipoEnfModalsUpdate.js"

// Images
import pic from "assets/images/enfermedad.png";

let tableView = [];

function TipoEnfermedad_codigo({ image, id_tipo_enfermedad }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        <SoftTypography variant="button" color="secondary">
          {id_tipo_enfermedad}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function TipoEnfermedad({ nombre_tipo_enfermedad}) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {nombre_tipo_enfermedad}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Componente para el botón de eliminar
export function Button({ id_tipo_enfermedad }) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function deleteTipoEnfermedad() {
    try {
      await axios.delete(`http://localhost:5000/api/fcc/tipo_enfermedad/${id_tipo_enfermedad}`);
    // Recargar la página después de la eliminación exitosa
    window.location.reload(); 
    } catch (error) {
      console.error("Error al eliminar el tipo de enfermedad", error);
    }
  }

  return (
    <div>
      <IconButton onClick={() => deleteTipoEnfermedad(id_tipo_enfermedad)} color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={openModal} color="primary">
        <UpdateIcon />
      </IconButton>
      {/* Renderizar el modal si está abierto */}
      {modalOpen && <TipoEnfModalsUpdate idTipoEnfermedad={id_tipo_enfermedad} onClose={closeModal} />}
    </div>
  );
}


async function table() {
  await axios.get("http://localhost:5000/api/fcc/tipo_enfermedad").then((response) => {
    let tipos = response.data;
    tipos.map((tipo_enfermedad) => {
      let aux = {
        codigo: <TipoEnfermedad_codigo key={tipo_enfermedad.id_tipo_enfermedad} image={pic} id_tipo_enfermedad={tipo_enfermedad.id_tipo_enfermedad} />,
        Tipo: <TipoEnfermedad nombre_tipo_enfermedad={tipo_enfermedad.nombre_tipo_enfermedad} />,
        accion: <Button id_tipo_enfermedad={tipo_enfermedad.id_tipo_enfermedad} />,
      };
      tableView.push(aux);
    });
  });
}

let TipoEnfTableData={}
table().then(
  TipoEnfTableData = {
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


export default TipoEnfTableData;
