const mongoose=require("mongoose")
const Chat=require("./models/chat")

main()
    .then(() => {
        console.log("Connection to database successful");
    })
    .catch(err => console.error(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
    
        {
            from:"neha",
            to:"priya",
            msg:"send me your exam sheets",
            created_at:new Date(),
        },
        {
            from:"amit",
            to:"nayak",
            msg:"send me exam sheets",
            created_at:new Date(),
        },
        {
            from:"joy",
            to:"hiral",
            msg:"hello",
            created_at:new Date(),
         },
         {
            from:"kashish",
            to:"kane",
            msg:"hi how are you ",
            created_at:new Date(),
        },
];

Chat.insertMany(allchats);
   
