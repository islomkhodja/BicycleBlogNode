Array.prototype.diff = function(a) {
    var a = this.filter(function(i) {return a.indexOf(i) < 0;});
    var b = a.filter(function(i) {return this.indexOf(i) > 0;});
    return  [a,b];
};
// 2,4,5

function diffr(nt, ot) {
	var a = nt.filter(function(i) {return ot.indexOf(i) < 0;});
    var b = ot.filter(function(i) {return nt.indexOf(i) < 0 });
    return  [a,b];	
}
console.log(diffr([1,2,4,5,7],[1,3,4] ));
console.log(diffr([2,5], [1,2,3,4,5]))

var old = [1,2,3,4,6];
var neW = [2,4,5];

// const result = old.reduce((res, value, index) => {
//   	neW.forEach(n => {
//   		if(n === value)
//   			res[0].push(n)
//   	})
	
// 	return res;	
  
  
// }, [[],[]]);



// console.log(result);

function newAndOld(n, o) {

	n = n.sort();
	o = o.sort();
	var oldtags = o.slice(0);
	var currenttags = n.slice(0); 
	// console.log(o)
	var newTags = [];
	var deletedTags = [];
	console.log("n:", n);
	console.log("o", o);
	/*
	for(let i = 0; i < o.length; i++) {
		for (let j = 0; j < n.length; j++) {
			console.log("current indexes i:",i,"j:",j, "===> ", o[i], "==", n[j], "arrays o:", o, "n:", n);
			if(o[i] === n[j]) {
				o.splice(i, 1);
				n.splice(j, 1);
				console.log("continue, arrays now:", "o:", o, "n:", n)
				continue;
			} else {
				deletedTags.push(n[j]);
			}
		}
	}
	*/
	for(let i = 0; i < o.length; i++) {
		console.log(i+"nchi iteratsiya")
		o.every((i, oindex) => {
			var temp = n.every((j, jindex) => {
			console.log("current indexes i:",oindex,"j:",jindex, "===> ", i, "==", j, "arrays o:", o, "n:", n);
				if(i == j) {
					o.splice(oindex,1);
					n.splice(jindex,1);
					console.log("continue, arrays now:", "o:", o, "n:", n);
					return false;
				} else {
					if(n.length-1 === jindex) {
						console.log(i, "uchun topilmadi", "o'chiramiz" )
						o.splice(oindex, 1);
						deletedTags.push(i);
						return false;
					}

					return true
				}
			})
			if(temp == false) {
				console.log("after continue")
				return false;
			} else {
				return true
			}
		})
	}

	newTags = n;
	console.log("old tags:",oldtags, "current tags:",currenttags);
	console.log("new tags:",newTags, "deleted tags:",deletedTags)
}


newAndOld([2,5], [1,2,3,4,5]);