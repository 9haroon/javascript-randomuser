import "./UserModal.scss";

const UserModal = ({ user, closeModal }) => {
  console.log(user);
  return (
    <div className="modal" onClick={closeModal} >
      <div className="profile">
        <img src={user.picture.large} alt="picture-profile" />
        <div>
          <div>
            <strong>Name:</strong> {`${user.name.title} ${user.name.first} ${user.name.last}`}
          </div>
          <div><strong>Date:</strong> {user.dob.date}</div>
          <div><strong>Age:</strong> {user.dob.age} years old</div>
          <div><strong>Gender:</strong> {user.gender}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Tel:</strong> {user.phone}</div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
