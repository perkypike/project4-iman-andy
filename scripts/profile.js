app.profileIconCharacteristics = [
    'school', 'house', 'species', 'dumbledoresArmy', 'bloodStatus', 'patronus', 'deathEater', 'orderOfThePhoenix', 'ministryOfMagic'
]

app.profileTextCharacteristics = [
    'alias', 'role', 'wand', 'boggart', 'animagus'
]

app.quotes = {
    HarryPotter: [`I had a dream about a motorcycle. It was flying.`, `Brilliant! It’s Potions last thing on Friday! Snape won’t have time to poison us all!`, `Quirrell was a great teacher. There was just that minor drawback of him having Lord Voldemort sticking out of the back of his head.`, `I like a quiet life, you know me.`],

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

    GeorgeWeasley: [`New study finds Death Eaters have the worst grammar on Revelio.`],

    DracoMalfoy: [`I do feel so sorry for all those people who have to stay at Hogwarts for Christmas because they’re not wanted at home.`, `Famous Harry Potter. Can’t even go into a bookshop without making the front page.`, `I don’t think getting your head cut open makes you that special, myself.`, `You’d never know the Weasleys were purebloods, the way they behave.`],

    HelenaRavenclaw: [`I know what he's done! I know who he is! He defiled it! With dark magic!`],

    TomRiddle: [`How many will be brave enough to return when they feel it? And how many will be foolish enough to stay away?`, `There is nothing worse than death`, `I wondered what you know about... Horcruxes?`, `How do you split your soul?` ],

    MinervaMcGonagall: [`Even the Muggles have noticed something’s going on. It was on their news. I heard it. Flocks of owls . . . shooting stars. . . . Well, they’re not completely stupid. They were bound to notice something.`]
}

app.locations = [`Diagon Alley`, `Eeylops Owl Emporium`, `Florean Fortescue's Ice Cream Parlour`, `Flourish & Blotts`, `Gringotts Wizarding Bank`, `Knockturn Alley`, `Borgin & Burkes`, `The Leaky Cauldron`, `Madam Malkin's Robes for All Occasions`, `Ollivanders`, `Quality Quidditch Supplies`, `Weasleys' Wizard Wheezes`, `Hogsmeade`, `The Three Broomsticks`, `Honeydukes`, `Zonko's Joke Shop`, `Hogsmeade Station`, `The Hog's Head`, `Dervish & Banges`, `St. Mungo's Hospital for Magical Maladies and Injuries`, `King's Cross railway station`]

// update profile heading and page title with character's name
app.updateProfileHeading = function(){
    // empty profile heading
    $('.profile-header h2').empty();
    $('.profile-header h2').append(app.profileCharacter.name);
    document.title = `REVELIO | ${app.profileCharacter.name}`;
};

// update profile picture with gif if one exists, otherwise, use default png
app.updateProfilePicture = function(){
    // convert character name string to name with hyphens
    const fileName = app.profileCharacter.name.replace(/ /g, '-');
    // check if gif exists
    $('.profile-header img').load(`assets/profile-pictures/${fileName}.gif`, function (response, status, xhr) {
        // if error, use default and add alt with character name
        if (status == "error") {
            $(this).attr('src', 'assets/profile-pictures/default.gif');
            $(this).attr('alt', app.profileCharacter.name);
        }
        // if it does, use URL and add alt with character name
        else {
            $(this).attr('src', `assets/profile-pictures/${fileName}.gif`);
            $(this).attr('alt', app.profileCharacter.name);
        }
    });
};

// update any characteristics that correspond with icon stats (ex, house, school, species)
app.updateProfileIconStats = function(){
    // reset section
    $(`.icon-container`).css(`display`, `none`);
    // map through array of icon characeristics
    app.profileIconCharacteristics.forEach(function(item){
        // check if icon characteristic exists and is true (otherwise, do nothing)
        if ( app.profileCharacter[item] != undefined && app.profileCharacter[item] != false ) {
            // check if icon matching property value exists
            $(`.${item}`).load(`assets/icon-stats/${app.profileCharacter[item]}.png`, function (response, status, xhr) {
            // if not, substitute default property icon source to image
                if (status == 'error' && item != 'patronus') {
                    $(this).attr('src', `assets/icon-stats/${item}.png`);
                    $(this).attr('alt', app.profileCharacter.item);
                    $(this).css("display", "inline-block");
                    $(`.${item}-container`).css("display", "block");
                    $(this).siblings().css("display", "inline-block");
                    if ( item === 'school' || item === 'house' || item === 'bloodStatus' || item === 'species' ) {
                        $(this).siblings().empty();
                        $(this).siblings().append(`${app.profileCharacter[item]}`);
                    }
                }
            // if no matching patronus or species icon, do nothing
                else if (item === 'patronus') {
                    return
                }
            // if yes, substitute icon source to image
                else {
                    $(this).attr('src', `assets/icon-stats/${app.profileCharacter[item]}.png`);
                    $(this).attr('alt', app.profileCharacter.item);
                    $(this).css("display", "block");
                    $(`.${item}-container`).css("display", "inline-block");
                    // empty caption
                    $(this).siblings().empty();
                    // display caption
                    $(this).siblings().css("display", "inline-block");
                    // append description to caption
                    $(this).siblings().append(`${app.profileCharacter[item]}`);
                }
            })
        }
    })
};

// update any characteristics that correspond with text stats (alias, role, wand, bogart, animagus)
app.updateProfileTextStats = function () {
    // reset section
    $(`.profile-text-stats h2`).css(`display`, `none`);
    $(`.text-container`).css('display', 'none');
    $('.divider').css('display', 'none');
    // map through array of text characeristics
    app.profileTextCharacteristics.forEach(function (item) {
        // check if text characteristic exists and is not unknown (otherwise, do nothing)
        if (app.profileCharacter[item] != undefined && app.profileCharacter[item] != 'unknown') {
            // if yes, show item text container, header and dividers
            $(`.profile-text-stats h2`).css('display', 'block')
            $(`.${item}-container`).css('display', 'grid');
            $('.divider').css('display', 'grid');
            // empty item
            $(`.${item}`).empty();
            // append value of item to value span
            $(`.${item}`).append(app.profileCharacter[item]);
        }
    })
};

// Get 3 random dates in chronological order for status updates
app.dates = function(){
    // empty array to store dates
    app.datesArray = [];
    // need dates between these points
    start = new Date(1991, 11, 1);
    end = new Date(1998, 04, 20);
    // loop 3 times
    for (i = 0; i < 3; i++) {
        // random date, define month
        date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        // format month, day, year, time stamp
        months = [`Jan.`, `Feb.`, `Mar.`, `Apr.`, `May`, `Jun.`, `Jul.`, `Aug.`, `Sep.`, `Oct.`, `Nov.`, `Dec.`];
        month = months['' + date.getMonth()];
        day = '' + date.getDate() + ',';
        year = date.getFullYear() + ' @';
        time = date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        // store number of milliseconds since midnight Jan 1 1970 - will use to sort dates
        dateMs = date.getTime();
        finalDate = [month, day, year, time].join(' ');
        app.datesArray.push({dateMs, finalDate});
    };
    // sort date into new array in chronological order
    // empty array to store dateMs
    datesMsArray = [];
    // store dateMs in new array
    app.datesArray.forEach(function(item) {
        datesMsArray.push(item.dateMs);
    });
    // sort datesMs
    datesMsArray.sort();
    // empty array for final dates in chronological order
    app.finalDatesArray = [];
    // for each dateMs, find matching finalDate and push to finalDatesArray
    datesMsArray.forEach(function (item) {
        app.datesArray.forEach(function (dateObj) {
            if ( item === dateObj.dateMs ) {
                app.finalDatesArray.push(dateObj.finalDate);
            }
        });
    });
};

// Update quote text with character quote, if one exists
app.updateQuote = function () {
    // reset section
    $(`.profile-quote-status`).css('display', 'none');
    $(`.quote .status`).empty();
    $(`.profile-quote-status .date`).empty();
    //store character name without spaces
    const char = app.profileCharacter.name.replace(/ /g, '');
    // // loop through object of quotes
    for (character in app.quotes) {
        // check if key is the same as character name
        if ( char === character ) {
            // store character's quotes
            let quotes = app.quotes[char];
            // pick a random quote
            let quote = quotes[Math.floor(Math.random() * quotes.length)];
            // append quote to quote span
            $(`.quote .status`).append(quote);
            // append most recent date to date span
            $(`.profile-quote-status .date`).append(app.finalDatesArray[2]);
            // display quote
            $(`.profile-quote-status`).css('display', 'grid');
        }
    }
};

// Create arrays with similar characters grouped together for friend status updates and for friends list
app.groupCharacters = function () {
    // Groupings for friends
    app.groupArray = [`house`, `deathEater`, `school`, `species`];
    // get all character array
    app.getAPIData("characters");
    $.when(app.getData).then(function (res) {
        //  map through group array
        app.groupArray.map(function (group) {
            // create empty group array
            app[group] = []
            // map through all characters and add all in same group to respective array
            res.map(function (item) {
                if (app.profileCharacter[group] === item[group] && app.profileCharacter[group] != false && app.profileCharacter[group] != '' && app.profileCharacter[group] != 'unknown' && app.profileCharacter[group] != undefined) {
                    app[group].push(item);
                }
            });
        });
        // when complete, update friend related sections
        app.updateFriendStatus();
        app.updateFriendsList();
        app.friendsListObject(app.friendsList);
    }).then(() => {
        app.refreshProfile('.friend > img', app.friendsNameObjectPair);
    });
};

// update friend status (character became friends with...)
app.updateFriendStatus = function(){
    // reset section
    $(`.profile-friend-status .status`).empty();
    $(`.profile-friend-status .date`).empty();
    // run through group array until name available to append to friend status
    for ( i = 0; i < app.groupArray.length; i++) {
        // if group array has items, store random character
        if ( app[app.groupArray[i]].length > 0 ) {
            randChar = app[app.groupArray[i]][Math.floor(Math.random() * app[app.groupArray[i]].length)];
            // append random character to friend status
            $(`.profile-friend-status .status`).append(`${app.profileCharacter.name} became friends with ${randChar.name}.`);
            // update friend status date
            $(`.profile-friend-status .date`).append(app.finalDatesArray[1]);
            // exit loop
            return
        }
    }
};

// update friends list with 6 characters from a similar group
app.updateFriendsList = function(){
    // empty array to add friends to
    app.friendsList = [];
    // run through group array until name available to append to friend status
    for (i = 0; i < app.groupArray.length; i++) {
        // create duplicate group array to splice from
        let dupArray = app[app.groupArray[i]];
        // if group array has items, store random character
        if (dupArray.length > 0 ) {
            // run through group at least 6 times before moving on to next group
            for (j = 0; j < 6; j++) {
                // store random character spliced from duplicate array
                randCharr = dupArray.splice([Math.floor(Math.random() * dupArray.length)], 1);
                // add random character to friends list
                app.friendsList.push(randCharr);

                if (app.friendsList.length === 6) {
                    // stop when 6 friends added
                    app.updateFriendsListDiv();
                    return
                }
            }
        }
    }
};

// convert app.friendsList to a key-value pair of name:corresponding object
app.friendsListObject = function(friendsList) {
    friendsList.forEach(function (friends) {
        app.friendsNameObjectPair[friends[0].name] = friends[0];
    })
}

app.updateFriendsListDiv = function () {
    // reset section
    $('caption').remove();
    // loop through friendsList array
    for (i = 0; i < app.friendsList.length; i++) {
        // append character name from friendsList array to friends list div
        $(`.friend-${i}`).append(`<caption>${app.friendsList[i][0].name}</caption>`);
        // append picture if one exists
        // store name
        const friendName = app.friendsList[i][0].name;
        // convert character name string to name with hyphens
        const friendNameHyphen = friendName.replace(/ /g, '-');
        // check if gif exists
        $(`.friend-${i}-img`).load(`assets/profile-pictures/${friendNameHyphen}.gif`, function (response, status, xhr) {
            // if error, use default and add alt with character name
            if (status == "error") {
                $(this).attr('src', 'assets/profile-pictures/default.gif');
                $(this).attr('alt', friendName);
            }
            // if it does, use URL and add alt with character name
            else {
                $(this).attr('src', `assets/profile-pictures/${friendNameHyphen}.gif`);
                $(this).attr('alt', friendName);
            }
        });
    }
};

// Update character's location
app.updateLocation = function () {
    // reset section
    $(`.profile-location-status .status`).empty();
    $(`.profile-location-status .date`).empty();
    // pick a random location
    let location = app.locations[Math.floor(Math.random() * app.locations.length)];
    // append location to location span
    $(`.profile-location-status .status`).append(`${app.profileCharacter.name} checked in at ${location}.`);
    // append earliest date to date span
    $(`.profile-location-status .date`).append(app.finalDatesArray[0]);
    // display location
    $(`.profile-location-status`).css('display', 'grid')
};

// All of profile update functions
app.updateProfile = function () {
    app.updateProfileHeading();
    app.updateProfilePicture();
    app.updateProfileIconStats();
    app.updateProfileTextStats();
    app.dates();
    app.updateQuote();
    app.groupCharacters();
    app.updateLocation();
}
