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
                else if ((revelioApp.regExNotName).test(charactersObject[character])) {
                    revelioApp.searchResults.push(charactersObject);
                }
            }
        });

        // call results function here, dont use return
    })
    .fail((err) => {
        console.log(err);
    });

    console.log(`I ran first: ${revelioApp.searchResults}`);
}

// on form submit, gets the value of the search text
revelioApp.getSearchText = function() {

    $('.body__form').on('submit', function(event) {
        event.preventDefault();
        revelioApp.searchText = $('.body__search-input').val();
        revelioApp.regExName = new RegExp(revelioApp.searchText, 'i');
        revelioApp.regExNotName = new RegExp('^' + revelioApp.searchText + '$', 'i');
        // callback needed?
        revelioApp.initiateSearch();
        console.log(revelioApp.searchText);

    });
}

$(function() {
    revelioApp.getSearchText();
});
