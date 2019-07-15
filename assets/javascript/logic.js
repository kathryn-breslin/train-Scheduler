var firebaseConfig = {
    apiKey: "AIzaSyAVcVypjnMBvFCRZO06A_yQ4DYY45RlX_4",
    authDomain: "hello-d0fed.firebaseapp.com",
    databaseURL: "https://hello-d0fed.firebaseio.com",
    projectId: "hello-d0fed",
    storageBucket: "hello-d0fed.appspot.com",
    messagingSenderId: "873317010849",
    appId: "1:873317010849:web:83744c5d12971b04"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//click to add train
$('#submit').on('click', function() {
    event.preventDefault();

    var trainName = $('#trainNameInput').val().trim();
    var trainDestination = $('#destinationInput').val().trim();
    var trainFirstTime = $('#firstTrainTime').val().trim();
    var trainFrequency = $('#frequencyInput').val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: trainFirstTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
});

