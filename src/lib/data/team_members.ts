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
        description: "Inhaber und Head-coach",
        rank: "BJJ Black Belt",
    },
    {
        name: "Marius Pichler",
        image: "marius.JPG",
        description: "Inhaber",
        rank: "BJJ Blue Belt"
    },
    {
        name: "Thiemo Königs",
        image: "thiemo.JPG",
        description: "Wrestling und BJJ Coach",
        rank: "BJJ Black Belt"
    }
];