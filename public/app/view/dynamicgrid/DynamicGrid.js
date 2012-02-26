Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.grid', 'ext/examples/ux/grid');
Ext.define('LSP.view.dynamicgrid.DynamicGrid', {
    extend: 'Ext.grid.Panel',  
    alias: 'widget.dynamicgrid2',
    requires: [
		'Ext.grid.RowNumberer',
		'Ext.form.*',
		'Ext.ux.grid.FiltersFeature',
		'LSP.view.dynamicgrid.feature.selectable'
	   ],
	  //forceFit: true,
    autoScroll: true,
    layout: 'fit',
    gridBaseTitle: '',
    limit: 100,
    initComponent: function(){
        
        // initializing features for the grid
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
        groupHeaderTpl: 'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
        });        
        var filters = {
        ftype: 'filters',
        // encode and local configuration options defined previously for easier reuse
        encode: true, // json encode the filter query
        local: true   // defaults to false (remote filtering)
        };
        // this feature allows for selection of text in the grid by changing the underlaying style for the cell
        var cellTextSelector = {
          ftype: 'selectable', 
          id: 'selectable'
        };  
        
        var config = {
            tbar : [
                      {
            					xtype: 'exporterbutton',
            					name: 'exporter-button',
            					text: 'Download to Excel'
                      }
                    ],
            store: {
                fields: [],
                proxy: {
                    type: 'ajax',
                    api: {
                        read: ''
                    },
                    reader: {
                        type: 'json',
                        root: 'objects',
                        totalProperty: 'totalCount'
                    }
                }
            }, 
            columns:[{name: 'temp', hidden:true}],  
            rowNumberer: true,
            defaultWidth : 200,
            features: [groupingFeature, filters, cellTextSelector]
        };
          
        Ext.apply(this, config);  
        Ext.apply(this.initialConfig, config);
        this.callParent(arguments);
    },  
    storeLoad: function() {
        if(typeof(this.store.proxy.reader.jsonData.columns) === 'object') {  
            var columns = [];
            //console.log(this);
            if(this.rowNumberer) { columns.push(Ext.create('Ext.grid.RowNumberer',{width:40})); }  
            Ext.each(this.store.proxy.reader.jsonData.columns, function(column){
                columns.push(column);  
            });
            //console.log(columns);
            //console.log(this);
            if (typeof(title) == "undefined") {
     	        var title = this.title;
            }			
            if (this.store.proxy.reader.jsonData.totalCount > 0){
                    this.setTitle(this.gridBaseTitle + ' - Records found: ' +  this.store.proxy.reader.jsonData.totalCount);
            }
            else {
                     this.setTitle(this.gridBaseTitle + ' - Records found: ' +  'No records found!');
            }
    //            console.log(this);
    //              console.log(this.views);
                         this.reconfigure(this.store, columns);
                 this.setHeight('80%');       
                    }  
    },  
    onRender: function(ct, position) {
        LSP.view.dynamicgrid.Grid.superclass.onRender.call(this, ct, position);  
        this.store.on('load', this.storeLoad, this);
	    /*this.store.proxy.api.read = 'users.json';
        this.store.load();*/
    }
//     ,  
//     storeLoad: function() {
//         if(typeof(this.store.proxy.reader.jsonData.columns) === 'object') {  
//             var columns = [];
//             //console.log(this);
//             if(this.rowNumberer) { columns.push(Ext.create('Ext.grid.RowNumberer',{width:40})); }  
//             Ext.each(this.store.proxy.reader.jsonData.columns, function(column){
//                 columns.push(column);  
//             });
//             //console.log(columns);
//             //console.log(this);
//             if (typeof(title) == "undefined") {
//      	        var title = this.title;
//             }			
//             if (this.store.proxy.reader.jsonData.totalCount > 0){
//                     this.setTitle(title + ' - Records found: ' +  this.store.proxy.reader.jsonData.totalCount);
//             }
//             else {
//                      this.setTitle(title + ' - Records found: ' +  'No records found!');
//             }
//                          this.reconfigure(this.store, columns);
//                         
//                     }  
//     },  
//     onRender: function(ct, position) {
//         LSP.view.dynamicgrid.Grid.superclass.onRender.call(this, ct, position);  
//         this.store.on('load', this.storeLoad, this);
// 	    /*this.store.proxy.api.read = 'users.json';
//         this.store.load();*/
//     }
});