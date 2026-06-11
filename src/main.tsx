import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import WhatsNewPopup from './components/WhatsNewPopup';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WhatsNewPopup />
    <App />
  </StrictMode>,
);
