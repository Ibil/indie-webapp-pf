import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import { AuthProvider } from './components/common/AuthProvider';

const App: React.FunctionComponent = () => (
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </AuthProvider>
    </Router>

  </React.StrictMode >
);

export default App;
