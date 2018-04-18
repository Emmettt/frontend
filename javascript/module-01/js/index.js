let model = {
 	  	  Sharm : 16,
 	  	Hurgada : 6,
 	  	   Taba : 6,
 	    Antalya : 6,
 		  	 Bali : 0,
 		 Thailand : 9,
 	  	 Greece : 18,
 		    Spain : 7
		}

let view = {
	render : function (data) {	                    // Отрисовка таблицы на основании model
		let orderBtn = document.getElementById("btn");						
		orderBtn.addEventListener('click', order);    // Кнопка
		let tbl = document.getElementById("resorts");	// Таблица
		for (let key in data) {
			let row = document.createElement("TR");
			let resort = document.createElement("TD");
			let vouchers = document.createElement("TD");
			resort.innerHTML = key;
			vouchers.innerHTML = data[key];
			vouchers.id = key;
			tbl.appendChild(row);
			row.appendChild(resort);
			row.appendChild(vouchers);
		}
	},

	redraw : function (data, key) {	 // Отражение в таблице изменений в model
		let el = document.getElementById(key);
		el.innerHTML = data[key];
	}
}

function order (e) {
	let qty = prompt('Сколько путевок надо ? :');
	if (qty === null) return; else qty = Number(qty);
	if (!Number.isInteger(qty) || qty <= 0) {
		alert('Неправильный ввод. Введите целое, положительное число.'); 
		return;
	};
	let nextMin = 0;  	            // Переменная хранит последнее значение количества мест которые уже предлагались
	finishLabel: do {																																										
		let nonChekedResort = Infinity;																																		
		for (let key in model) {	    // Ищем курорт с минимальным количеством мест (пытаемся быстрее заполнить группу)
			if (Number(model[key]) < nonChekedResort && Number(model[key]) > nextMin)											
				nonChekedResort = Number(model[key]);
		}
		nextMin = nonChekedResort;
		if (nextMin >= qty)
			for (let key in model) {		// Если таких несколько - предлагаем их.
				if (Number(model[key]) === nextMin) {																													
					if (confirm(`Едешь в ${key} ?  Доступно мест: ${model[key]}, требуется ${qty} .`)) {		
						model[key] -= qty;		// Уменьшаем в model кол-во свободных мест
						view.redraw(model, key); 		// Отражаем изменения на экране
						alert(`Приятного путешествия в группе ${key} .`);
						break finishLabel; 																																				
					}
			 	}
			}
	} while (nextMin !== Infinity);	 // Если все варианты были предложены nextMin будет Infinity
	if (nextMin === Infinity) alert ('Извините - мест нет!');
}

view.render(model);				//     ЖИВИ !!!
