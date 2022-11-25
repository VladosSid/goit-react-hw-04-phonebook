import { Component } from 'react';
import { nanoid } from 'nanoid';

import FormContacts from './FormContacts';
import ContactList from './ContactList';
import FilterContacts from './FilterContacts';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(5),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  searchContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = ContactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== ContactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLocaleLowerCase();

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#010101',
        }}
      >
        <h1>Phoneboock</h1>
        <FormContacts onSubmit={this.addContact} listContacts={contacts} />
        <FilterContacts
          textTitel="Find contacts by name"
          filterData={filter}
          onChange={this.searchContact}
        />
        <ContactList
          listContacts={visibleContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
