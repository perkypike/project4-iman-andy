const revelioApp = {};
revelioApp.searchText = "";
revelioApp.objectValues = "";
revelioApp.searchResults = [];
revelioApp.regExName = "";
revelioApp.regExNotName = "";
revelioApp.url = "https://www.potterapi.com/v1/";
revelioApp.key = "$2a$10$uBFyQUBe.1xJ1KYkmh9sIeYHT3T7v8loA1CosKCCffl4YD5XYVcS."

revelioApp.initiateSearch = function() {

    // reset search results array in case of new search
    revelioApp.searchResults = [];

    revelioApp.getCharacter = $.ajax({
        url: `${revelioApp.url}characters/`,
        dataType: 'json',
        method: 'GET',
        data: {
            key: revelioApp.key
        }
    });

    // results = characterArray
    $.when(revelioApp.getCharacter).then((characterArray) => {
        // for each character in the characterArray...
        characterArray.forEach(function(charactersObject) {
            // go through all the keys in that character object
            for (let character in charactersObject) {
                // if the key is name, use the looser regular expression to check
                if ((character === 'name') && (revelioApp.regExName).test(charactersObject[character])) {
                    revelioApp.searchResults.push(charactersObject);
                }
                // otherwise, use the stricter regular expression on other keys to check
                // another regex is needed for boolean entries
                else if ((revelioApp.regExNotName).test(charactersObject[character])) {
                    revelioApp.searchResults.push(charactersObject);
                }
            }
        });

        // call results function here, dont use return
        revelioApp.clearResults();
        revelioApp.displayResults(revelioApp.searchResults);
        console.log(revelioApp.searchResults);
    })
    .fail((err) => {
        console.log(err);
    });

}

//smooth-scroll
revelioApp.animateScroll = function(htmlID) {
    $(htmlID).css('display', 'block');
    $(htmlID).css('min-height', '100vh');
    $('html, body').animate({
        scrollTop: $(htmlID).offset().top
    }, 800);
}

// on form submit, gets the value of the search text
revelioApp.getSearchText = function() {
    $('.search-form').on('submit', function(event) {
        event.preventDefault();
        revelioApp.searchText = $('input[type=text]').val();
        revelioApp.regExName = new RegExp(revelioApp.searchText, 'i');
        revelioApp.regExNotName = new RegExp('^' + revelioApp.searchText + '$', 'i');
        revelioApp.animateScroll('#results');
        revelioApp.initiateSearch();
    });
}

revelioApp.clearResults = function() {
    $('section#results > div > div').empty();
}

revelioApp.displayResults = function(resultsArray) {
    resultsArray.forEach(function (characterObject) {
        $('section#results > div > div').append(`<div><img><p>${characterObject.name}</p></div>`);
        revelioApp.checkProfilePicture(characterObject.name);
    });
}

//similar to profile.js 's function, may be combined
revelioApp.checkProfilePicture = function(name) {
    // convert character name string to name with hyphens
    const fileName = name.replace(' ', '-');
    // check if gif exists
    $('section#results img').load(`assets/profile-pictures/${fileName}.gif`, function (response, status, xhr) {
        // if error, use default and add alt with character name
        if (status == "error") {
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

$(function() {
    revelioApp.getSearchText();
});
