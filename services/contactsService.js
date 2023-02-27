const { Contact } = require("../schemas/contactsModel");

const listContactsService = async (owner, page = 1, limit = 100, favorite) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);

  if (!favorite) {
    const contacts = await Contact.find({ owner }, "", {
      skip,
      limit,
    });
    return contacts;
  }
  const isFavorite = JSON.parse(favorite);
  const contacts = await Contact.find(
    { $and: [{ owner }, { favorite: isFavorite }] },
    "",
    {
      skip,
      limit,
    }
  );
  return contacts;
};

const getContactByIdService = async (contactId, owner) => {
  const contact = await Contact.findOne({
    $and: [{ owner }, { _id: contactId }],
  });
  return contact;
};
const removeContactService = async (contactId, owner) => {
  const contact = await Contact.findOneAndDelete({
    $and: [{ owner }, { _id: contactId }],
  });
  return contact;
};

const addContactService = async ({ name, email, phone, favorite }, owner) => {
  const contact = new Contact({ name, email, phone, owner, favorite });
  await contact.save();
  return contact;
};

const updateContactService = async (id, { name, phone, email }, owner) => {
  const contact = await Contact.findOneAndUpdate(
    { $and: [{ owner }, { _id: id }] },
    {
      $set: { name, phone, email },
    },
    { new: true }
  );
  return contact;
};

const updateStatusContactService = async (id, { favorite }, owner) => {
  const contact = await Contact.findOneAndUpdate(
    { $and: [{ owner }, { _id: id }] },
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
