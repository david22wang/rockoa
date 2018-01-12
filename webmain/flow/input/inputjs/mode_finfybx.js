function initbodys(){
	$.getScript('js/rmb.js');
	form('applydt').readOnly=true;
	form('money').readOnly=true;
	form('moneycn').readOnly=true;
	$(form('money')).click(function(){
		cchangtongss();
	});
	$(form('moneycn')).click(function(){
		cchangtongss();
	});
	addchengesss();

	// 获取上次一次填写的资料，初始化录入界面
	if(mid=='0'){
		js.ajax(geturlact('getlast'),{},function(d){
			if(d){
				form('paytype').value=d.paytype;
				form('cardid').value=d.cardid;
				form('openbank').value=d.openbank;
				form('fullname').value=d.fullname;
			}
		},'get,json');
	}

    $(form('project')).change(function(){
        var val = this.value,txt='';
        listchange(val);
    });
}
function addchengesss(){
	if(isedit==0)return;
	$("[name^='sdt0_']").unbind('change').change(function(){
		cchangtongss();
	});
	$("[name^='name0_']").unbind('change').change(function(){
		cchangtongss();
	});
	$("[name^='money0_']").unbind('change').change(function(){
		cchangtongss();
	});
}
function changesubmit(){
	var jg = parseFloat(form('money').value);
	if(jg<=0)return '报销金额不能小于0';
}
function changesubmitbefore(){
	cchangtongss();
}
function eventaddsubrows(){
	cchangtongss();
	addchengesss();
}
function eventdelsubrows(){
	cchangtongss();
}

/*
   计算合计金额，并进行动态更新。
 */
function cchangtongss(){
	var d=c.getsubdata(0);
	var to=0,i,len=d.length;
	for(i=0;i<len;i++){
		if(d[i].name!=''){
			d[i].money = d[i].price * d[i].num;
			form('money0_'+i).value=d[i].money+'';
			to=to+parseFloat(d[i].money);
		}
	}
	form('money').value=js.float(to)+'';
	form('moneycn').value=AmountInWords(to)
}

//根据项目名称动态更新报销列表（合同清单）
function listchange(v){
    if(v==''){
        form('project').value='';
        return;
    }
    js.ajax(geturlact('listchange'),{ractid:v},function(a){
    	//首先删除子表
        var len=parseFloat(form('sub_totals0').value); //子表项数量
		for(j=0; j<len; ++j){
			nameNum = (len-j-1);
			if(nameNum > 0) {
                c.delrow(form('name0_' + nameNum + ''), 0);
            }
            form('name0_0').value="";
            form('unit0_0').value="";
            form('price0_0').value="0";
            form('custnums0_0').value="";
            form('boughtnums0_0').value="";
            form('num0_0').value="0";
            form('money0_0').value="0";
            form('sm0_0').value="";
		}
		len = 0;
        form('sub_totals0').value = 1;
    	if(a) {
    		//首先增加子表
            for (j = 0; j < a.length; ++j) {
            	if(j!=0 && j >= len)
            		c.addrow(this,0);
				form('name0_'+j).value=a[j].name;
				form('listid0_'+j).value=a[j].id;
				form('unit0_'+j).value=a[j].unit;
                form('price0_'+j).value=a[j].price;
                form('custnums0_'+j).value=a[j].num;
                form('boughtnums0_'+j).value=a[j].buynums;
                form('sm0_'+j).value=a[j].remark;
            }
        }
        form('sub_totals0').value = a.length+'';
    },'get,json');  // 通过调试，发现geturlact('listchange')返回的地址是：a=listchange&m=mode_finfybx|input&d=flow&ajaxbool=true&rnd=221203&ractid=8，a表示方法名，m表示模块，如果ajaxbool为true，那么调用的就是mode_finfybx中的listchangeAjax方法，ractid表示传递的参数，通过该方法对a进行了赋值。
}