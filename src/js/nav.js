define(function() {
    var links = document.querySelectorAll('nav .nav a');
    var href = location.href.replace(/#.*/, '');

    for (var i = 0, l = links.length; i < l; i++) {
        var link = links[i];
        if (link.href === href) {
            link.className = 'selected';
        }
    }
});