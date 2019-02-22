import React from 'react';
import { withAuthorization } from '../session';

const Home = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <p>Accessible when signed in</p>
    </div>
  );
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(Home);