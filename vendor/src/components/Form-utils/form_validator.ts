import { state } from '../../app.state';
import { showError, clearError } from '../../utils/dom';
import {
  validateBusinessType,
  validateBusinessName,
  validateBusinessRegistration,
  validatePanNumber,
  validateOperatingSince,
  validateCategories,
  validateMonthlySales,
} from '../../logic/validators/business-validators';
import {
  validateOwnerName,
  validateEmail,
  validateEmailUniqueness,
  validatePhone,
  validateOwnerDob,
  validateBusinessAddress,
  validatePincode,
} from '../../logic/validators/owner-validators';
import {
  validateAccountHolder,
  validateBankName,
  validateAccountNumber,
  validateIfscCode,
} from '../../logic/validators/banking-validators';
import { validateTaxStatus, validateGstNumber } from '../../logic/validators/tax-validators';
import {
  validateStoreName,
  validateStoreNameUniqueness,
  validateCurrency,
} from '../../logic/validators/store-validators';
import {
  validateShippingPolicy,
  validateReturnPolicy,
  validateQualityAssurance,
  validateTermsConditions,
} from '../../logic/validators/policy-validators';

export function validateForm(form: HTMLFormElement): boolean {
  let isValid = true;

  isValid = validateBusinessFields(form) && isValid;
  isValid = validateOwnerFields(form) && isValid;
  isValid = validateBankingFields(form) && isValid;
  isValid = validateTaxFields(form) && isValid;
  isValid = validateStoreFields(form) && isValid;
  isValid = validatePolicyFields(form) && isValid;

  return isValid;
}
function validateBusinessFields(form: HTMLFormElement): boolean {
  const results = [
    validateRadio(form, 'businessType', validateBusinessType),
    validateInput(form, 'businessName', validateBusinessName),
    validateConditionalRegistration(form),
    validateInput(form, 'panNumber', validatePanNumber),
    validateInput(form, 'operatingSince', validateOperatingSince),
    validateCheckboxGroup(form, 'categories', validateCategories),
    validateInput(form, 'monthlySales', validateMonthlySales),
  ];

  return results.every((r) => r);
}
function validateOwnerFields(form: HTMLFormElement): boolean {
  const results = [
    validateInput(form, 'ownerName', validateOwnerName),
    validateEmailField(form),
    validateInput(form, 'ownerPhone', validatePhone),
    validateInput(form, 'ownerDob', validateOwnerDob),
    validateInput(form, 'businessAddress', validateBusinessAddress),
    validateInput(form, 'businessPincode', validatePincode),
  ];

  return results.every((r) => r);
}
function validateBankingFields(form: HTMLFormElement): boolean {
  const results = [
    validateInput(form, 'accountHolder', validateAccountHolder),
    validateInput(form, 'bankName', validateBankName),
    validateInput(form, 'accountNumber', validateAccountNumber),
    validateInput(form, 'ifscCode', validateIfscCode),
  ];

  return results.every((r) => r);
}
function validateTaxFields(form: HTMLFormElement): boolean {
  const results = [
    validateRadio(form, 'taxStatus', validateTaxStatus),
    validateConditionalGst(form),
  ];

  return results.every((r) => r);
}
function validateStoreFields(form: HTMLFormElement): boolean {
  const results = [validateStoreNameField(form), validateRadio(form, 'currency', validateCurrency)];

  return results.every((r) => r);
}
function validatePolicyFields(form: HTMLFormElement): boolean {
  const results = [
    validateCheckbox(form, 'shippingPolicy', validateShippingPolicy),
    validateCheckbox(form, 'returnPolicy', validateReturnPolicy),
    validateCheckbox(form, 'qualityAssurance', validateQualityAssurance),
    validateCheckbox(form, 'termsConditions', validateTermsConditions),
  ];

  return results.every((r) => r);
}
function validateInput(
  form: HTMLFormElement,
  name: string,
  validator: (value: string) => string,
): boolean {
  const input = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;
  if (!input) {
    return true;
  }

  const error = validator(input.value);
  if (error) {
    showError(input, error);
    return false;
  }

  clearError(input);
  return true;
}
function validateRadio(
  form: HTMLFormElement,
  name: string,
  validator: (value: string) => string,
): boolean {
  const inputs = form.querySelectorAll(`input[name="${name}"]`);
  const selected = Array.from(inputs).find((input) => (input as HTMLInputElement).checked) as
    | HTMLInputElement
    | undefined;

  const error = validator(selected?.value || '');
  if (error) {
    showError(inputs[0] as HTMLInputElement, error);
    return false;
  }

  if (inputs[0]) {
    clearError(inputs[0] as HTMLInputElement);
  }
  return true;
}
function validateCheckbox(
  form: HTMLFormElement,
  name: string,
  validator: (checked: boolean) => string,
): boolean {
  const input = form.elements.namedItem(name) as HTMLInputElement;
  if (!input) {
    return true;
  }

  const error = validator(input.checked);
  if (error) {
    showError(input, error);
    return false;
  }

  clearError(input);
  return true;
}
function validateCheckboxGroup(
  form: HTMLFormElement,
  name: string,
  validator: (values: string[]) => string,
): boolean {
  const inputs = form.querySelectorAll(`input[name="${name}"]:checked`);
  const values = Array.from(inputs).map((input) => (input as HTMLInputElement).value);
  const firstInput = form.querySelector(`input[name="${name}"]`) as HTMLInputElement;

  if (!firstInput) {
    return true;
  }

  const error = validator(values);
  if (error) {
    showError(firstInput, error);
    return false;
  }

  clearError(firstInput);
  return true;
}
function validateConditionalRegistration(form: HTMLFormElement): boolean {
  const typeInputs = form.querySelectorAll('input[name="businessType"]');
  const businessType = Array.from(typeInputs).find(
    (input) => (input as HTMLInputElement).checked,
  ) as HTMLInputElement | undefined;

  if (!businessType?.value) {
    return true;
  }

  const regInput = form.elements.namedItem('businessRegistration') as HTMLInputElement;
  const error = validateBusinessRegistration(regInput.value, businessType.value);

  if (error) {
    showError(regInput, error);
    return false;
  }

  clearError(regInput);
  return true;
}
function validateConditionalGst(form: HTMLFormElement): boolean {
  const taxInputs = form.querySelectorAll('input[name="taxStatus"]');
  const taxStatus = Array.from(taxInputs).find((input) => (input as HTMLInputElement).checked) as
    | HTMLInputElement
    | undefined;

  if (!taxStatus?.value) {
    return true;
  }

  const gstInput = form.elements.namedItem('gstNumber') as HTMLInputElement;
  const error = validateGstNumber(gstInput.value, taxStatus.value);

  if (error) {
    showError(gstInput, error);
    return false;
  }

  clearError(gstInput);
  return true;
}
function validateEmailField(form: HTMLFormElement): boolean {
  const emailInput = form.elements.namedItem('ownerEmail') as HTMLInputElement;
  if (!emailInput) {
    return true;
  }

  let error = validateEmail(emailInput.value);
  if (!error) {
    error = validateEmailUniqueness(
      emailInput.value,
      state.vendors,
      state.form.editingId || undefined,
    );
  }

  if (error) {
    showError(emailInput, error);
    return false;
  }

  clearError(emailInput);
  return true;
}
function validateStoreNameField(form: HTMLFormElement): boolean {
  const storeNameInput = form.elements.namedItem('storeName') as HTMLInputElement;
  if (!storeNameInput) {
    return true;
  }

  let error = validateStoreName(storeNameInput.value);
  if (!error) {
    error = validateStoreNameUniqueness(
      storeNameInput.value,
      state.vendors,
      state.form.editingId || undefined,
    );
  }

  if (error) {
    showError(storeNameInput, error);
    return false;
  }

  clearError(storeNameInput);
  return true;
}
