const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const [desiredContacts] = contacts.filter((c) => c.id === contactId);
    return desiredContacts;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const afterDelete = contacts.filter((c) => c.id !== contactId);
    if (contacts.length === afterDelete.length) {
      return false;
    }
    await fs.writeFile(contactsPath, JSON.stringify(afterDelete));
    return true;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async ({ name, email, phone }) => {
  if (!name || !email || !phone) {
    return false;
  }
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((item) => item.id === contactId);
    if (contactIndex === -1) {
      return false;
    }
    contacts.forEach(async (cont) => {
      if (cont.id === contactId) {
        if (name) {
          cont.name = name;
        }
        if (email) {
          cont.email = email;
        }
        if (phone) {
          cont.phone = phone;
        }
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log(cont);
      }
    });
    return true;
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
