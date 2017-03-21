var game = {
	data:null,RN:4,CN:4,//保存游戏的二维数组，总行数，总列数
	score:0,//保存游戏的得分
	name:null,
	GAMEOVER:document.getElementById("gameOver"),//结束
	start(){//游戏启动
		this.GAMEOVER.style.display = "none";
		this.score = 0;//游戏初始，得分为零。
		this.data =  [];
		for(var r=0;r<this.RN;r++){
			this.data[r] = [];
			for(var c=0;c<this.CN;c++){
				this.data[r][c] = 0;
			}
		}
		this.randomNum();
		this.randomNum();
		this.updataView();
		//事件:
		document.onkeydown = function(e){
			switch(e.keyCode){
				case 37://左移
					this.moveLeft();
					break;
				case 38://上移
					this.moveUp();
					break;
				case 39://右移
					this.moveRight();
					break;
				case 40://下移
					this.moveDown();
					break;
			}
		}.bind(this);
	},
	//游戏结束
	isGameOver(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				if(this.data[r][c]==0){
					return false;
				}else if(c<this.CN-1&&(this.data[r][c]==this.data[r][c+1])){
					return false;
				}else if(r<this.RN-1&&(this.data[r][c]==this.data[r+1][c])){
					return false;
				}
			}
		}
		return true;
	},
	//左移
	moveLeft(){
		var before = String(this.data);
		for(var r=0;r<this.RN;r++){
			this.moveLeftInRow(r);
		}
		var after = String(this.data);
		if(before!=after){
			this.randomNum();
			if(this.isGameOver()){
				this.GAMEOVER.style.display = "block";
			}else{
				this.updataView();
			}
			
		}
	},
	moveLeftInRow(r){//左移第r行
		for(var c=0;c<this.CN-1;c++){
			var nextC = this.getNextInRow(r,c);
			if(nextC==-1){
				break;
			}else if(this.data[r][c]==0){
				this.data[r][c] = this.data[r][nextC];
				this.data[r][nextC] = 0;
				c--;
			}else if(this.data[r][c]==this.data[r][nextC]){
				this.data[r][c] = this.data[r][c]+this.data[r][nextC];
				this.score+=this.data[r][c];
				this.data[r][nextC] = 0;
			}
		}
	},
	getNextInRow(r,c){//查找r行c列下一个不为0的位置
		for(var i=c+1;i<this.CN;i++){
			if((this.data[r][i]!=0)){
				return i;
			}
		}
		return -1;
	},
	//右移
	moveRight(){
		var before = String(this.data);
		for(var r=0;r<this.RN;r++){
			this.moveRightInRow(r);
		}
		var after = String(this.data);
		if(before!=after){
			this.randomNum();
			if(this.isGameOver()){
				this.GAMEOVER.style.display = "block";
			}else{
				this.updataView();
			}
			
		}
	},
	moveRightInRow(r){
		for(var c=this.CN-1;c>0;c--){
			var prevc = this.getPrevInRow(r,c);
			if(prevc==-1){
				break;
			}else if(this.data[r][c]==0){
				this.data[r][c] = this.data[r][prevc];
				this.data[r][prevc] = 0;
				c++;
			}else if(this.data[r][c]==this.data[r][prevc]){
				this.data[r][c] = this.data[r][c]+this.data[r][prevc];
				this.score+=this.data[r][c];
				this.data[r][prevc] = 0;
			}
		}
	},
	getPrevInRow(r,c){//查找r行c列左侧前一个不为0的位置
		for(var i=c-1;i>=0;i--){
			if(this.data[r][i]!=0){
				return i;
			}
		}
		return -1;
	},
	//上移
	moveUp(){
		var before = String(this.data);
		for(var c=0;c<this.CN;c++){
			this.moveUpInCol(c);
		}
		var after = String(this.data);
		if(before!=after){
			this.randomNum();
			if(this.isGameOver()){
				this.GAMEOVER.style.display = "block";
			}else{
				this.updataView();
			}
			
		}
	},
	moveUpInCol(c){
		for(var r=0;r<this.RN-1;r++){
			var nextR = this.getNextInCol(r,c);
			if(nextR==-1){
				break;
			}else if(this.data[r][c]==0){
				this.data[r][c] = this.data[nextR][c];
				this.data[nextR][c] = 0;
				r--;
			}else if(this.data[r][c]==this.data[nextR][c]){
				this.data[r][c]*=2;
				this.score+=this.data[r][c];
				this.data[nextR][c] = 0;
			}
		}
	},
	getNextInCol(r,c){
		for(var i=r+1;i<this.RN;i++){
			if(this.data[i][c]!=0){
				return i;
			}
		}
		return -1;
	},
	//下移
	moveDown(){
		var before = String(this.data);
		for(var c=0;c<this.CN;c++){
			this.moveDownInCol(c);
		}
		var after = String(this.data);
		if(before!=after){
			this.randomNum();
			if(this.isGameOver()){
				this.GAMEOVER.style.display = "block";
			}else{
				this.updataView();
			}
			
		}
	},
	moveDownInCol(c){
		for(var r=this.RN-1;r>0;r--){
			var prevR = this.getPrevInCol(r,c);
			if(prevR==-1){
				break;
			}else if(this.data[r][c]==0){
				this.data[r][c] = this.data[prevR][c];
				this.data[prevR][c] = 0;
				r++;
			}else if(this.data[r][c]==this.data[prevR][c]){
				this.data[r][c]*=2;
				this.score+=this.data[r][c];
				this.data[prevR][c] = 0;
			}
		}
	},
	getPrevInCol(r,c){
		for(var i=r-1;i>=0;i--){
			if(this.data[i][c]!=0){
				return i;
			}
		}
		return -1;
	},

	updataView(){//将data中的数据更新到每个div中
		for(var r=0;r<this.RN;r++){//遍历二维数组
			for(var c=0;c<this.CN;c++){
				var n = this.data[r][c];
				//找到id为crc的div
				var div = document.getElementById("c"+r+c);
				if(n!==0){
					div.innerHTML = n;
					div.className = "cell n"+n;
				}else{
					div.innerHTML = "";
					div.className = "cell";
				}
			}
		}
		//找到id为score的span设置其内容为score属性
		document.getElementById("score").innerHTML = this.score;
	},
	randomNum(){//在一个随机位置生成2或者4
		while(true){
			var r = Math.floor(Math.random()*this.RN);
			var c = Math.floor(Math.random()*this.CN);
			if(this.data[r][c]==0){
				this.data[r][c] = Math.random()>0.5?2:4;
				break;
			}
		}
	},

}
game.start();