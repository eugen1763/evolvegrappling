
export interface ClassSchedule {
    time: string;
    endTime: string;
    class: string;
}

export interface TrainingSchedule {
    [key: string]: ClassSchedule[];
}

export const trainingSchedule: TrainingSchedule = {
    Montag: [
        {time: "18:00", endTime: "19:30", class: "BJJ No-Gi"}
    ],
    Dienstag: [
        {time: "07:00", endTime: "08:30", class: "BJJ No-Gi"},
        {time: "18:00", endTime: "19:30", class: "Wrestling for BJJ (No-Gi)"}
    ],
    Mittwoch: [
        {time: "18:00", endTime: "19:30", class: "BJJ No-Gi"}
    ],
    Donnerstag: [
        {time: "17:00", endTime: "18:30", class: "BJJ No-Gi"}
    ],
    Freitag: [
        {time: "18:00", endTime: "19:30", class: "BJJ No-Gi"}
    ],
    Samstag: [
        {time: "10:00", endTime: "11:30", class: "Freies Training"}
    ],
    Sonntag: [
        {time: "11:00", endTime: "12:30", class: "Open Mat"}
    ]
};
