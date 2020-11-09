const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// const rax = require('retry-axios');
const { sleep } = require('sleep-async')().Promise;

const WIKI = axios.create({
	baseURL: 'http://aqwwiki.wikidot.com/',
});

exports.getDom = async function(link) {
    try {
		console.log(`Loading ${link}...`);
		const result = await WIKI.get(link);
		return new JSDOM(result.data);
	} catch(e) {
		throw new Error("Failed to fetch dom");
	}
}

exports.sleep = sleep;