import { state } from './app.state';
import type { VendorData } from './types';

const STORAGE_KEY = 'vendor_form_data';

export function saveToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.vendors));
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
}

export function loadFromStorage(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as VendorData[];
      state.vendors = parsed;
    }
  } catch (error) {
    console.error('Failed to load from storage:', error);
    state.vendors = [];
  }
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
  state.vendors = [];
}
