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

const favouriteBlog = (blogs) => {
    if (Array.isArray(blogs) || blogs.likes !== undefined){
        favourite = blogs.reduce((fav, blog) => {
            //console.log(fav.likes,blog.likes)
            if (blog.likes > fav.likes){
                return blog
            }
            else{
                return fav
            }
        },{'likes': -1})
        return favourite
    }
    else{
        return 0
    }
}

module.exports = {
dummy, totalLikes, favouriteBlog
}
