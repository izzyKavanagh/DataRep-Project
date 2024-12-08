import React, { useState } from 'react';

const CreateNote = () => {

    const [noteBody, setNoteBody] = useState("");
      
    const handleInputChange = (event) => {
        setNoteBody(event.target.innerHTML);  // Get HTML content from editable div
    };

    return(
        <div>
      <h1>Create Note</h1>
      <input type="text" placeholder="Title" style={{ width: "100%", marginBottom: "10px", padding: "10px" }} />
      <div
        contentEditable
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
          backgroundColor: "#f9f9f9",
          marginBottom: "20px",
        }}
        onInput={handleInputChange}
        dangerouslySetInnerHTML={{ __html: noteBody }}
      />
      <button>Save Note</button>
    </div>
  );
}

export default CreateNote;