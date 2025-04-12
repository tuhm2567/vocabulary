// script.js
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTgkhkGs8UkVuy9a6k_RHVJeJS0qJ7eG0",
    authDomain: "tuhm-vocab.firebaseapp.com",
    projectId: "tuhm-vocab",
    storageBucket: "tuhm-vocab.firebasestorage.app",
    messagingSenderId: "320406639011",
    appId: "1:320406639011:web:73f075515985e17a844a16",
    measurementId: "G-S77N8WH3M4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function searchVocabulary() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const searchResultsDiv = document.getElementById("searchResults");

    if (query === "") {
        searchResultsDiv.innerHTML = "";
        return;
    }

    db.collection("vocabularies")
        .where("word", ">=", query)
        .where("word", "<=", query + '\uf8ff')
        .get()
        .then((querySnapshot) => {
            searchResultsDiv.innerHTML = ""; // Clear previous results
            querySnapshot.forEach((doc) => {
                const word = doc.data().word;
                const listItem = document.createElement("div");
                listItem.classList.add("search-item");
                listItem.textContent = word;
                searchResultsDiv.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        });
}
