const data = require('./data.json');
const names = require('./names.json');
const fp = require('lodash/fp');

const getGoodsGroup = fp.get('G');
const getGoodsIDGroup = fp.get('G');
const getGoodsNames = fp.get('B');
const getGoodsName = fp.get('N');
const getGoodsPrice = fp.get('C');
const getGoodsQuantity = fp.get('C');
const getGoods = fp.get('Value.Goods');
const getGoodsID = fp.get('T');
const getID = fp.get('ID');
const getName = fp.get('name');

const getGoodsDto = ({groupID, ID, price, quantity}) => ({
	groupID: '',
	ID: '',
	price: 0,
	quantity: 0,
	name: '',
})

const goodsGroupDto = fp.flow(
	fp.entries,
	fp.map(([key, item]) => ({
		ID: key,
		name: getGoodsGroup(item),
	}))
)(names);
// console.log('goodsGroupDto: ', goodsGroupDto);
const goodsNamesDto = fp.flow(
	fp.entries,
	fp.map(([_, item]) => getGoodsNames(item)),
	fp.map(fp.entries),
	(args) => {
		console.log(args);
		return args;
	},
	fp.flatten,
	fp.map(([key, item])=>({
		ID: key,
		name: getGoodsName(item),
	}))
)(names);
// console.log('goodsNamesDto: ', goodsNamesDto);

const goodsDto = fp.flow(getGoods, fp.map((goods) => {
	return ({
		groupID: getGoodsIDGroup(goods),
		ID: getGoodsGroup(goods),
		price: getGoodsPrice(goods),
		quantity: getGoodsQuantity(goods),
		name: fp.flow(fp.find((goodsDto) => getGoodsID(goods) == getID(goodsDto)), getName)(goodsNamesDto),
	})
}))(data)
console.log(goodsDto);
