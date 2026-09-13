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
const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

async function findWord() {
	const word = searchInput.value.trim();

	if (!word) {
		alert("Please enter a word to search.");
		return false;
	}

	wordText.textContent = ` Looking up "${word}"...`;

	try {
		const response = await fetch(`${API_URL}${word}`);

		if (!response.ok) {
			if (response.status === 404) {
				alert("Word not found. Please check the spelling and try again");
				wordText.textContent = "Word not found";

				meaningSection.textContent = "";
				antonymsSection.textContent = "";
				synonymsSection.textContent = "";
				wordOrigin.textContent = "";
				wordPhonetics.textContent = " ";
				return false;
			}

			throw new Error(`HTTP error: ${response.status}`);
		}

		const data = await response.json();
		apiData = data;
		audio = new Audio(data.pronunciation.audioUrl);

		return true;
	} catch (error) {
		console.error("Error fetching the word:", error);
		wordText.textContent = "Something went wrong";
		alert("An error occurred while fetching the word. Please try again later.");
		return false;
	}
}

function displayFind() {
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
	antonymTag.href = `?q=${encodeURIComponent(antonym)}`;
		antonymsSection.appendChild(antonymTag);
	});

	synonymsSection.textContent = "";
	const synonymH2 = document.createElement("h2");
	synonymH2.textContent = "synonyms";

	synonymsSection.appendChild(synonymH2);

	apiData.synonyms.slice(0, 5).forEach((synonym) => {
		const synonymTag = document.createElement("a");

		synonymTag.textContent = synonym;
synonymTag.href = `?q=${encodeURIComponent(synonym)}`;
		synonymsSection.appendChild(synonymTag);
	});
	saveHistory();

	historySection.textContent = "";
	const historyH2 = document.createElement("h2");
	historyH2.textContent = "history";
	historySection.appendChild(historyH2);
	const historyDiv = document.createElement("div");
	historyDiv.classList.add("tags");

	history.forEach((word) => {
		const historyTag = document.createElement("a");
		historyTag.textContent = word;
		historyTag.href = `?q=${encodeURIComponent(word)}`;
		historyDiv.appendChild(historyTag);
	});
	historySection.appendChild(historyDiv);
}

function saveHistory() {
	const index = history.indexOf(apiData.word);
	if (index !== -1) {
		history.splice(index, 1);
	}
	history.unshift(apiData.word);
	if (history.length > 6) {
		history.pop();
	}
	localStorage.setItem("searchHistory", JSON.stringify(history));
}

audioBtn.addEventListener("click", () => {
	if (audio) {
		audio.play();
	}
});

searchForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const success = await findWord();
	if (success) {
		displayFind();
	}
});

async function loadPage() {
	const params = new URLSearchParams(window.location.search);
	const searchWord = params.get("q");

	if (searchWord) {
		searchInput.value = searchWord;
		const success = await findWord();
		if (success) {
			displayFind();
		}
		return;
	}

	const starterWords = [
		"hello",
		"beautiful",
		"serendipity",
		"curious",
		"resilient",
		"wonder",
		"eloquent",
	];

	const randomWord =
		starterWords[Math.floor(Math.random() * starterWords.length)];

	searchInput.value = randomWord;
	const success = await findWord();
	if (success) {
		displayFind();
	}
}

loadPage();
