import React, { useState } from "react";
import "./AddJournal.css";
import axios from "axios";

function AddJournal({ onSendData }) {
  const [journalDetails, setJournalDetails] = useState({
    title: "",
    journal: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const addJournal = "addjournal";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post(
        "http://localhost:3000/api/user/journals",
        journalDetails
      );
      console.log(res.data);
    } catch (error) {
      console.error(error.message);
      setErrMsg(res?.data?.message);
    }
  };

  const handlChange = (e) => {
    const { name, value } = e.target;
    setJournalDetails((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}>Add Your Journal</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="my-3"
              onChange={handlChange}
            />
            <textarea
              style={{ width: "100%" }}
              onChange={handlChange}
              name="jounal"
              id="journal"
              placeholder="Journal..."
              className=""
              rows="6"
              cols="45"
            ></textarea>
            <div style={{ textAlign: "center" }}>
              <button
                className="add-button px-4 py-1 border-0 my-3"
                type="submit"
                onClick={() => onSendData(addJournal)}
              >
                Add
              </button>
            </div>
            <p className="text-center text-danger"></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJournal;
