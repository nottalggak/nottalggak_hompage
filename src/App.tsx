import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NoticePopup from './components/NoticePopup';
import Home from './pages/Home';

const Production = lazy(() => import('./pages/Production'));
const Education = lazy(() => import('./pages/Education'));
const Community = lazy(() => import('./pages/Community'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const ApplyPage = lazy(() => import('./pages/ApplyPage'));
const AITestPage = lazy(() => import('./pages/AITestPage'));

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <NoticePopup />
      <div className="min-h-screen bg-white">
        <Navigation />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/production" element={<Production />} />
            <Route path="/education" element={<Education />} />
            <Route path="/community" element={<Community />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/:type" element={<Contact />} />
            <Route path="/contact/apply/:type" element={<ApplyPage />} />
            <Route path="/contact/apply/production/:plan" element={<ApplyPage />} />
            <Route path="/ai-test" element={<AITestPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
