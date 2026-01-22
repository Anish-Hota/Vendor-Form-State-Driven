import { createElement } from '../utils/dom';

export function createOwnerSection(): HTMLElement {
  const section = createElement('section', 'form_section');
  const h3 = createElement('h3');
  h3.textContent = 'Owner Details';
  section.appendChild(h3);

  section.appendChild(createTextInput('ownerName', 'Full Name of Owner', true));
  section.appendChild(
    createTextInput('ownerEmail', 'Email Address', true, 'owner@example.com', 'email'),
  );
  section.appendChild(createTextInput('ownerPhone', 'Contact Number', true, '9876543210', 'tel'));

  const dobGroup = createElement('div', 'form_group');
  const dobLabel = createElement('label');
  dobLabel.textContent = 'Date of Birth';
  dobLabel.classList.add('required');
  const dobInput = createElement('input');
  dobInput.type = 'date';
  dobInput.name = 'ownerDob';
  dobInput.required = true;
  const dobError = createElement('span', 'error_message');
  dobGroup.appendChild(dobLabel);
  dobGroup.appendChild(dobInput);
  dobGroup.appendChild(dobError);
  section.appendChild(dobGroup);

  section.appendChild(createTextInput('businessAddress', 'Registered Business Address', true));
  section.appendChild(createTextInput('businessPincode', 'Pincode', true, '123456'));
  section.appendChild(
    createTextInput('warehouseLocation', 'Warehouse Location', false, 'Optional'),
  );
  return section;
}
function createTextInput(
  name: string,
  label: string,
  required = false,
  placeholder = '',
  type = 'text',
): HTMLDivElement {
  const group = createElement('div', 'form_group');
  const labelEl = createElement('label');
  labelEl.textContent = label;
  if (required) {
    labelEl.classList.add('required');
  }
  const input = createElement('input');
  input.type = type;
  input.name = name;
  input.required = required;
  if (placeholder) {
    input.placeholder = placeholder;
  }
  const error = createElement('span', 'error_message');
  group.appendChild(labelEl);
  group.appendChild(input);
  group.appendChild(error);
  return group;
}
