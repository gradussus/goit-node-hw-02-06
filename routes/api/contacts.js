const { asyncWrapper } = require("../../helpers/apiHelpers");
const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts.js");
const {
  validation,
  favoriteValidation,
} = require("../../middlevares/validation");
const {
  newContactValidation,
  updateContactValidation,
  updateFavoriteValidation,
} = require("../../schemas/validation");
const { isValidId } = require("../../middlevares/IdValidation");

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

router.patch(
  "/:contactId/favorite",
  favoriteValidation(updateFavoriteValidation),
  isValidId,
  asyncWrapper(updateStatusContact)
);

module.exports = router;
