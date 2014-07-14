/**
 * @author Gabi
 */


var h = ["あ","い","う","え","お",
		 "か","き","く","け","こ",
		 "さ","し","す","せ","そ",
		 "た","ち","つ","て","と",
		 "な","に","ぬ","ね", "の",
		 "は","ひ","ふ","へ","ほ",
		 "ま","み","む","め","も",
		 "や","ゆ","よ",
		 "ら","り","る","れ","ろ",
		 "わ","ゐ","ゑ","を",
		 "ん"];
		 
var romaji = ["a","i","u","e","o",
				"ka","ki","ku","ke","ko",
				"sa","shi","su","se","so",
				"ta","chi","tsu","te","to",
				"na","ni","nu","ne","no",
				"ha","hi","fu","fe","fo",
				"ma","mi","mu","me","mo",
				"ya","yu","yo",
				"ra","ri","ru","re","ro",
				"wa","wi","we","wo",
				"n"];		 
var k = ["ア","イ","ウ","エ","オ",
		 "カ","キ","ク","ケ","コ",
		 "サ","シ","ス","セ","ソ",
		 "タ","チ","ツ","テ","ト",
		 "ナ","ニ","ヌ","ネ","ノ",
		 "ハ","ヒ","フ","ヘ","ホ",
		 "マ","ミ","ム","メ","モ",
		 "ヤ","ユ","ヨ",	
		 "ラ","リ","ル","レ","ロ",
		 "ワ","ヰ","ヱ","ヲ",
		 "ン"];
		 
var random_all = [];
var random_romaji = [];
for(i = 0; i < h.length; i ++){
	random_all[i]= h[i];
	random_romaji[i] = romaji[i];
}
for(i = 0; i < k.length; i ++){
	random_romaji[i+k.length] = romaji[i];
	random_all[i+k.length]= k[i];	
}
var random_twenty = [];
var random_twenty_r =[];

var index = 1;
var wrong = 0;
var correct = 0;	
var percentage = 0;

var start = document.getElementById("start");	
var btn = document.getElementById("checkBtn");	
var inputChar = document.getElementById("inputChar");
var btn = document.getElementById("checkBtn");	
var newGameBtn = document.getElementById("newGameBtn");
var p = document.getElementById("p");
var stats = document.getElementById("p1");
btn.disabled = true;
start.disabled = false;
newGameBtn.disabled = true;
inputChar.disabled = true;

function newGame(){
	index = 1;
	wrong = 0;
	correct = 0;	
	btn.disabled = true;
	start.disabled = false;
	inputChar.innerHTML = p.innerHTML = stats.innerHTML = "";
	inputChar.disabled = true;
	newGameBtn.disabled = true;
}


function startQuiz(elemId){
	var sel = document.getElementById(elemId);	
	
	btn.disabled = false;
	inputChar.disabled = false;
	start.disabled = true;
	switch(sel.options[sel.selectedIndex].text){
		case "Random Twenty":
			shuffle(random_all,random_romaji);
			for(i=0;i<20;i++){
				random_twenty[i] = random_all[i];
				random_twenty_r[i] = random_romaji[i];
			}
			document.getElementById("p").innerHTML = random_all[index-1];
			btn.onclick = function(){checkChar(random_twenty,random_twenty_r)};
			newGameBtn.disabled = false;
			break;
			
		case "All Hiragana":
			shuffle(h,romaji);
			document.getElementById("p").innerHTML = h[index-1];
			btn.onclick = function(){checkChar(h,romaji)};
			newGameBtn.disabled = false;
			break;
			
		case "All Katakana":
			shuffle(k,romaji);
			document.getElementById("p").innerHTML = k[index-1];
			btn.onclick = function(){checkChar(k,romaji)};
			newGameBtn.disabled = false;
			break;	
	}	
//	document.getElementById("p").innerHTML= sel.options[sel.selectedIndex].text; 	
}

function checkChar(arr,arrRomaji){
	
	if(inputChar.value.toUpperCase() == arrRomaji[index-1].toUpperCase()){
		correct ++;		
		incIndex(arr);	
	}else{
		btn.disabled = true;	
		wrong ++;
		setTimeout(incIndex,1000,arr);
		correctAnswer.innerHTML = arrRomaji[index-1].toUpperCase();
	}		
	document.getElementById("p1").innerHTML = "wrong : " +wrong + " correct : "+ correct;
}

function incIndex(arr){
	btn.disabled = false;	
	if(index < arr.length){
		index ++;
	}else{
		index = 1;
		percentage = (correct/(correct + wrong)*100).toFixed(1);
		stats.innerHTML  = percentage + " %";
		wrong = correct =  0;
		btn.disabled = true;
		p.innerHTML = "";
	}
	p.innerHTML = arr[index-1];
	inputChar.value =correctAnswer.innerHTML = "";		
}


function shuffle(arrayChar,arrayRomaji) {
  var currentIndex = arrayChar.length
    , temporaryValue1
    , temporaryValue2
    , randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue1 = arrayChar[currentIndex];
    arrayChar[currentIndex] = arrayChar[randomIndex];
    arrayChar[randomIndex] = temporaryValue1;
    
    temporaryValue2 = arrayRomaji[currentIndex];
    arrayRomaji[currentIndex] = arrayRomaji[randomIndex];
    arrayRomaji[randomIndex] = temporaryValue2;
  }

}

