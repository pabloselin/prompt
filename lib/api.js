"use strict";

const Archetype = require("archetype-js");
//const BookType = require("./book");
const { ObjectId } = require("mongodb");
const express = require("express");

module.exports = db => {
  const router = express.Router();

  const wrapAsync = handler => (req, res) =>
    handler(req)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));

  router.get(
    "/:collection",
    wrapAsync(async function(req) {
      return db
        .db()
        .collection(req.params.collection)
        .find({})
        .sort({ orden: 1 })
        .collation({ locale: "en_US", numericOrdering: true })
        .toArray();
    })
  );

  router.get(
    "/:collection/:id",
    wrapAsync(async function(req) {
      return db
        .db()
        .collection(req.params.collection)
        .find({ id: req.params.id })
        .sort()
        .toArray();
    })
  );

  router.post(
    "/",
    wrapAsync(async function(req) {
      const book = new BookType(req.body);
      await db.collection("Book").insertOne(book);
      return { book };
    })
  );

  router.delete(
    "/:id",
    wrapAsync(async function(req) {
      const { result } = await db.collection("acciones_condicional").deleteOne({
        _id: Archetype.to(req.params.id, ObjectId)
      });
      return { result };
    })
  );

  return router;
};
