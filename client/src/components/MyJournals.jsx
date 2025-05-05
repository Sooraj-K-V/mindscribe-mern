// File: MyJournals.jsx
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import UpdateJournal from "./dialog/UpdateJournal.jsx";
import { instance } from "../axios.js";
import "./MyJournal.css";

function MyJournals() {
  const [open, setOpen] = useState(null);
  const [journals, setJournals] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  const handleClick = (id) => {
    setOpen(open === id ? null : id);
  };

  const fetchJournals = async () => {
    try {
      const res = await instance.get("/user/journals");
      setJournals(res.data);
    } catch (error) {
      console.error("Failed to fetch journals:", error.message);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleIsUpdate = (updated) => {
    if (updated) fetchJournals();
  };

  const deleteJournal = async (journalId) => {
    try {
      const res = await instance.delete(`/user/journal/${journalId}`);
      console.log(res.data.message);
      fetchJournals();
    } catch (error) {
      setErrMsg(error.response?.data || error.message);
      console.error("Deletion failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2 className="text-center">My Journals</h2>
      <div className="p-5" style={{ overflowY: "scroll", maxHeight: "70vh" }}>
        {journals.map((journal) => (
          <List
            component="nav"
            key={journal._id}
            className="rounded p-2 m-2"
            sx={{ backgroundColor: "purple" }}
          >
            <ListItemButton onClick={() => handleClick(journal._id)}>
              <ListItemText
                primary={journal.title}
                secondary={
                  <span style={{ color: "#ccc" }}>
                    {new Date(journal.updatedAt).toLocaleDateString()}
                  </span>
                }
                className="text-white"
              />
            </ListItemButton>
            <Collapse in={open === journal._id} timeout="auto" unmountOnExit>
              <List component="div" className="py-2 px-4">
                <ListItemText
                  primary={
                    <div>
                      <p>{journal.content}</p>
                      <Box
                        sx={{ cursor: "pointer" }}
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <div className="mx-2">
                          <UpdateJournal
                            journalId={journal._id}
                            title={journal.title}
                            content={journal.content}
                            onSendData={handleIsUpdate}
                            onUpdateSuccess={fetchJournals}
                          />
                        </div>
                        <div
                          className="mx-2"
                          onClick={() => deleteJournal(journal._id)}
                        >
                          <DeleteIcon />
                        </div>
                      </Box>
                    </div>
                  }
                />
              </List>
            </Collapse>
          </List>
        ))}
      </div>
    </div>
  );
}

export default MyJournals;
