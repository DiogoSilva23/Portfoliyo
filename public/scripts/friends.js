const { json } = require("body-parser");


async function addFriend(){
    console.log('AMIGO' )
    var friend = document.getElementById("newFriendInput").value;
    if (friend.trim() === '') {
        pass //MENSAGEM DE ERRO
        console.log('ERROR')
    }
    const cookie = JSON.parse(readCookie('user'));
    console.log(cookie);
    const myNick = cookie.nick;
    console.log(myNick);
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
    json = await reply.json();

    if (reply.status === 201){

    }
    else{
        console.log(json.msg); //MENSAGEM DE ERRO
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
    
    friends = await reply.json();
    for (let i = 0; i < friends.length; i++) {
        if(friends[i].valid === 1){
            if(friends[i].friend1_nick === myNick){
                console.log('YOOOOO');
                document.getElementById("friendsList").innerHTML += `
        
                <li>${friends[i].friend2_nick}<button class="viewProfileButton"><ion-icon name="person-circle" size="small"></ion-icon></button></li>
            
                `;
            }else{
                console.log('YO');
                document.getElementById("friendsList").innerHTML += `
        
                <li>${friends[i].friend1_nick}<button class="viewProfileButton"><ion-icon name="person-circle" size="small"></ion-icon></button></li>
            
                `;
            }
        }else{
            if(friends[i].friend1_nick === myNick){
                console.log('YOOOOO');
                document.getElementById("friendsRequests").innerHTML += `
        
                <li>${friends[i].friend2_nick}<button class="accept" >+</button><button class="reject">-</button></li>
                `;
            }else{
                console.log('YO');
                document.getElementById("friendsRequests").innerHTML += `
        
                <li>${friends[i].friend2_nick}<button class="accept" >+</button><button class="reject">-</button></li>
            
                `;
            }
        }


    }
    
    
}