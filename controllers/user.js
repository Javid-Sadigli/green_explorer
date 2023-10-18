module.exports = {
    // For Home page
    GET_Home : function(req, res, next)
    {
        res.render('home', {PageTitle : 'Home'});
    },
    
    // For About page
    GET_About_Us : function(req, res, next)
    {
        res.render('about', {PageTitle : 'About Us'});
    },

    // For Shponsorships page
    GET_Sponsorships : function(req, res, next)
    {
        res.render('sponsorships', {PageTitle : 'Sponsorships'});
    },

    // For researchs page
    GET_Researchs : function(req, res, next)
    {
        req.user.getResearchs(function(researchs)
        {
            res.render('researchs', {PageTitle : 'Researchs', researchs: researchs});
        });
    }, 

    // For Add research page
    GET_Add_Research : function(req, res, next) 
    {
        res.render('add-research', {PageTitle : 'Add Research'});
    },

    // For adding researches
    POST_Add_Research : function(req, res, next)
    {
        const title = req.body.title; 
        const description = req.body.description;
        const adress = req.body.adress;
        const image_filename = req.user.username + '-' + title + '.png'; 
        req.user.addResearch(
            title, description, 
            image_filename, adress,
            function()
            {
                res.redirect('/add-research');
            }
        );
    }, 

    // Details page for every research
    GET_Details : function(req, res, next)
    {
        const research_id = req.params.researchId;
        req.user.getResearchById(research_id, function(research)
        {
            res.render('research-details', {PageTitle : 'Details', research : research});
        });
    }
}