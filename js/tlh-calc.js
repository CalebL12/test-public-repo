(function () {
  "use strict";
  /* ---------- email gate ---------- */
  var gate = document.getElementById("calc-gate");
  var tool = document.getElementById("calc-tool");
  function unlock() {
    gate.hidden = true;
    tool.hidden = false;
    try { sessionStorage.setItem("asp-tlh-open", "1"); } catch (e) {}
    render();
  }
  var form = document.querySelector("[data-gate-form]");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    }).catch(function () { /* best-effort; never block the tool on network */ });
    unlock();
  });

  /* ---------- model constants (mirror the internal workbook) ---------- */
  var CURVES = {
    lo:  { a: 10.329, b: 1.253, c: 3.962,  d: 0.01,  s: 0.009813742499206649 },
    x13: { a: 14.879, b: 1.339, c: 9.338,  d: 0.383, s: 0.009893627994745132 },
    x20: { a: 25.944, b: 1.077, c: 18.973, d: 2.2,   s: 0.00993863627428007 }
  };
  var ST_SHARE = { lo: 0, x13: 0.35, x20: 0.5 };
  var FED = {
    ord: {
      S:   [[0,12400,50400,105700,201775,256225,640600],[0.10,0.02,0.10,0.02,0.08,0.03,0.02]],
      MFJ: [[0,24800,100800,211400,403550,512450,768700],[0.10,0.02,0.10,0.02,0.08,0.03,0.02]],
      HOH: [[0,17700,67450,105700,201775,256200,640600],[0.10,0.02,0.10,0.02,0.08,0.03,0.02]],
      MFS: [[0,12400,50400,105700,201775,256225,384350],[0.10,0.02,0.10,0.02,0.08,0.03,0.02]]
    },
    lt: {
      S:   [[0,49450,545500],[0,0.15,0.05]],
      MFJ: [[0,98900,613700],[0,0.15,0.05]],
      HOH: [[0,66200,579600],[0,0.15,0.05]],
      MFS: [[0,49450,306850],[0,0.15,0.05]]
    },
    sd:   { S: 16100, MFJ: 32200, HOH: 24150, MFS: 16100 },
    niit: { S: 200000, MFJ: 250000, HOH: 200000, MFS: 125000 }
  };
  var STATES = {"Alabama":{"sdS":3000,"sdJ":8500,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,500,3000],"sdel":[0.02,0.02,0.01],"jthr":[0,1000,6000],"jdel":[0.02,0.02,0.01],"stack":1,"sto":null},"Alaska":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[],"sdel":[],"jthr":[],"jdel":[],"stack":1,"sto":null},"Arizona":{"sdS":8350,"sdJ":16700,"excl":0.25,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.025],"jthr":[0],"jdel":[0.025],"stack":1,"sto":null},"Arkansas":{"sdS":2470,"sdJ":4940,"excl":0.5,"cap":0,"surtax":0,"surthr":0,"sthr":[0,4600],"sdel":[0.02,0.019],"jthr":[0,4600],"jdel":[0.02,0.019],"stack":1,"sto":null},"California":{"sdS":5540,"sdJ":11080,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,11079,26264,41452,57542,72724,371479,445771,742953,1000000],"sdel":[0.01,0.01,0.02,0.02,0.02,0.013,0.01,0.01,0.01,0.01],"jthr":[0,22158,52528,82904,115084,145448,742958,891542,1000000,1485906],"jdel":[0.01,0.01,0.02,0.02,0.02,0.013,0.01,0.01,0.01,0.01],"stack":1,"sto":null},"Colorado":{"sdS":16100,"sdJ":32200,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.044],"jthr":[0],"jdel":[0.044],"stack":1,"sto":null},"Connecticut":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,10000,50000,100000,200000,250000,500000],"sdel":[0.02,0.025,0.01,0.005,0.005,0.004,0.0009],"jthr":[0,20000,100000,200000,400000,500000,1000000],"jdel":[0.02,0.025,0.01,0.005,0.005,0.004,0.0009],"stack":1,"sto":null},"Delaware":{"sdS":3250,"sdJ":6500,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[2000,5000,10000,20000,25000,60000],"sdel":[0.022,0.017,0.009,0.004,0.0035,0.0105],"jthr":[2000,5000,10000,20000,25000,60000],"jdel":[0.022,0.017,0.009,0.004,0.0035,0.0105],"stack":1,"sto":null},"Florida":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[],"sdel":[],"jthr":[],"jdel":[],"stack":1,"sto":null},"Georgia":{"sdS":12000,"sdJ":24000,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.0519],"jthr":[0],"jdel":[0.0519],"stack":1,"sto":null},"Hawaii":{"sdS":4400,"sdJ":8800,"excl":0,"cap":0.0725,"surtax":0,"surthr":0,"sthr":[0,9600,14400,19200,24000,36000,48000,125000,175000,225000,275000,325000],"sdel":[0.014,0.018,0.023,0.009,0.004,0.004,0.004,0.003,0.0035,0.0075,0.01,0.01],"jthr":[0,19200,28800,38400,48000,72000,96000,250000,350000,450000,550000,650000],"jdel":[0.014,0.018,0.023,0.009,0.004,0.004,0.004,0.003,0.0035,0.0075,0.01,0.01],"stack":1,"sto":null},"Idaho":{"sdS":16100,"sdJ":32200,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[4811],"sdel":[0.053],"jthr":[9622],"jdel":[0.053],"stack":1,"sto":null},"Illinois":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.0495],"jthr":[0],"jdel":[0.0495],"stack":1,"sto":null},"Indiana":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.0295],"jthr":[0],"jdel":[0.0295],"stack":1,"sto":null},"Iowa":{"sdS":16100,"sdJ":32200,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.038],"jthr":[0],"jdel":[0.038],"stack":1,"sto":null},"Kansas":{"sdS":3605,"sdJ":8240,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,23000],"sdel":[0.052,0.0038],"jthr":[0,46000],"jdel":[0.052,0.0038],"stack":1,"sto":null},"Kentucky":{"sdS":3360,"sdJ":3360,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.035],"jthr":[0],"jdel":[0.035],"stack":1,"sto":null},"Louisiana":{"sdS":12875,"sdJ":25750,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.03],"jthr":[0],"jdel":[0.03],"stack":1,"sto":null},"Maine":{"sdS":8350,"sdJ":16700,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,27399,64849],"sdel":[0.058,0.0095,0.004],"jthr":[0,54849,129749],"jdel":[0.058,0.0095,0.004],"stack":1,"sto":null},"Maryland":{"sdS":3350,"sdJ":6700,"excl":0,"cap":0,"surtax":0.02,"surthr":350000,"sthr":[0,1000,2000,3000,100000,125000,150000,250000,500000,1000000],"sdel":[0.02,0.01,0.01,0.0075,0.0025,0.0025,0.0025,0.0025,0.005,0.0025],"jthr":[0,1000,2000,3000,150000,175000,225000,300000,600000,1200000],"jdel":[0.02,0.01,0.01,0.0075,0.0025,0.0025,0.0025,0.0025,0.005,0.0025],"stack":1,"sto":null},"Massachusetts":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,1107750],"sdel":[0.05,0.04],"jthr":[0,1107750],"jdel":[0.05,0.04],"stack":1,"sto":0.085},"Michigan":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.0425],"jthr":[0],"jdel":[0.0425],"stack":1,"sto":null},"Minnesota":{"sdS":15300,"sdJ":30600,"excl":0,"cap":0,"surtax":0.01,"surthr":1000000,"sthr":[0,33310,109430,203150],"sdel":[0.0535,0.0145,0.0105,0.02],"jthr":[0,48700,193480,337930],"jdel":[0.0535,0.0145,0.0105,0.02],"stack":1,"sto":null},"Mississippi":{"sdS":2300,"sdJ":4600,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[10000],"sdel":[0.04],"jthr":[10000],"jdel":[0.04],"stack":1,"sto":null},"Missouri":{"sdS":16100,"sdJ":32200,"excl":1,"cap":0,"surtax":0,"surthr":0,"sthr":[1348,2696,4044,5392,6740,8088,9436],"sdel":[0.02,0.005,0.005,0.005,0.005,0.005,0.002],"jthr":[1348,2696,4044,5392,6740,8088,9436],"jdel":[0.02,0.005,0.005,0.005,0.005,0.005,0.002],"stack":1,"sto":0},"Montana":{"sdS":16100,"sdJ":32200,"excl":0,"cap":0.041,"surtax":0,"surthr":0,"sthr":[0,47500],"sdel":[0.047,0.0095],"jthr":[0,95000],"jdel":[0.047,0.0095],"stack":1,"sto":null},"Nebraska":{"sdS":8850,"sdJ":17700,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,4130,24760],"sdel":[0.0246,0.0105,0.0104],"jthr":[0,8250,49530],"jdel":[0.0246,0.0105,0.0104],"stack":1,"sto":null},"Nevada":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[],"sdel":[],"jthr":[],"jdel":[],"stack":1,"sto":null},"New Hampshire":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[],"sdel":[],"jthr":[],"jdel":[],"stack":1,"sto":null},"New Jersey":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,20000,35000,40000,75000,500000,1000000],"sdel":[0.014,0.0035,0.0175,0.0203,0.0084,0.026,0.0178],"jthr":[0,20000,50000,70000,80000,150000,500000,1000000],"jdel":[0.014,0.0035,0.007,0.0105,0.0203,0.0084,0.026,0.0178],"stack":1,"sto":null},"New Mexico":{"sdS":16100,"sdJ":32200,"excl":0.4,"cap":0,"surtax":0,"surthr":0,"sthr":[0,5500,16500,33500,66500,210000],"sdel":[0.015,0.017,0.011,0.004,0.002,0.01],"jthr":[0,8000,25000,50000,100000,315000],"jdel":[0.015,0.017,0.011,0.004,0.002,0.01],"stack":1,"sto":null},"New York":{"sdS":8000,"sdJ":16050,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,8500,11700,13900,80650,215400,1077550,5000000,25000000],"sdel":[0.039,0.005,0.0075,0.0025,0.005,0.0095,0.028,0.0065,0.006],"jthr":[0,17150,23600,27900,161550,323200,2155350,5000000,25000000],"jdel":[0.039,0.005,0.0075,0.0025,0.005,0.0095,0.028,0.0065,0.006],"stack":1,"sto":null},"North Carolina":{"sdS":12750,"sdJ":25500,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.0399],"jthr":[0],"jdel":[0.0399],"stack":1,"sto":null},"North Dakota":{"sdS":16100,"sdJ":32200,"excl":0.4,"cap":0,"surtax":0,"surthr":0,"sthr":[48475,244825],"sdel":[0.0195,0.0055],"jthr":[80975,298075],"jdel":[0.0195,0.0055],"stack":1,"sto":null},"Ohio":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[26050],"sdel":[0.0275],"jthr":[26050],"jdel":[0.0275],"stack":1,"sto":null},"Oklahoma":{"sdS":6350,"sdJ":12700,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[3750,4900,7200],"sdel":[0.025,0.01,0.01],"jthr":[7500,9800,14400],"jdel":[0.025,0.01,0.01],"stack":1,"sto":null},"Oregon":{"sdS":2910,"sdJ":5820,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,4550,11400,125000],"sdel":[0.0475,0.02,0.02,0.0115],"jthr":[0,9100,22800,250000],"jdel":[0.0475,0.02,0.02,0.0115],"stack":1,"sto":null},"Pennsylvania":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.0307],"jthr":[0],"jdel":[0.0307],"stack":1,"sto":null},"Rhode Island":{"sdS":11200,"sdJ":22400,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,82050,186450],"sdel":[0.0375,0.01,0.0124],"jthr":[0,82050,186450],"jdel":[0.0375,0.01,0.0124],"stack":1,"sto":null},"South Carolina":{"sdS":8350,"sdJ":16700,"excl":0.44,"cap":0,"surtax":0,"surthr":0,"sthr":[0,3640,18230],"sdel":[0,0.03,0.03],"jthr":[0,3640,18230],"jdel":[0,0.03,0.03],"stack":1,"sto":null},"South Dakota":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[],"sdel":[],"jthr":[],"jdel":[],"stack":1,"sto":null},"Tennessee":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[],"sdel":[],"jthr":[],"jdel":[],"stack":1,"sto":null},"Texas":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[],"sdel":[],"jthr":[],"jdel":[],"stack":1,"sto":null},"Utah":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0],"sdel":[0.045],"jthr":[0],"jdel":[0.045],"stack":1,"sto":null},"Vermont":{"sdS":7650,"sdJ":15300,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,49400,119700,249700],"sdel":[0.0335,0.0325,0.01,0.0115],"jthr":[0,82500,199450,304000],"jdel":[0.0335,0.0325,0.01,0.0115],"stack":1,"sto":null},"Virginia":{"sdS":8750,"sdJ":17500,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,3000,5000,17000],"sdel":[0.02,0.01,0.02,0.0075],"jthr":[0,3000,5000,17000],"jdel":[0.02,0.01,0.02,0.0075],"stack":1,"sto":null},"Washington":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,278000,1000000],"sdel":[0,0.07,0.02],"jthr":[0,278000,1000000],"jdel":[0,0.07,0.02],"stack":0,"sto":0},"West Virginia":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,10000,25000,40000,60000],"sdel":[0.0222,0.0074,0.0037,0.0111,0.0038],"jthr":[0,10000,25000,40000,60000],"jdel":[0.0222,0.0074,0.0037,0.0111,0.0038],"stack":1,"sto":null},"Wisconsin":{"sdS":13960,"sdJ":25840,"excl":0.3,"cap":0,"surtax":0,"surthr":0,"sthr":[0,15110,51950,332720],"sdel":[0.035,0.009,0.009,0.0235],"jthr":[0,20150,69260,443630],"jdel":[0.035,0.009,0.009,0.0235],"stack":1,"sto":null},"Wyoming":{"sdS":0,"sdJ":0,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[],"sdel":[],"jthr":[],"jdel":[],"stack":1,"sto":null},"Washington DC":{"sdS":16100,"sdJ":32200,"excl":0,"cap":0,"surtax":0,"surthr":0,"sthr":[0,10000,40000,60000,250000,500000,1000000],"sdel":[0.04,0.02,0.005,0.02,0.0075,0.005,0.01],"jthr":[0,10000,40000,60000,250000,500000,1000000],"jdel":[0.04,0.02,0.005,0.02,0.0075,0.005,0.01],"stack":1,"sto":null}};

  /* ---------- engine ---------- */
  function btax(x, thr, del) {
    var t = 0;
    for (var i = 0; i < thr.length; i++) t += del[i] * Math.max(0, x - thr[i]);
    return t;
  }
  function curve(k, tYears) {
    var p = CURVES[k], t = Math.max(0, Math.min(10, tYears));
    return p.s * (p.a * (1 - Math.exp(-p.b * t)) + p.c * t + p.d * t * t);
  }
  function cumLosses(k, year, initial, annual) {
    var end = year * 12;
    var total = initial * curve(k, end / 12);
    var monthly = annual / 12;
    for (var m = 1; m <= end; m++) total += monthly * curve(k, (end - m) / 12);
    return total;
  }
  function rates(status, stateName, income, gains) {
    var slice = Math.max(gains, 1);
    var st = STATES[stateName];
    var fedThrOrd = FED.ord[status], fedThrLt = FED.lt[status];
    var tord = Math.max(0, income - FED.sd[status]);
    var fedLT = (btax(tord + slice, fedThrLt[0], fedThrLt[1]) - btax(tord, fedThrLt[0], fedThrLt[1])) / slice;
    var fedST = (btax(tord + slice, fedThrOrd[0], fedThrOrd[1]) - btax(tord, fedThrOrd[0], fedThrOrd[1])) / slice;
    var magi = income + gains;
    var niit = 0.038 * Math.min(slice, Math.max(0, magi - FED.niit[status])) / slice;

    var joint = status === "MFJ";
    var thr = joint ? st.jthr : st.sthr, del = joint ? st.jdel : st.sdel;
    var sded = joint ? st.sdJ : st.sdS;
    var base = st.stack ? Math.max(0, income - sded) : 0;

    var ltIncluded = slice * (1 - st.excl);
    var stLT = ltIncluded > 0 ? (btax(base + ltIncluded, thr, del) - btax(base, thr, del)) / slice : 0;
    if (st.cap > 0) stLT = Math.min(stLT, st.cap);
    if (st.surtax > 0) stLT += st.surtax * Math.min(slice, Math.max(0, magi - st.surthr)) / slice;

    var stST;
    if (st.sto !== null && st.sto !== undefined) {
      stST = st.sto;
    } else if (!st.stack) {
      stST = 0;
    } else {
      stST = (btax(base + slice, thr, del) - btax(base, thr, del)) / slice;
      if (st.surtax > 0) stST += st.surtax * Math.min(slice, Math.max(0, magi - st.surthr)) / slice;
    }
    var combLT = fedLT + niit + stLT;
    var combST = fedST + niit + stST;
    return {
      lo:  combLT,
      x13: 0.35 * combST + 0.65 * combLT,
      x20: 0.50 * combST + 0.50 * combLT,
      combLT: combLT, combST: combST
    };
  }

  /* ---------- ui ---------- */
  var sel = document.getElementById("i-state");
  Object.keys(STATES).forEach(function (name) {
    var o = document.createElement("option");
    o.value = name; o.textContent = name;
    if (name === "California") o.selected = true;
    sel.appendChild(o);
  });
  var fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  var pct = function (x) { return (x * 100).toFixed(1) + "%"; };
  function val(id) { return Math.max(0, parseFloat(document.getElementById(id).value) || 0); }

  function render() {
    var status = document.getElementById("i-status").value;
    var state = sel.value || "California";
    var income = val("i-income"), gains = val("i-gains");
    var initial = val("i-initial"), annual = val("i-annual");
    var r = rates(status, state, income, gains);

    var strip = document.getElementById("rate-strip");
    strip.innerHTML = "";
    [["Long only", r.lo, "All losses long-term"],
     ["130/30", r.x13, "35% short-term at ordinary rates"],
     ["200/100", r.x20, "50% short-term at ordinary rates"]].forEach(function (c) {
      var div = document.createElement("div");
      div.className = "rate-chip";
      div.innerHTML = '<div class="rc-name">' + c[0] + ' &middot; blended marginal rate</div>' +
                      '<div class="rc-rate">' + pct(c[1]) + '</div>' +
                      '<div class="rc-note">' + c[2] + '</div>';
      strip.appendChild(div);
    });

    var keys = ["lo", "x13", "x20"];
    var lossBody = document.querySelector("#tbl-losses tbody");
    var taxBody = document.querySelector("#tbl-tax tbody");
    lossBody.innerHTML = ""; taxBody.innerHTML = "";
    for (var y = 1; y <= 10; y++) {
      var lrow = "<td>" + (y === 10 ? "Year 10" : "Year " + y) + "</td>";
      var trow = lrow;
      keys.forEach(function (k) {
        var cl = cumLosses(k, y, initial, annual);
        lrow += "<td>" + fmt.format(Math.round(cl)) + "</td>";
        trow += "<td>" + fmt.format(Math.round(cl * r[k])) + "</td>";
      });
      var tr1 = document.createElement("tr"); tr1.innerHTML = lrow; lossBody.appendChild(tr1);
      var tr2 = document.createElement("tr"); tr2.innerHTML = trow; taxBody.appendChild(tr2);
    }
  }
  ["i-status", "i-state", "i-income", "i-gains", "i-initial", "i-annual"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", render);
    document.getElementById(id).addEventListener("change", render);
  });

  /* returning visitors in the same session skip the gate, and a
     no-JS form submit lands back here with ?unlocked=1 via the form
     action - honor it, then clean the URL */
  var fromRedirect = /[?&]unlocked=1/.test(location.search);
  var stored = false;
  try { stored = sessionStorage.getItem("asp-tlh-open") === "1"; } catch (e) {}
  if (fromRedirect || stored) {
    unlock();
    if (fromRedirect && window.history && history.replaceState) {
      history.replaceState(null, "", location.pathname);
    }
  }
})();
