import { createElement } from '../utils/dom';

export function createBankingSection(): HTMLElement {
  const section = createElement('section', 'form_section');
  const h3 = createElement('h3');
  h3.textContent = 'Banking Information';
  section.appendChild(h3);

  section.appendChild(createTextInput('accountHolder', 'Account Holder Name', true));

  const bankGroup = createElement('div', 'form_group');
  const bankLabel = createElement('label');
  bankLabel.textContent = 'Bank Name';
  bankLabel.classList.add('required');
  const bankSelect = createElement('select');
  bankSelect.name = 'bankName';
  bankSelect.required = true;

  const banks = ['', 'sbi', 'hdfc', 'icici', 'axis', 'pnb', 'bob', 'kotak', 'yes', 'idbi', 'other'];
  const bankLabels = [
    'Select your bank',
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Kotak Mahindra Bank',
    'Yes Bank',
    'IDBI Bank',
    'Other',
  ];
  banks.forEach((b, i) => {
    const option = createElement('option');
    option.value = b;
    option.textContent = bankLabels[i];
    bankSelect.appendChild(option);
  });
  const bankError = createElement('span', 'error_message');
  bankGroup.appendChild(bankLabel);
  bankGroup.appendChild(bankSelect);
  bankGroup.appendChild(bankError);
  section.appendChild(bankGroup);

  section.appendChild(createTextInput('accountNumber', 'Account Number', true));
  section.appendChild(createTextInput('ifscCode', 'IFSC Code', true, 'ABCD0123456'));

  return section;
}

function createTextInput(
  name: string,
  label: string,
  required = false,
  placeholder = '',
): HTMLElement {
  const group = createElement('div', 'form_group');
  const labelEl = createElement('label');
  labelEl.textContent = label;
  if (required) {
    labelEl.classList.add('required');
  }
  const input = createElement('input');
  input.type = 'text';
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
