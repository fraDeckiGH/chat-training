
<script>
  // import 'sanitize.css'
  // import 'sanitize.css/forms.css'
  // import 'sanitize.css/assets.css'
  // import 'sanitize.css/typography.css'
  // import 'sanitize.css/reduce-motion.css'
  // import 'sanitize.css/system-ui.css'
  // import 'sanitize.css/ui-monospace.css'
  
  import "../app.scss"
  
  // firebase
  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app"
  // import { getAnalytics } from "firebase/analytics"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCMMtJzdU84ngZfjHZl_wPtSE9CJJmgH5g",
    authDomain: "gun-tests.firebaseapp.com",
    projectId: "gun-tests",
    storageBucket: "gun-tests.appspot.com",
    messagingSenderId: "833600843722",
    appId: "1:833600843722:web:00234015dab021282ce933",
    measurementId: "G-59QW1CEQJF"
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  
</script>

<slot></slot>
