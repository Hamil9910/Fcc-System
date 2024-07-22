/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Loop";
import axios from "axios";

//Modal De Actualización
import EnfermedadesModalsUpdate from "layouts/Services/Enfermedades/EnfermedadesModalsUpdate.js";

// Images
import enf from "assets/images/enfermedad.png";

let tableView = [];

function Enfermedad_codigo({ image, id_enfermedad }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        <SoftTypography variant="caption" color="secondary">
          {id_enfermedad}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Enfermedad({ enfermedad_nombre, enfermedad_selected }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {enfermedad_nombre}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {enfermedad_selected}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Descripcion({ enfermedad_descripcion }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" color="text">
        {enfermedad_descripcion}
      </SoftTypography>
    </SoftBox>
  );
}

function Archivo({ enfermedad_file }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" color="secondary">
        {enfermedad_file}
      </SoftTypography>
    </SoftBox>
  );
}

// Componente para el botón de eliminar
export function Button({ id_enfermedad }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function deleteEnfermedad() {
    try {
      await axios.delete(`http://localhost:5000/api/fcc/enfermedades/${id_enfermedad}`);
      // Recargar la página después de la eliminación exitosa
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la enfermedad", error);
    }
  }

  return (
    <div>
      <IconButton onClick={() => deleteEnfermedad(id_enfermedad)} color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={openModal} color="primary">
        <UpdateIcon />
      </IconButton>
      {/* {modalOpen && <EnfermedadesModalsUpdate idEnfermedad={id_enfermedad} onClose={closeModal} />} */}
      {modalOpen && <EnfermedadesModalsUpdate idEnfermedad={id_enfermedad} onClose={closeModal} />}
    </div>
  );
}

async function table() {
  await axios.get("http://localhost:5000/api/fcc/enfermedades").then((response) => {
    let enfermedades = response.data;
    // console.log(enfermedades)
    enfermedades.map(async (enfermedad) => {
      const auxTipo = await axios.get(
        `http://localhost:5000/api/fcc/tipo_enfermedad/${enfermedad.id_tipo_enfermedad}`
      );
      const tipoEnfermedad = auxTipo.data.nombre_tipo_enfermedad;
      let aux = {
        codigo: (
          <Enfermedad_codigo
            key={enfermedad.id_enfermedad}
            image={enf}
            id_enfermedad={enfermedad.id_enfermedad}
          />
        ),
        enfermedad: (
          <Enfermedad
            enfermedad_nombre={enfermedad.nombre_enfermedad}
            enfermedad_selected={tipoEnfermedad}
          />
        ),
        descripcion: <Descripcion enfermedad_descripcion={enfermedad.descripcion_enfermedad} />,
        archivo: <Archivo enfermedad_file={enfermedad.documento_enfermedad} />,
      };
      tableView.push(aux);
    });
  });
}

let EnfermedadesTableData = {};
table().then(
  (EnfermedadesTableData = {
    columns: [
      { name: "codigo", align: "left" },
      { name: "enfermedad", align: "left" },
      { name: "descripcion", align: "left" },
      { name: "archivo", align: "left" },
      { name: "accion", align: "left" },
    ],

    rows: [tableView],
  })
);

export default EnfermedadesTableData;
