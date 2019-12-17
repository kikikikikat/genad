console.log('ad finder outter')
function isGoogleAdContainer(el) {
    var ID_PATTERN = 'google_ads';
    return el.id && el.id.indexOf(ID_PATTERN) !== -1;
}

function getAd(container) {
    var ad = container && container.lastChild;
    return ad || null;
}
// assume 1. ads have div containers with ids starting with `google_ads`
// 2. the last child in the divs are iframes with actual ad width and height
}

function init() {
    console.log('ad  finder!');

    var divs = document.getElementsByTagName('div');
    var ads = [];
    for (let i = 0; i < divs.length; i++) {
        try {
            if(isGoogleAdContainer(divs[i])) {
                console.log(i);
                console.log(divs[i]);
                ads.push(getAd(divs[i]));
            }
        } catch (e) {}
    }
    top.kat_ads = ads;
    console.log(ads)
};

setTimeout(function() {
    init();
}, 3000);