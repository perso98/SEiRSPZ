import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Collapse, Alert, IconButton } from "@mui/material";

export default function RegisterAlertComponent(props) {
  return (
    <>
      {props.registerStatus != "" && (
        <Box sx={{ width: "100%" }}>
          <Collapse in={props.open}>
            <>
              {props.alertSeverity ? (
                <Alert
                  severity="error"
                  variant="filled"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="medium"
                      onClick={() => {
                        props.setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {props.registerStatus}
                </Alert>
              ) : (
                <Alert
                  severity="success"
                  variant="filled"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="medium"
                      onClick={() => {
                        props.setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {props.registerStatus}
                </Alert>
              )}
            </>
          </Collapse>
        </Box>
      )}
    </>
  );
}
