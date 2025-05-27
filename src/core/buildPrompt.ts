
export const buildPrompt = (formData: any) => `
I have the following user profile:
- Highest Education Level: ${formData.educationLevel}
- Field of Study: ${formData.fieldOfStudy}
- Current Skill Set: ${formData.currentSkills}
- Years of Experience: ${formData.yearsOfExperience}
- Preferred Career Path: ${formData.preferredCareerPath}
- Tech Comfort Level: ${formData.techComfortLevel}
- Current Package: ${formData.currentPackage || "Not Provided"}
- Current Role: ${formData.currentRole || "Not Provided"}
- Current Company: ${formData.currentCompany || "Not Provided"}
- Current Location: ${formData.currentLocation || "Not Provided"}

Please generate a detailed career report in JSON format with the following keys:
- estimatedSalary (string): Estimated salary range in INR (e.g., "₹5–8 LPA")
- roles (array of strings): Suitable job roles the user can aim for
- missingSkills (array of strings): Skills the user needs to develop
- learningTracks (array of strings): Recommended learning paths
- roiUpskilling (string): Expected return on investment for upskilling

Respond ONLY with the JSON object and no additional text.
`;