const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
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
  }
  res.json({ contact });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const isContactDeleted = await removeContactService(contactId);
  if (!isContactDeleted) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: `Contact with if ${contactId} deleted succuessfully` });
};
// 63e4ee729f321543bb0c9cbd
const addContact = async (req, res) => {
  const { name, phone, email } = req.body;
  await addContactService({ name, phone, email });
  res.json({ status: "success" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, phone, email } = req.body;
  const isUpdate = await updateContactService(contactId, {
    name,
    phone,
    email,
  });
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
};
