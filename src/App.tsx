import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import AppNavBar from './components/AppNavBar';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')|| '{}'));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item:any) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      showAlert(true, 'success', 'item added successfully');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };
  const removeItem = (id:any) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item:any) => item.id !== id));
  };
  const editItem = (id:any) => {
    const specificItem = list.find((item:any) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    
      <div>
        <AppNavBar/>
      
        <section className='section-center'>
          <form className='grocery-form' onSubmit={handleSubmit}>
            {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

            <h3>shopping item</h3>
            <div className='form-control'>
              <input
                type='text'
                className='grocery'
                placeholder='add Item'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className='empty-space'></div>
              <button type='submit' className='submit-btn'>
                {isEditing ? 'edit' : 'Add'}
              </button>
            </div>
          </form>
          {list.length > 0 && (
            <div className='grocery-container'>
              <List items={list} removeItem={removeItem} editItem={editItem} />
              <button className='clear-btn' onClick={clearList}>
                clear items
              </button>
            </div>
          )}
        </section>
    </div>
  );
}

export default App;
