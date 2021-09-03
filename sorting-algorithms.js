// Bubble sorting in JavaScript; an isSwapped flag is used to determine if elements are swapped;
// if not, then the array is sorted. Therefore, while average and worst case time is O(n^2), if
// called on an already sorted array, it will be O(n) in the best case.

function bubbleSort(arr) {
	let i, j;
	let len = arr.length;
	let isSwapped = false;
	for (i = 0; i < len; i++) {
		isSwapped = false;

		for (j = 0; j < len; j++) {
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				isSwapped = true;
			}
		}

		if (!isSwapped) {
			break;
		}
	}
	return arr;
}

// Insertion sorting in JavaScript; starts on the second element (first is considered sorted by default)
// keep track of a current element. We go through sorted array and shift elements over until we have a
// spot for the current element to be inserted.
// If the array is sorted, it runs in O(n) time (best case). Average and worst-case scenarios are O(n^2).
// However, when performed on small sets of data, it performs better than more efficient algorithms.

function insertionSort(arr) {
	let len = arr.length;

	for (let i = 1; i < len; i++) {
		let curr = arr[i];
		let j = i - 1;

		while (j > -1 && curr < arr[j]) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = curr;
	}
	return arr;
}

// merge sort in JavaScript; it splits the unsorted array into halves and repeats until there are only
// single element subarrays left. Then, it combines them back together into sorted subarrays, and repeats
// until we are left with a single, sorted array. Has a time complexity of O(nlogn), which is faster than
// both bubble and insertion sort, but is not in-place, so has space complexity of O(n).

// merge function to combine subarrays into sorted arrays;
function merge(left, right) {
	let arr = [];

	while (left.length && right.length) {
		if (left[0] < right[0]) {
			arr.push(left.shift());
		} else {
			arr.push(right.shift());
		}
	}
	return [...arr, ...left, ...right];
}

// merge sort function calling merge
function mergeSort(arr) {
	const half = arr.length / 2;

	if (arr.length < 2) {
		return arr;
	}

	const left = arr.splice(0, half);
	return merge(mergeSort(left), mergeSort(arr));
}

// quick sort in JavaScript; an element is selected, usually the start or end element, as the pivot. The
// rest of the elements are then arranged to either be less than (on the left side) or greater (on the right)
// than the pivot. This process repeats until the array is sorted. While this algorithm has a worst-case
// time-complexity of O(n^2), due to choose a bad pivot (where the pivot is greater/less than most elements),
// choosing a middling pivot grants an average case of O(nlogn), like merge sort. Unlike merge sort, quick sort
// is done in place. Empirically, regardless of pivot strategy, quick sort tends to have an O(nlogn) runtime.

// partition function to split values
function partition(arr, head, tail) {
	const pivotValue = arr[tail];
	let pivotIndex = head;

	for (let i = head; i < tail; i++) {
		if (arr[i] < pivotValue) {
			[arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
			pivotIndex++;
		}
	}
	[arr[pivotIndex], arr[tail]] = [arr[tail], arr[pivotIndex]];
	return pivotIndex;
}

// recursive quick sort function
function recursiveQuickSort(arr, head, tail) {
	if (head >= tail) {
		return;
	}
	let pivot = partition(arr, head, tail);
	recursiveQuickSort(arr, head, pivot - 1);
	recursiveQuickSort(arr, pivot + 1, tail);
}

// iterative quick sort function, utilizing the same partion function
function iterativeQuickSort(arr) {
	let stack = [];
	stack.push(0);
	stack.push(arr.length - 1);

	while (stack[stack.length - 1] >= 0) {
		tail = stack.pop();
		head = stack.pop();
		pivotIndex = partition(arr, head, tail);

		if (pivotIndex - 1 > head) {
			stack.push(head);
			stack.push(pivotIndex - 1);
		}
		if (pivotIndex + 1 < tail) {
			stack.push(pivotIndex + 1);
			stack.push(tail);
		}
	}
}

// selection sort in JavaScript; the array is divided into sorted and unsorted sublists. Sorted is at the start
// and all elements to its right are unsorted. The unsorted list is traversed to find its smallest or largest
// element, which is then swapped with the leftmost unsorted element. The sorted list is then expanded to include
// that element. This repeats and the sorted list is expanded until the array is sorted; after k iterations, the
// first k elements of the array are guaranteed to be sorted. The time complexity is O(n^2) across all cases, which
// make it poor to sort large collections or check if an array is sorted, but it beats other quadratic algorithms
// such as bubble sort; however, insertion sort will perform best for small sets and checking if an array is sorted.

function selectionSort(arr) {
	let len = arr.length;

	for (let i = 0; i < len; i++) {
		let min = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[min]) {
				min = j;
			}
		}
		if (min != i) {
			let temp = arr[i];
			arr[i] = arr[min];
			arr[min] = temp;
		}
	}
	return arr;
}