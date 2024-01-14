import axios from "axios";
import { useState, useEffect } from "react";

export function UsersIndex() {
  const [users, setUsers] = useState([]);

  const handleGetUsers = () => {
    axios.get("http://localhost:3000/users.json").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  useEffect(handleGetUsers, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
}
