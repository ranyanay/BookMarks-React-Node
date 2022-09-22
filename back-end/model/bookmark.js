const mongoose = require('mongoose')

//creating BookMark model
const bookmark = mongoose.Schema({
    Address : {
        type: String,
        validate: {
            validator: function stringIsAValidUrl(url) {
                const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                return urlRegex.test(url);
            },
            message: props => `${props.value} is not a valid URL!`
          },
        required : true
    },

    Name: {
        type: String,
        unique: true, // name must be unique
        required : true
    },

    Description: {
        type: String,
        max: [100, "The maximum length of the description field is 100, you have entered {VALUE}"],
        default: ""
    },

    Task: {
        type : String,
        max: [200, "The maximum length of the task field is 200, you have entered {VALUE}"],
        default: ""

    }
} , { versionKey: false })

module.exports = mongoose.model("Bookmarks", bookmark, "myBookMarks")