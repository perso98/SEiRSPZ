import {useState} from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import Stack from '@mui/material/Stack';
import './style.css';

export const FileUploader = ({onSuccess}) => {
    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        for(let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }

        axios.post('http://localhost:5000/api/upload', data)
            .then((response) => {
                toast.success('Upload Success =^.^=');
                onSuccess(response.data)
            })
            .catch((e) => {
                toast.error('Upload Error')
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
                       multiple/>
                       <button onClick={onSubmit}>Submit</button>
                </Stack>
            </div>

            
        </form>
    )
};