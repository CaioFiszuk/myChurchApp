const Member = require("../models/member");

module.exports.getMembers = async (req, res) => {
  try{
    const members = await Member.find({});
    res.status(200).send(members);
  }catch(err){
     res.status(500).send({ message: "Server error: " + err.message });
  }
}

module.exports.createMember = async (req, res) => {
    try{
      const { memberName, birthDate, church } = req.body;
      if(!memberName || !birthDate || !church){
        return res.status(400).send({ message: "Todos os campos precisam ser preenchidos" });
      }
      const data = await Member.create({ memberName, birthDate, church });
      return res.status(201).send({data});
    }catch(err){
      res.status(500).send({ message: "It was not possible to create a member " + err })
    }
}

module.exports.deleteMember = async (req, res) => {
    try{
      const { memberId } = req.params;
      if(!memberId){
        return res.status(404).send({ message: "That member was not found to be deleted" });
      }
      const deletedMember = await Member.findByIdAndDelete(memberId);
      res.send({ message: "Member deleted successfully", deletedMember });
    }catch(err){
      res.status(500).send({ message: "Server error" });
    }
}

module.exports.updateMember = async (req, res) => {
  try{
    const updatedMember = await Member.findByIdAndUpdate(
     req.params.memberId,
     {
       memberName: req.body.memberName,
       birthDate: req.body.birthDate,
     },
     { 
      new: true, 
      runValidators: true, 
    }
    );
    return res.status(201).send({ updatedMember });
 
  }catch(err){
    res.status(500).send('Server error');
  }
}
