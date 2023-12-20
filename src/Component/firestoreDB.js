import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { database } from "./firebase";
import { useState, useEffect } from "react";
import { uid } from "uid";

function FirestoreDB() {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [number, setNumber] = useState();
    const [contacts, setContacts] = useState([]);

    const handleFirstChange = (e) => {
        setFirst(e.target.value)
    }
    const handleLastChange = (e) => {
        setLast(e.target.value)
    }
    const handleNumberChange = (e) => {
        setNumber(e.target.value)
    }
    //read
    useEffect(() => {
        const db = database;
        const collectionRef = collection(db, "contacts");

        const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
            const contactsData = [];
            querySnapshot.forEach((doc) => {
                contactsData.push(doc.data());
            });
            setContacts(contactsData);
        });

        return () => unsubscribe();
    }, []);
    //write
    const writeToDatabase = async () => {
        const db = database;
        const id = uid();
        const docRef = await addDoc(collection(db, "contacts"), {
            id:id,
            first: first,
            last: last,
            number: number
        });
        setFirst("");
        setLast("");
        setNumber("");
    }
    //delete
    
    return (
        <div className="main_">
            <div className="mainAdd">
                <div className="mainAddDiv">
                    <h3>Ajouter un contact </h3>
                    <div className="mainAddFirst">
                        <label>first: </label>
                        <input type='text' value={first} onChange={handleFirstChange} />
                    </div>
                    <div className="mainAddLast">
                        <label>last: </label>
                        <input type='text' value={last} onChange={handleLastChange} />
                    </div>
                    <div className="mainAddNumber">
                        <label>number: </label>
                        <input type='text' value={number} onChange={handleNumberChange} />
                    </div>
                    <button onClick={writeToDatabase}>submit</button>
                </div>
            </div>
            <div className="mainList">
                <h3>Liste des contacts:</h3>
                {contacts.map((contact) => (
                    <div>
                    <hr></hr>
                        <p> firstName: {contact.first} </p>
                        <p> lastName: {contact.last} </p>
                        <p>number: {contact.number} </p>
                        {/* <div>
                            <button>update</button>
                            <button>delete</button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FirestoreDB;