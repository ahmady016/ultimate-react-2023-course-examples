import { nanoid } from "nanoid"

export type Steps = {
    title: string
    messages: string[]
}
export const steps: Record<string, Steps> = {
    [nanoid()]: {
        title: 'Frontend Roadmap',
        messages: [
            'Learn React ⚛️',
            'Apply for jobs 💼',
            'Invest your new income 🤑',
        ]
    },
    [nanoid()]: {
        title: 'Backend Roadmap',
        messages: [
            'Learn NodeJS ⚛️',
            'Learn NestJS ⚛️',
            'Apply for jobs 💼',
            'Invest your new income 🤑',
        ]
    },
    [nanoid()]: {
        title: 'Full Stack Roadmap',
        messages: [
            'Learn Frontend ⚛️',
            'Learn Backend ⚛️',
            'Apply for jobs 💼',
            'Invest your new income 🤑',
        ]
    },
}
