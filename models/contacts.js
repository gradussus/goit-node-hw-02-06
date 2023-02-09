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
  const { id } = req.params;
  const contact = await getContactByIdService(id);
  res.json({ contact });
};

const removeContact = async (res, req) => {
  const { id } = req.params;
  await removeContactService(id);
  res.json({ status: "success" });
};

const addContact = async (res, req) => {
  const { name, phone, email } = req.body;
  await addContactService({ name, phone, email });
  res.json({ status: "success" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  await updateContactService(id, { name, phone, email });
  res.json({ status: "success" });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
