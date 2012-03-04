function add(arr, value) {
	for (var i=0; i < arr.length; i++) {
		if (arr[i] === value) {
			return;
		}
	}
	arr.push(value)
}
exports.add = add