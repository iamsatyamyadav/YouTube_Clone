let data = JSON.parse(localStorage.getItem('video'))
console.log(data);


let append = (data) => {
    document.querySelector('iframe').src = 'https://www.youtube.com/embed/'+data.id
    document.querySelector('#vidName').innerText = data.snippet.title
}
append(data)

let home = () => {
    window.location.href = 'index.html'
}