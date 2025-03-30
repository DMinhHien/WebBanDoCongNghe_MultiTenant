import { Paper, Box, Typography } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const GuaranteeCard = ({ icon, title, subtitle }: Props) => (
  <Paper
    elevation={0}
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "20px",
      borderRadius: "50px",
      backgroundColor: "#D39D55",
      marginX: "30px",
      width: "350px",
    }}
  >
    <Box
      sx={{
        width: "50px",
        height: "50px",
        backgroundColor: "#E9E5D9",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "15px",
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h6" fontWeight="bold" color="#FEFDF8">
        {title}
      </Typography>
      <Typography variant="body2" color="#FEFDF8">
        {subtitle}
      </Typography>
    </Box>
  </Paper>
);

export default GuaranteeCard;
