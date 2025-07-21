auth.onAuthStateChanged(function(user) {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function(doc) {
      var userTier = doc.data().tier;
      if (userTier === 'free') {
        document.getElementById('upgradePlanBtn').style.display = 'inline-block';
      } else {
        document.getElementById('statusMessage').textContent = 'You already have the Pro plan.';
      }
    });
  } else {
    document.getElementById('loginPrompt').style.display = 'block';
  }
});
// Handle plan upgrade (for demonstration)
document.getElementById('upgradePlanBtn').addEventListener('click', function() {
  var user = auth.currentUser;
  if (user) {
    db.collection('users').doc(user.uid).update({ tier: 'pro' })
      .then(function() {
        document.getElementById('statusMessage').textContent = 'Plan upgraded to Pro!';
        document.getElementById('upgradePlanBtn').style.display = 'none';
      })
      .catch(function(error) {
        alert(error.message);
      });
  }
});
