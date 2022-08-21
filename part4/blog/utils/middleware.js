// const tokenExtractor = (request, response, next) => {
//     const authorization = request.get('authorization')  
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return send(authorization.substring(7))
//     }
//     next()
//   }

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
        error: 'invalid token'
    })
    }
}

module.exports = {
//tokenExtractor,
errorHandler
}