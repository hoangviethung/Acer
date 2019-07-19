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
		observer: true,
		observeParents: true,
		speed: 1200,
		loop: true,
		navigation: {
			prevEl: ".home-video-gallery .swiper-container .prev",
			nextEl: ".home-video-gallery .swiper-container .next"
		},
		breakpoints: {
			1025: {
				slidesPerView: 1,
			}
		}
	})
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
			$("#header-menu").toggleClass("show")
			if ($("#header-menu").hasClass("show")) {
				$("#mobile-toggle").addClass("close")
			} else {
				$("#mobile-toggle").removeClass("close")
			}
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

const changeClassToSlider = (bp) => {
	let classContainer = document.querySelectorAll("#home-2 .home-2-container");
	let classWrapper = document.querySelectorAll("#home-2 .home-2-wrapper");
	let classSlide = document.querySelectorAll("#home-2 .home-2-container .home-2-slide");
	if (bp.matches) {
		Array.prototype.forEach.call(classContainer, el => {
			el.classList.remove("mobile-content");
			el.classList.add("swiper-container");
		})
		Array.prototype.forEach.call(classWrapper, el => {
			el.classList.remove("row");
			el.classList.remove("no-gutters");
			el.classList.add("swiper-wrapper");
		})
		Array.prototype.forEach.call(classSlide, el => {
			el.classList.remove("col-lg-4");
			el.classList.add("swiper-slide");
		})

		let home2SLider = new Swiper("#home-2 .home-2-container", {
			slidesPerView: 1,
			on: {
				init: () => {
					Array.prototype.forEach.call(classSlide, el => {
						el.style.height = document.querySelector("#home-2 .home-2-container").offsetHeight + "px"
					})
				}
			},
			pagination: {
				el: "#home-2 .home-2-container .home-2-dots",
				clickable: true,
				speed: 1200,
			}
		})
	} else {
		Array.prototype.forEach.call(classContainer, el => {
			el.classList.add("mobile-content");
			el.classList.remove("swiper-container");
			el.removeAttribute("style");
		})
		Array.prototype.forEach.call(classWrapper, el => {
			el.classList.add("row");
			el.classList.add("no-gutters");
			el.classList.remove("swiper-wrapper");
			el.removeAttribute("style");
		})
		Array.prototype.forEach.call(classSlide, el => {
			el.classList.add("col-lg-4");
			el.classList.remove("swiper-slide");
			el.removeAttribute("style");
		})
	}
}

const mobileMenuToggle = () => {
	$("#mobile-toggle").on("click", function () {
		$("#header-menu").toggleClass("show")
		if ($("#header-menu").hasClass("show")) {
			$(this).addClass("close")
		} else {
			$(this).removeClass("close")
		}
	})
}

const checkBreakpoint = () => {
	let bp = window.matchMedia("(max-width: 1024px)");
	changeClassToSlider(bp);
	bp.addListener(changeClassToSlider);
}

const setHeightMobile = () => {
	let ClassArray = document.querySelectorAll(".home");
	Array.prototype.forEach.call(ClassArray, (el, i) => {
		if (i >> 1) {
			el.style.minHeight = window.innerHeight + "px"
		}
	})
}

$(document).ready(function () {
	// Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
	objectFitImages("img.ofc");
	// Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
	addClassLazyload();
	// countDown();
	headerClickToScroll();
	activeWhenScrollTo();
	videoGallery();
	checkBreakpoint();
	setHeightMobile();
	mobileMenuToggle();
})


$(window).on("scroll", function () {
	activeWhenScrollTo();
})


$(document).ajaxComplete(function () {
	// Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
	objectFitImages("img.ofc");
	// Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
	addClassLazyload();
})