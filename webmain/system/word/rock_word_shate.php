<?php if(!defined('HOST'))die('not access');?>
<script >
$(document).ready(function(){
	
	/*
	var at = $('#optionview_{rand}').bootstree({
		url:js.getajaxurl('getshatewordtype','word','system'),
		columns:[{
			text:'共享的文档类型',dataIndex:'name',align:'left',xtype:'treecolumn',width:'99%'
		}],
		itemdblclick:function(d){
			
		}
	});*/
	
	
	var a = $('#view_{rand}').bootstable({
		tablename:'word',modedir:'{mode}:{dir}',storebeforeaction:'shatebefore',fanye:true,
		columns:[{
			text:'类型',dataIndex:'fileext',renderer:function(v){
				var lxs = js.filelxext(v);
				return '<img src="web/images/fileicons/'+lxs+'.gif">';
			}
		},{
			text:'名称',dataIndex:'filename',editor:true,align:'left'
		},{
			text:'大小',dataIndex:'filesizecn',sortable:true
		},{
			text:'分类',dataIndex:'typename'
		},{
			text:'添加时间',dataIndex:'optdt',sortable:true
		},{
			text:'创建人',dataIndex:'optname',sortable:true
		},{
			text:'',dataIndex:'opt',renderer:function(v,d,oi){
				return '<a href="javascript:;" onclick="showvies{rand}('+oi+',0)">预览</a>&nbsp;<a href="javascript:;" onclick="showvies{rand}('+oi+',1)"><i class="icon-arrow-down"></i></a>';
			}
		}]
	});
	showvies{rand}=function(oi,lx){
		var d=a.getData(oi);
		if(lx==1){
			js.downshow(d.id)
		}else{
			if(js.isimg(d.fileext)){
				$.imgview({url:d.filepath,downbool:false});
			}else{
				openxiangs(d.filename,'?m=public&a=fileviewer&id='+d.id+'&wintype=max');
			}
		}
	}
	var c = {
		reload:function(){
			a.reload();
		},
		daochu:function(){
			a.exceldown(nowtabs.name);
		},
		changlx:function(o1,lx){
			$("button[id^='state{rand}']").removeClass('active');
			$('#state{rand}_'+lx+'').addClass('active');
			var as = ['all','wfx'];
			a.setparams({'atype':as[lx]},true);
		},
		search:function(){
			var s=get('key_{rand}').value;
			a.setparams({key:s},true);
		}
	};
	js.initbtn(c);
	$('#optionview_{rand}').css('height',''+(viewheight-24)+'px');
});
</script>







<table width="100%">
<tr valign="top">
<!--
<td width="220">
	<div style="border:1px #cccccc solid">
	  <div id="optionview_{rand}" style="height:400px;overflow:auto;"></div>
	</div>  
</td>
<td width="10"></td>-->
<td>	
	<div>
		<table width="100%">
		<tr>
		<td>
			<input class="form-control" style="width:180px" id="key_{rand}"   placeholder="文件名/创建人/分类">
		</td>
		<td style="padding-left:10px">
			<button class="btn btn-default" click="search" type="button">搜索</button> 
		</td>
		<td  width="90%" style="padding-left:10px">
			
			<div id="stewwews{rand}" class="btn-group">
			<button class="btn btn-default active" id="state{rand}_0" click="changlx,0" type="button">所有共享</button>
			<button class="btn btn-default" id="state{rand}_1" click="changlx,1" type="button">我共享的</button>
			</div>	
		</td>
		
		
		<td align="right" nowrap>
			<button class="btn btn-default" click="daochu,1" type="button">导出</button> 
		</td>
		</tr>
		</table>
		
	</div>
	<div class="blank10"></div>
	<div id="view_{rand}"></div>
</td>
</tr>
</table>