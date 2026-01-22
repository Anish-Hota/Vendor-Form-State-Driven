import { state } from '../../app.state';

export function populateForm(form: HTMLFormElement): void {
  const vendor = state.vendors.find((v) => v.id === state.form.editingId);
  if (!vendor) {
    return;
  }

  Object.entries(vendor).forEach(([key, value]) => {
    if (key === 'id') {
      return;
    }

    if (key === 'categories' && Array.isArray(value)) {
      populateCategories(form, value);
      return;
    }

    if (isPolicyField(key)) {
      populateCheckbox(form, key, Boolean(value));
      return;
    }

    populateInput(form, key, value);
  });
}

function populateCategories(form: HTMLFormElement, categories: string[]): void {
  categories.forEach((cat) => {
    const checkbox = form.querySelector(
      `input[name="categories"][value="${cat}"]`,
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = true;
    }
  });
}

function isPolicyField(key: string): boolean {
  return ['shippingPolicy', 'returnPolicy', 'qualityAssurance', 'termsConditions'].includes(key);
}

function populateCheckbox(form: HTMLFormElement, name: string, checked: boolean): void {
  const checkbox = form.querySelector(`input[name="${name}"]`) as HTMLInputElement;
  if (checkbox) {
    checkbox.checked = checked;
  }
}

function populateInput(
  form: HTMLFormElement,
  key: string,
  value: string | number | boolean | string[] | undefined,
): void {
  const input = form.querySelector(`[name="${key}"]`) as
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;

  if (!input) {
    return;
  }

  if (input.type === 'radio') {
    const radio = form.querySelector(`input[name="${key}"][value="${value}"]`) as HTMLInputElement;
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change'));
    }
  } else {
    input.value = String(value || '');
  }
}
