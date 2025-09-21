import { CoursesForm } from '@/components/forms/courses-form';
import { CurrentStateForm } from '@/components/forms/current-state-form';
import { EducationForm } from '@/components/forms/education-form';
import { GoalForm } from '@/components/forms/goal-form';
import { JobsForm } from '@/components/forms/jobs-form';
import { KeywordsForm } from '@/components/forms/keywords-form';
import { LanguagesForm } from '@/components/forms/languages-form';
import { PersonalForm } from '@/components/forms/personal-form';
import { SkillsForm } from '@/components/forms/skills-form';
import { SoftSkillForm } from '@/components/forms/soft-skills-form';

import {WIZARD_PAGES} from '@/contexts/wizard-context/utils'

type ChooseFormProps = {
    formName: typeof WIZARD_PAGES[number];
}

const ChooseForm = ({ formName }: ChooseFormProps) => {
    switch (formName) {
        case 'personal':
            return <PersonalForm />;
        case 'goals':
            return <GoalForm />;
        case 'current-state':
            return <CurrentStateForm />;
        case 'keywords':
            return <KeywordsForm />;
        case 'education':
            return <EducationForm />;
        case 'jobs':
            return <JobsForm />;
        case 'courses':
            return <CoursesForm />;
        case 'skills':
            return <SkillsForm />;
        case 'languages':
            return <LanguagesForm />;
        case 'soft-skills':
            return <SoftSkillForm />;
        default:
            return null;
    }
}

export { ChooseForm }