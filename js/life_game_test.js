describe('gameMap', function(){
	context('gameMap.map_left_right', function(){
		it('should be a function', function(){
		    assert.isFunction(gameMap.map_left_right);
	    });
	    it('should map left and right properly', function(){
			gameMap.row = 3;
			gameMap.col = 4;
	        assert.equal(gameMap.map_left_right(-1), 3);
	        assert.equal(gameMap.map_left_right(-5), 3);
	        assert.equal(gameMap.map_left_right(5), 1);
	        assert.equal(gameMap.map_left_right(2), 2);
		});
	});

	context('gameMap.map_top__bottom', function(){
		it('should be a function', function(){
			assert.isFunction(gameMap.map_top__bottom);
		});
		it('should map top and bottom properly', function(){
			gameMap.row = 3;
			gameMap.col = 4;
	        assert.equal(gameMap.map_top__bottom(-1), 2);
	        assert.equal(gameMap.map_top__bottom(-5), 1);
	        assert.equal(gameMap.map_top__bottom(5), 2);
	        assert.equal(gameMap.map_top__bottom(1), 1);
		});
	});

    context('gameMap.alive_life_around', function(){
    	it('should be a function', function(){
			assert.isFunction(gameMap.alive_life_around);
		});
        it('should figure numbers of lifes alive around rightly', function(){
			gameMap.row = 3;
			gameMap.col = 4;
			for(var i = 0; i < gameMap.row; i++){
				gameMap.grid[i] = [];
				for(var j = 0; j < gameMap.col; j++){
					gameMap.grid[i][j] = {'life_state': 0, 'life_next_state': 0};
				}
			}
	        
	        gameMap.grid[0][0].life_state = 1;
	        gameMap.grid[0][0].life_next_state = 1;

	        gameMap.grid[1][3].life_state = 1;
	        gameMap.grid[1][3].life_next_state = 1;

	        gameMap.grid[2][0].life_state = 1;
	        gameMap.grid[2][0].life_next_state = 1;

	        gameMap.grid[2][2].life_state = 1;
	        gameMap.grid[2][2].life_next_state = 1;
	        
	        assert.equal(gameMap.alive_life_around(0, 0), 2);
	        assert.equal(gameMap.alive_life_around(1, 2), 2);
	        assert.equal(gameMap.alive_life_around(1, 1), 3);
		});
    }); 
    
    context('gameMap.next_state', function(){
    	it('should be a function', function(){
			assert.isFunction(gameMap.next_state);
		});
        it('should figure next state correctly', function(){
			gameMap.row = 3;
			gameMap.col = 4;
			for(var i = 0; i < gameMap.row; i++){
				gameMap.grid[i] = [];
				for(var j = 0; j < gameMap.col; j++){
					gameMap.grid[i][j] = {'life_state': 0, 'life_next_state': 0};
				}
			}
	        
	        gameMap.grid[0][0].life_state = 1;
	        gameMap.grid[0][0].life_next_state = 1;

	        gameMap.grid[1][3].life_state = 1;
	        gameMap.grid[1][3].life_next_state = 1;

	        gameMap.grid[2][0].life_state = 1;
	        gameMap.grid[2][0].life_next_state = 1;

	        gameMap.grid[2][2].life_state = 1;
	        gameMap.grid[2][2].life_next_state = 1;

	        assert.equal(gameMap.next_state(0, 0), 1);
	        assert.equal(gameMap.next_state(1, 2), 0);
	        assert.equal(gameMap.next_state(1, 1), 1);
		});
    });
    
    context('gameMap.is_alive', function(){
    	it('should be a function', function(){
			assert.isFunction(gameMap.is_alive);
		});
		it('should calculate life alive or not rightly', function(){
			gameMap.row = 3;
			gameMap.col = 4;
			for(var i = 0; i < gameMap.row; i++){
				gameMap.grid[i] = [];
				for(var j = 0; j < gameMap.col; j++){
					gameMap.grid[i][j] = {'life_state': 0, 'life_next_state': 0};
				}
			}
	        
	        gameMap.grid[0][0].life_state = 1;
	        gameMap.grid[0][0].life_next_state = 1;

	        gameMap.grid[1][3].life_state = 1;
	        gameMap.grid[1][3].life_next_state = 1;

	        gameMap.grid[2][0].life_state = 1;
	        gameMap.grid[2][0].life_next_state = 1;

	        gameMap.grid[2][2].life_state = 1;
	        gameMap.grid[2][2].life_next_state = 1;

	        assert.equal(gameMap.is_alive(0, 0), true);
            assert.equal(gameMap.is_alive(2, 3), false);
            assert.equal(gameMap.is_alive(-2, 3), true);
            assert.equal(gameMap.is_alive(2, -1), false);
		});   	
    });

});