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

function displayFind() {
	console.log(apiData.word);
	wordText.textContent = apiData.word;
	wordOrigin.textContent = apiData.etymology;
	wordPhonetics.textContent = apiData.pronunciation.ipa;

	meaningSection.textContent = "";

	apiData.partsOfSpeech.forEach((part) => {
		const details = document.createElement("details");
		details.classList.add("meaning-box");

		const summary = document.createElement("summary");
		summary.classList.add("part-of-speech");
		summary.textContent = part.partOfSpeech;

		const definitions = document.createElement("ol");
		definitions.classList.add("definitions");

		part.senses.forEach((sense) => {
			const definition = document.createElement("li");
			definition.classList.add("definition");
			const definitionText = document.createElement("p");
			definitionText.textContent = sense.definition;
			definition.append(definitionText);
			if (sense.example) {
				const example = document.createElement("p");
				example.classList.add("example");

				const exampleLabel = document.createElement("span");
				exampleLabel.textContent = "Eg. ";

				example.append(exampleLabel, sense.example);

				definition.append(example);
			}

			definitions.appendChild(definition);
		});

		details.append(summary, definitions);
		meaningSection.appendChild(details);
	});

antonymsSection.textContent = "";
-


}

audioBtn.addEventListener("click", () => {
	if (audio) {
		audio.play();
	}
});

searchForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	findWord();
});
