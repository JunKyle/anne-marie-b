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
        var htmlArt = '';
        var art = data[slug];
        if (art && art.length > 0) {
            for (var i=0; i < art.length; i++) {
                htmlArt += '<a class="ArtPage__item" href="' + art[i].link +'">';
                htmlArt += '<img class="ArtPage__image" src="' + art[i].link  + '" alt="' + art[i].alternative  + '" title="' + art[i].name  + '"/>';
                htmlArt += '</a>';
            }
        }
        document.getElementById(slug + "-art").innerHTML = htmlArt;
    });    
}
