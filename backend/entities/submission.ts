export interface Submission {
    sessionId: string;
    author: { name: string; email: string; phoneNumber: string; }
    answers: string;
    result: string;
    referralCode?: string;
    invitedBySession?: string;
    createdAt: Date;
    submittedAt: Date;
}