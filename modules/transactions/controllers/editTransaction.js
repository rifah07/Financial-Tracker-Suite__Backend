const mongoose= require("mongoose")

const editTransaction = (req,res) =>{

    res.status(200).json({
        status: "Transaction updated successfully!"
    })

}

module.exports= editTransaction;