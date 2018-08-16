$(window).load(function() {
    'use strict';

    /**
     * Isotope
     */
    var isotope_properties = $('.properties-isotope');
    isotope_properties.isotope({
        'itemSelector': '.item'
    });

    $('.properties-filter a').click(function() {
        $(this).parent().parent().find('li').removeClass('selected');
        $(this).parent().addClass('selected');

        var selector = $(this).attr('data-filter');
        isotope_properties.isotope({ filter: selector });
        return false;
    });
});

$(function(){
    var ink, d, x, y;

    $(".btn, .btn-secondary, .header-action").click(function(e){
        if($(this).find(".ink").length === 0){
            $(this).prepend("<span class='ink'></span>");
        }
             
        ink = $(this).find(".ink");
        ink.removeClass("animate");
         
        if(!ink.height() && !ink.width()){
            d = Math.max($(this).outerWidth(), $(this).outerHeight());
            ink.css({height: d, width: d});
        }
         
        x = e.pageX - $(this).offset().left - ink.width()/2;
        y = e.pageY - $(this).offset().top - ink.height()/2;
         
        ink.css({top: y+'px', left: x+'px'}).addClass("animate");
    });
});

$(document).ready(function() {
    'use strict';

    /**
     * Input file
     */
    $('#input-file').fileinput({
        initialPreview: [
            "<img src='assets/img/tmp/medium/1.jpg' class='file-preview-image' alt='The Moon' title='Property 1'>",
            "<img src='assets/img/tmp/medium/2.jpg' class='file-preview-image' alt='The Earth' title='Property 2'>",
        ],
        overwriteInitial: true,
        initialCaption: "Your Uploaded Properties"
    });

    /**
     * Input Group
     */
     $('.input-group .form-control').on('focus', function() {
         $(this).closest('.input-group').find('.input-group-addon').addClass('active');
     }).on('blur', function() {
         $(this).closest('.input-group').find('.input-group-addon').removeClass('active');
     });

    /**
     * Scroll top
     */
    var scroll_top = $('.scroll-top');
    if(scroll_top.length != 0) {
        scroll_top.on('click', function() {
            $.scrollTo('.header', 800);
        });
    }

    /**
     * Property gallery
     */
    if ($('.property-gallery-list').length != 0) {
        $('.property-gallery-list').owlCarousel({
            items: 6,
            itemsDesktop : [1199, 5],
            itemsDesktopSmall : [979, 5],
            itemsTablet : [768, 3],
            itemsTabletSmall : [1, 3],
            itemsMobile : false,
            navigation: true,
            navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
        });
    }

    /**
    * Property carousel
    */
    if ($('.property-carousel').length != 0) {
        $('.property-carousel').owlCarousel({
            items: 4,
            itemsDesktop : [1199, 5],
            itemsDesktopSmall : [979, 3],
            itemsTablet : [768, 2],
            itemsTabletSmall : [1, 2],
            itemsMobile : false,
            navigation: true,
            navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
        });
    }

    $('.property-gallery-list-item a').on('click', function(e) {
        e.preventDefault();

        $('.property-gallery-list-item').each(function() {
            $(this).removeClass('active');
        });

        $(this).closest('li').addClass('active');

        var link = $(this).attr('href');
        $('.property-gallery-preview img').attr('src', link);
    });

    /**
     * Autosize textarea
     */
    $('textarea').autosize();

    /**
     * Bootstrap select
     */
    $('select').selectpicker({
        size: 10
    });

    /**
     * Contact map
     */
     var map_contact = $('#map-contact');
     if (map_contact.length) {
         map_contact.google_map({
             markers: [{
                 latitude: 40.761077,
                 longitude: -73.983307
             }]
         });
     }

     /**
      * Property detail map
      */
     var map_property = $('#map-property');
     if (map_property.length) {
         map_property.google_map({
             markers: [{
                 latitude: 40.761077,
                 longitude: -73.983307
             }]
         });
     }

    /**
     * Map
     */
    var map = $('#map');
    var markers = new Array();
    var colors = ['orange', 'blue', 'cyan', 'pink', 'deep-purple', 'teal', 'indigo', 'green', 'light-green', 'amber', 'yellow', 'deep-orange', 'brown', 'grey'];

    function get_gps_ranges(center_lat, center_lng, range_level_lat, range_level_lng) {
        var lat = center_lat + (Math.random() * (range_level_lat + range_level_lat) - range_level_lat);
        var lng = center_lng + (Math.random() * (range_level_lng + range_level_lng) - range_level_lng);
        return Array(lat, lng);
    }

    for (var i=0; i < 30; i++) {
        var position = get_gps_ranges(40.761077, -73.983307, 0.08, 0.60);
        var color = colors[Math.floor(Math.random()*colors.length)];

        markers.push({
            latitude: position[0],
            longitude: position[1],
            marker_content: '<div class="marker ' + color + '"><img src="assets/img/house.png" alt=""></div>',
            content: '<div class="infobox ' + color + ' "><a class="infobox-image" href=""><img src="assets/img/tmp/1-small.png" alt=""></a><div class="infobox-content"><div class="infobox-content-title"><a href="#">Madison Street 322</a></div><div class="infobox-content-price">$ 230,000</div><div class="infobox-content-body">Integer sit amet nibh erat. Maecenas accumsan nibh at porta euismod.</div></div><div class="infobox-contact"><div class="infobox-contact-title"><a href="#">John Doe</a></div><div class="infobox-contact-body">Effectivity Real Estate<br>Wardrobe Street 90210<br><i class="fa fa-phone"></i>012-123-456</div><a href="#" class="close"><i class="fa fa-close"></i></a></div></div>'
        });
    }

    if (map.length) {
        map.google_map({
            infowindow: {
                borderBottomSpacing: 0,
                height: 120,
                width: 424,
                offsetX: 30,
                offsetY: -80
            },
            zoom: 11,
            transparentMarkerImage: map.data('transparent-marker-image'),
            transparentClusterImage: map.data('transparent-marker-image'),
            markers: markers,
            styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"labels.text.fill","stylers":[{"color":"#b43b3b"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"lightness":"8"},{"color":"#bcbec0"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5b5b5b"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7cb3c9"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#abb9c0"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"color":"#fff1f1"},{"visibility":"off"}]}]
        });
    }

    /**
     * Background image
     */
    $('*[data-background-image]').each(function() {
        $(this).css({
            'background-image': 'url(' + $(this).data('background-image') + ')'
        });
    });

    /**
     * Dropdown
     */
    $('div.dropdown-menu').on('focusin', function() {
        $(this).transition({
            height: 'auto',
            duration: 150,
            width: 'auto'
        });
    });

    $('div.dropdown-menu').on('focusout', function() {
        $(this).transition({
            height: 0,
            duration: 250,
            width: 0
        });
    });

    /**
     * Header animation
     */
     /**
      * Header animation
      */
     $('#nav-main > li.has-children').hover(function() {
         var el = $('> div', this);

         el.transition({
             height: 'auto',
             duration: 250,
             width: 'auto'
         });
     }, function() {
         var el = $('> div', this);

         el.transition({
             height: 0,
             duration: 150,
             width: 0
         });
     });

     // Second level
     $('#nav-main > li.has-children > div > ul > li.has-children').hover(function() {
         var el = $('> div', this);

         $(this).closest('div').css('overflow', 'visible');

         el.transition({
             height: 'auto',
             duration: 250,
             width: 'auto'
         });
     }, function() {
         var el = $('> div', this);

         $(this).closest('div').css('overflow', 'hidden');

         el.transition({
             height: 0,
             duration: 150,
             width: 0
         });
     });

    $('.navbar-toggle').on('click', function() {
        $('.nav-main-wrapper').toggleClass('open');
    });

    $('.nav-main-wrapper').on('click', function(e) {
        if (e.offsetX > 240) {
            $('.nav-main-wrapper').removeClass('open');
        }
    })
});
