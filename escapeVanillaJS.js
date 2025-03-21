document.addEventListener("DOMContentLoaded", () => {
    console.log(document.getElementById("solveRoom1")); // Check if element exists

    // 🪲 Bug: Incorrect ID used for attaching the event listener
    // I have changed solveRoom to the correct ID that exists in html solveRoom1
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // 🪲 Bug: Incorrect element ID
                // I have changed the ID to the correct one that exists in html room1Result
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        // As I understand it, it won't create a new object from scratch, it will use the same object to create a new one. That is what prototype does.
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'prototype', 'async/await']);
        // 🪲 Bug: What's missing from JS concepts?
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        // 🪲 Bug: Incorrect function call
        // It was comparing jsConcepts with itself, which it is supposed to compare two sets, jsConcepts and reactConcepts
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    // 🪲 Bug: Asynchronous function?
    document.getElementById("solveRoom3").addEventListener("click", () => {
        // It fetches the directions for directions.json
        fetch('directions.json') 
            .then(response => response.json())
            // 🪲 Bug: You are waiting for the response from directions.json to give the directions
            .then(async directions => {
                // 🪲 Bug: This means there is a waiting period to indicate that you need to wait for the directions before continuing
                const message = await navigateLabyrinth(directions);
                // 🪲 Bug: Incorrect method
                // I have changed innerHTML to textContent because it is returning a message, so it should be in plain text. innerHTML gets HTML content like IDs, tags, but what we are getting is outside of the HTML tags.
                document.getElementById("room3Result").textContent = message;
            });
    });
});

function findMostRecentBook(books) {
    // 🪲 Bug: Logic error
    // This will check all the books to find the most recent book.
    return books.reduce((mostRecent, book) => 
        // It will then return the book with the newest date, and that is the one we keep because it is searching for the book with the newest date.
        new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
}

function findIntersection(setA, setB) {
    // 🪲 Bug: Incorrect logic
    // So what happens here is it checks if set A and B have the same item. If they do, it keeps the item and creates a new set. If it doesn’t have the same item, it gets rid of the item.
    const intersection = new Set([...setA].filter(item => setB.has(item)));
    return intersection;
}

async function navigateLabyrinth(directions) {
    // So this means it is following the list of directions given from directions.json
    for (let direction of directions) {
        // 🪲 Bug: No delay
        // This means there is a waiting time of 1 second before giving the next direction.
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
