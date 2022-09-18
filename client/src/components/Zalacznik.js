import { React, useState } from "react";
import axios from "axios"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, TextField } from "@mui/material";
import Stack from '@mui/material/Stack';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Zalacznik(
  { 
    idDay,
    setChangeZalacznik,
  }
  ) {

  const FileUploader = ({onSuccess}) => {
    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
        
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        for(const element of files) {
            data.append('file', element);
        }
        console.log(data.getAll)
        axios.post(`http://localhost:5000/api/upload/${idDay}`, data,{
          })
            .then((response) => {
                toast.success('Załadowano pomyślnie');
                setChangeZalacznik(response.data)
                onSuccess(response.data)
                console.log("response.data" + response.data)
            })
            .catch((e) => {
                toast.error('Błąd')
            })
    };

    return (
        <form>
            <div>
                <Stack direction="row" spacing={1}>
                <label>Załącz pliki </label>
                <input type="file"
                       onChange={onInputChange}
                       className="form-control"
                       multiple
                       />
                       <button onClick={onSubmit}>Submit</button>
                </Stack>
            </div>
        </form>
    )
  }

  const Preview = ({files}) => {
    if (!files.length) {
        return null
    }

    return (files.map((file) => (
      <>
    <img style={{maxWidth: '200px'}} src={`//localhost:5000/${file.filename}`} alt={file.originalname}/>
    </>
    )

    ))
  }
    const [files, setFiles] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };

  return (
    <div className="App">
      <FileUploader onSuccess={onSuccess} />

      <Preview files={files}/>

      <ToastContainer/>
    </div>
  );
}

export default Zalacznik;


