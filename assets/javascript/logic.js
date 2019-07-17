// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAVcVypjnMBvFCRZO06A_yQ4DYY45RlX_4",
    authDomain: "hello-d0fed.firebaseapp.com",
    databaseURL: "https://hello-d0fed.firebaseio.com",
    projectId: "hello-d0fed",
    storageBucket: "hello-d0fed.appspot.com",
    messagingSenderId: "873317010849",
    appId: "1:873317010849:web:83744c5d12971b04"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. click to add train
$('#submit').on('click', function () {
    event.preventDefault();

    // Grabs user input
    var trainName = $('#trainNameInput').val().trim();
    var trainDestination = $('#destinationInput').val().trim();
    var trainFirstTime = $('#firstTrainTime').val().trim();
    var trainFrequency = $('#frequencyInput').val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: trainFirstTime,
        frequency: trainFrequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $('#trainNameInput').val("");
    $('#destinationInput').val("");
    $('#firstTrainTime').val("")
    $('#frequencyInput').val("")
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on('child_added', function(snapshot){
    console.log(snapshot.val());

    // Store everything in variables
    var tName = snapshot.val().name;
    var tDestination = snapshot.val().destination;
    var tFirstTrain = snapshot.val().firstTime;
    var tFrequency = snapshot.val().frequency;

    console.log(tName);
    console.log(tDestination);
    console.log(tFirstTrain);
    console.log(tFrequency);

    var firstTimeConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var difference = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + difference);

    var remainder = difference % tFrequency;
    // console.log("Remainder: " + remainder);

    var minutesUntilTrain = tFrequency - remainder;
    // console.log("MINUTES TILL TRAIN: " + minutesUntilTrain);

    var nextTrainToArrive = moment().add(minutesUntilTrain, "minutes").format("hh:mm");
    // console.log("ARRIVAL TIME: " + moment(nextTrainToArrive).format("hh:mm"))

    var newRow = $('<tr>').append(
        $('<td>').text(tName),
        $('<td>').text(tDestination),
        $('<td>').text(tFrequency),
        // $('<td>').text(currentTime),
        $('<td>').text(nextTrainToArrive),
        $('<td>').text(minutesUntilTrain),
    );
    
    $("#trainTable > tbody").append(newRow);

});