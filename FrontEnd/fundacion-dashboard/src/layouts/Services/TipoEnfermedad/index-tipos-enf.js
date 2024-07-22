import React, { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import TipoEnfTableData from "layouts/Services/TipoEnfermedad/TipoEnfTableData";

// Modals
import TipoEnfModalsForm from "layouts/Services/TipoEnfermedad/TipoEnfModalsForm.js"
import { Button } from 'layouts/Services/TipoEnfermedad/TipoEnfTableData';

function Tables() {  
  const [isLoaded,setIsLoaded]=useState(false);
  const [columnas, setColumns]=useState([]);
  const [filas,setRows]=useState([]);
  useEffect(()=>{
    const { columns: columnas, rows: filas } = TipoEnfTableData;
    setColumns(columnas);
    setRows(filas[0]);
    let aux=filas[0].map((fila) =>{
      return ({
        ...fila,
        accion: <Button id_tipo_enfermedad={fila.codigo.key} onOpenModal={openModal} />
      })
    })
    setRows(aux);
    setIsLoaded(true);  
  },[isLoaded])
  

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
      <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Tipos de Enfermedades</SoftTypography>
              <SoftButton variant="contained" color="primary" onClick={openModal}>
                Agregar Tipo
              </SoftButton>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columnas} rows={filas} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* Renderizar el modal si está abierto */}
      {modalOpen && <TipoEnfModalsForm onClose={closeModal} />}
      <Footer />
    </DashboardLayout>
  );
  
}

export default Tables;
