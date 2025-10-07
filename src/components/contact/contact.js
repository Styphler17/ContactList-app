import DB from '../../DB.js';
import { getContactTemplate } from './template.js';
// class Contact début
export default class Contact {
  constructor(data) {
    this.id = data.id
    this.firstname = data.firstname
    this.lastname = data.lastname
    this.email = data.email
  }

  render() {
    return getContactTemplate(this)
  }

  // Événements: edit  GET + entrer en édition
  initevent(){
    // Edit
    this.domElt.querySelector('.btn-edit')?.addEventListener('click', async (e) => {
      e.preventDefault()
      const fresh = await DB.findById(this.id)
      const inputFirst = this.domElt.querySelector('.input-firstname')
      const inputLast  = this.domElt.querySelector('.input-lastname')
      const inputEmail = this.domElt.querySelector('.input-email')
      if (fresh) {
        if (inputFirst) inputFirst.value = fresh.firstname ?? inputFirst.value
        if (inputLast)  inputLast.value  = fresh.lastname  ?? inputLast.value
        if (inputEmail) inputEmail.value = fresh.email     ?? inputEmail.value
      }
      this.domElt.classList.add('isEditing')
    })

    // Save (UPDATE)
    this.domElt.querySelector('.btn-check')?.addEventListener('click', async (e) => {
      e.preventDefault()
      const inputFirst = this.domElt.querySelector('.input-firstname')
      const inputLast  = this.domElt.querySelector('.input-lastname')
      const inputEmail = this.domElt.querySelector('.input-email')

      const payload = {
        firstname: (inputFirst?.value || '').trim(),
        lastname:  (inputLast?.value  || '').trim(),
        email:     (inputEmail?.value || '').trim(),
      }

      const updated = await DB.findByIdAndUpdate(this.id, payload)

      // maj locales
      this.firstname = updated.firstname ?? payload.firstname
      this.lastname  = updated.lastname  ?? payload.lastname
      this.email     = updated.email     ?? payload.email

      // maj DOM (spans + inputs) sans re-render
      const spanFirst = this.domElt.querySelector('td:nth-child(1) .isEditing-hidden')
      const spanLast  = this.domElt.querySelector('td:nth-child(2) .isEditing-hidden')
      const spanEmail = this.domElt.querySelector('td:nth-child(3) .isEditing-hidden')
      if (spanFirst) spanFirst.textContent = this.firstname
      if (spanLast)  spanLast.textContent  = this.lastname
      if (spanEmail) spanEmail.textContent = this.email
      if (inputFirst) inputFirst.value = this.firstname
      if (inputLast)  inputLast.value  = this.lastname
      if (inputEmail) inputEmail.value = this.email

      // sortir du mode édition
      this.domElt.classList.remove('isEditing')
    })

    // Delete
    this.domElt.querySelector('.destroy')?.addEventListener('click', (e) => {
      e.preventDefault()
      window.contactList?.findByIdAndRemove?.(this.id)
    })
  }
}