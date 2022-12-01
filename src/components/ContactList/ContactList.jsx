import { ContactsList } from './ContactList.styled';
import PropTypes from 'prop-types';

const ContactList = ({ listContacts, deleteContact }) => {
  return (
    <ContactsList>
      {listContacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button type="button" onClick={() => deleteContact(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ContactsList>
  );
};
export default ContactList;

ContactList.prototype = {
  listContacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};
