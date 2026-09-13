const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-wrapper");

const API_URL = "https://englishdictionaryapi.com/api/v1/words/";

async function findWord() {
	const word = searchInput.value.trim();
	if (!word) {
		alert("Please enter a word to search.");
		return;
	}

	console.log("Searching for word:", word);

	try {
		const response = await fetch(`${API_URL}${word}`);
		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
			return;
		}

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error("Error fetching the word:", error);
		alert("An error occurred while fetching the word. Please try again later.");
	}
}

searchForm.addEventListener("submit", (event) => {
	event.preventDefault();

	findWord();
});
