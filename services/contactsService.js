const { Contact } = require("../schemas/contactsModel");

const listContactsService = async (owner) => {
  const contacts = await Contact.find({ owner });
  console.log(owner);
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

const addContactService = async ({ name, email, phone }, owner) => {
  const contact = new Contact({ name, email, phone, owner });
  await contact.save();
  return contact;
};

const updateContactService = async (id, { name, phone, email }) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    {
      $set: { name, phone, email },
    },
    { new: true }
  );
  return contact;
};

const updateStatusContactService = async (id, { favorite }) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { $set: { favorite } },
    { new: true }
  );
  return contact;
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
};
