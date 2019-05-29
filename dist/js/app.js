document.addEventListener("DOMContentLoaded", function() {
    

    //DOM Loaded Event

    app.init();
    //app.firebase();


});

const app = {

    init: function(){
        console.log('%c GTECH DEV ', 'color: white; background-color: #36007a', '🔥 Site Init');

    async function installServiceWorkerAsync() {
        if ('serviceWorker' in navigator) {
            try {
                let serviceWorker = await navigator.serviceWorker.register('./service-worker.js')
                console.log(`Service worker registered ${serviceWorker}`)
            } catch (err) {
                console.error(`Failed to register service worker: ${err}`)
            }
        }
    }

    installServiceWorkerAsync();

    function updateOnlineStatus() {
        document.getElementById('status').innerText = 'Online';
      }
      
      function updateOfflineStatus() {
        document.getElementById('status').innerText = 'Offline';
      }
      
      window.addEventListener('online',  updateOnlineStatus);
      window.addEventListener('offline', updateOfflineStatus);

    },

    firebase : function(){

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


        messaging.requestPermission()
        .then(function(){
           console.log("Have Permission");
           return messaging.getToken();
        })
        .then(function(token){
            console.log(token);
        })
        .catch(function(err){
            console.log("Error") 
        });


    }
}