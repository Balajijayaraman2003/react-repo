import React, { useState } from 'react'
import './Content.css'
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
function Content() {
  let [items, setItems] = useState([
    { id: 1, label: "Html & Css", checked: true },
    { id: 2, label: "JavaScript", checked: true },
    { id: 3, label: "React Js", checked: false },
  ])
  let [inpt, setInpt] = useState("")
  let [isEdit, setIsEdit] = useState(false)
  let [CurrentElementId,setCurrentElementId] = useState(null)
  let error = document.getElementById("error")
  function HandleInput(event) {
    setInpt(event.target.value)
  }

  function HandleCheck(id) {
    let newListItems = items.map((item) => {
      return id === item.id ? { ...item, checked: !item.checked } : item
    })
    setItems(newListItems)
  }
  function HandleAddorUpdate() {
  if(isEdit)
  {
    let newListItems = items.map((item)=>{
      console.log(CurrentElementId);
      return item.id === CurrentElementId ? {...item,label:inpt} : item
    })
    setItems(newListItems)
    setInpt("")
    setCurrentElementId(null)
    setIsEdit(false)
  }
    else{
    if (inpt != "") {
      setItems(
        [...items, { id: items.length + 1, label: inpt, checked: false }]
      )
      setInpt("")
      error.innerText=" "
    }
    else{
      error.innerText="Enter Valied Item "
    }
  }
    
  }
  function HandleUpdate(id)
  {
    setIsEdit(true)
    let newListItem = items.find((item)=>{
      return id===item.id
    })
    setCurrentElementId(id)
    setInpt(newListItem.label)
  }
  function HandleDelete(id) {
    let newListItems = items.filter((item) => {
      return id !== item.id
    })
    setItems(newListItems)
  }
  return (
    <div className="Mycontent">
      <input type="text" value={inpt} onChange={HandleInput} />
      <button onClick={HandleAddorUpdate}>{isEdit ? "Save" : "Add"}</button>
      <ul>
        {
          items.map((item, index) => {
            return <li key={item.id}>
              <input type="checkbox" checked={item.checked} onChange={() => HandleCheck(item.id)} value={inpt} />
              <label htmlFor="">{item.label}</label>
              <FaRegEdit role="button" tabIndex={0} onClick={()=>HandleUpdate(item.id)} />
              <FaTrashCan role='button' tabIndex={0} onClick={() => HandleDelete(item.id)} />
            </li>
          })
        }
      </ul>
      <div id="error"></div>
    </div>
  )
}

export default Content