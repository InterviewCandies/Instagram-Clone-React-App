import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./CustomModal.css";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function CustomModal(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  return (
    <Modal
      className="modal__container"
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="custom-modal"
      aria-describedby="custom-modal"
    >
      <div style={modalStyle} className={classes.paper}>
        {props.children}
      </div>
    </Modal>
  );
}

export default CustomModal;
