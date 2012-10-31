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
    }],

    all_records: undefined,

    total_count: 0,

    current_count: 0,

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
            '#simSearchGrid #csvDownloadProxy_id': {
                click: this.prepCSVFile //,
                //scope: this
            }
        });


    },

    prepGrid: function() {
        console.log('LSP.controller.SimSearchForm: prepGrid()');
        var grid = this.getStrucGrid();
        var store = grid.getStore();
        store.on('prefetch', this.storeLoadComplete, this);

        // var grid = this.getStrucGrid();
        // grid.store.proxy.actionMethods = {read:'POST'};
        // grid.store.proxy.api.read = grid.readUrl;
        // grid.store.proxy.params = {offset:0, limit:100};
        // 
        // grid.store.on('load', function (this_store, records, success) {
        //     console.log('grid.store \'load\'');
        //     this.getSubmitButton().enable();
        //     var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        //     grid_controller.storeLoad(grid, success);
        //     this.getSsform().doLayout();
        //     //       this.getStrucGrid().view.refresh();
        //     this.getSsform().setLoading(false);
        // }, this);
    },

    prepCSVFile: function(csv_prep_button) {
        console.log('SimSearchForm: prepCSVFile()');
        var grid_store = this.getStrucGrid().getStore();
        var items = grid_store.data.items;
        var body = Ext.getBody();
        var frame = body.createChild({
            tag: 'iframe',
            cls: 'x-hidden',
            id: 'tsv_download_iframe',
            name: 'iframe'
        });
        var form = body.createChild({
            tag: 'form',
            cls: 'x-hidden',
            id: 'tsv_download_form',
            action: '/core_api_calls/chemspider_tab_separated_file',
            target: 'tsv_download_iframe'
        });
        Ext.each(items, function(item, index) {
            Ext.DomHelper.append("tsv_download_form", {
                tag: "input",
                type: "hidden",
                value: item.data.csid,
                name: "csids[]"
            });
        });

        form.dom.submit();
        frame.remove();
        form.remove();
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
            this.getStrucGrid().down('#csvDownloadProxy_id').enable();
            //this.callParent();
        }
    },
    hitCoreAPI: function(csid_list) {
        console.log("SimSearchForm: hitCoreAPI()");
        var me = this;
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
                    // set the index on the record so that the rows will be numbered correctly.
                    // this is a known bug in extjs when adding records dynamically
                    records[0].index = me.current_count;
                    me.current_count++;
                    // There is only 1 compound record returned
                    me.getStrucGrid().getStore().add(records[0]);
                    //me.all_records.push(records[0]);
                    console.log('Count is now ' + me.current_count);
                    if (me.current_count > 10 || me.current_count == me.total_count) {
                        me.getSubmitButton().enable();
                        //me.getSsform().doLayout();
                        me.getSsform().setLoading(false);
                        // TODO should check there are some records first
                        me.getStrucGrid().down('#csvDownloadProxy_id').enable();
                    }
                } else {
                    // keep track of failed requests since they count towards the total
                    me.current_count++;

                }
            });
        }
    },

    handleHistoryToken: function(historyTokenObject) {
        console.log('SimSearchForm: handleHistoryToken()');
        console.log(historyTokenObject);
        var me = this;
        var searchEngine = Ext.create('CS.engine.search.Structure', {
            listeners: {
                finished: function(sender, rid) {
                    searchEngine.loadCSIDs(function(csids) {
                        me.hitCoreAPI(csids);
                    });
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
            params['searchOptions.Threshold'] = 0.99;
            params['searchOptions.SimilarityType'] = 'Tanimoto';
        } else {
            //  Unsupported search type...
        }
	// there can also be 'ChEBI' and 'MeSH'
	params['scopeOptions.DataSources[0]'] = 'DrugBank';
	params['scopeOptions.DataSources[1]'] = 'ChEMBL';
	params['scopeOptions.DataSources[2]'] = 'PDB';
        this.getStrucGrid().setTitle(grid_title);
        this.getSsform().setLoading(true);
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
        button.disable();
        var form = button.up('form');
        var this_gridview = this.getStrucGrid();
        var current_records = this_gridview.store.getRange();
        this_gridview.store.remove(current_records);
        //        this.getStrucGrid().removeAll(true);
        this.getStrucGrid().recordsLoaded = 0;
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

        Ext.History.add('!p=SimSearchForm&sm=' + values.smiles + '&st=' + searchType);
    }

    //     addRecords: function (csids) {
    //       var this_gridview = this.getStrucGrid();
    //       var this_store = this_gridview.store;
    //       var this_controller = this;
    //       //var temp_store = Ext.create('LSP.store.DynamicGrid');
    //       var temp_store = Ext.create('LDA.store.CompoundStore', {});
    //	temp_store.proxy.reader = Ext.create('LDA.helper.ChemspiderCompoundReader');
    //      //temp_store.proxy.actionMethods = {read: 'POST'};
    //       //temp_store.proxy.api.read = '/core_api_calls/compound_info.json';
    //       var offset = 0;
    //     //  this_gridview.setLoading(true);
    //       this.recursiveAddCompoundInfo(csids,this_store,temp_store,this_controller, 0);
    //     },

    //     recursiveAddCompoundInfo: function(csids,grid_store, temp_store,this_controller, dept) {
    //       var csid = csids[0];
    //       var remaining_csids = csids.slice(1);
    //       if (dept > 6) {     
    //this.getSubmitButton().enable();
    //        //this.getSsform().doLayout();
    //		this.getSsform().setLoading(false);
    //		// TODO should check there are some records first
    //		this.getStrucGrid().down('#csvDownloadProxy_id').enable();
    //return;
    //}
    //       dept++;
    //       var last_csid = remaining_csids.length == 0;
    //       temp_store.proxy.extraParams.uri = "http://rdf.chemspider.com/" + csid;
    //       temp_store.load();
    //      temp_store.on('load',function(){
    //           grid_store.loadRecords(temp_store.getRange(),{addRecords: true});
    //       });    
    //       if (last_csid){    
    //     this.getSubmitButton().enable();
    //        //this.getSsform().doLayout();
    //		this.getSsform().setLoading(false);
    //		// TODO should check there are some records first
    //		this.getStrucGrid().down('#csvDownloadProxy_id').enable();
    //return;
    //}
    //       this_controller.recursiveAddCompoundInfo(remaining_csids,grid_store,temp_store,this_controller, dept);
    //    })
    //   }
});
