const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
} = require("../services/contactsService");

const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async (req, res) => {
  try {
    const contacts = await listContactsService();
    res.json({ contacts });
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactByIdService(id);
    res.json({ contact });
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (res, req) => {
  try {
    const { id } = req.params;
    await removeContactService(id);
    res.json({ status: "success" });
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (res, req) => {
  try {
    const { name, phone, email } = req.body;
    await addContactService({ name, phone, email });
    res.json({ status: "success" });
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    await updateContactService(id, { name, phone, email });
    res.json({ status: "success" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
