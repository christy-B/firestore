import { db } from './firebase';
import { uid } from "uid";
import { set, ref, onValue, off } from "firebase/database";
import { useState, useEffect } from "react";

function RealtimeDB() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  //read
  useEffect(() => {

    onValue(ref(db, 'users/'), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const usersArray = Object.values(data); // Convertit les valeurs de l'objet en tableau
        setUsers(usersArray);
      } else {
        setUsers([]); // Si les données sont nulles, mettez l'état "todos" à un tableau vide
      }
    });
  }, []);

  //write
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `users/` + uuid), {
      name: name,
      email: email,
      uuid: uuid
    });
  
    setName("");
    setEmail("");
  };

  return (
    <div className="App">
      <div>
        <label>name: </label>
        <input type='text' value={name} onChange={handleNameChange}/>
      </div>
      <div>
        <label>email: </label>
        <input type='text' value={email} onChange={handleEmailChange}/>
      </div>
      <button onClick={writeToDatabase}>submit</button>
      {users.map((user) => (
        <div key={user}>
          <h1>{user.name}: {user.email}</h1>
          <button>Update</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default RealtimeDB;
