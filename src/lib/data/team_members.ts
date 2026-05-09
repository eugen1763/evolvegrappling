export interface TeamMember {
    name: string;
    image: string;
    description: string;
    rank: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: "Maximilian Galle",
        image: "optimized/max.webp",
        description: "Inhaber und Head-Coach",
        rank: "BJJ Black Belt",
    },
    {
        name: "Marius Pichler",
        image: "optimized/marius.webp",
        description: "Inhaber",
        rank: "BJJ Blue Belt"
    }
];
