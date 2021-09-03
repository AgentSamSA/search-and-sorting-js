// Implementation of binary search in JavaScript via recursion

function recursiveBinarySearch(arr, head, tail, target) {
	if (tail >= head) {
		let mid = head + Math.floor((tail - 1) / 2);

		if (arr[mid] == target) {
			return mid;
		}
		if (arr[mid] > target) {
			return recursiveBinarySearch(arr, head, mid - 1, target);
		}
		return recursiveBinarySearch(arr, mid + 1, tail, target);
	}
	return -1;
}

// implementation with iteration

function iterativeBinarySearch(arr, target) {
	let head = 0;
	let tail = arr.length - 1;

	if (arr.length == 0) {
		return -1;
	}
	if (arr.length == 1) {
		return arr[0];
	}
	while (head <= tail) {
		let mid = head + Math.floor((tail - 1) / 2);

		if (arr[mid] == target) {
			return mid;
		}
		if (arr[mid] < target) {
			head = mid + 1;
		} else {
			tail = mid - 1;
		}
	}
	return -1;
}