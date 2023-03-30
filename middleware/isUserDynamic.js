function isUserCompany (res, req, next){
    if(req.session.currentUser.type === "company"){ 
        next()
    }
}

function isUserEmployee (res, req, next){
    if(req.session.currentUser.type === "employee"){  
        next() 
    }
    
}

module.exports = {
    isUserCompany,
    isUserEmployee,
}