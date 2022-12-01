import { Component } from 'react';
import { nanoid } from 'nanoid';

import FormContacts from './FormContacts';
import ContactList from './ContactList';
import FilterContacts from './FilterContacts';

class App extends Component {
  state = {
    contacts: [],
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

  // get contactsfrom localStorage
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    this.setState({
      contacts: JSON.parse(contacts).contacts,
    });
  }

  // add localStorage contacts
  componentDidUpdate(prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('contacts', JSON.stringify(this.state));
    }
  }
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
