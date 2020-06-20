$(function () {
    var appMode = false;
    var maintimeCounter = 0;
    var laptimeCounter = 0;
    var action;
    var lapNum = 0;
    var maintimeMinute, maintimeSecond, maintimeCentisecond, lapMinute, lapSecond, lapCentisecond;
    $("#start").click(function () {
        appMode = true;
        displayButtons(["#stop", "#lap", "#reset"], [this, "#resume"]);
        counter();
    });

    $("#stop").click(function () {
        appMode = true;
        displayButtons(["#resume", "#reset"], ["#start", "#lap", this]);
        clearInterval(action);
    });

    $("#resume").click(function () {
        appMode = true;
        displayButtons(["#stop", "#lap", "#reset"], ["#start", this]);
        counter();
    });

    $("#lap").click(function () {
        if (appMode == true) {
            laptimeCounter = 0;
            lap();
            displayButtons(["#stop", "#lap", "#reset", "#lapTime"], ["#start", "#resume"]);
        }
    });

    $("#reset").click(function () {
        location.reload();
    });

    function lap() {
        lapNum++;
        var lapContent =
            "<div id='LapTable'>" +
            "<div id='lapcontentHeader'>Lap " + lapNum + "</div>" +
            "<div id='lapcontentTime'>" + "<span>" + format(lapMinute) + "</span> :" +
            "<span>" + format(lapSecond) + "</span> :" +
            "<span>" + format(lapCentisecond) + "</span>" + "</div>" +
            "</div>";
        $(lapContent).prependTo("#lapContent");
    }

    function counter() {
        action = setInterval(function () {
            maintimeCounter++;
            laptimeCounter++;
            updateTimer();
        }, 10);
    }

    function updateTimer() {
        maintimeMinute = Math.floor(maintimeCounter / 6000);
        if (maintimeMinute > 99) {
            maintimeCounter = 0;
        }
        maintimeSecond = Math.floor((maintimeCounter % 6000) / 100);
        maintimeCentisecond = Math.floor((maintimeCounter % 6000) % 100);
        $("#mainMinute").html(format(maintimeMinute));
        $("#mainSecond").html(format(maintimeSecond));
        $("#mainCentisecond").html(format(maintimeCentisecond));

        lapMinute = Math.floor(laptimeCounter / 6000);
        if (lapMinute > 99) {
            laptimeCounter = 0;
        }
        lapSecond = Math.floor((laptimeCounter % 6000) / 100);
        lapCentisecond = Math.floor((laptimeCounter % 6000) % 100);
        $("#lapMinute").html(format(lapMinute));
        $("#lapSecond").html(format(lapSecond));
        $("#lapCentisecond").html(format(lapCentisecond));
    }

    function format(num) {
        if (num < 10) {
            return ('0' + num);
        } else {
            return (num);
        }
    }

    function displayButtons(a1, a2) {
        for (i = 0; i < a1.length; i++) {
            $(a1[i]).show();
        }
        for (i = 0; i < a2.length; i++) {
            $(a2[i]).hide();
        }
    }
});
