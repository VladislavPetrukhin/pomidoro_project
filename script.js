
let start_button = document.querySelector(".start_button")
let text = document.querySelector(".text")
let info = document.querySelector(".info")
let about = document.querySelector(".fa-info-circle")
let tomato = document.querySelector(".tomato")

let interval25,interval5,interval30
let number = 0

let sound = new Audio('sound.mp3')

about.onclick = function (){
    Swal.fire({
        title: 'Метод помидора - техника управления временем, позволяющая использовать его более эффективно. Один помидор состоит из разных промежутков времени для работы и отдыха. После каждого второго помидора требуется более длинный отдых',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}


document.querySelector(".start_button").onclick = function (){
        if (start_button.classList.contains('to_start')){
            start_button.textContent="Сброс"
            start_button.classList.add('to_stop')
            start_button.classList.remove('to_start','Animated_button')
            tomato.classList.remove('tomato_move')
            tomato.classList.add('tomato_pulse')

            Check()

        }
        else{
            clearInterval(interval25)
            clearInterval(interval5)
            clearInterval(interval30)
            number = 0
            start_button.textContent="Старт"
            start_button.classList.add('to_start','Animated_button')
            start_button.classList.remove('to_stop')
            text.textContent="Нажмите на кнопку, чтобы начать"
            tomato.classList.remove('tomato_pulse')
            tomato.classList.add('tomato_move')
            info.innerHTML="Один помидор = <span class=\"text-red\">25</span> минут + <span class=\"text-red\">5</span> минут отдых + <span class=\"text-red\">25</span> минут + <span class=\"text-red\">5</span> минут отдых"
        }
}


function Check(){
    switch (number){
        case 0:
            Interval_work()
            info.innerHTML="Сейчас выполняется <span class=\"text-orange\">первая</span> половина <span class=\"text-orange\">первого</span> помидора"
            break
        case 1:
            Interval_work()
            info.innerHTML="Сейчас выполняется <span class=\"text-orange\">вторая</span> половина <span class=\"text-orange\">первого</span> помидора"
            break
        case 2:
            Interval_work()
            info.innerHTML="Сейчас выполняется <span class=\"text-orange\">первая</span> половина <span class=\"text-orange\">второго</span> помидора"
            break
        case 3:
            Interval_work()
            info.innerHTML="Сейчас выполняется <span class=\"text-orange\">вторая</span> половина <span class=\"text-orange\">второго</span> помидора"
            break
        case 4:
            number = 0
            start_button.textContent = "Старт"
            start_button.classList.add('to_start','Animated_button')
            start_button.classList.remove('to_stop')
            text.textContent = "Нажмите на кнопку, чтобы начать"
            tomato.classList.remove('tomato_pulse')
            tomato.classList.add('tomato_move')
            Swal.fire(
                'Цикл закончен!',
                '',
                'success'
            )
            break
    }
}


function Interval_work(){
    let i=0
    text.textContent="Осталось: 25 минут"
    interval25 = setInterval(() => {
        i+=1000
        text.textContent="Осталось: " + Math.floor((1500000-i)/60000) +" минут " + Math.floor((1500000-i-Math.floor((1500000-i)/60000)*60000)/1000) + " секунд"     //change to 1500000
        if (i>=1500000) {                                 //change to 1500000
            clearInterval(interval25)
            number++
            sound.play()
            Relax()
        }
    },1000)
}


function Relax(){
    let i=0
    if(number!==4){
    interval5 = setInterval(() => {
        i+=1000
        info.textContent="Сейчас короткий отдых"
        text.textContent="Осталось: " + Math.floor((300000-i)/60000) +" минут " + Math.floor((300000-i-Math.floor((300000-i)/60000)*60000)/1000) + " секунд"      //change to 300000
        if (i>=300000) {                                 //change to 300000
            clearInterval(interval5)
            sound.play()
            Check()
        }
    },1000)}
    else{
        info.textContent="Сейчас длинный отдых"
        interval30 = setInterval(() => {
            i+=1000
            text.textContent="Осталось: " + Math.floor((1800000-i)/60000) +" минут " + Math.floor((1800000-i-Math.floor((1800000-i)/60000)*60000)/1000) + " секунд"      //change to 1800000
            if (i>=1800000) {                                 //change to 1800000
                clearInterval(interval30)
                sound.play()
                Check()
            }
        },1000)}
}