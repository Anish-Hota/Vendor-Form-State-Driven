import { createElement } from '../utils/dom';

export function createTaxSection(): HTMLElement {
  const section = createElement('section', 'form_section');
  const h3 = createElement('h3');
  h3.textContent = 'Tax Details';
  section.appendChild(h3);

  const taxGroup = createElement('div', 'form_group');
  const taxLabel = createElement('label');
  taxLabel.textContent = 'GST Registration Status';
  taxLabel.classList.add('required');
  const radioGroup = createElement('div', 'radio_group');

  const statuses = [
    { value: 'registered', label: 'GST Registered' },
    { value: 'not-registered', label: 'Not GST Registered (will register later)' },
  ];

  statuses.forEach((s) => {
    const radioLabel = createElement('label', 'radio_label');
    const radio = createElement('input');
    radio.type = 'radio';
    radio.name = 'taxStatus';
    radio.value = s.value;
    radio.required = true;

    // Add change listener inline
    radio.addEventListener('change', handleTaxStatusChange);

    const span = createElement('span');
    span.textContent = s.label;
    radioLabel.appendChild(radio);
    radioLabel.appendChild(span);
    radioGroup.appendChild(radioLabel);
  });

  const taxError = createElement('span', 'error_message');
  taxGroup.appendChild(taxLabel);
  taxGroup.appendChild(radioGroup);
  taxGroup.appendChild(taxError);
  section.appendChild(taxGroup);

  const gstGroup = createElement('div', 'form_group');
  gstGroup.id = 'gstGroup';
  gstGroup.style.display = 'none';
  const gstLabel = createElement('label');
  gstLabel.textContent = 'GST Registration Number';
  const gstInput = createElement('input');
  gstInput.type = 'text';
  gstInput.name = 'gstNumber';
  gstInput.placeholder = '22AAAAA0000A1Z5';
  const gstError = createElement('span', 'error_message');
  gstGroup.appendChild(gstLabel);
  gstGroup.appendChild(gstInput);
  gstGroup.appendChild(gstError);
  section.appendChild(gstGroup);

  return section;
}

function handleTaxStatusChange(e: Event): void {
  const target = e.target as HTMLInputElement;
  const gstGroup = document.getElementById('gstGroup');
  if (!gstGroup) {
    return;
  }

  const isRegistered = target.value === 'registered';
  gstGroup.style.display = isRegistered ? 'block' : 'none';

  const input = gstGroup.querySelector('input');
  if (input) {
    input.required = isRegistered;
    if (!isRegistered) {
      input.value = '';
    }
  }
}
