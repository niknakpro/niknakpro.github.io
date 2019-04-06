$(function() {

	$(".view-map-link").click(function() {
		$(".wrapper-contact-map").css('display', 'none');
		$(".google-maps-iframe").css('display', 'block');
		$(".view-form").css('display', 'block');
	});

	$(".view-form").click(function() {
		$(".wrapper-contact-map").css('display', 'block');
		$(".google-maps-iframe").css('display', 'none');
		$(this).css('display', 'none');
	});

	$('.up').click(function() {
		$('html, body').animate({scrollTop: 0},2000);
		return false;
	});

	//E-mail Ajax Send
	$(".form-top").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$(".form-bottom").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$('.hamburger').click(function() {
		if ($(this).hasClass("is-active")) {
			$(this).removeClass("is-active");
			$(".hidden-menu").css('visibility', 'hidden');
			$(".hidden-menu").css('opacity', '0');
		} else {
			$(this).addClass("is-active");
			$(".hidden-menu").css('visibility', 'visible');
			$(".hidden-menu").css('opacity', '1');
		}
	});

	$( "a.scrollLink" ).click(function( event ) {
		event.preventDefault();
		$("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
	});

	var nav = $(".top-menu-wrapper");
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			nav.addClass("f-nav");
		} else {
			nav.removeClass("f-nav");
		}
	});

	!function(t){t.fn.countdown=function(e,n){function o(){var t=new Date(r.date),e=s(),o=t-e;if(0>o)return clearInterval(d),void(n&&"function"==typeof n&&n());var a=1e3,f=60*a,u=60*f,l=24*u,c=Math.floor(o/l),h=Math.floor(o%l/u),x=Math.floor(o%u/f),g=Math.floor(o%f/a),y=1===c?r.day:r.days,m=1===h?r.hour:r.hours,v=1===x?r.minute:r.minutes,D=1===g?r.second:r.seconds;c=String(c).length>=2?c:"0"+c,h=String(h).length>=2?h:"0"+h,x=String(x).length>=2?x:"0"+x,g=String(g).length>=2?g:"0"+g,i.find(".days").text(c),i.find(".hours").text(h),i.find(".minutes").text(x),i.find(".seconds").text(g),i.find(".days_text").text(y),i.find(".hours_text").text(m),i.find(".minutes_text").text(v),i.find(".seconds_text").text(D)}var r=t.extend({date:null,offset:null,day:"Day",days:"Days",hour:"Hour",hours:"Hours",minute:"Minute",minutes:"Minutes",second:"Second",seconds:"Seconds"},e);r.date||t.error("Date is not defined."),Date.parse(r.date)||t.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");var i=this,s=function(){var t=new Date,e=t.getTime()+6e4*t.getTimezoneOffset(),n=new Date(e+36e5*r.offset);return n},d=setInterval(o,1e3)}}(jQuery);

	$('#example').countdown({
		date: '04/29/2019 13:00:00'
	}, function () {
		alert('Merry Christmas!');
	});


	/* 
 * jQuery - Collapser - Plugin v2.0
 * http://www.aakashweb.com/
 * Copyright 2014, Aakash Chakravarthy
 * Released under the MIT License.
 */

;(function ( $, window, document, undefined ) {
	
		var name = "collapser",
				defaults = {
			target: 'next',
			mode: 'words',
			speed: 'slow',
			truncate: 10,
			ellipsis: '...',
			effect: 'fade',
			controlBtn: '',
			showText: 'Show more',
			hideText: 'Hide text',
			showClass: 'show-class',
			hideClass: 'hide-class',
			atStart: 'hide',
			lockHide: false,
			dynamic: false,
			changeText: false,
			beforeShow: null,
			afterShow: null,
			beforeHide: null,
			afterHide: null
				};

		// Constructor
		function Collapser( el, options ) {
		
		var s = this;
		
				s.o = $.extend( {}, defaults, options );
		s.e = $(el);
		s.init();

		}
	
	Collapser.prototype = {
		init: function(){
		
			var s = this;
			
			// Shorthand variables
			s.mode = s.o.mode;
			s.remaining = {};
			s.ctrlHtml = ' <a href="#" data-ctrl class="' + ( !$.isFunction(s.o.controlBtn) ? s.o.controlBtn : '' ) + '"></a>';
	
			$( s.e ).each(function(){
				
				// Store the original HTML in a data cache
				$(this).data( 'oCnt', s.e.html() );
				
				// Get the start type of the target element and activate the collapse
				var atStart = $.isFunction( s.o.atStart ) ? s.o.atStart.call( s.e ) : s.o.atStart;
				
				atStart = ( typeof s.e.attr( 'data-start' ) !== 'undefined' ) ? s.e.attr( 'data-start' ) : atStart;
				
				if( atStart == 'hide' ){
					s.hide( s.e, 0 );
				}else{
					s.show( s.e, 0 );
				}
				
			});
			
			// Update the hidden lines on window resize
			var rTimer;
			$( window ).on( 'resize', function(){
				if( s.o.dynamic && s.mode == 'lines' ){
					clearTimeout( rTimer );
					rTimer = setTimeout( function(){ 
						s.reInit( s.e );
					}, 100);
				}
			});

		},
		
		// SHOW METHOD
		show: function( ele, speed ){
			var s = this,
				e = $( ele );
				
			if( typeof speed === 'undefined' ) speed = s.o.speed;
			
			// Callbacks
			var callback = function(){
				if( $.isFunction( s.o.afterShow ) )
					s.o.afterShow.call( s.e, s );
			};
			
			if( $.isFunction( s.o.beforeShow ) )
				s.o.beforeShow.call( s.e, s );
			
			switch( s.mode ){
				case 'chars':
				case 'words':
				
					// Get the current height of the element
					var oHeight = e.height();
					
					// Replace the HTML with the original one and get the new height
					e.html( e.data('tHTML') );
					var nHeight	= e.height();
					
					// Animate the element height from old to new and update element classes
					e.height( oHeight );
					e.animate({
						'height': nHeight
					}, speed, function(){
						e.height( 'auto' );
						callback();
					}).removeClass( s.o.hideClass ).addClass( s.o.showClass );
					
					// Update the temporary HTML in the data cache
					e.data( 'tHTML', e.html() );
					
				break;
				
				case 'lines':
				
					// Wrap the inner elements with a div tag
					if( e.children('div').length == 0 )
						e.wrapInner( '<div>' );
					
					// Get current height and height after replacing content
					var eWrap = e.children( 'div' ),
						tHeight = eWrap.height(),
						getHeight = eWrap.html( e.data('oCnt') ).css( 'height', '' ).height(),
						setHeight = eWrap.css( 'height', tHeight );
					
					// Animate the element height from old to new and update the classes
					eWrap.animate({
						height: getHeight
					}, speed, function(){
						eWrap.height( 'auto' );
						callback();
					});
					
					e.removeClass( s.o.hideClass ).addClass( s.o.showClass )
				
				break;
				
				case 'block':
					
					// Call the special function this mode
					s.blockMode( e, 'show', speed, callback );
				
				break;
				
			}
			
			// Update the status variable to ON
			s.status = 1;
			
			// Check whether to hide the control button after expand
			if( s.o.lockHide == true ){
				e.find( '[data-ctrl]' ).remove();
				return '';
			}
			
			// Update the on click event of the control button
			if( s.mode == 'block' ){
				
				// For block mode
				e.off('click.coll').on( 'click.coll', function( event ){
					event.preventDefault();
					s.hide( e );
				});
				
			}else{
			
				// If there is no control button, add it
				if( e.find( '[data-ctrl]' ).length == 0 && !$.isFunction( s.o.controlBtn ) ){
					e.append( s.ctrlHtml );
				}
				
				// Bind the on click event of the control button
				s.ctrlBtn = $.isFunction( s.o.controlBtn ) ? s.o.controlBtn.call( s.e ) : $( e.find( '[data-ctrl]' ) );
				
				s.ctrlBtn.off( 'click.coll' ).on( 'click.coll' , function( event ){
					event.preventDefault();
					s.hide( e );
				}).html( s.o.hideText );
			
			}
		},
		
		// HIDE METHOD
		hide: function( ele, speed ){
			
			var s = this,
				e = $( ele );
				
			if( typeof speed === 'undefined' ) speed = s.o.speed;
			
			// Callbacks
			var callback = function(){
				if( $.isFunction( s.o.afterHide ) )
					s.o.afterHide.call( s.e, s );
			};
			
			if( $.isFunction( s.o.beforeHide ) )
				s.o.beforeHide.call( s.e, s );
			
			// Remove the control button already present
			e.find('[data-ctrl]').remove();
			
			switch( s.mode ){
				case 'chars':
					
					// Get the text of the element and calculate the remaining chars
					var txt = $.trim(e.text());
					s.remaining['chars'] = txt.length - s.o.truncate;
					
					// Slice the text, hide the remaining text, add control button & update class
					if( txt.length > s.o.truncate ){
						e.data( 'tHTML', e.html() );
						txt = s.pad( txt.slice(0, s.o.truncate), txt.slice( s.o.truncate, txt.length) );
						e.html( txt ).removeClass( s.o.showClass ).addClass( s.o.hideClass );
						callback();
					}
					
				break;
				
				case 'words':
				
					// Get the no of words and calculate the remaining words
					var txt = $.trim(e.text()),
						stxt = txt.split( " " );

					s.remaining['words'] = stxt.length - s.o.truncate;
					
					// Slice the text, hide the remaining text, add control button & update class
					if( stxt.length > s.o.truncate ){
						e.data( 'tHTML', e.html() );
						txt = s.pad( stxt.slice( 0, s.o.truncate ).join( " " ), stxt.slice( s.o.truncate, stxt.length ).join( " " ) );
						e.html( txt ).removeClass( s.o.showClass ).addClass( s.o.hideClass );
						callback();
					}
				
				break;
				
				case 'lines':
					
					// Wrap inner element with a div
					if( e.children('div').length == 0 )
						e.wrapInner( '<div>' );
					
					// Calculate current height and new height
					var eWrap = e.children( 'div' ).css( 'height', '' );
					eWrap.html( eWrap.text() );
					var height = eWrap.height();
					
					// Calculate line height from a new element and store in data cache
					if( typeof e.data( 'lHeight' ) === 'undefined' ){
						temp = eWrap.clone();
						lHeight = temp.text( 'a' ).insertAfter( eWrap ).height();
						e.data( 'lHeight', lHeight );
						eWrap.next().remove();
					}else{
						lHeight = e.data( 'lHeight' );
					}
					
					// Calculate no of lines
					lines = height/lHeight;
					s.remaining['lines'] = lines - s.o.truncate;
					
					// Hide remaining lines and update class
					if( s.remaining['lines'] > 0 ){
						
						eWrap.css( 'overflow', 'hidden' );
						
						eWrap.animate({ 
							height : lHeight * s.o.truncate 
						}, speed ).data( 'tHeight', height );
						
						e.removeClass( s.o.showClass ).addClass( s.o.hideClass );
						
						if( e.find( '[data-ctrl]' ).length == 0 && !$.isFunction( s.o.controlBtn ) ){
							e.append( s.ctrlHtml );
						}
						
						callback();
						
					}
					
				break;
				
				case 'block':
					
					// Special function for block mode
					s.blockMode( e, 'hide', speed, callback );
				
				break;
				
			}
			
			// Update the status variable
			s.status = 0;
			
			// Update the events of the control button
			if( s.mode == 'block' ){
			
				e.unbind( 'click.coll' ).bind( 'click.coll', function( event ){
					event.preventDefault();
					s.show( e );
				});
			
			}else{
			
				s.ctrlBtn = $.isFunction( s.o.controlBtn ) ? s.o.controlBtn.call( s.e ) : $( e.find( '[data-ctrl]' ) );
				
				s.ctrlBtn.off('click.coll').on('click.coll', function( event ){
					event.preventDefault();
					s.show( e );
				}).html( s.o.showText );
				
				// Replace the %s with the remaining chars/words/lines count
				var sText = s.o.showText;
				var plural = {
					'chars' : [ 'character', 'characters' ],
					'words' : [ 'word', 'words' ],
					'lines' : [ 'lines', 'lines' ]
				};
				var toReplace = s.remaining[s.mode] + ( s.remaining[s.mode] == 1 ? ' ' + plural[s.mode][0] : ' ' + plural[s.mode][1] );
				
				sText = sText.replace('%s', toReplace);
				
				s.ctrlBtn.html( sText );
				
			}
			
		},
		
		// Method used by chars and word modes
		pad: function( a, b ){
			var s = this;
			return a + '<span class="coll-ellipsis">' + s.o.ellipsis + '</span>' + ( !$.isFunction( s.o.ctrlBtn ) ? s.ctrlHtml : '' ) + '<span class="coll-hidden" style="display:none">' + b + '</span>';
		},
		
		// Method for block mode
		blockMode: function( e, type, speed, cb ){
			
			var s = this,
				effects = [ 'fadeOut', 'slideUp', 'fadeIn', 'slideDown' ],
				inc = ( s.o.effect == 'fade' ) ? 0 : 1,
				effect = ( type == 'hide' ) ? effects[ inc ] : effects [ inc + 2 ];
						
			if( !$.isFunction( s.o.target ) ){
				if( $.fn[ s.o.target ] )
					$( e )[ s.o.target ]()[ effect ]( speed, cb );
			}else{
				s.o.target.call( s.e )[ effect ]( speed, cb );
			}
			
			if( type == 'show' ){
				e.removeClass( s.o.showClass ).addClass( s.o.hideClass );
				if( s.o.changeText )
					e.text( s.o.hideText );
			}else{
				e.removeClass( s.o.hideClass ).addClass( s.o.showClass );
				if( s.o.changeText )
					e.text( s.o.showText );
			}
			
		},
		
		reInit: function( e ){
			
			var s = this;
			
			// Remove the control button
			e.find( '[data-ctrl]' ).remove();
			
			// Switch the content to the original one
			if( s.mode == 'chars' || 'words' ){
				e.html( s.e.data( 'oCnt' ) );
			}
			
			// Collapse as per previous status
			if( s.status == 0 ) s.hide( e, 0 );
			else s.show( e, 0 );
			
		}
		
	};

		// Attach the object to the DOM
		$.fn[name] = function ( options ) {
				return this.each(function () {
						if (!$.data(this, name)) {
								$.data(this, name, new Collapser( this, options ));
						}
				});
		};

})( jQuery, window, document );

	$('.one').collapser({
		mode: 'block',
		target: 'next',
		effect: 'slide',
		beforeShow: function( ){
				$('.acc-head').each( function(){
						var dataVar = $(this).data('collapser'); 
						if( dataVar ) dataVar.hide( $(this) );
				});
		}
	});

	$('.two').collapser({
		mode: 'block',
		target: 'next',
		effect: 'slide',
		beforeShow: function( ){
			$('.acc-head').each( function(){
					var dataVar = $(this).data('collapser'); 
					if( dataVar ) dataVar.hide( $(this) );
			});
		}
	});

	$('.three').collapser({
		mode: 'block',
		target: 'next',
		effect: 'slide',
		beforeShow: function( ){
				$('.acc-head').each( function(){
						var dataVar = $(this).data('collapser'); 
						if( dataVar ) dataVar.hide( $(this) );
				});
		}
	});

});
