
import { SellLocation } from '@app/model/SellLocation';
import { createLocation } from '@app/services/Locations';
import { ActionGroup, Button, Form, FormGroup, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { ErrorFetchingData } from './common/ErrorFetchingData';
import { LoadingSpinner } from './common/LoadingSpinner';

export const LocationForm: React.FC = () => {

  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const location = useLocation();

  const [itemEditing, setItemEditing] = useState<SellLocation>({
    locationId: "",
    address: "",
  });

  const handledressChange = address => {
    setItemEditing({ ...itemEditing, address });
  };



  const submitForm = e => {
    e.preventDefault();
    setLoading(true)
    createLocation(itemEditing)
      .then(() => {
        setHasError(false);
        setLoading(false);
        setHasSubmitted(true);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(false);
    /* getLocationByID(getIdFromPath(location.pathname))
      .then(data => {
        setItemEditing(data);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false)
      }); */
  }, []);

  useEffect(() => {
  }, [loading, hasError, itemEditing]);



  const drawForm = () => {
    if (loading && !hasSubmitted) {
      return <LoadingSpinner />;
    }
    else if (hasError) {
      return <ErrorFetchingData />
    }
    else if (hasSubmitted) {
      return <Redirect to={'/listLocations'} />
    }
    else {
      return (
        <Form onSubmit={e => { e.preventDefault(); }}>
          <FormGroup label="name" isRequired fieldId="simple-form-name-01">
            <TextInput
              isRequired
              type="text"
              id="simple-form-name-01"
              name="simple-form-name-01"
              value={itemEditing.address}
              onChange={handledressChange}
            />
          </FormGroup>
          <ActionGroup>
            <Button variant="primary" onClick={submitForm}>Submit</Button>
            <Button variant="link" onClick={() => history.goBack()} >Back</Button>
          </ActionGroup>
        </Form>
      );
    }
  }

  return drawForm();
}
