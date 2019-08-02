"use strict";

//function to make ids and classes
function makeIdDivs(elem, label, obj) {
  let makeIdElem = document.createElement(elem);
  makeIdElem.id = label;
  makeIdElem.innerHTML = obj;
  return makeIdElem;
}

function makeClassDivs(elem, label) {
  let makeClassElem = document.createElement(elem);
  makeClassElem.className = label;
  return makeClassElem;
}

//make header container
let getTopCont = document.getElementById("topContainer");
let titleBox = makeClassDivs("div", "myTitle");
getTopCont.appendChild(titleBox);

// insert logo image
let logoDiv = makeClassDivs("div", "logo");
titleBox.appendChild(logoDiv);

let logoImg = makeIdDivs("IMG", "logo");
logoImg.src = "/public/assets/logo.svg";
logoDiv.appendChild(logoImg);

//insert plus box
let plusBox = makeIdDivs("div", "plus");
plusBox.innerHTML = "+";
titleBox.appendChild(plusBox);

//create nav bar
let navBox = makeClassDivs("div", "navBar");
getTopCont.appendChild(navBox);

let randomLink = makeClassDivs("button", "getRandom");
randomLink.innerHTML = "RANDOM 	•";
navBox.appendChild(randomLink);

let steve = makeClassDivs("button", "getSteve");
steve.innerHTML = "STEVE 	•";
navBox.appendChild(steve);

let joyce = makeClassDivs("button", "getJoyce");
joyce.innerHTML = "JOYCE 	•";
navBox.appendChild(joyce);

let doctor = makeClassDivs("button", "getDoctor");
doctor.innerHTML = "DR. ALEXEI";
navBox.appendChild(doctor);

//create content boxes
const reddit = new XMLHttpRequest();

function pageListener() {
  // debugger;
  let pageContent = JSON.parse(this.responseText);
  let getChildren = pageContent.data.children;

  for (let i = 0; i < getChildren.length; i++) {
    let getContentCont = document.getElementById("contentContainer");

    let makeBox = makeClassDivs("div", "contentBox");
    getContentCont.appendChild(makeBox);

    let imageBox = makeClassDivs("IMG", "image");
    makeBox.appendChild(imageBox);

    let contentTitle = makeClassDivs("div", "contentTitleBox");
    makeBox.appendChild(contentTitle);

    let contentSubtitle = makeClassDivs("div", "contentSubtitleBox");
    makeBox.appendChild(contentSubtitle);

    let contentText = makeClassDivs("div", "contentTextBox");
    makeBox.appendChild(contentText);

    //insert images
    if (getChildren[i].data.preview == undefined) {
      imageBox.src =
        "https://static3.srcdn.com/wordpress/wp-content/uploads/2018/07/Falkor-and-Atreyu-Neverending-Story.jpg";
    } else {
      imageBox.src = getChildren[i].data.preview.images[0].source.url.replace(
        /amp;/g,
        ""
      );
    }

    //add title
    contentTitle.innerHTML = getChildren[i].data.title;

    //add author
    contentSubtitle.innerHTML =
      "By: " +
      getChildren[i].data.author +
      " • " +
      moment.unix(getChildren[i].data.created_utc, "YYYY MM DD").fromNow() +
      " • Ups: " +
      getChildren[i].data.ups;

    //add text snippet
    if (getChildren[i].data.selftext == "") {
      imageBox.style.height = "380px";
    } else {
      contentText.innerHTML = getChildren[i].data.selftext;
    }
  }
}

reddit.addEventListener("load", pageListener);
reddit.open("GET", "https://www.reddit.com/r/StrangerThings/.json");
reddit.send();

//facebook logo
let foot = document.getElementById("footerContainer");
let fbLogo = makeIdDivs("IMG", "facebook");
fbLogo.src = "/public/assets/facebook_grey.svg";
foot.appendChild(fbLogo);

//instagram logo
let igLogo = makeIdDivs("IMG", "instagram");
igLogo.src = "/public/assets/instagram_grey.svg";
foot.appendChild(igLogo);
