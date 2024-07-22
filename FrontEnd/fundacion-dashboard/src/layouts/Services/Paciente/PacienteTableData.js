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
import PacienteModalsUpdate from "layouts/Services/Paciente/PacienteModalsUpdate.js"

// Images
import foto from "assets/images/paciente.png";

const formatearFecha = (fecha) => {
  const fechaFormateada = new Date(fecha).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return fechaFormateada;
};

let tableView = [];

function PacienteCodigo({ image, cedula_paciente }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        <SoftTypography variant="button" color="secondary">
          {cedula_paciente}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Paciente({ nombre_paciente, apellidos_paciente}) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {nombre_paciente}
        </SoftTypography>
        <SoftTypography variant="button" color="secondary">
          {apellidos_paciente}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Contacto({ direccion_paciente, telefono_paciente, email_paciente }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {direccion_paciente}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {telefono_paciente}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {email_paciente}
      </SoftTypography>
    </SoftBox>
  );
}

function Datos({ edad_paciente, fecha_paciente, genero_paciente }) {
  const fechaformateada = formatearFecha(fecha_paciente);
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {edad_paciente}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {fechaformateada}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {genero_paciente}
      </SoftTypography>
    </SoftBox>
  );
}

// Componente para el botón de eliminar
export function Button({ id_paciente }) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function deletePaciente() {
    try {
      await axios.delete(`http://localhost:5000/api/fcc/paciente/${id_paciente}`);
    // Recargar la página después de la eliminación exitosa
    window.location.reload(); 
    } catch (error) {
      console.error("Error al eliminar al paciente", error);
    }
  }

  return (
    <div>
      <IconButton onClick={() => deletePaciente(id_paciente)} color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={openModal} color="primary">
        <UpdateIcon />
      </IconButton>      
      {/* Renderizar el modal si está abierto */}
      {modalOpen && <PacienteModalsUpdate idPaciente={id_paciente} onClose={closeModal} />}
    </div>
  );
}

async function table() {
  await axios.get("http://localhost:5000/api/fcc/paciente").then((response) => {
    let pacientes = response.data;
    pacientes.map((paciente) => {
      let aux = {
        codigo: <PacienteCodigo image={foto} cedula_paciente={paciente.cedula_paciente} />,
        paciente: <Paciente nombre_paciente={paciente.nombre_paciente} apellidos_paciente={paciente.apellidos_paciente}/>,
        contacto: <Contacto direccion_paciente={paciente.direccion_paciente} telefono_paciente={paciente.telefono_paciente} email_paciente={paciente.email_paciente} />,
        datos: <Datos  edad_paciente={paciente.edad_paciente} fecha_paciente={paciente.fecha_paciente} genero_paciente={paciente.genero_paciente}/>,
        accion: <Button id_paciente={paciente.id_paciente} />,
      };
      tableView.push(aux);
    });
  });
}

let PacienteTableData={}
table().then(
  PacienteTableData = {
    columns: [
      { name: "codigo", align: "left" },
      { name: "paciente", align: "left" },
      { name: "contacto", align: "left" },
      { name: "datos", align: "center" },
      { name: "accion", align: "center" },
    ],
  
    rows: [
      tableView
    ],
  }
);

export default PacienteTableData;
