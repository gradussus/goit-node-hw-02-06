const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");
const { validation } = require("../../middlevares/validation");
const {
  newContactValidatoin,
  updateContactValidation,
} = require("../../schemas/validation");

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const contact = await getContactById(req.params.contactId);
    contact
      ? res.status(200).json({ contact })
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", validation(newContactValidatoin), async (req, res) => {
  try {
    const newContact = await addContact(req.body);
    newContact
      ? res.status(201).json({ newContact })
      : res.status(400).json({ message: "Name, email and phone is required" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const isRemoved = removeContact(req.params.contactId);
    isRemoved
      ? res.status(200).json({
          message: `Contact with id ${req.params.contactId} is deleted`,
        })
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put(
  "/:contactId",
  validation(updateContactValidation),
  async (req, res) => {
    try {
      if (req.body.length === 0) {
        res.status(400).json({ message: "Missing fields" });
        return;
      }
      const contact = await updateContact(req.params.contactId, req.body);
      console.log(contact);

      contact
        ? res.status(200).json({
            message: `Contact with ID ${req.params.contactId} is updated`,
            contact,
          })
        : res.status(400).json({ message: "Not found" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
