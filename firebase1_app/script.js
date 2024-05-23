firebase.initializeApp({
    apiKey: "AIzaSyAIsgAyzGdFwWGlqB2UDlSm4Je_2ViM_Ss",
  authDomain: "plp-apps-44364.firebaseapp.com",
  projectId: "plp-apps-44364",
  storageBucket: "plp-apps-44364.appspot.com",
  messagingSenderId: "781328586259",
  appId: "1:781328586259:web:dec004340caec18b5011e6"
});

const db = firebase.firestore();

function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();

    if(task !==""){
         //add it to our database
         db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
         });

         taskInput.value = "";
         console.log("Task added.");
    }
}

function renderTasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick=deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

db.collection("tasks")
   .orderBy("timestamp", "desc")
   .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type === "added"){
            renderTasks(change.doc);
        }
    });
   });

   function deleteTask(id){
    db.collection("tasks").doc(id).delete();
    location.reload();
   }