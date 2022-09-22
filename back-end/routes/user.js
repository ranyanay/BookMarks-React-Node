const express = require("express");
const bookmark = require("../model/bookmark");
const router = express.Router();

const BookMark = require("../model/bookmark"); //getting bookmark model from bookmark.js

const getAllBookmarks = async (req, res) => {
  try {
    //getting all documents from mongoDB
    const allBookmarks = await BookMark.find();

    res.json({
      data: {
        title: "Result for get all bookmarks",
        bookmarks: allBookmarks,
      },
    });
  } catch (error) {
    res.send(error.message);
  }
};

const addNewBookMark = async (req, res) => {
  try {
    //creating new bookmark instance
    const newBookMark = new BookMark({
      Address: req.body?.Address,
      Name: req.body?.Name,
      Description: req.body?.Description,
      Task: req.body?.Task,
    });

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (urlRegex.test(newBookMark.Address) === false){
      return res.sendStatus(401)
    }

    //saving in mongoDB
    const save = await newBookMark.save();

    if (!save){
      return res.sendStatus(401)
 }

    res.send(save)

  } catch (error) {
    res.send(error.message);
  }
};

const deleteBookMarkByName = async (req, res) => {
  try {
    const Name = req.body?.Name;

    const result = await BookMark.findOneAndDelete({ Name: Name });
    if (!result){
         return res.sendStatus(401)
    }

    res.send(result);
    
  } catch (error) {
    res.send(error.message);
  }
};

const updateBookmarkByName = async (req, res) => {
  try {
    const editedName = req.params?.name;
    const document = await BookMark.findOne({ Name: editedName });

    let Address =
      req.body.Address != "" ? req.body.Address : document.Address;
    let Name = req.body.Name != "" ? req.body?.Name : document.Name;
    let Description =
      req.body.Description != ""
       ?  req.body.Description
        : document.Description;
    let Task = req.body?.Task != "" ? req.body.Task : document.Task;

    const updatedBookmark = await BookMark.updateOne({
        Name: editedName
    },
      {
        Address: Address,
        Name: Name,
        Description: Description,
        Task: Task,
      },
      { runValidators: true })
    
    res.sendStatus(200)

  } catch (error) {
    res.sendStatus(401).send({message : "error!"})
  }
};

const findByName = async (req, res) => {
  try {
    const value = req.params?.value;
    const result = await BookMark.where("Name").equals(value);

    res.json({
      data: {
        title: "Result of your search for name -> " + value + ":",
        bookmarks: result,
      },
    });
  } catch (error) {
    res.send(error.message);
  }
};

router.get("/find/:value", findByName);
router.get("/getAll", getAllBookmarks);
router.post("/add", addNewBookMark);
router.delete("/delete", deleteBookMarkByName);
router.patch("/update/:name", updateBookmarkByName);

module.exports = router; //exporting router
