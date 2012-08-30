// The data store containing the list of states
var activity_type = Ext.create('Ext.data.Store', {
	fields: ['abbr', 'name'],
	data: [{
		"abbr": "potency",
		"name": "potency"
	}, {
		"abbr": "IC50",
		"name": "ic"
	}, {
		"abbr": "activity",
		"name": "activity"
	}, {
		"abbr": "Ki",
		"name": "ki"
	}, {
		"abbr": "Ec50",
		"name": "ec"
	}, {
		"abbr": "Logki",
		"name": "lk"
	}, {
		"abbr": "id50",
		"name": "id"
	}, {
		"abbr": "logIC50",
		"name": "lic"
	}, {
		"abbr": "Ac50",
		"name": "ac"
	}]
});
var condition = Ext.create('Ext.data.Store', {
	fields: ['symbol', 'name'],
	data: [{
		"symbol": "=",
		"name": "equals"
	}, {
		"symbol": ">",
		"name": "greater"
	}, {
		"symbol": "<",
		"name": "less"
	}, {
		"symbol": "all",
		"name": "all"
	}]
});
var unit = Ext.create('Ext.data.Store', {
	fields: ['unit', 'name'],
	data: [{
		"unit": "nM",
		"name": "nano"
	}, {
		"unit": "mM",
		"name": "mili"
	}, {
		"unit": "µM",
		"name": "pico"
	}]
});
Ext.define('LSP.view.filter.FilterForm', {
	extend: 'Ext.container.Container',
	alias: 'widget.FilterPanel',
	closable: true,
	layout: {
		type: 'hbox'
	},
	refs:[
            {
                ref:'activity_combobox', // reference to the view
                selector:'#activity_combobox_id'
            },
            {
                ref:'conditions_combobox',
                selector:'#conditions_combobox_id'
            },
            {
                ref:'value_textfield',
                selector:'#value_textfield_id'
            },
            {
                ref:'unit_combobox',
                selector:'#unit_combobox_id'
            }
        ],
	headerPosition: 'right',
	frame: true,
	padding: '0 0 5 0',
	items: [{
		xtype: 'combobox',
		itemId: 'activity_combobox_id',
		fieldLabel: 'Activity Type',
		store: activity_type,
		queryMode: 'local',
		displayField: 'abbr',
		valueField: 'name',
		labelWidth: 100,
		labelPad: 2,
		padding: '0 2 0 0'
	}, {
		xtype: 'combobox',
		itemId: 'conditions_combobox_id',
		fieldLabel: 'Conditions',
		store: condition,
		queryMode: 'local',
		displayField: 'symbol',
		valueField: 'name',
		labelWidth: 70,
		labelPad: 2,
		padding: '0 2 0 0'
	}, {
		xtype: 'textfield',
		itemId: 'value_textfield_id',
		name: 'value',
		fieldLabel: 'Value',
		allowBlank: false,
		labelWidth: 50,
		labelPad: 2,
		padding: '0 2 0 0'
		// requires a non-empty value
	}, {
		xtype: 'combobox',
		itemId: 'unit_combobox_id',
		fieldLabel: 'Unit',
		store: unit,
		queryMode: 'local',
		displayField: 'unit',
		valueField: 'name',
		labelWidth: 50,
		labelPad: 2,
		padding: '0 10 0 0'
	}, {
		xtype: 'button',
		itemId: 'addCompletedFilter_id',
		iconCls: 'icon-new',
		padding: '5 5 5 5',
		tooltip: 'Add this filter',
		action: 'add_completed_filter'
	}]
});
