//base statements
//var SidewalksToggler = d3.select("#SidewalksToggler");
var l = "en", // default language
	cm = "none"; //default mode

var lang = {
	logo: { ru: "Улицы прогулок", en: "Walking Streets" },
	m: { ru: "м", en: "m"},
	db: { ru: "дБ", en: "dB"},
	lang: { ru: "English", en: "По-русски" },
	seen: { ru: "Просмотров статьи в июне", en: "Views of article  in Jun 2015"},
	about: { ru: "О проекте", en: "About" },
	disqus: { ru: "Обсуждение", en: "Discus" },
	footway: { ru: "Тротуар, дорожка", en: "Sidewalk, path" },
	path: { ru: "Пешеходная дорожка", en: "Path"},
	pedestrian: { ru: "Пешеходная улица", en: "Pedestrian street"},
	steps: { ru: "Лестница", en: "Steps" },
	cutting: { ru: "Путь без ступенек", en: "Stepless path" },
	crossing: { ru: "Пешеходный переход", en: "Crossing" },
	width: { ru: "Ширина", en: "Width"},
	surface: { ru: "Тип покрытия", en: "Surface" },
	photo: { ru: "Фото", en: "Photo"},
	unknown: { ru: "Неизвестно", en: "Unknown"},
	accessibility: { ru: "Доступность", en: "Accessibility"},
	accessible: { ru: "Доступно", en: "Accessible"},
	notaccessible: { ru: "Не доступно", en: "Not accessible"},
	limited: { ru: "Ограничено", en: "limited"},
	searchingPhotos: { ru: "Ищем фотографии рядом...", en: "Searching nearby photos..."},
	youCanHelpText: { ru: "Улучшить данные", en: "Improve data"},
	youCanHelpUrl: {
		ru: "http://walkstreets.org/help.html",
		en: "https://github.com/urbica/walkstreets/wiki/Contribute-the-project"
	},
	underConstruction: { ru: "На ремонте", en: "Under construction" },
	underConstructionDescription: { ru: "Эта пешеходная дорожка сейчас на ремонте, планируйте прогулку альтернативным маршрутом.", en: "This path is under construction, extremely uncomfortable walk here, avoid." },
	cycleway: { ru: "Велодорожка", en: "Bike lane" },
	lockedStation: { ru: ":-(", en: ":-(" },
	lockedStationDescription: { ru: "Велостанция не работает", en: "Bike station is unavailable"},
	available: { ru: "доступно", en: "available" },
	totalPlaces: { ru: "Всего мест", en: "Total places" },
	bike_parking: { ru: "Велопарковка", en: "Bike parking"},
	bike_shop: { ru: "Веломагазин", en: "Bycycle shop"}
};


var modes = [{
	id: "sidewalks",
	ru: "Тротуары",
	en: "Sidewalks"
}, {
	id: "accessibility",
	ru: "Доступная среда",
	en: "Accessibility"
}, {
	id: "noise",
	ru: "Шум на улице",
	en: "Street noise"
}, {
	id: "places",
	ru: "Популярные места",
	en: "Popular places"
}, {
	id: "velo",
	ru: "Велокарта",
	en: "Bike map"
}];

var pageTitles = {
	sidewalks: { ru: "Тротуары", en: "Sidewalks map" },
	accessibility: { ru: "Доступность среды", en: "Accessibility map" },
	noise: { ru: "Шум на улице", en: "Noise map" },
	places: { ru: "Интересные места", en: "Interesting places" },
	velo: { ru: "Велокарта", en: "Bike map" }
};

var layer_modes = {
	sidewalks_nodata: { mode: "sidewalks", layout: "sidewalks" },
	sidewalks_noone: { mode: "sidewalks", layout: "sidewalks" },
	sidewalks_alone: { mode: "sidewalks", layout: "sidewalks" },
	sidewalks_two: { mode: "sidewalks", layout: "sidewalks" },
	sidewalks_three: { mode: "sidewalks", layout: "sidewalks" },
	sidewalks_four: { mode: "sidewalks", layout: "sidewalks" },
	sidewalks_construction: { mode: "sidewalks", layout: "sidewalks_construction" },
	accessibility_shops: { mode: "accessibility", layout: "accessibility_point" },
	accessibility_tourism: { mode: "accessibility", layout: "accessibility_point" },
	accessibility_amenity: { mode: "accessibility", layout: "accessibility_point" },
	accessibility_building_yes: { mode: "accessibility", layout: "accessibility_point" },
	accessibility_building_no: { mode: "accessibility", layout: "accessibility_point" },
	accessibility_building_limited: { mode: "accessibility", layout: "accessibility_point" },
	accessibility_building_labels: { mode: "accessibility", layout: "accessibility_point" },
	steps_ramp: { mode: "accessibility", layout: "steps" },
	steps_no_ramp: { mode: "accessibility", layout: "steps" },
	steps_unknown: { mode: "accessibility", layout: "steps" },
	footway_incline: { mode: "accessibility", layout: "footway_incline" },
	noise: { mode: "noise", layout: "noise" },
	noise_labels: { mode: "noise", layout: "noise" },
	noise_online: { mode: "noise", layout: "noise" },
	noisemap_blue: { mode: "noise", layout: "noise_streets" },
	noisemap_green: { mode: "noise", layout: "noise_streets" },
	noisemap_orange: { mode: "noise", layout: "noise_streets" },
	noisemap_red: { mode: "noise", layout: "noise_streets" },
	wikipedia: { mode: "places", layout: "places" },
	wikipedia_labels: { mode: "places", layout: "places" },
	wikipedia_mini: { mode: "places", layout: "places" },
	cycleway: { mode: "velo", layout: "cycleway" },
	bike_points: { mode: "velo", layout: "bike_point"},
	bike_shops: { mode: "velo", layout: "bike_shop"},
	bike_parkings: { mode: "velo", layout: "bike_parking"}
};



var sidewalksDescriptions = {
	noone: {
		ru: "Вы с большим трудом протиснетесь на этой дорожке, она очень узкая, не разойтись.",
		en: "This path is too narrow, there is not good to walk."
	},
	alone: {
		ru: "На этой дорожке можно пройти одному, но если вы гуляете с компанией, придётся гулять гуськом.",
		en: "You can walk here alone. It is narrow sidewalk."
	},
	two: {
		ru: "Вполне удобно прогуливаться вдвоём, троим же будет немного тесно.",
		en: "This sidewalk is not sow wide and will be suitable for two."
	},
	three: {
		ru: "Компании из трёх человек будет удобно гулять и общаться на этой дорожке.",
		en: "This is good path to walk and will be suitable for three pedestrians."
	},
	four: {
		ru: "Дорожка широкая и удобная даже для компании из четырёх человек, легко разойтись с встречными пешеходами.",
		en: "This path wide and comfortable. You can walk with four and more people."
	}
},

accessibilityDescriptions = {
	no: {
		ru: "Заведение не доступно для детских колясок и маломобильных граждан.",
		en: "This venue is not accessible for wheelchairs and strollers."
	},
	yes: {
		ru: "Заведение доступно и для детских колясок и для маломобильных граждан.",
		en: "This venue is not accessible for wheelchairs and strollers."
	},
	limited: {
		ru: "Заведение доступно для детских колясок с некоторыми усилиями, а для маломобильных граждан это заведение недоступно.",
		en: "This venue is accessible for strollers, but wheelchair people can't enter here without assistance."
	},
	unknown: {
		ru: "К сожалению, нам пока неизвестно — доступно ли это заведение для колясок.",
		en: "Sorry, we don't know how accessible this place."
	}
},

stepsDescriptions = {
	no: {
		ru: "Эта лестница непригодна для любых видов колясок, тут нет никаких приспособлений.",
		en: "Not accessible for strollers and wheelchairs."
	},
	yes: {
		ru: "Этот съезд не содержит ступенек и доступен для всех видов колясок.",
		en: "It's accessible for strollers and wheelchairs"
	},
	limited: {
		ru: "Лестница имеет только рампу, и скорее всего, можно подняться/спуститься с детской коляской",
		en: "Limited Accessibility. TBD"
	},
	unknown: {
		ru: "К сожалению, нам пока неизвестно — доступна ли эта лестница для колясок.",
		en: "Sorry, we don't know how accessible this steps."
	}
},
accessibilityValues = {
	no: {
		ru: "Недоступно",
		en: "Not accessible"
	},
	yes: {
		ru: "Доступно",
		en: "Accessible"
	},
	limited: {
		ru: "Ограничено",
		en: "Limited"
	},
	unknown: {
		ru: "Неизвестно",
		en: "Unknown"
	}
},
noiseDescriptions = {
	blue: {
		ru: "Очень тихо и спокойно, можно гулять с маленьким ребёнком и он будет спать.",
		en: "It is very quiet place in the city. Little baby can sleep on the walk."
	},
	green: {
		ru: "Достаточно тихо на улице, можно спокойно общаться.",
		en: "It is quiet street. Good to walk and talk here."
	},
	orange: {
		ru: "Не так тихо, как хотелось бы. Требуется немного повысить голос, чтобы общаться на улице.",
		en: "A bit noisy here. You have to speak loud to talk while walking."
	},
	red: {
		ru: "Очень шумная улица. Нужно очень громко разговаривать чтобы друг друга услышать когда общаетесь.",
		en: "Very noisy and uncomfortable place. You have to be very loud when wou walking with somebody."
	}
};

//working with URL params
var Requests = {
    QueryString : function(item){
        var svalue = location.hash.match(new RegExp("[\#\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
    }
};

//Instagram API vars
var accessToken = '2008891651.9fedd4f.78bc300b785148d0a81a0d62ea8a81a7';


var shareFacebookLink = "http://www.facebook.com/share.php?u=http://walkstreets.org/",
shareTwitterLink = {
ru: "https://twitter.com/intent/tweet?text=Карта пешеходной среды в Москве от @urbicadesign http://walkstreets.org/",
en: "https://twitter.com/intent/tweet?text=Interactive study about pedestrian conditions in Moscow by @urbicadesign http://walkstreets.org/"
};
//getting language from URL hash param
if(Requests.QueryString("l")) {
	if(Requests.QueryString("l") == "ru") l = "ru";
	if(Requests.QueryString("l") == "en") l = "en";
} else  {
    var dlang = navigator.language || navigator.userLanguage;
    if(dlang=="ru" || dlang=="ru-RU") l = "ru";
}

mapboxgl.accessToken = 'pk.eyJ1IjoibWluaWthcm1hIiwiYSI6IjBhYjUzYWE4NjY4ZjkwYjM5Y2JjZTkyMTEwMzZkNTA1In0.zDqI_pymt9GAXoZlyz5Hrw';



mapboxgl.util.getJSON('styles/walkingstreets.json', function(err, style) {
	if (err) throw err;

	//statements
	var mapArea = d3.select("#map"),
		modesPanel = d3.select("#modesPanel"),
		layersBtn = d3.select("#layersBtn"),
		sidePanel = d3.select("#sidepanel"),
		tooltip = d3.select("#tooltip"),
		welcomeScreen = d3.select("#welcome-screen"),
		blackScreen = d3.select("#black-screen"),
		blackScreenDisqus = d3.select("#black-screen-disqus"),
		disqusScreen = d3.select("#disqus-screen");


	//setting controls
	d3.select("#head-about").on('click', function() {
		welcomeScreen.style({display: "block" });
		blackScreen.style({display: "block" });
		});

	//setting controls
	d3.select("#welcome-close").on('click', function() {
		welcomeScreen.style({display: "none" });
		blackScreen.style({display: "none" });
	});

	blackScreen.on('click', function() {
		welcomeScreen.style({display: "none" });
		blackScreen.style({display: "none" });
	});

	d3.select("#head-disqus").on('click', function() {
		disqusScreen.style({display: "block" });
		blackScreenDisqus.style({display: "block" });
		});
		//setting controls
	d3.select("#disqus-close").on('click', function() {
		disqusScreen.style({display: "none" });
		blackScreenDisqus.style({display: "none" });
	});

	blackScreenDisqus.on('click', function() {
		disqusScreen.style({display: "none" });
		blackScreenDisqus.style({display: "none" });
	});

	//setting the proper welcome screen visible
	d3.select("#welcome-about-"+l).style({ display: "block"});
	if(l == "ru") d3.select("#welcome-about-en").text("");
	if(l == "en") d3.select("#welcome-about-ru").text("");

	//setting the proper title for logo
	d3.select("#head-logo").text(lang.logo[l]);

	//setting proper lang title
	d3.select("#head-lang").text(lang.lang[l]);

	//setting proper about link
	d3.select("#head-about").text(lang.about[l]);

	//setting proper disqus link
	d3.select("#head-disqus-text").text(lang.disqus[l]);


	if( window.innerWidth <= 750) {
		modesPanel.on('click', function() {
			modesPanel.style({display: "none"});
			if(layersBtn.style("display") == "none") {
				layersBtn.style({display: "block"});
			}
		});

		layersBtn.on('click', function() {
			layersBtn.style({display: "none"});
			modesPanel.style({display: "block"});
		});

	}

	//build modes menu
	modes.forEach(function(mode, i) {
		modesPanel
			.append('div')
			.attr("id", mode.id)
			.attr("class", "mode-inactive")
			.text(mode[l])
			.on('click', function() {
				changeMode(mode.id);
			});
	});

	// Set the global transition property in the stylesheet
	style.transition = {
		duration: 600, //
		delay: 0
	};

//	in case of English making map in English
	if(l=="en") {
		style.constants["@name"] = "{name_en}";
		//style.constants["@name_w"] = "{name:en}";
	}


	//check for Mapbox WebGL support
	if(!mapboxgl.supported()) {
		d3.select("#notsupported-blackscreen").style({display: "block"});
		d3.select("#notsupported-screen").style({display: "block"});
		d3.select("#notsupported-"+l).style({display: "block"});
	}


	var map = new mapboxgl.Map({
		container: 'map',
		style: style,
		center: [Requests.QueryString("lat") ? Requests.QueryString("lat") : 55.7357, Requests.QueryString("lng") ? Requests.QueryString("lng") : 37.6276],
		zoom: Requests.QueryString("z") ? Requests.QueryString("z") : 14,
		minZoom: 12,
		maxZoom: 20
	});

	function setState() {
		var ll = map.getCenter(),
			z = map.getZoom();

		//setting hash
		location.hash = buildHash(l,ll.lat,ll.lng,z);

		d3.select("#head-lang").text(lang.lang[l])
		.on('click', function() {
			if(l=="en") {
				location.hash = buildHash("ru",ll.lat,ll.lng,z);
				window.location.reload();
			} else {
				location.hash = buildHash("en",ll.lat,ll.lng,z);
				window.location.reload();
			}
		});

		d3.select("#share-facebook-link").attr("href", shareFacebookLink + location.hash);
		d3.select("#share-twitter-link").attr("href", shareTwitterLink[l] + location.hash);

	}

	function buildHash(l,lat,lng,z) {
		var hsh;
		hsh = "#" + "l=" + l + "&lat=" + lat.toFixed(6) + "&lng=" + lng.toFixed(6) + "&z=" + z.toFixed(2);
		if(cm != "none") hsh += "&mode=" + cm;
		return hsh;
	}

	function getProperFeature(features) {
		var index;
		if(features.length > 0) {

			features.forEach(function(f,i){
				if(layer_modes[f.layer.id].mode == cm) index = i;
			});
		}
		return index;
	}

	function isThereProperFeature(features) {
		var proper = false;
		if(features.length > 0) {
			features.forEach(function(f,i){
				if(layer_modes[f.layer.id].mode == cm) {
					proper = true;
				}
			});
		}
		return proper;
	}

	map.on('mousemove', function(e) {
		map.featuresAt(e.point, {
			radius: 10
		}, function(err, features) {
			if (err) throw err;
			if (isThereProperFeature(features)) {
				d3.select(".mapboxgl-canvas").style({
					cursor: "pointer"
				});
				tooltip.style({
					visibility: "visible",
					left: (e.point.x + 10) + 'px',
					top: (e.point.y + 10) + 'px'
				});
			} else {
				d3.select(".mapboxgl-canvas").style({
					cursor: "-webkit-grab"
				});
				tooltip.style({
					visibility: "hidden"
				}).text("");
			}
		});
	});

	map.on('click', function(e) {
		map.featuresAt(e.point, {
			radius: 10
		}, function(err, features) {
			if (err) throw err;
			if (isThereProperFeature(features)) {

				getPanel(features[getProperFeature(features)],e.latLng);

				sidePanel.style({
					display: "block",
					'max-height': (window.innerHeight-90) + "px"
				});
			} else {
				sidePanel.style({
					display: "none"
				});
				sidePanel.text("");
			}

		});
	});


	//on map load animating modes panel background
	map.on('load', function(e) {
		var white = d3.rgb
		if(cm == "none") {
			modesPanel
				.transition()
				.duration(2000)
				.styleTween("background", function() { return d3.interpolate("#ffffff", "#ffff90"); })
					.transition()
						.duration(1000)
						.delay(1000)
						.styleTween("background", function() { return d3.interpolate("#ffff90", "#ffffff"); })
			;
		}
	});

	map.on('moveend', function(e) {
		setState();
	});


	map.on('style.load', function(e) {


	var noiseJSON = {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [37.6276, 55.7357]
          },
          "properties": {
            "title": "Mapbox DC",
            "marker-symbol": "noise-red"
          }
        }]
      }
    };


  	  $.ajax({
  	      url: 'https://api.instagram.com/v1/tags/noisemap/media/recent?count=500&access_token=' + accessToken,
  	      dataType: 'jsonp',
  	      type: 'GET',
  	      data: {client_id: accessToken},
  	      success: function(data){
  				if(data.data.length > 0) {
  	           	for(x in data.data){
  							if(data.data[x].location) {
								noiseJSON.data.features.push({
									"type": "Feature",
	          					  	"geometry": {
	            						"type": "Point",
	            						"coordinates": [data.data[x].location.longitude, data.data[x].location.latitude]
	          					  },
	          					"properties": {
									"level": getNoiseLevel(data.data[x].caption.text),
	            					"title": data.data[x].caption.text,
	            					"marker-symbol": "noise-red",
									"category": getNoiseCategory(getNoiseLevel(data.data[x].caption.text)),
									"image": data.data[x].images.low_resolution.url,
									"link": data.data[x].link

	          				  }
				});

						}
  					}
				    map.addSource("markers", noiseJSON);
				    map.addLayer({
				      "id": "noise_online",
				      "type": "symbol",
				      "source": "markers",
					  "interactive": true,
					  "layout": {
					      "visibility": "visible",
					      "icon-image": {
					          "stops": [
					            [
					              13,
					              "mini-noise-{category}"
					            ],
					            [
					              14,
					              "noise-{category}"
					            ]
					          ]
					        },
					    "icon-allow-overlap": true,
						"text-field": "{level} dB",
      					"text-font": "Open Sans Bold",
   						"text-padding": 10,
     					"text-letter-spacing": 0.05,
    					"text-max-width": 5,
      					"text-line-height": 1.2,
	  					"text-anchor": "top",
	  					"text-offset": [0,1],
	   					"text-allow-overlap": false,
	  					"text-optional": true
					    },
					    "paint": {
					  	  "icon-opacity": 0,
      					  "text-opacity": 0,
  	  					  "text-color": "@label",
  	  					  "text-size": 10
					    },
					    "paint.noise": {
					      "icon-opacity": 1,
      					  "text-opacity": 1,
      					  "text-color": "@label",
      					  "text-size": 10
					    }
				    });
  				}
  	    },
  	    error: function(data){
  	    }
  		});


		//	http://velobike.ru/proxy/parkings/

		/* VELOBIKES DATA */

		var veloJSON = {
	      "type": "geojson",
	      "data": {
	        "type": "FeatureCollection",
	        "features": [
					]
	      }
	    };

		$.ajax({
				url: 'http://velobike.ru/proxy/parkings/',
				dataType: 'json',
				type: 'GET',
//				data: {client_id: accessToken},
success: function(data){
	//console.log(data.Items);
if(data.Items.length > 0) {
			for(x in data.Items){
			if(data.Items[x].Position) {
			veloJSON.data.features.push({
				"type": "Feature",
								"geometry": {
								"type": "Point",
								"coordinates": [data.Items[x].Position.Lon, data.Items[x].Position.Lat]
							},
						"properties": {
				"title": data.Items[x].Address,
				"category": getVeloCategory(data.Items[x].FreePlaces, data.Items[x].TotalPlaces, data.Items[x].IsLocked),
				"FreePlaces": data.Items[x].FreePlaces,
				"Available": (data.Items[x].TotalPlaces - data.Items[x].FreePlaces),
				"IsLocked": data.Items[x].IsLocked,
				"TotalPlaces": data.Items[x].TotalPlaces
						}
});
	}
	}
	map.addSource("veloMarkers", veloJSON);
	map.addLayer({
		"id": "bike_points",
		"type": "symbol",
		"source": "veloMarkers",
	"interactive": true,
	"layout": {
			"visibility": "visible",
			"icon-image": {
					"stops": [
						[
							13,
							"mini-velo-{category}"
						],
						[
							14,
							"velo-{category}"
						]
					]
				},
		"icon-allow-overlap": true,
	"text-field": "{Available} / {TotalPlaces}",
			"text-font": "Open Sans Bold",
		"text-padding": 10,
		"text-letter-spacing": 0.05,
		"text-max-width": 5,
		"text-line-height": 1.2,
		"text-anchor": "top",
		"text-offset": [0,1],
		"text-allow-overlap": false,
		"text-optional": true
		},
		"paint": {
			"icon-opacity": 0,
				"text-opacity": 0,
				"text-color": "@label",
				"text-size": 10
		},
		"paint.velo": {
			"icon-opacity": 1,
				"text-opacity": { "stops": [[13,0],[14,1]] },
				"text-color": "@label",
				"text-size": 10
		}
	});
}
},
error: function(data){
}
			});


	});


	//getting mode from URL hash param
	if(Requests.QueryString("mode")) {
		changeMode(Requests.QueryString("mode"));
	} else {
		document.title = lang.logo[l];
	}


	function getPanel(feature, latLng) {


		//clear sidepanel
		sidePanel.text("");

		var title, category, value, description, youCanHelp,
			params = [],
			props = feature.properties,
			header = sidePanel.append('div')
				.attr("id", "panelheader"),
			photo = sidePanel.append('div')
				.attr("id", "panelphoto");


		//processing sidewalks data
		if(layer_modes[feature.layer.id].layout=="sidewalks") {
			title = lang[props.highway][l];
			//getting params of the object
			if(props.width_num) {
				if(props.width_num < 1.2)
					value = '→ ' + props.width_num + ' ' + lang.m[l] + ' ←';
				else
					value = '← ' + props.width_num + ' ' + lang.m[l] + ' →';
				description = sidewalksDescriptions[getSidewalkCategory(props.width_num)][l];
				header.attr("class", "sidewalk-"+getSidewalkCategory(props.width));
			}
			else {
				value = '← ' + lang.unknown[l] + ' →';
				header.attr("class", "sidewalk-unknown");
				youCanHelp = true;
			}

			//if is it crossing
			if(props.footway == "crossing") {
				title = lang.crossing[l];
				value = '';
			}

			getPhoto("mapillary", photo, latLng);
		}

		if(layer_modes[feature.layer.id].layout=="sidewalks_construction") {
			title = lang[props.highway][l];
			value = lang.underConstruction[l];
			description = lang.underConstructionDescription[l];
			header.attr("class", "sidewalk-construction");
		}
		//underConstructionDescription

		//processing accessibility data
		if(layer_modes[feature.layer.id].layout=="accessibility_point") {
			if (l == "en" && props['name:en'])
				title = props['name:en']
				else
					title = props.name;

			//filling the placecard values
			if(props.wheelchair) {
				value = accessibilityValues[props.wheelchair][l];
				description = accessibilityDescriptions[props.wheelchair][l];
				header.attr("class", "accessibility-"+props.wheelchair);
			} else {
				value = accessibilityValues.unknown[l];
				description = accessibilityDescriptions.unknown[l];
				header.attr("class", "accessibility-unknown");
				youCanHelp = true;
			}

			//getting the category
			if(feature.layer.id == "accessibility_amenity") { category = props.amenity; }
			if(feature.layer.id == "accessibility_tourism") { category = props.tourism; }
			if(feature.layer.id == "accessibility_shops") { category = props.shop; }

			getPhoto("mapillary", photo, latLng);
		}


		//template for steps
		if(layer_modes[feature.layer.id].layout=="steps") {
			title = lang.steps[l];
			console.log(props.ramp);

			if(props.ramp == "yes") {
				value = lang.limited[l];
				description = stepsDescriptions.limited[l];
				header.attr("class", "accessibility-limited");
				}
			if(props.ramp == "no") {
				value = lang.notaccessible[l];
				description = stepsDescriptions.no[l];
				header.attr("class", "accessibility-no");
			}
			if(props.ramp == "") {
				value = lang.unknown[l];
				description = stepsDescriptions.unknown[l];
				youCanHelp = true;
				header.attr("class", "accessibility-unknown");
			}
			getPhoto("mapillary", photo, latLng);
		}

		if(layer_modes[feature.layer.id].layout=="footway_incline") {
			title = lang.cutting[l];
			value = lang.accessible[l];
			description = stepsDescriptions.yes[l];
			header.attr("class", "accessibility-yes");
		}

		//templeate for cycleways
		if(layer_modes[feature.layer.id].layout=="cycleway") {
			title = lang.cycleway[l];
			value = '';
			description = '';
			//getPhoto("mapillary", photo, latLng);
		}

		//templeate for cycleways
		if(layer_modes[feature.layer.id].layout=="bike_point") {
			title = props.title;
			header.attr("class", "bikeshare-"+props.category);
			if(props.IsLocked) {
				value = lang.lockedStation[l];
				description = lang.lockedStationDescription[l];
			} else {
				value = (props.TotalPlaces-props.FreePlaces) + " " + lang.available[l];
				description = lang.totalPlaces[l] + ": " + props.TotalPlaces;
			}

			//getPhoto("mapillary", photo, latLng);
		}

		if(layer_modes[feature.layer.id].layout=="bike_shop") {
			title = props.name;
			description = lang.bike_shop[l];
		}

		if(layer_modes[feature.layer.id].layout=="bike_parking") {
			title = lang.bike_parking[l];
		}

		//template for noise points
		if(layer_modes[feature.layer.id].layout=="noise") {
			title = '';
			value =  props.level + ' ' + lang.db[l];
			description = noiseDescriptions[props.category][l];
			header.attr("class", "noise-"+props.category);

			photo.append("div")
				.append("img")
				.attr("src", props.image);
		}

		//values for noise_streets
		if(layer_modes[feature.layer.id].layout=="noise_streets") {
			title = props.name;
			value =  props.level + ' ' + lang.db[l];
			description = noiseDescriptions[getNoiseCategory(props.level)][l];
			header.attr("class", "noise-"+getNoiseCategory(props.level));



		}

		//processing places data
		if(layer_modes[feature.layer.id].layout=="places") {
			value = props.name;
			description = lang.seen[l] + ": " + props.seen;

			getPhoto("panoramio", photo, latLng);
		}

		//rendering title
		header.append('div')
			.attr("class", "header-title")
			.text(title);

		//rendering category
		if(category) {
		header.append('div')
			.attr("class", "header-category")
			.text(category);
		}

		//rendering value block
		header.append('div')
			.attr("class", "header-value")
			.text(value);

		header.append('div')
			.attr("class", "header-description")
			.text(description);

		//"You can help..." link
		if(youCanHelp) {
		header.append('div')
			.attr("class", "header-help")
			.append('a')
			.attr("href", lang.youCanHelpUrl[l])
			.attr("target", "_blank")
			.text(lang.youCanHelpText[l]);
		}

		//rendering params
		params.forEach(function(p,i) {
			sidePanel.append('div').attr("class", "param-line").text(p.name + ": " + p.value);
		});

	}

	function getPhoto(mode,photoblock, latLng) {
		photoblock.text(lang.searchingPhotos[l]);
		if(mode == "mapillary") {
			mapboxgl.util.getJSON('http://api.mapillary.com/v1/im/close?lat='+ latLng.lat +'&lon=' + latLng.lng + '&distance=20', function(err, mapillary) {
				if (err) throw err;
				photoblock.text("");

				if(mapillary.length > 0) {
					photoblock.text("");
				}


				mapillary.forEach(function(photo,i) {
				photoblock.append('iframe')
					.attr("src", "http://www.mapillary.com/jsapi/?image="+ photo.key + '&showMap=false')
					.attr("width", "320")
					.attr("height", "280");
				});


			});
		}

		if(mode == "panoramio") {

			//getting photos
			var myRequest = new panoramio.PhotoRequest({
			  'rect': {'sw': {'lat': latLng.lat-0.001, 'lng': latLng.lng-0.001}, 'ne': {'lat': latLng.lat+0.001, 'lng': latLng.lng+0.001}}
			});

			var myOptions = {
			  'width': 310,
			  'height': 310,
			  'croppedPhotos': true
			};

			panoramio.Cropping.TO_FILL = true;
			var widget = new panoramio.PhotoWidget('panelphoto', myRequest, myOptions);
			widget.setPosition(0);


		}

	}

	function changeMode(mode) {

		//switching off the panel
		sidePanel.style({
			display: "none"
		});
		//switching off menu highlights
		modes.forEach(function(m, i) {
			d3.select("#" + m.id).attr("class", "mode-inactive");
			d3.select("#legend-" + m.id).style({display: "none"});
		});

		if (mode != cm) {
			d3.select("#" + mode).attr("class", "mode-active");
			d3.select("#legend-" + mode).style({display: "block"});
			if(cm != "none") map.removeClass(cm); //remove style class from previous mode
			map.addClass(mode); //adding map style class for the selected mode
			cm = mode; //the layer switching off from the menu

		} else {
			map.removeClass(cm);
			cm = "none"; //setting current mode
		}

		//setting the proper page title
		if(cm != "none") {
			document.title = lang.logo[l] + " — " + pageTitles[cm][l];
		} else {
			document.title = lang.logo[l];
		}

		//setting URL params after mode changed
		setState();

	}

	function getSidewalkCategory(w) {
		var cat;
		if(w < 0.6) cat = "noone";
		if(w >= 0.6 && w < 1.2) cat = "alone";
		if(w >= 1.2 && w < 1.8) cat = "two";
		if(w >= 1.8 && w < 2.4) cat = "three";
		if(w >= 2.4) cat = "four";
		return cat;
	}

	function getNoiseCategory(c) {
		var cat;
		if(c < 60) cat = "blue";
		if(c>=60 && c < 70) cat = "green";
		if(c>=70 && c < 80) cat = "orange";
		if(c>=80) cat = "red";
		return cat;
	}

	function getVeloCategory(free, total, locked) {
		var result = "grey";
		var available = total - free;
		if(locked) { result =  "grey"; } else {
			if((available/total) <= 0.2) { result =  "red"; }
			if((available/total) > 0.2) { result =  "yellow"; }
			if((available/total) > 0.6) { result =  "green"; }
		}
		return result;
	}
	function getNoiseLevel(caption) {
		var lvl;
		lvl = caption.replace(/\D/g,'');
		return lvl;
	}

	function getTooltipHint(id, props) {
		return id;
	}

	function convertTime(time) {
		var date = new Date(parseInt(time)*1000);
		return(date.toString()); // Wed Jan 12 2011 12:42:46 GMT-0800 (PST)
	}


});
