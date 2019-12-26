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
        ad.style.background = 'red';
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
        let yoff = 0;
        function drawAHorizontalLine() {
            let xoff = 0;
/*             let yoff = 0; */
            let x = 0, oldX, oldY;
            for (let y = 0; y <= p.height; y += 5) {
                // Calculate a y value according to noise, map to
                oldY = y - 5;
                oldX = x;

                x = p.map(p.noise(yoff, xoff), 0, 1, 10, p.width - 10);
                
                if (y > 0) {
                  p.line(oldX, oldY, x, y);
                }
        
                yoff += 0.05;
              }
              xoff += 0.01;
        }
    
        p.setup = function() {
            p.background(0);
            p.stroke(255);
            p.createCanvas(container.offsetWidth, container.offsetHeight);
        };
    
        p.draw = function() {
            drawAHorizontalLine();
        };
    };
    
    new p5(sketch, container);   
}

  

