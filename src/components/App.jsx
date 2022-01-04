import React, { Component } from "react";
import Section from "./Section/Section.jsx";
import Form from "./Form/Form.jsx";
import Contacts from "./Contacts/Contacts.jsx";
import Filter from "./Filter/Filter.jsx";
import { nanoid } from 'nanoid';
import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }
  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((element) => element.id !== id),
    }));
  };

  handleSearch = e => {
    this.setState({ filter: e.target.value });
  }
  submit = (e, name, number, reset) => {
    e.preventDefault();
    const { contacts } = this.state;
    if (!contacts.find((item) => item.name === name)) {
      this.setState({contacts: [...this.state.contacts, { name: name, number: number, id: nanoid() }]});
      reset();
    } else {
      info({ text: `${name} is already in contacts.`, delay: 700 });
    }
  };

  render() {
    const search = this.state.filter.toLocaleLowerCase();
    const visibleContacts = this.state.contacts.filter((element) => element.name.toLocaleLowerCase().includes(search));
    return (
      <>
        <Section title="Phonebook">
          <Form submit={this.submit} />
        </Section>
        <section>
          <h2>Contacts</h2>
          <Filter name={this.state.name} handler={(e) => this.handleSearch(e)} search = {(e) => this.search(e)}/>
          <Contacts contacts = {visibleContacts} deleteContact={this.deleteContact}/>
        </section>
      </>
    );
  }
}

export default App;