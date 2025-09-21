type MakeCvPromptParams = {
  userData: string;
};

export const makeCvPrompt = (params: MakeCvPromptParams) => {
  const system =
    "Você é um especialista em RH, otimização de currículos para ATS e SEO de perfis no LinkedIn.";

  const user = `
Crie um currículo profissional em português brasileiro para um jovem profissional.

DADOS DO CANDIDATO:
${JSON.stringify(params.userData, null, 2)}

DIRETRIZES PARA ATS e LINKEDIN:
- Use títulos de cargos padrão do mercado
- Inclua palavras-chave relevantes da área de interesse
- Valorize experiências informais, projetos acadêmicos e voluntariado
- Use verbos de ação e quantifique resultados
- Destaque potencial e vontade de aprender
- Foque em competências transferíveis
- Além do currículo, gere também uma headline curta para perfil no LinkedIn (linkedinHeadline)

RETORNE APENAS UM JSON VÁLIDO com esta estrutura exata:
{
  "contact": {
    "name": "Nome completo do candidato",
    "location": "Cidade - Estado",
    "email": "email@exemplo.com",
    "phone": "(00) 00000-0000"
  },
  "summary":  "Resumo profissional de 2-3 linhas destacando objetivo e principais qualificações",
  "education": [
    {
      "degree": "Nome do curso completo",
      "institution": "Nome da instituição",
      "period": "Ano início - Ano fim ou 'atual'",
      "status": "Concluído/Em andamento/Trancado"
    }
  ],
  "experience": [
    {
      "title": "Título do projeto ou cargo (use títulos profissionais mesmo para projetos)",
      "company": "Nome da empresa ou 'Projeto Pessoal'",
      "description": [
        "Primeira atividade ou resultado alcançado",
        "Segunda atividade ou resultado alcançado"
      ],
      "technologies": ["tech1", "tech2", "tech3"]
    }
  ],
  "skills": {
    "technical": ["React", "Node.js", "JavaScript", "HTML", "CSS"],
    "soft": ["Comunicação", "Trabalho em equipe", "Proatividade"]
  },
  "languages": [
    {
      "language": "Português",
      "level": "Nativo"
    },
    {
      "language": "Inglês",
      "level": "Intermediário"
    }
  ],
  "courses": "Descrição de cursos extras e certificações relevantes",
  "linkedinHeadline": "Headline curta no estilo 'Cargo | Principais Skills | Objetivo'"
}

IMPORTANTE: 
- Retorne APENAS o JSON válido, sem texto adicional
- Use dados reais baseados no formData fornecido
- Para experiências, transforme trabalhos informais em títulos profissionais
- Inclua projetos acadêmicos e pessoais como experiência válida
- A chave linkedinHeadline deve ser uma frase curta e otimizada para LinkedIn
`;
  return { system, user };
};
