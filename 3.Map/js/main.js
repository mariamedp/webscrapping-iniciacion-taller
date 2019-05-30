fetch('https://www.idealista.com/ajax/listingcontroller/listingmapajax.ajax?locationUri=madrid%2Fretiro%2Fpacifico&typology=1&operation=2&freeText=&zoom=15&northEast=40.41882314534578%2C+-3.6615205554198837&southWest=40.38944412113415%2C+-3.69756944458004&uid=5sog5k6ba466f25qu404vwckqe8vbik5d813pun8zdqi&adfilter_pricemin=default&adfilter_price=default&adfilter_area=default&adfilter_areamax=default&adfilter_amenity=default&adfilter_homes=&adfilter_chalets=&adfilter_countryhouses=&adfilter_duplex=&adfilter_penthouse=&adfilter_rooms_0=&adfilter_rooms_1=&adfilter_rooms_2=&adfilter_rooms_3=&adfilter_rooms_4_more=&adfilter_baths_1=&adfilter_baths_2=&adfilter_baths_3=&adfilter_newconstruction=&adfilter_goodcondition=&adfilter_toberestored=&adfilter_housingpetsallowed=&adfilter_hasairconditioning=&adfilter_wardrobes=&adfilter_lift=&adfilter_flatlocation=&adfilter_parkingspace=&adfilter_garden=&adfilter_swimmingpool=&adfilter_hasterrace=&adfilter_boxroom=&adfilter_top_floor=&adfilter_intermediate_floor=&adfilter_ground_floor=&adfilter_agencyisabank=&adfilter_published=default&onlySavedAds=false')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        localStorage.setItem('data', JSON.stringify(data));
        console.log(data);

    });


var map = L.map('map').setView([40.4034295, -3.688168], 13);

L.esri.basemapLayer('Streets').addTo(map);