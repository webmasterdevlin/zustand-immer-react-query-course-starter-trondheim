import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes } from 'react-router-dom';
import FallbackRenderer from '../components/FallbackRenderer';
import NavigationBar from '../components/NavigationBar';

export default function Wrapper() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <ErrorBoundary fallbackRender={FallbackRenderer}>
        <div className={' bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-white'}>
          <Routes />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
