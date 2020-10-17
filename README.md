# e16-3yp-smart-meeting-automaton


Computer Engineering Project - Semester 5 -Third year project

Group 12

E/16/022 – Chamath Amarasinghe e16022@eng.pdn.ac.lk

E/16/025 – Diwanga Amasith    e16025@eng.pdn.ac.lk

E/16/222 – Wishwa Madushanka   e16222@eng.pdn.ac.lk

 

The problem we are addressing is something that we have experienced in day to day basis. We have seen some meeting rooms with working AC machines and projectors unnecessarily without any one in the room causing a wastage of current In some cases, it is quite different that the AC machines are not working even almost all the room is filled.

Other than that, presence of a worker to the meeting venue at the time of meeting is essential to control different devices of AC machines and projectors. This control process is sometimes complex as it has to be used various remote controllers to control different devices

Having discussions with company owners, class teachers and observing meeting rooms, we get an idea what can be implemented as a solution

 

We can come up with our solution "SMART MEETING AUTOMATON"

 

 Overview

 

SMART MEETING AUTOMATON consists of two major streams.

 

1. Client App

2. Control Unit

 

 Flow of Control

![alt text](https://github.com/cepdnaclk/e16-3yp-smart-meeting-automaton/blob/main/images/1.JPG)
 

Basically, an administrator user can make schedules of the meeting using google calendar API which is maintained by administrators of a particular company or organization and user can view all the arranged schedules. AWS is continuously monitoring the existing schedules in google calendar. According to them, AWS sends control signals to various devices via control units. Control units sends what happens with the devices in each room.

Status of the room can be monitored using our client app.

As a special feature, we have added QR codes to each room, so that meeting owner can directly control over different devices in that room.

 

 

 Overview of Client App

 

we create Web and Mobile apps for our system with giving access to log into our system to admins who the administrative part of the organization. So they can schedule meetings and classes as well as they can see the status of the rooms in real time.

And also we have to note here, we have given device pair option with some indicating led bulbs to set up Brand , model of AC projectors and their initial positions when deploying of our main control unit. Each room has Qr code and it can access through our mobile app and then meeting owner can control meeting room devices easily. 

All these communications between sever and app will be done securely by https protocol.

 

 Overview of Control Unit

 

Control unit has many responsibilities to do with clients request. control unit have to

turn on projectors and AC machines 5 minutes prior to schedule time. The lights connected to sockets must lit up when some one enters the lecture room. This done by getting signals from PIR sensors which deployed in meeting room. And also Ac machines have to turn off  5 minutes prior to schedule time. And other main responsible of main component is sending states of the devises to the sever which runs on AWS.

 

 Solution Architecture : Infrastructure


![alt text](https://github.com/cepdnaclk/e16-3yp-smart-meeting-automaton/blob/main/images/2.JPG)

There are 3 main hardware components in our control system. Most important one is main control unit. It has rotating IR transmitter to send data in to specific device which is client requested. And rotating IR transmitter have to rotate preset coordinates which was initially set for device in deployment. And we have given two sockets to clients from main control unit to connect lights  and they can control them via our apps. with the PIR sensor , main control system can detect the human presence in meeting room and it can use for light-up lights when someone come meeting room first and cancel meeting when no one come to meeting after specific amount of time it starts.

And other component of hardware is WiFi and IR module which use for sending IR signals to devises which cannot covered by main control unit.The temperature and humidity sensors are use here to detect AC machines work properly.

 # Advisers
 
Dr Isuru Nawinna

Dr Ziyan Marrikkar

# Links :
https://www.pdn.ac.lk/

https://eng.pdn.ac.lk/

http://www.ce.pdn.ac.lk/



  

