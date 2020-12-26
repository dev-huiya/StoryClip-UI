let token = "";

self.addEventListener('fetch', event => {
    if(event.request.destination == "image" && !!token) {

        event.respondWith(
            fetch(event.request, {
                mode: 'cors',
                credentials: 'omit',
                headers: {
                    'Authorization': "Bearer " + token,
                    // you would, of course, not hard-code this here...
                }
            })
        )
    }
    
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SEND_TOKEN') {
        // do something
        token = event.data.token;
    }
});