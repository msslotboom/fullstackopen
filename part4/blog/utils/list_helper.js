const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    if (Array.isArray(blogs) || blogs.likes !== undefined){
        total = blogs.reduce((accumulator, blog) => {
            return accumulator + blog.likes;
        },0)
        if (typeof(total) !== 'undefined'){
            return total
        }
        else{
            return 0
        }
    }
    else{
        return 0
    }
}

module.exports = {
dummy, totalLikes
}
