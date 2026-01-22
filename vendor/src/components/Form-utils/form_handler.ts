import { state } from '../../app.state';
import { saveToStorage } from '../../app.storage';
import { renderApp } from '../App';
import { generateId } from '../../logic/helpers/business-helpers';
import { validateForm } from './form_validator';
import { extractFormData } from './form_data_handler';

export function handleSubmit(e: Event): void {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  if (!validateForm(form)) {
    return;
  }

  if (state.form.isEditMode && state.form.editingId) {
    updateVendor(form);
  } else {
    createVendor(form);
  }

  saveToStorage();
  renderApp();
}

function createVendor(form: HTMLFormElement): void {
  const vendorData = extractFormData(form, generateId());
  state.vendors.push(vendorData);
}

function updateVendor(form: HTMLFormElement): void {
  const index = state.vendors.findIndex((v) => v.id === state.form.editingId);
  if (index !== -1) {
    const vendorData = extractFormData(form, state.form.editingId!);
    state.vendors[index] = vendorData;
    state.form.editingId = null;
    state.form.isEditMode = false;
  }
}

export function handleCancel(): void {
  state.form.editingId = null;
  state.form.isEditMode = false;
  renderApp();
}

export function handleReset(): void {
  renderApp();
}
