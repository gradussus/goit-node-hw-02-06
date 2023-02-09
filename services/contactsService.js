const { Contact } = require("../schemas/contactsModel");

const listContactsService = async () => {
  const contacts = await Contact.find({});
  console.log(contacts);
  return contacts;
};

const getContactByIdService = async (id) => {
  const contact = await Contact.findById(id);
  console.log(contact);
  if (!contact) {
    // Додати обробку помилки, кастомну
  }
  return contact;
};
const removeContactService = async (id) => {
  // Додати обробку помилки, кастомну
  await Contact.findByIdAndRemove(id);
};

const addContactService = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
};
const updateContactService = async (id, { name, phone, email }) => {
  // Додати обробку помилки, кастомну
  await Contact.findByIdAndUpdate(id, { $set: { name, phone, email } });
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
