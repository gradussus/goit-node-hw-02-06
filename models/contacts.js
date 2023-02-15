const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
} = require("../services/contactsService");

const listContacts = async (req, res) => {
  const contacts = await listContactsService();
  res.json({ contacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ contact });
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  await removeContactService(id);
  res.status(201).json({ status: "success" });
  const { contactId } = req.params;
  const isContactDeleted = await removeContactService(contactId);
  if (!isContactDeleted) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: `Contact with ID ${contactId} deleted succuessfully` });
};
// 63e4ee729f321543bb0c9cbd
const addContact = async (req, res) => {
  const { name, phone, email } = req.body;
  const contact = await addContactService({ name, phone, email });
  res.json({ contact });
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
  res.json({ contact });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const isUpdate = await updateStatusContactService(contactId, { favorite });
  if (!isUpdate) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: `Contact with ID ${contactId} is updated` });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
