import { EmptyState, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import React from 'react';

export const NoResults: React.FunctionComponent = () => (
    <EmptyState>
      <EmptyStateIcon icon={SearchIcon} />
      <Title size="lg" headingLevel="h4">
        No results found
      </Title>
      <EmptyStateBody>No data to show</EmptyStateBody>
    </EmptyState>
  );