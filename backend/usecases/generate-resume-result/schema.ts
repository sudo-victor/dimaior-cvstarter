import z from "zod";

export const ResumeSchema = z.object({
  contact: z.object({
    name: z.string(),
    location: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
  summary: z.string(),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      period: z.string(),
      status: z.string(),
    })
  ),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string().optional(),
      description: z.array(z.string()),
      technologies: z.array(z.string()),
    })
  ),
  skills: z.object({
    technical: z.array(z.string()),
    soft: z.array(z.string()),
  }),
  languages: z
    .array(
      z.object({
        language: z.string(),
        level: z.string(),
      })
    )
    .optional(),
  courses: z.string().optional(),
  linkedinHeadline: z.string().optional(),
});
