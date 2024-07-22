// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import personal from "assets/images/illustrations/dashboard-fundacion-v1.png";

function Administracion() {
  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography variant="body2" color="text" fontWeight="medium">
                  Administración - Fundación Con Cristo
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                Dashboard para Personal
              </SoftTypography>
              <SoftBox mb={6}>
                <SoftTypography variant="body2" color="text">
                Herramienta de gestión de datos médicos pensada especialmente para los trabajadores de la Fundación con Cristo, 
                facilitando la administración de información de pacientes de manera sencilla y efectiva.
                </SoftTypography>
              </SoftBox>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                color="text"
                fontWeight="medium"
                sx={{
                  mt: "auto",
                  mr: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",

                  "& .material-icons-round": {
                    fontSize: "1.125rem",
                    transform: `translate(2px, -0.5px)`,
                    transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                  },

                  "&:hover .material-icons-round, &:focus  .material-icons-round": {
                    transform: `translate(6px, -0.5px)`,
                  },
                }}
              >
                Empecemos
                <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }}>
            <SoftBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="info"
              borderRadius="lg"
              variant="gradient"
            >
              <SoftBox
                component="img"
                src={wavesWhite}
                alt="waves"
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              <SoftBox component="img" src={personal} alt="rocket" width="100%" pt={0} />
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default Administracion;
