import { collection, addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { database } from "./firebase";
import { useState, useEffect } from "react";

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
                contactsData.push({ id: doc.id, ...doc.data() });
            });
            setContacts(contactsData);
        });

        return () => unsubscribe();
    }, []);
    //write
    const writeToDatabase = async () => {
        const db = database;
        if (first != "" && last != "" && number != "") {
            const docRef = await addDoc(collection(db, "contacts"), {
                first: first,
                last: last,
                number: number
            });
            setFirst("");
            setLast("");
            setNumber("");
        }
    }
    //delete
    const deleteFromDatabase = async (id) => {
        const db = database;
        const contactRef = doc(db, "contacts", id);
    
        try {
            await deleteDoc(contactRef);
            console.log("Contact deleted successfully");
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    }

    return (
        <div className="main_">
            <div className="mainAdd">
                <div className="mainAddDiv">
                    <h3>Ajouter un contact </h3>
                    <div className="mainAddFirst">
                        <label>first: </label>
                        <input type='text' value={first} onChange={handleFirstChange} required />
                    </div>
                    <div className="mainAddLast">
                        <label>last: </label>
                        <input type='text' value={last} onChange={handleLastChange} required />
                    </div>
                    <div className="mainAddNumber">
                        <label>number: </label>
                        <input type='text' value={number} onChange={handleNumberChange} required />
                    </div>
                    <button onClick={writeToDatabase}>submit</button>
                </div>
            </div>
            <div className="mainList">
                <h3>Liste des contacts:</h3>
                <div style={{overflow: 'auto', maxHeight: '60vh' }}>
                    {contacts.map((contact) => (
                        <div>
                        <hr></hr>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingRight:'10%' }}>
                                <div>
                                    <p> firstName: {contact?.first} </p>
                                    <p> lastName: {contact?.last} </p>
                                    <p>number: {contact?.number} </p>
                                </div>
                                <button style={{border:'none', backgroundColor:'red', opacity:'0.6', cursor:'pointer', padding:'2px 5px', color:'white', borderRadius:'5px', height:'30px'}} onClick={() => deleteFromDatabase(contact?.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FirestoreDB;