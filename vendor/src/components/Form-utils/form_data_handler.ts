import type { VendorData } from '../../types';

export function extractFormData(form: HTMLFormElement, vendorId: string): VendorData {
  const formData = new FormData(form);
  const vendorData: Partial<VendorData> = { id: vendorId };

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

  return vendorData as VendorData;
}
