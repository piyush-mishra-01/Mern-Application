import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useState } from "react";
import Axios from "axios";
import { FormGroup } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AddUser() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [name1, setName] = useState(null);
  const [username1, setusername] = useState(null);
  const [email1, setemail] = useState(null);
  const [phone1, setphone] = useState(null);
  const [uploadedFile, setUploadedFile] = useState("");

  function handleUploadedFile(e) {
    setUploadedFile(e.target.value);
  }
  function handleFormSubmittion(e) {
    e.preventDefault();

    let form = document.getElementById("form");
    let formData = new FormData(form);
    formData.append("articleImage", uploadedFile);
    formData.append("name", name1);
    formData.append("username", username1);
    formData.append("email", email1);
    formData.append("phone", phone1);

    // new line added
    Axios.post("http://localhost:8080/users/add", formData);
    window.location.reload();
  }

  // const postData = () => {
  //   const data = {
  //     photo:uploadedFile,
  //     name: name1,
  //     username: username1,
  //     email: email1,
  //     phone: phone1,
  //   };
  //   Axios.post("http://localhost:8080/users/add", data).then((res) => {
  //     window.location.reload();
  //   });
  // };

  return (
    <FormGroup className={classes.root} style={{ float: "left" }}>
      <form encType="multipart/form-data" onSubmit={handleFormSubmittion}id="form">
        <input type="file" name="articleImage" value={uploadedFile} onChange={handleUploadedFile} required/><br />
        <input value={name1} onChange={(e) => setName(e.target.value)} />
        <input value={username1} onChange={(e) => setusername(e.target.value)}/>
        <input value={email1} onChange={(e) => setemail(e.target.value)} />
        <input value={phone1} onChange={(e) => setphone(e.target.value)} />
        <button type="submit" onClick={() => {alert("File Uploaded");}}>
          Import userImage
        </button>
      </form>
      {/*     
      <p>
        Name <input value={name1} onChange={(e) => setName(e.target.value)} />
      </p>
      <p>
        Username{" "}
        <input
          value={username1}
          onChange={(e) => setusername(e.target.value)}
        />
      </p>
      <p>
        email{" "}
        <input value={email1} onChange={(e) => setemail(e.target.value)} />
      </p>
      <p>
        Phone
        <input value={phone1} onChange={(e) => setphone(e.target.value)} />
      </p>
      
      <button onClick={() => postData()}>Submit</button> */}
    </FormGroup>
  );
}
