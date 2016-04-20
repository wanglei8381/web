/**
 * 首页controller
 * @param req
 * @param res
 * @param next
 */
var home = module.exports = function (req, res, next) {
  console.log('进入home controller...');
  next();
};

home.index = function (req, res) {

  var data = {
    //公共参数
    html_title: 'SHOP',
    html_keywords: 'SHOP,无尺,無尺,服装定制,女装定制,量身定制,时装定制,流行时装,流行时尚',
    html_description: '上海,最新流行趋势,世界服装品牌,好看,可爱,时尚,服装,时装,淑女装,服饰,汉服,韩国,欧美,和服,礼服,轻礼服,正装,婚纱,包邮'

  };


  res.render('index', data);
};

home.mallClassify = function (req, res) {

  var data = {
    //公共数据
    html_title: '选款定制',
    html_keywords: 'SHOP,无尺,無尺,服装定制,女装定制,量身定制,时装定制,流行时装,流行时尚',
    html_description: '上海,最新流行趋势,世界服装品牌,好看,可爱,时尚,服装,时装,淑女装,服饰,汉服,韩国,欧美,和服,礼服,轻礼服,正装,婚纱,包邮',
    //模拟数据
    goods: [
      {url: '/image/20151211142611_8273_Big.jpg', link: '/mall/pdetail/87', name: '真丝蕾丝宫廷衬衫（套装 衬衫高领）', brand: 'NEW ARRIVAL', sales: 100, price:218},
      {url: '/image/20151210194634_8908_Big.png', link: '/mall/pdetail/86', name: '落叶色双排大衣',                  brand: 'NEW ARRIVAL', sales: 100, price:218},
      {url: '/image/20151210181326_3089_Big.png', link: '/mall/pdetail/85', name: '真丝蕾丝宫廷衬衫（套装 衬衫高）',   brand: 'NEW ARRIVAL', sales: 129, price:1119},
      {url: '/image/20151210180521_8704_Big.png', link: '/mall/pdetail/84', name: '真丝蕾丝宫廷衬衫（套装 衬衫高领）', brand: 'NEW ARRIVAL', sales: 1000, price:100},
      {url: '/image/20151210175830_4933_Big.png', link: '/mall/pdetail/83', name: '真丝蕾丝宫廷衬衫（套装 衬衫高领）', brand: 'NEW ARRIVAL', sales: 30, price:9999},
      {url: '/image/20151210174249_2760_Big.png', link: '/mall/pdetail/82', name: '真丝蕾丝宫廷衬衫（套装 衬衫高领）', brand: 'NEW ARRIVAL', sales: 300, price:5786},
      {url: '/image/20151110232510_5068_Big.png', link: '/mall/pdetail/80', name: '真丝蕾丝宫廷衬衫（套装 衬衫高领）', brand: 'NEW ARRIVAL', sales: 1550, price:10},
    ]
  };


  res.render('classify', data);
};

home.discoveryList = function (req, res) {

  var data = {
    //公共数据
    html_title: 'SHOP',
    html_keywords: 'SHOP,无尺,無尺,服装定制,女装定制,量身定制,时装定制,流行时装,流行时尚',
    html_description: '上海,最新流行趋势,世界服装品牌,好看,可爱,时尚,服装,时装,淑女装,服饰,汉服,韩国,欧美,和服,礼服,轻礼服,正装,婚纱,包邮'
  };


  res.render('index', data);
};