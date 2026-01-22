import { createElement } from '../utils/dom';

export function createPoliciesSection(): HTMLElement {
  const section = createElement('section', 'form_section');
  const h3 = createElement('h3');
  h3.textContent = 'Terms & Policies';
  section.appendChild(h3);

  const policies = [
    { name: 'shippingPolicy', text: 'I agree to the Shipping Policy' },
    { name: 'returnPolicy', text: 'I agree to the Return & Refund Policy' },
    { name: 'qualityAssurance', text: 'I commit to Quality Assurance Standards' },
    { name: 'termsConditions', text: 'I accept all Terms & Conditions' },
  ];

  policies.forEach((p) => {
    const pGroup = createElement('div', 'form_group');
    const pLabel = createElement('label', 'policy_label');
    const checkbox = createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = p.name;
    checkbox.required = true;
    const span = createElement('span');
    span.textContent = p.text;
    pLabel.appendChild(checkbox);
    pLabel.appendChild(span);
    const pError = createElement('span', 'error_message');
    pGroup.appendChild(pLabel);
    pGroup.appendChild(pError);
    section.appendChild(pGroup);
  });

  return section;
}
