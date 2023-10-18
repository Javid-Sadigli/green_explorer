// ANSI Colors in JavaScript
const RED_COLOR = "\u001b[31m";
const GREEN_COLOR = "\u001b[32m";
const WHITE_COLOR = "\u001b[37m";
const BLUE_COLOR = "\u001b[34m";

// For logging every request
module.exports.LOG_Request = (req,res,next) => {
    if(req.url.startsWith('/admin'))
    {
        console.log(GREEN_COLOR + `${req.method.toUpperCase()} request to ${req.url}`);
    }
    else
    {
        console.log(WHITE_COLOR + `${req.method.toUpperCase()} request to ${req.url}`);
    }
    next();
};

// For logging errors
module.exports.LOG_Error = (req,res,next) => {
    console.log(RED_COLOR + `NOT FOUND ${req.url}`);
    next();
};
