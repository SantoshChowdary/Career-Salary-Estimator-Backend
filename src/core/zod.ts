import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(), 
  name: z.string().min(1, "Name is required"),
  mobile: z.string().min(10, "Mobile number is too short"), 
  educationLevel: z.string().min(1),
  fieldOfStudy: z.string().min(1),
  currentSkills: z.array(z.string()).min(1),
  yearsOfExperience: z.string().min(1), 
  preferredCareerPath: z.string().min(1),
  techComfortLevel: z.string().min(1),

  currentRole: z.string().optional(),
  currentCompany: z.string().optional(),
  currentLocation: z.string().optional(),
  currentPackage: z.string().optional(),
});

export default UserSchema;
