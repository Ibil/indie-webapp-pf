import { SellLocation } from '@app/model/SellLocation';
import { getLocationByID } from '@app/services/Locations';
import { saveProduct } from '@app/services/ProductForm';
import { getIdFromPath } from '@app/utils/utils';
import { ActionGroup, Button, Form, FormGroup, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const LocationForm: React.FC = () => {

  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const location = useLocation();

  const [itemEditing, setItemEditing] = useState<SellLocation>({
    locationId: "",
    address: ""
  });

  const handleTextInputChange2 = address => {
    setItemEditing({...itemEditing, address});
  };


  const submitForm = () => {

    alert("submitted");
  }

  useEffect(() => {
    getLocationByID(getIdFromPath(location.pathname))
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
      <FormGroup label="address" isRequired fieldId="simple-form-email-01">
        <TextInput
          isRequired
          type="text"
          id="simple-form-email-01"
          name="simple-form-email-01"
          value={itemEditing?.address}
          onChange={handleTextInputChange2}
        />
      </FormGroup>
      <ActionGroup>
        <Button variant="primary" onClick={submitForm}>Submit</Button>
        <Button variant="link" onClick={() => history.goBack()} >Cancel</Button>
      </ActionGroup>
    </Form>
  );
}
