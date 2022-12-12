import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import FormContacts from './FormContacts';
import ContactList from './ContactList';
import FilterContacts from './FilterContacts';

import { GlobalBox } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');
  const [filterResult, setFilterResult] = useState([]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(5),
      name,
      number,
    };

    setContacts(state => [contact, ...state]);
  };

  const deleteContact = ContactId => {
    setContacts(state => state.filter(contact => contact.id !== ContactId));
  };

  // get contactsfrom localStorage
  // useEffect(() => {
  //   const contactsLocal = localStorage.getItem('contacts');

  //   try {
  //     const contactsParse = JSON.parse(contactsLocal);
  //     console.log(contactsParse);

  //     setContacts(contactsParse);
  //     console.log(contactsParse);

  //     console.log(contacts);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);

  // add localStorage contacts
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const normalizedFilter = filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
    setFilterResult(visibleContacts);
  }, [filter, contacts]);

  return (
    <GlobalBox>
      <h1>Phoneboock</h1>
      <FormContacts onSubmit={addContact} listContacts={contacts} />
      <FilterContacts
        textTitel="Find contacts by name"
        filterData={filter}
        onChange={e => setFilter(e.currentTarget.value)}
      />
      <ContactList listContacts={filterResult} deleteContact={deleteContact} />
    </GlobalBox>
  );
};

export default App;
