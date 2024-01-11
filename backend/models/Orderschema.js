import mongoose, { Schema } from "mongoose";

const order= new mongoose.Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    ordeItem:[
        //in array : the user can have more than order each order is object
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            Price:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
        }
    ],
   
    shippingAddress:{
        adress:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
  
    paymentMethod:{
        type:String,
        required:true
    },
 
    Itemsprice:{
        type:Number,
        required:true,
        defult :0.0
        },

    taxprice:{
       type:Number,
       required:true,
      default:0.0
        },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0
    },

    isPaid:{
        default:false,
        type:Boolean,
        required:false,
    },
    paidat:{
        type:Date,
    },
    isDelivered:{
        default:false,
        type:Boolean,
        required:true
    }, 
    DeliverdAt:{
        type:Date,
        required:true
    },

    paymentresult:{
       id:{
        type:String,
       },
       status:{
        type:String,
       },
       updatedtime:{
        type:String
       },
       emailadress:{
        type:String
       }
    },
 
    totalprice:{
        type:Number,
        required:true,
        default:0.0
    }
},
{timestamps:true}
)
const Order = mongoose.model("Order", order);
export default Order ;

