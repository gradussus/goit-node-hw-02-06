const fs = require('fs').promises
const path = require('path')
const contactsPath = path.resolve('./models.contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath)
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  contacts = await listContacts()
  const [desiredContacts] = c => c.id === contactId
  return desiredContacts
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
