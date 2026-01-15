import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    let token = req.headers.authorization;
    // Check kro token "Bearer" format me hai ya nhi
    if(token && token.startsWith('Bearer')){
        try{
            token = token.split(' ')[1]; // "Bearer <token>" se sirf token nikala
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // User ki ID request mai daal di
            next(); // Agle step (Controller) par jao
        } catch(error){
            res.status(401).json({msg: "Token sahi nhi h, access denied!"});
        }
    } else{
        res.status(401).json({msg: "Login karo pehle, token nhi mila!"});
    }
};