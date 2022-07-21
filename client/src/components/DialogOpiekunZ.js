import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from '@mui/material'

function DialogOpiekunZ({open,handleClose,checkDay}) {

    
    
  return (
    <>
    {open && (
    <Dialog
    open={open}
    onClose={handleClose}
    fullWidth="40%"
    style={{fontSize:'1.2rem',color:"#403c3c"}}
  >
    <DialogTitle style={{justifyContent:'space-between',display:'flex'}}>
      Dzień:{checkDay.id}
    <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
    </DialogTitle>
    <DialogContent >
      <div style={{margin:'1rem 0px 1rem 0 '}}><h5>Opis:</h5> Wczoraj dasdkasdkasmd asdkmsak daksm dkas dkmsakm dksamk dskamd kasd ds dsad  </div>
        
      <div style={{margin:'1rem 0px 1rem 0 '}}><h5>E-mail:</h5>{checkDay.opis}</div>

        <h5>Efekty uczenia:</h5>

        <div style={{display:'flex',justifyContent:'space-between'}}> <Button variant="contained" color="success">
          Akceptuj
        </Button>
        <Button variant="contained" color="error">
          Odrzuć
        </Button></div>
    </DialogContent>
    <DialogActions>
    </DialogActions>
  </Dialog>)}
  </>
  )
}

export default DialogOpiekunZ