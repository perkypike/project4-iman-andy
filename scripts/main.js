const app = {};
app.profileCharacter = {};
app.searchText = "";
app.rawResults = [];
app.searchResults = [];
app.charNameObjectPair = {};
app.friendsNameObjectPair = {};
app.houseResults = [];
app.regExName = "";
app.regExBoolean = "";
app.regExNotName = "";
app.url = "https://www.potterapi.com/v1/";
app.key = "$2a$10$uBFyQUBe.1xJ1KYkmh9sIeYHT3T7v8loA1CosKCCffl4YD5XYVcS."

// initialize
app.init = function () {
    app.getSearchText(app.initiateSearch);
}

// click event listeners for searchpage
app.getSearchText = function (startSearch) {
    $('.about').on('click', function (event) {
        // display about modal
        $('.about-popup').fadeIn('slow', function () {
            $('.about-popup').css('display', 'block');
            $('html').css('overflow-y', 'hidden');
        })
    });
    $('.close').on('click', function (event) {
        // hide about modal
        $('.about-popup').fadeOut('slow', function () {
            $('.about-popup').css('display', 'none');
            $('html').css('overflow-y', 'auto');
        })
    });
    $('.search-form').on('submit', function (event) {
        // form submission event
        event.preventDefault();
        app.searchText = $('input[type=text]').val();
        app.regExName = new RegExp(app.searchText, 'i');
        app.regExNotName = new RegExp('^' + app.searchText + '$', 'i');
        startSearch();
    });
}

// initiate search
app.initiateSearch = function () {

    // clear prev results and get character data from API
    app.clearResults();
    app.getAPIData("characters");

    // wait until character data is retrieved, THEN filter results based on some regular expressions
    $.when(app.getData)
    .then((characterArray) => {
        // for each character in the characterArray...
        // !!you can check forEach parameters to make this easier!!...
        characterArray.forEach(function (charactersObject) {
            // go through all the keys in that character object and filter results
            for (let character in charactersObject) {
                app.matchSearchFields(character, charactersObject);
            }
            // Set type is an object contains only unique values/objects (removes duplicates), using spread operator to turn it back to Array
            app.searchResults = [...new Set(app.rawResults)];
        })
        app.displayResults(app.searchResults, app.displayProfilePicture);
    }).then(() => {
        // we want all the filters complete before scrolling down so we set chain another Promise
        app.animateScroll('#results');
    })
    // error handling
    .fail((err) => {
        console.log(err);
    });
}

// clear search results
app.clearResults = function () {
    // reset search results array in case of new search
    app.charNameObjectPair = {};
    app.rawResults = [];
    app.searchResults = [];
    $('section#results > div > div').empty();
}


// get character data from API
app.getAPIData = function(id) {
    app.getData = $.ajax({
        url: `${app.url}${id}/`,
        dataType: 'json',
        method: 'GET',
        data: {
            key: app.key
        }
    });
}

// get house data from API
app.getHouseMembers = function(selectedHouse) {
    // returns character IDs of that house in houseResults array
    app.getAPIData("houses");
    $.when(app.getData).then((houseArray) => {
        // for each house, check if it matches the selectedHouse
        houseArray.forEach(function (houseObject) {
            if (houseObject.name === selectedHouse) {
                // store the array of id members in a app.houseResults
                app.houseResults = houseObject.members;
            }
        });
    })
}

// filter search results
app.matchSearchFields = function (charField, charObject) {
    // if the key is name, as long as the search text is a substring of the name, add it to results
    if ((charField === 'name') && (app.regExName).test(charObject[charField])) {
        app.rawResults.push(charObject);
    }
    // if the field is a boolean field, creates a new string of the boolean field name with spaces and match the search text, if it's the same then add it to results
    else if (charObject[charField] === true) {
        app.regExBoolean = charField.replace(/([A-Z])/g, ' $1').trim();
        if (app.regExNotName.test(app.regExBoolean)) {
            app.rawResults.push(charObject);
        }
    }
    // otherwise, use the stricter regular expression on other keys to check
    // another regex is needed for boolean entries
    else if ((app.regExNotName).test(charObject[charField])) {
        app.rawResults.push(charObject);
    }
}

// display results on the #results page
app.displayResults = function (resultsArray, displayImage) {
    if (resultsArray.length === 0) {
        $('section#results > div > div').append(`<p class="results-error">No results! Try again, ya muggle!</p>`);
    }
    else {
        for (let i = 0; i < resultsArray.length; i++) {
            let className = resultsArray[i].name.replace(/ /g, '-');
            $('section#results > div > div').append(`<figure class='character character-container-${i + 1}'><img class='character-picture ${className}-picture' src='assets/profile-pictures/default-static.png'><figcaption>${resultsArray[i].name}</figcaption></figure>`);
            displayImage(resultsArray[i].name);
            app.charNameObjectPair[resultsArray[i].name] = resultsArray[i];
        }
        app.showProfile('.character-picture', app.charNameObjectPair);
    }
}

// display initial profile (displays after selecting a character profile from the results page)
app.showProfile = function (element, nameObjectPair) {
    $(element).off('click');
    $(element).on('click', function () {
        let characterName = $(this).next().text();
        app.profileCharacter = nameObjectPair[characterName];
        $('.profile').fadeIn('slow', function () {
            $('.profile').css('display', 'block');
            app.updateProfile();
            $('#results').css('display', 'none');
        })
        $('h3').on('click', function () {
            app.hideProfile();
        });
    })
}

// refreshes the current profile to the selected character profile
app.refreshProfile = function (element, nameObjectPair) {
    $(element).off('click');
    $(element).on('click', function () {
        let characterName = $(this).next().text();
        app.profileCharacter = nameObjectPair[characterName];
        app.updateProfile();
        $('#profile').animate({
            scrollTop: "0px"
        }, 800);
    })
}

app.hideProfile = function() {
    $('.profile').fadeOut('slow', function() {
    });
    $('#results').css('display', 'block');
    document.title = `REVELIO`;
}

app.displayProfilePicture = function(name) {
    // convert character name string to name with hyphens
    const fileName = name.replace(/ /g, '-');
    $(`.${fileName}-picture`).load(`assets/profile-pictures/${fileName}-static.png`, function (response, status, xhr) {
        // if error, use default and add alt with character name
        if (status == "error") {
            $(this).attr('alt', name);
            console.log(`error: ${name}`);
        }
        // if it does, use URL and add alt with character name
        else {
            $(this).attr('src', `assets/profile-pictures/${fileName}-static.png`);
            $(this).attr('alt', name);
            console.log(`no error: ${name}`);
        }
    });
}

// smooth-scroll
app.animateScroll = function (htmlID) {
    $(htmlID).css('display', 'block');
    $(htmlID).css('min-height', '100vh');
    $('html, body').animate({
        scrollTop: $(htmlID).offset().top
    }, 800);
}

$(function () {
    app.init();
});
