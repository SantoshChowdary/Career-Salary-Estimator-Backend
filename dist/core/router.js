"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const service_1 = __importDefault(require("./service"));
const zod_1 = __importDefault(require("./zod"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, mobile, educationLevel, fieldOfStudy, currentSkills, yearsOfExperience, preferredCareerPath, techComfortLevel, currentRole = "", currentCompany = "", currentLocation = "", currentPackage = "" } = req.body;
    const parsedData = zod_1.default.parse(req.body);
    if (!parsedData) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        yield prisma_1.default.user.create({
            data: {
                email,
                name,
                mobile,
                educationLevel,
                fieldOfStudy,
                currentSkills: currentSkills.join(","),
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
    const jsonResponse = yield (0, service_1.default)({
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
    console.log(jsonResponse === null || jsonResponse === void 0 ? void 0 : jsonResponse.replace(/^```json\n/, '').replace(/\n```$/, ''));
    res.status(201).json({
        message: "User data updated successfully",
        // jsonResponse : JSON.parse(jsonResponse || "{}")
        jsonResponse: JSON.parse((jsonResponse === null || jsonResponse === void 0 ? void 0 : jsonResponse.replace(/^```json\n/, '').replace(/\n```$/, '')) || "{}")
    });
})));
