import React from 'react';

import PageTitle from '../components/PageTitle';

export default () => (
  <div>
    <PageTitle>Dashboard</PageTitle>
    <h2>FIS - First Citizens</h2>
    <h3>UI Dashboard Demo Project</h3>
    <p>This project is intended as interview process assignment demo for FIS.</p>
    <p>Use left side navigation for moving around.</p>
    <p>As of now only user management module is implemented.</p>
    <br />
    <p>User data is generated using <a href='http://marak.github.io/faker.js' target='blank'>Faker.js</a>.</p>
    <p>
      Navigate to user search page using left navigation and type a character in any search field
    </p>
    <p>This page is not yet responive and is best viewed on a laptop</p>
    <br />
    <p>Author:</p>
    <p><b>Rubita Kumari</b></p>
    <p><a href='https://rubita.dev'>https://rubita.dev</a></p>
  </div>
);
