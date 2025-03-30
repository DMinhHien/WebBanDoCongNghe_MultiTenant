import axios from "axios";
import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    Grid,
    Button,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import useProductStore from "../../zustand/useProductStore"
  import { Category } from "../../data/category";
  const CategoryFilter = () => {
    const { filters, setCategoryFilter } = useProductStore();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(filters.category);
    useEffect(() => {
          fetchCategories();
        }, []);
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('https://localhost:7183/Categories/getListUse');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError('Không thể lấy dữ liệu category');
        setLoading(false);
      }
    };
    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const category = event.target.value;
      setSelectedCategory(category);
      setCategoryFilter(category);
    };
    const handleClearSelection = () => {
      // Clear selected category
      setSelectedCategory("");
      setCategoryFilter(""); // Remove filter
    };
    return (
      <Accordion
        sx={{ bgcolor: "transparent", boxShadow: "none" }}
        defaultExpanded
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700} fontSize={18}>
            Thể Loại
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            value={selectedCategory}
            onChange={handleCategoryChange}
            name="category-filter"
          >
            <Grid container>
              {categories.map((category) => (
                <Grid item xs={6} key={category.id}>
                  {" "}
                  {/* Mỗi phần tử chiếm 50% chiều rộng */}
                  <FormControlLabel
                    value={category.name}
                    control={<Radio />}
                    label={category.name}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
          <Button
          variant="outlined"
          color="primary"
          onClick={handleClearSelection}
          sx={{ marginTop: 2 }}
        >
          Bỏ chọn
        </Button>
        </AccordionDetails>
      </Accordion>
    );
  };
  
  export default CategoryFilter;