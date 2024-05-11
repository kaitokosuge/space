const btns = document.querySelectorAll('.area--btn')
const arrBtn = [...btns];
btns.forEach((btn) => {
    btn.addEventListener('click',async () => {
        const animationArea = document.querySelector('.wind--animation');
        btn.disabled = true
        btn.classList.toggle('pushed');
        const res = await fetch('https://ipinfo.io?callback')
        .then(res => res.json())
        .then(data => data.ip)
        switch(true) {
            case btn.innerHTML.includes('👁'):
                animationArea.classList.forEach(className => {
                    if(className !== 'wind--eye--animation'){
                        animationArea.classList.remove(className);
                    }
                })
                const soundNormal = await fetch('https://rsem26ipzc.execute-api.ap-northeast-1.amazonaws.com/windAudioGet?windSpeed=1',{method:'GET'})
                                    .then(res => res.json())
                                    .then(data => data.audios[0].audioUrl)
                const musicNormal = new Audio(soundNormal);
                musicNormal.play();
                animationArea.classList.add('wind--animation','wind--eye--animation');
                const textAppr = document.createElement("p");
                textAppr.className = 'wind--animation--text'
                textAppr.innerText = '許'
                animationArea.appendChild(textAppr)
                setTimeout(() => {
                    animationArea.classList.remove('wind--eye--animation');
                    animationArea.removeChild(textAppr)
                },1800)
                break;
            case btn.innerHTML.includes('😈'):
                animationArea.classList.forEach(className => {
                    if(className !== 'wind--debil--animation'){
                        animationArea.classList.remove(className);
                    }
                })
                const soundCurse = await fetch('https://rsem26ipzc.execute-api.ap-northeast-1.amazonaws.com/windAudioGet?windSpeed=6',{method:'GET'})
                                    .then(res => res.json())
                                    .then(data => data.audios[0].audioUrl)
                const musicCurse = new Audio(soundCurse);
                musicCurse.play();
                animationArea.classList.add('wind--animation','wind--debil--animation');
                const textCur = document.createElement("p");
                textCur.className = 'wind--animation--text'
                textCur.innerText = '😈'
                animationArea.appendChild(textCur)
                setTimeout(() => {
                    animationArea.classList.remove('wind--debil--animation');
                    animationArea.removeChild(textCur)
                },1800)
                break;
            case btn.innerHTML.includes('👼'):
                animationArea.classList.forEach(className => {
                    if(className !== 'wind--god--animation'){
                        animationArea.classList.remove(className);
                    }
                })
                const sound = await fetch('https://rsem26ipzc.execute-api.ap-northeast-1.amazonaws.com/windAudioGet?windSpeed=0',{method:'GET'})
                                    .then(res => res.json())
                                    .then(data => data.audios[0].audioUrl)
                const music = new Audio(sound);
                music.play();
                animationArea.classList.add('wind--animation','wind--god--animation');
                const text = document.createElement("p");
                text.className = 'wind--animation--text'
                text.innerText = '👼'
                animationArea.appendChild(text)
                setTimeout(() => {
                    animationArea.classList.remove('wind--god--animation');
                    animationArea.removeChild(text)
                },1800)
                break;
            case btn.innerHTML.includes('👹'):
                animationArea.classList.forEach(className => {
                    if(className !== 'wind--demon--animation'){
                        animationArea.classList.remove(className);
                    }
                })
                const soundRage = await fetch('https://rsem26ipzc.execute-api.ap-northeast-1.amazonaws.com/windAudioGet?windSpeed=10',{method:'GET'})
                                    .then(res => res.json())
                                    .then(data => data.audios[0].audioUrl)
                const musicRage = new Audio(soundRage);
                musicRage.play();
                animationArea.classList.add('wind--animation','wind--demon--animation');
                const textDea = document.createElement("p");
                textDea.className = 'wind--animation--text'
                textDea.innerText = '👹'
                animationArea.appendChild(textDea)
                setTimeout(() => {
                    animationArea.classList.remove('wind--demon--animation');
                    animationArea.removeChild(textDea)
                },1800)
                break;
        }
        const areaId = btn.dataset.areaId; 

        const date = new Date();
        
        const data = await fetch('https://winde0d.microcms.io/api/v1/wind',{
            method: 'POST',
            headers:{
                'X-MICROCMS-API-KEY' : '18xF9hhMZ73R13uevfjUr8WtsuUdfOCKkZCB',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({"ip":res,"area_id":areaId,"date":date.toLocaleDateString()}),
        })
        if(data.ok){
            getCount()
        }else{
            console.log('error');
        }
        btn.disabled = false
        btn.classList.toggle('pushed');
    })
})
async function getCount() {
    const res = await fetch("https://winde0d.microcms.io/api/v1/wind/?limit=100", {
        headers: {
            "X-MICROCMS-API-KEY": "18xF9hhMZ73R13uevfjUr8WtsuUdfOCKkZCB"
        }
    }).then(res => res.json()).then(data => data.contents);
    const btns = document.querySelectorAll(".wind--area__btn__num");
    const date = new Date();
    const todayRecord = res.filter(obj => obj.date === date.toLocaleDateString());
    for (let index = 0; index < btns.length; index++) {
        const numRecord = todayRecord.filter(obj => obj.area_id === `${index + 1}`).length;
        btns[index].innerHTML = `<span>${numRecord}</span>`;
    }
}
window.addEventListener('DOMContentLoaded',async() => {

    const numArea = document.querySelectorAll(".wind--area__num");
    const numBtn = document.querySelectorAll(".wind--area__btn__text");
    const weatherArea = document.querySelectorAll('.wind--are__weather__icon');
    const tempArea = document.querySelectorAll(".wind--area__weather__temp");
    const likeTempArea = document.querySelectorAll(".wind--area__weather__like__temp");

    const locations = ['Tokyo', 'Saitama', 'Kanagawa', 'Hokkaido', 'Sendai', 'nagoya', 'Osaka','Okinawa'];

    const getWeatherData = async (location, index) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},JP&appid=494095f8c4f833baa26e626dbd6cb1ab&lang=ja&units=metric`);
        const data = await response.json();
        switch (true) {
            case Math.floor(data.wind.speed) === 0:
                numBtn[index].innerHTML = `👼 Best Blessings`;
                numArea[index].innerHTML = `<span class="wind--gold">${Math.floor(data.wind.speed)}</span><span class="wind--area__type">m/s</span>`;
                break;
            case data.wind.speed > 10:
                numBtn[index].innerHTML = `👹 de○d de◯..`;
                numArea[index].innerHTML = `<span class="wind--red">${Math.floor(data.wind.speed)}</span><span class="wind--area__type">m/s</span>`;
                break;
            case data.wind.speed > 6:
                numArea[index].innerHTML = `<span class="wind--debil">${Math.floor(data.wind.speed)}</span><span class="wind--area__type">m/s</span>`;
                numBtn[index].innerHTML = `😈 curse curs...`;
                break;
            case data.wind.speed > 1:
                numBtn[index].innerHTML = `👁 approve...`;
                numArea[index].innerHTML = `<span class="">${Math.floor(data.wind.speed)}</span><span class="wind--area__type">m/s</span>`;
                break;
            default:
                break;
        }
        weatherArea[index].innerHTML = `${data.weather[0].description}で〜す☆`;
        tempArea[index].innerHTML = `${data.main.temp}℃`;
        likeTempArea[index].innerHTML = `${data.main.feels_like}℃`;
    };

    const date = new Date();

    locations.forEach(async (location, index) => {
        await getWeatherData(location, index);
    });
    await getCount();
})