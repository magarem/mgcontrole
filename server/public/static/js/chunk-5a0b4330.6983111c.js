(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a0b4330"],{"041d":function(t,e,a){"use strict";var n=a("b44a"),i=a.n(n);i.a},"0b51":function(t,e,a){"use strict";a.d(e,"d",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return o})),a.d(e,"e",(function(){return l})),a.d(e,"b",(function(){return r}));var n=a("b775"),i="/dev-api";function s(t,e){return Object(n["a"])({url:i+"/generic?key="+t,method:"get",params:e})}function o(t,e){return Object(n["a"])({url:"".concat(i,"/generic?key=").concat(t),method:"post",data:e})}function l(t,e){return Object(n["a"])({url:"".concat(i,"/generic?key=").concat(t),method:"patch",data:e})}function r(t,e){return Object(n["a"])({url:"".concat(i,"/generic?key=").concat(t),method:"delete",data:e})}},6724:function(t,e,a){"use strict";a("8d41");var n="@@wavesContext";function i(t,e){function a(a){var n=Object.assign({},e.value),i=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),s=i.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var o=s.getBoundingClientRect(),l=s.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(o.width,o.height)+"px",s.appendChild(l)),i.type){case"center":l.style.top=o.height/2-l.offsetHeight/2+"px",l.style.left=o.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(a.pageY-o.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(a.pageX-o.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=i.color,l.className="waves-ripple z-active",!1}}return t[n]?t[n].removeHandle=a:t[n]={removeHandle:a},a}var s={bind:function(t,e){t.addEventListener("click",i(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[n].removeHandle,!1),t.addEventListener("click",i(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[n].removeHandle,!1),t[n]=null,delete t[n]}},o=function(t){t.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(o)),s.install=o;e["a"]=s},"7db0":function(t,e,a){"use strict";var n=a("23e7"),i=a("b727").find,s=a("44d2"),o=a("ae40"),l="find",r=!0,c=o(l);l in[]&&Array(1)[l]((function(){r=!1})),n({target:"Array",proto:!0,forced:r||!c},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),s(l)},"8d41":function(t,e,a){},b44a:function(t,e,a){},bc97:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"250px"},attrs:{placeholder:"Código"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.codigo,callback:function(e){t.$set(t.listQuery,"codigo",e)},expression:"listQuery.codigo"}}),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v(" Procurar ")]),a("router-link",{attrs:{to:"/vendas/balcao"}},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"}},[t._v(" Incluir ")])],1),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:t.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:t.handleDownload}},[t._v(" Exportar ")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":t.sortChange}},[a("el-table-column",{attrs:{label:"#",prop:"id",sortable:"custom",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.id))])]}}])}),a("el-table-column",{attrs:{label:"Código",prop:"vendaID",sortable:"custom",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[a("a",{attrs:{href:""},on:{click:function(a){return a.preventDefault(),t.getList_vendaItens(e.row)}}},[t._v(t._s(e.row.vendaID))])])]}}])}),a("el-table-column",{attrs:{label:"Cliente",prop:"cliente",sortable:"custom",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("capitalize")(e.row.cliente)))])]}}])}),a("el-table-column",{attrs:{label:"SubTotal",prop:"subtotal",sortable:"custom",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("money")(e.row.subtotal)))])]}}])}),a("el-table-column",{attrs:{label:"Faturado",prop:"faturado",sortable:"custom",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("booleanChange")(e.row.faturado)))])]}}])})],1),a("el-dialog",{attrs:{visible:t.dialogPvVisible,title:"Venda",width:"80%",top:"5vh",center:""},on:{"update:visible":function(e){t.dialogPvVisible=e}}},[a("el-row",{staticClass:"row-bg",attrs:{gutter:20,type:"flex"}},[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("b",[t._v("Venda #:")]),t._v(" "+t._s(t.vendaNumero))])]),a("el-col",{attrs:{span:7}},[a("div",{staticClass:"grid-content bg-purple"},[a("b",[t._v("ID:")]),t._v(" "+t._s(t.vendaID))])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("b",[t._v("Data:")]),t._v(" "+t._s(t.vendaData))])]),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("b",[t._v("Valor:")]),t._v(" "+t._s(t._f("money")(t.vendaTotal)))])]),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("b",[t._v("Faturado:")]),t._v(" "+t._s(t.faturado)+" ")])])],1),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"grid-content bg-purple"},[a("b",[t._v("Cliente:")]),t._v(" "+t._s(t.cliente.id)+" - "+t._s(t.cliente.nome))])])],1),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:!1,expression:"false"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{height:"350",data:t.list2,stripe:"",border:"",fit:"","highlight-current-row":""},on:{"sort-change":t.sortChange}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"#",width:"60"}}),a("el-table-column",{attrs:{label:"Código",prop:"ean",sortable:"custom",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.ean))])]}}])}),a("el-table-column",{attrs:{label:"Descricao",prop:"descricao",sortable:"custom",align:"center",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("capitalize")(e.row.descricao)))])]}}])}),a("el-table-column",{attrs:{label:"Unidade",prop:"unidade",sortable:"custom",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.unidade))])]}}])}),a("el-table-column",{attrs:{label:"Preço",prop:"pco_venda",sortable:"custom",align:"center",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("money")(e.row.pco_venda)))])]}}])}),a("el-table-column",{attrs:{label:"Qnt",prop:"qnt",sortable:"custom",align:"center",width:"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.qnt))])]}}])}),a("el-table-column",{attrs:{label:"subtotal",prop:"subtotal",sortable:"custom",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("money")(e.row.subtotal)))])]}}])})],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogPvVisible=!1}}},[t._v("Fechar")])],1)],1)],1)},i=[],s=(a("7db0"),a("c975"),a("d81d"),a("fb6a"),a("a434"),a("d3b7"),a("25f0"),a("b85c")),o=a("0b51"),l=a("6724"),r=a("ed08"),c={name:"Vendas",directives:{waves:l["a"]},filters:{money:function(t){if("number"!==typeof t)return t;var e=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0});return e.format(t)},booleanChange:function(t){var e="Não";return 1==t&&(e="Sim"),e},capitalize:function(t){return t?(t=t.toString(),t.charAt(0).toUpperCase()+t.slice(1)):""},statusFilter:function(t){var e={published:"success",draft:"info",deleted:"danger"};return e[t]},typeFilter:function(t){return calendarTypeKeyValue[t]}},data:function(){return{vendaNumero:0,vendaTotal:0,vendaID:"",money:{decimal:",",thousands:".",prefix:"R$ ",precision:2,masked:!1},cliente:{id:null,nome:null},vendaData:"",tableKey:0,list:[],list2:[],total:0,listLoading:!0,listQuery:{page:1,limit:20,sort:"id DESC"},importanceOptions:[1,2,3],sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:void 0,timestamp:new Date},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(t){var e=this;this.listLoading=!0,Object(o["c"])("vendas",this.listQuery).then((function(t){console.log("response.data.items:",t.data.items),e.list=t.data.items,e.total=t.data.total,setTimeout((function(){e.listLoading=!1}),1500)}))},getList_vendaItens:function(t){var e=this,a=t.vendaID;this.cliente.id=t.cliente,this.cliente.nome="Não informado",null!==this.cliente.id&&Object(o["c"])("clientes",{find:{id:this.cliente.id}}).then((function(t){console.log("response.data.items:",t.data.items),e.cliente=t.data.items[0]})),this.listLoading=!0,this.dialogPvVisible=!0;var n=[];n=this.list.find((function(t){return t.vendaID===a})),this.vendaNumero=n.id,this.vendaID=a,this.vendaData=new Date(parseFloat(n.created)).toLocaleDateString(),this.vendaTotal=n.subtotal-n.desconto+parseFloat(n.acrescimo),this.faturado=1==n.faturado?"sim":"Não",console.log("item:",n),Object(o["c"])("vendas_itens",{find:{vendaID:a}}).then((function(t){console.log("response.data.items:",t.data.items),e.list2=t.data.items,e.total=t.data.total,setTimeout((function(){e.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(t,e){this.$message({message:"Success",type:"success"}),t.status=e},sortChange:function(t){var e=t.prop,a=t.order;"id"===e&&this.sortByID(a)},sortByID:function(t){this.listQuery.sort="ascending"===t?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:void 0,timestamp:new Date}},handleCreate:function(){var t=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},handleUpdate:function(t){var e=this;this.temp=Object.assign({},t),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},updateData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var a=Object.assign({},t.temp);a.timestamp=+new Date(a.timestamp),Object(o["e"])("vendas",a).then((function(){var e,a=Object(s["a"])(t.list);try{for(a.s();!(e=a.n()).done;){var n=e.value;if(n.id===t.temp.id){var i=t.list.indexOf(n);t.list.splice(i,1,t.temp);break}}}catch(o){a.e(o)}finally{a.f()}t.dialogFormVisible=!1,t.$notify({title:"Sucesso",message:"Registro alterado",type:"success",duration:2e3})}))}}))},handleDelete:function(t){this.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3});var e=this.list.indexOf(t);this.list.splice(e,1)},handleFetchPv:function(t){},handleDownload:function(){var t=this;this.downloadLoading=!0,Promise.all([a.e("chunk-489b8c18"),a.e("chunk-2125b98f")]).then(a.bind(null,"4bf8")).then((function(e){var a=["timestamp","title","type","importance","status"],n=["timestamp","title","type","importance","status"],i=t.formatJson(n,t.list);e.export_json_to_excel({header:a,data:i,filename:"table-list"}),t.downloadLoading=!1}))},formatJson:function(t,e){return e.map((function(e){return t.map((function(t){return"timestamp"===t?Object(r["c"])(e[t]):e[t]}))}))}}},d=c,u=(a("041d"),a("2877")),p=Object(u["a"])(d,n,i,!1,null,"5881b9ed",null);e["default"]=p.exports}}]);