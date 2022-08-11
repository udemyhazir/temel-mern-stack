const Kullanici=require('../models/kullaniciModel')
const jwt=require('jsonwebtoken')


const tokenOlustur=(_id)=>{

    return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'})
}



const loginKullanici=async (req,res)=>{

    const {email,parola}=req.body;

    try {
        const kullanici=await Kullanici.login(email,parola)

        const token=tokenOlustur(kullanici._id)

        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({hata:error.message})
    }
}


const signupKullanici=async (req,res)=>{

    
    const {email,parola}=req.body;

    try {
        const kullanici=await Kullanici.signup(email,parola)

        const token=tokenOlustur(kullanici._id)
        
        
        res.status(200).json({email,token})
    } catch (error) {
       
        res.status(400).json({hata:error.message})
    }

}


module.exports={
    loginKullanici,
    signupKullanici
}