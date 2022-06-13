import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
//1----------------------------------------------------------------------------------------------------
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newLostOrFound, setNewLostOrFound] = useState("");
  const [newEmail, setNewEmail] = useState(""); 
  const [newContactNumber, setNewContactNumber] = useState(0);
  const [newPetName, setNewPetName] = useState(""); 
  const [newPetDescription, setNewPetDescription] = useState(""); 
  const [newPetGender, setNewPetGender] = useState(""); 


  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");


//search na maangas
  const [search, setSearch] = useState("");


//2----------------------------------------------------------------------------------------------------
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: String (newName), age: Number(newAge), date: (newDate), missing: String(newLostOrFound), 
    time: (newTime), email: String(newEmail), ContactNumber: Number(newContactNumber), PetName: String(newPetName),
    PetDescription: String(newPetDescription), PetGender: String(newPetGender)

  });
  };


  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);




  
// USER SEARCH CONST
const SearchUser=(e)=>{
  e.preventDefault();
  setUsers(users.filter((users)=>
    users.PetName.toLowerCase().includes(search.toLowerCase())||
    users.name.toLowerCase().includes(search.toLowerCase())
    
  ));
}







//3----------------------------------------------------------------------------------------------------
  return (
    <div className="App" >
      <div className="flex flex-wrap m- 2">
      <input 
 
        className="border-2 m-2"
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
       className="border-2 m-2"
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
       <input
         className="border-2 m-2"
        type="date"
        placeholder="Date..."
        onChange={(event) => {
          setNewDate(event.target.value);
        }}
      /> 
      <input
         className="border-2 m-2"
        type="time"
        placeholder="Time..."
        onChange={(event) => {
          setNewTime(event.target.value);
        }}
      /> 
        <input
         className="border-2 m-2"
        placeholder="Status.."
        onChange={(event) => {
          setNewLostOrFound(event.target.value);
        }}
       /> 
        <input
         className="border-2 m-2"
        type="email"
        placeholder="Email..."
        onChange={(event) => {
          setNewEmail(event.target.value);
        }}
      /> 
       <input
       type='number'
         className="border-2 m-2"
        placeholder="Contact Number"
        onChange={(event) => {
          setNewContactNumber(event.target.value);
        }}
      /> 
      <input
         className="border-2 m-2"
        placeholder="Pet's Name"
        onChange={(event) => {
          setNewPetName(event.target.value);
        }}
      /> 
      <input
         className="border-2 m-2"
        placeholder="Pet's Description"
        onChange={(event) => {
          setNewPetDescription(event.target.value);
        }}
      /> 
      <input
         className="border-2 m-2"
        placeholder="Pet's Gender"
        onChange={(event) => {
          setNewPetGender(event.target.value);
        }}
      /> 

      <button onClick={createUser}  className="border-2 m-2"> Create User</button>
      </div>

  {/* SEARCH BUTTON */}
    <form onSubmit={(e)=>{SearchUser(e)}}>
      <input  className="border-2 m-2" onChange={(e)=>{setSearch(e.target.value)}}/>
      <button type="submit"  className="border-2 m-2"> Search </button>
    </form>
{/*4---------------------------------------------------------------------------------------------------- */}
      <div className="flex flex-wrap">
      {users.map((user) => {
        return (
          <div className="ml-10 border-4 mt-5 w-1/4 p-2">
            {" "}
            <h3>Name: {user.name}</h3>
            <h3>Age: {user.age}</h3>
            <h3>Date: {user.date}</h3>
            <h3>Time: {user.time} </h3>
            <h3>Status: {user.missing}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Contact Number: {user.ContactNumber}</h3>
            <h3>Pet's Name: {user.PetName}</h3>
            <h3>Pet's Description: {user.PetDescription}</h3>
            <h3>Pet's Gender: {user.PetGender}</h3>
            
           
            <button
              className="border-2"
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete File
            </button>
          </div>
        );
      })}
    </div>
    </div>

    
  );
}

export default App;


