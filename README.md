# chatter-box

A new take on a chat room that uses a TCP server to connect clients into a 
chatroom which uses conditional melodies to create a soundscape based on 
the words we use to communicate.
@dirtdeodara
@lacrivella
@eringurley

Tech stack:
* Javascript
* Node.js
* MongoDB
* Mongoose 


 To use:
 * clone repo
 * in your terminal, navigate to the cloned repo
 * ``` npm i ``` to get all dependencies
 * ``` npm start ``` to start the server
 * ``` node client.js ``` to start chatting
 
 Commands:
 * change user name: ``` @nickname:________ ```
      * example: ``` @nickname:godzilla ```
            * important: no space after colon.
 * message everyone on the server: ``` @all: ________ ```
      * example: ``` @all: Hola Mundo ```
            * important: space after colon.
 * direct message: ``` @dm:________ ________ ```
      * example: ``` @dm:wolfman Hello, old friend ```
            * important: no space after colon, space after target name.
 * play all DMs from a certain user to you: ``` @play:________ ```
      * example: ``` @play:godzilla ```
            * important: space after colon.
 * play every message from the last 24 hours: ``` @yesterday: ```
      
