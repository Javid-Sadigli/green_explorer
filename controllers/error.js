// For sending error pages
module.exports.SEND_Error_Page = function(req,res,next)
{
    res.status(404).render('error');
}