const { Contact } = require("../schemas/contactsModel");

const listContactsService = async (owner, page = 1, limit = 100, favorite) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);

  if (favorite) {
    const contacts = await Contact.find({ $and: [{ owner }, { favorite }] })
      .skip(skip)
      .limit(limit);
    return contacts;
  }
  const contacts = await Contact.find({ owner }).skip(skip).limit(limit);
  return contacts;
};

const getContactByIdService = async (id, owner) => {
  const contact = await Contact.find({ $and: [{ owner }, { _id: id }] });
  return contact;
};
const removeContactService = async (id, owner) => {
  const contact = await Contact.findOneAndRemove({
    $and: [{ owner }, { _id: id }],
  });
  return contact;
};

const addContactService = async ({ name, email, phone }, owner) => {
  const contact = new Contact({ name, email, phone, owner });
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
