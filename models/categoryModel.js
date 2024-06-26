const mongoose = require('mongoose')


const categorySchema = mongoose.Schema({ 
    title:{
        type:String,
        required:true,
        maxLength:30
    }
})

module.exports = mongoose.model("Category", categorySchema)
