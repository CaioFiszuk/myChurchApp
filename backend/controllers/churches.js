const Church = require("../models/church");

module.exports.getChurch = async (req, res) => {
  try {
    const church = await Church.findOne();
    if (!church) {
      return res.status(404).send({ message: "Church not found" });
    }
    res.status(200).send(church);
  } catch (err) {
    res.status(500).send({ message: "Server error: " + err.message });
  }
};


module.exports.createChurch = async (req, res) => {
  try{
     const { churchName, image, logo, pastor } = req.body;
     if (!churchName || !pastor) {
       return res.status(400).send({ message: "Todos os campos precisam ser preenchidos" });
     }
     const data = await Church.create({ churchName, image, logo, pastor });
     return res.status(201).send({ data });
  }catch(err){
     res.status(500).send({ message: "It was not possible for create a church" + err })
  }

}

module.exports.updateChurch = async (req, res) => {
 try{
   const updatedChurch = await Church.findOneAndUpdate(
    {},
    {
      churchName: req.body.churchName,
      pastor: req.body.pastor,
    },
    { new: true }
   );
   return res.status(201).send({ updatedChurch });

 }catch(err){
   return res.status(500).send('Server error');
 }
}
