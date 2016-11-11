        var messagesRef = new Firebase('https://webrtcdemo-9822d.firebaseio.com/Message');

        // REGISTER DOM ELEMENTS
        var messageField = $('#messageInput');
        var nameField = $('#nameInput');
        var messageList = $('#chatContent');

        // LISTEN FOR KEYPRESS EVENT
        messageField.keypress(function (e) {
            // if (e.keyCode == 13) {
                //FIELD VALUES
                var username = nameField.val();
                var message = messageField.val();

                //SAVE DATA TO FIREBASE AND EMPTY FIELD
                messagesRef.push({username:username, message:message});
                messageField.val('');
            // }
        });

        // Add a callback that is triggered for each chat message.
        messagesRef.limitToLast(10).on('child_added', function (snapshot) {
            //GET DATA
            var data = snapshot.val();
            var username = data.username || "anonymous";
            var message = data.message;

            //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
            var messageElement = $("<li>");
            var nameElement = $("<strong class='example-chat-username'></strong>")
            nameElement.text(username + ": ");
            messageElement.text(message).prepend(nameElement);

            //ADD MESSAGE
            messageList.append(messageElement)

            //SCROLL TO BOTTOM OF MESSAGE LIST
            messageList[0].scrollTop = messageList[0].scrollHeight;
        });