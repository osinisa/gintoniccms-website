/*! ColReorder 1.1.3
 * ©2010-2014 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     ColReorder
 * @description Provide the ability to reorder columns in a DataTable
 * @version     1.1.3
 * @file        dataTables.colReorder.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2010-2014 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

(function(e,t,n){function r(e){var t=[];for(var n=0,r=e.length;n<r;n++)t[e[n]]=n;return t}function i(e,t,n){var r=e.splice(t,1)[0];e.splice(n,0,r)}function s(e,t,n){var r=[];for(var i=0,s=e.childNodes.length;i<s;i++)e.childNodes[i].nodeType==1&&r.push(e.childNodes[i]);var o=r[t];n!==null?e.insertBefore(o,r[n]):e.appendChild(o)}var o=function(e,o){"use strict";e.fn.dataTableExt.oApi.fnColReorder=function(t,n,o){var u=e.fn.dataTable.Api?!0:!1,a,f,l,c,h=t.aoColumns.length,p,d,v=function(e,t,n){if(!e[t])return;var r=e[t].split("."),i=r.shift();if(isNaN(i*1))return;e[t]=n[i*1]+"."+r.join(".")};if(n==o)return;if(n<0||n>=h){this.oApi._fnLog(t,1,"ColReorder 'from' index is out of bounds: "+n);return}if(o<0||o>=h){this.oApi._fnLog(t,1,"ColReorder 'to' index is out of bounds: "+o);return}var m=[];for(a=0,f=h;a<f;a++)m[a]=a;i(m,n,o);var g=r(m);for(a=0,f=t.aaSorting.length;a<f;a++)t.aaSorting[a][0]=g[t.aaSorting[a][0]];if(t.aaSortingFixed!==null)for(a=0,f=t.aaSortingFixed.length;a<f;a++)t.aaSortingFixed[a][0]=g[t.aaSortingFixed[a][0]];for(a=0,f=h;a<f;a++){d=t.aoColumns[a];for(l=0,c=d.aDataSort.length;l<c;l++)d.aDataSort[l]=g[d.aDataSort[l]];u&&(d.idx=g[d.idx])}u&&e.each(t.aLastSort,function(e,n){t.aLastSort[e].src=g[n.src]});for(a=0,f=h;a<f;a++)d=t.aoColumns[a],typeof d.mData=="number"?(d.mData=g[d.mData],t.oApi._fnColumnOptions(t,a,{})):e.isPlainObject(d.mData)&&(v(d.mData,"_",g),v(d.mData,"filter",g),v(d.mData,"sort",g),v(d.mData,"type",g),t.oApi._fnColumnOptions(t,a,{}));if(t.aoColumns[n].bVisible){var y=this.oApi._fnColumnIndexToVisible(t,n),b=null;a=o<n?o:o+1;while(b===null&&a<h)b=this.oApi._fnColumnIndexToVisible(t,a),a++;p=t.nTHead.getElementsByTagName("tr");for(a=0,f=p.length;a<f;a++)s(p[a],y,b);if(t.nTFoot!==null){p=t.nTFoot.getElementsByTagName("tr");for(a=0,f=p.length;a<f;a++)s(p[a],y,b)}for(a=0,f=t.aoData.length;a<f;a++)t.aoData[a].nTr!==null&&s(t.aoData[a].nTr,y,b)}i(t.aoColumns,n,o),i(t.aoPreSearchCols,n,o);for(a=0,f=t.aoData.length;a<f;a++){var w=t.aoData[a];u?(w.anCells&&i(w.anCells,n,o),w.src!=="dom"&&e.isArray(w._aData)&&i(w._aData,n,o)):(e.isArray(w._aData)&&i(w._aData,n,o),i(w._anHidden,n,o))}for(a=0,f=t.aoHeader.length;a<f;a++)i(t.aoHeader[a],n,o);if(t.aoFooter!==null)for(a=0,f=t.aoFooter.length;a<f;a++)i(t.aoFooter[a],n,o);if(u){var E=new e.fn.dataTable.Api(t);E.rows().invalidate()}for(a=0,f=h;a<f;a++)e(t.aoColumns[a].nTh).off("click.DT"),this.oApi._fnSortAttachListener(t,t.aoColumns[a].nTh,a);e(t.oInstance).trigger("column-reorder",[t,{iFrom:n,iTo:o,aiInvertMapping:g}])};var u=function(t,n){var r;e.fn.dataTable.Api?r=(new e.fn.dataTable.Api(t)).settings()[0]:t.fnSettings?r=t.fnSettings():typeof t=="string"?e.fn.dataTable.fnIsDataTable(e(t)[0])&&(r=e(t).eq(0).dataTable().fnSettings()):t.nodeName&&t.nodeName.toLowerCase()==="table"?e.fn.dataTable.fnIsDataTable(t.nodeName)&&(r=e(t.nodeName).dataTable().fnSettings()):t instanceof jQuery?e.fn.dataTable.fnIsDataTable(t[0])&&(r=t.eq(0).dataTable().fnSettings()):r=t;if(r._colReorder)throw"ColReorder already initialised on table #"+r.nTable.id;var i=e.fn.dataTable.camelToHungarian;return i&&(i(u.defaults,u.defaults,!0),i(u.defaults,n||{})),this.s={dt:null,init:e.extend(!0,{},u.defaults,n),fixed:0,fixedRight:0,reorderCallback:null,mouse:{startX:-1,startY:-1,offsetX:-1,offsetY:-1,target:-1,targetIndex:-1,fromIndex:-1},aoTargets:[]},this.dom={drag:null,pointer:null},this.s.dt=r,this.s.dt._colReorder=this,this._fnConstruct(),r.oApi._fnCallbackReg(r,"aoDestroyCallback",e.proxy(this._fnDestroy,this),"ColReorder"),this};return u.prototype={fnReset:function(){var e=[];for(var t=0,n=this.s.dt.aoColumns.length;t<n;t++)e.push(this.s.dt.aoColumns[t]._ColReorder_iOrigCol);return this._fnOrderColumns(e),this},fnGetCurrentOrder:function(){return this.fnOrder()},fnOrder:function(e){if(e===n){var t=[];for(var i=0,s=this.s.dt.aoColumns.length;i<s;i++)t.push(this.s.dt.aoColumns[i]._ColReorder_iOrigCol);return t}return this._fnOrderColumns(r(e)),this},_fnConstruct:function(){var e=this,t=this.s.dt.aoColumns.length,n;this.s.init.iFixedColumns&&(this.s.fixed=this.s.init.iFixedColumns),this.s.fixedRight=this.s.init.iFixedColumnsRight?this.s.init.iFixedColumnsRight:0,this.s.init.fnReorderCallback&&(this.s.reorderCallback=this.s.init.fnReorderCallback);for(n=0;n<t;n++)n>this.s.fixed-1&&n<t-this.s.fixedRight&&this._fnMouseListener(n,this.s.dt.aoColumns[n].nTh),this.s.dt.aoColumns[n]._ColReorder_iOrigCol=n;this.s.dt.oApi._fnCallbackReg(this.s.dt,"aoStateSaveParams",function(t,n){e._fnStateSave.call(e,n)},"ColReorder_State");var i=null;this.s.init.aiOrder&&(i=this.s.init.aiOrder.slice()),this.s.dt.oLoadedState&&typeof this.s.dt.oLoadedState.ColReorder!="undefined"&&this.s.dt.oLoadedState.ColReorder.length==this.s.dt.aoColumns.length&&(i=this.s.dt.oLoadedState.ColReorder);if(i)if(!e.s.dt._bInitComplete){var s=!1;this.s.dt.aoDrawCallback.push({fn:function(){if(!e.s.dt._bInitComplete&&!s){s=!0;var t=r(i);e._fnOrderColumns.call(e,t)}},sName:"ColReorder_Pre"})}else{var o=r(i);e._fnOrderColumns.call(e,o)}else this._fnSetColumnIndexes()},_fnOrderColumns:function(t){if(t.length!=this.s.dt.aoColumns.length){this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"ColReorder - array reorder does not match known number of columns. Skipping.");return}for(var n=0,r=t.length;n<r;n++){var s=e.inArray(n,t);n!=s&&(i(t,s,n),this.s.dt.oInstance.fnColReorder(s,n))}(this.s.dt.oScroll.sX!==""||this.s.dt.oScroll.sY!=="")&&this.s.dt.oInstance.fnAdjustColumnSizing(!1),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),this._fnSetColumnIndexes(),this.s.reorderCallback!==null&&this.s.reorderCallback.call(this)},_fnStateSave:function(t){var n,r,i,s,o=this.s.dt,u=o.aoColumns;t.ColReorder=[];if(t.aaSorting){for(n=0;n<t.aaSorting.length;n++)t.aaSorting[n][0]=u[t.aaSorting[n][0]]._ColReorder_iOrigCol;var a=e.extend(!0,[],t.aoSearchCols);for(n=0,r=u.length;n<r;n++)s=u[n]._ColReorder_iOrigCol,t.aoSearchCols[s]=a[n],t.abVisCols[s]=u[n].bVisible,t.ColReorder.push(s)}else if(t.order){for(n=0;n<t.order.length;n++)t.order[n][0]=u[t.order[n][0]]._ColReorder_iOrigCol;var f=e.extend(!0,[],t.columns);for(n=0,r=u.length;n<r;n++)s=u[n]._ColReorder_iOrigCol,t.columns[s]=f[n],t.ColReorder.push(s)}},_fnMouseListener:function(t,n){var r=this;e(n).on("mousedown.ColReorder",function(e){e.preventDefault(),r._fnMouseDown.call(r,e,n)})},_fnMouseDown:function(r,i){var s=this,o=e(r.target).closest("th, td"),u=o.offset(),a=parseInt(e(i).attr("data-column-index"),10);if(a===n)return;this.s.mouse.startX=r.pageX,this.s.mouse.startY=r.pageY,this.s.mouse.offsetX=r.pageX-u.left,this.s.mouse.offsetY=r.pageY-u.top,this.s.mouse.target=this.s.dt.aoColumns[a].nTh,this.s.mouse.targetIndex=a,this.s.mouse.fromIndex=a,this._fnRegions(),e(t).on("mousemove.ColReorder",function(e){s._fnMouseMove.call(s,e)}).on("mouseup.ColReorder",function(e){s._fnMouseUp.call(s,e)})},_fnMouseMove:function(e){var t=this;if(this.dom.drag===null){if(Math.pow(Math.pow(e.pageX-this.s.mouse.startX,2)+Math.pow(e.pageY-this.s.mouse.startY,2),.5)<5)return;this._fnCreateDragNode()}this.dom.drag.css({left:e.pageX-this.s.mouse.offsetX,top:e.pageY-this.s.mouse.offsetY});var n=!1,r=this.s.mouse.toIndex;for(var i=1,s=this.s.aoTargets.length;i<s;i++)if(e.pageX<this.s.aoTargets[i-1].x+(this.s.aoTargets[i].x-this.s.aoTargets[i-1].x)/2){this.dom.pointer.css("left",this.s.aoTargets[i-1].x),this.s.mouse.toIndex=this.s.aoTargets[i-1].to,n=!0;break}n||(this.dom.pointer.css("left",this.s.aoTargets[this.s.aoTargets.length-1].x),this.s.mouse.toIndex=this.s.aoTargets[this.s.aoTargets.length-1].to),this.s.init.bRealtime&&r!==this.s.mouse.toIndex&&(this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex),this.s.mouse.fromIndex=this.s.mouse.toIndex,this._fnRegions())},_fnMouseUp:function(n){var r=this;e(t).off("mousemove.ColReorder mouseup.ColReorder"),this.dom.drag!==null&&(this.dom.drag.remove(),this.dom.pointer.remove(),this.dom.drag=null,this.dom.pointer=null,this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex),this._fnSetColumnIndexes(),(this.s.dt.oScroll.sX!==""||this.s.dt.oScroll.sY!=="")&&this.s.dt.oInstance.fnAdjustColumnSizing(!1),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),this.s.reorderCallback!==null&&this.s.reorderCallback.call(this))},_fnRegions:function(){var t=this.s.dt.aoColumns;this.s.aoTargets.splice(0,this.s.aoTargets.length),this.s.aoTargets.push({x:e(this.s.dt.nTable).offset().left,to:0});var n=0;for(var r=0,i=t.length;r<i;r++)r!=this.s.mouse.fromIndex&&n++,t[r].bVisible&&this.s.aoTargets.push({x:e(t[r].nTh).offset().left+e(t[r].nTh).outerWidth(),to:n});this.s.fixedRight!==0&&this.s.aoTargets.splice(this.s.aoTargets.length-this.s.fixedRight),this.s.fixed!==0&&this.s.aoTargets.splice(0,this.s.fixed)},_fnCreateDragNode:function(){var t=this.s.dt.oScroll.sX!==""||this.s.dt.oScroll.sY!=="",n=this.s.dt.aoColumns[this.s.mouse.targetIndex].nTh,r=n.parentNode,i=r.parentNode,s=i.parentNode,o=e(n).clone();this.dom.drag=e(s.cloneNode(!1)).addClass("DTCR_clonedTable").append(e(i.cloneNode(!1)).append(e(r.cloneNode(!1)).append(o[0]))).css({position:"absolute",top:0,left:0,width:e(n).outerWidth(),height:e(n).outerHeight()}).appendTo("body"),this.dom.pointer=e("<div></div>").addClass("DTCR_pointer").css({position:"absolute",top:t?e("div.dataTables_scroll",this.s.dt.nTableWrapper).offset().top:e(this.s.dt.nTable).offset().top,height:t?e("div.dataTables_scroll",this.s.dt.nTableWrapper).height():e(this.s.dt.nTable).height()}).appendTo("body")},_fnDestroy:function(){var t,n;for(t=0,n=this.s.dt.aoDrawCallback.length;t<n;t++)if(this.s.dt.aoDrawCallback[t].sName==="ColReorder_Pre"){this.s.dt.aoDrawCallback.splice(t,1);break}e(this.s.dt.nTHead).find("*").off(".ColReorder"),e.each(this.s.dt.aoColumns,function(t,n){e(n.nTh).removeAttr("data-column-index")}),this.s.dt._colReorder=null,this.s=null},_fnSetColumnIndexes:function(){e.each(this.s.dt.aoColumns,function(t,n){e(n.nTh).attr("data-column-index",t)})}},u.defaults={aiOrder:null,bRealtime:!1,iFixedColumns:0,iFixedColumnsRight:0,fnReorderCallback:null},u.version="1.1.3",e.fn.dataTable.ColReorder=u,e.fn.DataTable.ColReorder=u,typeof e.fn.dataTable=="function"&&typeof e.fn.dataTableExt.fnVersionCheck=="function"&&e.fn.dataTableExt.fnVersionCheck("1.9.3")?e.fn.dataTableExt.aoFeatures.push({fnInit:function(e){var t=e.oInstance;if(!e._colReorder){var n=e.oInit,r=n.colReorder||n.oColReorder||{};new u(e,r)}else t.oApi._fnLog(e,1,"ColReorder attempted to initialise twice. Ignoring second");return null},cFeature:"R",sFeature:"ColReorder"}):alert("Warning: ColReorder requires DataTables 1.9.3 or greater - www.datatables.net/download"),e.fn.dataTable.Api&&(e.fn.dataTable.Api.register("colReorder.reset()",function(){return this.iterator("table",function(e){e._colReorder.fnReset()})}),e.fn.dataTable.Api.register("colReorder.order()",function(e){return e?this.iterator("table",function(t){t._colReorder.fnOrder(e)}):this.context.length?this.context[0]._colReorder.fnOrder():null})),u};typeof define=="function"&&define.amd?define(["jquery","datatables"],o):typeof exports=="object"?o(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.ColReorder&&o(jQuery,jQuery.fn.dataTable)})(window,document);