import { Box, Grid, Typography } from "@mui/material";
import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";
import {Comment} from "../../../data/comment"
import { useEffect, useState } from "react";
import {fetchComments} from "../../../services/reviewService"
interface Props {
  productId: string;
}

const Reviews = ({ productId }: Props) => {
  const [reviews, setReviews] = useState<Comment[]>([]);

  useEffect(() => {
    // Fetch comments when productId changes
    fetchComments(productId).then((data) => {
      const updatedComments = data.map((comment) => ({
        ...comment,
        productId, // Gắn productId vào mỗi comment
      }));
      setReviews(updatedComments);
    });
  }, [productId]); 

  return (
    <Box width="90%" margin="0 auto">
      <Typography variant="h3" fontWeight={700} mb={3}>
        Đánh giá
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ReviewSummary reviews={reviews} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ReviewList reviews={reviews} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Reviews;