const mongoose=require('mongoose');

const consultantSchema=mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },  
    qualification:{
        type: String,
        required: true
    },  
})

const Consultant = mongoose.model('Consultant', consultantSchema);
module.exports = Consultant;