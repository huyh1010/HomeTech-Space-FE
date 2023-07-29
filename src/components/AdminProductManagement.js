import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Button,
  Chip,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { fCurrency } from "../utils/numberFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const tableColumnsTitle = [
  { id: "product_id", label: "Product ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 170 },
  { id: "brand", label: "Brand", minWidth: 170 },
  { id: "update", minWidth: 170 },
  { id: "delete", minWidth: 170 },
];

function AdminProductManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { products } = useSelector((state) => state?.products?.products);
  const { count } = useSelector((state) => state?.products);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getProducts({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button onClick={() => navigate("/admin/products/create")}>
          Create Product
        </Button>
      </Box>
      <TableContainer sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#74b9ff" }}>
              {tableColumnsTitle.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell sx={{ fontWeight: "bold" }}>{product._id}</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    src={product.poster_path}
                    sx={{ mr: 2, width: 50, height: 50 }}
                    alt={product.name}
                  />
                  <Typography
                    variant="body1"
                    sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell>{fCurrency(product.price)}</TableCell>
                <TableCell>
                  <Chip label={product.category} color="secondary" />
                </TableCell>
                <TableCell>
                  <Chip label={product.brand} color="primary" />
                </TableCell>
                <TableCell>
                  <Button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                    }}
                    size="small"
                    endIcon={<DeleteIcon />}
                    onClick={() => dispatch(deleteProduct({ id: product._id }))}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                    size="small"
                    endIcon={<EditIcon />}
                    onClick={() =>
                      navigate(`/admin/products/edit/${product._id}`)
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                page={page}
                count={count}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPage={rowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminProductManagement;
