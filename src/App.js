import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState(1);

  const addItem = () => {
    const newItem = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      name: inputValue.trim(),
      priority: priority
    };
  
    if (newItem.name !== '') {
      setItems(prevItems => [...prevItems, newItem]);
      setInputValue('');
      setPriority(1);
    }
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePriority = (id, newPriority) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          if(newPriority <= 3 && newPriority > 0)
          {
            return { ...item, priority: newPriority };
          }
          else
          {
            return item;
          }
          
        } else {
          return item;
        }
      })
    );
  };

  const moveItemToTop = (id) => {
    const index = items.findIndex((item) => item.id === id);
    const item = items[index];
    setItems([item, ...items.filter((item, i) => i !== index)]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(Number(e.target.value));
  };

  return (
    <div className='container'>
      <h1>My Wish List</h1>
      <hr />
      <br />
      <div className='innerDiv'>
        <label><strong>Add item to the WISH LIST</strong></label>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder='Enter Item'/>
        <select value={priority} onChange={handlePriorityChange}>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h4>{item.name} - {item.priority}</h4>
            <button onClick={() => removeItem(item.id)}>Remove</button>
            <button onClick={() => updatePriority(item.id, item.priority + 1)}>Increase Priority</button>
            <button onClick={() => updatePriority(item.id, item.priority - 1)}>Decrease Priority</button>
            <button onClick={() => moveItemToTop(item.id)}>Move to Top</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
