$(function() {
	//saving dom objects to variables
	var container =$("#container");
	var car =$("#car_p");
	var car_1=$("#car_1");
	var car_2= $("#car_2");
	var car_3= $("#car_3");
	var line_1=$("#line_1");
	var line_2=$("#line_2");
	var line_3=$("#line_3");
	var restart_div = $("#restart_div");
	var restart_btn = $("#restart_btn");

	var anim_id;

	var game_over= false;
	var move_left= false;
	var move_right= false;
	var move_up= false;
	var move_down= false;
	
	
	var container_width = $("#container").width();
	var car_width= $("#car_p").width();
	var container_height = $("#container").height();
	var car_height= $("#car_p").height();
	
	var speed= 2;
	var line_speed= 5;
	var score_counter=1;
	
	$(document).keydown(function(e) {
		if(game_over=== false) {
			var key=e.keyCode;
			if(key === 37 )
			    {
				move_left = left();
			    } else if(key === 38)
			   	{
				move_up= up();
			   	}
			      else if(key === 39)
			   	{
				move_right= right();
			   	}
			     else if(key === 40)
			   	{
				move_down= down();
			   	}
			}
		});
		function left(){
		    if(game_over=== false && parseInt(car.css('left'))>0)
			car.css('left',parseInt(car.css('left'))-10);
			//move_left=left();
				}

		function up(){
		   if(game_over=== false && parseInt(car.css('top'))>0)
			car.css('top',parseInt(car.css('top'))-10);
			//move_up=up();
			     }
		function right() {
		   if(game_over === false && parseInt(car.css('left'))< container_width - car_width)
			car.css('left',parseInt(car.css('left'))+10);
				}
		function down() {
		   if(game_over === false && parseInt(car.css('top'))< container_height - car_height)
			car.css('top',parseInt(car.css('top'))+10);
				}
			
	//$(document).on('keyup',function(e){
		//if(game_over === false){
			//var key= e.keyCode;
			//}
		//});

		var amin_id= repeat();
	
		function repeat(){

		if(game_over === false)
		{
			if(collision(car,car_1) || collision(car,car_2) || collision(car,car_3)){
			stopTheGame();
			}


			score_counter++;
	
			if(score_counter %20 === 0){
				$("#spa").text(parseInt($("#spa").text())+1);
			}

			if(score_counter %400 === 0){
				speed++;
			}	

			car_down(car_1);
			car_down(car_2);
			car_down(car_3);
			
			line_down(line_1);
			line_down(line_2);
			line_down(line_3);
		
			var amin_id= requestAnimationFrame(repeat);
		}
				};

		function car_down(car){
			var current_top = parseInt(car.css('top'));
		
			if(current_top>container_height){								current_top=-200;
			     	var car_left= parseInt(Math.random()*(container_width-car_width));
				car.css('left', car_left);
				}

			car.css('top',current_top+speed);
				    }

		function line_down(line){
			var line_current_top= parseInt(line.css('top'));

			if(line_current_top>container_height){
				line_container_top = -300;
				
					}
				
			line.css('top', line_current_top+ line_speed);
					}


		function stopTheGame(){
			game_over = true;
			cancelAnimationFrame(anim_id);
			cancelAnimationFrame(move_left);
			cancelAnimationFrame(move_down);
			cancelAnimationFrame(move_right);
			cancelAnimationFrame(move_up);
			$("#restart_div").css("display", "inline");
			$("#restart").focus();
			$("#win").text("your score is " + $("#spa").text());			
				}

			$("#restart").click(function() {
				location.reload(true);
					
				});


		function collision($div1 , $div2) {
			
			var x1 = $div1.offset().left;
			var y1 = $div1.offset().top;
			var h1 = $div1.outerHeight(true);
			var w1 = $div1.outerWidth(true);

			var b1 = y1+h1;	
			var r1 = x1+w1;

			var x2 = $div2.offset().left;
			var y2 = $div2.offset().top;
			var h2 = $div2.outerHeight(true);
			var w2 = $div2.outerWidth(true);
	
			var b2 = y2 + h2;
			var r2 = x2 + w2;
			
			if(b1<y2 || y1>b2 || r1<x2 || x1>r2)
				return false;
		
			return true;

			}
			





	});	