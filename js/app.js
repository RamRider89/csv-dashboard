window.alert = function () { };
const MINS_DELY_FST_SEARCH = 15;

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
    let queryFastSearch;

    try {
        setLocalSideBarStyle()
    } catch (error) {
       console.warn("No local sidebar style..."); 
    }

    loadFastSearch();

    $("#fastSearch").one("keyup", function (ev) {
        ev.preventDefault();
        queryFastSearch = JSON.parse(localStorage.getItem("fastSearch"));
    });


    $("#fastSearch").keyup(async function (ev) {
        ev.preventDefault();
        if (this.value.length < 3) {
            $("#fastSearchResults").html('');
            return;
        }

        let diffMinutes;
        if (queryFastSearch != null) {
            diffMinutes = moment(queryFastSearch.date).diff(moment(), 'minutes')
            
            if (diffMinutes > MINS_DELY_FST_SEARCH) {
                loadFastSearch();
                queryFastSearch = JSON.parse(localStorage.getItem("fastSearch"));
            }
        }
        
        let queryArray = new Array();
        await Promise.all(queryFastSearch.data.map(async (file) => {

            if (file.title.toLowerCase().includes(this.value.toLowerCase())) {
                queryArray.push(file);
            } else { }

        }));

        //console.log(queryArray);
        showResultsFastSearch(queryArray);
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

    $(document).on('click', function (e) {
        $("#fastSearchResults").removeClass('show');
    });

    $("#fastSearchResults").on('click', function (e) {
        e.preventDefault();
    });

    
    
}

function loadFastSearch() {
    let dataJsons = localStorage.getItem("fastSearch");
    dataJsons = dataJsons ? JSON.parse(dataJsons) : [];

    let diffMinutes;
    if (dataJsons.length > 0) {
        diffMinutes = moment(dataJsons.date).diff(moment(), 'minutes');
    }
    if (diffMinutes < MINS_DELY_FST_SEARCH) {return;}
    localStorage.removeItem("fastSearch");

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

function showResultsFastSearch(query) {
    let html_string = '';
    let html_bottom = `<a class="dropdown-item text-center small text-gray-500" href="#">Todos los archivos</a>`;
    $("#fastSearchResults").html('');
    if (query.length < 1) {
        html_string = `<a class="dropdown-item d-flex align-items-center" href="#">
                                <div class="mr-3">
                                    <div class="icon-circle bg-secondary ">
                                        <i class="fas fa-file-csv text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="small text-gray-500"></div>
                                    <span class="font-weight-bold">Sin resultados.</span>
                                </div>
                            </a>`;
        $("#fastSearchResults").append(html_string);
    }else {
        Promise.all(query.map((file) => {
            html_string =  `<a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-secondary ">
                                            <i class="fas fa-file-csv text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">` + file.date + `</div>
                                        <span class="font-weight-bold">` + file.title + `</span>
                                    </div>
                                </a>`;

            $("#fastSearchResults").append(html_string);

        }));
    }

    $("#fastSearchResults").append(html_bottom);
    $("#fastSearchResults").addClass('show');
}

function storeInLocalStorage(args) {
    let dataJsons = localStorage.getItem("fastSearch");
    dataJsons = dataJsons ? JSON.parse(dataJsons) : { date: new Date(), data: []};
    args.forEach(index => {
        dataJsons['data'].push(index);
    });
    localStorage.setItem("fastSearch", JSON.stringify(dataJsons));
}




