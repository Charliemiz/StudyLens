// Example list of goals
const goals = [
    {
        title: "Goal 1",
        description: "Test1",
        link: "#"
    },
    {
        title: "Goal 2",
        description: "Test2",
        link: "#"
    },
    {
        title: "Goal 3",
        description: "Test3",
        link: "#"
    }
];

// Dynamically populate goals
function populateGoals() {
    const goalsContainer = document.getElementById('goalsContainer');
    goalsContainer.innerHTML = ""; // Clear existing content

    goals.forEach(goal => {
        // Create a card for each goal
        const card = document.createElement('div');
        card.className = 'goal-card';

        card.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
        `;

        goalsContainer.appendChild(card);
    });
}

// Call the function to populate goals on page load
document.addEventListener('DOMContentLoaded', populateGoals);
