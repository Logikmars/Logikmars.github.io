var btnn = document.getElementById("CVMBtn");
var modall = document.getElementById('CVMModal');
var spann = document.getElementsByClassName("closee")[0];
btnn.onclick = function()
{
	modall.style.display = "block";
}
spann.onclick = function()
{
	modall.style.display = "none";
}

window.onclick = function(event)
{
	if(event.target == modall)
	{
		modall.style.display = "none";
	}
}