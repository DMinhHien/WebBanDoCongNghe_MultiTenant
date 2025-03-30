import { Box, Divider } from "@mui/material";
import Vision from "./Vision";
import Offer from "./Offer";
import Goal from "./Goal";

const DividerSection = () => (
    <Divider sx={{ width: "80%", borderBottomWidth: 2, marginY: 10 }} />
  );

const About = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Vision />
      <DividerSection />
      <Offer />
      <DividerSection />
      <Goal />
    </Box>
  );
  
  export default About;