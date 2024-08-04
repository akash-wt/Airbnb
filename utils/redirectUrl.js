module.exports= userRedirectUrl=(req,res,next)=>{
   if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
    // console.log(res.locals.redirectUrl);
   }
    next();
}
