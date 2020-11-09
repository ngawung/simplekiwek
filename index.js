const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

(async () => {
	try {

		const result = await axios.get('http://aqwwiki.wikidot.com/wands');
		const dom = new JSDOM(result.data);

		const page = dom.window.document.querySelector("#page-content");
		const box = page.querySelectorAll(".list-pages-box");

		console.log(`There is ${box.length} list-pages-box`);

		for (let i=0; i<box.length; i++) {
			const item = box[i].querySelectorAll(".list-pages-item");

			console.log(`\n\nThere is ${item.length} list-pages-item in box ${i}`);

			for (let y=0; y<item.length; y++) {
				const itemName = item[y].querySelector("p").textContent;
				console.log(itemName);
			}
		}

		// console.log(box[2].querySelectorAll(".list-pages-item")[1].querySelector("p").textContent)

	} catch(e) {
		console.log(e.stack || e);
	}

})();