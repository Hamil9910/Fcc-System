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
import MedicoModalsUpdate from "layouts/Services/Medico/MedicoModalsUpdate.js"

// Images
import pic from "assets/images/medico.png";

let tableView = [];

function Medico_codigo({ image, cedula_medico }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        <SoftTypography variant="button" color="secondary">
          {cedula_medico}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Medico({ nombres_medico, apellidos_medico, id_especialidad}) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {nombres_medico}
        </SoftTypography>
        <SoftTypography variant="button" color="secondary">
          {apellidos_medico}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {id_especialidad}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Contacto({ direccion_medico, telefono_medico, email_medico }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {direccion_medico}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {telefono_medico}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {email_medico}
      </SoftTypography>
    </SoftBox>
  );
}


function Documentos({titulos_medico, hdv_medico, foto_medico, postgrado_medico }) {
  const fechaformateada = formatearFecha(fecha_paciente);
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {titulos_medico}
      </SoftTypography>
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {hdv_medico}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {foto_medico}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {postgrado_medico}
      </SoftTypography>
    </SoftBox>
  );
}

// Componente para el botón de eliminar
export function Button({ id_medico }) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function deleteMedico() {
    try {
      await axios.delete(`http://localhost:5000/api/fcc/medicos/${id_medico}`);
    // Recargar la página después de la eliminación exitosa
    window.location.reload();   
    } catch (error) {
      console.error("Error al eliminar este Médico", error);
    }
  }

  return (
    <div>
      <IconButton onClick={() => deleteMedico(id_medico)} color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={openModal} color="primary">
        <UpdateIcon />
      </IconButton>
      {/* Renderizar el modal si está abierto */}
      {modalOpen && <MedicoModalsUpdate idMedico={id_medico} onClose={closeModal} />}
    </div>
  );
}


async function table() {
  await axios.get("http://localhost:5000/api/fcc/medicos").then((response) => {
    let medicos = response.data;
    medicos.map(async (medico) => {
      const auxEsp= await axios.get(`http://localhost:5000/api/fcc/especialidad/${medico.id_especialidad}`);
      const especialidad=auxEsp.data.nombre_especialidad;
      let aux = {
        codigo: <Medico_codigo key={medico.id_medico} image={pic} id_medico={medico.id_medico} />,
        medico: <Medico nombres_medico={medico.nombres_medico} apellidos_medico={medico.apellidos_medico} id_especialidad={especialidad} />,
        contacto: <Contacto  direccion_medico={medico.direccion_medico} telefono_medico={medico.telefono_medico} email_medico={medico.email_medico} />,        
        documentos: <Documentos  hdv_medico={medico.hdv_medico} foto_medico={medico.foto_medico} postgrado_medico={medico.postgrado_medico} />,
      };
      tableView.push(aux);
    });
  });
}

let MedicoTableData={}
table().then(
  MedicoTableData = {
    columns: [
      { name: "codigo", align: "left" },
      { name: "medico", align: "left" },
      { name: "contacto", align: "left" },
      { name: "documentos", align: "left" },
      { name: "accion", align: "left" },
    ],  
    rows: [
      tableView
    ],
  }
);


export default MedicoTableData;
