(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.MotorcyclePrelude = global.MotorcyclePrelude || {})));
}(this, (function (exports) { 'use strict';

function always(a) {
    return function (b) {
        return Function.prototype(b), a;
    };
}

function curry2(fn) {
    function curried(a, b) {
        switch (arguments.length) {
            // tslint:disable-next-line:no-shadowed-variable
            case 1: return function (b) { return fn(a, b); };
            default: return fn(a, b);
        }
    }
    return curried;
}

function curry3(fn) {
    // tslint:disable-next-line:cyclomatic-complexity
    // tslint:disable:no-magic-numbers
    // tslint:disable:no-shadowed-variable
    function curried(a, b, c) {
        switch (arguments.length) {
            case 1: return curry2(function (b, c) { return fn(a, b, c); });
            case 2: return function (c) { return fn(a, b, c); };
            default: return fn(a, b, c);
        }
    }
    return curried;
}

// tslint:disable:no-magic-numbers
// tslint:disable:no-shadowed-variable
function curry4(fn) {
    // tslint:disable-next-line:cyclomatic-complexity
    function curried(a, b, c, d) {
        switch (arguments.length) {
            case 1: return curry3(function (b, c, d) { return fn(a, b, c, d); });
            case 2: return curry2(function (c, d) { return fn(a, b, c, d); });
            case 3: return function (d) { return fn(a, b, c, d); };
            default: return fn(a, b, c, d);
        }
    }
    return curried;
}

// tslint:disable:no-magic-numbers
// tslint:disable:no-shadowed-variable
function curry5(fn) {
    // tslint:disable-next-line:cyclomatic-complexity
    function curried(a, b, c, d, e) {
        switch (arguments.length) {
            case 1: return curry4(function (b, c, d, e) { return fn(a, b, c, d, e); });
            case 2: return curry3(function (c, d, e) { return fn(a, b, c, d, e); });
            case 3: return curry2(function (d, e) { return fn(a, b, c, d, e); });
            case 4: return function (e) { return fn(a, b, c, d, e); };
            default: return fn(a, b, c, d, e);
        }
    }
    return curried;
}

// tslint:disable:no-magic-numbers
// tslint:disable-next-line:cyclomatic-complexity
var curry = function curry(fn) {
    switch (fn.length) {
        case 0: return fn;
        case 1: return fn;
        case 2: return curry2(fn);
        case 3: return curry3(fn);
        case 4: return curry4(fn);
        case 5: return curry5(fn);
        default: return curried(fn, []);
    }
};
// tslint:enable:no-magic-numbers
function curried(fn, previousArgs) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var concatArgs = previousArgs.concat(args);
        if (concatArgs.length >= fn.length)
            return fn.apply(null, concatArgs);
        return curried(fn, concatArgs);
    };
}

var apply = curry2(
// tslint:disable-next-line:cyclomatic-complexity
function apply(f, list) {
    switch (list.length) {
        case 0: return f();
        case 1: return f(list[0]);
        case 2: return f(list[0], list[1]);
        case 3: return f(list[0], list[1], list[2]);
        case 4: return f(list[0], list[1], list[2], list[3]);
        case 5: return f(list[0], list[1], list[2], list[3], list[4]);
        default: return f.apply(null, list);
    }
});

var ascend = curry3(function ascend(f, a, b) {
    var aa = f(a);
    var bb = f(b);
    if (aa < bb)
        return -1;
    if (aa > bb)
        return 1;
    return 0;
});

var binary = function binary(f) {
    return function binaryFn(a, b) {
        return f(a, b);
    };
};

var bind = curry2(function bind(f, obj) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return f.apply(obj, args);
    };
});

var call = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return apply(f, args);
};

function comparator(predicate) {
    return function (a, b) {
        if (predicate(a, b))
            return -1;
        if (predicate(b, a))
            return 1;
        return 0;
    };
}

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 */
var adjust = curry3(function adjust(f, index, list) {
    var length = list.length;
    var newList = Array(length);
    for (var i = 0; i < length; ++i)
        newList[i] = i === index ? f(list[i]) : list[i];
    return newList;
});

/**
 * Returns true if all elements of the list match the predicate,
 * false if there are any that don't.
 */
var all = curry2(function all(f, list) {
    var length = list.length;
    for (var i = 0; i < length; ++i)
        if (!f(list[i]))
            return false;
    return true;
});

/**
 * Returns true if at least one of elements of the list match the predicate,
 * false otherwise.
 */
var any = curry2(function any(f, list) {
    var length = list.length;
    for (var i = 0; i < length; ++i)
        if (f(list[i]))
            return true;
    return false;
});

/**
 * Returns a new list, composed of n-tuples of consecutive elements If n is
 * greater than the length of the list, an empty list is returned.
 */
var aperture = curry2(function aperture(n, list) {
    var length = list.length;
    var newList = [];
    for (var i = 0; i < length; ++i) {
        var innerList = list.slice(i, i + n);
        if (innerList.length < n)
            break;
        newList[i] = list.slice(i, i + n);
    }
    return newList;
});

/**
 * Returns a new list containing the contents of the given list,
 * followed by the given element.
 */
var append = curry2(function append(a, list) {
    var length = list.length;
    var newList = Array(length + 1);
    for (var i = 0; i < length; ++i) {
        newList[i] = list[i];
    }
    newList[length] = a;
    return newList;
});

var just = function (value) {
    return (_a = {}, _a['@@167/Just'] = value, _a);
    var _a;
};
function isJust(maybe) {
    return maybe.hasOwnProperty('@@167/Just');
}
// tslint:disable-next-line:no-shadowed-variable
var fromJust = function (just) { return just['@@167/Just']; };

var NOTHING = { '@@167/Nothing': true };
var nothing = function () { return NOTHING; };
function isNothing(maybe) {
    return maybe['@@167/Nothing'];
}

var isMaybe = function (x) { return isJust(x) || isNothing(x); };
var fromMaybe = curry2(_fromMaybe);
function _fromMaybe(defaultValue, maybe) {
    return isNothing(maybe) ? defaultValue : fromJust(maybe);
}

// tslint:disable-next-line:cyclomatic-complexity
// tslint:disable-next-line:cyclomatic-complexity
function isArrayLike(x) {
    if (Array.isArray(x))
        return true;
    if (!x || typeof x !== 'object' || typeof x === 'string')
        return false;
    if (x.nodeType === 1)
        return !!x.length;
    if (x.length === 0)
        return true;
    if (x.length > 0)
        return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
    return false;
}

/**
 * chain maps a function over a list and concatenates the results.
 * chain is also known as flatMap in some libraries
 *
 * Dispatches to the chain method of the second argument, if present,
 * according to the FantasyLand Chain spec.
 */
var chain = curry2(function chain(f, list) {
    if (!isArrayLike(list))
        return isJust(list) ? f(fromJust(list)) : list;
    var length = list.length;
    var newList = [];
    for (var i = 0; i < length; ++i) {
        var b = f(list[i]);
        newList.push.apply(newList, isArrayLike(b) ? b : [b]);
    }
    return newList;
});

/**
 * Returns the result of concatenating the given lists or strings.
 */
var concat = curry2(function (list1, list2) {
    if (typeof list1 === 'string')
        return (list1) + list2;
    var length1 = list1.length;
    var length2 = list2.length;
    var newList = Array(length1 + length2);
    for (var i = 0; i < length1; ++i)
        newList[i] = list1[i];
    for (var i = 0; i < length2; ++i)
        newList[i + length1] = list2[i];
    return newList;
});

function type(value) {
    if (value === null)
        return "Null";
    if (value === void 0)
        return "Undefined";
    return Object.prototype.toString.call(value).slice(8, -1);
}
function functionName(f) {
    if (f.name)
        return f.name;
    var m = String(f).match(/^function\s*([\w$]+)/);
    if (m)
        return m[1];
}

// tslint:disable:max-file-line-count
var equals = curry2(function equals(x, y) {
    return isEqual(x, y, [], []);
});
function isEqual(a, b, stackA, stackB) {
    if (a === b)
        return true;
    if (type(a) !== type(b))
        return false;
    // tslint:disable-next-line
    if (a == null || b == null)
        return false;
    switch (type(a)) {
        case 'Arguments':
        case 'Array':
        case 'Object':
            if (typeof a.constructor === 'function' &&
                functionName(a.constructor) === 'Promise')
                return a === b;
            break;
        case 'Boolean':
        case 'Number':
        case 'String':
            // tslint:disable-next-line
            if (!(typeof a === typeof b && a.valueOf() === b.valueOf()))
                return false;
            break;
        case 'Date':
            if (a.valueOf() !== b.valueOf())
                return false;
            break;
        case 'Error':
            return a.name === b.name && a.message === b.message;
        case 'RegExp':
            if (!(a.source === b.source &&
                a.global === b.global &&
                a.ignoreCase === b.ignoreCase &&
                a.multiline === b.multiline &&
                a.sticky === b.sticky &&
                a.unicode === b.unicode)) {
                return false;
            }
            break;
        case 'Map':
        case 'Set':
            if (!isEqual(Array.from(a.entries()), Array.from(b.entries()), stackA, stackB))
                return false;
            break;
        case 'Int8Array':
        case 'Uint8Array':
        case 'Uint8ClampedArray':
        case 'Int16Array':
        case 'Uint16Array':
        case 'Int32Array':
        case 'Uint32Array':
        case 'Float32Array':
        case 'Float64Array':
            break;
        case 'ArrayBuffer':
            break;
        default:
            // Values of other types are only equal if identical.
            return false;
    }
    var keysA = Object.keys(a);
    if (keysA.length !== Object.keys(b).length)
        return false;
    var idx = stackA.length - 1;
    while (idx >= 0) {
        if (stackA[idx] === a)
            return stackB[idx] === b;
        idx -= 1;
    }
    stackA.push(a);
    stackB.push(b);
    idx = keysA.length - 1;
    while (idx >= 0) {
        var key = keysA[idx];
        if (!(b[key] && isEqual(b[key], a[key], stackA, stackB)))
            return false;
        idx -= 1;
    }
    stackA.pop();
    stackB.pop();
    return true;
}

/**
 * Returns true if the specified value is equal, in value equality terms,
 * to at least one element of the given list; false otherwise.
 */
var contains = curry2(function contains(value, list) {
    var length = list.length;
    for (var i = 0; i < length; ++i)
        if (equals(value, list[i]))
            return true;
    return false;
});

function copy(list) {
    var length = list.length;
    var newList = Array(length);
    for (var i = 0; i < length; ++i)
        newList[i] = list[i];
    return newList;
}

/**
 * Returns all but the first n elements of the given list or string.
 */
var drop = curry2(function (n, list) {
    // tslint:disable-next-line
    if (typeof list === 'string')
        return list.slice(n);
    var length = list.length;
    if (n >= length)
        return [];
    var newList = Array(length - n);
    for (var i = n; i < length; ++i)
        newList[i - n] = list[i];
    return newList;
});

/**
 * Returns a list containing all but the last n elements of the given list.
 */
var dropLast = curry2(function (n, list) {
    // tslint:disable-next-line
    if (typeof list === 'string')
        return list.slice(0, list.length - n);
    var length = list.length;
    if (n >= length)
        return [];
    var newList = Array(length - n);
    for (var i = 0; i < length - n; ++i) {
        newList[i] = list[i];
    }
    return newList;
});

/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a falsy value. The predicate function is applied to one
 * argument: (value).
 */
var dropLastWhile = curry2(function dropLastWhile(f, list) {
    var length = list.length;
    var i = length;
    while (i > 0) {
        if (!f(list[i - 1]))
            return dropLast(length - i, list);
        i--;
    }
    return dropLast(0, list);
});

/**
 * Returns a new list without any consecutively repeating elements.
 * Equality is determined by applying the supplied predicate to each pair of
 * consecutive elements. The first element in a series of equal elements will be preserved.
 */
var dropRepeatsWith = curry2(function (f, list) {
    var length = list.length;
    var newList = [list[0]];
    var lastUniqueIndex = 0;
    for (var i = 1; i < length; ++i) {
        var b = list[i];
        if (!f(list[lastUniqueIndex], b)) {
            lastUniqueIndex = i;
            newList.push(b);
        }
    }
    return newList;
});
/**
 * Returns a new list without any consecutively repeating elements.
 * Uses value equality to determine equality.
 */
var dropRepeats = dropRepeatsWith(equals);

/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * true. The predicate function is applied to one argument: (value).
 */
var dropWhile = curry2(function dropWhile(f, list) {
    var length = list.length;
    var i = 0;
    while (i < length) {
        if (!f(list[i]))
            return drop(i, list);
        i++;
    }
    return drop(0, list);
});

/**
 * Takes a predicate and a "filterable", and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate.
 * Dispatches to the filter method of the second argument, if present.
 */
var filter = curry2(function filter(predicate, list) {
    var length = list.length;
    var newList = [];
    for (var i = 0; i < length; ++i)
        if (predicate(list[i], i))
            newList.push(list[i]);
    return newList;
});

/**
 * Returns the first element of the list which matches the predicate,
 * or undefined if no element matches.
 */
var find = curry2(function find(f, list) {
    var length = list.length;
    for (var i = 0; i < length; ++i)
        if (f(list[i]))
            return list[i];
    return void 0;
});

/**
 * Returns the index of the first element of the list which matches the
 * predicate, or -1 if no element matches.
 */
var findIndex = curry2(function findIndex(f, list) {
    var length = list.length;
    for (var i = 0; i < length; ++i)
        if (f(list[i]))
            return i;
    return -1;
});

/**
 * Returns the last element of the list which matches the predicate,
 * or undefined if no element matches.
 */
var findLast = curry2(function findLast(f, list) {
    var length = list.length;
    for (var i = length - 1; i >= 0; --i)
        if (f(list[i]))
            return list[i];
    return void 0;
});

/**
 * Returns the index of the last element of the list which matches the predicate,
 * or -1 if no element matches.
 */
var findLastIndex = curry2(function findLastIndex(f, list) {
    var length = list.length;
    for (var i = length - 1; i >= 0; --i)
        if (f(list[i]))
            return i;
    return -1;
});

var reduce = curry3(function reduce(f, seed, list) {
    if (!isArrayLike(list))
        return isJust(list) ? just(f(seed, fromJust(list), 0)) : just(seed);
    var length = list.length;
    var acc = seed;
    for (var i = 0; i < length; ++i)
        acc = f(acc, list[i], i);
    return acc;
});

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 */
var flatten = function flatten(list) {
    return reduce(flattenReducer, [], list);
};
function flattenReducer(acc, value) {
    return isArrayLike(value)
        ? concat(acc, flatten(value))
        : append(value, acc);
}

/**
 * Iterate over an input list, calling a provided function fn for each
 * element in the list.
 */
var forEach = curry2(function forEach(f, list) {
    var length = list.length;
    for (var i = 0; i < length; ++i)
        f(list[i], i);
    return list;
});

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 */
function fromPairs(list) {
    var length = list.length;
    var obj = {};
    for (var i = 0; i < length; ++i) {
        var _a = list[i], key = _a[0], value = _a[1];
        obj[key] = value;
    }
    return obj;
}

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 */
var groupBy = curry2(function groupBy(f, list) {
    var length = list.length;
    var obj = {};
    for (var i = 0; i < length; ++i) {
        var value = list[i];
        var key = f(value);
        if (obj[key])
            obj[key].push(value);
        else
            obj[key] = [value];
    }
    return obj;
});

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all "equal" according to the provided equality function.
 */
var groupWith = curry2(function groupWith(f, list) {
    var length = list.length;
    var newList = [];
    var innerList = [list[0]];
    for (var i = 1; i < length; ++i) {
        var previous = innerList[innerList.length - 1];
        var current = list[i];
        var equal = f(previous, current);
        if (!equal) {
            newList.push(innerList);
            innerList = [];
        }
        innerList.push(current);
    }
    newList.push(innerList);
    return newList;
});

/**
 * Returns the first element of the given list or string.
 * In some libraries this function is named first.
 */
var head = function head(list) {
    // tslint:disable-next-line
    if (typeof list === 'string')
        return list[0] || '';
    return list[0] || void 0;
};

/**
 * Given a function that generates a key, turns a list into an object indexing
 * the objects by the given key. Note that if multiple objects generate the
 * same value for the indexing key only the last value will be included in the
 * generated object.
 */
var indexBy = curry2(function indexBy(f, list) {
    var length = list.length;
    var obj = {};
    for (var i = 0; i < length; ++i) {
        var value = list[i];
        var key = f(value);
        obj[key] = value;
    }
    return obj;
});

/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array.
 */
var indexOf = curry2(function (value, list) { return findIndex(equals(value), list); });

/**
 * Returns all but the last element of the given list or string.
 */
var init = dropLast(1);

/**
 * Inserts the supplied element into the list, at index index. Note that this
 * is not destructive: it returns a copy of the list with the changes. No lists
 * have been harmed in the application of this function.
 */
var insert = curry3(function insert(index, value, list) {
    var length = list.length;
    if (index < 0)
        return list;
    if (length === 0)
        return [value];
    var newList = [];
    var i = 0;
    for (; i < index; ++i)
        newList[i] = list[i];
    newList[i++] = value;
    for (; i <= length; ++i)
        newList[i] = list[i - 1];
    return newList;
});

var insertAll = curry3(
// tslint:disable-next-line:cyclomatic-complexity
function insertAll(index, values, list) {
    var length = list.length;
    var valuesLength = values.length;
    if (index < 0)
        return list;
    if (length === 0)
        return values;
    var newList = Array(length + valuesLength);
    var i = 0;
    var j = 0;
    for (; i < index; ++i)
        newList[i] = list[i];
    for (; j < valuesLength; ++j)
        newList[j + index] = values[j];
    i = i + j;
    for (; i <= length + index; ++i)
        newList[i] = list[i - j];
    return newList;
});

var intersperse = curry2(function intersperse(value, list) {
    var length = list.length;
    var newLength = length * 2 - 1;
    var newList = Array(newLength);
    for (var i = 0; i < length - 1; ++i) {
        newList[i * 2] = list[i];
        newList[i * 2 + 1] = value;
    }
    newList[newLength - 1] = list[length - 1];
    return newList;
});

var join = curry2(function (separator, list) { return list.join(separator); });

var last = function (list) {
    var length = list.length;
    // tslint:disable-next-line
    if (typeof list === 'string')
        return list[length - 1] || '';
    return list[length - 1];
};

/**
 * Returns the position of the last occurrence of an item in an array, or -1
 * if the item is not included in the array.
 */
var lastIndexOf = curry2(function (value, list) { return findLastIndex(equals(value), list); });

var length = function (list) { return list.length; };

var map = curry2(function map(f, list) {
    if (!isArrayLike(list))
        return isJust(list) ? just(f(fromJust(list))) : list;
    var length = list.length;
    var newList = Array(length);
    for (var i = 0; i < length; ++i)
        newList[i] = f(list[i], i);
    return newList;
});

var mapAccum = curry3(function mapAccum(f, seed, list) {
    var length = list.length;
    var newList = Array(length);
    var r = seed;
    for (var i = 0; i < length; ++i) {
        var _a = f(r, list[i]), b = _a[0], c = _a[1];
        r = b;
        newList[i] = c;
    }
    return [r, newList];
});

var mapAccumRight = curry3(function mapAccum(f, seed, list) {
    var length = list.length;
    var newList = Array(length);
    var r = seed;
    for (var i = length - 1; i >= 0; --i) {
        var _a = f(list[i], r), c = _a[0], b = _a[1];
        r = b;
        newList[i] = c;
    }
    return [newList, r];
});

var mergeAll = function (list) {
    var length = list.length;
    var newObj = {};
    for (var i = 0; i < length; ++i) {
        var obj = list[i];
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                newObj[key] = obj[key];
        }
    }
    return newObj;
};

var none = curry2(function none(f, list) {
    var length = list.length;
    for (var i = 0; i < length; ++i)
        if (f(list[i]))
            return false;
    return true;
});

var nth = curry2(function (index, list) {
    var length = list.length;
    if (index < 0)
        index += length;
    // tslint:disable
    if (typeof list === 'string')
        return list[index] || '';
    // tslint:enable
    return list[index];
});

var pair = curry2(function (a, b) { return [a, b]; });

var partition = curry2(function partition(predicate, list) {
    var length = list.length;
    var left = [];
    var right = [];
    var newList = [left, right];
    for (var i = 0; i < length; ++i) {
        if (predicate(list[i]))
            left.push(list[i]);
        else
            right.push(list[i]);
    }
    return newList;
});

var prop = curry2(function (key, obj) { return obj[key]; });

var pluck = curry2(function (key, list) { return map(prop(key), list); });

var prepend = curry2(function (value, list) {
    var length = list.length;
    var newList = Array(length + 1);
    newList[0] = value;
    for (var i = 0; i < length; ++i)
        newList[i + 1] = list[i];
    return newList;
});

var range = curry2(function (from, to) {
    var length = (to - from) + 1;
    var list = Array(length);
    for (var i = 0; i < length; ++i) {
        list[i] = i + from;
    }
    return list;
});

var reduceBy = curry4(function (f, seed, by, list) {
    var length = list.length;
    var newObj = {};
    for (var i = 0; i < length; ++i) {
        var a = list[i];
        var key = by(a);
        var b = f(newObj[key] || seed, a);
        newObj[key] = b;
    }
    return newObj;
});

var reduceRight = curry3(function reduce(f, seed, list) {
    var length = list.length;
    var acc = seed;
    for (var i = length - 1; i >= 0; --i)
        acc = f(list[i], acc, i);
    return acc;
});

var reduceWhile = curry4(function reduceWhile(p, f, seed, list) {
    var length = list.length;
    var b = seed;
    for (var i = 0; i < length; ++i) {
        var a = list[i];
        if (!p(b, a))
            break;
        b = f(b, a, i);
    }
    return b;
});

/**
 * Takes a predicate and a "filterable", and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate.
 * Dispatches to the filter method of the second argument, if present.
 */
var reject = curry2(function reject(predicate, list) {
    var length = list.length;
    var newList = [];
    for (var i = 0; i < length; ++i)
        if (!predicate(list[i]))
            newList.push(list[i]);
    return newList;
});

var remove = curry3(
// tslint:disable-next-line:cyclomatic-complexity
function remove(index, amount, list) {
    var length = list.length;
    if (amount === 0 || length === 0)
        return list;
    if (index === 0 && amount >= length)
        return [];
    var newList = Array(length - Math.abs(index) - 1);
    for (var i = 0; i < index; ++i)
        newList[i] = list[i];
    for (var i = index + amount; i < length; ++i)
        newList[i - amount] = list[i];
    return newList;
});

var repeat = curry2(function repeat(value, amount) {
    var list = Array(amount);
    for (var i = 0; i < amount; ++i)
        list[i] = value;
    return list;
});

var reverse = function reverse(list) {
    var length = list.length;
    var newList = Array(length);
    for (var i = 0; i < length; ++i)
        newList[i] = list[length - i - 1];
    return newList;
};

var scan = curry3(function scan(f, seed, list) {
    var length = list.length;
    var newList = Array(length);
    var acc = seed;
    for (var i = 0; i < length; ++i) {
        acc = f(acc, list[i], i);
        newList[i] = acc;
    }
    return newList;
});

var slice = curry3(function (start, end, list) {
    // tslint:disable-next-line
    if (typeof list === 'string')
        return list.slice(start, end);
    if (end <= start)
        return [];
    var newLength = end - start;
    var newList = Array(newLength);
    for (var i = start; i < start + newLength; ++i)
        newList[i - start] = list[i];
    return newList;
});

var sort = curry2(function (c, list) { return Array.prototype.slice.call(list, 0).sort(c); });

var splitAt = curry2(function (index, list) {
    return [slice(0, index, list), slice(index, list.length, list)];
});

var splitEvery = curry2(function splitEvery(amount, list) {
    if (amount <= 0)
        return [list];
    var result = [];
    var i = 0;
    while (i < list.length)
        result.push(slice(i, i += amount, list));
    return result;
});

var tail = drop(1);

var take = curry2(function (n, list) { return slice(0, n < 0 ? Infinity : n, list); });

var takeLast = curry2(function (n, list) { return drop(n >= 0 ? list.length - n : 0, list); });

var takeLastWhile = curry2(_takeLastWhile);
function _takeLastWhile(f, list) {
    var index = list.length - 1;
    while (index >= 0 && f(list[index]))
        index -= 1;
    return slice(index + 1, Infinity, list);
}

var takeWhile = curry2(_takeWhile);
function _takeWhile(f, list) {
    var length = list.length;
    var index = 0;
    while (index <= length && f(list[index]))
        index += 1;
    return slice(0, index, list);
}

var times = curry2(function (f, n) {
    var list = Array(n);
    for (var i = 0; i < n; ++i)
        list[i] = f(i);
    return list;
});

var uniq = function (list) { return Array.from(new Set(list)); };

var uniqBy = curry2(function uniqBy(f, list) {
    var length = list.length;
    var set = new Set();
    var newList = [];
    var setSize = 0;
    for (var i = 0; i < length; ++i) {
        var item = list[i];
        var appliedItem = f(item);
        if (set.add(appliedItem).size > setSize) {
            setSize++;
            newList.push(item);
        }
    }
    return newList;
});

var uniqWith = curry2(function uniqWith(comparator, list) {
    var length = list.length;
    var result = [];
    for (var i = 0; i < length; ++i) {
        var item = list[i];
        if (!containsWith(comparator, item, result))
            result.push(item);
    }
    return result;
});
function containsWith(comparator, item, list) {
    var length = list.length;
    for (var i = 0; i < length; ++i)
        if (comparator(item, list[i]))
            return true;
    return false;
}

var unnest = chain(id);

var update = curry3(
// tslint:disable-next-line:cyclomatic-complexity
function update(index, value, list) {
    var length = list.length;
    if (length === 0 || index < 0 || index >= length)
        return list;
    var newList = Array(length);
    for (var i = 0; i < length; ++i)
        newList[i] = i === index ? value : list[i];
    return newList;
});

var without = curry2(function without(values, list) {
    var length = list.length;
    var set = new Set(values);
    var newList = [];
    for (var i = 0; i < length; ++i) {
        var item = list[i];
        if (!set.has(item))
            newList.push(item);
    }
    return newList;
});

var xprod = curry2(function xprod(xs, ys) {
    var xLength = xs.length;
    var yLength = ys.length;
    var newList = [];
    for (var i = 0; i < xLength; ++i) {
        var x = xs[i];
        for (var j = 0; j < yLength; ++j)
            newList.push([x, ys[j]]);
    }
    return newList;
});

var zip = curry2(function zip(xs, ys) {
    var length = Math.min(xs.length, ys.length);
    var newList = Array(length);
    for (var i = 0; i < length; ++i)
        newList[i] = [xs[i], ys[i]];
    return newList;
});

var zipObj = curry2(function zipObj(strings, list) {
    var minLength = Math.min(strings.length, list.length);
    var object = {};
    for (var i = 0; i < minLength; ++i)
        object[strings[i]] = list[i];
    return object;
});

var zipWith = curry3(function zipWith(f, xs, ys) {
    var length = Math.min(xs.length, ys.length);
    var newList = Array(length);
    for (var i = 0; i < length; ++i)
        newList[i] = f(xs[i], ys[i]);
    return newList;
});

// tslint:disable:max-file-line-count

var compose = function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    // tslint:disable-next-line:cyclomatic-complexity
    return function (a) {
        switch (fns.length) {
            case 1: return fns[0](a);
            case 2: return fns[0](fns[1](a));
            case 3: return fns[0](fns[1](fns[2](a)));
            case 4: return fns[0](fns[1](fns[2](fns[3](a))));
            case 5: return fns[0](fns[1](fns[2](fns[3](fns[4](a)))));
            default: return reduceRight(function (value, accumulator) { return value(accumulator); }, a, fns);
        }
    };
};

var construct = function construct(f) {
    var length = f.length;
    function curried(previousArgs) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var concatArgs = previousArgs.concat(args);
            if (concatArgs.length >= length)
                return new (f.bind.apply(f, [void 0].concat(concatArgs)))();
            return curried(concatArgs);
        };
    }
    return curried([]);
};

var curryN = curry2(function (arity, f) { return curriedN(arity, f, []); });
function curriedN(arity, f, previousArgs) {
    if (arity <= 1)
        return f;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var concatArgs = previousArgs.concat(args);
        if (concatArgs.length >= arity)
            return apply(f, concatArgs);
        return curriedN(arity, f, concatArgs);
    };
}

var descend = curry3(function ascend(f, a, b) {
    var aa = f(a);
    var bb = f(b);
    if (aa < bb)
        return 1;
    if (aa > bb)
        return -1;
    return 0;
});

var flip = function (f) {
    return curry2(function (a, b) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return apply(f, [b, a].concat(args));
    });
};

var id = function (value) { return value; };

var invoker = curry3(function (arity, method, obj) {
    return curryN(arity, bind(obj[method], obj));
});

function memoize(f) {
    var cache = new Map();
    return function memoized() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = reduce(function (prev, curr) { return prev + JSON.stringify(curr); }, '', args);
        var result = cache.get(key);
        if (result)
            return result;
        result = apply(f, args);
        if (typeof result === 'function')
            result = memoize(result);
        cache.set(key, result);
        return result;
    };
}

function once(f) {
    var result;
    var called = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (called)
            return result;
        called = true;
        // tslint:disable-next-line
        return result = f.apply(this, args);
    };
}

var onlyWhen = curry4(function (p, b, f, a) {
    return p(a) ? f(a) : b;
});

var __ = { '@@placeholder': true };
var isPlaceholder = function (x) { return x['@@placeholder'] === true; };
var partial = curry2(function (f, args) {
    var fnLength = f.length;
    var argsLength = args.length;
    if (fnLength === 0)
        return f;
    if (argsLength === 0)
        return curryN(fnLength, f);
    var placeholderAmount = filter(isPlaceholder, args).length;
    var length = Math.max(0, fnLength - argsLength) + placeholderAmount;
    function partiallyApplied() {
        var otherArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            otherArgs[_i] = arguments[_i];
        }
        if (placeholderAmount === 0)
            return apply(f, concat(args, otherArgs));
        var combinedArgs = Array(fnLength);
        for (var i = 0; i < combinedArgs.length; ++i)
            combinedArgs[i] = isPlaceholder(args[i]) ? otherArgs.shift() : args[i];
        return apply(f, concat(combinedArgs, otherArgs));
    }
    return curryN(length, partiallyApplied);
});

var pipe = function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    // tslint:disable-next-line:cyclomatic-complexity
    return function (a) {
        switch (fns.length) {
            case 1: return fns[0](a);
            case 2: return fns[1](fns[0](a));
            case 3: return fns[2](fns[1](fns[0](a)));
            case 4: return fns[3](fns[2](fns[1](fns[0](a))));
            case 5: return fns[4](fns[3](fns[2](fns[1](fns[0](a)))));
            default: return reduce(function (accumulator, value) { return value(accumulator); }, a, fns);
        }
    };
};

var tryCatch = curry3(function tryCatch(tryer, catcher, a) {
    try {
        return tryer(a);
    }
    catch (e) {
        return catcher(e);
    }
});

var allPass = curry2(function (predicates, value) {
    for (var _i = 0, predicates_1 = predicates; _i < predicates_1.length; _i++) {
        var predicate = predicates_1[_i];
        if (!predicate(value))
            return false;
    }
    return true;
});

var and = curry2(function (a, b) { return a && b ? true : false; });

var anyPass = curry2(function anyPass(predicates, value) {
    for (var _i = 0, predicates_1 = predicates; _i < predicates_1.length; _i++) {
        var predicate = predicates_1[_i];
        if (predicate(value))
            return true;
    }
    return false;
});

var both = curry2(function (f, g) {
    return function both() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return apply(f, args) && apply(g, args);
    };
});

var complement = function (f) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return !f.apply(null, args);
}; };

var cond = curry2(function cond(predicates, a) {
    for (var _i = 0, predicates_1 = predicates; _i < predicates_1.length; _i++) {
        var _a = predicates_1[_i], predicate = _a[0], f = _a[1];
        if (predicate(a))
            return just(f(a));
    }
    return nothing();
});

var condOr = curry3(function condOr(predicates, defaultValue, a) {
    for (var _i = 0, predicates_1 = predicates; _i < predicates_1.length; _i++) {
        var _a = predicates_1[_i], predicate = _a[0], f = _a[1];
        if (predicate(a))
            return f(a);
    }
    return defaultValue;
});

var defaultTo = curry2(_defaultTo);
function _defaultTo(defaultValue, possibleValue) {
    return !!possibleValue ? possibleValue : defaultValue;
}

var either = curry3(function either(p1, p2, a) {
    if (p1(a) || p2(a))
        return true;
    return false;
});

var ifElse = curry4(function ifElse(predicate, thenF, elseF, value) {
    if (predicate(value))
        return thenF(value);
    return elseF(value);
});

var not = function (value) { return !value; };

var or = curry2(function (a, b) { return a || b; });

var add = curry2(function (a, b) { return a + b; });

var decrement = function (n) { return n - 1; };

var divide = curry2(function (a, b) { return a / b; });

var increment = function (n) { return n + 1; };

var sum = reduce(add, 0);

function mean(numbers) {
    return sum(numbers) / numbers.length;
}

function median(numbers) {
    var length = numbers.length;
    if (length === 0)
        return NaN;
    var width = 2 - length / 2;
    var index = (length - width) / 2;
    return pipe(sort(ascend(id)), slice(index, index + width), mean)(numbers);
}

var modulo = curry2(function (a, b) { return a % b; });

var multiply = curry2(function (a, b) { return a * b; });

var negate = function (n) { return -n; };

var product = reduce(multiply, 1);

var subtract = curry2(function (a, b) { return a - b; });

function clone(obj) {
    return _clone(obj, [], [], true);
}
function _clone(value, refFrom, refTo, deep) {
    // tslint:disable-next-line:cyclomatic-complexity
    function copy(copiedValue) {
        var length = refFrom.length;
        var i = 0;
        for (; i < length; ++i)
            if (value === refFrom[i])
                return refTo[i];
        refFrom[i + 1] = value;
        refTo[i + 1] = copiedValue;
        for (var key in value) {
            if (!value.hasOwnProperty(key))
                continue;
            copiedValue[key] = deep ?
                _clone(value[key], refFrom, refTo, true) : value[key];
        }
        return copiedValue;
    }
    switch (type(value)) {
        case 'Object': return copy({});
        case 'Array': return copy([]);
        case 'Date': return new Date(value.valueOf());
        case 'RegExp': return cloneRegexp(value);
        default: return value;
    }
}
// tslint:disable-next-line:cyclomatic-complexity
function cloneRegexp(pattern) {
    return new RegExp(pattern.source, (pattern.global ? 'g' : '') +
        (pattern.ignoreCase ? 'i' : '') +
        (pattern.multiline ? 'm' : '') +
        (pattern.sticky ? 'y' : '') +
        (pattern.unicode ? 'u' : ''));
}

var assoc = curry3(function assoc(path, value, obj) {
    var newObj = clone(obj);
    newObj[path] = value;
    return newObj;
});

var keys = function (obj) {
    return Object.keys(obj);
};

var propEq = curry3(function (key, value, obj) {
    return obj[key] === value;
});

var set = curry3(function set(key, value, obj) {
    var clonedObj = clone(obj);
    clonedObj[key] = value;
    return clonedObj;
});

var values = function (obj) {
    return map(function (key) { return obj[key]; }, keys(obj));
};

var lt = curry2(function (a, b) { return b < a; });
var lte = curry2(function (a, b) { return b <= a; });
var gt = curry2(function (a, b) { return b > a; });
var gte = curry2(function (a, b) { return b >= a; });

var toLowerCase = function (str) { return str.toLowerCase(); };

var toUpperCase = function (str) { return str.toUpperCase(); };

exports.always = always;
exports.apply = apply;
exports.ascend = ascend;
exports.binary = binary;
exports.bind = bind;
exports.call = call;
exports.comparator = comparator;
exports.compose = compose;
exports.construct = construct;
exports.curry = curry;
exports.curry2 = curry2;
exports.curry3 = curry3;
exports.curry4 = curry4;
exports.curry5 = curry5;
exports.curryN = curryN;
exports.descend = descend;
exports.flip = flip;
exports.id = id;
exports.invoker = invoker;
exports.memoize = memoize;
exports.once = once;
exports.onlyWhen = onlyWhen;
exports.__ = __;
exports.partial = partial;
exports.pipe = pipe;
exports.tryCatch = tryCatch;
exports.adjust = adjust;
exports.all = all;
exports.any = any;
exports.aperture = aperture;
exports.append = append;
exports.chain = chain;
exports.concat = concat;
exports.contains = contains;
exports.copy = copy;
exports.drop = drop;
exports.dropLast = dropLast;
exports.dropLastWhile = dropLastWhile;
exports.dropRepeatsWith = dropRepeatsWith;
exports.dropRepeats = dropRepeats;
exports.dropWhile = dropWhile;
exports.filter = filter;
exports.find = find;
exports.findIndex = findIndex;
exports.findLast = findLast;
exports.findLastIndex = findLastIndex;
exports.flatten = flatten;
exports.forEach = forEach;
exports.fromPairs = fromPairs;
exports.groupBy = groupBy;
exports.groupWith = groupWith;
exports.head = head;
exports.indexBy = indexBy;
exports.indexOf = indexOf;
exports.init = init;
exports.insert = insert;
exports.insertAll = insertAll;
exports.intersperse = intersperse;
exports.join = join;
exports.last = last;
exports.lastIndexOf = lastIndexOf;
exports.length = length;
exports.map = map;
exports.mapAccum = mapAccum;
exports.mapAccumRight = mapAccumRight;
exports.mergeAll = mergeAll;
exports.none = none;
exports.nth = nth;
exports.pair = pair;
exports.partition = partition;
exports.pluck = pluck;
exports.prepend = prepend;
exports.range = range;
exports.reduce = reduce;
exports.reduceBy = reduceBy;
exports.reduceRight = reduceRight;
exports.reduceWhile = reduceWhile;
exports.reject = reject;
exports.remove = remove;
exports.repeat = repeat;
exports.reverse = reverse;
exports.scan = scan;
exports.slice = slice;
exports.sort = sort;
exports.splitAt = splitAt;
exports.splitEvery = splitEvery;
exports.tail = tail;
exports.take = take;
exports.takeLast = takeLast;
exports.takeLastWhile = takeLastWhile;
exports.takeWhile = takeWhile;
exports.times = times;
exports.uniq = uniq;
exports.uniqBy = uniqBy;
exports.uniqWith = uniqWith;
exports.unnest = unnest;
exports.update = update;
exports.without = without;
exports.xprod = xprod;
exports.zip = zip;
exports.zipObj = zipObj;
exports.zipWith = zipWith;
exports.isArrayLike = isArrayLike;
exports.allPass = allPass;
exports.and = and;
exports.anyPass = anyPass;
exports.both = both;
exports.complement = complement;
exports.cond = cond;
exports.condOr = condOr;
exports.defaultTo = defaultTo;
exports.either = either;
exports.ifElse = ifElse;
exports.not = not;
exports.or = or;
exports.add = add;
exports.decrement = decrement;
exports.divide = divide;
exports.increment = increment;
exports.mean = mean;
exports.median = median;
exports.modulo = modulo;
exports.multiply = multiply;
exports.negate = negate;
exports.product = product;
exports.subtract = subtract;
exports.sum = sum;
exports.just = just;
exports.isJust = isJust;
exports.fromJust = fromJust;
exports.nothing = nothing;
exports.isNothing = isNothing;
exports.isMaybe = isMaybe;
exports.fromMaybe = fromMaybe;
exports.assoc = assoc;
exports.clone = clone;
exports.keys = keys;
exports.prop = prop;
exports.propEq = propEq;
exports.set = set;
exports.values = values;
exports.lt = lt;
exports.lte = lte;
exports.gt = gt;
exports.gte = gte;
exports.equals = equals;
exports.toLowerCase = toLowerCase;
exports.toUpperCase = toUpperCase;

Object.defineProperty(exports, '__esModule', { value: true });

})));
