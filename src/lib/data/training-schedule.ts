
export interface ClassSchedule {
    time: string;
    class: string;
}

export interface TrainingSchedule {
    [key: string]: ClassSchedule[];
}

export const trainingSchedule: TrainingSchedule = {
    Montag: [
        {time: "6:00 AM", class: "Fundamentals"},
        {time: "12:00 PM", class: "Open Mat"},
        {time: "6:00 PM", class: "Advanced"},
        {time: "7:30 PM", class: "No-Gi"}
    ],
    Dienstag: [
        {time: "6:00 AM", class: "No-Gi"},
        {time: "12:00 PM", class: "Advanced"},
        {time: "6:00 PM", class: "Fundamentals"},
        {time: "7:30 PM", class: "Competition"}
    ],
    Mittwoch: [
        {time: "6:00 AM", class: "Fundamentals"},
        {time: "12:00 PM", class: "Open Mat"},
        {time: "6:00 PM", class: "Advanced"},
        {time: "7:30 PM", class: "No-Gi"}
    ],
    Donnerstag: [
        {time: "6:00 AM", class: "No-Gi"},
        {time: "12:00 PM", class: "Advanced"},
        {time: "6:00 PM", class: "Fundamentals"},
        {time: "7:30 PM", class: "Competition"}
    ],
    Freitag: [
        {time: "6:00 AM", class: "Fundamentals"},
        {time: "12:00 PM", class: "Open Mat"},
        {time: "6:00 PM", class: "Advanced"},
        {time: "7:30 PM", class: "No-Gi"}
    ],
    Samstag: [
        {time: "9:00 AM", class: "All Levels"},
        {time: "10:30 AM", class: "Open Mat"}
    ],
    Sonntag: [
        {time: "10:00 AM", class: "Open Mat"}
    ]
};
