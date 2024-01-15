(function() {
    console.log('Here into the console');
    fetch('http://localhost:8080/api/test')
        .then(response=>response.json())
        .then(data=>console.log('data',data))
        .catch(console.error);
})();