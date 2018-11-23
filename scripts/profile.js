// will be passed an object with properties for the character selected by the user, temporary object for now:
revelioApp.profileCharacter = {
    alias: 'Padfoot',
    animagus: 'black dog',
    bloodStatus: 'half-blood',
    boggart: "Lord Voldemort",
    deathEater: true,
    dumbledoresArmy: true,
    house: 'Gryffindor',
    ministryOfMagic: false,
    name: 'Hannah Abbott',
    orderOfThePhoenix: true,
    patronus: 'phoenix',
    role: 'student',
    school: 'Hogwarts School of Witchcraft and Wizardry',
    species: 'human',
    wand: 'Ash, 12 1/4", unicorn hair',
    __v: 0,
    _id: '5a0fa4daae5bc100213c232e'
}

revelioApp.profileIconCharacteristics = [
    'school', 'house', 'species', 'dumbledoresArmy', 'bloodStatus', 'patronus', 'deathEater', 'orderOfThePhoenix'
]

// update profile heading and page title with character's name
revelioApp.updateProfileHeading = function(){
    // empty profile heading
    $('.profile-header h2').empty();
    $('.profile-header h2').append(revelioApp.profileCharacter.name);
    document.title = `REVELIO | ${revelioApp.profileCharacter.name}`;
};

// update profile picture with gif if one exists, otherwise, use default png
revelioApp.updateProfilePicture = function(){
    // convert character name string to name with hyphens
    const fileName = revelioApp.profileCharacter.name.replace(' ', '-');
    // check if gif exists
    $('.profile-header img').load(`assets/profile-pictures/${fileName}.gif`, function (response, status, xhr) {
        // if error, use default and add alt with character name
        if (status == "error") {
            $(this).attr('src', 'assets/profile-pictures/default.gif');
            $(this).attr('alt', revelioApp.profileCharacter.name);
        }
        // if it does, use URL and add alt with character name
        else {
            $(this).attr('src', `assets/profile-pictures/${fileName}.gif`);
            $(this).attr('alt', revelioApp.profileCharacter.name);
        }
    });
};

// update any characteristics that correspond with icon stats (ex, house, school, species)
revelioApp.updateProfileIconStats = function(){
    // map through array of icon characeristics
    revelioApp.profileIconCharacteristics.forEach(function(item){
        // check if icon characteristic exists and is true (otherwise, do nothing)
        if ( revelioApp.profileCharacter[item] != undefined && revelioApp.profileCharacter[item] != false ) {
            // check if icon matching property value exists
            $(`.${item}`).load(`assets/icon-stats/${revelioApp.profileCharacter[item]}.png`, function (response, status, xhr) {
            // if not, substitute default property icon source to image
                if (status == 'error' && item != 'patronus') {
                    $(this).attr('src', `assets/icon-stats/${item}.png`);
                    $(this).attr('alt', revelioApp.profileCharacter.item);
                    $(this).css("display", "inline-block");
                    $(`.${item}-container`).css("display", "block");
                    $(this).siblings().css("display", "inline-block");
                    if ($(this).siblings().is(':empty')) {
                        $(this).siblings().append(`${revelioApp.profileCharacter[item]}`);
                    }
                }
            // if no matching patronus icon, do nothing
                else if (item === 'patronus') {
                    return
                }
            // if yes, substitute icon source to image
                else {
                    $(this).attr('src', `assets/icon-stats/${revelioApp.profileCharacter[item]}.png`);
                    $(this).attr('alt', revelioApp.profileCharacter.item);
                    $(this).css("display", "block");
                    $(`.${item}-container`).css("display", "inline-block");
                    $(this).siblings().css("display", "inline-block");
                    $(this).siblings().append(`${revelioApp.profileCharacter[item]}`);
                }
            })
        }
    })
};

// perform profile update functions
$(function () {
    revelioApp.updateProfileHeading();
    revelioApp.updateProfilePicture();
    revelioApp.updateProfileIconStats();
});
