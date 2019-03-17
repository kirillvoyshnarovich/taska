

var button_play = document.querySelector('.screen-2__video--button--img');
var button_close = document.querySelector('.video-button-close');
var bg_layer = document.querySelector('.bg-layer');
var body = document.querySelector('body');
var iframe = document.querySelector('.video-player').contentWindow;

var button_bottom = document.querySelector('.heading__button');

var button_navigation = document.querySelectorAll('.navigation__item');


button_bottom.addEventListener('click', function() {
    scrollTo(0,window.innerHeight)
})


function setPages(number) {
    for(var i=0; i<button_navigation.length; i++) {
        button_navigation[i].classList.remove('navigation__item_active')
    }
    button_navigation[number].classList.add('navigation__item_active')
}

// navigation
var previosPage = 0;
var direction;
window.onscroll = function(e) {
        var value = document.documentElement.clientHeight/2;
        var currentScroll = (document.documentElement.clientHeight + window.pageYOffset)/document.documentElement.clientHeight;
        var index = Math.round(currentScroll) - 1;

        if(index > previosPage) {
            var newIndex = (index > 2) ? 2 : index;
            setPages(newIndex)
        } else if(index < previosPage && window.pageYOffset < (document.documentElement.clientHeight)*index + value) {
            setPages(index)
        }
        
    previosPage = index;
    direction = document.documentElement.scrollTop

}

//player
button_play.addEventListener('click', function() {
    var paddingRight = window.innerWidth - document.documentElement.clientWidth
    bg_layer.classList.add('display-visible');
    body.classList.add('body-hidden');
    body.style.paddingRight = paddingRight+"px";
    scrollTo(0,window.innerHeight)
    setTimeout(() => {
        iframe.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}','*')
    }, 1000);
})
button_close.addEventListener('click', function() {
    function changeStyle() {
        bg_layer.classList.remove('display-visible');
        body.classList.remove('body-hidden')
        body.style.paddingRight = 0+"px";
    }
    iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}','*');
    setTimeout(() => {
        changeStyle()
    }, 500);
})


// sliders
function Slider(element) {
    this.element = document.querySelector(element)
    this.defineSlider()
}

Slider.prototype = {

    defineSlider: function() {
        if(this.element.classList.contains('slider-hidden')) {
            this.initHidden()
        } else {
            this.initСarousel()
        }
    },

    initHidden: function() {
        this.sliders = this.element.querySelectorAll('.slide');
        this.buttons = this.element.querySelectorAll('.controls__button');
        this.num = this.sliders.length -1;
        this.navigation('hidden');
    },

    initСarousel: function() {
        this.buttons = this.element.querySelectorAll('.controls__button');
        this.slides = this.element.querySelector('.slider__wrapper');
        this.numberSlider = this.element.querySelectorAll('.slide').length;
        this.computedStyle = getComputedStyle(this.slides);
        this.width = parseFloat(this.computedStyle.width);

        this.widthSlide =  Math.abs(this.width/this.numberSlider);
        this.navigation('carousel')
    },


    navigation: function(nameSlider) {
        if(nameSlider == 'carousel') {
            for(var i=0; i < this.buttons.length; i++ ) {
                this.controlsEvent(this.buttons[i])
            }
        } else {
            for(var i=0; i < this.buttons.length; i++ ) {
                this.controlsEventHidden(this.buttons[i])
            }
        }
    },

    controlsEventHidden:function(button) {
        var self = this;
        button.addEventListener('click', function(e) {
            var index;

            for(var i=0; i<self.sliders.length; i++) {
                if(self.sliders[i].classList.contains('active')){
                    index = parseFloat(self.sliders[i].getAttribute('data-index'));
                    self.sliders[i].classList.remove('active');
                }
            }
            if(this.classList.contains('previous-slide-button') ) {
                var value = (index -1 < 0) ? 0 : index -1;
                self.sliders[value].classList.add('active')
            } else {
                var value = (index +1 > self.num) ? self.num : index +1;
                self.sliders[value].classList.add('active')
            }
        })
    },

    controlsEvent: function(button) {
        var self = this;
        button.addEventListener('click', function(e) {

            var right = parseFloat(self.computedStyle.right);

             if(this.classList.contains('previous-slide-button') ) {
               var value = (right + self.widthSlide > 2*self.widthSlide) ? 2*self.widthSlide : right + self.widthSlide;
                self.slides.style.right = value+"px";

            } else{
                var value = (right - self.widthSlide < 0) ? 0 : right - self.widthSlide; 
                self.slides.style.right = value+"px";
            } 
        })
    }
}

document.addEventListener( "DOMContentLoaded", function() {
	var  sliderCarousel = new Slider( ".slider-carousel" );
});

document.addEventListener( "DOMContentLoaded", function() {
	var  sliderCarousel = new Slider( ".slider-hidden" );
});






