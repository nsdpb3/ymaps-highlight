class Map {
	/**
	 * Конструктор для создания карты
	 * @constructor
	 * @param {object} center - Центр карты
	 * @param {number} zoom - Множитель зума
	 * @param {string} container - id контейнера куда будет помещена карта
	 */
	constructor(center, zoom, container) {
		this.mapCenter = center;
		this.mapZoom = zoom;
		this.mapContainer = container;
		this.myPlacemarks = [];
		this.defaultPreset = "islands#blueIcon";
		this.myMap = [];
	}
	/**
	 * Инициализация карты
	 * @returns {Promise} Созданная карта
	 */
	initialize() {
		return new Promise((resolve, reject) => {
			this.myMap = new ymaps.Map(this.mapContainer, {
				center: this.mapCenter,
				zoom: this.mapZoom,
			});
			resolve(this);
		});
	}
	/**
	 * Устанавливает метку и пушит её в общий массив меток
	 * @param {Array} coords - Координаты метки
	 * @param {string} name - Название метки
	 * @param {string} baloon - Балун метки
	 * @param {string} preset - Оформление метки, по умолчанию => this.defaultPreset
	 * @returns {Promise} Промис с ресолвом который содержит созданный марке
	 */
	setPlacemark(coords, name, baloon, preset = this.defaultPreset) {
		return new Promise((resolve, reject) => {
			const placemark = new ymaps.Placemark(
				coords,
				{
					iconCaption: name,
					balloonContent: baloon,
				},
				{
					preset: preset,
				}
			);
			this.myMap.geoObjects.add(placemark);
			this.myPlacemarks.push(placemark);
			resolve(placemark);
		});
	}
	/**
	 * Пушит созданную метку в массив меток
	 * @param {Array} placemark - Координаты метки
	 * @returns {Promise} Промис с ресолвом который содержит массив меток
	 */
	pushMarkers(placemark) {
		return new Promise((resolve) => {
			this.myPlacemarks.push(placemark);
			resolve(this.myPlacemarks);
		});
	}
	/**
	 * Сбрасывает оформление у всех меток
	 * @returns {Promise} Промис с пустым resolve
	 */
	resetHighlight() {
		return new Promise((resolve) => {
			this.myMap.geoObjects.each((geoObject) => {
				geoObject.options.set("preset", this.defaultPreset);
			});
			resolve();
		});
	}
	/**
	 * Подсвечивает метку по переданным координатам
	 * @param {Array} coords - Координаты метки
	 * @returns {Promise} Промис с пустым ресолвом
	 */
	highlightPlacemark(coords) {
		return new Promise((resolve, reject) => {
			// Ищем метку с соответствующими координатами и подсвечиваем её
			const targetPlacemark = this.myPlacemarks.find((marker) => {
				const placemarkCoords = marker.geometry.getCoordinates();
				return (
					placemarkCoords[0] === coords[0] && placemarkCoords[1] === coords[1]
				);
			});
			if (targetPlacemark) {
				targetPlacemark.options.set("preset", "islands#greenIcon");
				resolve(); // Разрешить промис, если метка найдена и подсвечена
			} else {
				reject("Метка не найдена"); // Отклонить промис, если метка не найдена
			}
		});
	}
	/**
	 * Приводит координаты к нужному виду
	 * @param {Array} placemark - Координаты метки
	 * @returns {Promise} Промис с ресолвом который содержит валидные координаты
	 */
	transformCoordinates(coordsNoTransform) {
		return new Promise((resolve, reject) => {
			coordsNoTransform = coordsNoTransform.split(",");
			let cords = coordsNoTransform.map((cord) => +cord);
			resolve(cords);
		});
	}
}

let center = [55.76, 37.64];
let zoom = 11;

let map = new Map(center, zoom, "map");
// let saloons = [
// 	{
// 		coords: [55.764374, 37.596857],
// 		name: "Малый Козихинский переулок, 12",
// 		ballon: "г. Москва, Малый Козихинский переулок, 12",
// 	},
// ];
ymaps
	.ready()
	.then(() => map.initialize())
	.then((map) => {
		map.setPlacemark(
			[55.764374, 37.596857],
			"Малый Козихинский переулок, 12",
			"г. Москва, Малый Козихинский переулок, 12"
		);
		map.setPlacemark(
			[55.746674, 37.559092],
			"Большая Дорогомиловская улица, 14к1",
			"г. Москва, Большая Дорогомиловская улица, 14к1"
		);
		map.setPlacemark(
			[55.764946, 37.58862],
			"Садовая-Кудринская улица, 19с1",
			"г. Москва, Садовая-Кудринская улица, 19с"
		);
		map.setPlacemark(
			[55.748949, 37.655131],
			"Земляной Вал, 52/16с1",
			"г. Москва, улица Земляной Вал, 52/16с1"
		);
		map.setPlacemark(
			[55.737451, 37.587596],
			"Зубовский бульвар, 31-33",
			"г. Москва, Зубовский бульвар, 31-33"
		);
		map.setPlacemark(
			[55.737314, 37.6009],
			"Коробейников переулок, 1",
			"г. Москва, Коробейников переулок, 1"
		);
		map.setPlacemark(
			[55.704793, 37.576286],
			"Ленинский проспект, 43",
			"г. Москва, Ленинский проспект, 43"
		);
		map.setPlacemark(
			[55.736108, 37.248302],
			"Жуковка, 58",
			"Московская область, Одинцовский городской округ, деревня Жуковка, 58"
		);
		map.setPlacemark(
			[59.959958, 30.303238],
			"Большой проспект Петроградской стороны, 37",
			"г. Санкт-Петербург, Большой проспект Петроградской стороны, 37"
		);
		map.setPlacemark(
			[47.224936, 39.704673],
			"Будённовский проспект, 49/97",
			"г. Ростов-на-Дону, Будённовский проспект, 49/97"
		);
		map.setPlacemark(
			[55.03976, 82.915498],
			"улица Крылова, 4",
			"г. Новосибирск, улица Крылова, 4"
		);
		map.setPlacemark(
			[56.011877, 92.888307],
			"Карла Маркса, 14",
			"г. Красноярск, улица Карла Маркса, 14"
		);
		map.setPlacemark(
			[47.224936, 39.704673],
			"Будённовский проспект, 49/97",
			"г. Ростов-на-Дону, Будённовский проспект, 49/97"
		);
	});
document.addEventListener("DOMContentLoaded", function () {
	let btns = document.querySelectorAll(".map-btn");
	btns.forEach((btn) => {
		btn.addEventListener("click", () => {
			let coords = btn.getAttribute("data-cords");
			map
				.resetHighlight()
				.then(() => map.transformCoordinates(coords))
				.then((cords) => map.highlightPlacemark(cords));
			// .catch((error) => console.error(error));
		});
	});
});
