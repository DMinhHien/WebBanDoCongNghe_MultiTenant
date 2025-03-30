import { Box, Button, Typography, LinearProgress, Rating } from "@mui/material";

interface Comment {
  id: string;
  content:string;
  username:string;
  productId: string;
  rating: number;
  date: Date;
}

interface Props {
  reviews: Comment[];
}

const ReviewSummary = ({ reviews }: Props) => {
    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;
    const ratingCounts: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    reviews.forEach((review) => {
      ratingCounts[review.rating] += 1;
    });
  
    return (
      <Box>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="700">
            {totalReviews} đánh giá{totalReviews > 1 ? "s" : ""}
          </Typography>
        </Box>
  
        {/* Content Section */}
        <Box display="flex" alignItems="center">
          {/* Average Rating */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mr={3}
          >
            <Typography variant="h2" fontWeight={600}>
              {averageRating.toFixed(1)}
            </Typography>
            <Rating
              value={averageRating}
              readOnly
              precision={0.2}
              size="medium"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "black", // Sets the filled stars to black
                },
                "& .MuiRating-iconEmpty": {
                  color: "black", // Sets the empty stars to black
                },
              }}
            />
          </Box>
  
          {/* Star Rating Breakdown */}
          <Box flex="1">
            {Object.entries(ratingCounts)
              .reverse()
              .map(([stars, count]) => (
                <Box key={stars} display="flex" alignItems="center" mb={1}>
                  <Typography whiteSpace="nowrap" width="30px">
                    {stars} ★
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={totalReviews > 0 ? (count / totalReviews) * 100 : 0}
                    sx={{ flexGrow: 1, mx: 1 }}
                  />
                  <Typography>{`(${count})`}</Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default ReviewSummary;