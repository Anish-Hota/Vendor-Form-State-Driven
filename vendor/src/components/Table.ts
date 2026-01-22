import { state } from '../app.state';
import { saveToStorage } from '../app.storage';
import { renderApp } from './App';
import { formatVendorCount } from '../logic/helpers/data-helpers';
import { createElement } from '../utils/dom';

export function VendorTable(): HTMLDivElement {
  const container = createElement('div', 'table_container');

  const header = createElement('div', 'section_title');
  const title = createElement('h2');
  title.textContent = 'Registered Vendors';

  const badge = createElement('span', 'vendor_count');
  badge.textContent = formatVendorCount(state.vendors.length);

  header.appendChild(title);
  header.appendChild(badge);

  const wrapper = createElement('div', 'table_wrapper');
  const table = createElement('table');
  table.id = 'vendorTable';

  const thead = createElement('thead');
  const headerRow = createElement('tr');

  const headers = [
    '#',
    'Business Type',
    'Business Name',
    'Registration #',
    'PAN Number',
    'Operating Since',
    'Categories',
    'Monthly Sales',
    'Owner Name',
    'Email',
    'Phone',
    'DOB',
    'Address',
    'Pincode',
    'Warehouse',
    'Account Holder',
    'Bank Name',
    'Account Number',
    'IFSC Code',
    'Tax Status',
    'GST Number',
    'Store Name',
    'Currency',
    'Shipping Policy',
    'Return Policy',
    'Quality Assurance',
    'Terms Accepted',
    'Actions',
  ];

  headers.forEach((h) => {
    const th = createElement('th');
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const tbody = createElement('tbody');
  tbody.id = 'vendorTableBody';

  if (state.vendors.length === 0) {
    const emptyRow = createElement('tr');
    emptyRow.className = 'empty_row';
    const emptyCell = createElement('td');
    emptyCell.colSpan = headers.length;
    emptyCell.className = 'empty_message';

    const emptyState = createElement('div', 'empty_state');
    const p = createElement('p');
    p.textContent = 'No vendors registered yet';
    const small = createElement('small');
    small.textContent = 'Fill the form to add your first vendor';

    emptyState.appendChild(p);
    emptyState.appendChild(small);
    emptyCell.appendChild(emptyState);
    emptyRow.appendChild(emptyCell);
    tbody.appendChild(emptyRow);
  } else {
    state.vendors.forEach((vendor, index) => {
      const row = createElement('tr');

      const cells = [
        String(index + 1),
        vendor.businessType || '-',
        vendor.businessName || '-',
        vendor.businessRegistration || '-',
        vendor.panNumber || '-',
        vendor.operatingSince || '-',
        vendor.categories?.join(', ') || '-',
        vendor.monthlySales || '-',
        vendor.ownerName || '-',
        vendor.ownerEmail || '-',
        vendor.ownerPhone || '-',
        vendor.ownerDob || '-',
        vendor.businessAddress || '-',
        vendor.businessPincode || '-',
        vendor.warehouseLocation || '-',
        vendor.accountHolder || '-',
        vendor.bankName || '-',
        vendor.accountNumber || '-',
        vendor.ifscCode || '-',
        vendor.taxStatus || '-',
        vendor.gstNumber || '-',
        vendor.storeName || '-',
        vendor.currency || '-',
        vendor.shippingPolicy ? '✓' : '✗',
        vendor.returnPolicy ? '✓' : '✗',
        vendor.qualityAssurance ? '✓' : '✗',
        vendor.termsConditions ? '✓' : '✗',
      ];

      cells.forEach((cellText) => {
        const td = createElement('td');
        td.textContent = cellText;
        row.appendChild(td);
      });

      const actionTd = createElement('td');
      const editBtn = createElement('button', 'action_btn edit_btn');
      editBtn.textContent = 'Edit';
      editBtn.setAttribute('data-id', vendor.id);
      editBtn.addEventListener('click', handleEdit);

      const deleteBtn = createElement('button', 'action_btn delete_btn');
      deleteBtn.textContent = 'Delete';
      deleteBtn.setAttribute('data-id', vendor.id);
      deleteBtn.addEventListener('click', handleDelete);

      actionTd.appendChild(editBtn);
      actionTd.appendChild(deleteBtn);
      row.appendChild(actionTd);

      tbody.appendChild(row);
    });
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  wrapper.appendChild(table);

  container.appendChild(header);
  container.appendChild(wrapper);

  return container;
}

function handleEdit(e: Event): void {
  const button = e.target as HTMLButtonElement;
  const vendorId = button.getAttribute('data-id');
  if (!vendorId) {
    return;
  }

  state.form.editingId = vendorId;
  state.form.isEditMode = true;
  renderApp();
}

function handleDelete(e: Event): void {
  const button = e.target as HTMLButtonElement;
  const vendorId = button.getAttribute('data-id');
  if (!vendorId) {
    return;
  }

  const confirmed = confirm('Are you sure you want to delete this vendor?');
  if (!confirmed) {
    return;
  }

  const index = state.vendors.findIndex((v) => v.id === vendorId);
  if (index !== -1) {
    state.vendors.splice(index, 1);
    saveToStorage();
    renderApp();
  }
}
