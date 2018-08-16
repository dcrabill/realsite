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
     * Bootstrap select
     */
    $('select').selectpicker({
        size: 10
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
     * Map
     */
    var map = $('#map-admin');
    var markers = new Array();
    var colors = ['orange', 'blue', 'cyan', 'pink', 'deep-purple', 'teal', 'indigo', 'green', 'light-green', 'amber', 'yellow', 'deep-orange', 'brown', 'grey'];

    function get_gps_ranges(center_lat, center_lng, range_level_lat, range_level_lng) {
        var lat = center_lat + (Math.random() * (range_level_lat + range_level_lat) - range_level_lat);
        var lng = center_lng + (Math.random() * (range_level_lng + range_level_lng) - range_level_lng);
        return Array(lat, lng);
    }

    for (var i=0; i < 50; i++) {
        var position = get_gps_ranges(40.761077, -73.983307, 0.25, 0.60);
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
     * Login
     */
    $('.admin-sidebar-secondary button').click(function(e) {
        e.preventDefault();

        $('body').addClass('open');

        $('.admin-sidebar-secondary').animate({
            'display': 'none'
        }, 1250, function() {
            $('.admin-sidebar-secondary').css('display', 'none');
            createChart();
        });
    });

    if ($('body').hasClass('hide-secondary-sidebar')) {
        createChart();
    }

    function createChart() {
        nv.addGraph(function() {
            var chart = nv.models.multiBarChart()
            .transitionDuration(350)
            .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
            .rotateLabels(0)      //Angle to rotate x-axis labels.
            .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
            .groupSpacing(0.1)    //Distance between each group of bars.
            ;

            chart.xAxis
            .tickFormat(d3.format(',f'));

            chart.yAxis
            .tickFormat(d3.format(',.1f'));

            d3.select('#chart svg')
            .datum(exampleData())
            .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });

        //Generate some nice data.
        function exampleData() {
            return stream_layers(2,10+Math.random()*100,.1).map(function(data, i) {
                return {
                    key: 'Stream #' + i,
                    values: data
                };
            });
        }
    }
});
