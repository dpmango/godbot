/* eslint-disable no-labels */
const express = require('express');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log('Server is starting on port: ' + PORT);
});

app.post('/api/auth/login/', (req, res) => {
  res.json({ message: 'Успех' });
});

app.post('/api/auth/verification/', (req, res) => {
  res.json({ message: 'Успех' });
});

app.get('/api/auth/user', (req, res) => {
  res.json({
    message: 'Успех',
    data: {
      name: 'xs290@me.com',
      subscription_date: '2022-12-16T17:08:36.336Z',
      allowed_functions: ['Signal', 'Forecast', 'Investing'],
      tariff: 'PRO Trader',
      access_level: 3,
    },
  });
});

app.get('/api/get_signals', (req, res) => {
  res.json({
    message: 'Нет сигналов',
    data: [],
  });
});

app.get('/api/get_graph', (req, res) => {
  res.json({
    message: 'Успех',
    data: {
      BTC: [
        {
          real: null,
          lower: 16561.0003457486,
          upper: 16658.6360833595,
          forecast: 16601.1349206349,
          timestamp: '2022-11-19T21:30:00Z',
        },
        {
          real: null,
          lower: 16561.1905530586,
          upper: 16658.8274120409,
          forecast: 16601.1349206349,
          timestamp: '2022-11-19T21:15:00Z',
        },
        {
          real: null,
          lower: 16561.4045362824,
          upper: 16659.0426568073,
          forecast: 16601.1349206349,
          timestamp: '2022-11-19T21:00:00Z',
        },
        {
          real: null,
          lower: 16561.6422954198,
          upper: 16659.281817659,
          forecast: 16600.5152380952,
          timestamp: '2022-11-19T20:45:00Z',
        },
        {
          real: null,
          lower: 16562.0464859536,
          upper: 16659.6883911068,
          forecast: 16600.2053968254,
          timestamp: '2022-11-19T20:30:00Z',
        },
        {
          real: null,
          lower: 16562.474452401,
          upper: 16660.1188806397,
          forecast: 16600.5152380952,
          timestamp: '2022-11-19T20:15:00Z',
        },
        {
          real: null,
          lower: 16562.949970676,
          upper: 16660.597202343,
          forecast: 16600.8250793651,
          timestamp: '2022-11-19T20:00:00Z',
        },
        {
          real: null,
          lower: 16563.6632480884,
          upper: 16661.3146848979,
          forecast: 16600.8250793651,
          timestamp: '2022-11-19T19:45:00Z',
        },
        {
          real: null,
          lower: 16564.2814218459,
          upper: 16661.9365031122,
          forecast: 16602.0644444444,
          timestamp: '2022-11-19T19:30:00Z',
        },
        {
          real: null,
          lower: 16564.8044919483,
          upper: 16662.4626569858,
          forecast: 16602.993968254,
          timestamp: '2022-11-19T19:15:00Z',
        },
        {
          real: null,
          lower: 16565.4702175332,
          upper: 16663.1323073704,
          forecast: 16602.3742857143,
          timestamp: '2022-11-19T19:00:00Z',
        },
        {
          real: null,
          lower: 16566.4925818244,
          upper: 16664.1606990325,
          forecast: 16602.6841269841,
          timestamp: '2022-11-19T18:45:00Z',
        },
        {
          real: null,
          lower: 16567.6338256843,
          upper: 16665.3086711204,
          forecast: 16602.0644444444,
          timestamp: '2022-11-19T18:30:00Z',
        },
        {
          real: null,
          lower: 16568.8939491129,
          upper: 16666.5762236341,
          forecast: 16603.6136507937,
          timestamp: '2022-11-19T18:15:00Z',
        },
        {
          real: null,
          lower: 16570.296728024,
          upper: 16667.9872726588,
          forecast: 16603.9234920635,
          timestamp: '2022-11-19T18:00:00Z',
        },
        {
          real: null,
          lower: 16571.6044032802,
          upper: 16669.3026573428,
          forecast: 16604.2333333333,
          timestamp: '2022-11-19T17:45:00Z',
        },
        {
          real: null,
          lower: 16572.7694230538,
          upper: 16670.4745455158,
          forecast: 16605.7825396825,
          timestamp: '2022-11-19T17:30:00Z',
        },
        {
          real: null,
          lower: 16574.0057705687,
          upper: 16671.7181819444,
          forecast: 16605.7825396825,
          timestamp: '2022-11-19T17:15:00Z',
        },
        {
          real: null,
          lower: 16575.4798772211,
          upper: 16673.2009792246,
          forecast: 16606.7120634921,
          timestamp: '2022-11-19T17:00:00Z',
        },
        {
          real: null,
          lower: 16577.1679670972,
          upper: 16674.8990212712,
          forecast: 16610.1203174603,
          timestamp: '2022-11-19T16:45:00Z',
        },
        {
          real: null,
          lower: 16578.7371774045,
          upper: 16676.4774828921,
          forecast: 16608.880952381,
          timestamp: '2022-11-19T16:30:00Z',
        },
        {
          real: null,
          lower: 16580.7343541593,
          upper: 16678.4864340459,
          forecast: 16608.880952381,
          timestamp: '2022-11-19T16:15:00Z',
        },
        {
          real: null,
          lower: 16582.3273403804,
          upper: 16680.0888117519,
          forecast: 16611.6695238095,
          timestamp: '2022-11-19T16:00:00Z',
        },
        {
          real: null,
          lower: 16583.7538952053,
          upper: 16681.5237768617,
          forecast: 16615.6974603175,
          timestamp: '2022-11-19T15:45:00Z',
        },
        {
          real: null,
          lower: 16585.5370887364,
          upper: 16683.3174832491,
          forecast: 16617.5565079365,
          timestamp: '2022-11-19T15:30:00Z',
        },
        {
          real: null,
          lower: 16587.27273044,
          upper: 16685.063357466,
          forecast: 16618.486031746,
          timestamp: '2022-11-19T15:15:00Z',
        },
        {
          real: null,
          lower: 16589.531442246,
          upper: 16687.3353855567,
          forecast: 16621.8942857143,
          timestamp: '2022-11-19T15:00:00Z',
        },
        {
          real: null,
          lower: 16593.1691570495,
          upper: 16690.9945465868,
          forecast: 16620.9647619048,
          timestamp: '2022-11-19T14:45:00Z',
        },
        {
          real: 16694.5,
          lower: 16594.4530563918,
          upper: 16692.2860151857,
          forecast: 16619.4155555556,
          timestamp: '2022-11-19T14:30:00Z',
        },
        {
          real: 16753.5,
          lower: 16596.0460426129,
          upper: 16693.8883928917,
          forecast: 16621.8942857143,
          timestamp: '2022-11-19T14:15:00Z',
        },
        {
          real: 16792.0,
          lower: 16597.0684069041,
          upper: 16694.9167845537,
          forecast: 16624.9926984127,
          timestamp: '2022-11-19T14:00:00Z',
        },
        {
          real: 16810.5,
          lower: 16587.0825467992,
          upper: 16717.255637629,
          forecast: 16636.6001125331,
          timestamp: '2022-11-19T13:45:00Z',
        },
        {
          real: 16745.0,
          lower: 16590.0964142786,
          upper: 16720.2931575165,
          forecast: 16642.4998499558,
          timestamp: '2022-11-19T13:30:00Z',
        },
        {
          real: 16691.5,
          lower: 16592.8842517569,
          upper: 16723.1028735512,
          forecast: 16656.2664040893,
          timestamp: '2022-11-19T13:15:00Z',
        },
        {
          real: 16655.0,
          lower: 16594.9186367366,
          upper: 16725.153224098,
          forecast: 16660.1998124448,
          timestamp: '2022-11-19T13:00:00Z',
        },
        {
          real: 16696.5,
          lower: 16596.8022967256,
          upper: 16727.0516667858,
          forecast: 16652.3329957339,
          timestamp: '2022-11-19T12:45:00Z',
        },
        {
          real: 16698.0,
          lower: 16600.5696167038,
          upper: 16730.8485521612,
          forecast: 16650.3666666667,
          timestamp: '2022-11-19T12:30:00Z',
        },
        {
          real: 16701.5,
          lower: 16604.4876041877,
          upper: 16734.7972874599,
          forecast: 16644.4661790231,
          timestamp: '2022-11-19T12:15:00Z',
        },
        {
          real: 16710.0,
          lower: 16607.3508041613,
          upper: 16737.6829574241,
          forecast: 16638.5664416004,
          timestamp: '2022-11-19T12:00:00Z',
        },
        {
          real: 16694.0,
          lower: 16608.8577666434,
          upper: 16739.2017463358,
          forecast: 16640.5335208886,
          timestamp: '2022-11-19T11:45:00Z',
        },
        {
          real: 16693.0,
          lower: 16606.7480191685,
          upper: 16737.0754418595,
          forecast: 16648.3995873785,
          timestamp: '2022-11-19T11:30:00Z',
        },
        {
          real: 16688.0,
          lower: 16604.3369366819,
          upper: 16734.6454375366,
          forecast: 16664.1332208002,
          timestamp: '2022-11-19T11:15:00Z',
        },
        {
          real: 16681.5,
          lower: 16600.9463142107,
          upper: 16731.2282059372,
          forecast: 16660.1998124448,
          timestamp: '2022-11-19T11:00:00Z',
        },
        {
          real: 16686.0,
          lower: 16597.480386729,
          upper: 16727.7350783441,
          forecast: 16679.866104001,
          timestamp: '2022-11-19T10:45:00Z',
        },
        {
          real: 16677.5,
          lower: 16592.5829167453,
          upper: 16722.7991737048,
          forecast: 16675.9334458665,
          timestamp: '2022-11-19T10:30:00Z',
        },
        {
          real: 16675.0,
          lower: 16586.8565742828,
          upper: 16717.0278917121,
          forecast: 16678.8833145778,
          timestamp: '2022-11-19T10:15:00Z',
        },
        {
          real: 16677.5,
          lower: 16580.9042018192,
          upper: 16711.0288058666,
          forecast: 16682.8167229332,
          timestamp: '2022-11-19T10:00:00Z',
        },
        {
          real: 16686.5,
          lower: 16574.1983193722,
          upper: 16704.2702965973,
          forecast: 16684.7830520005,
          timestamp: '2022-11-19T09:45:00Z',
        },
        {
          real: 16673.5,
          lower: 16566.4376494148,
          upper: 16696.4487219937,
          forecast: 16701.4994748453,
          timestamp: '2022-11-19T09:30:00Z',
        },
        {
          real: 16679.0,
          lower: 16556.7933194684,
          upper: 16686.7287047023,
          forecast: 16701.4994748453,
          timestamp: '2022-11-19T09:15:00Z',
        },
        {
          real: 16686.5,
          lower: 16546.8475970255,
          upper: 16676.7049296286,
          forecast: 16681.8331832891,
          timestamp: '2022-11-19T09:00:00Z',
        },
        {
          real: 16668.5,
          lower: 16538.860897067,
          upper: 16668.6555511722,
          forecast: 16658.2334833775,
          timestamp: '2022-11-19T08:45:00Z',
        },
        {
          real: 16680.5,
          lower: 16533.8880071032,
          upper: 16663.6436346674,
          forecast: 16612.9996624006,
          timestamp: '2022-11-19T08:30:00Z',
        },
        {
          real: 16646.0,
          lower: 16532.2304346,
          upper: 16661.9730537683,
          forecast: 16616.933070756,
          timestamp: '2022-11-19T08:15:00Z',
        },
        {
          real: 16750.5,
          lower: 16530.4221371063,
          upper: 16660.1505650102,
          forecast: 16619.8829394673,
          timestamp: '2022-11-19T08:00:00Z',
        },
        {
          real: 16910.0,
          lower: 16530.4974996016,
          upper: 16660.2265189397,
          forecast: 16614.9667416888,
          timestamp: '2022-11-19T07:45:00Z',
        },
        {
          real: 16763.0,
          lower: 16532.7578570976,
          upper: 16662.5046154035,
          forecast: 16615.9502813329,
          timestamp: '2022-11-19T07:30:00Z',
        },
        {
          real: 16658.5,
          lower: 16535.0935770889,
          upper: 16664.8586657967,
          forecast: 16601.2001875552,
          timestamp: '2022-11-19T07:15:00Z',
        },
        {
          real: 16822.0,
          lower: 16607.3328070824,
          upper: 16810.6128784739,
          forecast: 16696.1046875,
          timestamp: '2022-11-19T00:45:00Z',
        },
        {
          real: 16822.0,
          lower: 16612.0877610586,
          upper: 16815.4260348957,
          forecast: 16668.10625,
          timestamp: '2022-11-19T00:30:00Z',
        },
        {
          real: 16822.0,
          lower: 16615.6539765408,
          upper: 16819.0359022121,
          forecast: 16702.3265625,
          timestamp: '2022-11-19T00:15:00Z',
        },
        {
          real: 16822.0,
          lower: 16618.5069489265,
          upper: 16821.9237960651,
          forecast: 16696.1046875,
          timestamp: '2022-11-19T00:00:00Z',
        },
        {
          real: 16822.0,
          lower: 16622.0731644087,
          upper: 16825.5336633815,
          forecast: 16717.88125,
          timestamp: '2022-11-18T23:45:00Z',
        },
        {
          real: 16821.5,
          lower: 16621.3599213122,
          upper: 16824.8116899182,
          forecast: 16720.9921875,
          timestamp: '2022-11-18T23:30:00Z',
        },
        {
          real: 16821.5,
          lower: 16618.9824443241,
          upper: 16822.4051117073,
          forecast: 16724.103125,
          timestamp: '2022-11-18T23:15:00Z',
        },
        {
          real: 16691.5,
          lower: 16611.8500133598,
          upper: 16815.1853770746,
          forecast: 16724.103125,
          timestamp: '2022-11-18T23:00:00Z',
        },
        {
          real: 16680.5,
          lower: 16604.004339299,
          upper: 16807.2436689787,
          forecast: 16745.8796875,
          timestamp: '2022-11-18T22:45:00Z',
        },
        {
          real: 16691.0,
          lower: 16596.8719083347,
          upper: 16800.023934346,
          forecast: 16730.325,
          timestamp: '2022-11-18T22:30:00Z',
        },
        {
          real: 16678.0,
          lower: 16591.1659635632,
          upper: 16794.2481466398,
          forecast: 16724.103125,
          timestamp: '2022-11-18T22:15:00Z',
        },
        {
          real: 16699.5,
          lower: 16585.6977664906,
          upper: 16788.7130167548,
          forecast: 16739.6578125,
          timestamp: '2022-11-18T22:00:00Z',
        },
        {
          real: 16740.5,
          lower: 16575.2368677429,
          upper: 16778.1240726268,
          forecast: 16717.88125,
          timestamp: '2022-11-18T21:45:00Z',
        },
        {
          real: 16795.5,
          lower: 16566.4402028869,
          upper: 16769.2197332465,
          forecast: 16758.3234375,
          timestamp: '2022-11-18T21:30:00Z',
        },
        {
          real: 16700.0,
          lower: 16555.9793041392,
          upper: 16758.6307891186,
          forecast: 16714.7703125,
          timestamp: '2022-11-18T21:15:00Z',
        },
        {
          real: 16676.0,
          lower: 16547.1826392832,
          upper: 16749.7264497383,
          forecast: 16739.6578125,
          timestamp: '2022-11-18T21:00:00Z',
        },
        {
          real: 16676.5,
          lower: 16534.819758945,
          upper: 16737.2122430416,
          forecast: 16742.76875,
          timestamp: '2022-11-18T20:45:00Z',
        },
        {
          real: 16686.5,
          lower: 16525.3098509926,
          upper: 16727.585930198,
          forecast: 16708.5484375,
          timestamp: '2022-11-18T20:30:00Z',
        },
        {
          real: 16709.0,
          lower: 16516.037690739,
          upper: 16718.2002751756,
          forecast: 16689.8828125,
          timestamp: '2022-11-18T20:15:00Z',
        },
        {
          real: 16687.0,
          lower: 16507.7165212806,
          upper: 16709.7772514374,
          forecast: 16630.775,
          timestamp: '2022-11-18T20:00:00Z',
        },
        {
          real: 16650.5,
          lower: 16508.1920166782,
          upper: 16710.2585670796,
          forecast: 16621.4421875,
          timestamp: '2022-11-18T19:45:00Z',
        },
        {
          real: 16700.5,
          lower: 16510.3317459675,
          upper: 16712.4244874694,
          forecast: 16652.5515625,
          timestamp: '2022-11-18T19:30:00Z',
        },
        {
          real: 16677.5,
          lower: 16512.7092229556,
          upper: 16714.8310656803,
          forecast: 16655.6625,
          timestamp: '2022-11-18T19:15:00Z',
        },
        {
          real: 16690.5,
          lower: 16516.9886815342,
          upper: 16719.1629064599,
          forecast: 16652.5515625,
          timestamp: '2022-11-18T19:00:00Z',
        },
        {
          real: 16708.5,
          lower: 16519.3661585223,
          upper: 16721.5694846708,
          forecast: 16602.7765625,
          timestamp: '2022-11-18T18:45:00Z',
        },
        {
          real: 16709.0,
          lower: 16525.5475986914,
          upper: 16727.8265880191,
          forecast: 16602.7765625,
          timestamp: '2022-11-18T18:30:00Z',
        },
        {
          real: 16671.0,
          lower: 16531.4912911617,
          upper: 16733.8430335464,
          forecast: 16621.4421875,
          timestamp: '2022-11-18T18:15:00Z',
        },
        {
          real: 16678.0,
          lower: 16534.5820112462,
          upper: 16736.9715852205,
          forecast: 16599.665625,
          timestamp: '2022-11-18T18:00:00Z',
        },
        {
          real: 16709.0,
          lower: 16540.0502083189,
          upper: 16742.5067151056,
          forecast: 16577.8890625,
          timestamp: '2022-11-18T17:45:00Z',
        },
        {
          real: 16639.0,
          lower: 16548.1336300784,
          upper: 16750.6890810226,
          forecast: 16618.33125,
          timestamp: '2022-11-18T17:30:00Z',
        },
        {
          real: null,
          lower: 16558.8322765249,
          upper: 16761.5186829717,
          forecast: 16587.221875,
          timestamp: '2022-11-18T17:15:00Z',
        },
        {
          real: 16743.0,
          lower: 16526.2898250264,
          upper: 16814.206658751,
          forecast: 16648.9964190175,
          timestamp: '2022-11-18T17:00:00Z',
        },
        {
          real: 16750.5,
          lower: 16527.1021177236,
          upper: 16815.0331030057,
          forecast: 16620.2765562176,
          timestamp: '2022-11-18T16:45:00Z',
        },
        {
          real: 16751.0,
          lower: 16528.8079509798,
          upper: 16816.7686548566,
          forecast: 16603.2567771157,
          timestamp: '2022-11-18T16:30:00Z',
        },
        {
          real: 16750.5,
          lower: 16531.6510064068,
          upper: 16819.6612412749,
          forecast: 16628.7864457686,
          timestamp: '2022-11-18T16:15:00Z',
        },
        {
          real: 16736.5,
          lower: 16532.6257328538,
          upper: 16820.6529491591,
          forecast: 16644.741474242,
          timestamp: '2022-11-18T16:00:00Z',
        },
        {
          real: 16743.0,
          lower: 16531.527492304,
          upper: 16819.5355753407,
          forecast: 16638.3594628526,
          timestamp: '2022-11-18T15:45:00Z',
        },
        {
          real: 16783.5,
          lower: 16532.8272101987,
          upper: 16820.8579365912,
          forecast: 16660.6973142631,
          timestamp: '2022-11-18T15:30:00Z',
        },
        {
          real: 16693.0,
          lower: 16532.9897059225,
          upper: 16821.0232632743,
          forecast: 16659.6333751823,
          timestamp: '2022-11-18T15:15:00Z',
        },
        {
          real: 16740.0,
          lower: 16534.5331054288,
          upper: 16822.5935514958,
          forecast: 16661.7612533439,
          timestamp: '2022-11-18T15:00:00Z',
        },
        {
          real: 16725.0,
          lower: 16536.7197946427,
          upper: 16824.8183366551,
          forecast: 16667.0793256524,
          timestamp: '2022-11-18T14:45:00Z',
        },
        {
          real: 16833.5,
          lower: 16539.8065936555,
          upper: 16827.9589130981,
          forecast: 16659.6333751823,
          timestamp: '2022-11-18T14:30:00Z',
        },
      ],
    },
  });
});

app.get('/api/get_investing', (req, res) => {
  res.json({
    message: 'Успех',
    data: [
      {
        currency: 'Solana',
        currency_icon:
          'https://api.dev.godbot.pro/media/crypto_currency/A720ECF1-1CBD-4E24-9D9B-97D7FBFC68B7.png',
        graph_path: 'https://api.dev.godbot.pro/media/graphs/test_graph.json',
        datetime: '16.11.2022 15:21:46',
      },
    ],
  });
});

app.get('/api/get_tariffs', (req, res) => {
  res.json({
    message: 'Успех',
    data: [
      {
        title: 'PRO Trader',
        description:
          'Доступ к обучающему курсу;\r\nДоступ к прогнозам ИИ с ТФ: 1 мин, 5 мин, 1 час, 1 день, 1 неделя, 1 месяц;\r\nДоступ ко всем сигналам на покупку/продажу от ИИ;\r\nДоступ криптопортфелю, сформированному ИИ;\r\nДоступ в закрытый чат трейдеров',
        plans: [
          { id: 4, period: { main_period: '1 Month', add_period: '0 Day' }, cost: 999.0 },
          { id: 5, period: { main_period: '6 Month', add_period: '1 Month' }, cost: 1999.0 },
          { id: 6, period: { main_period: '12 Month', add_period: '4 Month' }, cost: 2999.0 },
          { id: 7, period: { main_period: '1 Week', add_period: '0 Day' }, cost: 0.0 },
        ],
      },
      {
        title: 'Trader',
        description:
          'Доступ к обучающему курсу;\r\nДоступ к графику минутного прогноза ИИ;\r\nДоступ к части сигналов на покупку/продажу от ИИ',
        plans: [
          { id: 8, period: { main_period: '1 Week', add_period: '0 Day' }, cost: 0.0 },
          { id: 1, period: { main_period: '1 Month', add_period: '0 Day' }, cost: 0.11 },
          { id: 2, period: { main_period: '6 Month', add_period: '1 Month' }, cost: 0.12 },
          { id: 3, period: { main_period: '12 Month', add_period: '4 Month' }, cost: 0.13 },
        ],
      },
    ],
  });
});

app.get('/api/languages', (req, res) => {
  res.json({
    data: [
      { language: 'RU', icon: 'rus.svg' },
      { language: 'EN', icon: 'eng.svg' },
    ],
  });
});

app.get('/api/winrateToday', (req, res) => {
  res.json({ winrate: getRandomInt(100) });
});
