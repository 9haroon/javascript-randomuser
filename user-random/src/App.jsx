import { useState, useEffect } from "react";

import Paginate from "./component/Paginate";
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
      <input
        type="number"
        placeholder="age"
        onChange={(e) => setUserAge(e.target.value)}
      />

      <div className="main">
        <div className="header">
          <section>Full Name</section>
          <section>Age</section>
          <section>Gender</section>
          <section>Email</section>
          <section>Tel</section>
        </div>

        {userAge == "" ? (
          <Paginate user={user} />
        ) : (
          user
            .filter((u) => u.dob.age == userAge)
            .map((index, user) => <UserList key={index} user={user} />)
        )}
      </div>
    </div>
  );
};

export default App;
