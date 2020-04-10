// JavaScript Document

cityareaname = new Array(35);
cityareacode = new Array(35);
function first(preP, preC, formname, selectP, selectC) {
	a = 0;
	if (selectP == '01') {
		a = 1;
		tempoption = new Option('北京', '01', false, true);
	} else {
		tempoption = new Option('北京', '01');
	}
	document[formname][preP].options[1] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[1]=tempoption;');
	cityareacode[0] = new Array('0101', '0102', '0103', '0104', '0105', '0106',
			'0107', '0108', '0109', '0110', '0111', '0112', '0113', '0114', '0115'
			, '0116', '0117', '0118');
	cityareaname[0] = new Array('东城区', '西城区', '崇文区', '宣武区', '朝阳区', '海淀区',
			'丰台区', '石景山', '门头沟', '房山区', '通州区', '大兴区', '顺义区', '怀柔区'
			, '密云区', '昌平区', '平谷区', '延庆县');
	if (selectP == '02') {
		a = 2;
		tempoption = new Option('深圳', '02', false, true);
	} else {
		tempoption = new Option('深圳', '02');
	}
	document[formname][preP].options[2] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[2]=tempoption;');
	cityareacode[1] = new Array('0201', '0202', '0203', '0204', '0205', '0206', '0207', '0208', '0209', '0210');
	cityareaname[1] = new Array('罗湖区', '福田区', '南山区', '盐田区', '宝安区', '龙岗区', '光明新区', '龙华新区', '坪山新区', '大鹏新区');
	if (selectP == '03') {
		a = 3;
		tempoption = new Option('上海', '03', false, true);
	} else {
		tempoption = new Option('上海', '03');
	}
	document[formname][preP].options[3] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[3]=tempoption;');
	cityareacode[2] = new Array('0301', '0302', '0303', '0304', '0305', '0306',
			'0307', '0308', '0309', '0310', '0311', '0312', '0313', '0314',
			'0315', '0316', '0317', '0318', '0319', '0320');
	cityareaname[2] = new Array('宝山区', '金山区', '南市区', '长宁区', '静安区', '青浦区', '崇明区', '卢湾区',
			'松江区', '奉贤区', '浦东新区', '杨浦区', '虹口区', '普陀区', '闸北区', '黄浦区', '闵行区', '徐汇区', '嘉定区',
			'南汇区');
	if (selectP == '04') {
		a = 4;
		tempoption = new Option('重庆', '04', false, true);
	} else {
		tempoption = new Option('重庆', '04');
	}
	document[formname][preP].options[4] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[4]=tempoption;');
	cityareacode[3] = new Array('0401', '0402', '0403', '0404', '0405', '0406', 
			                    '0407', '0408', '0409', '0410', '0411', '0412',
			                    '0413', '0414', '0415', '0416', '0417', '0418'
			                    , '0419', '0420', '0421', '0422', '0423', '0424'
			                    , '0425', '0426', '0427', '0428', '0429', '0430'
			                    , '0431', '0432', '0433', '0434', '0435', '0436'
			                    , '0437', '0438', '0439', '0440', '0441');
	cityareaname[3] = new Array('渝中区', '江北区', '沙坪坝区', '南岸区', '九龙坡区', '大渡口区', 
			                    '万州区', '涪陵区', '梁平县', '南川区', '潼南县', '大足区'
			                    , '黔江区', '武隆县', '丰都县', '奉节县', '开县', '云阳县'
			                    , '忠县', '巫溪县', '巫山县', '石柱县', '彭水县', '垫江县', '酉阳县'
			                    , '秀山县', '璧山县', '荣昌县', '铜梁县', '合川区', '巴南区', '北碚区'
			                    , '江津区', '渝北区', '长寿区', '永川区', '沙坪坝区', '綦江区', '高新区'
			                    , '北部新区', '城口县');
	if (selectP == '05') {
		a = 5;
		tempoption = new Option('天津', '05', false, true);
	} else {
		tempoption = new Option('天津', '05');
	}
	document[formname][preP].options[5] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[5]=tempoption;');
	cityareacode[4] = new Array('0501', '0502', '0503', '0504', '0505', '0506',
			'0507', '0508', '0509', '0510', '0511', '0512', '0513', '0514',
			'0515', '0516', '0517', '0518');
	cityareaname[4] = new Array('和平区', '河北区', '河西区', '河东区', '南开区', '红桥区', '塘沽区', '汉沽区',
			'大港区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '滨海区', '蓟县', '静海县', '宁河县');
	if (selectP == '06') {
		a = 6;
		tempoption = new Option('广东', '06', false, true);
	} else// 欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
	{
		tempoption = new Option('广东', '06');
	}
	document[formname][preP].options[6] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[6]=tempoption;');
	cityareacode[5] = new Array('0601', '0602', '0603', '0604', '0605', '0606', '0607',
			'0608', '0609', '0610', '0611', '0612', '0613', '0614', '0615',
			'0616', '0617', '0618', '0619', '0620', '0621');
	cityareaname[5] = new Array('广州市', '深圳市','珠海市', '中山市', '佛山市', '东莞市', '清远市', '肇庆市', '阳江市',
			'湛江市', '韶关市', '惠州市', '河源市', '汕尾市', '汕头市', '梅州市', '茂名市', '江门市', '云浮市', '揭阳市' ,'潮州市');
	if (selectP == '07') {
		a = 7;
		tempoption = new Option('河北', '07', false, true);
	} else// 欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
	{
		tempoption = new Option('河北', '07');
	}
	document[formname][preP].options[7] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[7]=tempoption;');
	cityareacode[6] = new Array('0701', '0702', '0703', '0704', '0705', '0706',
			'0707', '0708', '0709', '0710', '0711');
	cityareaname[6] = new Array('石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '张家口市', '承德市',
			'廊坊市', '沧州市', '保定市', '衡水市');
	if (selectP == '08') {
		a = 8;
		tempoption = new Option('山西', '08', false, true);
	} else {
		tempoption = new Option('山西', '08');
	}
	document[formname][preP].options[8] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[8]=tempoption;');
	cityareacode[7] = new Array('0801', '0802', '0803', '0804', '0805', '0806',
			'0807', '0808', '0809', '0810', '0811');
	cityareaname[7] = new Array('太原市', '大同市', '阳泉市', '朔州市', '长治市', '临汾市', '晋城市', '吕梁市', '晋中市', '运城市', '忻州市');
	if (selectP == '09') {
		a = 9;
		tempoption = new Option('内蒙古', '09', false, true);
	} else {
		tempoption = new Option('内蒙古', '09');
	}
	document[formname][preP].options[9] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[9]=tempoption;');
	cityareacode[8] = new Array('0901', '0902', '0903', '0904', '0905', '0906',
			'0907', '0908', '0909', '0910', '0911', '0912');
	cityareaname[8] = new Array('呼和浩特市', '包头市', '乌海市', '乌兰察布市', '锡林郭勒盟', '呼伦贝尔市', '鄂尔多斯市',
			'通辽市', '赤峰市', '巴彦淖尔市', '阿拉善盟', '兴安盟');
	if (selectP == '10') {
		a = 10;
		tempoption = new Option('辽宁', '10', false, true);
	} else {
		tempoption = new Option('辽宁', '10');
	}
	document[formname][preP].options[10] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[10]=tempoption;');
	cityareacode[9] = new Array('1001', '1002', '1003', '1004', '1005', '1006',
			'1007', '1008', '1009', '1010', '1011', '1012', '1013', '1014');
	cityareaname[9] = new Array('沈阳市', '大连市', '鞍山市', '锦州市', '丹东市', '盘锦市', '铁岭市', '抚顺市',
			'营口市', '辽阳市', '阜新市', '本溪市', '朝阳市', '葫芦岛市');
	if (selectP == '11') {
		a = 11;
		tempoption = new Option('吉林', '11', false, true);
	} else {
		tempoption = new Option('吉林', '11');
	}
	document[formname][preP].options[11] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[11]=tempoption;');
	cityareacode[10] = new Array('1101', '1102', '1103', '1104', '1105',
			'1106', '1107', '1108', '1109');
	cityareaname[10] = new Array('长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市',
			'白城市', '延边州');
	if (selectP == '12') {
		a = 12;
		tempoption = new Option('黑龙江', '12', false, true);
	} else {
		tempoption = new Option('黑龙江', '12');
	}
	document[formname][preP].options[12] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[12]=tempoption;');
	cityareacode[11] = new Array('1201', '1202', '1203', '1204', '1205',
			'1206', '1207', '1208', '1209', '1210', '1211', '1212', '1213');
	cityareaname[11] = new Array('哈尔滨市', '齐齐哈尔市', '牡丹江市', '佳木斯市', '大庆市', '伊春市', '黑河市',
			'鸡西市', '鹤岗市', '双鸭山市', '七台河市', '绥化市', '大兴安岭地区');
	if (selectP == '13') {
		a = 13;
		tempoption = new Option('江苏', '13', false, true);
	} else {
		tempoption = new Option('江苏', '13');
	}
	document[formname][preP].options[13] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[13]=tempoption;');
	cityareacode[12] = new Array('1301', '1302', '1303', '1304', '1305',
			'1306', '1307', '1308', '1309', '1310', '1311', '1312', '1313');
	cityareaname[12] = new Array('南京市', '苏州市', '无锡市', '常州市', '镇江市', '连云港市 ', '扬州市',
			'徐州市 ', '南通市', '盐城市', '淮阴市', '泰州市', '宿迁市');
	if (selectP == '14') {
		a = 14;
		tempoption = new Option('浙江', '14', false, true);
	} else {
		tempoption = new Option('浙江', '14');
	}
	document[formname][preP].options[14] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[14]=tempoption;');
	cityareacode[13] = new Array('1401', '1402', '1403', '1404', '1405',
			'1406', '1407', '1408', '1409', '1410', '1411');
	cityareaname[13] = new Array('杭州市', '湖州市', '丽水市', '温州市', '绍兴市', '舟山市', '嘉兴市',
			'金华市', '台州市', '衢州市', '宁波市');
	if (selectP == '15') {
		a = 15;
		tempoption = new Option('安徽', '15', false, true);
	} else {
		tempoption = new Option('安徽', '15');
	}
	document[formname][preP].options[15] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[15]=tempoption;');
	cityareacode[14] = new Array('1501', '1502', '1503', '1504', '1505',
			'1506', '1507', '1508', '1509', '1510', '1511', '1512', '1513',
			'1514', '1515', '1516', '1517');
	cityareaname[14] = new Array('合肥市  ', '芜湖市 ', '蚌埠市 ', '滁州市 ', '安庆市 ', '六安市 ',
			'黄山市 ', '宣城市 ', '淮南市 ', '宿州市 ', '马鞍山市 ', '铜陵市', '淮北市 ', '阜阳市 ', '池州市 ',
			'巢湖市 ', '亳州市');
	if (selectP == '16') {
		a = 16;
		tempoption = new Option('福建', '16', false, true);
	} else {
		tempoption = new Option('福建', '16');
	}
	document[formname][preP].options[16] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[16]=tempoption;');
	cityareacode[15] = new Array('1601', '1602', '1603', '1604', '1605',
			'1606', '1607', '1608', '1609');
	cityareaname[15] = new Array('福州市 ', '厦门市 ', '泉州市 ', '漳州市 ', '龙岩市 ', '南平市 ',
			'宁德市 ', '莆田市 ', '三明市');
	if (selectP == '17') {
		a = 17;
		tempoption = new Option('江西', '17', false, true);
	} else {
		tempoption = new Option('江西', '17');
	}
	document[formname][preP].options[17] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[17]=tempoption;');
	cityareacode[16] = new Array('1701', '1702', '1703', '1704', '1705',
			'1706', '1707', '1708', '1709', '1710', '1711');
	cityareaname[16] = new Array('南昌市', '景德镇市', '九江市', '萍乡市', '新余市', '鹰潭市', '赣州市',
			'宜春市', '吉安市', '上饶市', '抚州市');
	if (selectP == '18') {
		a = 18;
		tempoption = new Option('山东', '18', false, true);
	} else// 欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
	{
		tempoption = new Option('山东', '18');
	}
	document[formname][preP].options[18] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[18]=tempoption;');
	cityareacode[17] = new Array('1801', '1802', '1803', '1804', '1805',
			'1806', '1807', '1808', '1809', '1810', '1811', '1812', '1813',
			'1814', '1815', '1816', '1817');
	cityareaname[17] = new Array('济南市', '青岛市', '淄博市', '德州市', '烟台市', '潍坊市', '济宁市',
			'泰安市', '临沂市', '菏泽市', '威海市', '枣庄市', '日照市', '莱芜市', '聊城市', '滨州市', '东营市');
	if (selectP == '19') {
		a = 19;
		tempoption = new Option('河南', '19', false, true);
	} else {
		tempoption = new Option('河南', '19');
	}
	document[formname][preP].options[19] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[19]=tempoption;');
	cityareacode[18] = new Array('1901', '1902', '1903', '1904', '1905',
			'1906', '1907', '1908', '1909', '1910', '1911', '1912', '1913',
			'1914', '1915', '1916', '1917', '1918');
	cityareaname[18] = new Array('郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市',
			'焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '周口市', '驻马店市', '信阳市', '济源市');
	if (selectP == '20') {
		a = 20;
		tempoption = new Option('湖北', '20', false, true);
	} else {
		tempoption = new Option('湖北', '20');
	}
	document[formname][preP].options[20] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[20]=tempoption;');
	cityareacode[19] = new Array('2001', '2002', '2003', '2004', '2005',
			'2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013',
			'2014', '2015', '2016', '2017');
	cityareaname[19] = new Array('武汉市', '黄石市', '十堰市', '荆州市', '宜昌市', '襄樊市', '鄂州市',
			'荆门市', '孝感市', '黄冈市', '咸宁市', '恩施州', '随州市', '仙桃市', '天门市', '潜江市', '神农架林区');
	if (selectP == '21') {
		a = 21;
		tempoption = new Option('湖南', '21', false, true);
	} else// 欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
	{
		tempoption = new Option('湖南', '21');
	}
	document[formname][preP].options[21] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[21]=tempoption;');
	cityareacode[20] = new Array('2101', '2102', '2103', '2104', '2105',
			'2106', '2107', '2108', '2109', '2110', '2111', '2112', '2113', '2114');
	cityareaname[20] = new Array('长沙市', '株州市', '张家界市 ', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市',
			'郴州市', '益阳市', '永州市', '怀化市', '娄底市', '湘西州');
	if (selectP == '22') {
		a = 22;
		tempoption = new Option('广西', '22', false, true);
	} else {
		tempoption = new Option('广西', '22');
	}
	document[formname][preP].options[22] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[22]=tempoption;');
	cityareacode[21] = new Array('2201', '2202', '2203', '2204', '2205',
			'2206', '2207', '2208', '2209', '2210', '2211', '2212', '2213', '2214');
	cityareaname[21] = new Array('南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市',
			'贵港市', '玉林市', '贺州市', '百色市', '河池市', '崇左市', '来宾市');
	if (selectP == '23') {
		a = 23;
		tempoption = new Option('海南', '23', false, true);
	} else {
		tempoption = new Option('海南', '23');
	}
	document[formname][preP].options[23] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[23]=tempoption;');
	cityareacode[22] = new Array('2301', '2302', '2303', '2304', '2305',
			'2306', '2307', '2308', '2309', '2310', '2311', '2312', '2313', '2314'
			, '2315', '2316', '2317', '2318', '2319');
	cityareaname[22] = new Array('海口市 ', '三亚市', '五指山市', '临高县', '澄迈县', '文昌市', '万宁市',
			'东方市', '儋州市', '定安县', '屯昌县', '昌江县', '白沙县', '琼中县', '陵水县', '保亭县', '乐东县'
			, '三沙市','琼海市');
	if (selectP == '24') {
		a = 24;
		tempoption = new Option('四川', '24', false, true);
	} else {
		tempoption = new Option('四川', '24');
	}
	document[formname][preP].options[24] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[24]=tempoption;');
	cityareacode[23] = new Array('2401', '2402', '2403', '2404', '2405',
			'2406', '2407', '2408', '2409', '2410', '2411', '2412', '2413',
			'2414', '2415', '2416', '2417', '2418', '2419', '2420', '2421');
	cityareaname[23] = new Array('成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市',
			'遂宁市', '内江市', '乐山市', '南充市', '宜宾市', '广安市', '达州市', '资阳市','巴中市', '雅安市', '眉山市',
			'阿坝州 ', '甘孜州 ', '凉山州 ');
	if (selectP == '25') {
		a = 25;
		tempoption = new Option('贵州', '25', false, true);
	} else {
		tempoption = new Option('贵州', '25');
	}
	document[formname][preP].options[25] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[25]=tempoption;');
	cityareacode[24] = new Array('2501', '2502', '2503', '2504', '2505',
			'2506', '2507', '2508', '2509');
	cityareaname[24] = new Array('贵阳市 ', '六盘水市', '遵义市', '铜仁市', '毕节市', '安顺市', '黔西南州 ',
			'黔东南州', '黔南州');
	if (selectP == '26') {
		a = 26;
		tempoption = new Option('云南', '26', false, true);
	} else {
		tempoption = new Option('云南', '26');
	}
	document[formname][preP].options[26] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[26]=tempoption;');
	cityareacode[25] = new Array('2601', '2602', '2603', '2604', '2605',
			'2606', '2607', '2608', '2609', '2610', '2611', '2612', '2613',
			'2614', '2615', '2616');
	cityareaname[25] = new Array('昆明市', '曲靖市', '玉溪市', '昭通市', '普洱市', '临沧市',
			'保山市', '丽江市', '文山市 ', '红河州 ', '西双版纳州 ', '楚雄州 ', '大理州 ', '德宏州 ', '怒江州', '迪庆州');
	if (selectP == '27') {
		a = 27;
		tempoption = new Option('西藏', '27', false, true);
	} else {
		tempoption = new Option('西藏', '27');
	}
	document[formname][preP].options[27] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[27]=tempoption;');
	cityareacode[26] = new Array('2701', '2702', '2703', '2704', '2705',
			'2706', '2707');
	cityareaname[26] = new Array('拉萨市', '那曲地区', '昌都地区', '山南地区', '日喀则地区', '阿里地区', '林芝地区');
	if (selectP == '28') {
		a = 28;
		tempoption = new Option('陕西', '28', false, true);
	} else {
		tempoption = new Option('陕西', '28');
	}
	document[formname][preP].options[28] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[28]=tempoption;');
	cityareacode[27] = new Array('2801', '2802', '2803', '2804', '2805',
			'2806', '2807', '2808', '2809', '2810');
	cityareaname[27] = new Array('西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市',
			'榆林市', '商洛市', '安康市');
	if (selectP == '29') {
		a = 29;
		tempoption = new Option('甘肃', '29', false, true);
	} else// 欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
	{
		tempoption = new Option('甘肃', '29');
	}
	document[formname][preP].options[29] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[29]=tempoption;');
	cityareacode[28] = new Array('2901', '2902', '2903', '2904', '2905',
			'2906', '2907', '2908', '2909', '2910', '2911', '2912', '2913',
			'2914');
	cityareaname[28] = new Array('兰州市', '金昌市', '白银市', '天水市', '嘉峪关市', '定西市', '平凉市',
			'庆阳市', '陇南市', '武威市', '张掖市', '酒泉市', '甘南州 ', '临夏州');
	if (selectP == '30') {
		a = 30;
		tempoption = new Option('青海', '30', false, true);
	} else {
		tempoption = new Option('青海', '30');
	}
	document[formname][preP].options[30] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[30]=tempoption;');
	cityareacode[29] = new Array('3001', '3002', '3003', '3004', '3005',
			'3006', '3007', '3008');
	cityareaname[29] = new Array('西宁市', '海东地区', ' 海北州 ', '黄南州', '海南州', '果洛州', '玉树州',
			'海西州');
	if (selectP == '31') {
		a = 31;
		tempoption = new Option('宁夏', '31', false, true);
	} else {
		tempoption = new Option('宁夏', '31');
	}
	document[formname][preP].options[31] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[31]=tempoption;');
	cityareacode[30] = new Array('3101', '3102', '3103', '3104', '3105');
	cityareaname[30] = new Array('银川市', '石嘴山市', '吴忠市', '固原市', '中卫市');
	if (selectP == '32') {
		a = 32;
		tempoption = new Option('新疆', '32', false, true);
	} else {
		tempoption = new Option('新疆', '32');
	}
	document[formname][preP].options[32] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[32]=tempoption;');
	cityareacode[31] = new Array('3201', '3202', '3203', '3204', '3205',
			'3206', '3207', '3208', '3209', '3210', '3211', '3212', '3213', '3214', '3215', '3216', '3217', '3218', '3219');
	cityareaname[31] = new Array('乌鲁木齐市', '五家渠市', '阿拉尔市', '图木舒克市', '克拉玛依市', '石河子市',
			'吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏州', '巴音郭楞州', '昌吉州'
			, '博尔塔拉州', '伊犁州', '塔城地区', '阿勒泰地区', '博尔塔拉蒙古自治州阿拉山口口岸');
	if (selectP == '33') {
		a = 33;
		tempoption = new Option('香港', '33', false, true);
	} else {
		tempoption = new Option('香港', '33');
	}
	document[formname][preP].options[33] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[33]=tempoption;');
	cityareacode[32] = new Array('3301', '3302', '3303', '3304', '3305',
			'3306', '3307', '3308', '3309', '3310', '3311', '3312', '3313',
			'3314', '3315', '3316', '3317');
	cityareaname[32] = new Array('中西区', '东区', '九龙城区', '东观塘区', '深水埗区', '湾仔区',
			'黄大仙区', '油尖旺区', '离岛区', '葵青区', '北区', '西贡区', '沙田区', '屯门区', '大埔区',
			'荃湾区', '元朗区');
	if (selectP == '34') {
		a = 34;
		tempoption = new Option('澳门', '34', false, true);
	} else {
		tempoption = new Option('澳门', '34');
	}
	document[formname][preP].options[34] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[34]=tempoption;');
	cityareacode[33] = new Array('3401');
	cityareaname[33] = new Array('澳门特别行政区');
	if (selectP == '35') {
		a = 35;
		tempoption = new Option('台湾', '35', false, true);
	} else {
		tempoption = new Option('台湾', '35');
	}
	document[formname][preP].options[35] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[35]=tempoption;');
	cityareacode[34] = new Array('3501', '3502', '3503', '3504', '3505',
			'3506', '3507', '3508', '3509', '3510', '3511', '3512', '3513',
			'3514', '3515', '3516', '3517', '3518', '3519');
	cityareaname[34] = new Array('台北', '高雄', '台中', '花莲', '基隆', '嘉义', '金门',
			'连江', '苗栗', '南投', '澎湖', '屏东', '台东', '台南', '桃园', '新竹', '宜兰', '云林',
			'彰化');
	if (selectP == '36') {
		a = 36;
		tempoption = new Option('钓鱼岛', '36', false, true);
	} else {
		tempoption = new Option('钓鱼岛', '36');
	}
	document[formname][preP].options[36] = tempoption;
	// eval('document.' + formname + '.' + preP + '.options[34]=tempoption;');
	cityareacode[35] = new Array('3601');
	cityareaname[35] = new Array('钓鱼岛市');
	document[formname][preP].options[a].selected = true;
	// eval('document.' + formname + '.' + preP + '.options[a].selected=true;');
	cityid = selectP;
	if (cityid != '0') {
		b = 0;
		for (i = 0; i < cityareaname[cityid - 1].length; i++) {
			if (selectC == cityareacode[cityid - 1][i]) {
				b = i + 1;
				tempoption = new Option(cityareaname[cityid - 1][i],
						cityareacode[cityid - 1][i], false, true);
			} else
				tempoption = new Option(cityareaname[cityid - 1][i],
						cityareacode[cityid - 1][i]);
			document[formname][preC].options[i + 1] = tempoption;
			// eval('document.' + formname + '.' + preC
			// + '.options[i+1]=tempoption;');
		}
		document[formname][preC].options[b].selected = true;
		// eval('document.' + formname + '.' + preC +
		// '.options[b].selected=true;');
	}
}
function selectcityarea(preP, preC, formname) {
	// cityid = eval('document.' + formname + '.' + preP + '.selectedIndex;');
	cityid = document[formname][preP].selectedIndex;
	// j = eval('document.' + formname + '.' + preC + '.length;');
	j = document[formname][preC].length;
	for (i = 1; i < j; i++) {
		// eval('document.' + formname + '.' + preC + '.options[j-i]=null;')
		document[formname][preC].options[j - i] = null;
	}
	if (cityid != "0") {
		for (i = 0; i < cityareaname[cityid - 1].length; i++) {
			tempoption = new Option(cityareaname[cityid - 1][i],
					cityareacode[cityid - 1][i]);
			// eval('document.' + formname + '.' + preC
			// + '.options[i+1]=tempoption;');
			document[formname][preC].options[i + 1] = tempoption;
		}
	}
}

// 自定义下拉菜单样式
var $$ = function(id) {
	return document.getElementById(id);
}
function initProvinces(provinceWrapId, cityWrapId, provinceName, cityName,
		formName) {
	var selectp = $$(provinceWrapId);
	var selectc = $$(cityWrapId);

	var curSelect2 = selectp.getElementsByTagName("span")[0];
	var oSelect2 = selectp.getElementsByTagName("select")[0];
	var aOption2 = selectp.getElementsByTagName("option");

	var curSelect1 = selectc.getElementsByTagName("span")[0];
	var oSelect1 = selectc.getElementsByTagName("select")[0];
	var aOption1 = selectc.getElementsByTagName("option");

	oSelect2.onchange = function() {
		var text2 = oSelect2.options[oSelect2.selectedIndex].text;
		curSelect2.innerHTML = text2;
		selectcityarea(provinceName, cityName, formName);
	}
	oSelect1.onchange = function() {
		var text1 = oSelect1.options[oSelect1.selectedIndex].text;
		curSelect1.innerHTML = text1;
	}
}
window.onload = function() {
	initProvinces("selectpId", "selectcId", "province", "municipality", "form1");
}