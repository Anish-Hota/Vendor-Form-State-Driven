import { createElement } from '../utils/dom';
export function createStoreSection(): HTMLElement {
  const section = createElement('section', 'form_section');
  const h3 = createElement('h3');
  h3.textContent = 'Store Information';
  section.appendChild(h3);
  //Name
  section.appendChild(createInputText('storename', 'Store Name', true));
  //Description
  const descGroup = createElement('div', 'form_group');
  const descLabel = createElement('label');
  descLabel.textContent = 'Store Description';
  const descTextarea = createElement('textarea');
  descTextarea.name = 'storeDescription';
  descTextarea.rows = 4;
  descTextarea.maxLength = 500;
  const descError = createElement('span', 'error_message');
  descGroup.appendChild(descLabel);
  descGroup.appendChild(descTextarea);
  descGroup.appendChild(descError);
  section.appendChild(descGroup);
  //Currency
  const currGroup = createElement('div', 'form_group');
  const currLabel = createElement('label');
  currLabel.textContent = 'Preferred Currency';
  currLabel.classList.add('required');
  const radioGroup = createElement('div', 'radio_group');
  const currencies = [
    { value: 'INR', label: 'Indian Rupee (₹ INR)' },
    { value: 'USD', label: 'US Dollar ($ USD)' },
  ];
  currencies.forEach((c, i) => {
    const radioLabel = createElement('label', 'radio_label');
    const radio = createElement('input');
    radio.type = 'radio';
    radio.name = 'currency';
    radio.value = c.value;
    radio.required = true;
    if (i === 0) {
      radio.checked = true;
    }
    const span = createElement('span');
    span.textContent = c.label;
    radioLabel.appendChild(radio);
    radioLabel.appendChild(span);
    radioGroup.appendChild(radioLabel);
  });
  const currError = createElement('span', 'error_message');
  currGroup.appendChild(currLabel);
  currGroup.appendChild(radioGroup);
  currGroup.appendChild(currError);
  section.appendChild(currGroup);

  return section;
}
function createInputText(name: string, label: string, required = false): HTMLDivElement {
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
  const error = createElement('span', 'error_message');
  group.appendChild(labelEl);
  group.appendChild(input);
  group.appendChild(error);
  return group;
}
