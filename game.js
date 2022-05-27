var gameContainer = document.querySelector(".game")
var url_string = window.location.href;
var url = new URL(url_string);
var imageSet = url.searchParams.get("set");

var imageCount = url.searchParams.get("total");
console.log('total='+imageCount)

//Setting the variables
var previusTarget = 0
var foundCount = 0
var ready = true

// Now we randomize pictures
var array = [];
for (var i = 0; i < 2*imageCount; i++) {
    array[i] = Math.trunc(i/2) + 1
}
var shuffledPics = array
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
console.log(shuffledPics)

// Now we create elements
for (var i = 0; i < 2*imageCount; i++) {
    var pic = document.createElement("div");
    pic.className="card";
    pic.id=shuffledPics[i];
    pic.addEventListener("click", cardClick);
    gameContainer.appendChild(pic);
}

//Now we create function click
function cardClick(ev) {
    if (!ready) return
    var target = ev.currentTarget;
    // console.log(target)
    target.style.backgroundImage="url(memo-sets/"+imageSet+"/"+target.id+".jpg)";
    if (previusTarget.id == target.id) {
        previusTarget = 0
        foundCount ++
        if (foundCount ==imageCount) {
            document.querySelector(".win").style.display="block"
        }
    }
    else 
        if (previusTarget){
            ready = false
            setTimeout(() => {
                target.style.backgroundImage="url(memo-sets/background.jpg)";
                previusTarget.style.backgroundImage="url(memo-sets/background.jpg)";
                previusTarget = 0
                ready = true
                return
            }, 2000)
        }
        else previusTarget = target;
}