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
import TipoEspTableData from "layouts/Services/TipoEspecialidad/TipoEspTableData";

// Modals
import TipoEspModalsForm from "layouts/Services/TipoEspecialidad/TipoEspModalsForm.js"
import { Button } from 'layouts/Services/TipoEspecialidad/TipoEspTableData';

function Tables() {  
  const [isLoaded,setIsLoaded]=useState(false);
  const [columnas, setColumns]=useState([]);
  const [filas,setRows]=useState([]);
  useEffect(()=>{
    const { columns: columnas, rows: filas } = TipoEspTableData;
    setColumns(columnas);
    setRows(filas[0]);
    let aux=filas[0].map((fila) =>{
      return ({
        ...fila,
        accion: <Button id_tipo_especialidad={fila.codigo.key} onOpenModal={openModal} />
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
              <SoftTypography variant="h6">Tipos de Especialidades</SoftTypography>
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
      {modalOpen && <TipoEspModalsForm onClose={closeModal} />}
      <Footer />
    </DashboardLayout>
  );
  
}

export default Tables;
