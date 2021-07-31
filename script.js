let input = document.getElementById("input");
let searchBtn = document.getElementById("search-img");
let appendDiv = document.getElementById("append");
let xIcon = document.getElementById("x-icon");
let mainContainer = document.getElementById("container");
let dataContainer = document.getElementById("data-main-container");
let timeId;
let dataName = document.getElementById("data-name");
let dataBirthYear = document.getElementById("data-birth_year");
let dataGender = document.getElementById("data-gender");
let dataHeight = document.getElementById("data-height");
let dataMass = document.getElementById("data-mass");
let dataEyeColor = document.getElementById("data-eye_color");
let dataHairColor = document.getElementById("data-hair_color");
let dataSkinColor = document.getElementById("data-skin_color");
let backBtn = document.getElementById("back-btn");

xIcon.addEventListener("click", () => {
    input.value = null;
    appendDiv.innerHTML = null;
    xIcon.setAttribute("class", "hide")
})

backBtn.addEventListener("click", () => {
    mainContainer.removeAttribute("class", "hide");
    dataContainer.setAttribute("class", "hide");
    input.value = null;
    appendDiv.innerHTML = null
})

// searchBtn, addEventListener("click", throttelFunction);
// input.addEventListener("input", throttelFunction);

// https://swapi.dev/api/people/?search={your_search_term}

async function makeRequest() {
    let responce = await fetch(
        `https://swapi.dev/api/people/?search=${input.value}`
    );
    let data = await responce.json();
    return data;
}

async function main() {
    let data = await makeRequest();
    xIcon.removeAttribute("class");
    let { results } = data;
    console.log("results:", results); //Remove it
    appendDiv.innerHTML = null;
    results.forEach((el) => {
        appendData(el);
    });
}

function throttelFunction() {
    if (timeId) {
        return false;
    }
    timeId = setTimeout(() => {
        main();
        timeId = null;
    }, 500);
    console.log("timeId:", timeId);
}

function appendData({ name, gender }) {
    let div = document.createElement("div");
    div.addEventListener("click", clickResults);
    let span1 = document.createElement("span");
    div.setAttribute("class", "result");
    let span2 = document.createElement("span");

    span1.innerHTML = name;
    span2.innerHTML = gender;

    appendDiv.append(div);
    div.append(span1, span2);
}



async function clickResults(e) {
    // dataContainer.style.background = `linear-gradient(
    //         0deg,
    //         rgba(0, 0, 0, 0.8) 0%,
    //         rgba(0, 0, 0, 0.8) 100%
    //     ),
    //     no-repeat url("https://source.unsplash.com/1600x900/?star war") center
    //         center`;
    mainContainer.setAttribute("class", "hide")
    console.log("e:", e); //remove this line
    let el = e.path[0].childNodes[0].innerHTML;
    if (el === undefined) {
        el = e.path[0].innerHTML;
    }

    let pageTwoData = await makeRequestAgain(el);

    let {
        results: [
            {
                name,
                birth_year,
                gender,
                height,
                mass,
                eye_color,
                hair_color,
                skin_color,
            },
        ],
    } = pageTwoData;

    let nameN = name;
    
    

    dataName.innerHTML = nameN;
    dataBirthYear.innerHTML = birth_year;
    dataGender.innerHTML = gender;
    dataHeight.innerHTML = height;
    dataMass.innerHTML = mass;
    dataEyeColor.innerHTML = eye_color;
    dataHairColor.innerHTML = hair_color;
    dataSkinColor.innerHTML = skin_color;

    dataContainer.removeAttribute("class", "hide");
    
    // let results = document.getElementById("result");
    // console.log('results:', results)
}

async function makeRequestAgain(el) {
    let responce = await fetch(`https://swapi.dev/api/people/?search=${el}`);
    let data = await responce.json();
    return data;
}
