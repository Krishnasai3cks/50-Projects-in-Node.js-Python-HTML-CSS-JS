async function start() {
    let jsonFile = await fetch("https://forum-proxy.freecodecamp.rocks/latest");
    let result = await jsonFile.json();
    let { topics } = result.topic_list;
    let { users } = result;
    let table = document.querySelector("table");
    let index = 0;
    for (let topic of topics) {
        index++;
        let tableRow = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = index;
        let td2 = document.createElement("td");
        td2.setAttribute("id", "page-title");
        td2.innerHTML = `<a href='https://forum.freecodecamp.org/t/${topic.id}'>${topic.title}</a>`;
        let td3 = document.createElement("td");
        let string_for_td3 = "";
        for (let user of topic.posters) {
            let userDetails = users.find((value) => value.id === user.user_id);
            let user_avatar = userDetails.avatar_template.replace("{size}", 130);
            string_for_td3 += `<a id='${userDetails.username}' href='https://forum.freecodecamp.org/u/${userDetails.username}'><img src="https://sjc1.discourse-cdn.com/freecodecamp${user_avatar}"></img></a>`;
        }
        td3.innerHTML = string_for_td3;
        td3.setAttribute("id", "people");
        let td4 = document.createElement("td");
        td4.innerText = topic.reply_count;
        let td5 = document.createElement("td");
        td5.innerText = topic.views;
        let time_difference = new Date() - new Date(topic.last_posted_at);
        time_difference =
            time_difference >= 3600000 ?
            "" + String(Math.floor(time_difference / 3600000)) + "h" :
            time_difference >= 60000 ?
            String(Math.floor(time_difference / 60000)) + "m" :
            String(Math.floor(time_difference / 1000)) + "s";
        let td6 = document.createElement("td");
        td6.innerText = time_difference;
        tableRow.appendChild(td1);
        tableRow.appendChild(td2);
        tableRow.appendChild(td3);
        tableRow.appendChild(td4);
        tableRow.appendChild(td5);
        tableRow.appendChild(td6);
        table.appendChild(tableRow);
    }
    let anchors = document.querySelectorAll("a");
    for (let tag of anchors) {
        tag.target = "_blank";
        tag.addEventListener("mouseenter", (event) => {
            console.log(event.target);
            let tooltip = document.getElementById("tooltip");
            console.log(event.target.clientX);
            tooltip.style.display = "block";
            tooltip.style.left = event.clientX + "px";
            tooltip.style.top = event.clientY - 30 + "px";
            tooltip.innerHTML = event.target.id;
        });
        tag.addEventListener("mouseleave", () => {
            let tooltip = document.getElementById("tooltip");
            tooltip.style.display = "none";
        });
    }
}
start();
/*
Object
primary_groups: Array(0)
length: 0
__proto__: Array(0)
topic_list:
can_create_topic: false
draft: null
draft_key: "new_topic"
draft_sequence: null
more_topics_url: "/latest?no_definitions=true&page=1"
per_page: 30
topics: Array(30)
0:
archetype: "regular"
archived: false
bookmarked: null
bumped: true
bumped_at: "2020-10-18T16:35:20.379Z"
can_vote: false
category_id: 511
closed: false
created_at: "2020-10-18T16:35:20.320Z"
fancy_title: "Firing event in react testing library"
featured_link: null
has_accepted_answer: false
has_summary: false
highest_post_number: 1
id: 426108
image_url: null
last_posted_at: "2020-10-18T16:35:20.379Z"
last_poster_username: "nibble"
like_count: 0
liked: null
pinned: false
pinned_globally: false
posters: [{…}]
posts_count: 1
reply_count: 0
slug: "firing-event-in-react-testing-library"
title: "Firing event in react testing library"
unpinned: null
unseen: false
user_voted: null
views: 2
visible: true
vote_count: 0


users: Array(54)
0:
avatar_template: "/user_avatar/forum.freecodecamp.org/nibble/{size}/123681_2.png"
id: 211073
name: "MJ"
username: "nibble"
*/