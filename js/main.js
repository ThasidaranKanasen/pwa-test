document.addEventListener("DOMContentLoaded", function() {
    

    //DOM Loaded Event

    app.init();


});

const app = {

    init : function(){

        console.log('%c GTECH DEV ', 'color: white; background-color: #36007a', '🔥 Site Init');


        var firebaseConfig = {
            apiKey: "AIzaSyDrZZ3G5DTmlFVT8i5FJwbJm7YOWz70YYA",
            authDomain: "pegasus-1b9eb.firebaseapp.com",
            databaseURL: "https://pegasus-1b9eb.firebaseio.com",
            projectId: "pegasus-1b9eb",
            storageBucket: "pegasus-1b9eb.appspot.com",
            messagingSenderId: "339448737385",
            appId: "1:339448737385:web:5f17859770f08726"
          };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Retrieve Firebase Messaging object.
        const messaging = firebase.messaging();

        // Init Service Worker
        if ('serviceWorker' in navigator) {

            navigator.serviceWorker.register('./service-worker-alt.js')
                .then(registration => {
    
                    messaging.useServiceWorker(registration);
                })
                .catch(err => console.log('Service Worker Error', err))
    
        } else {
            console.log('Push Notification Not Supported !')
        }

        let deferredPrompt;
        const btnAdd = document.getElementById('install');
    
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
    
            // Update UI notify the user they can add to home screen
            btnAdd.style.display = 'block';
        });
    
        btnAdd.addEventListener('click', (e) => {
            // hide our user interface that shows our A2HS button
            btnAdd.style.display = 'none';
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice
              .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                  console.log('User accepted the A2HS prompt');
                } else {
                  console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
              });
          });

        // Get Permission to get token
        messaging.requestPermission()
        .then(function(){

           return messaging.getToken()

        })
        .then(function(token){

            console.log('Got the token !');
            let status = document.getElementById('status');
            status.innerHTML = "<code>"+ token + "<code/>";

        })
        .catch(function(err){

            console.log("Error") 

        });

        messaging.onMessage(function(payload){
            console.log('onMessage', payload);
   
            let notifyToast = document.getElementById('notification');
            let title = notifyToast.querySelector('.title');
            let body = notifyToast.querySelector('.body');
            let link = document.createElement('a');
            let message = document.createElement('span');
            
   
            let payloadObj = payload.notification;
           
            link.setAttribute("href", payload.click_action);
            link.setAttribute("id", "slideInner");
   
            message.innerHTML = payloadObj.body;
            link.appendChild(message);
           
            title.innerHTML = payloadObj.title;
            body.innerHTML = '';
            body.appendChild(link)
   
            
           
            console.log(payloadObj);
   
            notifyToast.classList.add('flash');
   
            notifyToast.addEventListener('click', (e)=>{
               if ( event.target.classList.contains('dismiss') ) {
   
                   notifyToast.classList.remove('flash');
               }
   
            }, false );
   
           });

    }
}