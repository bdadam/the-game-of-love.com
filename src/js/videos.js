define(function() {
    function parseYoutubeUrl(url){
        //http://stackoverflow.com/a/9102270

        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[2].length==11){
            return match[2];
        }else{
            return null;
        }
    }

    function loadYoutubeVideo(id, autoplay) {
        var iframe = document.querySelector('.video-container iframe');

        var title = getTitleForVideoId(id);

        if (!iframe) {
            var videoContainer = document.querySelector('.video-container');
            if (!videoContainer) {
                videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';
                var h1 = document.querySelector('h1');
                h1.parentNode.insertBefore(videoContainer, h1.nextSibling);
            }

            iframe = document.createElement('iframe');
            iframe.allowfullscreen = true;
            iframe.frameborder = '0';
            iframe.setAttribute('frameborder', 0);
            videoContainer.appendChild(iframe);
        }

        document.querySelector('h1').innerHTML = title;

        iframe.src = '//youtube.com/embed/' + id + '?autoplay=' + (+!!autoplay) + '&modestbranding=1&showinfo=0&rel=0';
    }

    function getTitleForVideoId(id) {
        var videoItem = document.querySelector('[data-video-url*="' + id + '"]');
        var title = videoItem.querySelector('.title').innerText;

        return title;
    }

    var moreVideos = Array.prototype.slice.apply(document.querySelectorAll('.more-videos a.video'));
    moreVideos.forEach(function(videoItem) {
        var url = videoItem.getAttribute('data-video-url');

        var id = parseYoutubeUrl(url);

        videoItem.style.backgroundImage = 'url(//i1.ytimg.com/vi/' + id + '/hqdefault.jpg)';

        videoItem.addEventListener('click', function(e) {
            location.hash = id;
            e.preventDefault();
        });
    });

    function onHashChange() {
        var id = location.hash.replace('#', '');
        loadYoutubeVideo(id, true);
    }

    window.addEventListener('hashchange', onHashChange);

    if (location.hash.length === 12) {
        onHashChange();
    }
});