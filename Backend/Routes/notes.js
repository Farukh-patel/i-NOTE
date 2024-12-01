const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../midlewares/fetchUser");
const Notes = require("../models/Notes");
const router = express.Router();
const User=require("../models/User")

//route1:fetching all notes from data base using user  ,using :/api/notes/fetchallnotes | authentication required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//route2:create a note and save it  ,using :/api/notes/addnote | authentication required
router.post( "/addnote",fetchUser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
    body("tag", "Enter a valid tag").isLength({ max: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const Note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await Note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("internal server error occured");
    }
  }
);

//route3:update any note using notes id ,using :/api/notes/updatenote/:id | authentication required

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //update cobject jiske ander data dalenge
    const updatedNote = {};
    if (title) {
      updatedNote.title = title;
    }
    if (description) {
      updatedNote.description = description;
    }
    if (tag) {
      updatedNote.tag = tag;
    }

    //find the note which is to ne updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    //lekin ye verify karne ke liye ki jiska note vo hi use update kare

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("un-authorised request");
    }

    //if we found the note that is to be updated then updat it
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updatedNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("internal server error occured");
  }
});


//route4:delete any note using note id ,using :/api/notes/deletenote/:id | authentication required

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //find the note which is to ne deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    //lekin ye verify karne ke liye ki jiska note vo hi use delete kare

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("un-authorised request");
    }

    //if we found the note that is to be deleted then delete it
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note deleted ", note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("internal server error occured");
  }
});

module.exports = router;
