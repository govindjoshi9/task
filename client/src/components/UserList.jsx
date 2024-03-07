import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
  const [user, setUser] = useState([]);
  useEffect(() => {
      axios.get("http://localhost:8080/").then(({ data }) => {
        setUser(data)
    });
  }, []);
    
    
    return (
      <div>
        {user.length > 0 &&
          user.map((users, id) => (
            <div key={id}>
              <div>
                {users.name}{" "}
                <span>{users.lastName}</span>
              </div>
              <span>{users.email}</span>
              <br />
              <span>{users.mobNo}</span>
              <br />
              <span>{users.project}</span>
            </div>
          ))}
      </div>
    );
}
