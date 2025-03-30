import { Box, Grid } from "@mui/material";
import { RiRefund2Fill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import GuaranteeCard from "./GuaranteeCard";

const GuaranteeGrid = () => (
  <Box sx={{ backgroundColor: "#212A18", padding: "40px 30px" }}>
    <Grid container justifyContent="center" spacing={1}>
      <Grid item>
        <GuaranteeCard
          icon={<FaShippingFast size="30px" />}
          title="Chi phí vận chuyển giá rẻ"
          subtitle="Với những đơn hàng giá trị cao"
        />
      </Grid>
      <Grid item>
        <GuaranteeCard
          icon={<RiRefund2Fill size="30px" />}
          title="Dễ dàng đổi trả"
          subtitle="Chính sách đổi trả trong 7 ngày"
        />
      </Grid>
      <Grid item>
        <GuaranteeCard
          icon={<RiVerifiedBadgeFill size="30px" />}
          title="100% Xác thực"
          subtitle="Sản phẩm xác minh rõ ràng"
        />
      </Grid>
    </Grid>
  </Box>
);

export default GuaranteeGrid;
