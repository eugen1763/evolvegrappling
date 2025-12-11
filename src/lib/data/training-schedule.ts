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
        { time: "18:00 Uhr", endTime: "19:00 Uhr", class: "BJJ No-Gi Basic" },
        { time: "19:00 Uhr", endTime: "20:00 Uhr", class: "BJJ No-Gi All Levels" },
    ],
    Dienstag: [
        {
            time: "18:00 Uhr",
            endTime: "19:30 Uhr",
            class: "Wrestling for BJJ Basic/Advanced",
        },
    ],
    Mittwoch: [
        { time: "18:00 Uhr", endTime: "19:15 Uhr", class: "BJJ Gi Basic/Advanced" },
        { time: "19:15 Uhr", endTime: "20:45 Uhr", class: "BJJ No-Gi All Levels" },
    ],
    Donnerstag: [],
    Freitag: [
        { time: "18:00 Uhr", endTime: "19:30 Uhr", class: "BJJ No-Gi Basic" },
    ],
    Samstag: [
        { time: "10:00 Uhr", endTime: "11:30 Uhr", class: "BJJ No-Gi All Levels" },
    ],
    Sonntag: [{ time: "11:00 Uhr", endTime: "13:00 Uhr", class: "Open Mat" }],
};
