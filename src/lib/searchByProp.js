const searchByProp = (
	/** @type {*[]} */ array,
	/** @type {*} */ property,
	/** @type {*} */ searchValue
) => {
	return array.filter((/** @type {*} */ item) => item[property] === searchValue);
};

export default searchByProp;
