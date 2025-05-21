const partsLimit = 8;
var _fetchedParts;

/*
async function preloadImage(item) {
    let response = await fetch(item.imageUrl);
    let blob = response.blob();
    return blob
}
async function saveImageToCache(item) {
    const image = await preloadImage(item)
    const blob = URL.createObjectURL(image)
    localStorage.setItem(item.wokwiName, blob);
    addPartToPage(item)
}*/
function getSelectedItems() {
	return document.querySelectorAll(".selected");
}
function recalculateSelected() {
	const numSelectedItems = getSelectedItems().length;
	const selections = [];
	items = document.querySelectorAll(".selector-item");
	document.querySelector(".selector-number").innerText =
		`${partsLimit - numSelectedItems} choices remaining.`;
	if (partsLimit - numSelectedItems === 0) {
		items.forEach((item) => {
			const isSelected = item.className.includes("selected");
			if (!isSelected) {
				item.classList.add("disabled");
			}
		});
		document.querySelector(".selector-number").classList.add("disabled");
	} else {
		items.forEach((item) => {
			const isDisabled = item.className.includes("disabled");
			if (isDisabled) {
				item.classList.remove("disabled");
			}
		});
		document.querySelector(".selector-number").classList.remove("disabled");
	}
	getSelectedItems().forEach((item) => {
		selections.push(item.getAttribute("part_name"));
	});
	return selections;
}

function addPartToPage(part) {
	/*
    <div part_name="mic" class="selector-item">
        <img class="selector-image" src="../parts/mic.png">
        <div class="selector-item-name">Mic</div>
        <div class="selector-item-description">Records sounds</div>
    </div>
    */
	const selectorItem = document.createElement("div");
	selectorItem.setAttribute("part_name", part.wokwiName);
	selectorItem.className = "selector-item";

	const selectorImage = document.createElement("img");
	selectorImage.src = part.imageUrl;
	selectorImage.className = "selector-image";
	selectorItem.appendChild(selectorImage);

	const selectorItemName = document.createElement("div");
	selectorItemName.innerText = part.name;
	selectorItemName.className = "selector-item-name";
	selectorItem.appendChild(selectorItemName);

	const selectorItemDesc = document.createElement("div");
	selectorItemDesc.innerText = part.flavorText;
	selectorItemDesc.className = "selector-item-description";
	selectorItem.appendChild(selectorItemDesc);
	if (part.newPart) {
		const newImage = document.createElement("img");
		newImage.src = "../icons/new.png";
		newImage.className = "new-tag";
		selectorItem.appendChild(newImage);
	}

	document.getElementsByClassName("selector-main")[0].appendChild(selectorItem);

	if (part.outOfStock) {
		//   selectorItem.classList.add("outOfStock");

		const outOfStockDiv = document.createElement("div");
		outOfStockDiv.className = "outOfStock";

		const outOfStockText = document.createElement("h1");
		outOfStockText.innerText = "Out of Stock";
		outOfStockText.className = "outOfStockText";

		const outOfStockInnerText = document.createElement("p");
		outOfStockInnerText.innerText = "Shipping times delayed";
		outOfStockInnerText.className = "outOfStockInnerText";

		outOfStockDiv.appendChild(outOfStockText);
		outOfStockDiv.appendChild(outOfStockInnerText);

		selectorItem.appendChild(outOfStockDiv);
	}

	if (
		part.displayAmount &&
		part.currentStockIncludingNonFulfilled < 6 &&
		!part.outOfStock
	) {
		const stockDiv = document.createElement("div");
		stockDiv.className = "amountRemaining";

		const stockText = document.createElement("h1");
		stockText.innerText = `${part.currentStockIncludingNonFulfilled} left in stock`;
		stockText.className = "outOfStockText";

		const stockInnerText = document.createElement("p");
		stockInnerText.innerText = "Shipping times may be delayed";
		stockInnerText.className = "outOfStockInnerText";

		stockDiv.appendChild(stockText);
		stockDiv.appendChild(stockInnerText);
		selectorItem.appendChild(stockDiv);

		console.log(`display amunt${part.displayAmount}`);
		console.log(`current stock${part.currentStockIncludingNonFulfilled}`);

		console.log(`out of stock${part.outOfStock}`);
	}
	selectorItem.addEventListener("click", () => {
		const isSelected = selectorItem.className.includes("selected");
		if (isSelected) {
			selectorItem.classList.remove("selected");
		} else {
			if (getSelectedItems().length < partsLimit) {
				selectorItem.classList.add("selected");
			}
		}
		recalculateSelected();
	});
}

window.addEventListener("load", async (_e) => {
	console.log("Page loaded");
	recalculateSelected();
	const fetchedParts = await partsData();
	console.log("fetchedParts", fetchedParts);
	fetchedParts.forEach((part) => {
		if (!(part.imageUrl === undefined)) {
			addPartToPage(part);
		}
	});

	document.querySelector(".selector-continue").onclick = () => {
		const selectedItems = getSelectedItems();
		const selectedItemsArray = [];
		selectedItems.forEach((item) => {
			selectedItemsArray.push(item.getAttribute("part_name"));
		});
		const partsList = encodeURI(recalculateSelected().sort().join("|"));
		window.location.href = `/api/bin/wokwi/new/${partsList}`;
	};
});
