export interface TeamMember {
    name: string;
    image: string;
    description: string;
    rank: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: "Maximilian Galle",
        image: "max.JPG",
        description: "Inhaber und Head-Coach",
        rank: "BJJ Black Belt",
    },
    {
        name: "Marius Pichler",
        image: "marius.JPG",
        description: "Inhaber",
        rank: "BJJ Blue Belt"
    }
];
