const router = require("express").Router()
const { User } = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Joi = require("joi")
const ObjectId = require('mongodb').ObjectId;

router.get("/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).send({ debtors: user.debtorsList })
})

router.post("/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    const ToDoTask = {
        name: jwt.sign("pop", 'shhhhh'),
        ...req.body.debtorsList,
    }
    user.debtorsList.push(req.body.debtorsList)

    await user.save();
    res.status(200).send({ data: ToDoTask, message: "Task added" })
})

router.put("/:email/update/:id", async (req, res) => {
    var o_id = new ObjectId(req.params.id)   
    await User.updateOne({"debtorsList._id":  o_id},{
            $set:{
                'debtorsList.$.firstName': req.body.firstName,
                'debtorsList.$.lastName': req.body.lastName,
                'debtorsList.$.amount': req.body.amount,
                'debtorsList.$.date': req.body.date
            }
          });
        


        res.status(200).send({ message: "Task edited" })
    })

router.delete("/:email/delete/:id", async (req, res) => {
    var o_id = new ObjectId(req.params.id)   
    await User.updateOne({email: req.params.email},{
            $pull:{ debtorsList: {'_id': o_id}
            }
          });
    res.status(200).send({message: "Task deleted" })
});

module.exports = router