const WP = require("./utils/wikiplus.js");

(async () => {

    try {

        // get all data
        const items = WP.db.get("staffs").value();

        for (let i=0; i<items.length; i++) {

            // await WP.sleep(3000);
            const page = await WP.getPageDom(items[i].link);

            // get img
            const yui = page.querySelector(".yui-content");
            let img;
            if (yui != null) img = yui.querySelector(".image");
            else {
            	img = page.querySelectorAll(".image");
            	img = img[img.length - 1];
            }

            // check pallete
            await WP.downloadImg(img.src);
            let pallete = await WP.getColors("./tmp/image.png", {count: 8});
            pallete = pallete.map(data => data.hex());
            pallete = pallete.map(data => WP.nearestColor(data));

            // format pallete
            pallete = pallete.map(data => {
                return {
                    name: data.name,
                    distance: Math.floor(data.distance)
                }
            });

            // update database
            WP.db.get("staffs").find({ name: items[i].name }).assign({ color: pallete }).write();

            console.log(`(${i + 1}/${items.length}) done`);
        }
    } catch(e) {
        console.log(e.stack || e);
    }
})();