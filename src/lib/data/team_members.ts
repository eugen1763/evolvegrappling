export interface TeamMember {
    name: string;
    image: string;
    description: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: "John Doe",
        image: "https://placehold.co/200x200",
        description: "Haupttrainer und Brazilian Jiu-Jitsu Schwarzgurt mit über 15 Jahren Erfahrung in Wettkampf und Lehre."
    },
    {
        name: "Jane Smith",
        image: "https://placehold.co/200x200",
        description: "Wettkampfteam-Trainerin und Braungurt, spezialisiert auf moderne Wettkampftechniken und -strategie."
    },
    {
        name: "Mike Johnson",
        image: "https://placehold.co/200x200",
        description: "Grundlagen-Lehrer und Lilágurt, fokussiert darauf, Anfängern beim Aufbau einer starken technischen Basis zu helfen."
    }
];