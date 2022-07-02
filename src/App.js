import React, { useEffect, useState } from 'react';
import {AddUser} from './components/AddUser'
import {User} from './components/User';
import './style.css';

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
    console.log(data)

  };
  const onAdd = async (name, email) => {
    await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })

      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };
const onEdit=async (id,name,email)=>{
  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
    method:"PUT",
    body:JSON.stringify({
      name:name,
      email:email
    }),
    headers:{
      "Content-type":"apllication/json",
    }
  })
  .then((response)=>{
    if(response.status!==200){
      return ;
    }
    else {
      return response.json();
    }
  })
  .then((data)=>{
  const updatedUsers=users.map((user)=>{
    if(user.id===id){
      user.name=name;
      user.email=email;
    }
    return user;
  
  })
setUsers((users)=>updatedUsers);
})
.catch((error)=>console.log(error));
}
const onDelete=async(id)=> {
await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{

  method:"DELETE"
})
.then((response)=>{
  if(response.status!=200){
    return;
  }
  else {
    setUsers(
      users.filter((user)=>{
        return user.id !==id;
      })
    )
  }
})
.catch((error)=>console.log(error));
}

return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <AddUser onAdd={onAdd} />
      {users.map((user) => (
        <User
          id={user.id}
          key={user.id}
          name={user.name}
          email={user.email}
          onEdit={onEdit}
          onDelete={onDelete}
          
         />
      ))}
    </div>
  );
}
