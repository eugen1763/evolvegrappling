
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
        {time: "18:00 Uhr", endTime: "19:30 Uhr", class: "BJJ No-Gi"}
    ],
    Dienstag: [
        {time: "07:00 Uhr", endTime: "08:30 Uhr", class: "BJJ No-Gi"},
        {time: "18:00 Uhr", endTime: "19:30 Uhr", class: "Wrestling for BJJ (No-Gi)"}
    ],
    Mittwoch: [
        {time: "18:00 Uhr", endTime: "19:30 Uhr", class: "BJJ No-Gi"}
    ],
    Donnerstag: [
        {time: "17:00 Uhr", endTime: "18:30 Uhr", class: "BJJ No-Gi"}
    ],
    Freitag: [
        {time: "18:00 Uhr", endTime: "19:30 Uhr", class: "BJJ No-Gi"}
    ],
    Samstag: [
        {time: "10:00 Uhr", endTime: "11:30 Uhr", class: "Freies Training"}
    ],
    Sonntag: [
        {time: "11:00 Uhr", endTime: "12:30 Uhr", class: "Open Mat"}
    ]
};
