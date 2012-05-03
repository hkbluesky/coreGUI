Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux.grid', 'ext/examples/ux/grid');
Ext.define('LSP.view.dynamicgrid.DynamicGrid3', {
    extend:'Ext.grid.Panel',
    alias:'widget.dynamicgrid3',
    requires:[
        'Ext.grid.RowNumberer',
        'Ext.form.*',
        'Ext.ux.grid.FiltersFeature',
        'LSP.view.dynamicgrid.feature.selectable',
        'Ext.selection.CellModel'
    ],
    autoScroll:true,
    layout:'fit',
    gridBaseTitle:'',
    readUrl:'',
    limit:100,
    recordsLoaded:0,
    csid_column:false,
    contextMenu:null,

    showMenu:function (elem) {
        this.contextMenu.showBy(elem);
    },

    initComponent:function () {

        this.contextMenu = new Ext.menu.Menu({

            items:[
                {
                    text:'Copy value', handler:this.showCopyValueWindow, iconCls:'menu-copy'
                },
                {
                    text:'Search for compound', handler:this.searchForCompound, iconCls:'menu-search-compound'
                },
                {
                    text:'Search for target', handler:this.searchForTarget, iconCls:'menu-search-target'
                }
            ]
        });

        // initializing features for the grid
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl:'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
        });
        var filters = {
            ftype:'filters',
            encode:true, // json encode the filter query
            local:true   // defaults to false (remote filtering)
        };
        // this feature allows for selection of text in the grid by changing the underlaying style for the cell
        var cellTextSelector = {
            ftype:'selectable',
            id:'selectable'
        };
        var grid_store = Ext.create('LSP.store.DynamicGrid');
        var config = {

            store:grid_store,

            tbar:[
                {
                    xtype:'button',
                    text:'Retrieve next 100 records',
                    tooltip:'On each click 100 additional records\nare added to the resultset',
                    itemId:'nextRecords',
                    iconCls:'icon-new',
                    disabled:true
                },
                { xtype:'tbseparator' },
                {
                    xtype:'exporterbutton',
                    store:grid_store,
                    formatter:'csv',
                    swfPath:'app/view/ux/exporter/downloadify.swf',
                    downloadImage:'app/view/ux/exporter/csv_button.png',
                    itemId:'csvDownload_id',
                    width:117,
                    height:22,
                    hidden:false
                },
                { xtype:'tbseparator' },
                {
                    xtype:'button',
                    text:'Prepare SD-file download',
                    tooltip:'Starts a two steep process to download the SD-file. This may take a while...',
                    itemId:'sdfDownloadProxy_id',
//                        width: 155,
                    iconCls:'icon-sdf',
                    hidden:false,
                    disabled:true
                },
                {
                    xtype:'exporterbutton',
                    store:grid_store,
                    formatter:'sdf',
                    swfPath:'app/view/ux/exporter/downloadify.swf',
                    downloadImage:'app/view/ux/exporter/sdf_button.png',
                    itemId:'sdfDownload_id',
                    width:111,
                    height:22,
                    hidden:false,
                    disabled:true
                }
            ],
            columns:[
                {name:'temp', hidden:true}
            ],
            rowNumberer:true,
            defaultWidth:200,
            features:[groupingFeature, filters, cellTextSelector]
        };

        Ext.apply(this, config);
        Ext.apply(this.initialConfig, config);
        this.callParent(arguments);
    }

});