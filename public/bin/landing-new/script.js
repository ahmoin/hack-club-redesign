function init() {
	document.addEventListener("scroll", onScroll);
	onScroll();
	document.querySelectorAll("img").forEach((el) => {
		el.draggable = false;
	});
}
function _getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function opf(number) {
	return 1 - number + 0.5;
}

function onScroll() {
	const scrollButton = document.querySelector(".scroll-prompt");
	scrollButton.style.opacity = opf(window.scrollY / 200);
}

window.addEventListener("load", init);

async function fetchAndLogTextFile(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Failed to fetch the file.");
		}
		const text = await response.text();
		console.log(
			`%cSay Hi to Binny ↓`,
			"color:white; font-size:50px;font-weight:bolder;font-family:sans-serif",
		);
		console.log(`%c${text}`, "color:white; font-size:10px;");
	} catch (error) {
		console.error("Error fetching the file:", error);
	}
}
function recalculateSectionHeight() {
	document.querySelectorAll(".section").forEach((element) => {
		element.style.minHeight = `${element.getBoundingClientRect().height}px`;
	});
}
fetchAndLogTextFile("./landing-new/ascii-art.txt");

window.addEventListener("load", recalculateSectionHeight());
window.addEventListener("resize", recalculateSectionHeight());
