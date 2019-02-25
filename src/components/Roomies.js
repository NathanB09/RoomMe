import React from 'react';
import { withAuthorization } from '../session';

const Roomies = ({ firebase }) => {
  firebase.users().on('value', snapshot => console.log(Object.values(snapshot.val())))
  // console.log(firebase.users().users)
  return (
    <div>

    </div>
  );
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(Roomies);