import { state } from '../app.state';
import { saveToStorage } from '../app.storage';
import { renderApp } from './App';
import { createElement, createButton } from '../utils/dom';
import { generateId } from '../logic/helpers/business-helpers';
import type { VendorData } from '../types';
import { createBusinessSection } from '../form-sections/businessSection';
import { createOwnerSection } from '../form-sections/ownerSection';
import { createBankingSection } from '../form-sections/bankingSection';
import { createTaxSection } from '../form-sections/taxSection';
import { createStoreSection } from '../form-sections/storeSection';
import { createPoliciesSection } from '../form-sections/policySection';

export function VendorForm(): HTMLDivElement {
  const container = createElement('div', 'form_container');

  const header = createElement('div', 'section_title');
  const title = createElement('h2');
  title.textContent = 'Register Vendor';
  header.appendChild(title);

  const form = createElement('form');
  form.id = 'vendorForm';
  form.setAttribute('novalidate', 'true');

  form.appendChild(createBusinessSection());
  form.appendChild(createOwnerSection());
  form.appendChild(createBankingSection());
  form.appendChild(createTaxSection());
  form.appendChild(createStoreSection());
  form.appendChild(createPoliciesSection());

  const actions = createElement('div', 'form_actions');
  const submitBtn = createButton('SUBMIT', 'submit');
  submitBtn.className = 'btn_primary';
  const resetBtn = createButton('Clear Form', 'reset');
  resetBtn.className = 'btn_secondary';
  actions.appendChild(submitBtn);
  actions.appendChild(resetBtn);
  form.appendChild(actions);

  form.addEventListener('submit', handleSubmit);
  form.addEventListener('reset', handleReset);

  container.appendChild(header);
  container.appendChild(form);

  return container;
}
function handleSubmit(e: Event): void {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const vendorData: Partial<VendorData> = { id: generateId() };

  for (const [key, value] of formData.entries()) {
    if (key === 'categories') {
      if (!vendorData.categories) {
        vendorData.categories = [];
      }
      vendorData.categories.push(value as string);
    } else {
      (vendorData as Record<string, unknown>)[key] = value;
    }
  }

  ['shippingPolicy', 'returnPolicy', 'qualityAssurance', 'termsConditions'].forEach((key) => {
    (vendorData as Record<string, unknown>)[key] = formData.has(key);
  });

  state.vendors.push(vendorData as VendorData);
  saveToStorage();
  renderApp();
}
function handleReset(): void {
  renderApp();
}
