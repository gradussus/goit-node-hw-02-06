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
  contactValidation,
  favoriteContactValidation,
} = require("../../middlevares/contactValidation");
const {
  newContactValidation,
  updateContactValidation,
  updateFavoriteValidation,
} = require("../../schemas/validationJoi");
const { isValidId } = require("../../middlevares/IdValidation");
const { authMiddleware } = require("../../middlevares/authMiddlevare");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(listContacts));

router.get("/:contactId", isValidId, asyncWrapper(getContactById));

router.post(
  "/",
  contactValidation(newContactValidation),
  asyncWrapper(addContact)
);

router.delete("/:contactId", isValidId, asyncWrapper(removeContact));

router.put(
  "/:contactId",
  contactValidation(updateContactValidation),
  isValidId,
  asyncWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  favoriteContactValidation(updateFavoriteValidation),
  isValidId,
  asyncWrapper(updateStatusContact)
);

module.exports = router;
