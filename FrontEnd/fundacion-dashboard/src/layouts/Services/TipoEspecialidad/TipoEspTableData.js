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
import TipoEspModalsUpdate from "layouts/Services/TipoEspecialidad/TipoEspModalsUpdate.js"

// Images
import pic from "assets/images/especialidad.jpg";

let tableView = [];

function TipoEspecialidad_codigo({ image, id_tipo_especialidad }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        <SoftTypography variant="button" color="secondary">
          {id_tipo_especialidad}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function TipoEspecialidad({ descripcion_tipo_especialidad}) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {descripcion_tipo_especialidad}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Componente para el botón de eliminar
export function Button({ id_tipo_especialidad }) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function deleteTipoEspecialidad() {
    try {
      await axios.delete(`http://localhost:5000/api/fcc/tipo_especialidad/${id_tipo_especialidad}`);
    // Recargar la página después de la eliminación exitosa
    window.location.reload();   
    } catch (error) {
      console.error("Error al eliminar el tipo de especialidad", error);
    }
  }

  return (
    <div>
      <IconButton onClick={() => deleteTipoEspecialidad(id_tipo_especialidad)} color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={openModal} color="primary">
        <UpdateIcon />
      </IconButton>
      {/* Renderizar el modal si está abierto */}
      {modalOpen && <TipoEspModalsUpdate id_tipoEspecialidad={id_tipo_especialidad} onClose={closeModal} />}
    </div>
  );
}


async function table() {
  await axios.get("http://localhost:5000/api/fcc/tipo_especialidad").then((response) => {
    let tipos = response.data;
    tipos.map((tipo_especialidad) => {
      let aux = {
        codigo: <TipoEspecialidad_codigo key={tipo_especialidad.id_tipo_especialidad} image={pic} id_tipo_especialidad={tipo_especialidad.id_tipo_especialidad} />,
        Tipo: <TipoEspecialidad descripcion_tipo_especialidad={tipo_especialidad.descripcion_tipo_especialidad} />,
        accion: <Button id_tipo_especialidad={tipo_especialidad.id_tipo_especialidad} />,
      };
      tableView.push(aux);
    });
  });
}

let TipoEspTableData={}
table().then(
  TipoEspTableData = {
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


export default TipoEspTableData;
