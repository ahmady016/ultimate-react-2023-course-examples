export type DeveloperSkill = {
    name: string
    color: string
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
}
export type Developer = {
    id: string
    photoName: string
    name: string
    title: string
    description: string
    experiences: string[]
    skills: DeveloperSkill[]
}

export const developers: Developer[] = [
	{
		id: 'beYoTHZR31',
        photoName: "ahmed.webp",
		name: 'Ahmed Hamdy Ali',
		title: 'Full Stack Web Developer',
		description: 'Passionate to learn the latest programming technologies, Fast learner and love web development.',
		experiences: [
			'Frontend Developer',
			'Backend Developer',
			'Full Stack Developer',
		],
        "skills": [
            {
                name: "HTML+CSS",
                color: "#2662EA",
                level: "ADVANCED"
            },
            {
                name: "JavaScript",
                color: "#EFD81D",
                level: "ADVANCED"
            },
            {
                name: "ReactJS",
                color: "#60DAFB",
                level: "ADVANCED"
            },
            {
                name: "NodeJS",
                color: "#C3DCAF",
                level: "BEGINNER"
            },
            {
                name: "ExpressJS",
                color: "#E84E55",
                level: "INTERMEDIATE"
            },
            {
                name: "NestJS",
                color: "#FF3B01",
                level: "INTERMEDIATE"
            },
        ]
	},
	{
		id: 'TTdxNaxXLN',
        photoName: "azza.png",
		name: 'Azza Ashry',
		title: '.NET Developer',
		description: 'Hard worker, Fast learner and love .NET programming',
		experiences: [
			'DAF (Digital Access to Finance)',
			'Freelancer',
			'ASGATech Company',
			'Higher Institute of Computer Science, Sohag',
		],
        "skills": [
            {
                name: "C#",
                color: "#2662EA",
                level: "ADVANCED"
            },
            {
                name: "MS SQL Server",
                color: "#115599",
                level: "INTERMEDIATE"
            },
            {
                name: "ASP.NET",
                color: "#EFD81D",
                level: "INTERMEDIATE"
            },
            {
                name: "Entity Framework",
                color: "#60DAFB",
                level: "BEGINNER"
            },
            {
                name: "JavaScript",
                color: "#C3DCAF",
                level: "BEGINNER"
            },
            {
                name: "JQuery",
                color: "#E84E55",
                level: "INTERMEDIATE"
            },
            {
                name: "Bootstrap",
                color: "#FF3B01",
                level: "INTERMEDIATE"
            },
        ],
	},
	{
		id: 'ucnHHjAKnN',
        photoName: "ayman.webp",
		name: 'Ayman Gamal Ghazi',
		title: 'Full stack .NET developer',
		description: 'My passion is to solve complex problems by designing computer software. I’m experienced at the creating back-end server apps, as well as front-end web apps',
		experiences: [
			'FULL STACK DEVELOPER | IEEE HTI | 2020-NOW',
			'VICE PRECEDENT | CAIRO UNIVERSITY | 2022-NOW',
			'FULL STACK DEVELOPER |FREELANCE | 2018-2020',
		],
        "skills": [
            {
                name: "C/C++",
                color: "#2662EA",
                level: "INTERMEDIATE"
            },
            {
                name: "C#",
                color: "#EFD81D",
                level: "ADVANCED"
            },
            {
                name: "JavaScript",
                color: "#60DAFB",
                level: "BEGINNER"
            },
            {
                name: "MS SQL Server",
                color: "#FF3B01",
                level: "INTERMEDIATE"
            },
            {
                name: "ASP.NET",
                color: "#C3DCAF",
                level: "INTERMEDIATE"
            },
            {
                name: "Entity Framework",
                color: "#E84E55",
                level: "INTERMEDIATE"
            },
        ],
	},
	{
		id: 'YsoI6aheAB',
        photoName: "doaa.jpg",
		name: 'Doaa Abdallah Mohamed',
		title: 'Full Stack Web Developer',
		description: 'Passionate to learn the latest programming technologies, Fast learner and love web development.',
		experiences: [
			'Graduation project (DNA Cryptography and stenography)',
			'Kakemono for Educational Production Software Developer',
		],
        "skills": [
            {
                name: "JavaScript",
                color: "#EFD81D",
                level: "ADVANCED"
            },
            {
                name: "TypeScript",
                color: "#2662EA",
                level: "INTERMEDIATE"
            },
            {
                name: "AngularJS",
                color: "#60DAFB",
                level: "INTERMEDIATE"
            },
            {
                name: "NodeJS",
                color: "#C3DCAF",
                level: "BEGINNER"
            },
            {
                name: "ExpressJS",
                color: "#E84E55",
                level: "ADVANCED"
            },
            {
                name: "MongoDB",
                color: "#FF3B01",
                level: "INTERMEDIATE"
            },
        ],
	},
	{
		id: 'beZoTHe777',
        photoName: "jonas.jpeg",
		name: 'Jonas Schmedtmann',
		title: 'Full Stack Web Developer',
		description: 'Teacher at Udemy. When not coding or preparing a course, I like to play board games, to cook (and eat), or to just enjoy the Portuguese sun at the beach.',
		experiences: [
			'Frontend Developer',
			'Backend Developer',
			'Full Stack Developer',
		],
        "skills": [
            {
                name: "HTML+CSS",
                color: "#2662EA",
                level: "ADVANCED"
            },
            {
                name: "JavaScript",
                color: "#EFD81D",
                level: "ADVANCED"
            },
            {
                name: "Web Design",
                color: "#60DAFB",
                level: "ADVANCED"
            },
            {
                name: "Git & GitHub",
                color: "#C3DCAF",
                level: "INTERMEDIATE"
            },
            {
                name: "ReactJS",
                color: "#E84E55",
                level: "ADVANCED"
            },
            {
                name: "Svelte",
                color: "#FF3B01",
                level: "BEGINNER"
            },
        ]
	},
]
