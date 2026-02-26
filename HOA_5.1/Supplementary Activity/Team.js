let teamDirectory = [
    {
        name: "Leo Brooks",
        role: "Designer",
        skills: ["UI", "UX", "Figma"],
        available: true
    },
    {
        name: "Sasha Ivana",
        role: "Developer",
        skills: ["HTML", "CSS", "JS"],
        available: false
    },
    {
        name: "Jordan Lee",
        role: "Manager",
        skills: ["Planning", "Agile"],
        available: true
    }
];

teamDirectory.push({
    name: "Casey Moore",
    role: "QA Engineer",
    skills: ["Testing", "Debugging"],
    available: true
});

teamDirectory[1].available = true;

console.log("=== First Team Member ===");
console.log("Name: " + teamDirectory[0].name);
console.log("First Skill: " + teamDirectory[0].skills[0]);

console.log("=== Last Team Member ===");
console.log("Name: " + teamDirectory[teamDirectory.length - 1].name);
console.log("Total Skills: " + teamDirectory[teamDirectory.length - 1].skills.length);

console.log("=== Directory Size ===");
console.log("Total Members: " + teamDirectory.length);