const revelioApp = {};
revelioApp.searchText = "";
revelioApp.rawResults = [];
revelioApp.searchResults = [];
revelioApp.regExName = "";
revelioApp.regExBoolean = "";
revelioApp.regExNotName = "";
revelioApp.url = "https://www.potterapi.com/v1/";
revelioApp.key = "$2a$10$uBFyQUBe.1xJ1KYkmh9sIeYHT3T7v8loA1CosKCCffl4YD5XYVcS."

// easter egg ideas: niffler on the top, money raining down
// dumbledore party

// initialize
revelioApp.init = function () {
    revelioApp.getSearchText(revelioApp.initiateSearch);
}

// on form submit, gets the value of the search text
revelioApp.getSearchText = function (startSearch) {
    $('.search-form').on('submit', function (event) {
        event.preventDefault();
        revelioApp.searchText = $('input[type=text]').val();
        revelioApp.regExName = new RegExp(revelioApp.searchText, 'i');
        revelioApp.regExNotName = new RegExp('^' + revelioApp.searchText + '$', 'i');
        startSearch();
    });
}

// initiate search
revelioApp.initiateSearch = function () {

    // clear prev results and get character data from API
    revelioApp.clearResults();
    revelioApp.getCharacterData();

    // wait until character data is retrieved, THEN filter results based on some regular expressions
    $.when(revelioApp.getCharacter)
    .then((characterArray) => {
        // for each character in the characterArray...
        // !!you can check forEach parameters to make this easier!!...
        characterArray.forEach(function (charactersObject) {
            // go through all the keys in that character object and filter results
            for (let character in charactersObject) {
                revelioApp.matchSearchFields(character, charactersObject);
            }
            // Set type is an object contains only unique values/objects (removes duplicates), using spread operator to turn it back to Array
            revelioApp.searchResults = [...new Set(revelioApp.rawResults)];
        });

        // display results on #results page
        revelioApp.displayResults(revelioApp.searchResults, revelioApp.checkProfilePicture, revelioApp.animateScroll);
    })
    // error handling
    .fail((err) => {
        console.log(err);
    });
}

// clear search results
revelioApp.clearResults = function () {
    // reset search results array in case of new search
    revelioApp.rawResults = [];
    revelioApp.searchResults = [];
    $('section#results > div > div').empty();
}


// get character data from API
revelioApp.getCharacterData = function() {
    revelioApp.getCharacter = $.ajax({
        url: `${revelioApp.url}characters/`,
        dataType: 'json',
        method: 'GET',
        data: {
            key: revelioApp.key
        }
    });
}

// filter search results
revelioApp.matchSearchFields = function (charField, charObject) {
    // if the key is name, as long as the search text is a substring of the name, add it to results
    if ((charField === 'name') && (revelioApp.regExName).test(charObject[charField])) {
        revelioApp.rawResults.push(charObject);
    }
    // if the field is a boolean field, creates a new string of the boolean field name with spaces and match the search text, if it's the same then add it to results
    else if (charObject[charField] === true) {
        revelioApp.regExBoolean = charField.replace(/([A-Z])/g, ' $1').trim();
        if (revelioApp.regExNotName.test(revelioApp.regExBoolean)) {
            revelioApp.rawResults.push(charObject);
        }
    }
    // otherwise, use the stricter regular expression on other keys to check
    // another regex is needed for boolean entries
    else if ((revelioApp.regExNotName).test(charObject[charField])) {
        revelioApp.rawResults.push(charObject);
    }
}

// display results on the #results page
revelioApp.displayResults = function (resultsArray, imageCheck, scroll) {
    resultsArray.forEach(function (characterObject) {
        $('section#results > div > div').append(`<div><img><p>${characterObject.name}</p></div>`);
        imageCheck(characterObject.name);
    });
    scroll("#results");
}

//similar to profile.js 's function, may be combined
revelioApp.checkProfilePicture = function (name) {
    // convert character name string to name with hyphens
    const fileName = name.replace(' ', '-');
    // check if gif exists
    $('section#results img').load(`assets/profile-pictures/${fileName}.gif`, function (response, status, xhr) {
        console.log(status);
        // if error, use default and add alt with character name
        if (status === "error") {
            console.log('yay');
            $(this).attr('src', 'assets/profile-pictures/default-static.gif');
            $(this).attr('alt', name);
        }
        // if it does, use URL and add alt with character name
        else {
            $(this).attr('src', `assets/profile-pictures/${fileName}.gif`);
            $(this).attr('alt', name);
        }
    });
}

// smooth-scroll
revelioApp.animateScroll = function (htmlID) {
    $(htmlID).css('display', 'block');
    $(htmlID).css('min-height', '100vh');
    $('html, body').animate({
        scrollTop: $(htmlID).offset().top
    }, 800);
}

$(function () {
    revelioApp.init();
});