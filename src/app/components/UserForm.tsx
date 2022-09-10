import { User, UserRole } from '@app/model/User';
import { getUserByID, updateUserByID } from '@app/services/Users';
import { getIdFromPath } from '@app/utils/utils';
import { ActionGroup, Button, Form, FormGroup, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ErrorFetchingData } from './common/ErrorFetchingData';
import { LoadingSpinner } from './common/LoadingSpinner';
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
    setItemEditing({ ...itemEditing, name });
  };

  const handleRoleChange = (role) => {
    setItemEditing({ ...itemEditing, role });
  };


  const submitForm = e => {
    e.preventDefault();
    setLoading(true)
    updateUserByID(itemEditing)
      .then(() => {
        setHasError(false);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false)
      })
  }

  useEffect(() => {
    getUserByID(getIdFromPath(location.pathname))
      .then(data => {
        setItemEditing(data);
        setHasError(false);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false)
      });
  }, []);

  useEffect(() => {
  }, [loading, hasError, itemEditing]);


  const mapEnumValuesToDropDown = () =>
    Object.values(UserRole).map(role => { return { value: role }; })


  const drawForm = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    else if (hasError) {
      return <ErrorFetchingData />
    }
    else {
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
          <FormGroup>
            <DropDown startingValue={itemEditing.role} values={mapEnumValuesToDropDown()} getDropdownValue={handleRoleChange} />
          </FormGroup>
          <ActionGroup>
            <Button variant="primary" onClick={submitForm}>Submit</Button>
            <Button variant="link" onClick={() => history.goBack()} >Cancel</Button>
          </ActionGroup>
        </Form>
      );
    }
  }

  return drawForm();
}
