
/*
Javascript : 
written by : MoammadHossein Nezhadhendi
midterm Test 99-00
internet Eng
Amirkabir university of technology

*/


let input = document.getElementsByClassName("Name-input");
let baseUrl = "https://api.github.com/users/";


// this function is for handle operations after submit btn clicked!
async function submitHandler() {
    let keyword = input[0].value;

    let fullUrl = baseUrl + keyword;
    let response;
    let oldres = localStorage.getItem(keyword);
    if (!oldres) {
        response = await getUserInformation(fullUrl);
        localStorage.setItem(keyword, JSON.stringify(response));
    }
    else
        response = JSON.parse(localStorage.getItem(keyword));

    let repos = await getUserRepositories(fullUrl);

    setAvatarImage(response.avatar_url);
    setuserName(response.name);
    setuserBlog(response.blog);
    setuserLocation(response.location);
    setbioText(response.bio);
    setCommonlyUsedLanguage(repos);

}

// fetch information User datas from git api
async function getUserInformation(url) {
    try {
        let response = await fetch(url);
        console.log("fetch from API")
        if (response.status >= 400) {
            showError(`Request failed with error ${response.status}`);
            return Promise.reject(`Request failed with error ${response.status}`);
        }
        return response.json();
    } catch (e) {
        console.log(e);
    }
}

// fetch repositories Datas from git api
async function getUserRepositories(url) {
    let fURL = url + "/repos";
    try {
        let response = await fetch(fURL);

        if (response.status >= 400) {
            showError(`Request (Repo) failed with error ${response.status}`)
            return Promise.reject(`Request failed with error ${response.status}`)
        }
        return response.json();
    } catch (e) {
        console.log(e);
    }
}

// set account name 
const setuserName = (name) => {
    let tag = document.getElementById("user-name");
    tag.innerHTML = name;
}

// set account blog 
const setuserBlog = (blog) => {
    let tag = document.getElementById("user-blog");
    tag.innerHTML = blog;
}

// set account location 
const setuserLocation = (loc) => {
    let tag = document.getElementById("user-location");
    tag.innerHTML = loc;
}

// set avatar image 
const setAvatarImage = (src) => {
    let avatarImg = document.getElementById("avatar-img");
    avatarImg.src = src;
}

// set biography text 
const setbioText = (bio) => {

    let bioTag = document.getElementById("bio-user");
    bioTag.innerHTML = bio;
}

// find and set most common used language with updated-time
const setCommonlyUsedLanguage = (repos) => {
    let dates = [];
    let langs = [];
    /* add all dates in dates array */
    repos.forEach(i => {
        dates.push(new Date(i.updated_at));
    });
    // sort dates member descending!
    dates.sort(function (a, b) { return b.getTime() - a.getTime() });   // descending sort
    
    //find 5 recent language from response
    for (let i = 0; i < 5; i++) {
        repos.forEach(element => {
            if (new Date(element.updated_at).getTime() == dates[i].getTime())
                langs.push(element.language)
        });
    }
    // omit null languages
    var filteredLang = langs.filter(function (el) {
        return el != null;
    });
    
    // check for most frequent language and return it
    let commonLanguage = FindMostFrequentMember(filteredLang);
    let tag = document.getElementById("common-lang");
    if (commonLanguage == undefined)
        tag.innerHTML = "";
    else
        tag.innerHTML = "common Used Language : " + commonLanguage;

}

// function for returning most frequent member in array
const FindMostFrequentMember = (arr) => {
    let mf = 1;
    let m = 0;
    let item;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if (arr[i] == arr[j])
                m++;
            if (mf < m) {
                mf = m;
                item = arr[i];
            }

        }
        m = 0;
    }
    if (item == undefined)
        return arr[0];
    else
        return item;
}

// function for display Error component!
const showError = (message) => {
    var tag = document.getElementById("snackbar");
    tag.className = "show";
    tag.innerHTML = message;
    setTimeout(function () { tag.className = tag.className.replace("show", ""); }, 3000);
}


