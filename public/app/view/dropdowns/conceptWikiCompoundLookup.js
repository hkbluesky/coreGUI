Ext.define('LSP.view.dropdowns.conceptWikiCompoundLookup', {
    extend: 'Ext.form.ComboBox',  
    alias: 'widget.conceptWikiCompoundLookup',

    store:  Ext.create('Ext.data.Store',{
            fields: [
              {type: 'string', name: 'concept_label'},
              {type: 'string', name: 'concept_url'},
              {type: 'string', name: 'concept_uuid'},
              {type: 'string', name: 'concept_alt_labels'},
              {type: 'string', name: 'tag_label'},
              {type: 'string', name: 'tag_uuid'},
              
              
            ],
            proxy: {
                type: 'ajax',
                api: {
                    read: '/concept_wiki_api_calls/compound_lookup.json'
                },
                reader: {
                    type: 'json'
                    }
            }
        }),
    	queryMode: 'remote',
      valueField:'concept_url',
    	displayField: 'concept_label',
      name: 'compound_uri',
    	minChars:4,
    	hideTrigger:true,
    	forceSelection:true,
    	allowBlank: false,
      typeAhead:true,
      typeAheadDelay: 150,
      queryDelay: 70,
      emptyText: 'Start typing...',
      margin: '5 5 5 5',
      width: 700,
      fieldLabel: 'Compound name',
      labelWidth: 120,
      listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching compounds found.',
                getInnerTpl: function() {
                    return '<p><b>{concept_label}</b> <a href="{concept_url}" target="_blank">(definition)</a><br/ ><small><i>{concept_alt_labels}</i></small></p>';
                }
      }
});
