import { useState, useEffect } from "react";

import UserList from "./component/UserList";
import "./App.css";

const App = () => {
  const url = "https://randomuser.me/api/?results=50";
  const [user, setUser] = useState([]);
  const [userAge, setUserAge] = useState("");

  useEffect(() => {
    fetch(url, {
      method: "GET",
      contentType: "application/json",
    })
      .then((response) => response.json())
      .then((data) => setUser(data.results));
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      <input type="number" placeholder="age" onChange={(e) => setUserAge(e.target.value)} />

      <div className="header">
        <section>Full Name</section>
        <section>Age</section>
        <section>Gender</section>
        <section>Email</section>
        <section>Tel</section>
      </div>

      {userAge == ""
        ? user.map((user) => <UserList key={user.email} user={user} />)
        : user
            .filter((u) => u.dob.age == userAge)
            .map((user) => <UserList key={user.email} user={user} />)}
    </div>
  );
};

export default App;
