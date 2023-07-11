const { json } = require("body-parser");


async function addFriend(){
    var friend = document.getElementById("newFriendInput").value;
    if (friend.trim() === '') {
        pass //MENSAGEM DE ERRO
        console.log('ERROR')
    }
    const cookie = JSON.parse(readCookie('user'));
    const myNick = cookie.nick;
    if (friend === myNick){
        pass    //MENSAGEM DE ERRO
        console.log('ERROR')
    }
    
    const friends = {
        myNick: myNick,
        friend: friend
    }

    const reply = await makeRequest("https://localhost:8000/api/user/addFriend", {
        method: "POST",
        body: JSON.stringify(friends),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    friendss = await reply.json();

    if (reply.status === 201){
        console.log('DEU CERTO')
        listFriends()
    }
    else{
        console.log(friendss.msg); //MENSAGEM DE ERRO
    }
    document.getElementById("newFriendInput").value = '';
}

async function listFriends(){
    const cookie = JSON.parse(readCookie('user'));
    myNick = cookie.nick;
    const nick = {
        nick: myNick
    }
    const reply = await makeRequest("https://localhost:8000/api/user/listFriends", {
        method: "POST",
        body: JSON.stringify(nick),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    //get use by nick

    friends = await reply.json();
    document.getElementById("friendsList").innerHTML = ""
    document.getElementById("friendsRequests").innerHTML = ""
    
    for (let i = 0; i < friends.length; i++) {

        if(friends[i].accepted === 1){
            if(friends[i].friend1_nick === myNick){
                
                var tempNick = {
                    nick: friends[i].friend2_nick
                }
                var user = await makeRequest("https://localhost:8000/api/user/getUserbyNick", {
                    method: "POST", 
                    body: JSON.stringify(tempNick),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                });

                friend = await user.json();
                idFriend = friend[0].id
                
                document.getElementById("friendsList").innerHTML += `
        
                <li>${friends[i].friend2_nick}<button class="viewProfileButton" onclick="window.location.href = '/portfolio.html?user=${idFriend}'"><ion-icon name="person-circle" size="small"></ion-icon></button></li>
            
                `;
            }else{

                var tempNick = {
                    nick: friends[i].friend1_nick
                }
                var user = await makeRequest("https://localhost:8000/api/user/getUserbyNick", {
                    method: "POST", 
                    body: JSON.stringify(tempNick),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                });
                
                friend = await user.json();
                idFriend = friend[0].id

                document.getElementById("friendsList").innerHTML += `
        
                <li>${friends[i].friend1_nick}<button class="viewProfileButton" onclick="window.location.href = '/portfolio.html?user=${idFriend}'"><ion-icon name="person-circle" size="small"></ion-icon></button></li>

                `;
            }
        }else{
            
            if(friends[i].friend1_nick === myNick){
                document.getElementById("friendsRequests").innerHTML += `
        
                <li>${friends[i].friend2_nick}<button class="accept" onclick="acceptFriendRequest('${friends[i].friend2_nick}')">+</button><button class="reject" onclick="rejectFriendRequest('${friends[i].friend2_nick}')" >-</button></li>
                `;
            }else{

                document.getElementById("friendsRequests").innerHTML += `
        
                <li>${friends[i].friend1_nick}<button class="accept" onclick="acceptFriendRequest('${friends[i].friend1_nick}')">+</button><button class="reject" onclick="rejectFriendRequest('${friends[i].friend2_nick}')" >-</button></li>
            
                `;
            }
        }


    }
    
    
}

async function acceptFriendRequest(friend){
    const cookie = JSON.parse(readCookie('user'));
    myNick = cookie.nick;
    const request = {
        nick: myNick,
        friend: friend
    }

    const reply = await makeRequest("https://localhost:8000/api/user/acceptFriend", {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    
    listFriends()

}

async function rejectFriendRequest(friend){
    const cookie = JSON.parse(readCookie('user'));
    myNick = cookie.nick;
    const request = {
        nick: myNick,
        friend: friend
    }

    const reply = await makeRequest("https://localhost:8000/api/user/rejectFriend", {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    
    listFriends()

}


//