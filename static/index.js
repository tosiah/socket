document.addEventListener('DOMContentLoaded', () => {

    //Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);



    //When connected, configure buttons
    socket.on('connect', () => {

        var yeses = 0;
        //parseInt(document.querySelector('#yeses').value);
        var noes = 0;
        var maybies = 0;

        //Each button should emit a 'submit vote' event
        document.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                console.log('cokolwiek');
                const clickedButton = button.dataset.vote;
                if(button.dataset.vote=='yes'){
                    yeses=yeses+1;
                    socket.emit('submit vote', {'clicked': clickedButton, 'value': yeses});
                }
                if(button.dataset.vote=='no'){
                    noes=noes+1;
                    socket.emit('submit vote', {'clicked': clickedButton, 'value': noes});
                }
                if(button.dataset.vote=='maybe'){
                    maybies=maybies+1;
                    socket.emit('submit vote', {'clicked': clickedButton, 'value': maybies});
                }
                //socket.emit('submit vote', {'clickedOption': clickedButton});
            }
        })
    })
    //When a new vote is annouced, ass to the unordered list

    socket.on('announce vote', data => {
        if(data.returnedOption=='yes'){
            document.querySelector("#yeses").innerHTML=`${data.value}`;
        }
        if(data.returnedOption=='no'){
            document.querySelector('#noes').innerHTML=`${data.value}`;
        }
        if(data.returnedOption=='maybe'){
            document.querySelector('#maybies').innerHTML=`${data.value}`;
        }
       // const li = document.createElement('li');
       // li.innerHTML = `Vote recorded: ${data.returnedOption}`;
       // document.querySelector('#votes').append(li);
    })
});

