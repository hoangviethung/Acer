// Function thêm class lazyload vào các thẻ <img> có thuộc tính [data-src]
const addClassLazyload = () => {
	let imgList = document.querySelectorAll("img[data-src]")
	Array.prototype.forEach.call(imgList, function (el, i) {
		if (el.className.length > 0) {
			el.className = el.className + " lazyload"
		} else {
			el.className = "lazyload"
		}
	});
}

const videoGallery = () => {
	return new Swiper(".home-video-gallery .swiper-container", {
		slidesPerView: 3,
		centeredSlides: true,
		loopedSlides: 5,
		loop: true,
		spaceBetween: 0,
		speed: 1200,
		navigation: {
			prevEl: ".home-video-gallery .swiper-container .prev",
			nextEl: ".home-video-gallery .swiper-container .next"
		}
		// on: {
		// 	init: function () {
		// 		$(".home-video-gallery .swiper-container .img").each(function () {
		// 			$(this).height($(this).width() / 1.77)
		// 		})
		// 	},
		// 	resize: function () {
		// 		$(".home-video-gallery .swiper-container .img").each(function () {
		// 			$(this).height($(this).width() / 1.77)
		// 		})
		// 	}
		// }
	})
}


const countDown = () => {
	// Set the date we're counting down to
	var countDownDate = new Date("Aug 24, 2019 23:59:59").getTime();

	// Update the count down every 1 second
	var x = setInterval(function () {

		// Get today's date and time
		var now = new Date().getTime();

		// Find the distance between now and the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		// var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in the element with id="demo"
		document.getElementById("days").innerHTML = days;
		document.getElementById("hours").innerHTML = hours;
		document.getElementById("minutes").innerHTML = minutes;

		// If the count down is finished, write some text 
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("demo").innerHTML = "EXPIRED";
		}
	}, 1000);
}


const headerClickToScroll = () => {
	$(".header-wrapper ul a").each(function () {
		$(this).on("click", function (e) {
			e.preventDefault();
			activeWhenScrollTo();
			let target = $(this).attr("href")
			let pos = $(target).offset().top;
			$("html,body").animate({
				scrollTop: pos
			}, 1200)
		})
	})
}

const activeWhenScrollTo = () => {
	$(".home").each(function () {
		let target = $(this).attr("id");
		target = "#" + target;
		let pos = $(this).offset().top - 200
		if ($(window).scrollTop() > pos) {
			$(".header-wrapper ul a[href='" + target + "']").parent().addClass("active")
			$(".header-wrapper ul a[href='" + target + "']").parent().siblings("li").removeClass("active")
		}
	})
}

$(document).ready(function () {
	// Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
	objectFitImages("img.object-fit-cover");
	// Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
	addClassLazyload();
	// countDown();
	headerClickToScroll();
	activeWhenScrollTo();
	videoGallery();
})

$(window).on("scroll", function(){
	activeWhenScrollTo();
})


$(document).ajaxComplete(function () {
	// Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
	objectFitImages("img.object-fit-cover");
	// Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
	addClassLazyload();
})