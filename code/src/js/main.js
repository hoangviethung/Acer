// Define functions
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
			activeWhenScrollTo();
			let target = $(this).attr("data-href")
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

class Design {
	constructor(imageNavSelector, textSelector, resultSelector) {
		if (imageNavSelector != undefined && textSelector != undefined && resultSelector != undefined) {
			this.imageNavSelector = imageNavSelector;
			this.textSelector = textSelector;
			this.resultSelector = resultSelector;
			this.textSelector;
			// this.enableTextInputCanBeEdited();
			this.setHeightImageItem();
			this.changeImage();
			this.changeText();
			// this.download();
			this.changeStyle();
			this.nextBlock();
		}
	}
	// enableTextInputCanBeEdited() {
	// 	document.querySelector(this.textSelector).contentEditable = true;
	// }
	changeImage() {
		if (document.querySelector(this.imageNavSelector) != null) {
			let images = document.querySelector(this.imageNavSelector).querySelectorAll(".img-item")
			Array.prototype.forEach.call(images, function (el, index) {

				let current = index;
				el.addEventListener('click', function () {
					el.classList.add("active")
					let imageUrl = el.querySelector("img").getAttribute("data-src")
					document.querySelector("#result-img img").setAttribute('src', imageUrl)
					let imagesNotClicked = Array.prototype.filter.call(images, function (value, index) {
						return current !== index
					})
					Array.prototype.forEach.call(imagesNotClicked, function (el) {
						el.classList.remove("active")
					})
				})
			})
		}
	}
	setHeightImageItem() {
		if (document.querySelector(this.imageNavSelector) != null) {
			let images = document.querySelector(this.imageNavSelector).querySelectorAll(".img-item")
			Array.prototype.forEach.call(images, function (el) {
				el.style.height = el.offsetWidth + "px"
			})
			window.addEventListener("resize", function () {
				Array.prototype.forEach.call(images, function (el) {
					el.style.height = el.offsetWidth + "px"
				})
			})
		}
	}
	changeText() {
		if (document.querySelector(this.textSelector) != null) {
			let textInput = document.querySelector(this.textSelector)
			let maxLength = textInput.getAttribute("maxlength")
			textInput.addEventListener("keyup", function (event) {
				let text = textInput.value
				// let realText = textInput.textContent
				let currentLength = text.length
				if (currentLength > 255) {
					let backText = document.querySelector("#result-text").innerHTML
					textInput.innerHTML = backText
				} else {
					let stringLengthLeft = maxLength - currentLength
					document.querySelector("#result-text").innerHTML = text
					document.querySelector("#string-length-left").innerHTML = stringLengthLeft
				}
			})
			textInput.addEventListener("paste", function (e) {
				let text = textInput.value
				// let realText = textInput.textContent
				let currentLength = text.length
				if (currentLength > 255) {
					let backText = document.querySelector("#result-text").innerHTML
					textInput.innerHTML = backText
				} else {
					let stringLengthLeft = maxLength - currentLength
					document.querySelector("#result-text").innerHTML = text
					document.querySelector("#string-length-left").innerHTML = stringLengthLeft
				}
			})
		}
	}
	// download() {
	// 	if (document.querySelector("#download") != null) {
	// 		document.querySelector("#download").addEventListener("click", function () {
	// 			document.querySelector("#download").scrollTo({
	// 				'behavior': 'smooth',
	// 				'left': 0,
	// 				'top': 0
	// 			});
	// 			html2canvas(document.querySelector("#result")).then(canvas => {
	// 				let imgBase64 = canvas.toDataURL("image/png")
	// 				document.querySelector("#download-hidden").setAttribute("href", imgBase64)
	// 				document.querySelector("#download-hidden").click()
	// 			});
	// 		});
	// 	}
	// }
	changeStyle() {
		if (document.querySelectorAll("#style [data-style]").length > 0) {
			let styleItems = document.querySelectorAll("#style [data-style]")
			Array.prototype.forEach.call(styleItems, function (item, index) {
				let current = index;
				item.addEventListener("click", function (e) {
					let style = item.getAttribute("data-style")
					if (style == "Soft") {
						document.querySelector("#result-text-title").classList.remove("Stylish")
						document.querySelector("#result-text-title").classList.remove("Simple")
						document.querySelector("#result-text").classList.remove("Stylish")
						document.querySelector("#result-text").classList.remove("Simple")
						document.querySelector(".text-input label").classList.remove("Stylish")
						document.querySelector(".text-input label").classList.remove("Simple")
						document.querySelector(".text-input textarea").classList.remove("Stylish")
						document.querySelector(".text-input textarea").classList.remove("Simple")
					} else if (style == "Stylish") {
						document.querySelector("#result-text-title").classList.remove("Soft")
						document.querySelector("#result-text-title").classList.remove("Simple")
						document.querySelector("#result-text").classList.remove("Soft")
						document.querySelector("#result-text").classList.remove("Simple")
						document.querySelector(".text-input label").classList.remove("Soft")
						document.querySelector(".text-input label").classList.remove("Simple")
						document.querySelector(".text-input textarea").classList.remove("Soft")
						document.querySelector(".text-input textarea").classList.remove("Simple")
					} else {
						document.querySelector("#result-text-title").classList.remove("Soft")
						document.querySelector("#result-text-title").classList.remove("Stylish")
						document.querySelector("#result-text").classList.remove("Soft")
						document.querySelector("#result-text").classList.remove("Stylish")
						document.querySelector(".text-input label").classList.remove("Soft")
						document.querySelector(".text-input label").classList.remove("Stylish")
						document.querySelector(".text-input textarea").classList.remove("Soft")
						document.querySelector(".text-input textarea").classList.remove("Stylish")
					}

					document.querySelector("#result-text-title").classList.add(style)
					document.querySelector("#result-text").classList.add(style)
					document.querySelector(".text-input label").classList.add(style)
					document.querySelector(".text-input textarea").classList.add(style)
					item.classList.add("active")
					let styleItemsNotClicked = Array.prototype.filter.call(styleItems, function (value, index) {
						return current !== index
					})
					Array.prototype.forEach.call(styleItemsNotClicked, function (el) {
						el.classList.remove("active")
					})
				})
			})
			let styleCurrent = 0;
			let prev = document.querySelector("#style .prev")
			let next = document.querySelector("#style .next")
			styleItems[styleCurrent].click();
			prev.addEventListener("click", function () {
				if (styleCurrent <= 0) {
					styleCurrent = styleItems.length - 1
				} else {
					styleCurrent--;
				}
				styleItems[styleCurrent].click();
			})
			next.addEventListener("click", function () {
				if (styleCurrent >= styleItems.length - 1) {
					styleCurrent = 0
				} else {
					styleCurrent++;
				}
				styleItems[styleCurrent].click();
			})
		}

		if (document.querySelectorAll("#color [data-style]").length > 0) {
			let colorItems = document.querySelectorAll("#color [data-style]")
			Array.prototype.forEach.call(colorItems, function (item, index) {
				let current = index;
				item.addEventListener("click", function (e) {
					let style = item.getAttribute("data-style")
					if (style == "White") {
						document.querySelector("#result-text-title").classList.remove("Black")
						document.querySelector("#result-text").classList.remove("Black")
						document.querySelector(".text-input label").classList.remove("Black")
						document.querySelector(".text-input textarea").classList.remove("Black")
					} else {
						document.querySelector("#result-text-title").classList.remove("White")
						document.querySelector("#result-text").classList.remove("White")
						document.querySelector(".text-input label").classList.remove("White")
						document.querySelector(".text-input textarea").classList.remove("White")
					}
					document.querySelector(".text-input label").classList.add(style)
					document.querySelector(".text-input textarea").classList.add(style)
					document.querySelector("#result-text").classList.add(style)
					document.querySelector("#result-text-title").classList.add(style)
					item.classList.add("active")
					let colorItemsNotClicked = Array.prototype.filter.call(colorItems, function (value, index) {
						return current !== index
					})
					Array.prototype.forEach.call(colorItemsNotClicked, function (el) {
						el.classList.remove("active")
					})
				})
			})
			colorItems[0].click();
		}

	}
	nextBlock() {
		if (document.querySelectorAll("[data-to]") != null) {
			Array.prototype.forEach.call(document.querySelectorAll("[data-to]"), function (ele) {
				ele.addEventListener("click", function (e) {
					e.preventDefault();
					let target = parseInt(ele.getAttribute("data-to"))
					let stepList = document.querySelectorAll("[data-step]")
					Array.prototype.forEach.call(stepList, function (el) {
						el.classList.remove("active")
					})
					stepList[target].classList.add("active")
				})
			})
		}
	}
}

const customFancybox = () => {
	$("[data-fancybox='best-friend']").fancybox({
		touch: false,
		afterLoad: function () {
			let images = document.querySelector("#image-nav").querySelectorAll(".img-item")
			Array.prototype.forEach.call(images, function (el) {
				el.style.height = el.offsetWidth + "px"
			})
		},
		afterClose: function () {
			$(".best-friend-wrapper [data-step]").removeClass("active")
			$(".best-friend-wrapper [data-step]").eq(0).addClass("active")
		}
	})
}

const changeTopicID = () => {
	$("body").on("click", ".type-image-nav .type-image a", function () {
		$(this).addClass('active')
		$(this).siblings().removeClass("active")
		$("#loading-popup").addClass("show")
		setTimeout(() => {
			$("#loading-popup").removeClass("show")
		}, 1000);
	})
}

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
	try {
		document.getElementById("days").innerHTML = days;
		document.getElementById("hours").innerHTML = hours;
		document.getElementById("minutes").innerHTML = minutes;
		// If the count down is finished, write some text 
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("demo").innerHTML = "EXPIRED";
		}
	} catch (error) {

	}
}, 1000);



/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	var blob = new Blob(byteArrays, {
		type: contentType,
	});
	return blob;
}

function getInformation(params) {
	var result = new Promise((resolve, reject) => {
		html2canvas(document.getElementById("result")).then((canvas) => {
			document.querySelector("#download").scrollTo({
				'behavior': 'smooth',
				'left': 0,
				'top': 0
			});

			let imgBase64 = canvas.toDataURL("image/png")
			resolve(imgBase64)
		})
	})
	result.then(imageCanvas => {
		var ImageURL = imageCanvas;
		var block = ImageURL.split(";");
		// Get the content type
		var contentType = block[0].split(":")[1]; // In this case "image/gif"
		// get the real base64 content of the file
		var realData = block[1].split(",")[1];
		var blob = b64toBlob(realData, contentType);
		var topicIdSeletor = document.querySelector("[data-topic-id].active");
		var topicId;
		if (topicIdSeletor) {
			topicId = document.querySelector("[data-topic-id].active").getAttribute("data-topic-id")
		}
		var imageActiveDataSrc = document.querySelector("#image-nav .img-item.active img").getAttribute("data-src")
		var imageActiveFilename = imageActiveDataSrc.split(/(\\|\/)/g).pop()

		if (params == "download") {
			document.querySelector("#download-hidden").setAttribute("href", imageCanvas)
			document.querySelector("#download-hidden").click()
		} else {
			var formData = new FormData();
			formData.append('authorName', document.querySelector("#author").value)
			formData.append('content', document.querySelector("#text-input").value)
			formData.append('image', blob, imageActiveFilename)
			formData.append('topicId', topicId)
			formData.append('method', params)
			formData.append('formTitle', document.querySelector("#title").value)
			formData.append('formSendTo', document.querySelector("#send-to").value)
			formData.append('formContent', document.querySelector("#content").value)
			$.ajax({
				url: '/chia-se',
				method: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function (response) {
					if (response.Code == 400) {
						alert(response.Message)
					} else {
						console.log(response.Result);
						if (params == "shareFacebook") {
							var fullUrl = window.location.protocol + "//" + window.location.host + response.Result
							console.log(fullUrl);
							$("#facebook-share").append(`<div class="fb-share-button" data-href=${fullUrl} data-layout="button_count"></div>`)
							$("body").find("#facebook-share .fb-share-button").trigger("click")
						}
						// window.location.assign(response.Result)
					}
				},
				error: function () {
					alert("Có lỗi xảy ra!");
				}
			})
		}
	})
}
// End define functions

// Call functions
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
	customFancybox();
	changeTopicID();

	var des = new Design("#image-nav", "#text-input", "#result");

	$(".btn-sendinfo").on("click", function () {
		let method = $(this).attr("data-method")
		getInformation(method);
	})

	$(window).on("scroll", function () {
		activeWhenScrollTo();
	})

	$(document).ajaxComplete(function () {
		// Luôn luôn chậy polyfill cho thuôc tính object-fit: cover trên các phiên bản IE >= 9
		objectFitImages("img.ofc");
		// Luôn luôn addClass lazyload cho các hình ảnh có thuộc tính [data-src]
		addClassLazyload();
		des.setHeightImageItem()
		des.changeImage()
		document.querySelector("#image-nav").querySelectorAll(".img-item")[0].click()
	})
})

// End call functions