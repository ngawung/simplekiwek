const { getDom, sleep } = require("./utils/wikiplus.js");

(async () => {
	try {

		const page_name = "staffs";
		
		let dom = await getDom(page_name);
		let page = dom.window.document.querySelector("#page-content");

		// find pagination number
		let pager_max = 0;
		const pager_dom = page.querySelectorAll(".pager-no");
		for (let i=0; i<pager_dom.length; i++) {
			pager_max = Math.max(parseInt(pager_dom[i].textContent.split(" ").pop()), pager_max);
		}

		console.log(`Max paginatoion is ${pager_max}`);

		const box_array = [];

		for (let pager=0; pager<=pager_max; pager++) {

			await sleep(3000);

			// load new pager
			if (pager != 0) {
				dom = await getDom(`${page_name}/p/${pager}`);
				page = dom.window.document.querySelector("#page-content");
			}

			const box = page.querySelectorAll(".list-pages-box");
			console.log(`There is ${box.length} box`);

			for (let i=0; i<box.length; i++) {
				box_array[i] = [];

				// check current pager
				const pager_curr = box[i].querySelector(".pager-no");
				// console.log(pager_curr);

				// scrap first pager
				if (pager == 0) {

					const item = box[i].querySelectorAll(".list-pages-item");
					console.log(`(${i}) There is ${item.length} item`);
					
					for (let y=0; y<item.length; y++) {
						const itemName = item[y].querySelector("p").textContent;

						box_array[i].push(itemName);
					}

				} else if (pager != 0 && pager_curr != null) {

					pager_currNum = parseInt(pager_curr.textContent.split(" ")[1]);
					if (pager_currNum == pager) {
						const item = box[i].querySelectorAll(".list-pages-item");
						console.log(`(${i}) There is ${item.length} item (PAGER)`);

						for (let y=0; y<item.length; y++) {
							const itemName = item[y].querySelector("p").textContent;

							box_array[i].push(itemName);
						}
					}

				}

			}
		}

	} catch(e) {
		console.log(e.stack || e);
	}

})();