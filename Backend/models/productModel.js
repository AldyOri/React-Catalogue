const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter a product name"]
        },
        description:{
            type: String,
            required: false
        },
        price:{
            type: Number,
            required : [true, "Please enter the product price"]
        },
        quantity:{
            type: Number,
            required: [true, "Please enter the quantity"]

        },
        category:{
            type: mongoose.SchemaTypes.Mixed,
            required: true
        },
        manufacturer:{
            type: mongoose.SchemaTypes.Mixed,
            required: true
        },
        image:{
            type: String,
            required: false,
            default: "https://placehold.co/300"
        },
        
        
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product;