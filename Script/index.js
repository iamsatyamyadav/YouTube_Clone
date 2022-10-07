// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=thor&key=[YOUR_API_KEY]'
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=[YOUR_API_KEY]

// function to get most popular videos by default
// let API = "AIzaSyBZIRLiS4euAxt9PZxLCXW-P1qBB_OOHjA"
let data;
let getPopularData = async () => {
    let url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=AIzaSyBZIRLiS4euAxt9PZxLCXW-P1qBB_OOHjA'
    let res = await fetch(url);
    data = await res.json()
    append(data.items)
}
getPopularData();

// function to append the data to the HTML
let append = (data) => {
    console.log(data);
    document.querySelector('#display').innerHTML = null;
    data.forEach((el) => {
        let card = document.createElement('card');
        card.setAttribute('class', 'card')
        let img = document.createElement('img');
        img.src = el.snippet.thumbnails.high.url
        let des = document.createElement('p');
        des.innerText = el.snippet.title;
        let chnl = document.createElement('p');
        chnl.innerText = el.snippet.channelTitle;

        card.append(img, des, chnl)

        card.addEventListener('click', () => {
            addToLocalStorage(el);
        })

        document.querySelector('#display').append(card);
    })
}

// function to get searched data
let getSearchData = async () => {
    let keyword = document.querySelector('#search').value
    if (keyword.length == 0) {
        getPopularData();
    } else {
        let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${keyword}&key=AIzaSyBZIRLiS4euAxt9PZxLCXW-P1qBB_OOHjA`;
        let res = await fetch(url);
        data = await res.json();
        // console.log(data)
        append(data.items)
    }

}

let addToLocalStorage = (el) => {
    localStorage.setItem('video', JSON.stringify(el))
    window.location.href = 'video.html'
}


document.querySelector('#fltBtn').addEventListener('click', () => { filter(data.items) });

let filter = (data) => {
    // console.log(data)
    let filt = document.querySelector('#filter').value;
    if (filt.length == 0) {
        getPopularData()
    } else {
        console.log(filt)
        let x = data.filter((el) => {
            return el.snippet.channelTitle.includes(filt)
        })
        append(x);
    }

}


let home = () => {
    window.location.href = 'index.html'
}

