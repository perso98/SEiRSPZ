import { Box, Alert, Collapse, IconButton } from "@mui/material";
import { React, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertComponent(props) {
  return (
    <>
      {props.loginStatus != "" && (
        <Box sx={{ width: "100%" }}>
          <Collapse in={props.open}>
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
              {props.loginStatus}
            </Alert>
          </Collapse>
        </Box>
      )}
    </>
  );
}
