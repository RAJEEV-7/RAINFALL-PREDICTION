var gV = {
    toggled: true,
}


$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
        console.log("nav available");
    } else {
        console.log("no nav");
        geoFail();
    }
});

function success(data) {
    $("section").show();
    console.log(data.coords.latitude);
    getWeather(data.coords.latitude, data.coords.longitude);
    getLocationInfo(null, data.coords.latitude, data.coords.longitude);
}

function error(err) {
    console.log("error", err);
 
    geoFail();
}




function geoFail() {
    var input;
	 $("body").prepend('<div class="Search the location"><h1>Rainfall Prediction</h1><span><input type="text" name="input-field" autofocus placeholder="503111 or Kamareddy,Telangana"><button type="button" name="search"><i class="fa fa-search" aria-hidden="true"></i> Search</button></span></div>');


    function proccessInput() {

        input = document.getElementsByName("input-field")[0].value;
        var re = new RegExp(/\d{6}/, "gi") 
        var matched = input.match(re) 
        if (matched != null) {
            
            getLocationInfo(matched[0]);
            console.log(matched[0]);
        } else {
       
            var new_arr = input.split(",");
            console.log(new_arr);
            getLocationInfo(null, null, null, new_arr);
        }
    }

    $("button").click(function() {
        proccessInput();
    });
    $(window).keypress(function(event) {
        var code = event.which;
        if (code === 13) {
            proccessInput();
        }
    });
}


function getLocationInfo(zip,lat,lon,name) {
    var locationName;
    if (zip) {
        console.log("user searched by zip");
       
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyCuugDMliUtuYZ1tT2PZbgB_LMvOYi0wFU", (loc) => {
            locationName = loc.results[0].formatted_address;
            processCityName(locationName);
           
            getWeather(loc.results[0].geometry.location.lat,loc.results[0].geometry.location.lng);
        })
    } else if (zip === null && lat && lon) {
        console.log("user used nav");
       
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyCuugDMliUtuYZ1tT2PZbgB_LMvOYi0wFU", (info) => {
            for (var i=0;i < info.results.length; i++) {
                for (var j=0;j<info.results[i].types.length; j++) {
                    if (info.results[i].types[j]=="locality") {
                        locationName = info.results[i].formatted_address;
                        processCityName(locationName);
                    }
                }
            }
        });
    }
  
    else if (zip === null && lat === null && lon ===null && name) {
        console.log("user searched by name");
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + name[0] + "+" + name[1] + "&key=AIzaSyCuugDMliUtuYZ1tT2PZbgB_LMvOYi0wFU", (loc) => {
            locationName = loc.results[0].formatted_address;
            processCityName(locationName);
            getWeather(loc.results[0].geometry.location.lat, loc.results[0].geometry.location.lng);
        });
    }

 
    function processCityName(location) {
 
        location = location.split(",");
          for(var f =0; f < location.length -2; f++) {
            location.pop();
            }
        location = location.join(", ");
 
        var locP = document.getElementById('location');
        locP.innerText = location;
    }
}


function getWeather(lat,lon) {

  
    $.getJSON("https://api.forecast.io/forecast/b59cb056ae86ddcff4531258c647bf0d/" + lat + "," + lon + "?callback=?",
        function(wData) {
            console.log(wData);
            $(".location-search").hide();


            var current_icon = wData.currently.icon.toUpperCase();

            var skycon = new Skycons({
                "color": "black"
            });
            var windIcon = new Skycons({
              "color": "black"
            });
            var rainIcon = new Skycons({
              "color": "black"
            });
	

            skycon.add("skycon",current_icon);
            rainIcon.add("rain-canvas","rain");
            windIcon.add("wind-canvas","wind");


            skycon.play();
            windIcon.play();
            rainIcon.play();


            var rainProb = wData.currently.precipProbability*100;
            var windSpeed = Math.round(wData.currently.windSpeed);
            var app_temp = Math.round((wData.currently.apparentTemperature)*0.92);

            tempScale(wData.currently.temperature);
            tempToggle(wData.currently.temperature, app_temp, wData.daily.data);

            $("#description").html(wData.currently.summary);
            $("#rain").html(rainProb + "%");
            $("#wind").html(windSpeed + " Mph");
            $("#app-temp").html("Feels like: " + app_temp + "&deg;F");
            populateForecast(wData.daily.data);

            $("section").show();

            setTempPosition();
        });
}

function populateForecast(forecast_arr) {
    var date;
    var day_arr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var forecast_days;
    var height;
    var temp;
    var color;


    date = new Date;
    date = date.getDay();


    for (var i=1;i<=5;i++) {
        forecast_days =date+i;
        if (forecast_days>6) {
            forecast_days-=7;
        }
        $(".day-container" + i + " p").html(day_arr[forecast_days]);

        var mini_icon = new Skycons({
            "color": "black"
        })
        mini_icon.add("canvas" + i, forecast_arr[i].icon);
        mini_icon.play();

        $(".day-container" + i + " span").html(Math.round(forecast_arr[i].temperatureMax)+"&deg;F");

        temp = Math.round(forecast_arr[i].temperatureMax);
        if (temp >= 0 && temp < 60) {
            color = "#5daefe";
        } else if (temp >= 60 && temp < 80) {
            color = "#5dfeae";
        } else if (temp >= 80 && temp < 90) {
            color = "#feae5d";
        } else {
            color = "#fe5d5d";
        }
        height = forecast_arr[i].temperatureMax;
        $(".day-container" + i + " .mini-fill").css({
            "height": height,
            "background-color": color
        });
    }
}

function tempToggle(tempInF,app_temp,forecast_arr) {
    tempInF = Math.round(tempInF);
    var tempInC = Math.round((tempInF-32)*(5/9));
    var app_tempInC = Math.round((app_temp-32)*(5/9));
    var tempElement = document.getElementById('temp');
    tempElement.innerText=tempInF;
    tempElement.innerHTML+="&deg;F";

    $("#temp").click(function() {
        if (gV.toggled===true) {
          $("#app-temp").html("Temp Feels like:"+ app_tempInC+"&deg;C");

            tempElement.innerText = tempInC;
            tempElement.innerHTML += "&deg;C";
            for (var i = 1; i <= 5; i++) {
                tempC = Math.round((forecast_arr[i].temperatureMax-32)*(5/9));
                $(".day-container" + i + " span").html(tempC+"&deg;C");
            }
            gV.toggled = false;
        } 
        else if (gV.toggled === false) {
          $("#app-temp").html("Temp Feels like: "+(app_temp)+"&deg;F");

            tempElement.innerText = tempInF;
            tempElement.innerHTML += "&deg;F";
            for (var j=1;j<= 5;j++) {
                $(".day-container" + j + " span").html(Math.round(forecast_arr[j].temperatureMax)+"&deg;F");
            }
            gV.toggled = true;
        }
    });
}



function tempScale(temp) {
  
    var fill_height = Math.round(temp*1.7);
    var color;
    temp = Math.round(temp);

    var applyCSS = () => {
        $("#fill").css({
            "background-color":color,
            "height":fill_height
        });
      }

    if(temp>=0&&temp<60) {
        color = "#5daefe";
        applyCSS();
    } else if(temp>=60&&temp<80) {
        color = "#def200";
        applyCSS();
    } else if(temp>=80&&temp<90) {
        color = "#eded07";
        applyCSS();
    } else{
        color = "#ff0000";
        applyCSS();
    }
}

function setTempPosition() {
  var arrowLoc = $("#fill").offset();
  var p_height = $("#temp").height();
  var scale_width = $(".scale").width();
  console.log(arrowLoc);
  $(".temp").offset({top:arrowLoc.top-p_height/2,left:arrowLoc.left+scale_width});
   $("#temp").offset({top:arrowLoc.top-p_height/2,left:arrowLoc.left+scale_width+40})
}