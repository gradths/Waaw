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

const initialState = {
  name:"",
  age: "",
  date: "",
  time: "",
  missing: "",
  email: "",
  ContactNumber: "",
  PetName: "",
  PetDescription: "",
  PetGender : ""


}

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

//SORTING
 const[sortedData, setSortedData] = useState([]);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");


//search na maangas
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);

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

//SORTING 
const handleChange= (e) => {
  setSort(true);
  db.child("users")
  .orderByChild(`${e.target.value}`)
  .on("value",(snapshot)=>{
    let sortedData = [];
    snapshot.forEach((snap)=>{
      sortedData.push(snap.val())
    });
    setSortedData(sortedData); 
  })
};

const handleReset= () => {
  setSort(false);
  db.child("users").on("value", (snapshot) =>{
    if (snapshot.val() !== null) {
      setSortedData({ ...snapshot.val()});
    } else {
      setSortedData({});
    }
  });
};

// FILTERING

useEffect(() => {
  db.collection("users")
    .where("category", "==", category)
    .get()
    .then((snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id,
        });
        return data;
      });

      setCourses(data);
    })
    .catch((e) => {
      console.log(e);
    });
}, [category]);

return courses;
}

const courses = useCourses();




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
    






{/* FILTERING */}
<label className="border-2 m-2">masaya O malungkot?</label>




{/*4---------------------------------------------------------------------------------------------------- */}
     {!sort && (
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
     )}
<div>
      {sort && (
        <tbody>
        {sortedData.map((item, index)=> {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.missing}</td>
              <td>{item.email}</td>
              <td>{item.ConatactNumber}</td>
              <td>{item.PetName}</td>
              <td>{item.PetDescription}</td>
              <td>{item.PetGender}</td>
            </tr>
          )
        })}
        </tbody>
      )}
  
</div>
        {/* SORTING */}
<label className="border-2 m-2"> Sort By: </label>
<select className="dropdown border-2 m-2" name="colValue" onChange={handleChange}>
  <option> Please Select </option>  
  <option value="name"> Name </option>
  <option value="age"> Age</option>
  <option value="date"> Date</option>
  <option value="time"> Time </option>
  <option value="missing"> Status</option>
  <option value="email"> Email</option>
  <option value="ContactNumber"> Contact Number </option>
  <option value="PetName"> Pet's Name </option>
  <option value="PetDescription"> Pet Description </option>
  <option value="PetGender"> Pet's Gender </option>

</select>
<button className="border-2 m-2" onClick={handleReset}>
  Reset
</button>



    </div>

    



  );


export default App;


