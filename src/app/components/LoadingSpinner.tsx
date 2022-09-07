import React, { ReactElement } from 'react';
import { Title, EmptyState, Spinner } from '@patternfly/react-core';

export interface LoadingSpinnerProps {
  label?: string
}

export const LoadingSpinner = (props : LoadingSpinnerProps): ReactElement => {
  return (
    <EmptyState>
      <Spinner />
      <Title size="lg" headingLevel="h4">
        {props.label ?? "Loading"}
      </Title>
    </EmptyState>
  );
};