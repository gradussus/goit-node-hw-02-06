const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
} = require("../services/contactsService");

const listContacts = async (req, res) => {
  const contacts = await listContactsService();
  // console.log(contacts);
  res.json({ contacts });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactByIdService(id);
  res.json({ contact });
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  await removeContactService(id);
  res.json({ status: "success" });
};

const addContact = async (req, res) => {
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
