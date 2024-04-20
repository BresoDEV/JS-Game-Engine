const BODY = document.body;

	var vida = 100;

	SET_WORLD_BACKGROUND('fundo.png');



	const sp1 = DRAW_SPRITE("terra.png", "0px", "98px", "571px", "65px");
	const sp2 = DRAW_SPRITE("terra.png", "549px", "100px", "60px", "391px");
	const sp3 = DRAW_SPRITE("terra.png", "549px", "446px", "342px", "54px");
	const sp4 = DRAW_SPRITE("terra.png", "679px", "0px", "60px", "348px");
	const sp5 = DRAW_SPRITE("terra.png", "685px", "315px", "467px", "43px");
	const agua = DRAW_SPRITE("agua.png", "27px", "185px", "310px", "266px");


	const ilha = DRAW_SPRITE("alpha.png", "300px", "300px", "40px", "40px", "45");
	SET_ENTITY_ALPHA(ilha, '100');
	REMOVE_WHITE_BACKGROUND(ilha);

	const ilha2 = DRAW_SPRITE("a2.png", "300px", "200px", "40px", "40px", "45");
	SET_ENTITY_ALPHA(ilha2, '100');
	REMOVE_BLACK_BACKGROUND(ilha2);



	const player = CREATE_PLAYER('player.png');

	ADD_PLAYER_MOVIMENT_SYSTEM(player);
	DELETE_ENTITY_WHEN_COLLIDED(player, ilha2);







	CALL_SCENE_CREATOR('agua.png');

	const hud = DRAW_RECT('10px', '10px', '100px', 'auto');
	inserir(hud, BODY);
	MAKE_ENTITY_MOVEABLE_WITH_MOUSE_CLICK(hud);


	const texto1 = DRAW_TEXT('Exemplo 1');
	inserir(texto1, hud);

	const vidaValor = DRAW_TEXT('Vida: ');
	inserir(vidaValor, hud);

	const barraDeVida = DRAW_BAR(vida, hud);















	setInterval(() => {
		vidaValor.innerHTML = 'Vida: ' + vida;

		SET_BAR_VALUE(barraDeVida, vida);

		if (IS_COLLIDED(player, sp1) || IS_COLLIDED(player, sp3) || IS_COLLIDED(player, sp4) ||
			IS_COLLIDED(player, sp5) || IS_COLLIDED(player, agua) ) {
			player.src = 'terra.png';
			vida--;
		}
		else
			player.src = 'player.png';



		//coletar estrela branca
		if (DOES_ENTITY_EXIST(ilha2)) {
			if (IS_COLLIDED(player, ilha2)) {
				DELETE_ENTITY(ilha2);
				SHOW_MESSAGE('', 'Estrela branca coletada');
			}
		}

		//coletar estrela preta
		if (DOES_ENTITY_EXIST(ilha)) {
			if (IS_COLLIDED(player, ilha)) {
				DELETE_ENTITY(ilha);
				SHOW_MESSAGE('', 'Estrela preta coletada');
			}
		}

		//console.log(GET_ENTITY_ROTATION(player))
	}, 100);


	//sistema de tiros
	document.addEventListener('keydown',
		function (event) {
			if (event.key === 'z') {
				var anguloPlayer = GET_ENTITY_ROTATION(player);

				var shot = CREATE_ENTITY('tiro.png', 10000, 10000, 50, 20, anguloPlayer);
				REMOVE_WHITE_BACKGROUND(shot);
				var playerPos = GET_ENTITY_CENTER_COORD(player);

				SET_ENTITY_COORDS_CENTERED(shot, playerPos.x, playerPos.y);

				setTimeout(() => {
					//atira para cima
					if (anguloPlayer == 0) {
						var novo = parseInt(playerPos.y) * -10;
						SET_ENTITY_ROTATION(shot, anguloPlayer)
						MOVE_ENTITY_TO_COORDS_WITH_DELAY(shot, playerPos.x, novo, 5);
					}
					//atira para direita
					if (anguloPlayer == 90) {
						var novoX = parseInt(playerPos.x) * 10;
						SET_ENTITY_ROTATION(shot, anguloPlayer)
						MOVE_ENTITY_TO_COORDS_WITH_DELAY(shot, novoX, playerPos.y, 5);
					}
					//atira para baixo
					if (anguloPlayer == 180) {
						var novo = parseInt(playerPos.y) * 10;
						SET_ENTITY_ROTATION(shot, anguloPlayer)
						MOVE_ENTITY_TO_COORDS_WITH_DELAY(shot, playerPos.x, novo, 5);
					}
					//atira para esquerda
					if (anguloPlayer == 270) {
						var novoX = parseInt(playerPos.x) * -10;
						SET_ENTITY_ROTATION(shot, anguloPlayer)
						MOVE_ENTITY_TO_COORDS_WITH_DELAY(shot, novoX, playerPos.y, 5);
					}
				}, 1);
				DELETE_ENTITY_WHEN_COLLIDED(shot, sp1);
				DELETE_ENTITY_WHEN_COLLIDED(shot, sp2);
				DELETE_ENTITY_WHEN_COLLIDED(shot, sp3);
				DELETE_ENTITY_WHEN_COLLIDED(shot, sp4);
				DELETE_ENTITY_WHEN_COLLIDED(shot, sp5);
			}
		}
	);

	//çç



	function GET_ENTITY_ROTATION(entity) {
		var estilo = window.getComputedStyle(GET_ENTITY(entity));
		var mt = new DOMMatrix(estilo.transform);
		var angulo = Math.atan2(mt.b, mt.a) * (180 / Math.PI);
		if (angulo < 0) {
			angulo += 360;
		}
		return angulo;
	}

	function CREATE_ENTITY(srcIMG, x = '10000px', y = '10000px', w = '40px', h = '40px', angulo = '0') {

		x = parseInt(x);
		y = parseInt(y);
		w = parseInt(w);
		h = parseInt(h);
		angulo = parseInt(angulo);

		var plyr = document.createElement('img');
		plyr.style.position = 'fixed';
		plyr.style.top = y + 'px';
		plyr.style.left = x + 'px';
		plyr.style.width = w + 'px';
		plyr.style.height = h + 'px';
		plyr.style.transition = 'transform 0.3s linear';
		plyr.style.transform = 'rotate(' + angulo + 'deg)';

		plyr.src = srcIMG;

		BODY.append(plyr);

		return plyr;
	}





	function DRAW_GRID_LINES(espacamento, color = 'red') {
		espacamento = parseInt(espacamento);
		for (var i = 0; i < 1000; i++) {
			DRAW_VERTICAL_LINE(i * espacamento, color);
			DRAW_HORIZONTAL_LINE(i * espacamento, color);
		}
	}

	function DRAW_HORIZONTAL_LINE(y, color = 'red') {
		y = parseInt(y);
		var f = document.createElement('div');
		f.style.width = '10000px';
		f.style.backgroundColor = color;
		f.style.height = '1px';
		f.style.margin = '0';
		f.style.padding = '0';
		f.style.position = 'fixed';
		f.style.left = '0px';
		f.style.top = y + 'px';
		f.style.opacity = '0.5';
		inserir(f, BODY);
	}


	function DRAW_VERTICAL_LINE(x, color = 'red') {
		x = parseInt(x);
		var f = document.createElement('div');
		f.style.width = '0.51px';
		f.style.backgroundColor = color;
		f.style.height = '10000px';
		f.style.margin = '0';
		f.style.padding = '0';
		f.style.position = 'fixed';
		f.style.left = x + 'px';
		f.style.top = '0px';
		f.style.opacity = '0.5';
		inserir(f, BODY);
	}











	function SET_ENTITY_COORDS(entity, x, y) {
		var ent1 = GET_ENTITY(entity);
		var xfinal = parseInt(x);
		var yfinal = parseInt(y);
		ent1.style.top = yfinal + 'px';
		ent1.style.left = xfinal + 'px';
	}

	function SET_ENTITY_COORDS_CENTERED(entity, x, y) {
		var ent1 = GET_ENTITY(entity);
		var xfinal = parseInt(x) - parseInt(ent1.offsetWidth / 2);
		var yfinal = parseInt(y) - parseInt(ent1.offsetHeight / 2);
		ent1.style.top = yfinal + 'px';
		ent1.style.left = xfinal + 'px';
	}

	function MOVE_ENTITY_TO_ANOTHER_ENTITY_CENTER(moveableEntity, baseEntity) {
		var ent1 = GET_ENTITY(moveableEntity);
		var ent2 = GET_ENTITY(baseEntity);
		var xfinal = parseInt(GET_ENTITY_CENTER_COORD(ent2).x) - parseInt(ent1.offsetWidth / 2);
		var yfinal = parseInt(GET_ENTITY_CENTER_COORD(ent2).y) - parseInt(ent1.offsetHeight / 2);
		ent1.style.top = yfinal + 'px';
		ent1.style.left = xfinal + 'px';
	}


	function GET_ENTITY_CENTER_COORD_WITH_OFFSET(entity, x = 0, y = 0) {
		var item = GET_ENTITY(entity);
		if (typeof (x) === 'string') {
			x = parseInt(x);
		}
		if (typeof (y) === 'string') {
			y = parseInt(y);
		}
		var posicoes = {
			x: (item.offsetLeft + (item.offsetWidth / 2)) + x,
			y: (item.offsetTop + (item.offsetHeight / 2)) + y
		}
		return posicoes;
	}

	function GET_ENTITY_CENTER_COORD(entity) {
		var item = GET_ENTITY(entity);
		var posicoes = {
			x: item.offsetLeft + (item.offsetWidth / 2),
			y: item.offsetTop + (item.offsetHeight / 2)
		}
		return posicoes;
	}











	function Footer(texto = '<marquee>BresoDEV</marquee>') {
		var footer = document.createElement('div');
		footer.style.width = '100%';
		footer.style.backgroundColor = 'black';
		footer.style.position = 'fixed';
		footer.style.bottom = '0';
		footer.style.padding = '10px';
		footer.style.opacity = '0.9';
		document.body.style.padding = '0';
		document.body.style.margin = '0';
		var footerText = document.createElement('spam');
		footer.append(footerText);
		footerText.innerHTML = texto;
		footerText.style.color = 'aliceblue';
		footerText.id = 'footer';
		BODY.append(footer);
		return footer;
	}






	function DELETE_ENTITY_WHEN_COLLIDED(entyty1, entityToDelete) {
		var loopzin = setInterval(() => {
			if (DOES_ENTITY_EXIST(entyty1) && DOES_ENTITY_EXIST(entityToDelete)) {
				if (IS_COLLIDED(entyty1, entityToDelete)) {
					DELETE_ENTITY(entityToDelete);
					clearInterval(loopzin);
				}
			}
		}, 1);
	}


	function MAKE_ENTITY_MOVEABLE_WITH_MOUSE_CLICK_WHEN_SHIFT_PRESSED(entity) {
		if (DOES_ENTITY_EXIST(entity)) {
			var rect = GET_ENTITY(entity);

			var clicado = false;
			var Shiftclicado = false;
			var x_;
			var y_;

			

			document.addEventListener('keydown', (x) => {
				if(x.shiftKey)
				{
					Shiftclicado =true;
				}
			});

			document.addEventListener('mouseup', () => {
				Shiftclicado =false;
			});

			document.addEventListener('mousemove', (x) => {

				x_ = parseInt(x.clientX) - parseInt(parseInt(rect.style.width) / 2);
				y_ = parseInt(x.clientY) - parseInt(rect.offsetHeight) / 2;
				if (Shiftclicado) {
					rect.style.top = y_ + 'px';
					rect.style.left = x_ + 'px';
					rect.style.cursor = 'pointer';
				}
				else {
					rect.style.cursor = 'default';
				}

			});
			
		}
	}


	function MAKE_ENTITY_MOVEABLE_WITH_MOUSE_CLICK(entity) {
		if (DOES_ENTITY_EXIST(entity)) {
			var rect = GET_ENTITY(entity);

			var clicado = false;
			var x_;
			var y_;

			setInterval((x) => {
				if (clicado) {
					rect.style.top = y_ + 'px';
					rect.style.left = x_ + 'px';
				}
			}, 1);

			document.addEventListener('mousemove', (x) => {

				x_ = parseInt(x.clientX) - parseInt(parseInt(rect.style.width) / 2);
				y_ = parseInt(x.clientY) - parseInt(rect.offsetHeight) / 2;
				if (clicado) {
					rect.style.top = y_ + 'px';
					rect.style.left = x_ + 'px';
					rect.style.cursor = 'pointer';
				}
				else {
					rect.style.cursor = 'default';
				}

			});
			rect.addEventListener('mousedown', (x) => {
				clicado = !clicado;
			});
		}
	}






	//if(IS_ENTITY_ON_COORD(player,'300','300','100'))
	//	console.log('entrou');
	function IS_ENTITY_ON_COORD(entity, x, y, radius) {
		var player_pos = GET_ENTITY_CORNERS_POSITION(entity);

		x = parseInt(x);
		y = parseInt(y);
		radius = parseInt(radius);
		if (player_pos[1] >= (x - radius) && player_pos[5] <= (x + radius) &&
			player_pos[4] >= (y - radius) && player_pos[8] <= (y + radius))
			return true
		else
			return false;


	}




	function SET_ENTITY_BACKCOLOR(entity, color) {
		if (DOES_ENTITY_EXIST(entity)) {
			var item = GET_ENTITY(entity);
			item.style.backgroundColor = color;
		}
	}


	function DOES_ENTITY_EXIST(entity) {
		if (typeof (entity) === 'object')
			return entity !== undefined;
		else if (typeof (entity) === 'string')
			return document.getElementById(entity);
	}




	function SET_ENTITY_SIZE(entity, x, y) {
		var item = GET_ENTITY(entity);

		x = x.toString();
		y = y.toString();

		if (x.includes('px'))
			item.style.width = x;
		else
			item.style.width = x + 'px';
		//-----------
		if (y.includes('px'))
			item.style.height = y;
		else
			item.style.height = y + 'px';
	}

	function SET_ENTITY_TEXTURE(entity, textura) {
		var item = GET_ENTITY(entity);
		item.src = textura;
	}







	function GET_ENTITY_ALPHA(entity) {
		var item = GET_ENTITY(entity);
		return item.style.opacity;
	}

	function SET_ENTITY_ALPHA(entity, alpha) {
		var item = GET_ENTITY(entity);
		if (parseInt(alpha) === 100)
			item.style.opacity = '1';
		else if (parseInt(alpha) < 10)
			item.style.opacity = '0.0' + alpha;
		else
			item.style.opacity = '0.' + alpha;
	}

	function SET_ENTITY_ROTATION(entity, angulo) {
		var item = GET_ENTITY(entity);
		angulo = parseInt(angulo);
		item.style.transition = 'transform 0.0s linear';
		item.style.transform = 'rotate(' + angulo + 'deg)';
	}

	function REMOVE_BLACK_BACKGROUND(sprite) {
		var item = GET_ENTITY(sprite);
		item.style.mixBlendMode = 'lighten';
	}


	function GET_ENTITY(entity) {
		if (document.getElementById(entity))
			var item = document.getElementById(entity);
		else
			var item = entity;

		return item;
	}

	function REMOVE_WHITE_BACKGROUND(sprite) {
		var item = GET_ENTITY(sprite);
		item.style.mixBlendMode = 'color-burn';
	}



	function DELETE_ENTITY(entity) {
		var item = GET_ENTITY(entity);
		item.remove();
	}

	function SET_BAR_VALUE(bar, value) {
		bar.style.width = value + '%'
	}
	function DRAW_BAR(valor, pai, bgcolor = 'gray', color = 'green', altura = '15px') {
		var fundobarra = document.createElement('div');
		fundobarra.style.width = '100%';
		fundobarra.style.backgroundColor = bgcolor;
		fundobarra.style.width = '100%';
		fundobarra.style.height = altura;
		fundobarra.style.margin = '0';
		fundobarra.style.padding = '0';
		fundobarra.style.position = 'relative';

		var barra = document.createElement('div');
		barra.style.width = '100%';
		barra.style.backgroundColor = color;
		barra.style.width = valor + '%';
		barra.style.height = altura;
		barra.style.margin = '0';
		barra.style.padding = '0';
		barra.style.position = 'relative';

		inserir(barra, fundobarra);
		inserir(fundobarra, pai);

		return barra;
	}


	function DRAW_TEXT(txt, color = 'white', alinhamento = 'left') {
		var text = document.createElement('div');
		text.style.width = '100%';
		text.style.backgroundColor = 'transparent';
		text.style.color = color;
		text.style.textAlign = alinhamento;
		text.innerHTML = txt;
		return text;
	}

	function DRAW_RECT(x = '50px', y = '50px', w = '100px', h = '100px', bg = 'black', fontColor = 'white', alpha = '0.9') {
		var rect = document.createElement('div');
		rect.style.position = 'fixed';
		rect.style.top = y;
		rect.style.left = x;
		rect.style.width = w;
		rect.style.height = h;
		rect.style.padding = '10px';
		rect.style.borderRadius = '10px';
		rect.style.backgroundColor = bg;
		rect.style.color = fontColor;
		rect.style.opacity = alpha;
		return rect;
	}

	function inserir(filho, pai) {
		pai.append(filho);
	}













	//Exibe uma mensagem na tela
	function SHOW_MESSAGE(titulo, texto, corFundo = 'black', corFonte = 'white', tempo = 4000) {
		var fundo = document.createElement('div');
		fundo.style.position = 'fixed';
		fundo.style.top = '10px';
		fundo.style.right = '10px';
		fundo.style.width = '200px';
		fundo.style.padding = '10px';
		fundo.style.borderRadius = '10px';
		fundo.style.backgroundColor = corFundo;
		fundo.style.color = 'white';
		fundo.style.opacity = '0.0';

		var texto1 = document.createElement('span');
		texto1.style.width = '100%';
		texto1.style.color = corFonte;
		texto1.innerHTML = titulo + '<br>';


		var texto2 = document.createElement('span');
		texto2.style.width = '100%';
		texto2.style.color = corFonte;
		texto2.innerHTML = texto;



		BODY.append(fundo);

		fundo.append(texto1);

		fundo.append(texto2);

		var opac = 0;

		//exibir
		var l1 = setInterval(() => {
			if (opac !== 100) {
				fundo.style.opacity = opac * 0.01;
				opac++;
			}
			else
				clearInterval(l1);

		}, 10);
		//remover
		setTimeout(() => {
			l1 = setInterval(() => {
				if (opac !== 0) {
					fundo.style.opacity = opac * 0.01;
					opac--;
				}
				else {
					fundo.remove();
					clearInterval(l1);
				}

			}, 10);
		}, tempo);
	}




	//cria o menu de criacao de cenario
	function CALL_SCENE_CREATOR(srcImg) {
		var fundo = document.createElement('div');
		fundo.style.position = 'fixed';
		fundo.style.top = '10px';
		fundo.style.right = '10px';
		fundo.style.width = '200px';
		fundo.style.padding = '10px';
		fundo.style.borderRadius = '10px';
		fundo.style.backgroundColor = 'black';


		var criarnovo = document.createElement('button');
		criarnovo.style.width = '100%';
		criarnovo.style.backgroundColor = 'transparent';
		criarnovo.style.color = 'white';
		criarnovo.style.borderColor = 'white';
		criarnovo.textContent = 'Criar Cenario';

		var posx = document.createElement('input');
		posx.type = 'range';
		posx.style.width = '100%';
		posx.style.backgroundColor = 'transparent';
		posx.value = '100';
		posx.min = '0';
		posx.max = '1000';

		var posy = document.createElement('input');
		posy.type = 'range';
		posy.style.width = '100%';
		posy.style.backgroundColor = 'transparent';
		posy.value = '100';
		posy.min = '0';
		posy.max = '1000';

		var tamx = document.createElement('input');
		tamx.type = 'range';
		tamx.style.width = '100%';
		tamx.style.backgroundColor = 'transparent';
		tamx.value = '100';
		tamx.min = '0';
		tamx.max = '1000';

		var tamy = document.createElement('input');
		tamy.type = 'range';
		tamy.style.width = '100%';
		tamy.style.backgroundColor = 'transparent';
		tamy.value = '100';
		tamy.min = '0';
		tamy.max = '1000';

		var rotacao = document.createElement('input');
		rotacao.type = 'range';
		rotacao.style.width = '100%';
		rotacao.style.marginBottom = '20px';
		rotacao.style.backgroundColor = 'transparent';
		rotacao.value = '0';
		rotacao.min = '0';
		rotacao.max = '360';

		var source = document.createElement('input');
		source.type = 'text';
		source.style.width = '96%';
		source.style.backgroundColor = 'black';
		source.style.color = 'white';
		source.style.marginTop = '5px';
		source.style.marginBottom = '5px';
		source.placeholder = 'Link da Textura';
		source.value = 'agua.png';

		var code = document.createElement('input');
		code.type = 'text';
		code.style.width = '96%';
		code.style.backgroundColor = 'gray';
		code.style.color = 'white';
		code.style.marginTop = '5px';
		code.style.marginBottom = '5px';

		var texto1 = document.createElement('span');
		texto1.style.width = '100%';
		texto1.style.color = 'white';


		var texto2 = document.createElement('span');
		texto2.style.width = '100%';
		texto2.style.color = 'white';


		var texto3 = document.createElement('span');
		texto3.style.width = '100%';
		texto3.style.color = 'white';


		var texto4 = document.createElement('span');
		texto4.style.width = '100%';
		texto4.style.color = 'white';

		var texto5 = document.createElement('span');
		texto5.style.width = '100%';
		texto5.style.color = 'white';

		var infoCALL_SCENE_CREATOR = document.createElement('span');
		infoCALL_SCENE_CREATOR.style.width = '100%';
		infoCALL_SCENE_CREATOR.style.color = 'white';


		BODY.append(fundo);
		fundo.append(criarnovo);

		//texto1.textContent = 'Posicao X:';
		//fundo.append(texto1);
		//fundo.append(posx);

		//texto2.textContent = 'Posicao Y:';
		//fundo.append(texto2);
		//fundo.append(posy);

		texto3.textContent = 'Largura:';
		fundo.append(texto3);
		fundo.append(tamx);

		texto4.textContent = 'Altura';
		fundo.append(texto4);
		fundo.append(tamy);

		texto5.textContent = 'Rotação';
		fundo.append(texto5);
		fundo.append(rotacao);

		fundo.append(source);
		fundo.append(code);

		fundo.append(infoCALL_SCENE_CREATOR);




		MAKE_ENTITY_MOVEABLE_WITH_MOUSE_CLICK_WHEN_SHIFT_PRESSED(fundo);

		var rect;
		var footerinfo;

		

		var footerinfo = Footer('Aperte <font color="lime">SHIFT</font> e use o mouse para movimentar o painel e <font color="lime">LMOUSE</font> para aplicar.')


		criarnovo.addEventListener('click', () => {
			if (source.value.length >= 4) {
				rect = DRAW_SPRITE(srcImg, '100px', '100px', '100px', '100px', '0', 'sp1');
				MAKE_ENTITY_MOVEABLE_WITH_MOUSE_CLICK(rect);

				DELETE_ENTITY(footerinfo);
				footerinfo = Footer('<font color="cyan">Clique no objeto</font> para posicionar no cenário e <font color="cyan">clique novamente</font> para aplicar')

			}
			else
				source.focus();
		});

		document.addEventListener('mouseup', () => {
			if (rect !== 0 && source.value !== '') {
				code.value = 'DRAW_SPRITE("' + source.value + '", "' + rect.offsetLeft + 'px","' +
					rect.offsetTop + 'px","' +
					tamx.value + 'px","' +
					tamy.value + 'px","' +
					rotacao.value + '");';
			}
		});

		tamx.addEventListener('change', () => {
			if (rect !== 0 && source.value !== '') {
				code.value = 'DRAW_SPRITE("' + source.value + '", "' + rect.offsetLeft + 'px","' +
					rect.offsetTop + 'px","' +
					tamx.value + 'px","' +
					tamy.value + 'px","' +
					rotacao.value + '");';
			}
		});

		tamy.addEventListener('change', () => {
			if (rect !== 0 && source.value !== '') {
				code.value = 'DRAW_SPRITE("' + source.value + '", "' + rect.offsetLeft + 'px","' +
					rect.offsetTop + 'px","' +
					tamx.value + 'px","' +
					tamy.value + 'px","' +
					rotacao.value + '");';
			}
		});
		rotacao.addEventListener('change', () => {
			if (rect !== 0 && source.value !== '') {
				code.value = 'DRAW_SPRITE("' + source.value + '", "' + rect.offsetLeft + 'px","' +
					rect.offsetTop + 'px","' +
					tamx.value + 'px","' +
					tamy.value + 'px","' +
					rotacao.value + '");';
			}
		});

		setInterval(() => {
			if (DOES_ENTITY_EXIST(rect) && source.value.length >= 4) {


				rect.style.width = tamx.value + 'px';
				rect.style.height = tamy.value + 'px';
				rect.src = source.value;

				rect.style.transform = 'rotate(' + rotacao.value + 'deg)';

				infoCALL_SCENE_CREATOR.innerHTML = '<br>Info do Cenario<br>' +
					'X:' + rect.offsetLeft + 'px <br>' +
					'Y:' + rect.offsetTop + 'px <br>' +
					'Width:' + tamx.value + 'px <br>' +
					'Height:' + tamy.value + 'px <br>' +
					'Rotacao:' + rotacao.value + ' graus <br>';
			}
		}, 1);
		return fundo;
	}






	function GET_ENTITY_COORDS(id) {
		//GET_ENTITY_COORDS('item').x     ou      GET_ENTITY_COORDS('item').y
		var item = GET_ENTITY(id);

		var posicoes = {
			x: item.offsetLeft,
			y: item.offsetTop
		}
		return posicoes;
	}

	function GET_ENTITY_SIZE(id) {
		//GET_ENTITY_SIZE('item').x     ou      GET_ENTITY_SIZE('item').y
		var item = GET_ENTITY(id);

		var posicoes = {
			x: item.offsetWidth,
			y: item.offsetHeight
		}
		return posicoes;
	}


	//Exibe uma textura na tela
	//Ex:
	// const rect = DRAW_SPRITE('sprite.png', '100px', '100px', '100px', '100px', 'sp1')
	function DRAW_SPRITE(srcIMG, xPos, yPos, widthPX, heightPX, rotacao = '0', idOBJ = '') {
		var sprite = document.createElement('img');
		BODY.append(sprite);

		sprite.style.position = 'fixed';
		sprite.style.top = yPos;
		sprite.style.left = xPos;
		sprite.style.width = widthPX;
		sprite.style.height = heightPX;
		sprite.style.transition = 'transform 0.0s linear';
		sprite.style.transform = 'rotate(' + rotacao + 'deg)';
		//
		if (idOBJ !== '')
			sprite.id = idOBJ;

		sprite.src = srcIMG;

		return sprite;
	}
	
	function ADD_TOUTHSCREEN_MOVIMENT_TO_ENTITY(elementID) {
		var id = 0;
		if (document.getElementById(elementID))
			id = document.getElementById(elementID);
		else
			id = elementID;
		id.addEventListener('touchmove', (x) => {
			id.style.position = 'fixed';
			id.style.left = (x.touches[0].clientX - (id.offsetWidth / 2)) + 'px';
			id.style.top = (x.touches[0].clientY - (id.offsetHeight / 2)) + 'px';
		});
	}


	//movimenta um elemento pelo cenario
	function MOVE_ENTITY_TO_COORDS_WITH_DELAY(npcID, x, y, tempo = 3, tipo = 'linear') {
		/*
		Exemplo:
		MOVE_ENTITY_TO_COORDS_WITH_DELAY('npc', '300', '300');
		setTimeout(() => {
			MOVE_ENTITY_TO_COORDS_WITH_DELAY('npc', '100', '100');
		}, 5000);

		*/
		var npc = GET_ENTITY(npcID);

		x = parseInt(x);
		y = parseInt(y);

		npc.style.transition = 'all ' + tempo + '.0s ' + tipo + '';
		//setTimeout(() => {
		npc.style.top = y + 'px';
		npc.style.left = x + 'px';
		//}, 10);
	}




	//define o fundo de tela
	//Ex:
	//SET_WORLD_BACKGROUND('fundo.png');
	function SET_WORLD_BACKGROUND(imageSrc) {
		BODY.style.background = 'url("' + imageSrc + '")';
		BODY.style.backgroundAttachment = 'fixed';
		BODY.style.backgroundRepeat = 'no-repeat';
		BODY.style.backgroundSize = '100% 100%';
	}

	//cria o player
	//Ex:
	//const player = CREATE_PLAYER('player.png');
	function CREATE_PLAYER(srcIMG, id = '', x = '155px', y = '40px', w = '40px', h = '40px', rotacionar90 = true) {
		var plyr = document.createElement('img');
		plyr.style.position = 'fixed';
		plyr.style.top = y;
		plyr.style.left = x;
		plyr.style.width = w;
		plyr.style.height = h;
		if (rotacionar90) {
			plyr.style.transition = 'transform 0.3s linear';
			plyr.style.transform = 'rotate(90deg)';
		}
		if (id !== '') {
			plyr.id = id;
		}
		plyr.src = srcIMG;

		BODY.append(plyr);

		return plyr;
	}


	//Cria demarcacoes em um elemento
	//nao por em loop!!
	function ADD_ENTITY_MARKER(id) {

		var box1 = document.createElement('img');
		var box2 = document.createElement('img');
		var box3 = document.createElement('img');
		var box4 = document.createElement('img');

		box1.style.margin = '0';
		box1.style.padding = '0';
		box1.style.position = 'fixed';
		box1.style.backgroundColor = 'aqua';
		box1.style.width = '5px';
		box1.style.height = '5px';
		box1.style.border = 'none';
		BODY.append(box1);

		box2.style.margin = '0';
		box2.style.padding = '0';
		box2.style.position = 'fixed';
		box2.style.backgroundColor = 'aqua';
		box2.style.width = '5px';
		box2.style.height = '5px';
		box2.style.border = 'none';
		BODY.append(box2);

		box3.style.margin = '0';
		box3.style.padding = '0';
		box3.style.position = 'fixed';
		box3.style.backgroundColor = 'aqua';
		box3.style.width = '5px';
		box3.style.height = '5px';
		box3.style.border = 'none';
		BODY.append(box3);

		box4.style.margin = '0';
		box4.style.padding = '0';
		box4.style.position = 'fixed';
		box4.style.backgroundColor = 'aqua';
		box4.style.width = '5px';
		box4.style.height = '5px';
		box4.style.border = 'none';
		BODY.append(box4);

		var pos = GET_ENTITY_CORNERS_POSITION(id);

		box1.style.left = pos[1] + 'px';
		box1.style.top = pos[2] + 'px';

		box2.style.left = pos[3] + 'px';
		box2.style.top = pos[4] + 'px';

		box3.style.left = pos[5] + 'px';
		box3.style.top = pos[6] + 'px';

		box4.style.left = pos[7] + 'px';
		box4.style.top = pos[8] + 'px';


	}


	//Retorna a posicao dos 4 cantos de um elemento
	function GET_ENTITY_CORNERS_POSITION(id) {

		var player = GET_ENTITY(id);

		var pos = Array();

		pos[1] = player.offsetWidth + player.offsetLeft;
		pos[2] = player.offsetTop;

		pos[3] = player.offsetWidth + player.offsetLeft;
		pos[4] = player.offsetTop + player.offsetHeight;

		pos[5] = player.offsetLeft;
		pos[6] = player.offsetTop + player.offsetHeight;

		pos[7] = player.offsetLeft;
		pos[8] = player.offsetTop;

		return pos;
		//var ponto1_x = player.offsetWidth + player.offsetLeft;
		//var ponto1_y = player.offsetTop;
		//
		//var ponto2_x = player.offsetWidth + player.offsetLeft;
		//var ponto2_y = player.offsetTop + player.offsetHeight;
		//
		//var ponto3_x = player.offsetLeft;
		//var ponto3_y = player.offsetTop + player.offsetHeight;
		//
		//var ponto4_x = player.offsetLeft;
		//var ponto4_y = player.offsetTop;
	}


	//true se obj1 encostou em obj2
	function IS_COLLIDED(obj1, obj2) {
		/*Exemplo
		if(IS_COLLIDED('player','casa'))
			casa.style.backgroundColor = 'yellow';
		else
			casa.style.backgroundColor = 'red';
			*/

		var player_pos = GET_ENTITY_CORNERS_POSITION(obj1);
		var casa_pos = GET_ENTITY_CORNERS_POSITION(obj2);

		if (player_pos[1] >= casa_pos[5] && player_pos[5] <= casa_pos[1] &&
			player_pos[4] >= casa_pos[2] && player_pos[2] <= casa_pos[4])
			return true
		else
			return false;
	}

	//true se onj1 esta COMPLETAMENTE dentro de obj2
	function IS_ENTITY_INSIDE_ENTITY(obj1, obj2) {

		var player = GET_ENTITY(obj1);
		var casa = GET_ENTITY(obj2);


		var x_player = player.offsetLeft// || 40;
		var y_player = player.offsetTop //|| 55;
		var tam_x_player = player.offsetWidth + x_player;
		var tam_y_player = player.offsetHeight + y_player;

		var x_casa = casa.offsetLeft;
		var y_casa = casa.offsetTop;
		var tam_x_casa = casa.offsetWidth + x_casa;
		var tam_y_casa = casa.offsetHeight + y_casa;

		if (tam_x_player <= tam_x_casa && x_player >= x_casa &&
			tam_y_player <= tam_y_casa && y_player >= y_casa)
			return true;
		else
			return false;
	}


	//Aplica movimentação em um elemento com W,S,A,D
	//Ex:
	//const player = CREATE_PLAYER('player.png');
	//ADD_PLAYER_MOVIMENT_SYSTEM(player);
	function ADD_PLAYER_MOVIMENT_SYSTEM(id, velocidade = 5) {

		var player = GET_ENTITY(id);

		document.addEventListener('keydown',
			function (event) {

				var x = player.offsetLeft || 0;
				var y = player.offsetTop || 0;

				if (event.key === 'w') {
					y -= velocidade;
					player.style.transform = 'rotate(0deg)';
				}
				if (event.key === 's') {
					y += velocidade;
					player.style.transform = 'rotate(180deg)';
				}

				if (event.key === 'a') {
					x -= velocidade;
					player.style.transform = 'rotate(270deg)';
				}
				if (event.key === 'd') {
					x += velocidade;
					player.style.transform = 'rotate(90deg)';
				}

				player.style.top = y + 'px';
				player.style.left = x + 'px';
			}
		);

	}
