console.log('ad finder outter');
function isGoogleAdContainer(el) {
    var ID_PATTERN = 'google_ads';
    return el.id && el.id.indexOf(ID_PATTERN) == 0; 
}

/* function getAd(container) {
    var ad = container && container.lastChild;
    return ad || null;
} */
// assume 1. ads have div containers with ids starting with `google_ads`
// 2. the last child in the divs are iframes with actual ad width and height


function searchForGoogleAds() {
    var ads = [];
    var divs = document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
        try {
            if(isGoogleAdContainer(divs[i])) {
                ads.push(divs[i]);
            }
        } catch (e) {}
    }
    return ads;
};

function doSomethingToAds(ads) {
    ads.forEach(function(ad) {
        ad.id = 'not-the-same-' + ad.id;
        ad.innerHTML = '';
        // also change the parent element's id
        ad.parentElement.id = 'not-the-same-' + ad.parentElement.id;
        createSketch(ad);
    })
}

var numOfAttempts = 0;
var MAX_NUM_OF_ATTEMPTS = 5;

 
function initiateAdSearch() {
    numOfAttempts++;
    console.log('counting number of attempts', numOfAttempts);
    var foundAds = searchForGoogleAds();
    if (foundAds && foundAds.length > 0) {
        console.log('found ads!', foundAds);
        doSomethingToAds(foundAds);
    } else {
        // if we don't find anything, schedule a next round
        // keep trying for a limited number of times
        if (numOfAttempts < MAX_NUM_OF_ATTEMPTS) {
            setTimeout(initiateAdSearch, 5000);
        }
    }
}

setTimeout(initiateAdSearch, 3000);

setTimeout(function() {
    var foundAds = searchForGoogleAds();
    if (foundAds && foundAds.length > 0) {
        console.log('found ads!', foundAds);
        doSomethingToAds(foundAds);
    }
    
}, 50 * 1000);

function createSketch(container) {
    let sketch = function(p) {
        let xPositions = [];



        function drawAHorizontalLine(xPos) {
 /*            let xoff = 0; */
            let yoff = 0;
            let x = 0, oldX, oldY;
            for (let y = 0; y <= p.height; y += 3) {
                // Calculate a y value according to noise, map to
                oldY = y - 5;
                oldX = x;

                x = p.map(p.noise(yoff, xPos), 0, 1, xPos, xPos + 10);
                
                if (y > 0) {
                  p.line(oldX, oldY, x, y);
                }
        
                yoff += 0.05;
              }
 /*              xoff += 0.01; */
        }
    
        p.setup = function() {
            p.createCanvas(container.offsetWidth, container.offsetHeight);
            p.frameRate(10);
        };

        let step = 10;
    
        p.draw = function() {
            p.background(0);
            p.stroke(255);
            if (p.frameCount % step == 0 && p.frameCount < p.width) {
                xPositions.push(p.frameCount);
            }
            xPositions.forEach(drawAHorizontalLine);
        };
    };
    
    new p5(sketch, container);   
}

  

