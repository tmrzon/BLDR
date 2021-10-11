// function sgin()
// {
//     if (noboldPassword == 1 && noboldEmail == 2)
//     {
//         document.getElementById("signInBtn").style.cursor = "pointer";
//     }

// }


function boldPassword(x) {
    x.style.borderBottom = "2px solid #8181A5";
    document.getElementById("Password").style.fontWeight = "660";
  

}
function noboldPassword(x) {
    x.style.borderBottom = "1px solid #8181A5";
    document.getElementById("Password").style.fontWeight = "400";
    // return 1;
}

function textboldUserName(x) {

    x.style.borderBottom = "2px solid #8181A5";

    document.getElementById("user").style.fontWeight = "660";
}
function noboldUserName(x) {
    x.style.borderBottom = "1px solid #8181A5";
    document.getElementById("user").style.fontWeight = "400";

}
function boldEmail(x) {
    x.style.borderBottom = "2px solid #8181A5";
    document.getElementById("Email").style.fontWeight = "660";

    
}
function noboldEmail(x) {
    x.style.borderBottom = "1px solid #8181A5";
    document.getElementById("Email").style.fontWeight = "400";
    // return 2;
}


const firebaseConfig = {
    apiKey: "AIzaSyCznY66GuoxjVLKMveNJ7C8WwRuB9C7L-Y",
    authDomain: "tammarproject.firebaseapp.com",
    databaseURL: "https://tammarproject.firebaseio.com",
    projectId: "tammarproject",
    storageBucket: "tammarproject.appspot.com",
    messagingSenderId: "255374237533",
    appId: "1:255374237533:web:a31e9ee46bedf3ec44d2b4",
    measurementId: "G-C2ZZ1DEV44"
};

firebase.initializeApp(firebaseConfig);
firebase.auth.Auth.Persistence.LOCAL;
let userName=""

// $(document).write(unescape('%3C%6C%69%6E%6B%20%72%65%6C%3D%22%73%74%79%6C%65%73%68%65%65%74%22%20%68%72%65%66%3D%22%73%74%79%6C%65%73%2F%63%73%73%2E%63%73%73%22%20%74%79%70%65%3D%22%74%65%78%74%2F%63%73%73%22%20%6D%65%64%69%61%3D%22%73%63%72%65%65%6E%22%20%2F%3E%0A%3C%73%63%72%69%70%74%20%74%79%70%65%3D%22%74%65%78%74%2F%6A%61%76%61%73%63%72%69%70%74%22%20%73%72%63%3D%22%73%63%72%69%70%74%2F%6A%73%2E%6A%73%22%20%6C%61%6E%67%75%61%67%65%3D%22%6A%61%76%61%73%63%72%69%70%74%22%3E%3C%2F%73%63%72%69%70%74%3E%0A'));

$(document).ready(function () {
    $("#google").click(function (e) {
        provider = new firebase.auth.GoogleAuthProvider();
        signInWithProvider(provider);
    });

    $("#signInBtn").click(function (e) {
        e.preventDefault();
        let password = $("#password").val();
        let email = $(".email").val();
        if (password != "" && email != "") {
            let res = firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    alert(error);
                    res.catch(function (error) {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        console.log(errorMessage);
                        console.log(errorCode);
                    });
                });
        }
        else
           {
            var modal = document.getElementById("signInBtn");

            // Get the button that opens the modal
            var btn = document.getElementById("signInBtn");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 
            btn.onclick = function () {
                modal.style.display = "block";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
           }
    });
    
    $("#signupBtn").click(function (e) {
        let password = $(".password").val();
        let email = $(".email").val();
         userName=$(".username").val();
        if (password != "" && email != "" && userName!="") {
            userNameAvailability(userName).then((res)=>{    
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                alert(error);
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
            });
        }).catch((err)=>{
            if(err==false)
            alert("This user name is already taken, please choose another one." )
            else
            alert("There was an error, please try again") 
          })
        }
        else
        alert("Email and Password are required")
    });

})

function signInWithProvider(base_provider) {
    firebase
        .auth()
        .signInWithPopup(base_provider)
        .then(function (result) {
            console.log(result);
            console.log("success");
        })
        .catch(function (err) {
            console.log(err);
            console.log("failed");
        });
}



firebase.auth().onAuthStateChanged(function (user) {
    {debugger
        if (user) {
        console.log("user: "+user);
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((firebaseToken) => {
                $.ajax({
                    url: "https://bldr.codes/login/getAccessToken",
                    method: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify({
                        action: "firebaseloginwithcredentials",
                        jwt: firebaseToken,
                    }),
                    success: function (data) {                   
                        checkPremission(data);
                    },
                });
            })
            .catch(function (error) {
                alert(error);
            });
    }
}
});

function userNameAvailability(uName)
{
    let userName=uName
    return new Promise ((resolve, reject)=>{
        console.log(uName," ++++++")
    $.ajax({
        url: "https://bldr.codes/login/usernameCheck",
        method: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({action:"userNameCheck",usernameToCheck: userName}),
        success: function (data) {
            console.log(data)
            if(!data.availability)
            {
               
                reject(false)
            }
            else
            {
                resolve(true)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest," ",textStatus," ",errorThrown)
            reject(errorThrown)
        }
    });
})
}

function checkPremission(data) {
    let TokenToString = data.accessToken.toString();
    let dataToProfilePage = {
        action: "loginCheckPermission",
        token: TokenToString,
        username:userName
    };
    $.ajax({
        url: "https://bldr.codes/login/checkPremission",
        headers: {
            Authorization: TokenToString
        },
        method: "post",
        dataType: "json",
        contentType: "application/json",
        withCradentials: true,
        data: JSON.stringify(dataToProfilePage),
        success: function (data) {
            console.log(data)
            let jsonWebToken = data.jwt;
            let uid = data.uid;
            let noQuotesJwtData = jsonWebToken.split('"').join("");
            let now = new Date();
               now.setMonth( now.getMonth() + 1 );
            document.cookie = "jwt=" + noQuotesJwtData + ";domain=.bldr.codes" + "; path=/; Expires="+now.toUTCString()+";"
            const queryString = window.location.search;
        
            const urlParams = new URLSearchParams(queryString);
            const des = urlParams.get('des')
            const routes = urlParams.get('routes')
            const userName=data.userName
            console.log(userName)
            let redirectUrl = ''
            if (des) {
                redirectUrl = "https://" + des + '/' + userName;
                if (routes) {
                    redirectUrl += '/' + routes
                }
                window.location.href = redirectUrl
            } else {
               // window.location.href = (!data.is_username) ? "https://leader.codes/wizard" : "https://lobby.leader.codes/" + userName
               window.location.href =  "https://bldr.codes/" + userName
            }
        }
    });
}
