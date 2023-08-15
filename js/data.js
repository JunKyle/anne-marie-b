function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getData (slug) {
    ajax_get('./assets/data/' + slug + '.json', function(data) {
        let htmlArt = '';
        let art = data[slug];
        if (art && art.length > 0) {
            for (let i=0; i < art.length; i++) {
                htmlArt += '<a class="ArtPage__item" href="' + art[i].link +'">';
                htmlArt += '<img class="ArtPage__image" src="' + art[i].image  + '" alt="' + art[i].alternative  + '" title="' + art[i].name  + '"/>';
                htmlArt += '</a>';
            }
        }
        document.getElementById(slug + "-art").innerHTML = htmlArt;
    });    
}

function getSingleData () {
    const queries = window.location.search;
    const urlParams = new URLSearchParams(queries);
    const slug = urlParams.get('slug');
    const id = urlParams.get('id');
    ajax_get('./assets/data/' + slug + '.json', function(data) {
        const art = data[slug];
        if (art && art.length > 0) {
            const item = art.find( element => element.id.toString() === id);
            if (item) {
                document.getElementById("single-art-title").innerHTML = item.title;
                let htmlArt = '';
                htmlArt += "<div class='SingleArt__carousel'>"
                htmlArt += '<img class="SingleArt__image" src="' + item.image  + '" alt="' + item.alternative  + '" title="' + item.name  + '"/>';
                htmlArt += "</div>";
                htmlArt += '<span class="SingleArt__description">' + item.description + "</span>";
                document.getElementById("single-art-section").innerHTML = htmlArt;
            }
        }
    });   
}
