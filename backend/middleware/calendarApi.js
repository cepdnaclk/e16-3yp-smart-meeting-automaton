const {google} = require('googleapis');
// const moment = require('moment'); 

const dotenv = require('dotenv').config();
if (dotenv.error) {
    throw dotenv.error;
}

const auth = new google.auth.GoogleAuth({
    keyFile: './group-project-305806-5ebef1e31f0c.json',
    scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({
    version: 'v3',
    auth
  });

const isRequired = () => { throw new Error('param is required'); };

function addEvent({event = isRequired()}) {
    return calendar.events.insert({
        auth: auth,
        calendarId: process.env.CALENDAR_ID,
        resource: event,
        }
        // ,function(err, event) {
        //     if (err) {
        //         console.log('There was an error contacting the Calendar service: ' + err);
        //         return;
        //     }
        //     console.log('Event created: %s', event);
        // }
    );
}

function editEvent({event = isRequired(), eventId = isRequired()}) {
    calendar.events.update({
        requestBody:event,
        calendarId: process.env.CALENDAR_ID,
        eventId: eventId,

     }, function(err, event) {
            if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
            }
            console.log('Event updated: %s', event.data);
        }
    );
    
}

function deleteEvent(params) {
    
    return calendar.events.delete({
        calendarId: 'group12.team@gmail.com',
        eventId: '0017999',
    //   },(err, result)=>{
    //       if(err){
    //         console.log('There was an error contacting the Calendar service: ' + err);
    //         return;
    //       }

    //     console.log('Event deleted : %s', result);
    //     return
    //  
        }
    );
    
}

function getEvent(params) {
    
}

module.exports = {
    getEvent, addEvent, editEvent, deleteEvent
}

// var event = {
//     id: '001788',
//     summary: 'Google I/O 2015',
//     location: '800 Howard St., San Francisco, CA 94103',
//     description: 'A chance to hear more about Google\'s developer products.',
//     start: {
//         dateTime: '2021-02-25T20:30:00+05:30',
//         // timeZone: 'Sri Lanka/Sri Jayawardenepura Kotte',
//     },
//     end: {
//         dateTime: '2021-02-25T21:00:00+05:30',
//         // timeZone: 'UTC/GMT',
//     },
//     // attendees: [{
//     //   'email': 'wishvasd123@gmail.com'
//     // }],
//     reminders: {
//       useDefault: false,
//       overrides: [
//         {method: 'email', minutes: 30 * 60},
//         {method: 'popup', minutes: 15},
//       ],
//     },
// };

// console.log(calendar);


// const beginning = moment().format("YYYY-MM-DDT00:01:00Z")
// const end = moment().format("YYYY-MM-DDT23:59:00Z")

// function listl(){
//     calendar.events.list({

//         calendarId: 'group12.team@gmail.com',
//         // timeMin: (beginning),
//         timeMax: (end),
//         maxResults: 10,
//         singleEvents: true,
//         orderBy: 'startTime',
//         }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const events = res.data.items;
//         console.log(events);
//     });
// }

// listl();


// const res = calendar.calendarList.get({
//         // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the &quot;primary&quot; keyword.
//     calendarId: 'group12.team@gmail.com',
// },(err, res)=>{
//     if(err) return console.log(err);
//     console.log(res);
// });

// console.log(res);


// const h = calendar.calendarList.list({
//     auth : auth,
// },
//     (err, reslt)=>{
//         console.log(reslt);

//     }
// );
// calendarList.get();


// var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, scopes, null );



// jwtClient.authorize(function (err, tokens) {
//     if (err) {
//         console.log(err);
//         return;
//     } else {
//         console.log("Successfully connected!");
//     }
// });

// //Google Calendar API
// let calendar = google.calendar('v3');
// calendar.events.list({
//    auth: jwtClient,
//    calendarId: 'primary'
// }, function (err, response) {
//    if (err) {
//        console.log('The API returned an error: ' + err);
//        return;
//    }
//    var events = response.items;
//    if (events.length == 0) {
//        console.log('No events found.');
//    } else {
//        console.log('Event from Google Calendar:');
//        for (let event of response.items) {
//            console.log('Event name: %s, Creator name: %s, Create date: %s', event.summary, event.creator.displayName, event.start.date);
//        }
//    }
// });
