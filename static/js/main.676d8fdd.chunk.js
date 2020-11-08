(this.webpackJsonpcutiehack2020=this.webpackJsonpcutiehack2020||[]).push([[0],{100:function(e,t,s){},259:function(e,t,s){"use strict";s.r(t);var a=s(3),c=s(4),n=s.n(c),r=s(25),i=s.n(r),o=(s(98),s(28)),l=s.n(o),d=s(63),h=s(43),u=(s.p,s(100),s(87)),b=s.n(u),j=function(e){var t=e.label,s=e.number,c=e.inc,n=new b.a;return Object(a.jsxs)("div",{className:"stats-box",children:[Object(a.jsx)("span",{className:"number",children:s>1e6?n.abbreviate(s,2):s},s),Object(a.jsx)("span",{className:"label",children:t},t),Object(a.jsx)("span",{className:"change",children:c>0?"+".concat(c):"-".concat(c)})]})},v=s(90),p=s.n(v),m=s(35),f=s.n(m),O=s(88),x=s.n(O),g=s(89);s(197);var I=function(){var e=Object(c.useState)({}),t=Object(h.a)(e,2),s=t[0],n=t[1],r=Object(c.useState)((function(){var e=new Date;return e.setDate(e.getDate()-1)})),i=Object(h.a)(r,2),o=i[0],u=i[1],b=Object(c.useState)("none"),v=Object(h.a)(b,2),m=v[0],O=v[1],I=function(){var e=Object(d.a)(l.a.mark((function e(){var t,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.covidtracking.com/v1/us/daily.json");case 2:return t=e.sent,e.next=5,t.json();case 5:return s=e.sent,e.abrupt("return",s);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I().then((function(e){console.log(e);var t=new Date(o),s="".concat(t.getFullYear()).concat(("0"+(t.getMonth()+1)).slice(-2)).concat(("0"+t.getDay()).slice(-2)),a={casesIncValues:[],dates:[]};e.map((function(e){if(e.date==s&&(a.cases=e.positive,a.casesInc=e.positiveIncrease,a.deaths=e.death,a.deathsInc=e.deathIncrease,a.tests=e.totalTestResults,a.testsInc=e.totalTestResultsIncrease),e.positiveIncrease>0&&e.date<=s){a.casesIncValues.push(e.positiveIncrease);var t=e.date.toString(),c=t.slice(0,4),n=t.slice(4,6),r=t.slice(6,8),i="".concat(n,"-").concat(r,"-").concat(c),o=f()().format(i,"MMMM");a.dates.push(o)}})),a.casesIncValues=a.casesIncValues.reverse().filter((function(e){return e>0})),a.dates=a.dates.reverse(),n(a)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){"none"===m?(console.log(m),O("block")):O("none")};Object(c.useEffect)((function(){w()}),[]),Object(c.useEffect)((function(){w()}),[o]);var D={labels:s.dates,datasets:[{label:"Number of Cases",fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"rgba(75,192,192,1)",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:0,pointHitRadius:10,data:s.casesIncValues}]};return console.log(s.casesIncValues),Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("header",{className:"App-header"}),Object(a.jsxs)("main",{children:[Object(a.jsx)("section",{className:"header",children:Object(a.jsxs)("div",{className:"header-data",children:[Object(a.jsx)("h3",{children:"United States"}),Object(a.jsxs)("div",{className:"header-date",children:[Object(a.jsxs)("div",{className:"calendar",style:{display:m},children:[" ",Object(a.jsx)(p.a,{selected:o,onChange:function(e){u(e),N()},filterDate:function(e){var t=new Date;if(e>new Date("03/07/2020")&&e<t.setDate(t.getDate()-1))return e},inline:!0})]}),"As of"," ",Object(a.jsxs)("span",{onClick:N,className:"date-moment",children:[Object(a.jsx)(x.a,{date:o,format:"MMMM Do, YYYY "}),Object(a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",children:Object(a.jsx)("path",{d:"M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"})})]})]}),Object(a.jsxs)("div",{className:"header-stats",children:[Object(a.jsx)(j,{label:"Cases",number:s.cases,inc:s.casesInc}),Object(a.jsx)(j,{label:"Deaths",number:s.deaths,inc:s.deathsInc}),Object(a.jsx)(j,{label:"Tests",number:s.tests,inc:s.testsInc})]})]})}),Object(a.jsx)("section",{className:"body",children:Object(a.jsxs)("div",{className:"chart-area",children:[Object(a.jsx)("h1",{className:"chart-title",children:"Daily Cases"}),Object(a.jsx)(g.Line,{data:D,options:{scales:{xAxes:[{ticks:{display:!0,autoSkip:!0,maxTicksLimit:4,source:"data"}}]}}})]})}),Object(a.jsx)("section",{className:"footer"})]})]})},w=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,263)).then((function(t){var s=t.getCLS,a=t.getFID,c=t.getFCP,n=t.getLCP,r=t.getTTFB;s(e),a(e),c(e),n(e),r(e)}))};i.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(I,{})}),document.getElementById("root")),w()},98:function(e,t,s){}},[[259,1,2]]]);
//# sourceMappingURL=main.676d8fdd.chunk.js.map