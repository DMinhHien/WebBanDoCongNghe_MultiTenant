import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import {
  createCategoty,
  deleteCategory,
  getListCategories,
} from "../services/categoryService";
import { Category } from "./ChinhSuaSanPham";

export default function QuanLyCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (id: string) => {
    if (!id) return;

    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      return isSelected
        ? prevSelected.filter((categoryId) => categoryId !== id)
        : [...prevSelected, id];
    });
  };
  //call api getListCategories
  useEffect(() => {
    getListCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  const handleSelectAll = () => {
    const newSelected =
      selectedCategories.length === categories.length
        ? []
        : categories.map((category) => category.id);

    setSelectedCategories(newSelected);
  };
  //call api createCategory
  const create = () => {
    if(name==="")
    {
      alert("vui lòng nhập tên của Category!!!")
      return
    }
    createCategoty(name).then((data) => {
      setCategories(data);
      setName("");
    });
  };
//call api deleteCategory
  const DeleteCategory = () => {
    selectedCategories.forEach((selectedCategorie) => {
      deleteCategory(selectedCategorie).then((data) => {
        setCategories(data);
        setSelectedCategories((prevSelected) =>
          prevSelected.filter((id) => id !== selectedCategorie)
        );
      });
    });
  };

  return (
    <div className="flex w-screen">
      <AdminNav />
      <div className="w-[50vw] px-6">
        {/* Header Section */}
        <div className="mt-8 mb-7 flex justify-between items-center">
          {/* Input & Search */}
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex w-full mb-12">
              <InputBase
                placeholder="Tên Thể Loại"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  backgroundColor: "#F0ECE1",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  width: "40%",
                }}
              />
              <div className="flex  space-x-4 ml-5">
                <button
                  style={{ backgroundColor: "#FBFAF1" }}
                  className="border p-2 rounded-md w-[150px] text-center"
                  onClick={create}
                >
                  Thêm Thể Loại
                </button>
                <button
                  style={{ backgroundColor: "#FBFAF1" }}
                  className="border p-2 rounded-md w-[150px] text-center"
                  onClick={DeleteCategory}
                >
                  Xóa Thể Loại
                </button>
              </div>
            </div>
            <InputBase
              placeholder="Search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              startAdornment={<Search style={{ color: "#999" }} />}
              style={{
                backgroundColor: "#F0ECE1",
                padding: "5px 10px",
                borderRadius: "20px",
                width: "60%",
              }}
            />
          </div>

          {/* Action Buttons */}
        </div>

        {/* Category List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Danh sách Thể Loại</h2>
          <div className="overflow-x-auto">
            <table className="min-w-[40%] border border-gray-300">
              <thead>
                <tr style={{ backgroundColor: "#FBFAF1" }}>
                  <th className="border border-gray-300 p-2 w-[15%] text-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === categories.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border border-gray-300 p-2 text-left">Tên</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCheckboxChange(category.id)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {category.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
