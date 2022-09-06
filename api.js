const router = require("express").Router();
const User = require("./model/user");

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(403).json("error occured");
  }
});

router.post("/" ,async (req , res) =>{
    const userData = req.body;
    const newUser = new User({
        name:userData.name,
        email:userData.email,
        phoneNumber:userData.phoneNumber,
        hobbies:userData.hobbies
    })
    try{
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(error){
    console.log(error.response);
    res.status(500).json(error);
    }
})
router.put("/:id" , async(req , res) =>{
    try {
      const updatedUser = await User.findOneAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
      res.status(500).json(error);
    }
})
router.delete("/:id" , async (req , res) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("The data has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports = router;