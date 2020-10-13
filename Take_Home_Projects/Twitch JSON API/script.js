let users = document.getElementById("users");
let ourUsers = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
];

function a() {
    var twitchArray = [];
    ourUsers.forEach((user) => {
        let stream =
            "https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/" +
            user +
            "?callback=?";
        let channel =
            "https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/" +
            user +
            "?callback=?";
        $.getJSON(channel, (c) => {
            $.getJSON(stream, (s) => {
                var { name, logo, link } = getNamesAndLogo(c);
                var { status, game, desc } = getOnlineOrOffline(s);
                console.log(logo);
                var htmlString = `
                <div class="maindiv ${status}" id="${user}">
                    <div id="imga"><img class="allimages" src="${logo}" onerror="this.src='https://simpleicon.com/wp-content/uploads/user1.png'"></img>
                        <a href="${link}">${name}</a></div>
                    <p>${game}: ${desc}</p>
                    <hr style="width:100%;">
                </div>
                `;
                $(".users").append(htmlString);
            });
        });

        function getNamesAndLogo(obj) {
            return {
                name: obj.name,
                logo: obj.logo,
                link: obj.link,
            };
        }

        function getOnlineOrOffline(obj) {
            if (obj.stream !== null) {
                return {
                    status: "online",
                    game: obj.stream.game,
                    desc: obj.stream.channel.status,
                };
            } else {
                return {
                    status: "offline",
                    game: "offline",
                    desc: "No desc",
                };
            }
        }
    });
}
a();
$(document).ready(function() {
    let all = document.getElementById("all");
    let offline = document.getElementById("offline");
    let online = document.getElementById("online");
    $(all).addClass("active");
    $(all).click(function() {
        $(all).addClass("active");
        $(online).removeClass("active");
        $(offline).removeClass("active");
        $(".online").show();
        $(".offline").show();
    });
    $(offline).click(function() {
        $(offline).addClass("active");
        $(online).removeClass("active");
        $(all).removeClass("active");
        $(".online").hide();
        $(".offline").show();
    });
    $(online).click(function() {
        $(online).addClass("active");
        $(offline).removeClass("active");
        $(all).removeClass("active");
        $(".online").show();
        $(".offline").hide();
    });
});