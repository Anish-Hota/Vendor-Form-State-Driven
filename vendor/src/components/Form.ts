import { state } from '../app.state';
import { createElement, createButton } from '../utils/dom';
import { createBusinessSection } from '../form-sections/businessSection';
import { createOwnerSection } from '../form-sections/ownerSection';
import { createBankingSection } from '../form-sections/bankingSection';
import { createTaxSection } from '../form-sections/taxSection';
import { createStoreSection } from '../form-sections/storeSection';
import { createPoliciesSection } from '../form-sections/policySection';
import { handleSubmit, handleCancel, handleReset } from './Form-utils/form_handler';
import { populateForm } from './Form-utils/form_populator';

export function VendorForm(): HTMLDivElement {
  const container = createElement('div', 'form_container');

  const header = createElement('div', 'section_title');
  const title = createElement('h2');
  title.textContent = state.form.isEditMode ? 'Edit Vendor' : 'Register Vendor';
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
  const submitBtn = createButton(state.form.isEditMode ? 'UPDATE' : 'SUBMIT', 'submit');
  submitBtn.className = 'btn_primary';
  const cancelBtn = createButton(
    state.form.isEditMode ? 'Cancel' : 'Clear Form',
    state.form.isEditMode ? 'button' : 'reset',
  );
  cancelBtn.className = 'btn_secondary';

  if (state.form.isEditMode) {
    cancelBtn.addEventListener('click', handleCancel);
  }

  actions.appendChild(submitBtn);
  actions.appendChild(cancelBtn);
  form.appendChild(actions);

  form.addEventListener('submit', handleSubmit);
  if (!state.form.isEditMode) {
    form.addEventListener('reset', handleReset);
  }

  if (state.form.isEditMode && state.form.editingId) {
    setTimeout(() => populateForm(form), 0);
  }

  container.appendChild(header);
  container.appendChild(form);

  return container;
}
