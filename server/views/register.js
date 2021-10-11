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

$("#loginBtn").click(function (e) {
    e.preventDefault();
    let password = $("input#password").val();
    let email = $("input#email").val();
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
});

$("#signupBtn").click(function (e) {
    let password = $("input.password").val();
    let email = $("input.email").val();
     userName=$("input.username").val();
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



$("#google").click(function (e) {
    provider = new firebase.auth.GoogleAuthProvider();
    signInWithProvider(provider);
});

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
    {
        if (user) {
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((firebaseToken) => {
                $.ajax({
                    url: "localhost:3000/register/getAccessToken", 
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


function checkPremission(data) {
    let TokenToString = data.accessToken.toString();
    let dataToProfilePage = {
        action: "loginCheckPermission",
        token: TokenToString,
        username:userName
    };
    $.ajax({
        url: "https://localhost:3000/register/checkPremission",
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
                 //save the jwt in cookie-
                //exchange ".{yourDomain}" with your app domain. 
               //don't forget to add "." before your domain name, in order to include all sub domains.
            let now = new Date();
            now.setMonth( now.getMonth() + 1 );
            document.cookie = "jwt=" + noQuotesJwtData + ";domain=.{yourDomaim}" + "; path=/; Expires="+now.toUTCString()+";"
                //lines 150-163 are in order to handle redirect scenarios-> you will have to add a middleware to your sever side
            const queryString = window.location.search;   
            const urlParams = new URLSearchParams(queryString);
            const des = urlParams.get('des')
            const routes = urlParams.get('routes')
            let redirectUrl = ''
            if (des) {
                redirectUrl = "https://" + des + '/' + userName;
                if (routes) {
                    redirectUrl += '/' + routes
                }
                window.location.href = redirectUrl
            } else {
               window.location.href =  "https://lobby.leader.codes/" + userName
            }
        }
    });
}

function userNameAvailability(uName)
{
    let userName=uName
    return new Promise ((resolve, reject)=>{
    $.ajax({
        url: "localhost:3000/register/usernameCheck",
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
            reject(errorThrown)
        }
    });
})
}
