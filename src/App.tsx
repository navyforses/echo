import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components for better performance
const LandingPage = React.lazy(() => import('./features/landing/LandingPage'));
const LibraryPage = React.lazy(() => import('./features/library/LibraryPage'));
const VintageBookPage = React.lazy(() => import('./features/library/VintageBookPage'));

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-black to-chocolate-950 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-500 mx-auto mb-4"></div>
      <p className="text-gold-400 text-lg font-georgian">იტვირთება...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-black to-chocolate-950">
              <Navigation />
              <main>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/library" element={<LibraryPage />} />
                    <Route path="/vintage-book/:authorId" element={<VintageBookPage />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </Router>
        </I18nextProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App; 