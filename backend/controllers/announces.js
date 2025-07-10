const Announce = require("../models/announce");

module.exports.getAnnounces = async (req, res) => {
    try{
      const announces = await Announce.find({});
      res.status(200).send(announces);
    }catch(err){
       res.status(500).send({ message: "Server error: " + err.message });
    }
}

module.exports.createAnnounce = async (req, res) => {
    try{
      const { announceDate, title, art, church } = req.body;
      if(!announceDate || !title || !art || !church){
        return res.status(400).send({ message: "Todos os campos precisam ser preenchidos" });
      }
      const data = await Announce.create({ announceDate, title, art, church });
      return res.status(201).send({data});
    }catch(err){
      res.status(500).send({ message: "It was not possible to create an announce " + err })
    }
}

module.exports.deleteAnnounce = async (req, res) => {
        try{
      const { announceId } = req.params;
      if(!announceId){
        return res.status(404).send({ message: "That announce was not found to be deleted" });
      }
      const deletedAnnounce = await Announce.findByIdAndDelete(announceId);
      res.send({ message: "Announce deleted successfully", deletedAnnounce });
    }catch(err){
      res.status(500).send({ message: "Server error" });
    }
}

module.exports.updateAnnounce = async (req, res) => {
   try{
     const updatedAnnounce = await Announce.findByIdAndUpdate(
      req.params.announceId,
      {
        announceDate: req.body.announceDate,
        title: req.body.title,
        content: req.body.content,
        art: req.body.art
      },
      { 
       new: true, 
       runValidators: true, 
     }
     );
     return res.status(201).send({ updatedAnnounce });
  
   }catch(err){
     res.status(500).send('Server error');
   }
}
