import { useState, useEffect } from "react";

import Paginate from "./component/Paginate";
import UserCard from "./component/UserCard";
import UserModal from "./component/UserModal";

import "./App.scss";

const App = () => {
  const url = "https://randomuser.me/api/?results=102";
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [age, setAge] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filterUser = users.filter((u) => u.dob.age == age)

  useEffect(() => {
    fetch(url, {
      method: "GET",
      contentType: "application/json",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data.results));
  }, []);

  const handleClick = (data) => {
    setUser(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <input
        type="number"
        placeholder=":age"
        onChange={(e) => setAge(e.target.value)}
      />
      <hr />

      {age == "" ? (
        <Paginate
          users={users}
          handleClick={handleClick}
          closeModal={closeModal}
        />
      ) : filterUser.length != 0 ? (
        <div className="Cards">
          {filterUser.map((user, index) => (
              <UserCard key={index} user={user} handleClick={handleClick} />
            ))}
        </div>
      ) : (
        <div className="NoData">No Data</div>
      )}

      {showModal == true && <UserModal user={user} closeModal={closeModal} />}
    </div>
  );
};

export default App;
