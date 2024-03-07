import  { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css"; // Import your UserList CSS file

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    mobNo: "",
    project: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/").then(({ data }) => {
      setUsers(data);
    });
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteClient/${id}`);
      setUsers(users.filter((user) => user._id !== id)); // Remove the deleted user from the state
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error, e.g., show error message to the user
    }
  };
  const editUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      mobNo: user.mobNo,
      project: user.project,
    });
  };

  // Function to update user data
  const updateUser = async () => {
    try {
      const { _id } = selectedUser;
      const response = await axios.put(
        `http://localhost:8080/updateClient/${_id}`,
        formData
      );
      console.log("Updated user:", response.data);
      // Update the user list with the updated user data
      setUsers(users.map((user) => (user._id === _id ? response.data : user)));
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error
    }
  };

  return (
    <div className="clientlist">
      <h3>Clients</h3>
      <div className="clientlist-content">
        <div className="clientlist-item">
          <div className="column">
            <span className="column-heading">Name</span>
            {users.map((user) => (
              <div key={user._id} className="data-row">
                {user.name}
              </div>
            ))}
          </div>
          <div className="column">
            <span className="column-heading">Last Name</span>
            {users.map((user) => (
              <div key={users._id} className="data-row">
                {user.lastName}
              </div>
            ))}
          </div>
          <div className="column">
            <span className="column-heading">Email</span>
            {users.map((user) => (
              <div key={users._id} className="data-row">
                {user.email}
              </div>
            ))}
          </div>
          <div className="column">
            <span className="column-heading">Mobile No.</span>
            {users.map((user) => (
              <div key={users._id} className="data-row">
                {user.mobNo}
              </div>
            ))}
          </div>
          <div className="column">
            <span className="column-heading">Project</span>
            {users.map((user) => (
              <div key={users._id} className="data-row">
                {user.project}
              </div>
            ))}
          </div>
          <div className="column">
            <span className="column-heading">Actions</span>
            {users.map((user) => (
              <div key={user._id} className="data-row">
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          <input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            value={formData.mobNo}
            onChange={(e) => setFormData({ ...formData, mobNo: e.target.value })}
          />
          <input
            type="text"
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          />
          {/* Render form fields for editing user data */}
          <button onClick={updateUser}>Update</button>
        </div>
      )}
    </div>
  );
}
