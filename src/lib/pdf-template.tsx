import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import { Resume } from "@/@types/domain/resume";

Font.register({
  family: "Lexend Deca",
  fonts: [
    {
      src: `${process.env.NEXT_PUBLIC_APP_URL}/fonts/lexend/lexend-deca-regular.ttf`,
      fontWeight: 400,
    },
    {
      src: `${process.env.NEXT_PUBLIC_APP_URL}/fonts/lexend/lexend-deca-medium.ttf`,
      fontWeight: 500,
    },
    {
      src: `${process.env.NEXT_PUBLIC_APP_URL}/fonts/lexend/lexend-deca-semiBold.ttf`,
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingTop: 57, // 2 cm
    paddingBottom: 57, // 2 cm
    paddingLeft: 57, // 2 cm
    paddingRight: 57, // 2 cm
    fontFamily: "Lexend Deca",
  },
  container: {
    flexDirection: "column",
    gap: 24,
  },
  header: { flexDirection: "column", gap: 5 },
  name: {
    fontSize: 20,
    fontWeight: 600,
    color: "#2A2A2C",
  },
  summaryHeaderText: {
    fontSize: 12,
    fontWeight: 400,
    color: "#3B8A6F",
  },
  contactItem: {
    fontSize: 12,
    fontWeight: 300,
    color: "#000000",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    marginVertical: 0,
  },
  section: { flexDirection: "column", gap: 8 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "#2A2A2C",
  },
  summaryText: {
    fontSize: 12,
    fontWeight: 300,
    color: "#424242",
  },
  linkedinTip: {
    fontSize: 12,
    fontWeight: 500,
    color: "#33CC99",
  },
  educationTitle: {
    fontSize: 12,
    fontWeight: 400,
    color: "#424242",
  },
  educationSubtitle: {
    fontSize: 12,
    fontWeight: 300,
    color: "#424242",
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 400,
    color: "#424242",
  },
  listItem: {
    fontSize: 12,
    fontWeight: 300,
    color: "#424242",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: "#33CC99",
    fontSize: 12,
    color: "#ffffff",
  },
  languageText: {
    fontSize: 12,
    fontWeight: 300,
    color: "#424242",
  },
  coursesText: {
    fontSize: 12,
    fontWeight: 300,
    color: "#424242",
  },
});

interface PDFTemplateProps {
  resume: Resume;
}

export const PDFTemplate: React.FC<PDFTemplateProps> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.contact.name}</Text>
          <Text style={styles.summaryHeaderText}>
            {resume.linkedinHeadline}
          </Text>
          <Text style={styles.contactItem}>{resume.contact.location}</Text>
          <Text style={styles.contactItem}>{resume.contact.email}</Text>
          <Text style={styles.contactItem}>{resume.contact.phone}</Text>
        </View>

        <View style={styles.divider} />

        {/* Resumo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          <Text style={styles.summaryText}>{resume.summary}</Text>
        </View>

        <View style={styles.divider} />

        {/* Educação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Educação</Text>
          {resume.education.map((edu, i) => (
            <View key={i}>
              <Text style={styles.educationTitle}>{edu.degree}</Text>
              <Text style={styles.educationSubtitle}>
                {edu.institution} - {edu.period}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* Experiência */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiência</Text>
          {resume.experience.map((exp, i) => (
            <View key={i}>
              <Text style={styles.experienceTitle}>
                {exp.title} {exp.company && `- ${exp.company}`}
              </Text>
              {exp.description.map((desc, j) => (
                <Text key={j} style={styles.listItem}>
                  • {desc}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* Habilidades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.skillsContainer}>
            {resume.skills.technical.map((skill, i) => (
              <Text key={i} style={styles.skillTag}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        {resume?.languages && resume?.languages?.length > 0 && (
          <>
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Idiomas</Text>
              {resume.languages.map((lang, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.languageText}>{lang.language}</Text>
                  <Text style={styles.languageText}>{lang.level}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {resume.courses && (
          <>
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cursos e Certificações</Text>
              <Text style={styles.coursesText}>{resume.courses}</Text>
            </View>
          </>
        )}
      </View>
    </Page>
  </Document>
);
