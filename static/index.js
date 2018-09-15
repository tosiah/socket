document.addEventListener('DOMContentLoaded', () => {

    //Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);



    //When connected, configure buttons
    socket.on('connect', () => {


        //Each button should emit a 'submit vote' event
        document.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                console.log('cokolwiek');
                const clickedButton = button.dataset.vote;
                socket.emit('submit vote', {'clicked': clickedButton});
            }
        })
    })
    //When a new vote is annouced, as to the unordered list

    socket.on('announce vote', votes => {
            document.querySelector("#yeses").innerHTML=`${votes.yesV}`;
            document.querySelector('#noes').innerHTML=`${votes.noV}`;
            document.querySelector('#maybies').innerHTML=`${votes.maybeV}`;
    })
});

