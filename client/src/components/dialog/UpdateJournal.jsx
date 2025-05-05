// File: ./dialog/UpdateJournal.jsx
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { instance } from "../../axios";

export default function UpdateJournal(props) {
  const { title, content, journalId, onSendData, onUpdateSuccess } = props;

  const [open, setOpen] = React.useState(false);
  const [updateDetails, setUpdateDetails] = React.useState({ title, content });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdateDetails({ title, content });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await instance.put(
        `/user/journal/${journalId}`,
        updateDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (typeof onUpdateSuccess === "function") onUpdateSuccess();

      if (typeof onSendData === "function") {
        onSendData(true); // notify parent
      }

      setOpen(false);
      console.log(res.data);
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <React.Fragment>
      <div onClick={handleClickOpen}>
        <EditIcon />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update your Journal</DialogTitle>
        <DialogContent sx={{ overflowX: "hidden" }}>
          <TextField
            label="Title"
            type="text"
            name="title"
            value={updateDetails.title}
            onChange={handleChange}
            error={!updateDetails.title}
            helperText={!updateDetails.title ? "Field must not be empty" : ""}
            fullWidth
            className="m-2"
          />
          <TextField
            label="Journal"
            multiline
            rows={4}
            name="content"
            value={updateDetails.content}
            onChange={handleChange}
            error={!updateDetails.content}
            helperText={!updateDetails.content ? "Field must not be empty" : ""}
            fullWidth
            className="m-2"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleUpdate}
            disabled={
              (title === updateDetails.title &&
                content === updateDetails.content) ||
              !updateDetails.title ||
              !updateDetails.content
            }
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
