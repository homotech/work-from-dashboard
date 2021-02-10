// ############# DOM ELEMENTS ###########

let timeElement = document.querySelector("#time-element");
let dateElement = document.querySelector("#date-element");
let taskField = document.querySelector("#task-field");
let startTime = document.querySelector("#start-time");
let startButton = document.querySelector("#send-button");
let todoLists = document.querySelector("#todolists");
let errorField = document.querySelector("#error-field");
let addTaskBtn = document.querySelector("#add-task");
let removeTaskBtn = document.querySelector("#remove-task");
let inputFields = document.querySelector(".inputfields");
let taskLength = document.querySelector("#taskslength");
let messageField = document.querySelector("#message-field");
let sendMessage = document.querySelector("#sendmessage");
let chatSection = document.querySelector(".chat-section");
let notificationsList = document.querySelector(".notifications-list");
let toggleNB = document.querySelector("#toggleNB");
// ########### END OF DOM ELEMENTS #########

// ######### ARRAYS AND VARIABLES #############
let t;
let notificationCount = 0;
let notificationsArray = ["You dont have any notifications"];
let messagesArray = ["There isnt any message here "];
let NBToggle = true;
var tasks = new Array();
tasks[0] = "There isnt any reminders on here add one";
let weekdays = new Array(7);
let months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";

// ########### END OF ARRAYS AND VARIABLES ###############

// ######### FUNCTIONS #################
const messageAndNotificationTime = () => {
  let current = new Date();
  let presentMinute = current.getMinutes();
  let presentHour = current.getHours();
  let settledTime =
    redefineTime(presentHour) +
    ":" +
    redefineTime(presentMinute) +
    " " +
    (presentHour >= 12 ? "pm" : "am");
  return settledTime;
};
const showTaskField = (choice) => {
  // THIS FUNCTION TOGGLES THE INPUT FIELD
  if (choice === 1) {
    addTaskBtn.style.display = "none";
    removeTaskBtn.style.display = "flex";
    inputFields.style.display = "flex";
  } else {
    removeTaskBtn.style.display = "none";
    addTaskBtn.style.display = "flex";
    inputFields.style.display = "none";
  }
};
// END OF THE FUNCTION

//FUNCTION TAKES NOTE OF THE AMOUNT OF REMINDERS HAS BEEN SET
const showTaskLength = () => {
  taskLength.innerHTML = tasks.length;
};

const redefineTime = (time) => {
  // adding a zero or returning the present hour or minute to the time
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
};

//This code gets the time functions running
//And it is being called immediately
const alwaysShowTime = () => {
  let current = new Date();
  let presentDay = weekdays[current.getDay()];
  let presentDate = current.getDate();
  let presentMonth = months[current.getMonth()];
  let presentYear = current.getFullYear();
  let presentMinute = current.getMinutes();
  let presentHour = current.getHours();
  let settledTime =
    redefineTime(presentHour) +
    ":" +
    redefineTime(presentMinute) +
    " " +
    (presentHour >= 12 ? "pm" : "am");

  let prefix;
  switch (presentDate) {
    case 1:
    case 21:
    case 31:
      prefix = "st";
      break;
    case 2:
    case 22:
      prefix = "nd";
      break;
    case 3:
    case 23:
      prefix = "rd";
      break;
    default:
      prefix = "th";
      break;
  }
  let settledDate = `${presentDay} ${presentDate}${prefix} ${presentMonth}, ${presentYear}`;
  timeElement.innerHTML = settledTime;
  dateElement.innerHTML = settledDate;
  setTimeout(alwaysShowTime, 1000);
};
alwaysShowTime();
//End of function

// This function gets the input partaining to the input field parameter passed
const getTask = (option) => {
  return option.value;
};

//Maps the list of todo tasks
const mapLists = () => {
  //Set the todolist div to render nothing before the iteration
  todoLists.innerHTML = "";
  if (tasks[0] !== "There isnt any reminders on here add one") {
    tasks.map((item) => {
      //Create elements
      var div = document.createElement("div");
      var divinput = document.createElement("div");
      var divTask = document.createElement("div");
      var divStartTime = document.createElement("div");
      var divButton = document.createElement("div");
      var check = document.createElement("input");
      var paraTask = document.createElement("p");
      var paraStartTime = document.createElement("p");
      var deleteTask = document.createElement("button");

      //Sets attributes
      div.setAttribute("class", "id-task");
      check.setAttribute("type", "checkbox");
      divinput.setAttribute("class", "checkbox");
      divTask.setAttribute("class", "main-task");
      divStartTime.setAttribute("class", "task-time");
      divButton.setAttribute("class", "remove-task");

      //Defining values
      paraTask.innerHTML = item.task;
      paraStartTime.innerHTML = item.start;
      deleteTask.innerHTML = "&times;";
      check.checked = item.completed;

      //Adding Event listeners
      deleteTask.addEventListener("click", item.deleteObj);
      check.addEventListener("change", () => {
        item.completed = !item.completed;
        if (item.completed) {
          document.querySelector(".id-task").style.color = "green";
        } else {
          document.querySelector(".id-task").style.color = "black";
        }
      });

      // Appending
      div.appendChild(divinput);
      div.appendChild(divTask);
      div.appendChild(divStartTime);
      div.appendChild(divButton);
      divinput.appendChild(check);
      divTask.appendChild(paraTask);
      divStartTime.appendChild(paraStartTime);
      divButton.appendChild(deleteTask);
      todoLists.appendChild(div);
    });
  } else {
    var div = document.createElement("div");
    div.setAttribute("class", "empty-task");
    var paranone = document.createElement("p");
    paranone.innerHTML = tasks[0];
    div.appendChild(paranone);
    todoLists.appendChild(div);
  }
};
// It is being called
mapLists();

const emptyTaskCheck = () => {
  if (getTask(taskField) !== "") {
    let taskObject = new Object();
    taskObject.task = getTask(taskField);
    let check = tasks.find((item) => item.task === taskObject.task);

    //ASSIGNING PROPERTIES TO THE ALREADY CREATED OBJECT

    taskObject.start = getTask(startTime);
    taskObject.completed = false;
    taskObject.deleteObj = function () {
      //FUNCTION TO DELETE REMINDER
      let filtered = tasks.filter((item) => item.task !== taskObject.task);
      tasks = filtered;
      mapLists();
      showTaskLength();
      console.log(tasks);
    };

    //A CHECK FOR DUPLICATE REMINDER
    if (check === undefined) {
      tasks.push(taskObject);
      taskField.value = "";
      mapLists();
      showTaskLength();
    } else {
      errorField.innerHTML = "Task has already been set";
    }
  } else {
    // SOMETHING TO FO IF IT IS EMPTY
    errorField.innerHTML =
      "You can't set an empty task, fill in some details please";
  }
};
const sendTask = () => {
  // AN IF STATEMENT TO CHECK IF THE TO-BE ADDED TASK IS THE FIRST TASK
  if (tasks[0] === "There isnt any reminders on here add one") {
    tasks.shift();
    emptyTaskCheck();

    //IF STATEMENT TO CHECK IF THE INPUTFIELD HAS SOMETHING IN IT
  } else {
    emptyTaskCheck();
  }
};

const renderEmptyState = () => {
  chatSection.innerHTML = "";
  if (messagesArray[0] === "There isnt any message here ") {
    let emptycs = document.createElement("div");
    let para = document.createElement("p");
    emptycs.appendChild(para);
    emptycs.setAttribute("class", "emptycs");
    para.innerHTML = messagesArray[0];
    chatSection.appendChild(emptycs);
  } else {
    messagesArray.map((item) => {
      let messages = document.createElement("div");
      let para = document.createElement("p");
      let time = document.createElement("p");
      para.innerHTML = item.messageText;
      time.innerHTML = item.messagePushTime;
      para.setAttribute("class", "messageText");
      time.setAttribute("class", "messageTime");
      messages.appendChild(para);
      messages.appendChild(time);
      chatSection.appendChild(messages);
    });
  }
};
renderEmptyState();
const renderMessage = () => {
  if (messageField.value !== "") {
    if (messagesArray[0] === "There isnt any message here ") {
      messagesArray.shift();
      let messageObject = new Object();
      messageObject.messageText = getTask(messageField);
      messageObject.messagePushTime = messageAndNotificationTime();
      messagesArray.push(messageObject);
    } else {
      let messageObject = new Object();
      messageObject.messageText = getTask(messageField);
      messageObject.messagePushTime = messageAndNotificationTime();
      messagesArray.push(messageObject);
    }
    messageField.value = "";
    renderEmptyState();
  }
};
const renderNotifications = () => {
  notificationsList.innerHTML = "";
  if (notificationCount !== 15) {
    //CREATION
    let div = document.createElement("div");
    let paragraph = document.createElement("p");

    //ASSIGNING
    div.setAttribute("class", "nullmode");
    paragraph.innerHTML = notificationsArray[0];

    //APPENDING
    notificationsList.appendChild(div);
    div.appendChild(paragraph);
    t = setTimeout(renderNotifications, 2000);
  } else {
    //CREATIONS
    let notificationsObject = new Object();
    let div = document.createElement("div");
    let paragraph = document.createElement("p");
    let time = document.createElement("p");

    //ASSIGNINGS
    notificationsObject.notification = "An appointment with Mr Akins at 3pm";
    notificationsObject.notificationsTime = messageAndNotificationTime();
    notificationsArray.shift();
    notificationsArray.push(notificationsObject);

    // MAPPING
    notificationsArray.map((item) => {
      paragraph.setAttribute("class", "notified");
      time.setAttribute("class", "notified-time");
      div.appendChild(paragraph);
      div.appendChild(time);
      paragraph.innerHTML = item.notification;
      time.innerHTML = item.notificationsTime;
      notificationsList.appendChild(div);
    });
    clearTimeout(t);
  }
  notificationCount += 1;
};
renderNotifications();

const toggleNBFunc = () => {
  NBToggle = !NBToggle;
  if (NBToggle) {
    toggleNB.setAttribute("class", "fas fa-times");
    document.querySelector(".navbar-advert").classList.add("open");
    document.querySelector(".brand").classList.add("open");
    document.querySelector(".togglenavbar").classList.add("open");
  } else {
    toggleNB.setAttribute("class", "fas fa-bars");
    document.querySelector(".navbar-advert").classList.remove("open");
    document.querySelector(".brand").classList.remove("open");
    document.querySelector(".togglenavbar").classList.remove("open");
  }
};
toggleNBFunc();
//End of the functions section

// Adding Event Listeners

taskField.addEventListener("input", () => {
  if (getTask(taskField) !== "") {
    errorField.innerHTML = "";
  } else {
    errorField.innerHTML = "Set a task maybe Go to the gym?";
  }
});
startButton.addEventListener("click", sendTask);
sendMessage.addEventListener("click", renderMessage);
addTaskBtn.addEventListener("click", () => showTaskField(1));
removeTaskBtn.addEventListener("click", () => showTaskField(2));
toggleNB.addEventListener("click", toggleNBFunc);
