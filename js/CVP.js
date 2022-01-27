var btnnn = document.getElementById("CVPBtn");
var modalll = document.getElementById('CVPModal');
var spannn = document.getElementsByClassName("closeee")[0];
btnnn.onclick = function()
{
	modalll.style.display = "block";
}
spannn.onclick = function()
{
	modalll.style.display = "none";
}

window.onclick = function(event)
{
	if(event.target == modalll)
	{
		modalll.style.display = "none";
	}
}