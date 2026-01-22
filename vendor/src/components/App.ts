import { VendorForm } from './Form';
import { VendorTable } from './Table';
import { createElement } from '../utils/dom';

export function renderApp(): void {
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Root element #app not found');
  }

  root.innerHTML = '';
  // header
  const header = createElement('header');
  const title = createElement('h1');
  title.textContent = 'Vendor Form';
  const subtitle = createElement('p');
  subtitle.textContent = 'Register vendors and manage records efficiently';
  header.appendChild(title);
  header.appendChild(subtitle);
  // main container
  const container = createElement('div', 'main_container');
  container.appendChild(VendorForm());
  container.appendChild(VendorTable());

  root.appendChild(header);
  root.appendChild(container);
}
