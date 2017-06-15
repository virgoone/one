/* eslint-disable no-extend-native, func-names, radix, no-self-compare */
import { find, findIndex, fill, includes, sortBy, dropWhile, isEqual } from 'lodash';

export {
	find,
	findIndex,
	fill,
	includes,
	sortBy,
	dropWhile,
	isEqual,
};

export function contains(array, item) {
	return array.indexOf(item) !== -1;
}