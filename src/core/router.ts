import { Router, RequestHandler } from "express";
import prisma from "../prisma";
import generatePrompt from "./service";
import UserSchema from "./zod";

const userRouter = Router();

userRouter.post("/", (async (req, res) => {



    const { 
        email, 
        name, 
        mobile, 
        educationLevel,
        fieldOfStudy,
        currentSkills,
        yearsOfExperience,
        preferredCareerPath,
        techComfortLevel,
        currentRole = "",
        currentCompany = "",
        currentLocation = "",
        currentPackage = ""

    } = req.body;

    const parsedData = UserSchema.parse(req.body);

    if(!parsedData){
        res.status(400).json({
            message: "Invalid data"
        });
        return ;
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user){
        await prisma.user.create({
            data: {
                email,
                name,
                mobile,
                educationLevel,
                fieldOfStudy,
                currentSkills : currentSkills.join(","),
                yearsOfExperience,
                preferredCareerPath,
                techComfortLevel,
                currentRole,
                currentCompany,
                currentLocation,
                currentPackage
    
            }
        });
    }


    const jsonResponse = await generatePrompt({
        educationLevel,
        fieldOfStudy,
        currentSkills,
        yearsOfExperience,
        preferredCareerPath,
        techComfortLevel,
        currentPackage,
        currentRole,
        currentCompany,
        currentLocation
    });

    // console.log(jsonResponse?.replace(/^```json\n/, '').replace(/\n```$/, ''));
    res.status(201).json({
        message: "User data updated successfully",
        // jsonResponse : JSON.parse(jsonResponse || "{}")
        jsonResponse : JSON.parse(jsonResponse?.replace(/^```json\n/, '').replace(/\n```$/, '') || "{}")
    });

}) as RequestHandler)


export { userRouter };
