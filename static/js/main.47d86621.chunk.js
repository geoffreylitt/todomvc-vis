(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{287:function(e,t,n){e.exports=n(542)},542:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"addTodo",function(){return he}),n.d(a,"deleteTodo",function(){return ve}),n.d(a,"editTodo",function(){return ge}),n.d(a,"completeTodo",function(){return Ee}),n.d(a,"completeAllTodos",function(){return Se}),n.d(a,"clearCompleted",function(){return be}),n.d(a,"setVisibilityFilter",function(){return Ie});var r=n(0),o=n.n(r),i=n(71),c=n(9),l=n(7),u=n(15),d=n(223),s=n.n(d),m=n(224),f=n.n(m),p=n(225),h=n.n(p),v=n(38),g=n(39),E=n(44),S=n(40),b=n(45),I=n(10),O=n(1),y=n.n(O),T=n(5),j=n(43),w=n(2),x=function(e){var t=e.path,n=e.stroke,a=e.fill,r=e.strokeWidth,i=e.strokeDasharray;return o.a.createElement("path",{d:t,fill:a,stroke:n,strokeWidth:r,strokeDasharray:i,opacity:.8})};x.defaultProps={stroke:"blue",fill:"none",strokeWidth:2};var k=x;function C(){var e=Object(I.a)(["\n  border: solid thin #eee;\n  cursor: pointer;\n  overflow: visible;\n"]);return C=function(){return e},e}var _=T.a.svg(C()),D=function(e){var t,n,a=e.data,r=e.width,i=e.height,c=e.setSelectedStateId,l=e.selectedStateId,u=e.jumpToState,d=e.currentStateId,s=e.resetToSelectedState,m=a.slice(-1)[0],f=a.concat([{stateId:m.stateId+1,value:m.value}]),p=w.h().domain(w.e(f,function(e){return e.stateId})).range([1,r-1]),h=w.h().domain(w.e(f,function(e){return e.value})).range([i-1,1]),v=w.f().defined(function(e){return!isNaN(e.value)}).curve(w.d).x(function(e){return p(e.stateId)}).y(function(e){return h(e.value)}),g=w.f().curve(w.c)([[p(d),h.range()[0]],[p(d),h.range()[1]]]),E=w.f().curve(w.c)([[p(l),h.range()[0]],[p(l),h.range()[1]]]),S=w.a(function(e){return e.stateId}).right,b=function(e){var t=w.b(e.target,e),n=Object(j.a)(t,2),a=n[0],r=n[1],o={x:p.invert(a),y:h.invert(r)},i=S(f,o.x,1);return i<=m.stateId?i:m.stateId};return d&&a.find(function(e){return e.stateId===d})&&(t=a.find(function(e){return e.stateId===d}).value),void 0!==t&&(n=o.a.createElement("text",{x:p(d)+5,y:12,height:10,width:50,fill:"#999",fontSize:"12px"},t)),o.a.createElement(o.a.Fragment,null,o.a.createElement(_,{width:r,height:i,onMouseMove:function(e){u(b(e))},onClick:function(e){var t=b(e);c(t===l?null:t)},onMouseLeave:function(e){s()}},o.a.createElement(k,{path:v(f),stroke:"#a6d2ff"}),o.a.createElement(k,{path:g,stroke:"#aaa",strokeDasharray:3,strokeWidth:1}),l?o.a.createElement(k,{path:E,stroke:"#ffcece"}):null,n))},L=n(54),A=n.n(L),M=function(e){var t,n,a,r=e.data,i=e.width,c=e.height,l=e.setSelectedStateId,u=e.jumpToState,d=e.currentStateId,s=e.resetToSelectedState,m=e.selectedStateId,f=w.g().domain(r.map(function(e){return e.stateId})).range([1,i-1]).padding(.1),p=w.g().domain(A()(r.map(function(e){return e.value}))).range([c-1,1]).padding(.1),h=(w.i().domain(A()(r.map(function(e){return e.value}))).range(w.j),w.f().curve(w.c)([[f(d),p.range()[0]],[f(d),p.range()[1]]])),v=w.f().curve(w.c)([[f(m),p.range()[0]],[f(m),p.range()[1]]]),g=(w.a(function(e){return e.stateId}).right,function(e){var t=w.b(e.target,e),n=Object(j.a)(t,2),a=n[0];return n[1],function(e){var t=Math.round(e/f.step()),n=f.domain();return t>=n.length?n.slice(-1)[0]:t<0?n[0]:n[t]}(a)}),E=r.map(function(e){return o.a.createElement("text",{key:e.stateId,x:f(e.stateId)-7,y:25,height:10,width:f.bandwidth()},{"@@INIT":"\u23ef",ADD_TODO:"\u2795",SET_VISIBILITY_FILTER:"\ud83d\udd0d",EDIT_TODO:"\u270f\ufe0f",DELETE_TODO:"\ud83d\uddd1",COMPLETE_TODO:"\u2705",COMPLETE_ALL_TODOS:"\u2705",CLEAR_COMPLETED:"\ud83d\uddd1"}[e.value]||"?")});return d&&r.find(function(e){return e.stateId===d})&&(t=r.find(function(e){return e.stateId===d}).value),void 0!==t&&(n=o.a.createElement("text",{x:f(d)+5,y:12,height:10,width:50,fill:"#999",fontSize:"12px"},t)),m&&(a=o.a.createElement("text",{x:f(m),y:-5},"\ud83d\udccc")),o.a.createElement(o.a.Fragment,null,o.a.createElement(_,{width:i,height:c,onMouseMove:function(e){u(g(e))},onClick:function(e){var t=g(e);l(t===m?null:t)},onMouseLeave:function(e){s()}},E,o.a.createElement(k,{path:h,stroke:"#aaa",strokeDasharray:3,strokeWidth:1}),m?o.a.createElement(k,{path:v,stroke:"#ffcece"}):null,a,n))},F=function(e){var t,n,a=e.data,r=e.width,i=e.height,c=e.setSelectedStateId,l=e.selectedStateId,u=e.jumpToState,d=e.currentStateId,s=e.resetToSelectedState,m=w.g().domain(a.map(function(e){return e.stateId})).range([1,r-1]).padding(.1),f=w.g().domain(a[0].enumValues).range([i-1,1]).padding(.1),p=w.i().domain(A()(a.map(function(e){return e.value}))).range(w.j),h=w.f().curve(w.c)([[m(d),f.range()[0]],[m(d),f.range()[1]]]),v=(w.a(function(e){return e.stateId}).right,function(e){var t=w.b(e.target,e),n=Object(j.a)(t,2),a=n[0];return n[1],function(e){var t=Math.round(e/m.step()),n=m.domain();return t>=n.length?n.slice(-1)[0]:t<0?n[0]:n[t]}(a)}),g=a.map(function(e){return o.a.createElement("rect",{key:e.stateId,fill:p(e.value),x:m(e.stateId),y:f(e.value),height:f.bandwidth(),width:m.bandwidth()})});return d&&a.find(function(e){return e.stateId===d})&&(t=a.find(function(e){return e.stateId===d}).value),void 0!==t&&(n=o.a.createElement("text",{x:m(d)+5,y:12,height:10,width:50,fill:"#999",fontSize:"12px"},t)),o.a.createElement(o.a.Fragment,null,o.a.createElement(_,{width:r,height:i,onMouseMove:function(e){u(v(e))},onClick:function(e){var t=v(e);c(t===l?null:t)},onMouseLeave:function(e){s()}},g,o.a.createElement(k,{path:h,stroke:"#ffcece"}),n))},N=(n(180),n(124)),P=function(e){return e.todos},R=Object(N.a)([function(e){return e.visibilityFilter},P],function(e,t){switch(e){case"show_all":return t;case"show_completed":return t.filter(function(e){return e.completed});case"show_active":return t.filter(function(e){return!e.completed});default:throw new Error("Unknown filter: "+e)}}),z=Object(N.a)([P],function(e){return e.reduce(function(e,t){return t.completed?e+1:e},0)}),V=n(72),B=n.n(V);function U(){var e=Object(I.a)(["\n  text-transform: uppercase;\n  font-weight: bold;\n  color: #aaa;\n  font-size: 12px;\n"]);return U=function(){return e},e}function W(){var e=Object(I.a)(["\n  grid-area: state;\n"]);return W=function(){return e},e}function K(){var e=Object(I.a)(["\n  grid-area: visualizations;\n  z-index: 10;\n"]);return K=function(){return e},e}function Y(){var e=Object(I.a)(["\n  grid-area: instructions;\n"]);return Y=function(){return e},e}function q(){var e=Object(I.a)(["\n  display: inline-block;\n  width: 430px;\n"]);return q=function(){return e},e}function J(){var e=Object(I.a)(["\n  margin-right: 10px;\n  display: inline-block;\n  width: 100px;\n  text-align: right;\n  vertical-align: top;\n  padding-top: 9px;\n  font-size: 12px;\n  color: #5d7395;\n"]);return J=function(){return e},e}function G(){var e=Object(I.a)(['\n  display: grid;\n  grid-template-columns: 150px auto 250px;\n  grid-template-rows: auto;\n  grid-template-areas: "instructions visualizations state";\n  gap: 30px;\n\n  padding: 20px;\n  font-size: 14px;\n  font-weight: normal;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n']);return G=function(){return e},e}u.ActionCreators.reset;var H=u.ActionCreators.jumpToState,Q=T.a.div(G()),X=T.a.div(J()),Z=(T.a.div(q()),T.a.div(Y())),$=T.a.div(K()),ee=T.a.div(W()),te=T.a.div(U());var ne=function(e){function t(){var e,n;Object(v.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(E.a)(this,(e=Object(S.a)(t)).call.apply(e,[this].concat(r)))).state={selectedStateId:null},n}return Object(b.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.currentStateIndex,a=t.computedStates,r=t.actionsById,i=t.stagedActionIds,c=(t.skippedActionIds,t.dispatch),l=(t.stagedActions,a[n].state),u=a.map(function(e,t){return{stateId:t,value:e.state.todos.length}}),d=a.map(function(e,t){return{stateId:t,value:R(e.state).length}}),s=a.map(function(e,t){return{stateId:t,value:z(e.state)}}),m=a.map(function(e,t){return{stateId:t,value:e.state.visibilityFilter,enumValues:["show_all","show_completed","show_active"]}}),f=i.map(function(e){return{stateId:e,value:r[e].action.type}}),p=function(){var t;t=null===e.state.selectedStateId?a.length-1:e.state.selectedStateId,c(H(t))},h=function(t){t!==a.length-1?e.setState({selectedStateId:t}):e.setState({selectedStateId:null})};return o.a.createElement(Q,null,o.a.createElement(Z,null,o.a.createElement("h3",{style:{marginTop:0}},"MVU Visualizer"),o.a.createElement("p",null,"Geoffrey Litt, 6.894 Final Project"),o.a.createElement("p",null,o.a.createElement("a",{href:"https://github.mit.edu/6894-sp20/FP-Program-Execution-Visualization/"},"project background / description")),o.a.createElement("p",null,"Try it out: 1) do some things in the app, 2) hover on graphs below to navigate past states, 3) click in a graph to rewind the app state to a past version.")),o.a.createElement($,null,o.a.createElement(te,null,"Timeline"),o.a.createElement("div",null,o.a.createElement(X,null,"actions"),o.a.createElement(M,{data:f,currentStateId:n,width:300,height:35,setSelectedStateId:h,selectedStateId:this.state.selectedStateId,jumpToState:function(e){return c(H(e))},resetToSelectedState:p,paddingRight:50})),o.a.createElement("div",null,o.a.createElement(X,null,"# todos"),o.a.createElement(D,{data:u,currentStateId:n,width:300,height:35,setSelectedStateId:h,selectedStateId:this.state.selectedStateId,jumpToState:function(e){return c(H(e))},resetToSelectedState:p,paddingRight:50})),o.a.createElement("div",null,o.a.createElement(X,null,"# visible"),o.a.createElement(D,{data:d,currentStateId:n,width:300,height:35,setSelectedStateId:h,selectedStateId:this.state.selectedStateId,jumpToState:function(e){return c(H(e))},resetToSelectedState:p,paddingRight:50})),o.a.createElement("div",null,o.a.createElement(X,null,"# completed"),o.a.createElement(D,{data:s,currentStateId:n,width:300,height:35,setSelectedStateId:h,selectedStateId:this.state.selectedStateId,jumpToState:function(e){return c(H(e))},resetToSelectedState:p,paddingRight:50})),o.a.createElement("div",null,o.a.createElement(X,null,"visibilityFilter"),o.a.createElement(F,{data:m,currentStateId:n,width:300,height:35,setSelectedStateId:h,selectedStateId:this.state.selectedStateId,jumpToState:function(e){return c(H(e))},resetToSelectedState:p,paddingRight:50}))),o.a.createElement(ee,null,o.a.createElement(te,null,"App state"),o.a.createElement(B.a,{data:l,theme:"monokai"})))}}]),t}(r.PureComponent||r.Component);ne.update=function(){return{}},ne.propTypes={dispatch:y.a.func,computedStates:y.a.array,stagedActionIds:y.a.array,actionsById:y.a.object,currentStateIndex:y.a.number,monitorState:y.a.shape({initialScrollTop:y.a.number}),preserveScrollTop:y.a.bool,stagedActions:y.a.array,select:y.a.func.isRequired},ne.defaultProps={select:function(e){return e}};var ae,re=Object(u.createDevTools)(o.a.createElement(f.a,{toggleVisibilityKey:"ctrl-h",changePositionKey:"ctrl-q",changeMonitorKey:"ctrl-m",defaultIsVisible:!0,defaultSize:.3,defaultPosition:"bottom"},o.a.createElement(ne,null),o.a.createElement(s.a,{theme:"tomorrow"}),o.a.createElement(h.a,{keyboardEnabled:!0}))),oe=n(41),ie=n.n(oe),ce=function(e){function t(){var e,n;Object(v.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(E.a)(this,(e=Object(S.a)(t)).call.apply(e,[this].concat(r)))).state={text:n.props.text||""},n.handleSubmit=function(e){var t=e.target.value.trim();13===e.which&&(n.props.onSave(t),n.props.newTodo&&n.setState({text:""}))},n.handleChange=function(e){n.setState({text:e.target.value})},n.handleBlur=function(e){n.props.newTodo||n.props.onSave(e.target.value)},n}return Object(b.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){return o.a.createElement("input",{className:ie()({edit:this.props.editing,"new-todo":this.props.newTodo}),type:"text",placeholder:this.props.placeholder,autoFocus:!0,value:this.state.text,onBlur:this.handleBlur,onChange:this.handleChange,onKeyDown:this.handleSubmit})}}]),t}(r.Component),le=function(e){var t=e.addTodo;return o.a.createElement("header",{className:"header"},o.a.createElement("h1",null,"todos"),o.a.createElement(ce,{newTodo:!0,onSave:function(e){0!==e.length&&t(e)},placeholder:"What needs to be done?"}))},ue="ADD_TODO",de="DELETE_TODO",se="EDIT_TODO",me="COMPLETE_TODO",fe="COMPLETE_ALL_TODOS",pe="CLEAR_COMPLETED",he=function(e){return{type:ue,text:e}},ve=function(e){return{type:de,id:e}},ge=function(e,t){return{type:se,id:e,text:t}},Ee=function(e){return{type:me,id:e}},Se=function(){return{type:fe}},be=function(){return{type:pe}},Ie=function(e){return{type:"SET_VISIBILITY_FILTER",filter:e}},Oe=Object(l.connect)(null,{addTodo:he})(le),ye=n(47),Te=function(e){var t=e.active,n=e.children,a=e.setFilter;return o.a.createElement("a",{className:ie()({selected:t}),style:{cursor:"pointer"},onClick:function(){return a()}},n)},je=Object(l.connect)(function(e,t){return{active:t.filter===e.visibilityFilter}},function(e,t){return{setFilter:function(){e(Ie(t.filter))}}})(Te),we=(ae={},Object(ye.a)(ae,"show_all","All"),Object(ye.a)(ae,"show_active","Active"),Object(ye.a)(ae,"show_completed","Completed"),ae),xe=function(e){var t=e.activeCount,n=e.completedCount,a=e.onClearCompleted,r=1===t?"item":"items";return o.a.createElement("footer",{className:"footer"},o.a.createElement("span",{className:"todo-count"},o.a.createElement("strong",null,t||"No")," ",r," left"),o.a.createElement("ul",{className:"filters"},Object.keys(we).map(function(e){return o.a.createElement("li",{key:e},o.a.createElement(je,{filter:e},we[e]))})),!!n&&o.a.createElement("button",{className:"clear-completed",onClick:a},"Clear completed"))},ke=function(e){function t(){var e,n;Object(v.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(E.a)(this,(e=Object(S.a)(t)).call.apply(e,[this].concat(r)))).state={editing:!1},n.handleDoubleClick=function(){n.setState({editing:!0})},n.handleSave=function(e,t){0===t.length?n.props.deleteTodo(e):n.props.editTodo(e,t),n.setState({editing:!1})},n}return Object(b.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e,t=this,n=this.props,a=n.todo,r=n.completeTodo,i=n.deleteTodo;return e=this.state.editing?o.a.createElement(ce,{text:a.text,editing:this.state.editing,onSave:function(e){return t.handleSave(a.id,e)}}):o.a.createElement("div",{className:"view"},o.a.createElement("input",{className:"toggle",type:"checkbox",checked:a.completed,onChange:function(){return r(a.id)}}),o.a.createElement("label",{onDoubleClick:this.handleDoubleClick},a.text),o.a.createElement("button",{className:"destroy",onClick:function(){return i(a.id)}})),o.a.createElement("li",{className:ie()({completed:a.completed,editing:this.state.editing})},e)}}]),t}(r.Component),Ce=function(e){var t=e.filteredTodos,n=e.actions;return o.a.createElement("ul",{className:"todo-list"},t.map(function(e){return o.a.createElement(ke,Object.assign({key:e.id,todo:e},n))}))},_e=Object(l.connect)(function(e){return{filteredTodos:R(e)}},function(e){return{actions:Object(c.a)(a,e)}})(Ce),De=function(e){var t=e.todosCount,n=e.completedCount,a=e.actions;return o.a.createElement("section",{className:"main"},!!t&&o.a.createElement("span",null,o.a.createElement("input",{className:"toggle-all",type:"checkbox",checked:n===t,readOnly:!0}),o.a.createElement("label",{onClick:a.completeAllTodos})),o.a.createElement(_e,null),!!t&&o.a.createElement(xe,{completedCount:n,activeCount:t-n,onClearCompleted:a.clearCompleted}))},Le=Object(l.connect)(function(e){return{todosCount:e.todos.length,completedCount:z(e)}},function(e){return{actions:Object(c.a)(a,e)}})(De),Ae=function(){return o.a.createElement("div",null,o.a.createElement(Oe,null),o.a.createElement(Le,null))},Me=n(80),Fe=n(231),Ne=[{text:"Use Redux",completed:!1,id:0}];var Pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"show_all",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VISIBILITY_FILTER":return t.filter;default:return e}},Re=Object(c.b)({todos:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ue:return[].concat(Object(Fe.a)(e),[{id:e.reduce(function(e,t){return Math.max(t.id,e)},-1)+1,completed:!1,text:t.text}]);case de:return e.filter(function(e){return e.id!==t.id});case se:return e.map(function(e){return e.id===t.id?Object(Me.a)({},e,{text:t.text}):e});case me:return e.map(function(e){return e.id===t.id?Object(Me.a)({},e,{completed:!e.completed}):e});case fe:var n=e.every(function(e){return e.completed});return e.map(function(e){return Object(Me.a)({},e,{completed:!n})});case pe:return e.filter(function(e){return!1===e.completed});default:return e}},visibilityFilter:Pe}),ze=(n(541),Object(c.c)(Re,re.instrument()));Object(i.render)(o.a.createElement(l.Provider,{store:ze},o.a.createElement(o.a.Fragment,null,o.a.createElement(Ae,null),o.a.createElement(re,null))),document.getElementById("root"))}},[[287,1,2]]]);
//# sourceMappingURL=main.47d86621.chunk.js.map