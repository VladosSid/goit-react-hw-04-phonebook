import { Component } from 'react';

import { Form, Label, InputContact } from './FormContacts.styled';

class FormContacts extends Component {
  state = {
    name: '',
    number: '',
  };

  recordContact = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlSubmit = () => {
    this.props.onSubmit(this.state);
    return this.reset();
  };

  checkMatches = e => {
    e.preventDefault();
    const { name } = this.state;
    const { listContacts } = this.props;

    const normalizedFilter = name.toLocaleLowerCase();

    const checkName = listContacts.some(
      contact => contact.name.toLocaleLowerCase() === normalizedFilter
    );

    checkName
      ? alert('Rosie Simpson is already in contacts.')
      : this.handlSubmit();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Form onSubmit={this.checkMatches}>
        <Label htmlFor="name">
          Name
          <InputContact
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.recordContact}
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
            value={this.state.number}
            onChange={this.recordContact}
          />
        </Label>
        <button type="submit">Add contact</button>
      </Form>
    );
  }
}
export default FormContacts;
