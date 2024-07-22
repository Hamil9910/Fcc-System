// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Paciente from "layouts/Services/Paciente/index-paciente";
import Medico from "layouts/Services/Medico/index-medico";
import Enfermedad from "layouts/Services/Enfermedades/index-enfermedad";
import TipoEnfermedad from "layouts/Services/TipoEnfermedad/index-tipos-enf";
import Especialidad from "layouts/Services/Especialidades/index-especialidad";
import TipoEspecialidad from "layouts/Services/TipoEspecialidad/index-tipos-esp";
import Examen from "layouts/Services/Examenes/index-examen";
import TipoExamen from "layouts/Services/TipoExamen/index-tipos-exa";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Basket from "examples/Icons/Basket";
import Document from "examples/Icons/Document";
import CreditCard from "examples/Icons/CreditCard";
import SpaceShip from "examples/Icons/SpaceShip";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "Dashboard",
    route: "/Dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  { type: "title", title: "Personas", key: "account-pages" },
  {
    type: "collapse",
    name: "Pacientes",
    key: "Pacientes",
    //route: "/Pacientes",
    icon: <Office size="12px" />,
    //component: <Paciente />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Medico",    
    key: "Medico",    
    //route: "/Medico",
    icon: <SpaceShip size="12px" />,    
    //component: <Medico />,
    noCollapse: true,
  },
  { type: "title", title: "Clinico", key: "account-pages" },
  {
    type: "collapse",
    name: "Enfermedades",
    key: "Enfermedades",
    route: "/Enfermedades",
    icon: <Basket size="12px" />,
    component: <Enfermedad />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Especialidad",
    key: "Especialidad",
    route: "/Especialidad",
    icon: <Document size="12px" />,
    component: <Especialidad />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Examen",
    key: "Examen",
    route: "/Examen",
    icon: <CreditCard size="12px" />,
    component: <Examen />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "A.P.S",
    icon: <CreditCard size="12px" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Historias",
    icon: <CreditCard size="12px" />,
    noCollapse: true,
  },
  { type: "title", title: "Agregados", key: "account-pages" },
  {
    type: "collapse",
    name: "Tipo-Enfermedad",
    key: "Tipo-Enfermedad",
    route: "/Tipo-Enfermedad",
    icon: <Basket size="12px" />,
    component: <TipoEnfermedad />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tipo-Especialidad",
    key: "Tipo-Especialidad",
    route: "/Tipo-Especialidad",
    icon: <Document size="12px" />,
    component: <TipoEspecialidad />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tipo-Examen",
    key: "Tipo-Examen",
    route: "/Tipo-Examen",
    icon: <CreditCard size="12px" />,
    component: <TipoExamen />,
    noCollapse: true,
  },
  // Otros objetos de ruta aquí...
];

export default routes;
