import React, { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { FormRow, Alert } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Form } from 'react-router-dom';

const Profile = () => {
  const { showAlert, displayAlert, isLoading, updateUser, user } =
    useAppContext();
  //Setting state locally as we are only fillling out the form data from the user
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [location, setLocation] = useState(user && user.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !location || !lastName) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
    console.log('Event Submitted ');
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className='form-centre'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />

          <FormRow
            type='text'
            name='lastNme'
            labelText='Last Name'
            value={lastName}
            handleChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <FormRow
            type='email'
            name='email'
            labelText='Email'
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <button className='btn btn-block' type='submit' disabled={isLoading}>
          {isLoading ? 'Please wait..' : 'Save Changes'}
        </button>
      </form>
    </Wrapper>
  );
};

export default Profile;
