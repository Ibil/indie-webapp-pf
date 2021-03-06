import * as React from 'react';
import { ActionGroup, Button, Checkbox, FlexItem, Form, FormGroup, Popover, TextInput } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';


export interface Product {
  name: string;
  photo: string;
  price: string
}

export class ProductForm extends React.Component {
  handleTextInputChange1: (value1: any) => void;
  handleTextInputChange2: (value2: any) => void;
  handleTextInputChange3: (value3: any) => void;

  constructor(props) {
    super(props);
    this.state = {
      value1: props.name,
      value2: props.mail,
      value3: '',
      readOnly: props.readOnly
    };
    this.handleTextInputChange1 = value1 => {
      this.setState({ value1 });
    };
    this.handleTextInputChange2 = value2 => {
      this.setState({ value2 });
    };
    this.handleTextInputChange3 = value3 => {
      this.setState({ value3 });
    };
  }

  render() {
    const { value1, value2, value3, readOnly } = this.state;

    return (
      <Form>
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
            isReadOnly={readOnly}
            type="text"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            value={value1}
            onChange={this.handleTextInputChange1}
          />
        </FormGroup>
        <FormGroup label="Email" isRequired fieldId="simple-form-email-01">
          <TextInput
            isRequired
            isReadOnly={readOnly}
            type="email"
            id="simple-form-email-01"
            name="simple-form-email-01"
            value={value2}
            onChange={this.handleTextInputChange2}
          />
        </FormGroup>
        <FormGroup label="Phone number" isRequired fieldId="simple-form-number-01">
          <TextInput
            isRequired
            type="tel"
            id="simple-form-number-01"
            placeholder="555-555-5555"
            name="simple-form-number-01"
            value={value3}
            onChange={this.handleTextInputChange3}
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
          <Button variant="primary">Submit</Button>
          <Button variant="link">Cancel</Button>
        </ActionGroup>
      </Form>
    );
  }
}
