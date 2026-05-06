import { Request, Response, NextFunction } from "express";
import userSchema from "../schemas/userSchema";

export function userSchemaValidation(req:Request, res:Response, next:NextFunction){
    const {name, email, password, passwordConfirmation, type} = req.body;

    const user = {
        name,
        email,
        password,
        passwordConfirmation,
        type:!type?"user":type,
    }

    const { error } = userSchema.validate(user,{abortEarly:false});

    if (error){
        const errors = error.details.map((detail)=> detail.message);
        return res.status(422).send(errors);
    }
        
    next();
}