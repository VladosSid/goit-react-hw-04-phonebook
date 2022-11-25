import { ContactsList } from './ContactList.styled';

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
