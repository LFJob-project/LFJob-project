function isUserCompany (res, req, next){
    if(req.session.currentUser.type === "company"){ 
    }
}

function isUserEmployee (res, req, next){
    if(req.session.currentUser.type === "employee"){   
    }
    
}

module.exports = {
    isUserCompany,
    isUserEmployee,
}