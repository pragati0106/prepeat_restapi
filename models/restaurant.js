const mongoose=require("mongoose")


const restaurantSchema=new mongoose.Schema({

    name:{type: String,required:true},
    description: {type: String},
    address: {type: String},
    rating:{type: String},
    menu: [
      {
        name: {type: String,requireed:true},
        description: {type: String},
        price:{type: String},
        category:{type: String,default:"main dish"}
      },
    ]
  }, {timestamps: true})

const Restaurant= mongoose.model('Restaurant',restaurantSchema)

module.exports =Restaurant

  