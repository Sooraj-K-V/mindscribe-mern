import React from "react";

function DashboardComp(props) {
  return (
    <div>
      <h1 style={{ textAlign: "center"}}>
        Hi {props.username}, welcome to Mindscribe
      </h1>

      <p
        style={{
          textAlign: "justify",
          maxWidth: "800px",
          margin: "0 auto",
          fontSize: "1.1rem",
          lineHeight: "1.6",
        }}
        className="p-3 p-sm-5"
      >
        MindScribe is a simple and secure journaling app designed to help you
        reflect on your thoughts, track your emotions, and document daily
        moments. Whether you're writing to clear your mind or preserve memories,
        MindScribe offers a private and calming space to express yourself
        freely—with your entries kept safe and secure.
      </p>
    </div>
  );
}

export default DashboardComp;
