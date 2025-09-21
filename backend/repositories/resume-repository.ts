import { supabaseAdmin } from "@backend/lib/supabase";
import { Resume } from "@/@types/domain/resume";

const create = async (resumeData: Resume) => {
  const { data, error } = await supabaseAdmin
    .from("resumes")
    .insert({
      fullname: resumeData.contact.name,
      email: resumeData.contact.email,
      phone_number: resumeData.contact.phone,
      state:
        resumeData.contact.location.split("/")[0] ??
        resumeData.contact.location,
      city:
        resumeData.contact.location.split("/")[1] ??
        resumeData.contact.location,
      linkedin_headline: resumeData.linkedinHeadline ?? null,
      summary: resumeData.summary,
      courses: resumeData.courses ?? null,
      education: resumeData.education,
      experience: resumeData.experience,
      hard_skills: resumeData.skills.technical,
      soft_skills: resumeData.skills.soft,
      languages: resumeData.languages ?? [],
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, result: data };
};

const updateFileName = async (id: number, fileUrl: string) => {
  const { data, error } = await supabaseAdmin
    .from("resumes")
    .update({ file_url: fileUrl })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return { ok: false, error: error.message };

  return { ok: true, result: data };
};

const getFileNameById = async (id: number) => {
  const { data, error } = await supabaseAdmin
    .from("resumes")
    .select("file_name")
    .eq("id", id)
    .single();

  if (error) return { ok: false, error: error.message };

  return { ok: true, result: data };
};

export const resumeRepository = { create, updateFileName, getFileNameById };
