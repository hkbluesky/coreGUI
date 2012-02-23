Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameForm', {
    extend: 'Ext.form.Panel',  
    alias: 'widget.PharmByTargetNameForm',
    closable: true,
    requires: [
        'LSP.view.dropdowns.conceptWikiProteinLookup',
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
                        html: '<font face="verdana" color="grey">Hint: Type in protein name and species. E.g. \"GPR39 Human\"</font>',
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
                                xtype: 'conceptWikiProteinLookup',
                                fieldLabel: 'Protein name',                        
                              	forceSelection:true,
                              	allowBlank: false,
                                typeAhead:true,
                                typeAheadDelay: 250,
                                queryDelay: 70,    
                              },
                              {
                                xtype: 'button',
                                padding: '5 5 5 5',
                                text: 'Search...',
                                disabled: false,
                                name: 'query_summit_button',
                                action: 'query_pharm_by_target_name'
                              }]
                      },
                      {
                        xtype: 'dynamicgrid3',
                        title: 'Pharmacology by Target name search results',
                        gridBaseTitle: 'Pharmacology by Target name search results',
                        flex: 1,
                      } 
                ]; 
        this.callParent(arguments);
    }    
});
