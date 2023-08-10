import {
  Avatar,
  Box,
  Card,
  Divider,
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
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, getUsers } from "./userSlice";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import PieChart from "../../components/PieChart";

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
  const theme = useTheme();

  const { totalUsers, users } = useSelector((state) => state?.users?.users);
  const { userData } = useSelector((state) => state?.users);

  const userRegisteredLast7Days = {
    labels: userData?.map((user) => user.dateDMY),

    datasets: [
      {
        label: "User Registered ",
        data: userData?.map((user) => user.count),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",

          "rgba(54, 162, 235, 0.2)",

          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",

          "rgb(54, 162, 235)",

          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
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

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} lg={6}>
          <Paper sx={{ p: 3, backgroundColor: "purple.light" }}>
            <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
              User List
            </Typography>
            <Divider sx={{ backgroundColor: "white" }} />
            <Box sx={{ mt: 1, mb: 1 }}>
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
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor:
                          theme.palette.mode === "dark" && "plum",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
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
        <Grid item xs={12} sm={12} lg={6}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              mb: 2,
              backgroundColor: "pink.light",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              {" "}
              Users
            </Typography>
            <Divider sx={{ my: 1, backgroundColor: "white" }} />
            <PersonIcon style={{ fontSize: 50, color: "white" }} />
            <Typography sx={{ color: "white" }}>
              {totalUsers} Total Users Registered
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, backgroundColor: "#fff" }}>
            <Typography sx={{ fontWeight: "bold", color: "black" }}>
              {" "}
              User Registered in Last 7 Days
            </Typography>
            <Divider sx={{ my: 1 }} />
            {userRegisteredLast7Days.datasets ? (
              <PieChart chartData={userRegisteredLast7Days} />
            ) : (
              ""
            )}
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}

export default UserInfo;
