//程序的执行
var lifeGame = {
	canvas: null,
	canvasContext: null,

    start_game: null, //游戏开始,获取画布和上下文,并开始主循环
	clear_canvas: null, //清理画布
	update_map: null, //更新地图
	restart_game: null, //重新开始
	main_loop: null //游戏主循环
};

//程序的底层函数操作
var gameMap = {
	row: 50,
	col: 50,
	grid: [],

    init_map: null,  //初始化地图
    draw_map: null, //画地图
    map_left_right: null, //左右关联
    map_top__bottom: null, //上下关联
    alive_life_around: null, //周围活着的细胞数
    next_state: null, //计算某细胞下回合的生存状态
    calc_next_state: null, //计算下一回合所有细胞生存状态
    change_next_state: null, //转换到下一回合的生存状态
    is_alive: null //细胞是否存活
};

//定时器
var gameTimer = {
    life_time: 0
};

lifeGame.start_game = function(){
	lifeGame.canvas = document.getElementById("myCanvas");
	lifeGame.canvasContext = lifeGame.canvas.getContext("2d");
	
	gameMap.init_map(20);
	gameMap.draw_map();
	life_time = setInterval(lifeGame.main_loop, 200);
};

lifeGame.clear_canvas = function(){
	lifeGame.canvasContext.clearRect(0, 0, lifeGame.canvas.width, lifeGame.canvas.height);
};

lifeGame.update_map = function(){
	gameMap.calc_next_state();
	gameMap.change_next_state();
	gameMap.draw_map();
};

lifeGame.restart_game = function(){
	var size = parseInt(document.getElementById('gridSize').value);
	if(isNaN(size) || size < 1 || size > 100){
		alert("请输入1到100的数值");
		return;
	}

	lifeGame.clear_canvas();
    
    if(life_time != 0){
    	clearInterval(life_time);
    }

	gameMap.row = size;
	gameMap.col = size;
	gameMap.init_map(20);
	gameMap.draw_map();
    
    life_time = setInterval(lifeGame.main_loop, 200);
};

lifeGame.main_loop = function(){
	lifeGame.clear_canvas();
	lifeGame.update_map();
};

gameMap.init_map = function(percent){
	for(var i = 0; i < gameMap.row; i++){
		gameMap.grid[i] = [];
		for(var j = 0; j < gameMap.col; j++){
			if(Math.random() * 100 <= percent){
				gameMap.grid[i][j] = {'life_state': 1, 'life_next_state': 1};
			}
			else{
				gameMap.grid[i][j] = {'life_state': 0, 'life_next_state': 0};
			}
		}
	}
};

gameMap.draw_map = function(){
	var intervalX = lifeGame.canvas.width / gameMap.col;
	var intervalY = lifeGame.canvas.height / gameMap.row;

    lifeGame.canvasContext.fillStyle = "#000";
     
	for(var i = 0; i < gameMap.row; i++){
		for(var j = 0; j < gameMap.col; j++){
			if(gameMap.grid[i][j].life_state === 0){ //死亡的细胞
				lifeGame.canvasContext.strokeStyle = "#000";
				lifeGame.canvasContext.fillRect(intervalX * j, intervalY * i, intervalX, intervalY);
				lifeGame.canvasContext.stroke();
			}
		}
	}
};

gameMap.map_left_right = function(y){
	return (y >= gameMap.col || y < 0) ? (y % gameMap.col + gameMap.col) % gameMap.col: y;
};

gameMap.map_top__bottom = function(x){
	return (x >= gameMap.row || x < 0) ? (x % gameMap.row + gameMap.row) % gameMap.row: x;
};

gameMap.alive_life_around = function(x, y){
	return gameMap.grid[gameMap.map_top__bottom(x - 1)][gameMap.map_left_right(y - 1)].life_state + gameMap.grid[gameMap.map_top__bottom(x - 1)][y].life_state + gameMap.grid[gameMap.map_top__bottom(x - 1)][gameMap.map_left_right(y + 1)].life_state + gameMap.grid[x][gameMap.map_left_right(y - 1)].life_state + gameMap.grid[x][gameMap.map_left_right(y + 1)].life_state + gameMap.grid[gameMap.map_top__bottom(x + 1)][gameMap.map_left_right(y + 1)].life_state + gameMap.grid[gameMap.map_top__bottom(x + 1)][y].life_state + gameMap.grid[gameMap.map_top__bottom(x + 1)][gameMap.map_left_right(y - 1)].life_state;
};

gameMap.next_state = function(x, y){
	var alive_life = gameMap.alive_life_around(x, y);
	if(alive_life == 3)
		return 1;
	else if(alive_life == 2)
		return gameMap.grid[gameMap.map_top__bottom(x)][gameMap.map_left_right(y)].life_state;
	else
		return 0;
};

gameMap.calc_next_state = function(){
	for(var i = 0; i < gameMap.row; i++){
		for(var j = 0; j < gameMap.col; j++){
			gameMap.grid[i][j].life_next_state = gameMap.next_state(i, j);
		}
	}
};

gameMap.change_next_state = function(){
	for(var i = 0; i < gameMap.row; i++){
		for(var j = 0; j < gameMap.col; j++){
			gameMap.grid[i][j].life_state = gameMap.grid[i][j].life_next_state;
		}
	}
};

gameMap.is_alive = function(x, y){
	return gameMap.grid[gameMap.map_top__bottom(x)][gameMap.map_left_right(y)].life_state === 1;
};

document.addEventListener('DOMContentLoaded', lifeGame.start_game);