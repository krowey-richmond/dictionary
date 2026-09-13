const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-wrapper");
const wordText = document.querySelector(".word");
const wordPhonetics = document.querySelector(".phonetics");
const wordOrigin = document.querySelector(".origin");
const audioBtn = document.querySelector(".audio-btn");
const meaningSection = document.querySelector(".meanings");
const antonymsSection = document.querySelector(".antonyms");
const synonymsSection = document.querySelector(".synonyms");
const historySection = document.querySelector(".history");

const API_URL = "https://englishdictionaryapi.com/api/v1/words/";

let apiData = null;
let audio = null;

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
			if (response.status === 404) {
				alert("Word not found. Please check the spelling and try again");
				return;
			}
			throw new Error(`HTTP error: ${response.status}`);
		}

		const data = await response.json();
		apiData = data;
		audio = new Audio(data.pronunciation.audioUrl);
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
	const antonymsH2 = document.createElement("h2");
	antonymsH2.textContent = "antonyms";

	antonymsSection.appendChild(antonymsH2);

	apiData.antonyms.slice(0, 5).forEach((antonym) => {
		const antonymTag = document.createElement("a");

		antonymTag.textContent = antonym;
		antonymTag.href = `?q=${antonym}`;
		antonymsSection.appendChild(antonymTag);
	});

	synonymsSection.textContent = "";
	const synonymH2 = document.createElement("h2");
	synonymH2.textContent = "synonyms";

	synonymsSection.appendChild(synonymH2);

	apiData.synonyms.slice(0, 5).forEach((synonym) => {
		const synonymTag = document.createElement("a");

		synonymTag.textContent = synonym;
		synonymTag.href = `?q=${synonym}`;
		synonymsSection.appendChild(synonymTag);
	});
}

historySection.textContent = "";
const historyH2 = document.createElement("h2");
historyH2.textContent = "history";

historySection.appendChild(historyH2);
const historyDiv = document.createElement("div");
historyDiv.classList.add("tags");

audioBtn.addEventListener("click", () => {
	if (audio) {
		audio.play();
	}
});

searchForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	await findWord();

	displayFind();
});
