const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
} = require("../services/contactsService");

const { NotFoundError } = require("../helpers/errors");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  const contacts = await listContactsService(_id, page, limit, favorite);
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await getContactByIdService(contactId, _id);
  if (!contact) {
    throw new NotFoundError("Not found");
  }
  res.json(contact);
};

const removeContact = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contact = await removeContactService(contactId, _id);
  if (!contact) {
    throw new NotFoundError("Not found");
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const { name, phone, email, favorite } = req.body;
  const contact = await addContactService(
    { name, phone, email, favorite },
    _id
  );
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const { name, phone, email } = req.body;
  const contact = await updateContactService(
    contactId,
    {
      name,
      phone,
      email,
    },
    _id
  );
  if (!contact) {
    throw new NotFoundError("Not found");
  }
  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const { favorite } = req.body;
  const contact = await updateStatusContactService(
    contactId,
    { favorite },
    _id
  );
  if (!contact) {
    throw new NotFoundError("Not found");
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
