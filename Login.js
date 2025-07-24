import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch tier level from Firestore (optional)
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    let tier = 'starter'; // default

    if (userSnap.exists()) {
      tier = userSnap.data().tier || 'starter';
    }

    // Store user info in localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('tier', tier);

    // ✅ Redirect to dashboard
    window.location.href = 'dashboard.html';

  } catch (error) {
    alert('Login failed: ' + error.message);
  }
});
