import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
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
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { fCurrency } from "../utils/numberFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const tableColumnsTitle = [
  { id: "product_id", label: "Product ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "picture", label: "Picture", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 170 },
  { id: "brand", label: "Brand", minWidth: 170 },
  { id: "delete", minWidth: 170 },
  { id: "update", minWidth: 170 },
];

function AdminProductManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [name, setName] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const { products } = useSelector((state) => state?.products?.products);
  const { count, loading, error } = useSelector((state) => state?.products);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getProducts({ page: page + 1, limit: rowsPerPage, name: name }));
    // eslint-disable-next-line
  }, [dispatch, page, rowsPerPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target[0].value);
    dispatch(getProducts({ page: page + 1, limit: rowsPerPage, name: name }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
          justifyContent: "space-between",
        }}
      >
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { xs: 250, sm: 400, md: 400, lg: 400 },
            backgroundColor: "white",
            mb: { xs: 1, sm: 0, md: 0, lg: 0 },
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: "black" }}
            placeholder="Search product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          onClick={() => navigate("/admin/products/create")}
          sx={{ backgroundColor: "primary.light", color: "white" }}
        >
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
          <TableBody sx={{ position: "relative" }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {products ? (
                  products?.map((product) => (
                    <TableRow
                      key={product._id}
                      sx={{
                        backgroundColor:
                          theme.palette.mode === "dark" && "	royalblue",
                      }}
                    >
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {product._id}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {" "}
                        <Avatar
                          src={product.poster_path}
                          sx={{ mr: 2, width: 50, height: 50 }}
                          alt={product.name}
                        />
                      </TableCell>
                      <TableCell>{fCurrency(product.price)}</TableCell>
                      <TableCell>
                        <Chip
                          label={product?.category?.name}
                          color="secondary"
                        />
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
                          onClick={() => handleClickOpen(product._id)}
                        >
                          Delete
                        </Button>
                        <Dialog
                          open={open === product._id}
                          onClose={handleClose}
                        >
                          <DialogTitle
                            sx={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            {"Delete Product?"}
                          </DialogTitle>
                          <Divider />
                          <DialogContent>
                            <DialogContentText>
                              Are you sure you'd like to delete this product?
                              The removal of a product cannot be undone. If you
                              wish to delete this product, click "Confirm". If
                              you do not wish to delete this order, click the
                              "Cancel" button.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions sx={{ margin: "auto" }}>
                            <Button
                              style={{
                                backgroundColor: "#3366FF",
                                color: "white",
                              }}
                              onClick={() =>
                                dispatch(
                                  deleteProduct({ id: product._id })
                                ).then(
                                  () =>
                                    dispatch(
                                      getProducts({
                                        page: page + 1,
                                        limit: rowsPerPage,
                                      })
                                    ),
                                  handleClose()
                                )
                              }
                            >
                              Confirm
                            </Button>
                            <Button
                              style={{ backgroundColor: "red", color: "white" }}
                              onClick={handleClose}
                              autoFocus
                            >
                              Cancel
                            </Button>
                          </DialogActions>
                        </Dialog>
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
                  ))
                ) : (
                  <Alert severity="error">{error}</Alert>
                )}
              </>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                sx={{ color: theme.palette.mode === "dark" && "black" }}
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
    </form>
  );
}

export default AdminProductManagement;
