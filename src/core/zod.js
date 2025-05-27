"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(1, "Name is required"),
    mobile: zod_1.z.string().min(10, "Mobile number is too short"),
    educationLevel: zod_1.z.string().min(1),
    fieldOfStudy: zod_1.z.string().min(1),
    currentSkills: zod_1.z.array(zod_1.z.string()).min(1),
    yearsOfExperience: zod_1.z.string().min(1),
    preferredCareerPath: zod_1.z.string().min(1),
    techComfortLevel: zod_1.z.string().min(1),
    currentRole: zod_1.z.string().optional(),
    currentCompany: zod_1.z.string().optional(),
    currentLocation: zod_1.z.string().optional(),
    currentPackage: zod_1.z.string().optional(),
});
exports.default = UserSchema;
