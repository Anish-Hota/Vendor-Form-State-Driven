import './style.css';
import { loadFromStorage } from './app.storage';
import { renderApp } from './components/App';

document.addEventListener('DOMContentLoaded', (): void => {
  loadFromStorage();
  renderApp();
});
