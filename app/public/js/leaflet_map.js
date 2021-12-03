let url = 'http://api.open-notify.org/iss-now.json';

var facts = Array(
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique risus mauris, accumsan convallis lorem commodo nec. Vivamus a risus semper, pulvinar tortor ac, molestie nulla.'
);
var randomFact = facts[Math.floor(Math.random() * facts.length)]

var map;
var ISSIcon;
var ISSmarker;

fetch(url)
.then(res => res.json())
.then((out) => {
	ISSIcon = L.icon({
		iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/320px-International_Space_Station.svg.png',
		iconSize:     [64, 64], // size of the icon
		iconAnchor:   [32, 32], // point of the icon which will correspond to marker's location
		popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
	});
	map = L.map('map').setView([out.iss_position.latitude, out.iss_position.longitude], 3);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	ISSmarker = L.marker([out.iss_position.latitude, out.iss_position.longitude], {icon: ISSIcon}).addTo(map)
		.bindPopup(randomFact)
		.openPopup();
	
})
.catch(err => { throw err });

function map_update(){
	fetch(url)
	.then(res => res.json())
	.then((out) => {
		ISSmarker.setLatLng([out.iss_position.latitude, out.iss_position.longitude])
	})
	.catch(err => { throw err });
}

setInterval(map_update, 5000)