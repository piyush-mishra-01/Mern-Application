import react, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Button,
  makeStyles,
  TablePagination,
  TableContainer,
} from "@material-ui/core";
import { getUsers, deleteUser } from "../Service/api";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "50px 0 0 50px",
  },
  thead: {
    "& > *": {
      fontSize: 20,
      background: "#000000",
      color: "#FFFFFF",
    },
  },
  row: {
    "& > *": {
      fontSize: 18,
    },
  },
});

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const [uploadedFile, setUploadedFile] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  useEffect(() => {
    getAllUsers();
  }, []);

  function handleFormSubmittion (e) {
    e.preventDefault ();

    let form = document.getElementById ('form');
    let formData = new FormData (form);

    // new line added
    axios.post ('http://localhost:8080/upload', formData);
  }


  function handleFileTitle(e) {
    setFileTitle(e.target.value);
  }

  function handleUploadedFile(e) {
    setUploadedFile(e.target.value);
  }

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };
 

  return (
    
    <div>
      <ReactHTMLTableToExcel
       
        className="btn btn-info"
        table="emp-table"
        filename="Emp Excel file"
        sheet="Sheet"
        buttonText="Export to Excel"
      />
      <br/>
      <br/>

{/* <react.Fragment> */}
        <form
          encType="multipart/form-data"
          onSubmit={handleFormSubmittion}
          id="form"
        >
          <input
            type="file"
            name="sampleFile"
            value={uploadedFile}
            onChange={handleUploadedFile}
            required
          />
          <br />

          <button type="submit" onClick={()=>{ alert('File Uploaded'); }}>Import Spreadsheet</button>
        </form>
      {/* </react.Fragment> */}
      <TableContainer component={Paper}>
      <table className={classes.table} id="emp-table">
        <TableHead>
          <TableRow className={classes.thead}>
            {/* <TableCell>Id</TableCell> */}
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((user) => (
            <TableRow className={classes.row} key={user.id}>
              {/* <TableCell>{user._id}</TableCell>{" "} */}
              {/* change it to user.id to use JSON Server */}
              
              
              <TableCell><img width={'50'} src={`/uploads/${user.articleImage}`}/></TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/edit/${user._id}`}
                >
                  Edit
                </Button>{" "}
                {/* change it to user.id to use JSON Server */}
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => deleteUserData(user._id)}
                >
                  Delete
                </Button>{" "}
                {/* change it to user.id to use JSON Server */}
              </TableCell>
            </TableRow>
          ))}
                {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6}></TableCell>
            </TableRow>
          )}
        </TableBody>
      </table>
      <TablePagination
        rowsPerPageOptions={[4, 8, 12]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      
      </TableContainer>
    </div>
  );
};

export default AllUsers;
