import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputBase,
  alpha,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiList from "../../lib/apiList";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 2,
  marginTop: 10,
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "500",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "10ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const UsersInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(apiList.users);
        setUsers(res.data);
      } catch (error) {
        console.log("Error in fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    // Note: Filtering on the client may not be ideal if you need to preserve the original list.
    // It might be better to filter on the backend or maintain a copy of the original list.
    const filteredList = users.filter(
      (user) =>
        user.year.toLowerCase().includes(searchText.toLowerCase()) ||
        user.branch.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setUsers(filteredList);
  };

  return (
    <Box marginBottom={9}>
      <Box style={{ display: "flex", flexWrap: "wrap" }}>
        <Search>
          <StyledInputBase
            placeholder="Search…"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <button
          onClick={handleSearch}
          style={{
            borderRadius: 5,
            border: "2px solid black",
            marginLeftt: 0,
            width: 80,
            height: 30,
            marginTop: 12,
            marginLeft: 2,
          }}
        >
          Search
        </button>
      </Box>
      <Box marginTop={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ border: "1px solid red" }}>
              <StyledTableCell>
                <b>Name</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Email</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Year</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Branch</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Contact Number</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>CGPA</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Address</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Resume</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Profile Pic</b>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.email}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </StyledTableCell>
                <StyledTableCell>{user.year}</StyledTableCell>
                <StyledTableCell>{user.branch}</StyledTableCell>
                <StyledTableCell>{user.contactNumber}</StyledTableCell>
                <StyledTableCell>{user.CGPA}</StyledTableCell>
                <StyledTableCell>{user.address}</StyledTableCell>
                <StyledTableCell>
                  {user.resume ? (
                    <a
                      href={`/file/${user.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  ) : (
                    "Not Provided"
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {user.profile ? (
                    <img
                      src={`/file/${user.profile}`}
                      alt={`${user.name}'s Profile`}
                      style={{ maxWidth: "100px" }}
                    />
                  ) : (
                    "Not Provided"
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default UsersInfo;
