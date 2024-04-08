import "./UserCard.scss";

const UserCard = ({ user, handleClick }) => {
  return (
    <div className="UserCard" onClick={() => handleClick(user)}>
      <img src={user.picture.medium} alt="picture-profile" />
      <section>{`${user.name.title} ${user.name.first} ${user.name.last}`}</section>
      <section>age: {user.dob.age} years old</section>
      <section>{user.email}</section>
      <section>Tel. {user.phone}</section>
    </div>
  );
};

export default UserCard;
