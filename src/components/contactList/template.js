export function getAddContactTemplate() {
  return `<aside class="w-1/3 bg-gray-200 p-6 pb-12">
    <h2 class="text-xl font-bold mb-4">Add a Contact</h2>
    <div class="mb-4">
      <label class="block text-gray-700">Firstname</label>
      <input id="new-firstname" type="text"
        class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Alex" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Lastname</label>
      <input id="new-lastname" type="text"
        class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Doe" />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700">Email</label>
      <input id="new-email" type="email"
        class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="alex.doe@gmail.com" />
    </div>
    <button id="btn-add" type="button"
      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
      Add
    </button>
  </aside>`;
}

export function getContactlistTemplate(contactList) {
  return `
    <section class="w-2/3 p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold mb-4">Contacts List</h2>
        <p class="text-gray-600 contacts-count mb-4">
          Contacts Count :
          <span class="font-bold contacts-count-number">
            ${contactList.getContactCount()}
          </span>
        </p>
      </div>

      <div class="mb-4">
        <input id="search-contact" type="text"
          class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search a contact"/>
      </div>

      <table class="table-auto w-full contacts-table">
        <thead>
          <tr class="bg-gray-200">
            <th class="text-left p-4 rounded-tl-lg"><a href="#">Firstname</a></th>
            <th class="text-left p-4"><a href="#">Lastname</a></th>
            <th class="text-left p-4"><a href="#">Email</a></th>
            <th class="text-right p-4 rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${contactList.contacts.map(contact => contact.render()).join('')}
        </tbody>
      </table>
    </section>
  `;
}
