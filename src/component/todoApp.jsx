import React, { useRef, useState } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const storeItems = (event) => {
    event.preventDefault();
    const allItems = [...todoList];
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '' || todoList.includes(trimmedValue)) {
      return false;
    }
    allItems.push(inputValue);
    setTodoList(allItems);
    setInputValue('');
  };

  const deleteItem = (index)=>{ 
    const allItems = [...todoList];
    allItems.splice(index,1)
    setTodoList(allItems);
  }

  return (
    <div className='todo-container'>
      <form className='input-form' onSubmit={storeItems}>
        <h1>Todo List</h1>
        <input
          id='typing'
          ref={inputRef}
          onChange={handleChange}
          type='text'
          placeholder='Enter the items..'
          value={inputValue}
        />
        <button type='submit'>Add Item</button>
      </form>
      <div>
        <ul>
          {todoList.map((data, index) => (
            <li key={index}>
              {data} <i><box-icon type='solid' name='trash-alt' onClick={()=>deleteItem(index)} ></box-icon>  </i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
