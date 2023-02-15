const { Contact } = require("../schemas/contactsModel");

const listContactsService = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactByIdService = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};
const removeContactService = async (id) => {
  const contact = await Contact.findByIdAndRemove(id);
  return contact;
};

const addContactService = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
  return contact;
};

const updateContactService = async (id, { name, phone, email }) => {
  const isUpdated = await Contact.findByIdAndUpdate(id, {
    $set: { name, phone, email },
  });
  return isUpdated;
};

const updateStatusContactService = async (id, { favorite }) => {
  const isUpdated = await Contact.findByIdAndUpdate(id, { $set: { favorite } });
  return isUpdated;
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
};
