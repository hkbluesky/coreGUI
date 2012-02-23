Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.PharmByCmpdNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.conceptWikiCompoundLookup',
        'LSP.view.dynamicgrid.DynamicGrid3'
    ],
    layout: {
          type: 'vbox',
          align: 'stretch'
      },
    
     initComponent: function() {
        
        this.items = [
                    {
                        xtype: 'label',
                        html: '<font face="verdana" color="grey">Hint: Type in compound name. E.g. \"Aspirin\"</font>',
                        labelWidth: 400,
                        padding: '5 0 0 140' 
                    },
                   {
                    xtype: 'container',
                    margin: '0 5 5 5',
                    name: 'form_fields',
                    layout: {
                        type: 'column'
                    },
                    style: 'background-color: #fff;',
                    items: [                      
                          {
                            name: 'cmpd_uuid',
                            xtype: 'hidden',
                            value: ''
                          },
                          {
                            xtype: 'conceptWikiCompoundLookup',
                            fieldLabel: 'Compound name',                        
                          	forceSelection:true,
                          	allowBlank: false,
                            typeAhead:true,
                            typeAheadDelay: 250,
                            queryDelay: 70,    
                          },
                          {
                            xtype: 'button',
                            padding: '5 5 5 5',
                            text: 'Search',
                            disabled: true,
                            action: 'query_pharm_by_cmpd_name'
                          }]},
                          {
                        xtype: 'dynamicgrid3',
                        title: 'Pharmacology by Compound name search results',
                        gridBaseTitle: 'Pharmacology by Compound name search results',                    
                        flex: 1,
                        }                              
                ];

        this.callParent(arguments);
    }    
});
