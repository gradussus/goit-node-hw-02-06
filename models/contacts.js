const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
} = require("../services/contactsService");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const contacts = await listContactsService(_id);
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const isContactDeleted = await removeContactService(contactId);
  if (!isContactDeleted) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: `Contact with ID ${contactId} deleted succuessfully` });
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const { name, phone, email } = req.body;
  const contact = await addContactService({ name, phone, email }, _id);
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, phone, email } = req.body;
  const contact = await updateContactService(contactId, {
    name,
    phone,
    email,
  });
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await updateStatusContactService(contactId, { favorite });
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(contact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
