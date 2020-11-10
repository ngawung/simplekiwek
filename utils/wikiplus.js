const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// const rax = require('retry-axios');
const { sleep } = require('sleep-async')().Promise;

const WIKI = axios.create({
	baseURL: 'http://aqwwiki.wikidot.com/',
});

// lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./database/db.json');
const db = low(adapter);

const getColors = require('get-image-colors')

const { promisify } = require('util');
const fs = require('fs');
const writeFileAsync = promisify(fs.writeFile)
const mkdirAsync = promisify(fs.mkdir)
const fetch = require('node-fetch');
const sharp = require('sharp');

// color
const colorsMap = require("./colormap.js");
const nearestColor = require('nearest-color').from(colorsMap);

module.exports = {

	getDom: async function(link) {
	    try {
			console.log(`Loading ${link}...`);
			const result = await WIKI.get(link);
			return new JSDOM(result.data);
		} catch(e) {
			throw new Error("Failed to fetch dom");
		}
	},

	getPageDom: async function(link) {
		try {
			const dom = await this.getDom(link);
			return dom.window.document.querySelector("#page-content");
		} catch(e) {
			throw new Error("Failed to fetch page dom");
		}
	},

	downloadImg: async function(link) {
		try {
			const response = await fetch(link);
			const buffer = await response.buffer();
			await mkdirAsync('./tmp/', { recursive: true });
			await sharp(buffer).normalize().modulate({saturation: 5}).png().toFile(`./tmp/image.png`)
		} catch(e) {
			throw new Error("Failed to download img");
		}
	},

	sleep: sleep,
	db: db,
	nearestColor: nearestColor,
	getColors: getColors,
}