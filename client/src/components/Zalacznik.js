import { React, useState } from "react";
import Axios from "axios"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, TextField } from "@mui/material";

import { FileUploader } from './FileUploader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Preview } from './Preview';

function Zalacznik() {

  // const createZalacznik = ()=>
  // {
  //     Axios.post("http://localhost:5000/api/createZalacznik",
  //     {
  //         zalacznik : zalacznik,

  //     }).then((res) => {
  //         if (res.data.message) {
  //             setFormStatus(res.data.message);
  //         }
  //       })
  // }

    const [files, setFiles] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };

  return (
    <div className="App">
      <FileUploader onSuccess={onSuccess}/>
      <Preview files={files}/>
      <ToastContainer/>
    </div>
  );
}

export default Zalacznik;


