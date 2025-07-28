'use client';

import style from "@/css/home.module.css";
import edit from "@/public/edit.svg";
import Image from "next/image";
import deleteIcon from "@/public/delete.svg";
import { useEffect,useState } from "react";

export default function Home(){
type User = {
  _id: string;
  name: string;
  email: string;
  age: string;
  role: string;
};

const [users , setUsers] = useState<User[]>([]);
const [form, setForm ] = useState({name:"" , email:"", age:"", role:""});
const [editId, setEditId] = useState<string | null>(null);

const fetchUsers = async () => {
  try{
    const res = await fetch('/api/ab');
    const data = await res.json();
    setUsers(data);
  }catch (error){
    console.error("Error fetching users:", error);

  }
};

const handleSubmit = async () => {
  try {
    await fetch(editId ? `/api/ab/${editId}`: '/api/ab',{
      method : editId ? 'PUT' : 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),

    });
    setForm({
      name:"",
      email:"",
      age:"",
      role:""
    })
setEditId(null);
fetchUsers();
  }catch (error){
    console.error("Error submitting form:", error);
}
};
interface HandleDelete {
  (id: string): Promise<void>;
}

const handleDelete: HandleDelete = async (id) => {
  try {
    await fetch(`/api/ab/${id}`,{
      method: 'DELETE',
    });
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
useEffect(() =>{ fetchUsers();}, []);



  return(
    <>
    <div className={style.main}>
      <h1><i>Enter your Information</i></h1>
      <div className={style.master}>
        
        <div className={style.content}>
        <input 
        type="text"
        className={style.input}
        placeholder="Enter your Name"
        value={form.name}
        onChange={(e)=> setForm({...form, name: e.target.value})}
        />
        </div>
        <div className={style.content}>
        <input 
        type="text"
        className={style.input}
        placeholder="Enter your E-mail"
        value={form.email}
        onChange={(e)=> setForm({...form,email: e.target.value})}
        />
        </div>
        <div className={style.content}>
        <input 
        type="text"
        className={style.input}
        placeholder="Enter your Age"
        value={form.age}
        onChange={(e)=> setForm({...form, age: e.target.value})}
        />
        </div>
        <div className={style.content}>
        <input 
        type="text"
        className={style.input}
        placeholder="Enter your Role"
        value={form.role}
        onChange={(e)=> setForm({...form, role: e.target.value})}
        />
        </div>
        <div className={style.button}>
          <button onClick={handleSubmit}>{editId ? "Update":"Add"}User</button>
        </div>
        <ul className={style.ul}>
          {users.map(users =>  (
<li key={users._id} className={style.li}>
  {users.name}-{users.email}-{users.age}-{users.role}
            <button onClick={()=>{setForm(users);setEditId(users._id);}}><Image className={style.Img} src={edit} alt="edit" /></button>
            <button onClick={() => handleDelete(users._id)}><Image className={style.Img} src={deleteIcon} alt="delete"/> </button>
          </li>
          ))}
          
        </ul>
      </div>
    </div>
    </>
  )
}
