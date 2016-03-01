(function($) {

	var main = {

	initialize: function () {
        main.objectFit();
        main.callFitVid();
        main.modal();
        main.contentTabs();
        main.neighborhoodDropDown();
        main.neighborhoodMap();
        main.mobileNav();
        main.headerSearch();        
        main.select2();
        main.booking();
        main.footer();
        main.elementInView();
        main.businessListingsJSON();
        main.maps();
        main.shareThis();
        main.videoPlayer();
    },


    //---------------------------------------------------------------------------------------------
    // Initialize objectfit
    //---------------------------------------------------------------------------------------------
    objectFit: function() {

		if ( ! Modernizr.objectfit ) {
			$('.object-fit').each(function () {

				var src = jQuery(this).attr('src');

				jQuery(this).parent().css({
					"background-image" : "url('" + src + "')",
					"background-size" : "cover",
					"background-position": "center center"
				});

				jQuery(this).css({
					"opacity" : "0"
				});
			});
		}

	},


	//---------------------------------------------------------------------------------------------
    // IF FITVID EXISTS, CALL FITVID TO MAKE RESPONSIVE
    //---------------------------------------------------------------------------------------------
    callFitVid: function() {
        if($('.fitvid').length > 0) {
            $('.fitvid').fitVids();
        }
    },

    //---------------------------------------------------------------------------------------------
    // MODAL JS
    //---------------------------------------------------------------------------------------------
    modal: function() {
        $( '*[data-dismiss="modal"]' ).click(function() {
	       $('.modal').modal('hide')
	    });



		//For each element that has a data-wrapper="modal" attrib
	    $( '*[data-wrapper="modal"]' ).each(function() {

		    //Get the value stored in the data-id attribute
		    var dataID = $(this).attr("data-id");

		    //And then, wrap some html around it and use that value as a class and ID for the modal div
		    $( this ).wrap( '<div class="modal ' + dataID + ' fade" id="' + dataID + '" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"></div></div></div>' );
		    });
		$('.modal').each(function() {
			$(this).prepend('<div class="modal-close" data-dismiss="modal"></div>');
		});
    },

    //---------------------------------------------------------------------------------------------
    // CONTENT TABS
    //---------------------------------------------------------------------------------------------
    contentTabs: function() {

		$('.content-tabs .content-tabs--link').click(function(){
			var tab_id = $(this).attr('data-tab');
	
			$('.content-tabs .content-tabs--link').removeClass('current');
			$('.content-tabs--content').removeClass('current');
	
			$(this).addClass('current');
			$('[data-content="'+tab_id+'"]').addClass('current');
		})        

    },

    //---------------------------------------------------------------------------------------------
    // NAVIGATION - NEIGHBORHOOD DROPDOWN
    //---------------------------------------------------------------------------------------------
    neighborhoodDropDown: function() {

        function neighborhoodDropDown() {
	        
	        $('.navigation--dropdown__neighborhoods').each(function() {
		        var headerWidth = $('.header--block').outerWidth();
		        var headerOffset = $('.header--block').offset();
		        var ddOffset = $('.header .navigation--primary').offset();
		        var ddLeft = ((ddOffset.left - headerOffset.left) * -1);
	
		        $('.navigation--dropdown__neighborhoods').css('width', headerWidth).css('left', ddLeft + 'px');
		    });
	    };

        $(window).load(function () {
			neighborhoodDropDown();
		}).resize(function () {
			neighborhoodDropDown();
		});

    },

    //---------------------------------------------------------------------------------------------
    // NAVIGATION - NEIGHBORHOOD MAP
    //---------------------------------------------------------------------------------------------
    neighborhoodMap: function() {

        $(".menu-neighborhood--nav > ul > .navigation--primary--subitem").hover(function () {
	        var hoverClass = $(this).children('a').attr('class');
	        $('.menu-neighborhood--map').toggleClass(hoverClass);
	    });
        
    },

    //---------------------------------------------------------------------------------------------
    // NAVIGATION - MOBILE NAV
    //---------------------------------------------------------------------------------------------
    mobileNav: function() {

        //Build the nav container
        $('body').append('<nav class="mobile-nav"></nav>');

        //Inject a close button
        $('.mobile-nav').append('<button class="mobile-nav--close"></button>');

        //Inject the desktop navs inside the container 
        $('.header .language-selector').clone().appendTo('.mobile-nav');
        $('.header--toolbox .btn--booking').clone().appendTo('.mobile-nav');
        $('.mobile-nav').append('<div class="navigation--secondary--mobile">' + $('.header .navigation--secondary--selector').html() + '</div>');
        $('.mobile-nav').append('<div class="navigation--primary--mobile">' + $('.header .navigation--primary').html() + '</div>');
        $('.header .utility-links').clone().appendTo('.mobile-nav');

        //Remove the superflous dropdown data, just because it's kinda messy and unneeded
        $('.mobile-nav .navigation--dropdown').remove();

        //Trigger the nav open
        $(".mobile-nav--trigger, .mobile-nav--close").click(function () {
	        $('.mobile-nav').toggleClass('open');
	    });

	    $('.mobile-nav .btn--booking').click(function(){
			window.location = $(this).attr('data-link');
		});

    },

    //---------------------------------------------------------------------------------------------
    // HEADER SEARCH
    //---------------------------------------------------------------------------------------------
    headerSearch: function() {

        function headerSearchWidth() {
	        var	viewportWidth = $(window).outerWidth();
	        var rowWidth = $('.header--row').outerWidth();
			var toolboxWidth = $('.header--toolbox').outerWidth();

	        enquire.register("screen and (max-width:767px)", {
		        match : function() {
			        $('.header .header--search').css('width', (viewportWidth - (15 * 2))); //gutters
			    },
			    unmatch : function() {
				    //$('.header .header--search').css('width', '');
			    }
			});

			enquire.register("screen and (min-width:768px)", {
		        match : function() {
			        $('.header .header--search').css('width', ((rowWidth - toolboxWidth) + 46)); //46 is the width of the trigger button
			    },
			    unmatch : function() {
				    $('.header .header--search').css('width', '');
			    }
			});
	    }

	    $(window).load(function () {
			headerSearchWidth();
		}).resize(function () {
			headerSearchWidth();
		});

	    $('.header--search--trigger, .header--search--close').click(function() {
		   $('.header').toggleClass('search-open');
	    });
        
    },

    
    //---------------------------------------------------------------------------------------------
    // BOOKING
    //---------------------------------------------------------------------------------------------
    booking: function() {
        
        $(".btn--booking").click(function () {
	        $('.booking-widget').toggleClass('open');
	    })
        
    },
    
    //---------------------------------------------------------------------------------------------
    // SELECT2 - JQUERY SELECT FIELD REPLACEMENT
    //---------------------------------------------------------------------------------------------
    select2: function() {
		
		
		$('select').select2({
			minimumResultsForSearch: Infinity
		});
	},
    
    //---------------------------------------------------------------------------------------------
    // FOOTER
    //---------------------------------------------------------------------------------------------
    footer: function() {
		
		
		var $animation_elements = $('.footer');
		var $window = $(window);
		
		function check_if_in_view() {
		  var window_height = $window.height();
		  var window_top_position = $window.scrollTop();
		  var window_bottom_position = (window_top_position + window_height);
		 
		  $.each($animation_elements, function() {
		    var $element = $(this);
		    var element_height = $element.outerHeight();
		    var element_top_position = $element.offset().top + 64;
		    var element_bottom_position = (element_top_position + element_height);
		 
		    //check to see if this current container is within viewport
		    if ((element_bottom_position >= window_top_position) &&
		        (element_top_position <= window_bottom_position)) {
		      $element.addClass('in-view');
		    }
		    if (element_top_position > window_bottom_position) {
		      $element.removeClass('in-view');
		    }
		  });
		}
		
		$window.on('scroll resize', check_if_in_view);
		$window.trigger('scroll');
	},
    
    
    //---------------------------------------------------------------------------------------------
    // ELEMENT IN VIEW
    //---------------------------------------------------------------------------------------------
    elementInView: function() {
		
		
		var $animation_elements = $('.business-listings');
		var $window = $(window);
		
		function check_if_in_view() {
		  var window_height = $window.height();
		  var window_top_position = $window.scrollTop();
		  var window_bottom_position = (window_top_position + window_height);
		 
		  $.each($animation_elements, function() {
		    var $element = $(this);
		    var element_height = $element.outerHeight();
		    var element_top_position = $element.offset().top;
		    var element_bottom_position = (element_top_position + element_height);
		 
		    //check to see if this current container is within viewport
		    if ((element_bottom_position >= window_top_position) &&
		        (element_top_position <= window_bottom_position)) {
		      $element.addClass('in-view');
		    }
		    if (element_top_position > window_bottom_position) {
		      $element.removeClass('in-view');
		    }
		    if (element_bottom_position < window_top_position) {
		      $element.removeClass('in-view');
		    }
		    
		    //check to see if container is below viewport
		    if (element_top_position >= window_bottom_position) {
		      $element.addClass('below-view');
		    }
		     if (element_top_position < window_bottom_position) {
		      $element.removeClass('below-view');
		    }
		    
		    //check to see if container is above viewport
		    if (element_bottom_position <= window_top_position) {
		      $element.addClass('above-view');
		    }
		     if (element_bottom_position > window_top_position) {
		      $element.removeClass('above-view');
		    }
		    
		    //check to see if container top is in viewport
		    if ((element_top_position >= window_top_position) && 
		    	(element_top_position <= window_bottom_position)) {
		      $element.addClass('top-in-view');
		    }
		     if (element_top_position < window_top_position) {
		      $element.removeClass('top-in-view');
		    }
		    
		    //check to see if container bottom is in viewport
		    if ((element_bottom_position >= window_top_position) && 
		    	(element_bottom_position <= window_bottom_position)) {
		      $element.addClass('bottom-in-view');
		    }
		     if ((element_bottom_position > window_bottom_position) || 
		     	(element_bottom_position < window_top_position)){
		      $element.removeClass('bottom-in-view');
		    }
		  });
		}
		
		$window.on('scroll resize ready', check_if_in_view);
		$window.trigger('scroll');
	},
	
	
    //---------------------------------------------------------------------------------------------
    // BUILD THE BUSINESS LISTINGS JSON
    //---------------------------------------------------------------------------------------------
    businessListingsJSON: function() {
		
		
		if ($('.business-listings').length > 0){
			
			//Build the Business Listings JSON for Google Maps
			
			var blRun = 1;
			
			if (typeof locations === 'undefined') {
				window.locations = [];
			}
			
			$('.business-listings--item').each(function() {
				
				var blTitle = $(this).find('.business-listings--item--title').text(),
					blLat = $(this).attr('data-lat'),
					blLong = $(this).attr('data-long'),
					blMarker = 'pin-teal-star';
				
					
				window.locations.push([eval(blRun), blTitle, blLat, blLong, blMarker]);
				
				
				blRun++;
				
			});			
		}
	},
		
	//---------------------------------------------------------------------------------------------
    // MAPS
    //---------------------------------------------------------------------------------------------
    maps: function() {
		
		
		if (typeof locations === 'undefined') {
			var locations = window.locations;
		}
		
		if ($("#map").length > 0){
		  
		  
		    window.map = new google.maps.Map(document.getElementById('map'), {
		        mapTypeId: google.maps.MapTypeId.ROADMAP,
		        styles: [
				    {
				        "featureType": "landscape.natural",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#e0efef"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#bedcdf"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "lightness": 100
				            },
				            {
				                "visibility": "simplified"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "transit.line",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "lightness": 700
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "all",
				        "stylers": [
				            {
				                "color": "#80aaad"
				            }
				        ]
				    }
				]
		    });
		
		    //var infowindow = new google.maps.InfoWindow();
		
		    var bounds = new google.maps.LatLngBounds();
			
			var infobox = [];
			
			//Build the infobox container
			$('body').append('<div class="infobox-wrapper"></div>');
			
		    for (i = 0; i < locations.length; i++) {
		        marker = new google.maps.Marker({
		            position: new google.maps.LatLng(locations[i][2], locations[i][3]),
		            map: map,
		            icon: '/sites/all/themes/custom/washington/media/images/map-markers/'+locations[i][4]+'.png',
		            markerid: locations[i][0],
		        });
		        		
		        bounds.extend(marker.position);
				
				//Add the actual infobox
				$('.infobox-wrapper').append('<div id="infobox-'+locations[i][0]+'" class="infobox">'+locations[i][1]+'</div>');
				
		        infobox.push(new InfoBox({
			         content: document.getElementById("infobox-" + locations[i][0]),
			         disableAutoPan: false,
			         maxWidth: 150,
			         pixelOffset: new google.maps.Size(-140, -60),
			         alignBottom: true,
			         zIndex: null,
			         boxStyle: {
			            opacity: 1,
			            width: "280px"
			        },
			        //closeBoxMargin: "12px 4px 2px 2px",
			        closeBoxURL: '',
			        infoBoxClearance: new google.maps.Size(1, 1)
			    }));
			    
			    google.maps.event.addListener(marker, 'click', function() {
			    	var curMarker = this,
			    		thisID = this.markerid;
			    	//Close the infoboxes that don't match
				    $.each(infobox, function(i, e) {
				        if(e !== curMarker) {
				            e.close();
				        }
				    });			        
			        infobox[thisID].open(map, this);
			    });
			    
			    
			}
			
		    map.fitBounds(bounds);
		
		    var listener = google.maps.event.addListener(map, "idle", function () {
		        //map.setZoom(14);
		        google.maps.event.removeListener(listener);
		    });
	
		}

		
	},
    
    //---------------------------------------------------------------------------------------------
    // SHARE THIS
    //---------------------------------------------------------------------------------------------
    shareThis: function() {
		
		if ($(".sharethis").length > 0){
			
			var	documentURL		= window.location.href,
				documentTitle	= encodeURIComponent(document.title);
			
			$('.sharethis').html(''+
				'<ul class="sharethis--networks rrssb-buttons clearfix">'+
					'<li class="rrssb-facebook"><a href="https://www.facebook.com/sharer/sharer.php?u='+documentURL+'" class="sharethis--facebook popup"></a>'+
					'</li>'+
					'<li class="rrssb-twitter"><a href="https://twitter.com/intent/tweet?text='+documentTitle+encodeURIComponent(' | ')+documentURL+'" class="sharethis--twitter popup"></a></li>'+
					'<li class="rrssb-pinterest"><a href="http://pinterest.com/pin/create/button/?url='+documentURL+'" class="sharethis--pinterest popup"></a></li>'+
				'</ul>');
		}
		
		
		$('.sharethis').click(function() {
			$(this).addClass('open');
		});
		
		
				
	},
    
    //---------------------------------------------------------------------------------------------
    // VIDEO PLAYER
    //---------------------------------------------------------------------------------------------
    videoPlayer: function() {
		
		var fbVideoInt = 0;
		
		$('.videoplayer').each(function() {
			//For each instance of video player
			//If it happens to be facebook
			if ($(this).data('source') == 'facebook')
			{
				//Let's set the video width at 75% of viewport. This may not be ideal on smaller devices. Let's come back to this later.
				var videoWidth = Math.ceil($(window).width() * .75);
				
				//Establish the unique ID
				var fbID = "fb-video--" + fbVideoInt;
				
				//Inject the container div into the page
				$('body').append('<div style="position: absolute; transform:translateX(-9000px) translateY(-9000px);"><div id="' + fbID + '"><div class="fb-video" data-href="' + $(this).data('video') +'" data-width="' + videoWidth + '" data-allowfullscreen="true" data-autoplay="true"></div></div></div>');
				
				//Update the trigger href to the unique ID
				$(this).attr('href', '#' + fbID);
			}
		});
		
		$('.videoplayer').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			},
			afterClose : function() {         
	            
	            if ($(this.element).data('source') == 'facebook') {
		            $($(this.element).attr('href')).css('display', 'block');
		            FB.XFBML.parse();
	            }
	        }
		});
		
		
				
	}

}

$(document).ready(main.initialize);
}(jQuery));
