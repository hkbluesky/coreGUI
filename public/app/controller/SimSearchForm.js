Ext.define('LSP.controller.SimSearchForm', {
    extend: 'Ext.app.Controller',

    views: ['larkc_sim_search.SimSearchForm', 'mol_editor_forms.KetcherForm', 'dataview.StructureViewer'],
    refs: [{
        ref: 'ssform', // reference to the view
        selector: 'SimSearchForm'
    }, {
        ref: 'strucGrid',
        selector: '#simSearchGrid'
    }, {
        ref: 'submitButton',
        selector: 'SimSearchForm #sim_sss_start_search_button_id'
    }, {
          ref: 'tsvDownloadButton',
          selector: 'SimSearchForm #tsvDownloadProxy_id'
    }, {
	    ref: 'tanimotoThresholdSpinner',
		selector: 'tanimoto_threshold_id'
	}],

    all_records: undefined,

    total_count: 0,

    current_count: 0,

	failed_to_load: 0,
	
	current_smiles: undefined,
	
	current_mode: undefined,

    init: function() {
        console.log('LSP.controller.SimSearchForm: init()');
        this.control({
            'SimSearchForm button[action=ketcher_editor]': {
                click: this.launchKetcher
            },
            'KetcherForm button[action=commit_structure]': {
                click: this.getSmiles
            },
            'SimSearchForm button[action=query]': {
                click: this.submitQuery
            },
            'SimSearchForm': {
                historyToken: this.handleHistoryToken,
                afterrender: this.prepGrid
            },
            'SimSearchForm #provId': {
                change: this.onProvChange
            },
            '#simSearchGrid': {
                itemcontextmenu: function(view, record, itemHTMLElement, index, eventObject, eOpts) {
                    eventObject.preventDefault();
                    //                    console.log('itemcontextmenu');
                    this.getStrucGrid().showMenu(eventObject.getX(), eventObject.getY(), record);
                }
            }
        });


    },    

    setTSVDownloadParams: function() {
        var tsv_download_button = this.getTsvDownloadButton();
        var tsv_download_params = new Array();
        var grid_store = this.getStrucGrid().getStore();
        var items = grid_store.data.items;
        Ext.each(items, function(item, index) {
            tsv_download_params.push("csids[]=" + item.data.csid);
        });
        total_params = tsv_download_params.join("&");
        tsv_download_button.href = cs_download_url + "?" + total_params
        tsv_download_button.setParams();
    },

    prepGrid: function() {
        console.log('LSP.controller.SimSearchForm: prepGrid()');
        var grid = this.getStrucGrid();
        var store = grid.getStore();
		store.removeAll();
        store.on('prefetch', this.storeLoadComplete, this);
    },

    storeLoadComplete: function(store, records, success) {
        console.log('SimSearchForm: storeLoadComplete() ' + this.current_count);
        if (this.current_count == this.total_count) {
            store = Ext.create('Ext.data.store', {
                model: 'LDA.model.SimModel'
            });
            store.add(this.all_records);
            this.getStrucGrid().store = store;
            this.getSubmitButton().enable();
            this.getSsform().doLayout();
            this.getSsform().setLoading(false);
            // TODO should check there are some records first
            this.getStrucGrid().down('#tsvDownloadProxy_id').enable();
            //this.callParent();
        }
    },
    hitCoreAPI: function(csid_list) {
        console.log("SimSearchForm: hitCoreAPI()");
        var me = this;
	this.failed_to_load = 0;
		me.getStrucGrid().getStore().sorters.clear();
        var grid = this.getStrucGrid();
        this.all_records = new Array();
        var csid_store = Ext.create('LDA.store.CompoundStore', {});
        csid_store.proxy.reader = Ext.create('LDA.helper.ChemspiderCompoundReader');
	this.current_count = 0;
        this.total_count = csid_list.length;
        for (var i = 0; i < csid_list.length; i++) {
            csid_store.proxy.extraParams.uri = "http://rdf.chemspider.com/" + csid_list[i];
            csid_store.load(function(records, operation, success) {
                if (success) {
					me.getSsform().setLoading('Fetching compounds....' + me.current_count + ' of ' + me.total_count);
                    // set the index on the record so that the rows will be numbered correctly.
                    // this is a known bug in extjs when adding records dynamically
                    records[0].index = me.current_count;
                    me.current_count++;
                    // There is only 1 compound record returned
                    me.getStrucGrid().getStore().add(records[0]);
                    //me.all_records.push(records[0]);
                    //console.log('Count is now ' + me.current_count);
                    if (me.current_count == me.total_count) {
                        me.getSubmitButton().enable();
                        //me.getSsform().doLayout();
                        me.getSsform().setLoading(false);
                        // TODO should check there are some records first
                        me.getStrucGrid().down('#tsvDownloadProxy_id').enable();
						if (me.failed_to_load > 0) {
							me.getStrucGrid().setTitle(me.getStrucGrid().gridBaseTitle + ' (Failed to load ' + me.failed_to_load + ' records out of ' + me.total_count + ')');
						} else {
							me.getStrucGrid().setTitle(me.getStrucGrid().gridBaseTitle + ' ('  + me.total_count + ' records)');
						}
                        me.setTSVDownloadParams();
                    }
                } else {
                    // keep track of failed requests since they count towards the total
					me.getSsform().setLoading('Fetching compounds....' + me.current_count + ' of ' + me.total_count);
                    me.current_count++;
					me.failed_to_load++;
					if (me.current_count == me.total_count) {
						me.getSubmitButton().enable();
						me.getSsform().setLoading(false);
						me.getStrucGrid().down('#tsvDownloadProxy_id').enable();
						if (me.failed_to_load > 0) {
							me.getStrucGrid().setTitle(me.getStrucGrid().gridBaseTitle + ' (Failed to load ' + me.failed_to_load + ' records out of ' + me.total_count + ')');
						} else {
							me.getStrucGrid().setTitle(me.getStrucGrid().gridBaseTitle + ' ('  + me.total_count + ' records)');
						}					
					}
                }
            });
        }
    },

    handleHistoryToken: function(historyTokenObject) {
        console.log('SimSearchForm: handleHistoryToken() ' + historyTokenObject);
        var me = this;
		me.current_smiles = historyTokenObject.sm;
		me.current_mode = historyTokenObject.st;
        var this_gridview = me.getStrucGrid();
        var current_records = this_gridview.store.getRange();
        //this_gridview.store.remove(current_records);
		this_gridview.store.removeAll();
        // me.getStrucGrid().recordsLoaded = 0;
        var searchEngine = Ext.create('CS.engine.search.Structure', {
            listeners: {
                finished: function(sender, rid) {
                    searchEngine.loadCSIDs(function(csids) {
						if (csids.length == 0) {
							Ext.MessageBox.show({
		                        title: 'Error',
		                        msg: 'Chemspider returned no compounds for this search, please try again with a different structure.',
		                        buttons: Ext.MessageBox.OK,
		                        icon: Ext.MessageBox.ERROR
		                    });
		                    me.getSubmitButton().enable();
	                        me.getSsform().setLoading(false);
						} else {
							me.hitCoreAPI(csids);
						}
                    });
                },
		failed: function(sender, error){
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'There was an error retrieving the list of compounds from Chemspider',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                        me.getSubmitButton().enable();
                        me.getSsform().setLoading(false);
                        me.getStrucGrid().down('#tsvDownloadProxy_id').disable();
		}
            }
        });

        var grid_title = '';
        var search_type = '';
        var params = {};
        var values = this.getSsform().getValues();
        params['searchOptions.Molecule'] = values.smiles;
        if (values.search_type == '1') { //  Exact structure search
            grid_title = 'Exact structure match';
            search_type = 'exact';
        } else if (values.search_type == '2') { //  SubStructure search
            grid_title = 'Substructure structure';
            search_type = 'substructure';
        } else if (values.search_type == '3') { //  Similarity search
            grid_title = 'Similarity search';
            search_type = 'similarity';
            //  In the future this parameters should be taken from the UI.
            //  But right now in order to make Similarity search more realistic they are entered manually.
			var threshold = this.getTanimotoThresholdSpinner().value;
			params['searchOptions.Threshold'] = threshold/100;
            // params['searchOptions.Threshold'] = 0.99;
            params['searchOptions.SimilarityType'] = 'Tanimoto';
        } else {
            //  Unsupported search type...
        }
	// there can also be 'ChEBI' and 'MeSH'
	params['scopeOptions.DataSources[0]'] = 'DrugBank';
	params['scopeOptions.DataSources[1]'] = 'ChEMBL';
	params['scopeOptions.DataSources[2]'] = 'PDB';
        this.getStrucGrid().setTitle(grid_title);
        this.getSsform().setLoading('Fetching compounds....');
        searchEngine.doSearch(search_type, params);
    },

    // Launch ketcher window
    launchKetcher: function(button) {
        // Launch the window
        var view = Ext.widget('KetcherForm');
        // Check to see if we already have a structure to modify and load it if we do
        fields = this.getSsform().form.getFields().items;
        var molfile = '';
        fields.forEach(function(item) {
            if (item.name == 'molfile') {
                molfile = item.getValue();
                var temp = 12;
            }
        });
        if (molfile != '') {
            document.getElementById('ketcher_box_id').contentWindow.ketcher.setMolecule(molfile);
        }
    },

    // Grep smiles from ketcher window and store in smiles field in form
    getSmiles: function(button) {
        var ketcher_window = document.getElementById('ketcher_box_id');
        // smiles is used for query
        smiles = ketcher_window.contentWindow.ketcher.getSmiles();
        // molfile is stored in hidden field for use when updating existing structure
        molfile = ketcher_window.contentWindow.ketcher.getMolfile();
        // We get all fields in form so that we can update the right one
        fields = this.getSsform().form.getFields().items;
        fields.forEach(function(item) {
            if (item.name == 'smiles') {
                item.setValue(smiles)
            } else if (item.name == 'molfile') {
                item.setValue(molfile)
            }
        });
        button.up('KetcherForm').close();
    },

    submitQuery: function(button) {
        console.log(' SimSearchForm: submitQuery()');
		var me = this;
        button.disable();
        var form = button.up('form');
        var values = form.getValues();
        if (values.smiles.length < 4) {
            button.enable();
            return;
        }

        var searchType = 'exact';
        if (values.search_type == 2) {
            searchType = 'sub';
        } else if (values.search_type == 3) {
            searchType = 'sim';
        }
		// history cannot cope with token being the same as it was before
		if (me.current_smiles == values.smiles && me.current_mode == searchType) {
			var this_gridview = me.getStrucGrid();
		    var current_records = this_gridview.store.getRange();
			this_gridview.store.removeAll();
		    var searchEngine = Ext.create('CS.engine.search.Structure', {
		    	listeners: {
		        	finished: function(sender, rid) {
		            	searchEngine.loadCSIDs(function(csids) {
							if (csids.length == 0) {
								Ext.MessageBox.show({
				                	title: 'Error',
				                    msg: 'Chemspider returned no compounds for this search, please try again with a different structure.',
				                    buttons: Ext.MessageBox.OK,
				                    icon: Ext.MessageBox.ERROR
				                });
				                me.getSubmitButton().enable();
			                    me.getSsform().setLoading(false);
							} else {
								me.hitCoreAPI(csids);
							}
		                });
		        	},
					failed: function(sender, error){
		            	Ext.MessageBox.show({
		                	title: 'Error',
		                    msg: 'There was an error retrieving the list of compounds from Chemspider',
		                    buttons: Ext.MessageBox.OK,
		                    icon: Ext.MessageBox.ERROR
		              	});
		                me.getSubmitButton().enable();
		                me.getSsform().setLoading(false);
		                me.getStrucGrid().down('#tsvDownloadProxy_id').disable();
					}
		        }
			});
		    var grid_title = '';
		    var params = {};
		    var values = this.getSsform().getValues();
		    params['searchOptions.Molecule'] = values.smiles;
	        if (values.search_type == '1') { //  Exact structure search
	            grid_title = 'Exact structure match';
	            search_type = 'exact';
	        } else if (values.search_type == '2') { //  SubStructure search
	            grid_title = 'Substructure structure';
	            search_type = 'substructure';
	        } else if (values.search_type == '3') { //  Similarity search
	            grid_title = 'Similarity search';
	            search_type = 'similarity';
	            //  In the future this parameters should be taken from the UI.
	            //  But right now in order to make Similarity search more realistic they are entered manually.
	            params['searchOptions.Threshold'] = 0.99;
	            params['searchOptions.SimilarityType'] = 'Tanimoto';
	        } else {
	            //  Unsupported search type...
	        }
			// there can also be 'ChEBI' and 'MeSH'
			params['scopeOptions.DataSources[0]'] = 'DrugBank';
			params['scopeOptions.DataSources[1]'] = 'ChEMBL';
			params['scopeOptions.DataSources[2]'] = 'PDB';
		    me.getStrucGrid().setTitle(grid_title);
		    me.getSsform().setLoading('Fetching compounds....');
		    searchEngine.doSearch(search_type, params);
		} else {
			Ext.History.add('!p=SimSearchForm&sm=' + values.smiles + '&st=' + searchType);
		}
    },

    onProvChange: function(field, newVal, oldVal) {
        var dg = this.getStrucGrid();
        dg.toggleProv(newVal['prov']);
        dg.getView().refresh();
    }
});
