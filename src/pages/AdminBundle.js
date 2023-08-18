import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
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
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import SearchIcon from "@mui/icons-material/Search";
import LoadingScreen from "../components/LoadingScreen";
import { deleteBundle, getBundles } from "../features/bundle/bundleSlice";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { fCurrency } from "../utils/numberFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const tableColumnsTitle = [
  { id: "bundle_id", label: "Bundle ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "picture", label: "Picture", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "products", label: "Products", minWidth: 170 },

  { id: "delete", minWidth: 170 },
  { id: "update", minWidth: 170 },
];

function AdminBundle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const { bundles } = useSelector((state) => state?.bundles?.bundles);
  const { loading, error, count } = useSelector((state) => state?.bundles);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target[0].value);
    dispatch(getBundles({ page: page + 1, limit: rowsPerPage, name: name }));
  };
  useEffect(() => {
    dispatch(getBundles({ page: page + 1, limit: rowsPerPage, name: name }));
    // eslint-disable-next-line
  }, [dispatch, page, rowsPerPage]);
  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ mt: 10 }}>
        <Paper sx={{ p: 3, backgroundColor: "tertiary.light" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Product Bundles
            </Typography>
            <InventoryIcon style={{ fontSize: 50 }} />
          </Box>
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
                placeholder="Search bundle name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Button
              sx={{ backgroundColor: "primary.light", color: "white" }}
              onClick={() => navigate("/admin/bundles/create")}
            >
              Create Bundle
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
                    {bundles ? (
                      bundles?.map((bundle) => {
                        return (
                          <TableRow
                            key={bundle._id}
                            sx={{
                              backgroundColor:
                                theme.palette.mode === "dark" && "tan",
                            }}
                          >
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {bundle._id}
                            </TableCell>
                            <TableCell>{bundle.name}</TableCell>
                            <TableCell>
                              <Avatar
                                src={bundle.poster_path}
                                sx={{ mr: 2, width: 50, height: 50 }}
                                alt={bundle.name}
                              />
                            </TableCell>
                            <TableCell>{fCurrency(bundle.price)}</TableCell>
                            <TableCell>
                              {" "}
                              {bundle.products.map((product) => (
                                <p>{product.name}</p>
                              ))}
                            </TableCell>

                            <TableCell>
                              <Button
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                                size="small"
                                endIcon={<DeleteIcon />}
                                onClick={() => handleClickOpen(bundle._id)}
                              >
                                Delete
                              </Button>
                              <Dialog
                                open={open === bundle._id}
                                onClose={handleClose}
                              >
                                <DialogTitle
                                  sx={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {"Delete Bundle?"}
                                </DialogTitle>
                                <Divider />
                                <DialogContent>
                                  <DialogContentText>
                                    Are you sure you'd like to delete this
                                    bundle? The removal of a bundle cannot be
                                    undone. If you wish to delete this bundle,
                                    click "Confirm". If you do not wish to
                                    delete this bundle, click the "Cancel"
                                    button.
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
                                        deleteBundle({ id: bundle._id })
                                      ).then(
                                        () =>
                                          dispatch(
                                            getBundles({
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
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                    }}
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
                                  navigate(`/admin/bundles/edit/${bundle._id}`)
                                }
                              >
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
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
        </Paper>
      </Container>
    </form>
  );
}

export default AdminBundle;
