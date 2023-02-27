import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Message from 'components/Message';
import {
  Container,
  Section,
  SectionsContainer,
  Title,
  SectionTitle,
} from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentContacts = this.state.contacts;

    if (currentContacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(currentContacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    const normalizedName = name.toLowerCase();

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      return alert(`${name} is already in contacts!`);
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    const { addContact, filterContacts, deleteContact, state } = this;

    return (
      <Container>
        <Title>Phonebook</Title>
        <SectionsContainer>
          <Section>
            <SectionTitle>Add contact</SectionTitle>
            <ContactForm onSubmit={addContact} />
          </Section>
          <Section className="contacts">
            <SectionTitle>Contacts</SectionTitle>
            {state.contacts.length !== 0 ? (
              <>
                <Filter value={state.filter} onChange={filterContacts} />
                <ContactList
                  contacts={filteredContacts}
                  onDeleteButton={deleteContact}
                />
              </>
            ) : (
              <Message message="There are no contacts in your phonebook. Please add your first contact!" />
            )}
          </Section>
        </SectionsContainer>
      </Container>
    );
  }
}

export default App;
