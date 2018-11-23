// will be passed an object with properties for the character selected by the user, temporary object for now:
revelioApp.profileCharacter = {
    alias: 'Padfoot',
    animagus: 'black dog',
    bloodStatus: 'half-blood',
    boggart: "Lord Voldemort",
    deathEater: true,
    dumbledoresArmy: true,
    house: 'Gryffindor',
    ministryOfMagic: true,
    name: 'Ronald Weasley',
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
    'school', 'house', 'species', 'dumbledoresArmy', 'bloodStatus', 'patronus', 'deathEater', 'orderOfThePhoenix', 'ministryOfMagic'
]

revelioApp.profileTextCharacteristics = [
    'alias', 'role', 'wand', 'boggart', 'animagus'
]

revelioApp.quotes = {
    RonaldWeasley: [`From now on, I don’t care if my tea leaves spell out die, Ron, die — I’m just chucking them in the bin where they belong.`, `Can you believe our luck? Of all the trees we could’ve hit, we had to get one that hits back.`, `Don't let the Muggles get you down!`],

    ArthurWeasley: [`Never trust anything that can think for itself if you can’t see where it keeps its brain.`],

    HermioneGranger: [`Just because you have the emotional range of a teaspoon doesn’t mean we all have.`, `Honestly, am I the only person who's ever bother to read Hogwarts: A History?`],

    PhineasNigellusBlack: [`I disagree with Dumbledore on may counts ... but you cannot deny he's got style.`],

    AlbusDumbledore: [`It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.`, `One can never have enough socks. Another Christmas has come and gone and I didn't get a single pair. People will insist on giving me books.`, `It does not do well to dwell on dreams and forget to live.`, `Soon we must all face the choice between what is right, and what is easy.`, `To the well-organized mind, death is but the next great adventure.`, `It's not our abilities that make us who we are. It's our choices.`, `But you know, happiness can be found even in the darkest of times, if one only remembers to turn on the light.`, `It matters not what someone is born, but what they grow to be.`, `Words are, in my not-so-humble opinion, our most inexhaustible source of magic. Capable of both inflicting injury, and remedying it.`, `Scars can come in handy. I have one myself above my left knee that is a perfect map of the London Underground.`, `Nitwit! Blubber! Oddment! Tweak!`, `It does not do to dwell on dreams and forget to live.`],

    LunaLovegood: [`The Aurors are part of the Rotfang Conspiracy, I thought everyone knew that. They're working to bring down the Ministry of Magic from within using a mixture of dark magic and gum disease.`, `Things we lose have a way of coming back to us in the end, if not always in the way we expect.`, `I think I'll just go down and have some pudding and wait for it all to turn up — it always does in the end.`, `You can laugh, but people used to believe there were no such things as the Blibbering Humdinger or the Crumple-Horned Snorkack!`],

    RubeusHagrid: [`Yer a wizard, Harry.`, `I am what I am, an' I'm not ashamed. 'Never be ashamed,' my ol' dad used ter say, 'there's some who'll hold it against you, but they're not worth botherin' with.`],

    Dobby: [`Dobby is free.`],

    SiriusBlack: [`If you want to know what a man’s like, take a good look at how he treats his inferiors, not his equals.`, `We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.`],

    FredWeasley: [`I think we've outgrown full-time education ... Time to test our talents in the real world, d'you reckon?`],

    KingsleyShacklebolt: [`Every human life is worth the same, and worth saving.`],

    GeorgeWeasley: [`New study finds Death Eaters have the worst grammar on Revelio. &#xF602`],

    DracoMalfoy: [`I do feel so sorry for all those people who have to stay at Hogwarts for Christmas because they’re not wanted at home.`, `Famous Harry Potter. Can’t even go into a bookshop without making the front page.`, `I don’t think getting your head cut open makes you that special, myself.`, `You’d never know the Weasleys were purebloods, the way they behave.`]
}

revelioApp.locations = [`Diagon Alley`, `Eeylops Owl Emporium`, `Florean Fortescue's Ice Cream Parlour`, `Flourish & Blotts`, `Gringotts Wizarding Bank`, `Knockturn Alley`, `Borgin & Burkes`, `The Leaky Cauldron`, `Madam Malkin's Robes for All Occasions`, `Ollivanders`, `Quality Quidditch Supplies`, `Weasleys' Wizard Wheezes`, `Hogsmeade`, `The Three Broomsticks`, `Honeydukes`, `Zonko's Joke Shop`, `Hogsmeade Station`, `The Hog's Head`, `Dervish & Banges`, `St Mungo's Hospital for Magical Maladies and Injuries`, `King's Cross railway station`]

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

// update any characteristics that correspond with text stats (alias, role, wand, bogart, animagus)
revelioApp.updateProfileTextStats = function () {
    // map through array of text characeristics
    revelioApp.profileTextCharacteristics.forEach(function (item) {
        // check if text characteristic exists and is not unknown (otherwise, do nothing)
        if (revelioApp.profileCharacter[item] != undefined && revelioApp.profileCharacter[item] != 'unknown') {
            // if yes, show item text container and dividers
            $(`.${item}-container`).css('display', 'grid');
            $('.divider').css('display', 'grid');
            // append value of item to value span
            $(`.${item}`).append(revelioApp.profileCharacter[item]);
        }
    })
};

// Update quote text with character quote, if one exists
revelioApp.updateQuote = function () {
    //store character name without spaces
    const char = revelioApp.profileCharacter.name.replace(' ', '');
    // // loop through object of quotes
    for (character in revelioApp.quotes) {
        // check if key is the same as character name
        if ( char === character ) {
            // store character's quotes
            let quotes = revelioApp.quotes[char];
            // pick a random quote
            let quote = quotes[Math.floor(Math.random() * quotes.length)];
            // append quote to quote span
            $(`.quote .status`).append(quote);
            // display quote
            $(`.profile-quote-status`).css('display', 'grid');
        }
    }
};

// Update character's location
revelioApp.updateLocation = function () {
    // pick a random location
    let location = revelioApp.locations[Math.floor(Math.random() * revelioApp.locations.length)];
    // append location to location span
    $(`.profile-location-status .status`).append(`${revelioApp.profileCharacter.name} checked in at ${location}.`);
    // display location
    $(`.profile-location-status`).css('display', 'grid')
};

// perform profile update functions
$(function () {
    revelioApp.updateProfileHeading();
    revelioApp.updateProfilePicture();
    revelioApp.updateProfileIconStats();
    revelioApp.updateProfileTextStats();
    revelioApp.updateQuote();
    revelioApp.updateLocation();
});
