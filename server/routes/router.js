const express = require("express");
const router = express.Router();
const crud = require("../models/crudSchema");

//create user
router.post("/create", async (req, res) => {
  const { name, email, age, mobile, work, add, desc } = req.body;
  if (!name || !email || !age || !mobile || !work || !add || !desc) {
    res.status(400).json({ error: "fill all the required fields" });
  }
  try {
    const preuser = await crud.findOne({ email: email });
    if (preuser) {
      res.status(400).json({ error: "user already exists" });
    } else {
      const addUser = new crud({
        name,
        email,
        age,
        mobile,
        work,
        add,
        desc,
      });
      await addUser.save(); // Fix here
      res.status(200).json({ message: "user created successfully", addUser });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

//show all user list
router.get("/getData", async (req, res) => {
  try {
    const userdata = await crud.find();
    res.status(400).json({ userdata });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//show single user list
router.get("/getSinleUserData/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await crud.findById({ _id: id });
    res.status(201).json({ singleUser });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//update data
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateduser = await crud.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateduser);
    res.status(201).json({ updateduser });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//delete data
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await crud.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    res.status(201).json({ deleteuser });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/:name", async (req, res) => {
  const searchName = req.params.name; // Use req.params for route parameters
  try {
    const search = await crud.find({
      name: { $regex: new RegExp(searchName, "i") },
    });
    console.log(search);
    if (search.length === 0) {
      // Check if the array is empty
      res.status(404).json({ error: "No records exist" });
    } else {
      res.status(200).json(search);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
