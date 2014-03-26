define(function() {
    function parseYoutubeUrl(url){
        // http://stackoverflow.com/a/8260383

        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[7].length==11){
            return match[7];
        }else{
            return null;
        }
    }

    function loadYoutubeVideo(id, autoplay) {
        var iframe = document.querySelector('.video-container iframe');
        iframe.src = '//youtube.com/embed/' + id + '?autoplay=' + (+!!autoplay) + '&modestbranding=1&showinfo=0&rel=0';
    }

    var moreVideos = Array.prototype.slice.apply(document.querySelectorAll('.more-videos a.video'));
    moreVideos.forEach(function(videoItem) {
        var url = videoItem.getAttribute('data-video-url');
        var id = parseYoutubeUrl(url);

        videoItem.style.backgroundImage = 'url(//i1.ytimg.com/vi/' + id + '/hqdefault.jpg)';

        videoItem.addEventListener('click', function(e) {
            loadYoutubeVideo(id, true);
            e.preventDefault();
        });
    });
});