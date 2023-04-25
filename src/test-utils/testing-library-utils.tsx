import { render as rtlRender } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import FallbackRenderer from '../components/FallbackRenderer';
import NavigationBar from '../components/NavigationBar';
import type { ReactElement, ReactNode } from 'react';

const render = (ui: ReactElement, { ...renderOptions } = {}) => {
  const wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <BrowserRouter>
        <NavigationBar />
        <ErrorBoundary fallbackRender={FallbackRenderer}>
          <div className={' bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-white'}>
            {children}
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    );
  };

  return rtlRender(ui, { wrapper, ...renderOptions });
};
export * from '@testing-library/react';

export { render };
