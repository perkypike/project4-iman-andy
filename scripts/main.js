const revelioApp = {};
revelioApp.searchText = "";
revelioApp.objectValues = "";
revelioApp.regEx = "";
revelioApp.url = "https://www.potterapi.com/v1/";
revelioApp.key = "$2a$10$uBFyQUBe.1xJ1KYkmh9sIeYHT3T7v8loA1CosKCCffl4YD5XYVcS."

revelioApp.initiateSearch = function() {
    revelioApp.getCharacter = $.ajax({
        url: `${revelioApp.url}characters/`,
        dataType: 'json',
        method: 'GET',
        data: {
            key: revelioApp.key
        }
    });

    $.when(revelioApp.getCharacter)
        .then((res) => {
            res.forEach(function (element) {
                objectValues = Object.values(element);
                if (revelioApp.regEx.test(element['name'])) {
                    console.log(element['name']);
                }
            });
        })
        .fail((err) => {
            console.log(err);
        });
} 

// on form submit, gets the value of the search text
revelioApp.getSearchText = function() {
    $('.body__form').on('submit', function(event) {
        event.preventDefault();
        revelioApp.searchText = $('.body__search-input').val();
        revelioApp.regEx = new RegExp(revelioApp.searchText, 'i');
        // callback needed?
        revelioApp.initiateSearch();
        console.log(revelioApp.searchText);

    });
}

$(function() {
    revelioApp.getSearchText();
});
