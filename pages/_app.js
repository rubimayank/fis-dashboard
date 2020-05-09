import App from 'next/app';
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import 'normalize.css';
import faker from 'faker';
import feathers from '@feathersjs/feathers';
import feathersLocalstorage from 'feathers-localstorage';
import storage from 'localforage';

import Page from '../components/layout/Page';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const getFakeUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  cid: faker.random.number(),
  mobile: faker.phone.phoneNumber('###########'),
  dob: faker.date.past(),
  employer: faker.company.companyName(),
  jobTitle: faker.name.jobTitle(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  country: faker.address.country(),
});

const usersCount = 100;

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      userService: null,
    };
  }

  componentDidMount() {
    // call async init
    this.init();
  }

  async init() {
    const client = feathers().use('/users', feathersLocalstorage({ storage }));
    const userService = client.service('users');
    const users = await userService.find();
    if (users.length === 0) {
      await Promise.all(Array(usersCount).fill().map(() => userService.create(getFakeUser())));
    }
    this.setState({ userService });
  }

  render() {
    const { Component, pageProps } = this.props;
    const { userService } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Page>
          <Component userService={userService} {...pageProps} />
        </Page>
        <GlobalStyles />
      </ThemeProvider>
    );
  }
}
