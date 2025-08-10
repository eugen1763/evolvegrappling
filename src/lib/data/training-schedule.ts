
export interface ClassSchedule {
    time: string;
    class: string;
}

export interface TrainingSchedule {
    [key: string]: ClassSchedule[];
}

export const trainingSchedule: TrainingSchedule = {
    Monday: [
        {time: "6:00 AM", class: "Fundamentals"},
        {time: "12:00 PM", class: "Open Mat"},
        {time: "6:00 PM", class: "Advanced"},
        {time: "7:30 PM", class: "No-Gi"}
    ],
    Tuesday: [
        {time: "6:00 AM", class: "No-Gi"},
        {time: "12:00 PM", class: "Advanced"},
        {time: "6:00 PM", class: "Fundamentals"},
        {time: "7:30 PM", class: "Competition"}
    ],
    Wednesday: [
        {time: "6:00 AM", class: "Fundamentals"},
        {time: "12:00 PM", class: "Open Mat"},
        {time: "6:00 PM", class: "Advanced"},
        {time: "7:30 PM", class: "No-Gi"}
    ],
    Thursday: [
        {time: "6:00 AM", class: "No-Gi"},
        {time: "12:00 PM", class: "Advanced"},
        {time: "6:00 PM", class: "Fundamentals"},
        {time: "7:30 PM", class: "Competition"}
    ],
    Friday: [
        {time: "6:00 AM", class: "Fundamentals"},
        {time: "12:00 PM", class: "Open Mat"},
        {time: "6:00 PM", class: "Advanced"},
        {time: "7:30 PM", class: "No-Gi"}
    ],
    Saturday: [
        {time: "9:00 AM", class: "All Levels"},
        {time: "10:30 AM", class: "Open Mat"}
    ],
    Sunday: [
        {time: "10:00 AM", class: "Open Mat"}
    ]
};
