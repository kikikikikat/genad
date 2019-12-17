console.log('ad finder outter');
function isGoogleAdContainer(el) {
    var ID_PATTERN = 'google_ads';
    return el.id && el.id.indexOf(ID_PATTERN) !== -1;
}

/* function getAd(container) {
    var ad = container && container.lastChild;
    return ad || null;
} */
// assume 1. ads have div containers with ids starting with `google_ads`
// 2. the last child in the divs are iframes with actual ad width and height

var ads = [];

function init() {
    console.log('ad  finder!');

    var divs = document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
        try {
            if(isGoogleAdContainer(divs[i])) {
                ads.push(divs[i]);
            }
        } catch (e) {}
    }
    console.log(ads)
};

function doSomethingToAds(ads) {
    ads.forEach(function(ad) {
        ad.id = 'not-the-same-' + ad.id;
        ad.innerHTML = '';
        ad.style.background = 'red';
        // also change the parent element's id
        ad.parentElement.id = 'not-the-same-' + ad.parentElement.id;
    })
}

setTimeout(function() {
    init();
    if (ads && ads.length > 0) {
        doSomethingToAds(ads);
    }
}, 3000);