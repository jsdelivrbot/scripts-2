var rollTime = 1500;

var avatary = ["robot02b", "robot06b"];
function zmenitAvatar(){
	$.ajax({
	        url: "http://plug.dj/_/gateway/user.set_avatar",
	        type: 'POST',
	        data: JSON.stringify({
	          service: "user.set_avatar",
	          body: [
	            
	        	avatary[Math.floor(Math.random()*avatary.length)]
	            
	          ]
	        }),
	        async: this.async,
	        dataType: 'json',
	        contentType: 'application/json'
	      })

}

setInterval(zmenitAvatar, rollTime);
