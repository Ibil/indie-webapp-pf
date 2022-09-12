import * as React from 'react';
import { ActionGroup, Button, Checkbox, Form, FormGroup, Popover, TextInput } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { saveProduct } from '@app/services/ProductForm';
import { ImageUpload } from '../common/ImageUpload';


export interface Product {
  name: string;
  photo: string;
  price: string
}

interface ProductEdititing {
  value1: string;
  value2?: string;
  value3?: string;
  isDisabled?: boolean;
}

export const ProductForm: React.FC<Product> = product => {

  const [productEditing, setProductEditing] = useState<ProductEdititing>({
    value1: product.name,
    isDisabled: false,
  });

  const handleTextInputChange1 = value1 => {
    setProductEditing(...productEditing, value1);
  };
  const handleTextInputChange2 = value2 => {
    setProductEditing(...productEditing, value2);
  };
  const handleTextInputChange3 = value3 => {
    setProductEditing(...productEditing, value3);
  };

  const history = useHistory();

  const submitProduct = () => {
    saveProduct();
    history.goBack();
  }

  return (
    <Form>
      <ImageUpload/>
      <FormGroup
        label="Full name"
        labelIcon={
          <Popover
            headerContent={
              <div>
                The{' '}
                <a href="https://schema.org/name" target="_blank">
                  name
                </a>{' '}
                of a{' '}
                <a href="https://schema.org/Person" target="_blank">
                  Person
                </a>
              </div>
            }
            bodyContent={
              <div>
                Often composed of{' '}
                <a href="https://schema.org/givenName" target="_blank">
                  givenName
                </a>{' '}
                and{' '}
                <a href="https://schema.org/familyName" target="_blank">
                  familyName
                </a>
                .
              </div>
            }
          >
            <button
              type="button"
              aria-label="More info for name field"
              onClick={e => e.preventDefault()}
              aria-describedby="simple-form-name-01"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        }
        isRequired
        fieldId="simple-form-name-01"
        helperText="Include your middle name if you have one."
      >
        <TextInput
          isRequired
          isDisabled={productEditing.isDisabled}
          type="text"
          id="simple-form-name-01"
          name="simple-form-name-01"
          aria-describedby="simple-form-name-01-helper"
          value={productEditing.value1}
          onChange={handleTextInputChange1}
        />
      </FormGroup>
      <FormGroup label="Email" isRequired fieldId="simple-form-email-01">
        <TextInput
          isRequired
          isDisabled={productEditing.isDisabled}
          type="email"
          id="simple-form-email-01"
          name="simple-form-email-01"
          value={productEditing.value2}
          onChange={handleTextInputChange2}
        />
      </FormGroup>
      <FormGroup label="Phone number" isRequired fieldId="simple-form-number-01">
        <TextInput
          isRequired
          isDisabled={productEditing.isDisabled}
          type="tel"
          id="simple-form-number-01"
          placeholder="555-555-5555"
          name="simple-form-number-01"
          value={productEditing.value3}
          onChange={handleTextInputChange3}
        />
      </FormGroup>
      <FormGroup isInline fieldId="simple-form-checkbox-group" label="How can we contact you?" isRequired>
        <Checkbox label="Email" aria-label="Email" id="inlinecheck01" />
        <Checkbox label="Phone" aria-label="Phone" id="inlinecheck02" />
        <Checkbox label="Please don't contact me." aria-label="Please don't contact me." id="inlinecheck03" />
      </FormGroup>
      <FormGroup label="Additional note" fieldId="simple-form-note-01">
        <TextInput type="text" id="simple-form-note-01" name="simple-form-number" value="disabled" />
      </FormGroup>
      <FormGroup fieldId="checkbox01">
        <Checkbox
          label="I'd like updates via email."
          id="checkbox01"
          name="checkbox01"
          aria-label="Update via email"
        />
      </FormGroup>
      <ActionGroup>
        <Button variant="primary" onClick={submitProduct}>Submit</Button>
        <Button variant="link" onClick={() => history.goBack()} >Cancel</Button>
      </ActionGroup>
    </Form>
  );
}
