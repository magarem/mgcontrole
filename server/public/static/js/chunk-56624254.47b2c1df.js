(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56624254"],{"0b51":function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r})),n.d(t,"e",(function(){return s})),n.d(t,"b",(function(){return l}));var i=n("b775"),a="/dev-api";function o(e,t){return Object(i["a"])({url:a+"/generic?key="+e,method:"get",params:t})}function r(e,t){return Object(i["a"])({url:"".concat(a,"/generic?key=").concat(e),method:"post",data:t})}function s(e,t){return Object(i["a"])({url:"".concat(a,"/generic?key=").concat(e),method:"patch",data:t})}function l(e,t){return Object(i["a"])({url:"".concat(a,"/generic?key=").concat(e),method:"delete",data:t})}},"1c18":function(e,t,n){},"333d":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},a=[];n("a9e3");Math.easeInOutQuad=function(e,t,n,i){return e/=i/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function r(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,n){var i=s(),a=e-i,l=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=l;var s=Math.easeInOutQuad(c,i,a,t);r(s),c<t?o(e):n&&"function"===typeof n&&n()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&l(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=c,d=(n("e498"),n("2877")),p=Object(d["a"])(u,i,a,!1,null,"6af373ef",null);t["a"]=p.exports},"5c14":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{placeholder:"Nome",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.find.nome,callback:function(t){e.$set(e.listQuery.find,"nome",t)},expression:"listQuery.find.nome"}}),n("el-input",{staticClass:"filter-item",staticStyle:{width:"250px"},attrs:{placeholder:"Doc",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.find.doc,callback:function(t){e.$set(e.listQuery.find,"doc",t)},expression:"listQuery.find.doc"}}),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" Procurar ")]),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v(" Incluir ")])],1),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange}},[n("el-table-column",{attrs:{label:"Código",prop:"id",sortable:"custom",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.id))])]}}])}),n("el-table-column",{attrs:{label:"Nome",prop:"nome",sortable:"custom",align:"center",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("capitalize")(t.row.nome)))])]}}])}),n("el-table-column",{attrs:{label:"Contato",prop:"contato",sortable:"custom",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.contato))])]}}])}),n("el-table-column",{attrs:{label:"Fone",prop:"fone",sortable:"custom",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.fone))])]}}])}),n("el-table-column",{attrs:{label:"Actions",align:"center",width:"150","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(i)}}},[e._v(" Edit ")]),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(i)}}},[e._v(" Delete ")])]}}])})],1),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit,layout:"prev, pager, next"},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),n("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],title:"Cadastrar",align:"center",visible:e.dialogFormVisible,top:"5vh",width:"70%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"dataForm",staticStyle:{_width:"400px",margin:"0 50px 0 50px"},attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"80px"}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"Nome",prop:"nome"}},[n("el-input",{attrs:{autofocus:""},model:{value:e.temp.nome,callback:function(t){e.$set(e.temp,"nome",t)},expression:"temp.nome"}})],1)],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"Tipo",prop:"tipo"}},[n("el-select",{staticStyle:{width:"290px"},attrs:{placeholder:"Select"},model:{value:e.temp.tipo,callback:function(t){e.$set(e.temp,"tipo",t)},expression:"temp.tipo"}},[n("el-option",{attrs:{label:"Física",value:"fisica"}}),n("el-option",{attrs:{label:"Jurídica",value:"juridica"}}),n("el-option",{attrs:{label:"Estrangeira",value:"estrangeira"}})],1)],1),n("el-form-item",{attrs:{label:"Contato",prop:"contato"}},[n("el-input",{model:{value:e.temp.contato,callback:function(t){e.$set(e.temp,"contato",t)},expression:"temp.contato"}})],1),n("el-form-item",{attrs:{label:"Fone",prop:"fone"}},[n("el-input",{model:{value:e.temp.fone,callback:function(t){e.$set(e.temp,"fone",t)},expression:"temp.fone"}})],1),n("el-form-item",{attrs:{label:"Endereço",prop:"endereco"}},[n("el-input",{model:{value:e.temp.endereco,callback:function(t){e.$set(e.temp,"endereco",t)},expression:"temp.endereco"}})],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"Doc",prop:"doc"}},[n("el-input",{model:{value:e.temp.doc,callback:function(t){e.$set(e.temp,"doc",t)},expression:"temp.doc"}})],1),n("el-form-item",{attrs:{label:"Email",prop:"email"}},[n("el-input",{model:{value:e.temp.email,callback:function(t){e.$set(e.temp,"email",t)},expression:"temp.email"}})],1),n("el-form-item",{attrs:{label:"Fone2",prop:"fone2"}},[n("el-input",{model:{value:e.temp.fone2,callback:function(t){e.$set(e.temp,"fone2",t)},expression:"temp.fone2"}})],1),n("el-form-item",{attrs:{label:"CEP",prop:"cep"}},[n("el-input",{model:{value:e.temp.cep,callback:function(t){e.$set(e.temp,"cep",t)},expression:"temp.cep"}})],1)],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"Obs",prop:"obs"}},[n("el-input",{attrs:{type:"textarea",rows:3,placeholder:""},model:{value:e.temp.obs,callback:function(t){e.$set(e.temp,"obs",t)},expression:"temp.obs"}})],1)],1)],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer",align:"center"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(" Cancela ")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.dialogStatus?e.createData():e.updateData()}}},[e._v(" Confirma ")])],1)],1)],1)},a=[],o=(n("c975"),n("d81d"),n("fb6a"),n("a434"),n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("b85c")),r=n("0b51"),s=n("6724"),l=n("ed08"),c=n("333d"),u=n("716b"),d=n("5f87"),p={name:"Clientes",components:{Pagination:c["a"],Money:u["Money"]},directives:{waves:s["a"]},filters:{money:function(e){return e?(e=e.toString(),-1==e.indexOf(".")&&(e+=",00"),"R$ "+e.replace(".",",")):""},capitalize:function(e){return e?(e=e.toString(),e.charAt(0).toUpperCase()+e.slice(1)):""},statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},typeFilter:function(e){return calendarTypeKeyValue[e]}},data:function(){return{money:{decimal:",",thousands:".",prefix:"R$ ",precision:2,masked:!1},tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,sort:"id DESC",find:{nome:"",doc:""}},sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:void 0},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,console.log("this.listQuery:",this.listQuery);console.log("getToken():",Object(d["a"])()),Object(r["c"])("clientes",this.listQuery).then((function(t){console.log("response.data--\x3e:",t.data),e.list=t.data.items,e.total=t.data.total,setTimeout((function(){e.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){this.$message({message:"Success",type:"success"}),e.status=t},sortChange:function(e){var t=e.prop,n=e.order;"id"===t&&this.sortByID(n)},sortByID:function(e){this.listQuery.sort="ascending"===e?"id ASC":"id DESC",this.handleFilter()},resetTemp:function(){this.temp={id:void 0,timestamp:new Date}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&Object(r["a"])("clientes",e.temp).then((function(t){console.log("response.data:",t.data.id),e.temp.id=t.data.id,e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Sucesso",message:"Cliente cadastrado",type:"success",duration:2e3})}))}))},deleteData:function(){var e=this;this.temp.then((function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var n=Object.assign({},e.temp);n.timestamp=+new Date(n.timestamp),Object(r["e"])("clientes",n).then((function(){var t,n=Object(o["a"])(e.list);try{for(n.s();!(t=n.n()).done;){var i=t.value;if(i.id===e.temp.id){var a=e.list.indexOf(i);e.list.splice(a,1,e.temp);break}}}catch(r){n.e(r)}finally{n.f()}e.dialogFormVisible=!1,e.$notify({title:"Sucesso",message:"Registro alterado",type:"success",duration:2e3})}))}}))},handleDelete:function(e){var t=this;this.$confirm("Excluir registro?","Aviso",{confirmButtonText:"OK",cancelButtonText:"Cancelar",type:"warning"}).then((function(){t.$notify({title:"Sucesso",message:"Exclusão de registro",type:"success",duration:2e3});var n=t.list.indexOf(e);t.list.splice(n,1),Object(r["b"])("clientes",e).then((function(){console.log("Deleted:---\x3e",e.id)}))})).catch((function(){t.$message({type:"info",message:"Exclusão cancelada"})}))},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([n.e("chunk-489b8c18"),n.e("chunk-2125b98f")]).then(n.bind(null,"4bf8")).then((function(t){var n=["timestamp","title","type","importance","status"],i=["timestamp","title","type","importance","status"],a=e.formatJson(i,e.list);t.export_json_to_excel({header:n,data:a,filename:"table-list"}),e.downloadLoading=!1}))},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return"timestamp"===e?Object(l["c"])(t[e]):t[e]}))}))}}},f=p,m=n("2877"),h=Object(m["a"])(f,i,a,!1,null,null,null);t["default"]=h.exports},6724:function(e,t,n){"use strict";n("8d41");var i="@@wavesContext";function a(e,t){function n(n){var i=Object.assign({},t.value),a=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),o=a.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var r=o.getBoundingClientRect(),s=o.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(r.width,r.height)+"px",o.appendChild(s)),a.type){case"center":s.style.top=r.height/2-s.offsetHeight/2+"px",s.style.left=r.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-r.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-r.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=a.color,s.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=n:e[i]={removeHandle:n},n}var o={bind:function(e,t){e.addEventListener("click",a(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",a(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},r=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(r)),o.install=r;t["a"]=o},"716b":function(e,t,n){(function(t,n){e.exports=n()})(0,(function(){return function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=".",t(t.s=9)}([function(e,t,n){"use strict";t.a={prefix:"",suffix:"",thousands:",",decimal:".",precision:2}},function(e,t,n){"use strict";var i=n(2),a=n(5),o=n(0);t.a=function(e,t){if(t.value){var r=n.i(a.a)(o.a,t.value);if("INPUT"!==e.tagName.toLocaleUpperCase()){var s=e.getElementsByTagName("input");1!==s.length||(e=s[0])}e.oninput=function(){var t=e.value.length-e.selectionEnd;e.value=n.i(i.a)(e.value,r),t=Math.max(t,r.suffix.length),t=e.value.length-t,t=Math.max(t,r.prefix.length+1),n.i(i.b)(e,t),e.dispatchEvent(n.i(i.c)("change"))},e.onfocus=function(){n.i(i.b)(e,e.value.length-r.suffix.length)},e.oninput(),e.dispatchEvent(n.i(i.c)("input"))}}},function(e,t,n){"use strict";function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m.a;"number"==typeof e&&(e=e.toFixed(r(t.precision)));var n=e.indexOf("-")>=0?"-":"",i=o(e),a=l(i,t.precision),s=d(a).split("."),p=s[0],f=s[1];return p=c(p,t.thousands),t.prefix+n+u(p,f,t.decimal)+t.suffix}function a(e,t){var n=e.indexOf("-")>=0?-1:1,i=o(e),a=l(i,t);return parseFloat(a)*n}function o(e){return d(e).replace(/\D+/g,"")||"0"}function r(e){return s(0,e,20)}function s(e,t,n){return Math.max(e,Math.min(t,n))}function l(e,t){var n=Math.pow(10,t);return(parseFloat(e)/n).toFixed(r(t))}function c(e,t){return e.replace(/(\d)(?=(?:\d{3})+\b)/gm,"$1"+t)}function u(e,t,n){return t?e+n+t:e}function d(e){return e?e.toString():""}function p(e,t){var n=function(){e.setSelectionRange(t,t)};e===document.activeElement&&(n(),setTimeout(n,1))}function f(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}var m=n(0);n.d(t,"a",(function(){return i})),n.d(t,"d",(function(){return a})),n.d(t,"b",(function(){return p})),n.d(t,"c",(function(){return f}))},function(e,t,n){"use strict";function i(e,t){t&&Object.keys(t).map((function(e){s.a[e]=t[e]})),e.directive("money",r.a),e.component("money",o.a)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(6),o=n.n(a),r=n(1),s=n(0);n.d(t,"Money",(function(){return o.a})),n.d(t,"VMoney",(function(){return r.a})),n.d(t,"options",(function(){return s.a})),n.d(t,"VERSION",(function(){return l}));var l="0.8.1";t.default=i,"undefined"!=typeof window&&window.Vue&&window.Vue.use(i)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),a=n(0),o=n(2);t.default={name:"Money",props:{value:{required:!0,type:[Number,String],default:0},masked:{type:Boolean,default:!1},precision:{type:Number,default:function(){return a.a.precision}},decimal:{type:String,default:function(){return a.a.decimal}},thousands:{type:String,default:function(){return a.a.thousands}},prefix:{type:String,default:function(){return a.a.prefix}},suffix:{type:String,default:function(){return a.a.suffix}}},directives:{money:i.a},data:function(){return{formattedValue:""}},watch:{value:{immediate:!0,handler:function(e,t){var i=n.i(o.a)(e,this.$props);i!==this.formattedValue&&(this.formattedValue=i)}}},methods:{change:function(e){this.$emit("input",this.masked?e.target.value:n.i(o.d)(e.target.value,this.precision))}}}},function(e,t,n){"use strict";t.a=function(e,t){return e=e||{},t=t||{},Object.keys(e).concat(Object.keys(t)).reduce((function(n,i){return n[i]=void 0===t[i]?e[i]:t[i],n}),{})}},function(e,t,n){var i=n(7)(n(4),n(8),null,null);e.exports=i.exports},function(e,t){e.exports=function(e,t,n,i){var a,o=e=e||{},r=typeof e.default;"object"!==r&&"function"!==r||(a=e,o=e.default);var s="function"==typeof o?o.options:o;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),n&&(s._scopeId=n),i){var l=s.computed||(s.computed={});Object.keys(i).forEach((function(e){var t=i[e];l[e]=function(){return t}}))}return{esModule:a,exports:o,options:s}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{directives:[{name:"money",rawName:"v-money",value:{precision:e.precision,decimal:e.decimal,thousands:e.thousands,prefix:e.prefix,suffix:e.suffix},expression:"{precision, decimal, thousands, prefix, suffix}"}],staticClass:"v-money",attrs:{type:"tel"},domProps:{value:e.formattedValue},on:{change:e.change}})},staticRenderFns:[]}},function(e,t,n){e.exports=n(3)}])}))},"8d41":function(e,t,n){},e498:function(e,t,n){"use strict";var i=n("1c18"),a=n.n(i);a.a}}]);