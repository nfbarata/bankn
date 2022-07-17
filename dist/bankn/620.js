"use strict";(self.webpackChunkbankn=self.webpackChunkbankn||[]).push([[620],{5620:(Mt,P,l)=>{l.r(P),l.d(P,{TransactionModule:()=>It});var m=l(9808),a=l(2382),d=l(8086),g=l(9876),h=l(4666),I=l(2795),u=l(7818),t=l(1223),O=l(106),b=l(5177);function y(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div")(1,"div",8)(2,"input",9),t.NdJ("change",function(i){const c=t.CHM(e).$implicit;return t.oxw().onCheck(c,i)}),t.qZA(),t.TgZ(3,"label",10),t._uU(4),t.qZA()()()}if(2&o){const e=r.$implicit;t.xp6(2),t.s9C("id",e.id),t.Q6J("checked",e.selected),t.xp6(1),t.s9C("for",e.id),t.xp6(1),t.Oqu(e.name)}}let L=(()=>{class o{constructor(e,n){this.eventsService=e,this.accountService=n,this.items=[]}ngOnInit(){this.refreshAccounts(),this.eventsService.accountsChange.subscribe(()=>this.refreshAccounts()),this.eventsService.accountSelectionChange.subscribe(()=>this.refreshAccounts())}refreshAccounts(){for(var e=this.accountService.getAccounts();this.items.length>0;)this.items.pop();e.forEach(n=>{this.items.push({id:"asc"+n.id,account:n,name:n.name,selected:n.selected})})}onAccountsSelected(){Array.from(this.items).forEach(n=>{n.selected?this.accountService.selectAccount(n.account):this.accountService.unselectAccount(n.account)})}onCheck(e,n){e.selected=n.target.checked}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(O.n),t.Y36(g.B))},o.\u0275cmp=t.Xpm({type:o,selectors:[["account-select-card"]],decls:11,vars:1,consts:function(){let r,e;return r=$localize`No accounts selected`,e=$localize`Select accounts to see its transactions:`,[[1,"card"],[1,"card-body"],[1,"card-title"],r,[1,"card-text"],e,[4,"ngFor","ngForOf"],["i81n","",1,"btn","btn-primary","text-white",3,"click"],[1,"custom-control","custom-checkbox","my-1","mr-sm-2"],["type","checkbox",1,"custom-control-input",3,"id","checked","change"],[1,"custom-control-label",3,"for"]]},template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h5",2),t.SDv(3,3),t.qZA(),t.TgZ(4,"p",4),t.SDv(5,5),t.qZA(),t.TgZ(6,"form"),t.YNc(7,y,5,4,"div",6),t.qZA(),t._UZ(8,"br"),t.TgZ(9,"a",7),t.NdJ("click",function(){return n.onAccountsSelected()}),t._uU(10,"Ok"),t.qZA()()()),2&e&&(t.xp6(7),t.Q6J("ngForOf",n.items))},directives:[m.sg],styles:[""]}),o})();var $=l(6719),U=l(9080),x=l(8071),Z=l(3324);function Y(o,r){1&o&&(t.TgZ(0,"div",0)(1,"div",7),t._UZ(2,"account-create-card"),t.qZA()())}function G(o,r){1&o&&(t.TgZ(0,"div",0)(1,"div",7),t._UZ(2,"account-select-card"),t.qZA()())}function q(o,r){1&o&&(t.TgZ(0,"div",0)(1,"div",7),t._UZ(2,"transaction-create-card"),t.qZA(),t.TgZ(3,"div",8),t._uU(4," \xa0 "),t.qZA(),t.TgZ(5,"div",7),t._UZ(6,"transactions-import-card"),t.qZA()())}function F(o,r){if(1&o&&(t.TgZ(0,"div",13)(1,"label",14),t._uU(2),t.ALo(3,"date"),t.qZA(),t.TgZ(4,"label",15),t._uU(5),t.ALo(6,"dinero"),t.qZA()()),2&o){const e=t.oxw().$implicit;t.xp6(2),t.hij(" ",t.xi3(3,2,e.date,"shortDate")," "),t.xp6(3),t.hij(" ",t.lcZ(6,5,e.balanceAfter)," ")}}const J=function(o){return[o]};function k(o,r){if(1&o&&(t.TgZ(0,"div",16)(1,"label",17),t._uU(2),t.qZA(),t.TgZ(3,"label",18),t._uU(4),t.ALo(5,"transaction"),t.qZA()()),2&o){const e=t.oxw().$implicit;t.Q6J("routerLink",t.VKq(5,J,"/transactions/transaction/"+e.account.id+"/"+e.id)),t.xp6(2),t.hij(" ",e.description," "),t.xp6(2),t.hij(" ",t.lcZ(5,3,e)," ")}}function w(o,r){if(1&o&&(t.TgZ(0,"div",13)(1,"label",19),t.SDv(2,20),t.qZA(),t.TgZ(3,"label",18),t._uU(4),t.ALo(5,"dinero"),t.qZA()()),2&o){const e=t.oxw().$implicit;t.xp6(4),t.hij(" ",t.lcZ(5,1,e.balanceBefore)," ")}}function X(o,r){if(1&o&&(t.TgZ(0,"div"),t.YNc(1,F,7,7,"div",11),t.YNc(2,k,6,7,"div",12),t.YNc(3,w,6,3,"div",11),t.qZA()),2&o){const e=r.$implicit,n=r.index,i=t.oxw(2);t.xp6(1),t.Q6J("ngIf",1!=e.hide&&(0==n||n>0&&e.date.getTime()!=i.transactions[n-1].date.getTime())),t.xp6(1),t.Q6J("ngIf",1!=e.hide),t.xp6(1),t.Q6J("ngIf",n==i.transactions.length-1)}}function B(o,r){if(1&o&&(t.TgZ(0,"div",9),t.YNc(1,X,4,3,"div",10),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.transactions)}}const Q=function(){return["/transactions/transaction"]};let D=(()=>{class o{constructor(e,n,i,s){this.route=e,this.eventsService=n,this.accountService=i,this.transactionService=s,this.hasRealTransactions=!1,this.transactions=[],this.selectedAccounts=[],this.accounts=[]}ngOnInit(){this.refreshAccounts(),this.eventsService.accountSelectionChange.subscribe(()=>this.refreshData()),this.eventsService.accountsChange.subscribe(()=>this.refreshAccounts()),this.route.paramMap.subscribe(e=>{var n=e.get("accountId");null==n||0==n.trim().length||this.accounts.forEach(i=>{i.id==n?this.accountService.selectAccount(i):i.selected&&this.accountService.toggleAccount(i)})})}refreshData(){for(;this.transactions.length>0;)this.transactions.pop();this.hasRealTransactions=!1;var e=[];if(this.selectedAccounts=this.accountService.getSelectedAccounts(),this.selectedAccounts.length>0){this.selectedAccounts.forEach(i=>{e=e.concat(i.transactions),!this.hasRealTransactions&&i.transactions.length>0&&(this.hasRealTransactions=!0)});var n=g.B.getInitialValueMultiple(this.selectedAccounts);h.p.sortTransactions(e),this.applyBalanceToTransactions(e,n),this.transactions=e}}refreshAccounts(){this.accounts=this.accountService.getAccounts(),this.refreshData()}applyBalanceToTransactions(e,n){var i=I.m.toDinero(n.getCurrency(),n.toUnit());for(let s=e.length-1;s>=0;s--){switch(e[s].balanceBefore=i,e[s].type){case u.iU.CREDIT:i=i.add(e[s].amount);break;case u.iU.DEBIT:i=i.subtract(e[s].amount)}e[s].balanceAfter=i}}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(d.gz),t.Y36(O.n),t.Y36(g.B),t.Y36(h.p))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-transaction-list"]],decls:12,vars:7,consts:function(){let r,e;return r=$localize`Transactions`,e=$localize` Initial value `,[[1,"row"],[1,"col-6"],r,[1,"col-6","text-right"],["type","submit",1,"btn","btn-primary",3,"routerLink","disabled"],["class","row",4,"ngIf"],["class","container",4,"ngIf"],[1,"col-sm-5"],[1,"col-sm-2"],[1,"container"],[4,"ngFor","ngForOf"],["class","row bg-secondary text-white",4,"ngIf"],["class","row overflow-hidden","style","height:30px",3,"routerLink",4,"ngIf"],[1,"row","bg-secondary","text-white"],[1,"col-2"],[1,"col-10","text-right"],[1,"row","overflow-hidden",2,"height","30px",3,"routerLink"],[1,"col-7"],[1,"col-5","text-right"],[1,"col-7","text-right"],e]},template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h2"),t.SDv(3,2),t.qZA()(),t.TgZ(4,"div",3)(5,"button",4),t._uU(6," New "),t.qZA()()(),t._UZ(7,"br"),t.YNc(8,Y,3,0,"div",5),t.YNc(9,G,3,0,"div",5),t.YNc(10,q,7,0,"div",5),t.YNc(11,B,2,1,"div",6)),2&e&&(t.xp6(5),t.Q6J("routerLink",t.DdM(6,Q))("disabled",0==n.accounts.length),t.xp6(3),t.Q6J("ngIf",0==n.accounts.length),t.xp6(1),t.Q6J("ngIf",n.accounts.length>0&&0==n.selectedAccounts.length),t.xp6(1),t.Q6J("ngIf",n.accounts.length>0&&n.selectedAccounts.length>0&&!n.hasRealTransactions),t.xp6(1),t.Q6J("ngIf",n.hasRealTransactions))},directives:[d.rH,m.O5,b.x,L,$._,U.G,m.sg],pipes:[m.uU,x.L,Z.M],styles:[""]}),o})();var M=l(1930);const z=["importData"],H=["columnSeparator"],j=["lineSeparator"],V=["customColumnSeparator"],K=["customLineSeparator"],W=["parsedData"],tt=["submitHelpBlock"];let et=(()=>{class o{constructor(e,n,i,s,c,T,N,p,A){this.renderer=e,this.eventsService=n,this.banknService=i,this.accountService=s,this.transactionService=c,this.formBuilder=T,this.route=N,this.router=p,this.location=A,this.submitDisabled=!0,this.accountId=null,this.formData={importData:null,columnSeparator:"9",lineSeparator:"10",customColumnSeparator:"",customLineSeparator:""},this.form=this.formBuilder.group(this.formData)}ngAfterViewInit(){}ngOnInit(){this.transactionService.importTransactions=[],this.route.paramMap.subscribe(e=>{this.accountId=e.get("accountId")})}onSubmit(e){this.transactionService.importTransactions=this.output,this.form.reset(),this.router.navigate(["/transactions/import-filter/"+this.accountId])}setMessage(e){this.renderer.setProperty(this.submitHelpBlock.nativeElement,"innerHTML",e)}onInputChange(){var e,n;if(this.clearTable(),this.submitDisabled=!0,""==this.lineSeparator.nativeElement.value){if(0==(e=this.customLineSeparator.nativeElement.value).trim().length)return void this.setMessage("Insert some value at row separator")}else e=String.fromCharCode(this.lineSeparator.nativeElement.value);if(""==this.columnSeparator.nativeElement.value){if(0==(n=this.customColumnSeparator.nativeElement.value).trim().length)return void this.setMessage("Insert some value at column separator")}else n=String.fromCharCode(this.columnSeparator.nativeElement.value);try{var i=this.transactionService.parse(this.importData.nativeElement.value,e,n);this.setMessage("Check the data below before import"),this.fillTable(i),this.submitDisabled=!1}catch(s){this.setMessage(s)}}clearTable(){this.output=null,this.renderer.setProperty(this.parsedData.nativeElement,"innerHTML","")}fillTable(e){this.output=e,e.forEach(n=>{var i=this.renderer.createElement("tr");this.renderer.appendChild(this.parsedData.nativeElement,i),n.forEach(s=>{var c=this.renderer.createElement("td");this.renderer.appendChild(i,c),this.renderer.setProperty(c,"innerHTML",s)})})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.Qsj),t.Y36(O.n),t.Y36(M.D),t.Y36(g.B),t.Y36(h.p),t.Y36(a.qu),t.Y36(d.gz),t.Y36(d.F0),t.Y36(m.Ye))},o.\u0275cmp=t.Xpm({type:o,selectors:[["transaction-import"]],viewQuery:function(e,n){if(1&e&&(t.Gf(z,5),t.Gf(H,5),t.Gf(j,5),t.Gf(V,5),t.Gf(K,5),t.Gf(W,5),t.Gf(tt,5)),2&e){let i;t.iGM(i=t.CRH())&&(n.importData=i.first),t.iGM(i=t.CRH())&&(n.columnSeparator=i.first),t.iGM(i=t.CRH())&&(n.lineSeparator=i.first),t.iGM(i=t.CRH())&&(n.customColumnSeparator=i.first),t.iGM(i=t.CRH())&&(n.customLineSeparator=i.first),t.iGM(i=t.CRH())&&(n.parsedData=i.first),t.iGM(i=t.CRH())&&(n.submitHelpBlock=i.first)}},decls:59,vars:4,consts:function(){let r,e,n;return r=$localize` External transactions: `,e=$localize`Copy paste data from your homebanking`,n=$localize`Import`,[[1,"container",3,"formGroup","ngSubmit"],[1,"row"],["mwlTextInputHighlightContainer","",1,"col-12","form-group"],["for","importData"],r,["formControlName","importData","id","importData","wrap","off","rows","6",1,"form-control",3,"keyup","paste"],["importData",""],["id","importDataHelpBlock",1,"form-text","text-muted"],e,[1,"col-6","form-group"],["title","columnSeparator","formControlName","columnSeparator",1,"form-control",3,"change"],["columnSeparator",""],["value","9"],["value","44"],["value","59"],["value","32"],["value",""],["title","lineSeparator","formControlName","lineSeparator",1,"form-control",3,"change"],["lineSeparator",""],["value","10"],["title","customColumnSeparator","formControlName","customColumnSeparator",1,"form-control",3,"hidden","keyup","paste"],["customColumnSeparator",""],["id","customColumnSeparatorHelpBlock",1,"form-text","text-muted",3,"change"],["title","customLineSeparator","formControlName","customLineSeparator",1,"form-control",3,"hidden","keyup","paste"],["customLineSeparator",""],["id","lineSeparatorHelpBlock",1,"form-text","text-muted",3,"change"],[1,"col-12"],["type","submit",1,"btn","btn-primary",3,"disabled"],n,["id","submitHelpBlock",1,"form-text","text-muted"],["submitHelpBlock",""],[1,"table-responsive-xl"],[1,"table","table-sm","table-bordered","small","font-weight-lighter","text-truncate"],["id","parsedData"],["parsedData",""]]},template:function(e,n){if(1&e&&(t.TgZ(0,"h2"),t._uU(1,"Import transactions"),t.qZA(),t._UZ(2,"br"),t.TgZ(3,"form",0),t.NdJ("ngSubmit",function(){return n.onSubmit(n.form.value)}),t.TgZ(4,"div",1)(5,"div",2)(6,"label",3),t.SDv(7,4),t.qZA(),t._UZ(8,"br"),t.TgZ(9,"textarea",5,6),t.NdJ("keyup",function(){return n.onInputChange()})("paste",function(){return n.onInputChange()}),t.qZA(),t.TgZ(11,"small",7),t.SDv(12,8),t.qZA()()(),t.TgZ(13,"div",1)(14,"div",9)(15,"select",10,11),t.NdJ("change",function(){return n.onInputChange()}),t.TgZ(17,"option",12),t._uU(18,"tab"),t.qZA(),t.TgZ(19,"option",13),t._uU(20,"comma"),t.qZA(),t.TgZ(21,"option",14),t._uU(22,"semicolon"),t.qZA(),t.TgZ(23,"option",15),t._uU(24,"space"),t.qZA(),t.TgZ(25,"option",16),t._uU(26,"custom"),t.qZA()()(),t.TgZ(27,"div",9)(28,"select",17,18),t.NdJ("change",function(){return n.onInputChange()}),t.TgZ(30,"option",19),t._uU(31,"\\n"),t.qZA(),t.TgZ(32,"option",16),t._uU(33,"custom"),t.qZA()()()(),t.TgZ(34,"div",1)(35,"div",9)(36,"input",20,21),t.NdJ("keyup",function(){return n.onInputChange()})("paste",function(){return n.onInputChange()}),t.qZA(),t.TgZ(38,"small",22),t.NdJ("change",function(){return n.onInputChange()}),t._uU(39,"Column separator"),t.qZA()(),t.TgZ(40,"div",9)(41,"input",23,24),t.NdJ("keyup",function(){return n.onInputChange()})("paste",function(){return n.onInputChange()}),t.qZA(),t.TgZ(43,"small",25),t.NdJ("change",function(){return n.onInputChange()}),t._uU(44,"Row separator"),t.qZA()()(),t.TgZ(45,"div",1)(46,"div",26)(47,"button",27),t.SDv(48,28),t.qZA(),t.TgZ(49,"small",29,30),t._uU(51,"Enter some text to import"),t.qZA()()()(),t._UZ(52,"br"),t.TgZ(53,"div",1)(54,"div",26)(55,"div",31)(56,"table",32),t._UZ(57,"tbody",33,34),t.qZA()()()()),2&e){const i=t.MAs(16),s=t.MAs(29);t.xp6(3),t.Q6J("formGroup",n.form),t.xp6(33),t.Q6J("hidden",""!=i.value),t.xp6(5),t.Q6J("hidden",""!=s.value),t.xp6(6),t.Q6J("disabled",n.submitDisabled)}},directives:[a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u,a.EJ,a.YN,a.Kr],styles:[""]}),o})();var nt=l(673),ot=l(5081),it=l(3981);const rt=["submitHelpBlock"];function at(o,r){if(1&o&&(t.TgZ(0,"option",14),t._uU(1),t.ALo(2,"importColumnType"),t.qZA()),2&o){const e=r.$implicit;t.s9C("value",e),t.xp6(1),t.Oqu(t.lcZ(2,2,e))}}function st(o,r){if(1&o&&(t.TgZ(0,"th")(1,"select",12),t.YNc(2,at,3,4,"option",13),t.qZA()()),2&o){const e=r.index,n=t.oxw();t.xp6(1),t.MGl("id","action",e,""),t.xp6(1),t.Q6J("ngForOf",n.importColumnTypes)}}function ct(o,r){if(1&o&&(t.TgZ(0,"td"),t._uU(1),t.qZA()),2&o){const e=r.$implicit;t.xp6(1),t.hij(" ",e," ")}}function lt(o,r){if(1&o&&(t.TgZ(0,"tr")(1,"td")(2,"div",15),t._UZ(3,"input",16)(4,"label",17),t.qZA()(),t.YNc(5,ct,2,1,"td",7),t.qZA()),2&o){const e=r.$implicit,n=r.index;t.xp6(3),t.MGl("id","dontIgnore",n,""),t.xp6(1),t.MGl("for","dontIgnore",n,""),t.xp6(1),t.Q6J("ngForOf",e)}}const _t=function(){return[]};let Tt=(()=>{class o{constructor(e,n,i,s,c,T,N,p,A,C){this.renderer=e,this.eventsService=n,this.banknService=i,this.accountService=s,this.transactionService=c,this.formBuilder=T,this.route=N,this.router=p,this.location=A,this.importColumnTypes=Object.values(u.S_),this.account=null,this.transactions=null,this.submitDisabled=!1,this.document=C,this.formData={importData:null},this.form=this.formBuilder.group(this.formData)}ngAfterViewInit(){}ngOnInit(){this.account=null,this.transactions=this.transactionService.importTransactions,this.route.paramMap.subscribe(e=>{var n=e.get("accountId");null==n?this.router.navigate([""]):(this.account=this.accountService.getAccount(n),null==this.account?this.router.navigate([""]):(null==this.transactions||0==this.transactions.length)&&(alert("No transactions to import"),this.router.navigate(["/transactions/import/"+this.account.id])))})}getDate(e){return(e=e.replace("/","-")).split("-")}getNumber(e){return Number(e.replace(",","."))}getYear(e){return 4==e.length?e:e>80?"19"+e:"20"+e}onSubmit(e){if(null!=this.account&&null!=this.transactions&&this.transactions.length>0){this.transactionService.filterActions=[];var n=this.transactions[0];n.forEach((i,s)=>{var c=this.document.getElementById("action"+s);null!=c&&this.transactionService.filterActions.push(c.value)}),this.transactionService.filterTransactions=[];try{this.transactions.forEach((i,s)=>{var c=this.document.getElementById("dontIgnore"+s);if(null!=this.account&&c.checked){var T=null,N=null,p=null,A=u.iU.CREDIT;if(n.forEach((R,S)=>{var _=i[S];switch(this.transactionService.filterActions[S]){case u.S_.IGNORE:break;case u.S_.DESCRIPTION:p=_;break;case u.S_.DATE_DMY:_=this.getDate(_),N=new Date(this.getYear(_[2]),_[1]-1,_[0]);break;case u.S_.DATE_MDY:_=this.getDate(_),N=new Date(this.getYear(_[2]),_[0]-1,_[1]);break;case u.S_.DATE_YMD:_=this.getDate(_),N=new Date(this.getYear(_[0]),_[1]-1,_[2]);break;case u.S_.AMOUNT:_.includes("-")&&(_=_.replace("-",""),A=u.iU.DEBIT),T=this.getNumber(_);break;case u.S_.CREDIT:T=this.getNumber(_);break;case u.S_.DEBIT:T=this.getNumber(_),A=u.iU.DEBIT;break;case u.S_.SIGN:"-"==_.trim()&&(A=u.iU.DEBIT)}}),null==T||null==N||null==p)throw new Error("There should be at least a column for amount, date and description");var C=this.banknService.getCategoryFromDescriptionPattern(p),f=this.banknService.getEntityFromDescriptionPattern(p,C);this.transactionService.filterTransactions.push(new nt.Y(ot.h.UUID(),I.m.toDineroFromAccount(T,this.account),A,N,null==f?void 0:f,null==C?void 0:C,"",p,this.account))}})}catch(i){return void this.setMessage(i)}this.form.reset(),this.router.navigate(["/transactions/import-edit/"+this.account.id])}}setMessage(e){this.renderer.setProperty(this.submitHelpBlock.nativeElement,"innerHTML",e)}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.Qsj),t.Y36(O.n),t.Y36(M.D),t.Y36(g.B),t.Y36(h.p),t.Y36(a.qu),t.Y36(d.gz),t.Y36(d.F0),t.Y36(m.Ye),t.Y36(m.K0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-transaction-import-filter"]],viewQuery:function(e,n){if(1&e&&t.Gf(rt,5),2&e){let i;t.iGM(i=t.CRH())&&(n.submitHelpBlock=i.first)}},decls:23,vars:5,consts:function(){let r;return r=$localize`Filter`,[[3,"formGroup","ngSubmit"],[1,"row"],[1,"col-12"],[1,"table-responsive-xl"],[1,"table","table-sm","table-bordered","small","font-weight-lighter","text-truncate"],["id","parsedData"],[1,"align-middle"],[4,"ngFor","ngForOf"],["type","submit",1,"btn","btn-primary",3,"disabled"],r,["id","submitHelpBlock",1,"form-text","text-muted"],["submitHelpBlock",""],["title","columnType",1,"form-select",3,"id"],["class","w-auto",3,"value",4,"ngFor","ngForOf"],[1,"w-auto",3,"value"],[1,"custom-control","custom-checkbox","text-center"],["title","ignore","type","checkbox","checked","",1,"custom-control-input",3,"id"],[1,"custom-control-label",3,"for"]]},template:function(e,n){1&e&&(t.TgZ(0,"h2"),t._uU(1,"Filter transactions"),t.qZA(),t._UZ(2,"br"),t.TgZ(3,"form",0),t.NdJ("ngSubmit",function(){return n.onSubmit(n.form.value)}),t.TgZ(4,"div",1)(5,"div",2)(6,"div",3)(7,"table",4)(8,"tbody",5)(9,"tr")(10,"th",6),t._uU(11," Import? "),t.qZA(),t.YNc(12,st,3,2,"th",7),t.qZA(),t.YNc(13,lt,6,3,"tr",7),t.qZA()()()()(),t._UZ(14,"br"),t.TgZ(15,"div",1)(16,"div",2)(17,"button",8),t.SDv(18,9),t.qZA(),t.TgZ(19,"small",10,11),t._uU(21,"Classify each relevant column"),t.qZA()()()(),t._UZ(22,"br")),2&e&&(t.xp6(3),t.Q6J("formGroup",n.form),t.xp6(9),t.Q6J("ngForOf",null==n.transactions||0==n.transactions.length?t.DdM(4,_t):n.transactions[0]),t.xp6(1),t.Q6J("ngForOf",n.transactions),t.xp6(4),t.Q6J("disabled",n.submitDisabled))},directives:[a._Y,a.JL,a.sg,m.sg,a.YN,a.Kr],pipes:[it.P],styles:[""]}),o})();var ut=l(7106);function Nt(o,r){if(1&o&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.ALo(3,"date"),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.ALo(8,"category"),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.ALo(13,"transaction"),t.qZA()()),2&o){const e=r.$implicit;t.xp6(2),t.hij(" ",t.xi3(3,5,e.date,"shortDate")," "),t.xp6(3),t.hij(" ",null==e.entity?"":e.entity.name," "),t.xp6(2),t.hij(" ",null==e.category?"":t.lcZ(8,8,e.category)," "),t.xp6(3),t.hij(" ",e.description," "),t.xp6(2),t.hij(" ",t.lcZ(13,10,e)," ")}}let pt=(()=>{class o{constructor(e,n,i,s,c,T,N,p,A){this.renderer=e,this.eventsService=n,this.banknService=i,this.accountService=s,this.transactionService=c,this.formBuilder=T,this.route=N,this.router=p,this.location=A,this.account=null,this.transactions=null,this.submitDisabled=!1,this.formData={importData:null},this.form=this.formBuilder.group(this.formData)}ngOnInit(){this.account=null,this.transactions=this.transactionService.filterTransactions,this.route.paramMap.subscribe(e=>{var n=e.get("accountId");null!=n&&(this.account=this.accountService.getAccount(n),null==this.account?this.router.navigate([""]):(null==this.transactions||0==this.transactions.length)&&(alert("No transactions to edit"),this.router.navigate(["/transactions/import/"+this.account.id])))})}onSubmit(e){null!=this.account&&null!=this.transactions?(this.transactions.forEach(n=>{null!=this.account&&this.transactionService.createTransaction(this.account,n.amount,n.date,n.type,null==n.entity?"":n.entity.name,null==n.category?"":n.category.name,n.receiptReference,n.description)}),this.form.reset(),this.accountService.selectAccount(this.account),this.router.navigate(["/transactions/"+this.account.id])):(console.error("No account selected"),this.router.navigate(["/accounts"]))}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.Qsj),t.Y36(O.n),t.Y36(M.D),t.Y36(g.B),t.Y36(h.p),t.Y36(a.qu),t.Y36(d.gz),t.Y36(d.F0),t.Y36(m.Ye))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-transaction-import-edit"]],decls:23,vars:3,consts:function(){let r,e,n,i;return r=$localize` Date `,e=$localize` Description `,n=$localize` Amount `,i=$localize` Import `,[[3,"formGroup","ngSubmit"],[1,"row"],[1,"col-12"],[1,"table-responsive-xl"],[1,"table","table-sm","table-bordered","small","font-weight-lighter","text-truncate"],["id","parsedData"],r,e,n,[4,"ngFor","ngForOf"],["type","submit",1,"btn","btn-primary",3,"disabled"],i]},template:function(e,n){1&e&&(t.TgZ(0,"h2"),t._uU(1,"Edit transactions"),t.qZA(),t._UZ(2,"br"),t.TgZ(3,"form",0),t.NdJ("ngSubmit",function(){return n.onSubmit(n.form.value)}),t.TgZ(4,"div",1)(5,"div",2)(6,"div",3)(7,"table",4)(8,"tbody",5)(9,"tr")(10,"th"),t.SDv(11,6),t.qZA(),t.TgZ(12,"th"),t.SDv(13,7),t.qZA(),t.TgZ(14,"th"),t.SDv(15,8),t.qZA()(),t.YNc(16,Nt,14,12,"tr",9),t.qZA()()()()(),t._UZ(17,"br"),t.TgZ(18,"div",1)(19,"div",2)(20,"button",10),t.SDv(21,11),t.qZA()()()(),t._UZ(22,"br")),2&e&&(t.xp6(3),t.Q6J("formGroup",n.form),t.xp6(13),t.Q6J("ngForOf",n.transactions),t.xp6(4),t.Q6J("disabled",n.submitDisabled))},directives:[a._Y,a.JL,a.sg,m.sg],pipes:[m.uU,ut.y,Z.M],styles:[""]}),o})();var mt=l(8529);function St(o,r){if(1&o&&(t.TgZ(0,"option",36),t._uU(1),t.ALo(2,"transactionType"),t.qZA()),2&o){const e=r.$implicit,n=t.oxw();t.Q6J("selected",n.form.value.type==e)("value",e),t.xp6(1),t.Oqu(t.lcZ(2,3,e))}}function At(o,r){if(1&o&&(t.TgZ(0,"option",36),t._uU(1),t.qZA()),2&o){const e=r.$implicit,n=t.oxw();t.Q6J("selected",e.id==n.form.value.accountId)("value",e.id),t.xp6(1),t.Oqu(e.name)}}function dt(o,r){if(1&o&&(t.TgZ(0,"option",37),t._uU(1),t.qZA()),2&o){const e=r.$implicit;t.Q6J("value",e.name),t.xp6(1),t.Oqu(e.name)}}function Ct(o,r){if(1&o&&(t.TgZ(0,"option",37),t._uU(1),t.qZA()),2&o){const e=r.$implicit;t.Q6J("value",e.name),t.xp6(1),t.Oqu(e.name)}}function gt(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"a",38),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return i.onDelete(i.form.value.accountId,i.form.value.id)}),t.SDv(1,39),t.qZA()}}const E=function(){return[]};let v=(()=>{class o{constructor(e,n,i,s,c,T,N,p){this.eventsService=e,this.banknService=n,this.accountService=i,this.transactionService=s,this.formBuilder=c,this.route=T,this.router=N,this.location=p,this.transactionTypes=Object.values(u.iU),this.form=new a.cw({accountId:new a.NI(null),id:new a.NI(null),amount:new a.NI,day:new a.NI,month:new a.NI,year:new a.NI,type:new a.NI,entity:new a.NI,category:new a.NI,receiptReference:new a.NI,description:new a.NI}),this.accounts=null,this.entities=null,this.categories=null,this.transaction=null}ngOnInit(){this.refreshAccounts(),this.eventsService.accountsChange.subscribe(()=>this.refreshAccounts()),this.refreshEntities(),this.refreshCategories(),this.route.paramMap.subscribe(e=>{if(null!=this.accounts){var n,i=e.get("accountId");if(null==i||0==i.trim().length){var s=this.accountService.getSelectedAccounts();n=s.length>0?s[0]:this.accounts[0]}else n=this.accountService.getAccount(i);if(null!=n){var c=e.get("transactionId");if(null==c||0==c.trim().length){var T=new Date;this.form.setValue({accountId:n.id,id:null,amount:0,day:T.getDate(),month:T.getMonth()+1,year:T.getFullYear(),type:u.iU.DEBIT.toString(),entity:"",category:"",receiptReference:"",description:""})}else this.transaction=this.transactionService.getTransaction(n,c),null!=this.transaction?this.form.setValue({accountId:n.id,id:c,amount:this.transaction.amount.toUnit(),day:this.transaction.date.getDate(),month:this.transaction.date.getMonth()+1,year:this.transaction.date.getFullYear(),type:this.transaction.type.toString(),entity:this.transaction.entity,category:this.transaction.category,receiptReference:this.transaction.receiptReference,description:this.transaction.description}):(console.error("No transaction with that id"),this.router.navigate(["/transactions"]))}else console.error("No account with that id"),this.router.navigate(["/accounts"])}})}refreshAccounts(){this.accounts=this.accountService.getAccounts()}refreshEntities(){this.entities=this.banknService.getBankn().entities}refreshCategories(){this.categories=this.banknService.getBankn().categories}onSubmit(){var e=this.accountService.getAccount(this.form.controls.accountId.value);if(null!=e){var n=I.m.toDinero(I.m.getCurrency(e),this.form.controls.amount.value),i=new Date(0);i.setFullYear(this.form.controls.year.value,this.form.controls.month.value-1,this.form.controls.day.value),null==this.form.controls.id.value?this.transactionService.createTransaction(e,n,i,this.form.controls.type.value,this.form.controls.entity.value,this.form.controls.category.value,this.form.controls.receiptReference.value,this.form.controls.description.value):null!=this.transaction&&this.transactionService.updateTransaction(e,this.transaction,n,i,this.form.controls.type.value,this.form.controls.entity.value,this.form.controls.category.value,this.form.controls.receiptReference.value,this.form.controls.description.value),this.form.reset(),this.router.navigate(["/transactions"])}else alert("Error, try again.")}onDelete(e,n){this.transactionService.deleteTransactionId(e,n),this.location.back()}onCancel(){this.location.back()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(O.n),t.Y36(M.D),t.Y36(g.B),t.Y36(h.p),t.Y36(a.qu),t.Y36(d.gz),t.Y36(d.F0),t.Y36(m.Ye))},o.\u0275cmp=t.Xpm({type:o,selectors:[["transaction"]],decls:68,vars:11,consts:function(){let r,e,n,i,s,c,T,N,p,A,C,f,R;return r=$localize`Type`,e=$localize`Amount`,n=$localize`Account`,i=$localize`Date`,s=$localize`Entity`,c=$localize`Edit`,T=$localize`Category`,N=$localize`Edit`,p=$localize`Receipt #`,A=$localize`Description`,C=$localize`${"\ufffd0\ufffd"}:INTERPOLATION:`,f=$localize`Cancel`,R=$localize`Delete`,[[1,"container",3,"formGroup","ngSubmit"],[1,"row"],[1,"col-sm-6","form-group"],[1,"input-group"],[1,"input-group-text"],r,["title","type","formControlName","type",1,"form-select"],[3,"selected","value",4,"ngFor","ngForOf"],e,["title","amount","id","amount","type","text","formControlName","amount",1,"form-control"],n,["title","account","formControlName","accountId",1,"form-select"],i,["type","text","aria-label","day","formControlName","day","id","day",1,"form-control"],["type","text","aria-label","month","formControlName","month","id","month",1,"form-control"],["type","text","aria-label","year","formControlName","year","id","year",1,"form-control"],s,["type","text","id","entity","list","entityList","formControlName","entity",1,"form-select"],["id","entityList"],[3,"value",4,"ngFor","ngForOf"],["type","button",1,"btn","btn-outline-secondary"],c,T,["type","text","id","category","list","categoryList","formControlName","category",1,"form-select"],["id","categoryList"],N,p,["type","text","id","receiptReference","formControlName","receiptReference",1,"form-control"],[1,"col-sm-12","col-12","form-group"],A,["id","description","formControlName","description",1,"form-control"],["type","submit",1,"btn","btn-primary"],C,["class","btn btn-danger text-white","role","button",3,"click",4,"ngIf"],[1,"btn","btn-primary",3,"click"],f,[3,"selected","value"],[3,"value"],["role","button",1,"btn","btn-danger","text-white",3,"click"],R]},template:function(e,n){1&e&&(t.TgZ(0,"h2"),t._uU(1),t.qZA(),t._UZ(2,"br"),t.TgZ(3,"form",0),t.NdJ("ngSubmit",function(){return n.onSubmit()}),t.TgZ(4,"div",1)(5,"div",2)(6,"div",3)(7,"span",4),t.SDv(8,5),t.qZA(),t.TgZ(9,"select",6),t.YNc(10,St,3,5,"option",7),t.qZA()()(),t.TgZ(11,"div",2)(12,"div",3)(13,"span",4),t.SDv(14,8),t.qZA(),t._UZ(15,"input",9),t.qZA()()(),t.TgZ(16,"div",1)(17,"div",2)(18,"div",3)(19,"span",4),t.SDv(20,10),t.qZA(),t.TgZ(21,"select",11),t.YNc(22,At,2,3,"option",7),t.qZA()()(),t.TgZ(23,"div",2)(24,"div",3)(25,"span",4),t.SDv(26,12),t.qZA(),t._UZ(27,"input",13)(28,"input",14)(29,"input",15),t.qZA()()(),t.TgZ(30,"div",1)(31,"div",2)(32,"div",3)(33,"span",4),t.SDv(34,16),t.qZA(),t._UZ(35,"input",17),t.TgZ(36,"datalist",18),t.YNc(37,dt,2,2,"option",19),t.qZA(),t.TgZ(38,"button",20),t.SDv(39,21),t.qZA()()(),t.TgZ(40,"div",2)(41,"div",3)(42,"span",4),t.SDv(43,22),t.qZA(),t._UZ(44,"input",23),t.TgZ(45,"datalist",24),t.YNc(46,Ct,2,2,"option",19),t.qZA(),t.TgZ(47,"button",20),t.SDv(48,25),t.qZA()()()(),t.TgZ(49,"div",1)(50,"div",2)(51,"div",3)(52,"span",4),t.SDv(53,26),t.qZA(),t._UZ(54,"input",27),t.qZA()()(),t.TgZ(55,"div",1)(56,"div",28)(57,"div",3)(58,"span",4),t.SDv(59,29),t.qZA(),t._UZ(60,"textarea",30),t.qZA()()(),t.TgZ(61,"button",31),t.SDv(62,32),t.qZA(),t._uU(63," \xa0 "),t.YNc(64,gt,2,0,"a",33),t._uU(65," \xa0 "),t.TgZ(66,"button",34),t.NdJ("click",function(){return n.onCancel()}),t.SDv(67,35),t.qZA()()),2&e&&(t.xp6(1),t.Oqu(null==n.form.value.id?"Create Transaction":"Edit Transaction"),t.xp6(2),t.Q6J("formGroup",n.form),t.xp6(7),t.Q6J("ngForOf",n.transactionTypes),t.xp6(12),t.Q6J("ngForOf",null==n.accounts?t.DdM(8,E):n.accounts),t.xp6(15),t.Q6J("ngForOf",null==n.entities?t.DdM(9,E):n.entities),t.xp6(9),t.Q6J("ngForOf",null==n.categories?t.DdM(10,E):n.categories),t.xp6(16),t.pQV(null==n.form.value.id?"Create":"Ok"),t.QtT(62),t.xp6(2),t.Q6J("ngIf",null!=n.form.value.id))},directives:[a._Y,a.JL,a.sg,a.EJ,a.JJ,a.u,m.sg,a.YN,a.Kr,a.Fj,m.O5],pipes:[mt.b],styles:[""]}),o})();const ht=[{path:"",component:D},{path:"transaction",component:v},{path:":accountId",component:D},{path:"transaction/:accountId",component:v},{path:"transaction/:accountId/:transactionId",component:v},{path:"import/:accountId",component:et},{path:"import-filter/:accountId",component:Tt},{path:"import-edit/:accountId",component:pt}];let Ot=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[d.Bz.forChild(ht)],d.Bz]}),o})();var ft=l(2271);let It=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[m.ez,a.u5,a.UX,Ot,ft.m]]}),o})()}}]);