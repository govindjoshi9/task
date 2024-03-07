const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const PORT = process.env.PORT || 8080;



//database connection
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/newone");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}



//create clients

app.post("/createClinent", async (req, res) => {
  const { name, email, project, lastName, mobNo } = req.body;

    try{
    const userDoc = await User.create({
      name,
      email,
      project,
      lastName,
      mobNo,
    });

    res.json(userDoc);
  }  catch (e) {
  // console.error("Error registering user:", e);
  res.status(500).json({ error: e.message });
}

});

//Show Clients

app.get("/", async (req, res) => {
    res.json(await User.find({ }));

})

//update Clients
app.put("/updateClient/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, project, lastName, mobNo } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        project,
        lastName,
        mobNo,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    // console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
});



//delet client
app.delete("/deleteClient/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    // console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message });
  }
});
connectToDatabase().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
