import "../App.css";

export default function UserList({ user }) {
  return (
    <div className="content">
      <section>{`${user.name.first} ${user.name.last}`}</section>
      <section>{user.dob.age}</section>
      <section>{user.gender}</section>
      <section>{user.email}</section>
      <section>{user.phone}</section>
    </div>
  );
}
