let canvas;
let context;
var slider = document.getElementById("timeIn");

let fpsInterval = 1000 / 30; // the denominator is frames-per-second
let now;
let then = Date.now();

let bg = new Image();
let min_x = 50;
let max_x = 160;
let min_y = 0;
let max_y = 110;
let size_x = 833;
let size_y = 813;
let ratio_x = size_x / (max_x - min_x)
let ratio_y = size_y / (max_y - min_y)
let point = {
    label: "",
    x: 0,
    y: 0,
    drawX: 0,
    drawY: 0
};
let data = {
    "000x": 101,
    "000y": 55,
    "100x": 99,
    "100y": 45,
    "101x": 88,
    "101y": 56,
    "102x": 93,
    "102y": 62,
    "103x": 104,
    "103y": 66,
    "104x": 109,
    "104y": 59,
    "105x": 116,
    "105y": 49,
    "106x": 116,
    "106y": 65,
    "107x": 108,
    "107y": 44,
    "108x": 104,
    "108y": 35,
    "109x": 89,
    "109y": 42,
    "110x": 80,
    "110y": 57,
    "111x": 89,
    "111y": 67,
    "112x": 126,
    "112y": 90,
    "113x": 121,
    "113y": 36,
    "114x": 132,
    "114y": 38,
    "115x": 94,
    "115y": 32,
    "116x": 85,
    "116y": 33,
    "117x": 61,
    "117y": 49,
    "118x": 62,
    "118y": 77,
    "119x": 71,
    "119y": 88,
    "120x": 86,
    "120y": 98,
    "121x": 110,
    "121y": 99,
    "125x": 142,
    "125y": 33,
    "126x": 137,
    "126y": 17,
    "127x": 98,
    "127y": 16
}

let data2 = [
    "000 101 055",
    "100 099 045",
    "101 088 056",
    "102 093 062",
    "103 104 066",
    "104 109 059",
    "105 116 049",
    "106 116 065",
    "107 108 044",
    "108 104 035",
    "109 089 042",
    "110 080 057",
    "111 089 067",
    "112 126 090",
    "113 121 036",
    "114 132 038",
    "115 094 032",
    "116 085 033",
    "117 061 049",
    "118 062 077",
    "119 071 088",
    "120 086 098",
    "121 110 099",
    "125 142 033",
    "126 137 017",
    "127 098 016"
];

let people = [
    {
        "name": "Mike Jordan ",
        "pos": 1,
        "cat": "Open Solo",
        "times": [0, 1511, 2101, 2996, 4733, 5965, 7594, 9663, 10869, 13697, 14167, 14836, 15828, 16834, 18391, 19820, 20851],
        "codes": ['000', '103', '104', '106', '112', '121', '120', '119', '118', '111', '102', '101', '110', '109', '116', '108', '000']
    },
    {
        "name": "Liam Cotter ",
        "pos": 2,
        "cat": "Open Solo",
        "times": [0, 1290, 1925, 2920, 4925, 5964, 7355, 9373, 10379, 12107, 13999, 16079, 18164, 19614, 20788],
        "codes": ['000', '104', '103', '106', '112', '121', '120', '119', '118', '117', '116', '127', '113', '105', '000']
    },
    {
        "name": "Kieran Beausang ",
        "pos": 3,
        "cat": "Open Solo",
        "times": [0, 2480, 3521, 4161, 5531, 7546, 8464, 9746, 10906, 11652, 12379, 14970, 15678, 17728, 19101, 19864, 20380],
        "codes": ['000', '105', '104', '106', '103', '111', '101', '109', '116', '115', '108', '114', '125', '113', '107', '100', '000']
    },
    {
        "name": "Niall Gibney ",
        "pos": 4,
        "cat": "Vets Solo",
        "times": [0, 1408, 2039, 4501, 5901, 6805, 10400, 12341, 13352, 14650, 15142, 18007, 18555, 19655, 20757],
        "codes": ['000', '100', '108', '127', '115', '116', '117', '110', '101', '111', '102', '106', '104', '105', '000']
    },
    {
        "name": "Brendan McCarthy ",
        "pos": 4,
        "cat": "Vets Solo",
        "times": [0, 2137, 2928, 5165, 7140, 9362, 11408, 12829, 15384, 17750, 18688, 21515],
        "codes": ['000', '104', '103', '112', '121', '120', '119', '118', '117', '116', '109', '000']
    },
    {
        "name": "Sam Scriven  ",
        "pos": 6,
        "cat": "Open Solo",
        "times": [0, 2498, 3405, 4969, 6192, 7575, 8866, 9484, 11488, 15449, 16749, 18341, 19354, 20753],
        "codes": ['000', '102', '111', '101', '110', '109', '116', '115', '127', '114', '113', '108', '100', '000']
    },
    {
        "name": "John Riordan/Cuan Riordan",
        "pos": 7,
        "cat": "Open Team",
        "times": [0, 4073, 5002, 7894, 9335, 11049, 14621, 18185, 18886, 19906, 21010],
        "codes": ['000', '102', '111', '118', '119', '120', '121', '106', '104', '103', '000']
    },
    {
        "name": "Kenneth O Hara",
        "pos": 7,
        "cat": "Open Solo",
        "times": [0, 2051, 3279, 4307, 6047, 8175, 9327, 10600, 11997, 13543, 15585, 16380, 17630, 19567, 20279],
        "codes": ['000', '105', '104', '106', '103', '102', '111', '101', '110', '109', '115', '108', '107', '100', '000']
    },
    {
        "name": "Heather Wood/Eileen Young",
        "pos": 9,
        "cat": "Female Vets Team",
        "times": [0, 1991, 3698, 4979, 5770, 8097, 9320, 10670, 12488, 14082, 15018, 16119, 19037, 20749],
        "codes": ['000', '105', '107', '100', '108', '115', '116', '109', '110', '101', '102', '111', '103', '000']
    },
    {
        "name": "Maike Juergens ",
        "pos": 9,
        "cat": "Female Solo",
        "times": [0, 2477, 3478, 4883, 6225, 8121, 9773, 11052, 11978, 12960, 13989, 16046, 17855, 19448, 20756],
        "codes": ['000', '102', '111', '101', '110', '109', '116', '115', '108', '100', '107', '113', '105', '104', '000']
    },
    {
        "name": "Lesleyann &amp; Eoin Wylie",
        "pos": 9,
        "cat": "Mixed Vets Team",
        "times": [0, 2603, 3950, 5765, 7827, 10967, 11985, 12979, 14247, 15992, 17622, 18498, 19409, 20418],
        "codes": ['000', '105', '104', '106', '103', '111', '102', '101', '110', '109', '108', '100', '107', '000']
    },
    {
        "name": "Todd Fallesen ",
        "pos": 12,
        "cat": "Vets Solo",
        "times": [0, 2920, 4656, 5409, 6738, 8521, 9789, 11550, 13436, 16090, 17661, 18370, 19272],
        "codes": ['000', '103', '106', '104', '105', '100', '107', '108', '109', '101', '111', '102', '000']
    },
    {
        "name": "Paul Smyth ",
        "pos": 12,
        "cat": "Vets Solo",
        "times": [0, 1873, 2870, 4420, 5454, 6856, 8889, 9657, 10965, 12965, 13858, 16313, 17695, 19048],
        "codes": ['000', '102', '111', '101', '110', '109', '116', '115', '108', '100', '107', '105', '104', '000']
    },
    {
        "name": "Geoffrey Collins ",
        "pos": 12,
        "cat": "Open Solo",
        "times": [0, 2763, 3511, 4625, 6230, 7915, 8960, 10342, 12007, 14296, 15407, 18645, 20486, 21363],
        "codes": ['000', '102', '101', '110', '109', '108', '100', '107', '113', '114', '125', '105', '104', '000']
    },
    {
        "name": "Cormac McDonnell",
        "pos": 15,
        "cat": "Vets Solo",
        "times": [0, 2494, 6156, 7223, 8640, 10590, 11563, 12818, 13768, 16214, 17256, 20009, 21032],
        "codes": ['000', '105', '125', '114', '113', '108', '115', '116', '109', '100', '107', '102', '000']
    },
    {
        "name": "Des Tivnan/Ian Alcock",
        "pos": 15,
        "cat": "Open Team",
        "times": [0, 3229, 4143, 6779, 8534, 9310, 10434, 12158, 15447, 17948, 18806, 19565, 20118],
        "codes": ['000', '102', '111', '103', '106', '104', '105', '113', '114', '107', '108', '100', '000']
    },
    {
        "name": "Don Short/Hillary Jenkinson",
        "pos": 17,
        "cat": "Mixed Vets Team",
        "times": [0, 1820, 4737, 5861, 7097, 9455, 10924, 12473, 14959, 16908, 18638, 20228],
        "codes": ['000', '100', '101', '102', '111', '103', '104', '106', '105', '113', '107', '000']
    },
    {
        "name": "Martsje Hell/Lesley Young",
        "pos": 17,
        "cat": "Womens Team",
        "times": [0, 2495, 3447, 6584, 7523, 9832, 12666, 14941, 15969, 17014, 18999, 20094],
        "codes": ['000', '102', '111', '103', '104', '106', '105', '107', '108', '100', '101', '000']
    },
    {
        "name": "Conor Gahan/John Sadlier",
        "pos": 17,
        "cat": "Open Team",
        "times": [0, 3015, 5065, 7340, 10445, 11444, 14362, 16207, 17109, 18912, 19675, 20725],
        "codes": ['000', '104', '106', '105', '114', '125', '113', '107', '100', '101', '102', '000']
    },
    {
        "name": "Brendan Delaney ",
        "pos": 17,
        "cat": "Vets Solo",
        "times": [0, 1679, 3284, 4225, 6702, 8589, 12051, 19138, 19969, 20878],
        "codes": ['000', '105', '104', '106', '112', '121', '120', '111', '102', '000']
    },
    {
        "name": "James Beresford/Cormac Creight",
        "pos": 21,
        "cat": "Open Team",
        "times": [0, 1757, 3580, 4606, 6337, 7658, 10967, 12919, 15408, 16553, 18265],
        "codes": ['000', '100', '101', '110', '102', '111', '103', '106', '104', '105', '000']
    },
    {
        "name": "Hynes/Sutcliffe/Jackson ",
        "pos": 21,
        "cat": "Vets Team",
        "times": [0, 2532, 4522, 5676, 8801, 11347, 12205, 13272, 17174, 18214, 19621],
        "codes": ['000', '105', '104', '106', '103', '111', '102', '101', '100', '107', '000']
    },
    {
        "name": "Mo Cloonan/Orla Church ",
        "pos": 23,
        "cat": "Womens Team",
        "times": [0, 2738, 5037, 7023, 8408, 12718, 13599, 15110, 18039, 19237, 20475],
        "codes": ['000', '107', '105', '104', '103', '111', '102', '101', '100', '108', '000']
    },
    {
        "name": "Christopher Murray ",
        "pos": 23,
        "cat": "Vets Solo",
        "times": [0, 2695, 3620, 7790, 10242, 13226, 14107, 15459, 19314, 20399],
        "codes": ['000', '108', '107', '114', '105', '106', '104', '103', '101', '000']
    },
    {
        "name": "Davin Ferguson/Barry McDermot",
        "pos": 23,
        "cat": "Open Team",
        "times": [0, 2386, 4650, 5727, 7355, 9067, 9800, 11763, 13657, 15831, 21326],
        "codes": ['000', '100', '101', '110', '109', '116', '115', '108', '107', '113', '000']
    },
    {
        "name": "Alexey Dubovskoy/Iurii Ivanov",
        "pos": 26,
        "cat": "Open Team",
        "times": [0, 2819, 3833, 5429, 7613, 9990, 11374, 14431, 16408, 18135, 20412],
        "codes": ['000', '102', '101', '110', '109', '100', '107', '113', '105', '104', '000']
    },
    {
        "name": "Thomas/Kieran McGuinness",
        "pos": 26,
        "cat": "Open Team",
        "times": [0, 3628, 7022, 10478, 14234, 15022, 16373, 17672, 20459],
        "codes": ['000', '104', '106', '103', '111', '102', '101', '110', '000']
    },
    {
        "name": "Robert Sunter ",
        "pos": 26,
        "cat": "Vets Solo",
        "times": [0, 2481, 3403, 4966, 6080, 7429, 9594, 14496, 19726, 21828],
        "codes": ['000', '102', '111', '110', '109', '116', '127', '126', '113', '000']
    },
    {
        "name": "Rozanne Bell/Eoin Taaffe",
        "pos": 29,
        "cat": "Mixed Vets Team",
        "times": [0, 3822, 4966, 8624, 11245, 14021, 16578, 18023, 19303],
        "codes": ['000', '102', '111', '103', '106', '105', '107', '100', '000']
    },
    {
        "name": "Graham, Adam &amp; Kevin Bushe ",
        "pos": 30,
        "cat": "Open Team",
        "times": [0, 3336, 4933, 9186, 11761, 14194, 15979, 17258, 18370],
        "codes": ['000', '104', '103', '106', '105', '113', '107', '100', '000']
    },
    {
        "name": "Declan McInerney",
        "pos": 30,
        "cat": "Open Solo",
        "times": [0, 2747, 7320, 8396, 10972, 12161, 16495, 17687, 20204],
        "codes": ['000', '100', '102', '111', '103', '104', '107', '113', '000']
    },
    {
        "name": "Marc Cortada/Katja Werno",
        "pos": 30,
        "cat": "Mixed Vets Team",
        "times": [0, 2394, 4927, 6675, 8861, 11688, 13871, 17296, 19275],
        "codes": ['000', '100', '101', '110', '109', '108', '107', '105', '000']
    },
    {
        "name": "Andrew Harford/Grainne McGuire",
        "pos": 33,
        "cat": "Mixed Vets Team",
        "times": [0, 2431, 3803, 5450, 9482, 13349, 16189, 17438, 20664],
        "codes": ['000', '100', '108', '107', '113', '105', '104', '106', '000']
    }
];

let points = [];
for (let i = 0; i < data2.length; i++) {
    let values = data2[i].split(" ");

    let pointObject = {
        label: values[0],
        x: parseInt(values[1]),
        y: parseInt(values[2])
    };
    //                          txt = txt + '"'+ values[0] + 'x" : ' + values[1] + ',\n"' + values[0] + 'y" : ' + values[2] + ',\n';
    points.push(pointObject);
}
for (let point of points) {
    point.drawX = (point.x - min_x) * ratio_x;
    point.drawY = (max_y - point.y) * ratio_y;
}

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    load_assets([
        { "var": bg, "url": "images/rogaine_web_img.png" }
    ], draw);
    context.fillStyle = "red";
    draw(0);
}

function calcPoint(time, person) {
    let times = person.times;
    let codes = person.codes;
    for (let i = 0; i < times.length; i++) {
        if (time < times[i]) {
            let ratio = (time - times[i - 1]) / (times[i] - times[i - 1]);
            let b = [data[codes[i] + "x"], data[codes[i] + "y"]];
            let a = [data[codes[i - 1] + "x"], data[codes[i - 1] + "y"]];
            // find point between a and b with ratio "ratio"
            let x = a[0] + (b[0] - a[0]) * ratio;
            let y = a[1] + (b[1] - a[1]) * ratio;
            return [x, y];
        }
    }
}
let t = 0
function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bg, 0, 0, size_x, size_y);
    for (let p of points) {
        context.fillRect(p.drawX, p.drawY, 5, 5);
    }
    for (let person of people) {
        if (t < person.times[person.times.length - 1]) {
            let coord = calcPoint(t, person);
            context.fillStyle = "blue";
            context.fillText(person.name, (coord[0] - min_x) * ratio_x, (max_y - coord[1]) * ratio_y - 10);
            context.fillRect((coord[0] - min_x) * ratio_x, (max_y - coord[1]) * ratio_y, 5, 5);
            context.fillStyle = "red";
        }
    }
    //t += 15;
    t = slider.value;
    //console.log(t);
    slider.value = t;
}

function dist(p, q) {
    let xDelta = Math.abs(p.x - q.x);
    let yDelta = Math.abs(p.y - q.y);
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2));
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function () {
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}