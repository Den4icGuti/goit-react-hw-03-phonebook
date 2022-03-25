import React, { Component } from "react";
import Form from './Form/Form';
import UserList from './UserList/UserList';
import Filter from './Filter/Filter';
import { nanoid } from "nanoid";
 import data from './data/data.json';




class App extends Component {

  state = {
    contacts: data,
    filter:''
  }

  //===Метод добавления нового пользователя===//

  addContact = ({ name, number }) => { 
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => { 
      if (contacts.some((contact) => contact.name === name)) { 
        return alert(`${name} is already in contacts.`)
      }
      return {
         contacts: [contact,...contacts]
      }
    })
  }

  //===Монтирование компонента==//
  componentDidMount() { 
    const contacts = localStorage.getItem("contacts");
    const parceContacts = JSON.parse(contacts);

    if (parceContacts) { 
       this.setState({ contacts: parceContacts });
    }
    return parceContacts;
  }

  //===Обновление компонента componentDidUpdate, сохраняем новый контакт в локальное хранилище===//
  componentDidUpdate(prevProps, prevState) { 
    if (this.state.contacts !== prevState.contacts) { 
     localStorage.setItem('contacts',JSON.stringify(this.state.contacts))
    }
  }

  componentWillUnmount() { 
    console.log('Размонтирование компонента');
  }
  
  
  //==Метод удаления контактов по id==//

  onDeleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };
  
  //===Метод меняeющий соcтояния поля Filter===//
  onChangeFilter = e => { 
    this.setState({ filter: e.currentTarget.value})
    
  }

  //===Метод который ищет пользователя по имени===//
  onSerchByName = () => {
    const { filter, contacts } = this.state;
    const normaLize = filter.toLowerCase();
     return contacts.filter(contact =>contact.name.toLowerCase().includes(normaLize))
  };
  
  render() { 
    const { filter } = this.state;
    const visibleContacts = this.onSerchByName();
    return (
      <div>
        <Form
          onSubmit={this.addContact} />
       <Filter
          title="Contacts"
          value={filter}
          onChange={this.onChangeFilter}
        />
        <UserList
          item={visibleContacts}
         deleteContact={this.onDeleteContact}
        />
      </div>
     );
  }
}

 
export default App;