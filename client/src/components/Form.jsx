import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [project, setProject] = useState("");

  async function handleSubmit(ev) {
    ev.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await axios.post("http://localhost:8080/createClinent", {
        name,
        lastName,
        email,
        mobNo,
        project,
      });
      console.log(response.data);
      alert("Client created successfully!");
      setName("");
      setLastName("");
      setEmail("");
      setMobNo("");
      setProject("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating client:", error);
      alert("Failed to create client. Please try again later.");
    }
  }

  return (
    <div className="createform">
      <h2>Create Client</h2>
      <form onSubmit={handleSubmit}>
        <h4>Name</h4>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <h3>Last Name</h3>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(ev) => setLastName(ev.target.value)}
        />
        <h3>Email</h3>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <h3>Mobile No</h3>
        <input
          type="number"
          name="mobNo"
          value={mobNo}
          onChange={(ev) => setMobNo(ev.target.value)}
        />
        <h3>Project</h3>
        <input
          type="text"
          name="project"
          value={project}
          onChange={(ev) => setProject(ev.target.value)}
        />
        <button type="submit">Create Client</button>
      </form>
    </div>
  );
}
