export default class DB  {
  static setApiURL(data) {
    this.apiURL = data
  }
  
  static async findAll() {
    const response = await fetch(this.apiURL)

    return response.json()
  }
  
  static async create(contact) {
    const res = await fetch(this.apiURL, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        firstname: contact.firstname,
        lastname:  contact.lastname,
        email:     contact.email,
      }),
    })
    return res.json()
  }

  static async findById(id) {
    const res = await fetch(this.apiURL + '/' + id, {

      headers: { 'Accept': 'application/json' }
    })
    return res.json()
  }

  static async findByIdAndUpdate(id, partial) {
    const res = await fetch(this.apiURL + '/' + id, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(partial),
    })
    return res.json()
  }

  static async findByIdAndRemove(id) {
    const res = await fetch(this.apiURL + '/' + id, {

      method: 'DELETE',
    })
    return res.json()
  }
}
