window.alert = function () { };
localStorage.removeItem("fastSearch");

$("body").ready(function () {
    console.log("CSV Admin - 1.0 - Dashboard");

    $.ajax({
        url: "sidebar.html",
        context: document.body
    }).done(function (data) {
        $(data).insertBefore("#content-wrapper");
        

        $.ajax({
            url: "topbar.html",
            context: document.body
        }).done(function (data) {
            $(data).insertBefore("#page-content");
            loadFunctionality();
        });

    });



    $(".closeCard").on("click", function () {
        this.parentNode.parentNode.childNodes[3].classList.add("hidden");
    });
  
});

function loadFunctionality() {
    

    try {
        setLocalSideBarStyle()
    } catch (error) {
       console.warn("No local sidebar style..."); 
    }

    loadFastSearch();
    $("#fastSearch").keyup(async function () {
//        console.log({ x });

        let query = JSON.parse(localStorage.getItem("fastSearch"));

        await Promise.all(query.map(async (file) => {

            

            if (file.title.search(this.value)) {
                console.log(true);
                console.log(file.title);
            } else { console.log(true); }

        }));

    });


    $("#accordionSidebar").addClass('sideBarEnter');

    setTimeout(() => {
        $("nav.navbar").addClass('topBarEnter');

        setTimeout(() => {
            $("nav.navbar").addClass('shadow');
            
            setTimeout(() => {
                $("#page-content").fadeIn("slow", function () {
                    // Animation complete
                });
            }, 300);
            
        }, 300);
    }, 500);
    
    
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $('.sidebar .collapse').collapse('hide');
        };

        // Toggle the side navigation when window is resized below 480px
        if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
            $("body").addClass("sidebar-toggled");
            $(".sidebar").addClass("toggled");
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
        if ($(window).width() > 768) {
            let e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function () {
        let scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function (e) {
        console.log("scroll");
        let $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });
    
}

function loadFastSearch() {
    $.ajax({
        type: 'GET',
        url: './app/scandir.php',
        dataType: 'json',
        async: false,
        beforeSend: function () {
            console.info("Loading fast search...");
        },
        success: async function (response) {
            await Promise.all(response.map(async (file) => {
                const contents = await $.get("./app/data/" + file, async function () { }, 'json');
                storeInLocalStorage(contents);
            }));

        },
        error: function (request, status, error) {
            console.warn(request.responseText);
        }
    }).done(async function () {  });

}

function storeInLocalStorage(args) {
    let dataJsons = localStorage.getItem("fastSearch");
    dataJsons = dataJsons ? JSON.parse(dataJsons) : [];
    args.forEach(index => {
        dataJsons.push(index);
    });
    localStorage.setItem("fastSearch", JSON.stringify(dataJsons));
}




