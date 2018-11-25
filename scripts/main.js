const revelioApp = {};
revelioApp.profileCharacter = {};
revelioApp.searchText = "";
revelioApp.rawResults = [];
revelioApp.searchResults = [];
revelioApp.charNameObjectPair = {};
revelioApp.houseResults = [];
revelioApp.regExName = "";
revelioApp.regExBoolean = "";
revelioApp.regExNotName = "";
revelioApp.url = "https://www.potterapi.com/v1/";
revelioApp.key = "$2a$10$uBFyQUBe.1xJ1KYkmh9sIeYHT3T7v8loA1CosKCCffl4YD5XYVcS."

// easter egg ideas: niffler on the top, money raining down

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
    revelioApp.getAPIData("characters");

    // wait until character data is retrieved, THEN filter results based on some regular expressions
    $.when(revelioApp.getData)
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
        })
        revelioApp.displayResults(revelioApp.searchResults, revelioApp.displayProfilePicture);
    }).then(() => {
        // we want all the filters complete before scrolling down so we set chain another Promise
        revelioApp.animateScroll('#results');
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
revelioApp.getAPIData = function(id) {
    revelioApp.getData = $.ajax({
        url: `${revelioApp.url}${id}/`,
        dataType: 'json',
        method: 'GET',
        data: {
            key: revelioApp.key
        }
    });
}

revelioApp.getHouseMembers = function(selectedHouse) {
    // returns character IDs of that house in houseResults array
    revelioApp.getAPIData("houses");
    $.when(revelioApp.getData).then((houseArray) => {
        // for each house, check if it matches the selectedHouse
        houseArray.forEach(function (houseObject) {
            if (houseObject.name === selectedHouse) {
                // store the array of id members in a revelioApp.houseResults
                revelioApp.houseResults = houseObject.members;
            }
        });
    })
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
revelioApp.displayResults = function (resultsArray, displayImage) {
    for (let i = 0; i < resultsArray.length; i++) {
        $('section#results > div > div').append(`<figure class='character character-container-${i+1}'><img class='character-picture'><figcaption>${resultsArray[i].name}</figcaption></figure>`);
        // Chrome does not like styles below...
        // $('section#results img').css('max-width', '100%');
        // $('section#results img').css('max-height', '100%');
        displayImage(resultsArray[i].name);
        revelioApp.charNameObjectPair[resultsArray[i].name] = resultsArray[i];
        console.log(revelioApp.charNameObjectPair);
    }
    revelioApp.showProfile();
}

revelioApp.showProfile = function() {
    $('.character-picture').on('click', function() {
        revelioApp.profileCharacter = revelioApp.charNameObjectPair[$(this).next().text()];
        console.log(revelioApp.profileCharacter);
        $('.profile').fadeIn('slow', function() {
            $('.profile').css('display', 'block');
            revelioApp.updateProfileHeading();
            revelioApp.updateProfilePicture();
            revelioApp.updateProfileIconStats();
            revelioApp.updateProfileTextStats();
            revelioApp.updateQuote();
            revelioApp.updateLocation();
        })
        $('h3').on('click', function () {
            revelioApp.hideProfile();
        });
    })
}

revelioApp.hideProfile = function() {
    $('.profile').fadeOut('slow', function() {
    });
}

revelioApp.displayProfilePicture = function(name) {
    // convert character name string to name with hyphens
    const fileName = name.replace(' ', '-');
    revelioApp.errorImageCheck();
    $('section#results img').load(`assets/profile-pictures/${fileName}.png`, function() {
        $(this).attr('src', `assets/profile-pictures/${fileName}.png`);
        $(this).attr('alt', name);
    });
}

revelioApp.errorImageCheck = function() {
    $('img').on('error', function () {
        $(this).attr('src', 'assets/profile-pictures/default-static.gif');
        $(this).attr('alt', 'spooky ghost');
    })
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