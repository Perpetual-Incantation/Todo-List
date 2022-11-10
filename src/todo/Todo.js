import React from 'react'
import { IoIosListBox } from 'react-icons/io'
import './todo.css'
import { useState } from 'react'
import { useEffect } from 'react'
//import { IoIosAdd } from "react-icons/io";
const getLocalData =()=>{
  const list =localStorage.getItem("mytodo")
  if(list){
    return JSON.parse(list)
  }
  else{
    return []
  }
}

const Todo = () => {

  const [input,setInput]=useState([])
  const [items,setItems]=useState(getLocalData())
  const [edit,setEdit] =useState("")
  const [toggle,setToggle] =useState(false)
  const addItem =() =>{
    if(!input){
    alert('please fill the data')
    }
    else if(input && toggle){
      setItems(items.map((curelem)=>{
        if(curelem.id===edit){
        return {...curelem,name:input}
        }
        return curelem
      }))
      setInput([])
  setEdit(null)
  setToggle(false)
    }
    else{
      const mynewData ={
        id: new Date().getTime().toString(),
        name: input
      }
    setItems([...items,mynewData])
    setInput(' ') // used to empty the add item bar as after add setinput is empty
  }
}

const editItem =(idx) =>{
  const edit =items.find((curelem)=>{
    return curelem.id===idx
  })
setInput(edit.name)
  setEdit(idx)
  setToggle(true)
}

const deleteitem =(idx) =>{
  const updateitem = items.filter((curelem)=>{
    return curelem.id !== idx;
  })
setItems(updateitem)
}

const removeAll =()=>{
  setItems([])
}

//addingg local storage

useEffect(()=>{
  localStorage.setItem("mytodo",JSON.stringify(items))
},[items])

  return (


    <div>
      <div className="main-div">
      <div className="child-div">
        <figure>
          <IoIosListBox color='lightyellow' size={80}></IoIosListBox>
          <figcaption>Add your List here</figcaption>
        </figure>
        <div className="addItems">
       
          <input type="text"
          placeholder='Add items' 
          className='form-control'
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          />
          {toggle?( <i className='far fa-edit add-btn'
          onClick={addItem}></i>) :
          ( <i className='fa fa-plus add-btn'
          onClick={addItem}></i>)}
         
        </div>
      <div className="showItems">
      {items.map((curelem)=>{
        return(
          <div className="eachItem" key={curelem.id}>
          <h3>{curelem.name}</h3>
          <div className="todo-btn">
          <i className='far fa-edit add-btn'
          onClick={()=>editItem(curelem.id)}></i>
          <i className='far fa-trash-alt add-btn'
          onClick={()=>deleteitem(curelem.id)}></i>
          </div>
        </div>
        )

      })}
        
      </div>
      <div className="showItems">
        <button
         className='btn effect04'
          data-sm-link-text="Remove ALL"
          onClick={removeAll}>
          <span><h3>CHECK LIST</h3></span>
        </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
