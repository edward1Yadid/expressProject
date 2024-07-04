const mongoose=require("mongoose")
const {Address,Image}=require("../genralSchemas/generalSchemas")
const ObljectCardSub={
    type: String,
    required: true,
}
const cardSchema = new mongoose.Schema({
    title:ObljectCardSub,
    subtitle: ObljectCardSub,
    description: ObljectCardSub,
    phone: {
        type: String,
        required: true,
        match: /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
    },
    email: {
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: '{VALUE} is not a valid email!',
        unique:true
      },
    web: {
        type: String,
        match: /^(http|https):\/\/[^ "]+$/, 
        message: '{VALUE} is not a valid url!',
        trim: true,
        lowercase: true,
    },
    image:Image,
    address: Address,
    bizNumber: {
      type: Number,
      required: true,
    },
    likes: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  const Card= mongoose.model("card", cardSchema);

  exports.Card=Card