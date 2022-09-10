import { EmptyState, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import React from 'react';

export const ErrorFetchingData: React.FunctionComponent = () => (
    <EmptyState>
      <EmptyStateIcon icon={SearchIcon} />
      <Title size="lg" headingLevel="h4">
        Error.
      </Title>
      <EmptyStateBody>Something went wrong. Consider trying again</EmptyStateBody>
    </EmptyState>
  );