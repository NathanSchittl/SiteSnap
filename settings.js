auth.onAuthStateChanged(function(user) {
  if (!user) {
    window.location = 'index.html';
  } else {
    document.getElementById('userEmail').textContent = user.email;
    db.collection('users').doc(user.uid).get().then(function(doc) {
      if (doc.exists) {
        document.getElementById('userTier').textContent = doc.data().tier;
      }
    });
  }
});
// Redirect to pricing page for plan changes
document.getElementById('changePlanBtn').addEventListener('click', function() {
  window.location = 'pricing.html';
});
// Logout
document.getElementById('logoutBtn2').addEventListener('click', function() {
  auth.signOut();
});
