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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/deleteClient/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
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

  const updateUser = async () => {
    try {
      const { _id } = selectedUser;
      const response = await axios.put(
        `/updateClient/${_id}`,
        formData
      );
      setUsers(users.map((user) => (user._id === _id ? response.data : user)));
      setSelectedUser(null); 
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  return (
    <div className="user-list">
      <h3 className="clients-heading">Clients</h3>
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
            <span className="column-heading">LastName</span>
            {users.map((user) => (
              <div key={user._id} className="data-row">
                {user.lastName}
              </div>
            ))}
          </div>
          <div className="column">
            <span className="column-heading">Email</span>
            {users.map((user) => (
              <div key={user._id} className="data-row">
                {user.email}
              </div>
            ))}
          </div>
          <div className="column">
            <span className="column-heading">MobNo.</span>
            {users.map((user) => (
              <div key={user._id} className="data-row">
                {user.mobNo}
              </div>
            ))}
          </div>
          <div className="column">
            <span className="column-heading">Project</span>
            {users.map((user) => (
              <div key={user._id} className="data-row">
                {user.project}
              </div>
            ))}
          </div>
          <div className="column actions-column">
            <span className="column-heading">Actions</span>
            {users.map((user) => (
              <div key={user._id} className="data-row">
                <button className="edit-button" onClick={() => editUser(user)}>
                  Edit
                </button>
                <div>| </div>
                <button
                  className="delete-button"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedUser && (
        <div className="edit-form">
          <h3>Edit Client</h3>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <input
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            value={formData.mobNo}
            onChange={(e) =>
              setFormData({ ...formData, mobNo: e.target.value })
            }
          />
          <input
            type="text"
            value={formData.project}
            onChange={(e) =>
              setFormData({ ...formData, project: e.target.value })
            }
          />
          <button onClick={updateUser}>Update</button>
        </div>
      )}
    </div>
  );
}
