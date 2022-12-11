import { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Label, InputContact } from './FormContacts.styled';

export default function FormContacts({ onSubmit, listContacts }) {
  const [name, setName] = useState('');
  const [number, setNumver] = useState('');

  const recordContact = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumver(value);
        break;

      default:
        return;
    }
  };

  const handlSubmit = () => {
    onSubmit(name, number);
    setName('');
    setNumver('');
  };

  const checkMatches = e => {
    e.preventDefault();

    const normalizedFilter = name.toLocaleLowerCase();

    const checkName = listContacts.some(
      contact => contact.name.toLocaleLowerCase() === normalizedFilter
    );

    checkName ? alert(`${name} is already in contacts.`) : handlSubmit();
  };

  return (
    <Form onSubmit={checkMatches}>
      <Label htmlFor="name">
        Name
        <InputContact
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={recordContact}
        />
      </Label>
      <Label htmlFor="number">
        Number
        <InputContact
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={recordContact}
        />
      </Label>
      <button type="submit">Add contact</button>
    </Form>
  );
}
// }

FormContacts.propTypes = {
  listContacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};
