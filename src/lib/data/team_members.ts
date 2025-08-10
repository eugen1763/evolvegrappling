export interface TeamMember {
    name: string;
    image: string;
    description: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: "John Doe",
        image: "https://placehold.co/200x200",
        description: "Head Coach and Brazilian Jiu-Jitsu Black Belt with over 15 years of experience in competition and teaching."
    },
    {
        name: "Jane Smith",
        image: "https://placehold.co/200x200",
        description: "Competition Team Coach and Brown Belt specializing in modern competition techniques and strategy."
    },
    {
        name: "Mike Johnson",
        image: "https://placehold.co/200x200",
        description: "Fundamentals Instructor and Purple Belt focused on helping beginners build a strong technical foundation."
    }
];
