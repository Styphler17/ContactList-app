import DB from '../../DB.js';
import Contact from '../contact/contact.js';
import { getContactlistTemplate, getAddContactTemplate } from './template.js';

export default class Contactlist {
  constructor(data) {
    this.domElt = document.querySelector(data.elt);
    DB.setApiURL(data.apiURL);
    this.contacts = [];
    this.loadContacts();
  }
  
  async loadContacts() {
    const contactsData = await DB.findAll();
    this.contacts = contactsData.map((con) => new Contact(con));
    this.render();
  }

  getContactCount() {
    return this.contacts.filter(contact => !!contact).length;
  }

  updateCount() {
    const el = this.domElt.querySelector('.contacts-count .contacts-count-number');
    if (el) el.textContent = this.getContactCount();
  }
  
  render() {
    this.domElt.innerHTML = `
      ${getAddContactTemplate()}
      ${getContactlistTemplate(this)}
    `;
    this.bindAddForm();
    this.bindSearchFilter();

    const tbody = this.domElt.querySelector('tbody');
    if (tbody) {
      const rows = Array.from(tbody.querySelectorAll('tr'));
      rows.forEach((tr, idx) => {
        const c = this.contacts[idx];
        if (c) {
          c.domElt = tr;
          c.initevent?.();
        }
      });
    }
  }

  bindAddForm() {
    const root = this.domElt;
    const inputFirstname = root.querySelector('#new-firstname');
    const inputLastname  = root.querySelector('#new-lastname');
    const inputEmail     = root.querySelector('#new-email');
    const btnAdd         = root.querySelector('#btn-add');
    const tbody          = root.querySelector('tbody');

    if (!btnAdd || !tbody) return;

    btnAdd.addEventListener('click', async (e) => {
      e.preventDefault();

      const data = {
        firstname: (inputFirstname?.value || '').trim(),
        lastname:  (inputLastname?.value  || '').trim(),
        email:     (inputEmail?.value     || '').trim(),
      };
      if (!data.firstname || !data.lastname || !data.email) return;

      const created = await DB.create(data);

      const newContact = new Contact(created);
      tbody.insertAdjacentHTML('beforeend', newContact.render());

      const tr = tbody.lastElementChild;
      newContact.domElt = tr;
      newContact.initevent?.();

      this.contacts.push(newContact);
      this.updateCount();

      if (inputFirstname) inputFirstname.value = '';
      if (inputLastname)  inputLastname.value  = '';
      if (inputEmail)     inputEmail.value     = '';
      inputFirstname?.focus();
    });
  }

  bindSearchFilter() {
    const searchInput = this.domElt.querySelector('#search-contact');
    if (!searchInput) {
      console.warn('Search input not found');
      return;
    }

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const rows = this.domElt.querySelectorAll('tbody tr');
      
      let visibleCount = 0;
      
      rows.forEach(row => {
        const firstnameSpan = row.querySelector('td:nth-child(1) .isEditing-hidden');
        const lastnameSpan = row.querySelector('td:nth-child(2) .isEditing-hidden');
        const emailSpan = row.querySelector('td:nth-child(3) .isEditing-hidden');
        
        const firstname = (firstnameSpan?.textContent || '').toLowerCase();
        const lastname = (lastnameSpan?.textContent || '').toLowerCase();
        const email = (emailSpan?.textContent || '').toLowerCase();
        
        const matches = firstname.includes(query) || 
                       lastname.includes(query) || 
                       email.includes(query);
        
        row.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });
      
      const countEl = this.domElt.querySelector('.contacts-count-number');
      if (countEl) {
        countEl.textContent = query ? visibleCount : this.getContactCount();
      }
    });
  }

  async findByIdAndRemove(id) {
    await DB.findByIdAndRemove(id);

    this.contacts = this.contacts.filter(c => String(c.id) !== String(id));

    this.domElt.querySelector(`tr[data-id="${id}"]`)?.remove();

    this.updateCount();
  }
}

export class AddContact {
  async addContact(data) {
    const contact = await DB.create(data);
    return contact;
  }
}