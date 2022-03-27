import { useState, useEffect } from "react";

import UserList from "./UserList";
import "./App.css";

const App = () => {
  const url = "https://randomuser.me/api/?results=50";
  const [user, setUser] = useState([]);
  const [userAge, setUserAge] = useState("");
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      contentType: "application/json",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results);
      });
  }, []);

  const sortMax = (data) => {
    setSort(false);
    setUser(data.slice().sort((a, b) => b.dob.age - a.dob.age));
  };

  const sortMin = (data) => {
    setSort(true);
    setUser(data.slice().sort((a, b) => a.dob.age - b.dob.age));
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <input type="number" onChange={(e) => setUserAge(e.target.value)} />

      <div className="header">
        <section>Full Name</section>
        <section>
          <div>Age</div>
          {sort === true ? (
            <div onClick={() => sortMax(user)}>&#8651;</div>
          ) : (
            <div onClick={() => sortMin(user)}>&#8652;</div>
          )}
        </section>
        <section>Gender</section>
        <section>Email</section>
        <section>Tel</section>
      </div>

      {user
        .filter((u) => u.dob.age == userAge)
        .map((user) => (
          <UserList key={user.email} user={user} />
        ))}

      {userAge == "" &&
        user.map((user) => <UserList key={user.email} user={user} />)}
    </div>
  );
};

export default App;
