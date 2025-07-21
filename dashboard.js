auth.onAuthStateChanged(function(user) {
  if (!user) {
    // Not logged in, redirect to login page
    window.location = 'index.html';
  } else {
    // Load user's jobs from Firestore
    db.collection('jobs').where("userId", "==", user.uid).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var li = document.createElement('li');
          li.textContent = doc.data().title + ": " + doc.data().desc;
          li.className = "list-group-item";
          document.getElementById('jobsList').appendChild(li);
        });
      });
  }
});
// Handle adding new job
document.getElementById('jobForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var title = document.getElementById('jobTitle').value;
  var desc = document.getElementById('jobDesc').value;
  var user = auth.currentUser;
  if (user) {
    db.collection('jobs').add({
      userId: user.uid,
      title: title,
      desc: desc,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
      var li = document.createElement('li');
      li.textContent = title + ": " + desc;
      li.className = "list-group-item";
      document.getElementById('jobsList').appendChild(li);
      document.getElementById('jobForm').reset();
    })
    .catch(function(error) {
      alert(error.message);
    });
  }
});
// Handle Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
  auth.signOut();
});
