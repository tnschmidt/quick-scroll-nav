(function ($) {
    var $nav;
    var $navItemsData = [];
    var windowHeight;
    var activeSet;
   $.fn.quickScrollNav = function( options ) {
        $nav = $(".quick-scroll-nav");
        init();

        $(window).on('scroll', function(){
          checkInviewSection();
        });
        $(window).on('resize', function(){
          init();
        });

        function init(){
          windowHeight = $(window).height();

          $nav.children().each(function(index){
            var hash = $(this).find('a').attr('href');
            hashsinhash = hash.replace('#', '');
            if (hashsinhash !== ''){
              var d = document.getElementById(hashsinhash);
              var topPos = d.offsetTop;
            } else {
              topPos = 0;
            }

            $navItemsData[index] = {
              hash : hashsinhash,
              offsetTop : topPos,
              inView : 0, //set default to 0 (not in view)
            }

          });

          checkInviewSection();
        }
        function checkHash(){

        }
        function checkInviewSection(){
          windowTop = $(window).scrollTop();
          topLimit = windowTop - 40;
          bottomLimit = windowTop + windowHeight - 40;

          for (i = 0; i < $navItemsData.length; i++){
            if ($navItemsData[i].offsetTop >= topLimit && $navItemsData[i].offsetTop <= bottomLimit){
              $navItemsData[i].inView = 1;
            } else {
              $navItemsData[i].inView = 0;
            }
          }

          activeSet = false;
          for (i = 0; i < $navItemsData.length; i++){
            if ($navItemsData[i].inView === 1 && !activeSet){
              $('.quick-scroll-nav a[href="#' + $navItemsData[i].hash + '"]').addClass('active');
              activeSet = true;
            } else {
              $('.quick-scroll-nav a[href="#' + $navItemsData[i].hash + '"]').removeClass('active');
            }
          }
        }
   };

   $('.quick-scroll-nav').quickScrollNav();
}( jQuery ));
