import { User, UserRole } from '@app/model/User';
import { getUserByID, updateUserByID } from '@app/services/Users';
import { getIdFromPath } from '@app/utils/utils';
import { ActionGroup, Button, Form, FormGroup, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DropDown } from './tables/DropDown';

export const UserForm: React.FC = () => {

  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const location = useLocation();

  const [itemEditing, setItemEditing] = useState<User>({
    userId: "",
    name: "",
    role: UserRole.basic
  });

  const handleNameChange = name => {
    setItemEditing({...itemEditing, name});
  };
  const handleRoleChange = role => {
    setItemEditing({...itemEditing, role});
  };


  const submitForm = () => {
    updateUserByID(itemEditing.userId);
  }

  useEffect(() => {
    getUserByID(getIdFromPath(location.pathname))
      .then(data => setItemEditing(data))
      .catch(() => {
        setHasError(true);
        setLoading(false)
      });
  }, []);

  useEffect(() => {
  }, [loading, hasError]);

  // TODO add loading and error page
  return (
    <Form>
      <FormGroup label="name" isRequired fieldId="simple-form-name-01">
        <TextInput
          isRequired
          type="text"
          id="simple-form-name-01"
          name="simple-form-name-01"
          value={itemEditing.name}
          onChange={handleNameChange}
        />
      </FormGroup>
      <FormGroup label="role" isRequired fieldId="simple-form-role-01">
        <TextInput
          isRequired
          type="text"
          id="simple-form-role-01"
          name="simple-form-role-01"
          value={itemEditing.role}
          onChange={handleRoleChange}
        />
      </FormGroup>
      <FormGroup>
        <DropDown/>
      </FormGroup>
      <ActionGroup>
        <Button variant="primary" onClick={submitForm}>Submit</Button>
        <Button variant="link" onClick={() => history.goBack()} >Cancel</Button>
      </ActionGroup>
    </Form>
  );
}
