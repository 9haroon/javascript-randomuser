import { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const url = "https://randomuser.me/api/?results=5";
  const [user, setUser] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      contentType: "application/json",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.table(data.results);
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
      <h1>Random Users</h1>

      {/* User List */}
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
      {user.map((user) => {
        return (
          <div key={user.email} className="content">
            <section>{`${user.name.first} ${user.name.last}`}</section>
            <section>{user.dob.age}</section>
            <section>{user.gender}</section>
            <section>{user.email}</section>
            <section>{user.phone}</section>
          </div>
        );
      })}
    </div>
  );
};

export default App;
