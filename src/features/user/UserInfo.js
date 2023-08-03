import {
  Avatar,
  Box,
  Grid,
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./userSlice";
import SearchIcon from "@mui/icons-material/Search";

const tableColumnsTitle = [
  { id: "user_id", label: "User ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "avatarUrl", label: "Avatar", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
];

function UserInfo() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { totalUsers, users } = useSelector((state) => state?.users?.users);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target[0].value);
    dispatch(getUsers({ page: page + 1, limit: rowsPerPage, name: name }));
  };

  useEffect(() => {
    dispatch(getUsers({ page: page + 1, limit: rowsPerPage, name }));
    // eslint-disable-next-line
  }, [dispatch, page, rowsPerPage]);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h3" sx={{ mb: 1 }}>
              Users
            </Typography>
            <Box sx={{ mb: 1 }}>
              <InputBase
                placeholder="Search user name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                endAdornment={
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                }
                fullWidth
              />
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
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
                  {users?.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user._id}
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Avatar src={user.avatarUrl} />
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      count={totalUsers}
                      onPageChange={(e, page) => setPage(page)}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}></Grid>
      </Grid>
    </form>
  );
}

export default UserInfo;
