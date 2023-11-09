import React, { useRef, useState } from 'react';
import './TodoApp.css';
import {FaEdit} from 'react-icons/fa';
import {MdOutlineDone, MdOutlineRemoveDone, MdDeleteOutline} from 'react-icons/md';

const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
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
    if (editIndex !== null) {
      allItems[editIndex] = inputValue;
      setEditIndex(null);
    } else {
      allItems.push(inputValue);
    }
    setTodoList(allItems);
    setInputValue('');
  };

  const deleteItem = (index) => {
    const allItems = [...todoList];
    allItems.splice(index, 1);
    setTodoList(allItems);
    if (editIndex === index) {
      setEditIndex(null);
      setInputValue('');
    }
  };

  const editItem = (index) => {
    const editedValue = todoList[index];
    setInputValue(editedValue);
    setEditIndex(index);
    inputRef.current.focus();
  };

  const completeItem = (index) => {
    const updatedItems = [...todoList];
    const completedItem = updatedItems.splice(index, 1)[0];
    setCompletedList([...completedList, completedItem]);
    setTodoList(updatedItems);
  };

  const uncompleteItem = (index) => {
    const updatedItems = [...completedList];
    const uncompletedItem = updatedItems.splice(index, 1)[0];
    setTodoList([...todoList, uncompletedItem]);
    setCompletedList(updatedItems);
  };

  return (
    <div className='todo-container'>
      <form className='input-form' onSubmit={storeItems}>
        <h1>React application</h1>
        <input
          id='typing'
          ref={inputRef}
          onChange={handleChange}
          type='text'
          placeholder='Enter the items..'
          value={inputValue}
        />
        <button type='submit'>{editIndex !== null ? 'Update Item' : 'Add Item'}</button>
      </form>
      <div>
        <ul>
          {todoList.map((data, index) => (
            <li key={index}>
              <span>{data}</span>
              <div className='buttons'>
                <i>
                  <button type='solid' title='Delete' name='trash-alt' onClick={() => deleteItem(index)}><MdDeleteOutline/></button>
                </i>
                <i>
                  <button type='solid' title='Edit' name='edit' onClick={() => editItem(index)}><FaEdit/></button>
                </i>
                <i>
                  <button type='solid' title='Complete' name='check-square' onClick={() => completeItem(index)}><MdOutlineDone/></button>
                </i>
              </div>
            </li>
          ))}
        </ul>
        {completedList.length > 0 && (
          <div>
            <h2>Completed</h2>
            <ul>
              {completedList.map((data, index) => (
                <li key={index}>
                  {data}
                  <i>
                    <button type='solid' title='Uncomplete' name='up-arrow-alt' onClick={() => uncompleteItem(index)}><MdOutlineRemoveDone/></button>
                  </i>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
