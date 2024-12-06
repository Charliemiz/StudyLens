// Example list of goals
let goals = [
    { name: "Goal 1", dateCreated: "2024-01-01", status: "In Progress" },
    { name: "Goal 2", dateCreated: "2024-01-01", status: "Complete" },
    { name: "Goal 3", dateCreated: "2024-01-01", status: "In Progress" }
];

// Function to populate the goals dynamically
function populateGoals() {
    const goalContainer = document.querySelector('.goal_container');
    goalContainer.innerHTML = ""; // Clear existing goals

    goals.forEach((goal, index) => {
        const goalItem = document.createElement('div');
        goalItem.className = 'goal_item';

        goalItem.innerHTML = `
            <div class="goal_info">${goal.name}</div>
            <div class="goal_date">${goal.dateCreated}</div>
            <div class="goal_status">${goal.status}</div>
        `;

        goalContainer.appendChild(goalItem);
    });
}

// Open the modal for creating a new goal
function openNewGoalModal() {
    const modal = document.getElementById('goal_modal');
    modal.style.display = 'block';
}

// Close the modal
function closeGoalModal() {
    const modal = document.getElementById('goal_modal');
    modal.style.display = 'none';
}

// Function to create a new goal
function createGoal() {
    const name = document.getElementById('goal_name').value;
    const date = document.getElementById('goal_date').value;
    const description = document.getElementById('goal_description').value;

    if (!name || !date || !description) {
        alert("Please fill out all fields!");
        return;
    }

    const newGoal = {
        name: name,
        dateCreated: date,
        status: "In Progress" // Default status
    };

    goals.push(newGoal); // Add new goal to the list
    populateGoals(); // Refresh the displayed goals
    closeGoalModal(); // Close the modal

    // Clear modal inputs
    document.getElementById('goal_name').value = '';
    document.getElementById('goal_date').value = '';
    document.getElementById('goal_description').value = '';
}

// Function to delete a goal
function deleteGoal(index) {
    goals.splice(index, 1); // Remove goal by index
    populateGoals(); // Refresh the displayed goals
}

// Initial population of goals
populateGoals();
