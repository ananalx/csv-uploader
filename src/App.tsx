import "./index.css";
import { useState } from "react";
import axios from "axios";

interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
}

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(
      e.target.files && e.target.files[0] ? e.target.files[0] : null
    );
  };

  const retrieveFiles = () => {
    axios.get("http://localhost:4000/records").then((result) => {
      console.log("data", result);
      setUsers(result.data.result);
    });
  };
  const deleteRecord = (id: string) => {
    axios.delete(`http://localhost:4000/delete/${id}`).then((result) => {
      console.log("data", result);
      setUsers((p) =>
        p.filter((user) => user._id !== result.data.deletedRecord._id)
      );
    });
  };

  const onFileUpload = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    console.log(selectedFile);
    axios.post("http://localhost:4000/upload", formData);
  };
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified: {new Date(selectedFile.lastModified).toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // height: "100vh",
          // width: "100vw",
        }}
      >
        <input type="file" onChange={onFileChange} />
        <button style={{ margin: "5%" }} onClick={onFileUpload}>
          Upload
        </button>
      </div>
      {fileData()}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",

          // height: "100vh",
          // width: "100vw",
        }}
      >
        <button onClick={retrieveFiles}>Retrieve</button>
      </div>
      {users.length && (
        <div>
          <div>
            <h2>User List</h2>
            <ul>
              {users.map((user) => (
                <li key={user.email}>
                  <strong>Name:</strong> {user.name}, <strong>Email:</strong>{" "}
                  {user.email}, <strong>Age:</strong> {user.age}
                  <button
                    style={{ margin: "2%" }}
                    onClick={() => deleteRecord(user._id)}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
