const { asyncWrapper } = require("../../helpers/apiHelpers");
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
  newContactValidation,
  updateContactValidation,
} = require("../../schemas/validation");
const { isValidId } = require("../../middlevares/asd");

const router = express.Router();

router.get("/", asyncWrapper(listContacts));

router.get("/:contactId", isValidId, asyncWrapper(getContactById));

router.post("/", validation(newContactValidation), asyncWrapper(addContact));

router.delete("/:contactId", isValidId, asyncWrapper(removeContact));

router.put(
  "/:contactId",
  validation(updateContactValidation),
  isValidId,
  asyncWrapper(updateContact)
);

module.exports = router;
