/**
 * @author Shaumik Daityari
 * @copyright Copyright © 2013 All rights reserved.
 */

var lazyload = lazyload || {};

// Секция 1: Lazy load для основного контента
(function($, lazyload) {
    "use strict";

    var section1 = {
        page: 2,
        buttonId: "#fbtn-section1",
        loadingId: "#loading-div-section1",
        container: "#data-container-section1"
    };

    lazyload.loadSection1 = function() {
        var url = "./" + section1.page + ".html";

        $(section1.buttonId).hide();
        $(section1.loadingId).show("slow");

        $.ajax({
            url: url,
            success: function(response) {
                if (!response || response.trim() == "NONE") {
                    $(section1.buttonId).fadeOut("slow");
                    $(section1.loadingId).text("No more entries to load!");
                    return;
                }
                appendContentSection1(response);
            },
            error: function() {
                $(section1.loadingId).text("Извините, произошла ошибка при обработке запроса. Пожалуйста, обновите страницу.");
                $(section1.buttonId).show("slow");
            }
        });
    };

    function appendContentSection1(response) {
        $(response).appendTo($(section1.container));
        $(section1.buttonId).show("slow");
        $(section1.loadingId).hide("slow");
        section1.page += 1;
    }

})(jQuery, lazyload);

// Секция 2: Lazy load для дополнительного контента
(function($, lazyload) {
    "use strict";

    var section2 = {
        page: 2,
        buttonId: "#fbtn-section2",
        loadingId: "#loading-div-section2",
        container: "#data-container-section2"
    };

    lazyload.loadSection2 = function() {
        var url = "./" + section2.page + "-section2.html"; // отдельный URL для секции 2

        $(section2.buttonId).hide();
        $(section2.loadingId).show("slow");

        $.ajax({
            url: url,
            success: function(response) {
                if (!response || response.trim() == "NONE") {
                    $(section2.buttonId).fadeOut("slow");
                    $(section2.loadingId).text("No more entries to load!");
            return;
        }
        appendContentSection2(response);
    },
    error: function() {
        $(section2.loadingId).text("Извините, произошла ошибка при обработке запроса. Пожалуйста, обновите страницу.");
        $(section2.buttonId).show("slow");
    }
});
};

function appendContentSection2(response) {
    $(response).appendTo($(section2.container));
    $(section2.buttonId).show("slow");
    $(section2.loadingId).hide("slow");
    section2.page += 1;
}

})(jQuery, lazyload);
