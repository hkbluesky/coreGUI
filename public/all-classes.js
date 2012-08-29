/*
Copyright(c) 2012 Company Name
*/
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.Appmoduletree', {
    extend:'Ext.tree.Panel',
    alias:'widget.appmoduletree',

    requires:[
        'Ext.data.TreeStore'
    ],

    //singleExpand: true,    
    rootVisible:false,
    useArrows:true,
    frame:false,
    autoScroll:true,
    height:'100%',

    store:'NavigationTree',

    listeners:{
        itemclick:function (tree, record, item, index, e, options) {
			console.log("AppmoduleTree: itemclick()");
            if (record.raw.application_type == 'grid') {
                // Check if panel with that ID exists, then switch
                Ext.History.add('!p=' + record.raw.xtype);
            }
        }
    },

    initComponent:function () {
        this.callParent(arguments);
    }
});
/**
 * Created by JetBrains RubyMine.
 * User: jameseales
 * Date: 05/03/2012
 * Time: 17:11
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LSP.view.target_by_name.TargetPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.TargetPanel',
    title:'Target Data',
    anchor:'100% 100%',
    autoScroll:true,
    bodyPadding:'10px',
    layout:'anchor',

    initComponent:function () {
        this.items = [
            {
                xtype:'panel',
                border:0,
                layout:'anchor',
                autoScroll:true,
                itemId:'dp',
                bodyPadding:'20px',
                cls:'target-data-panel',
                hidden:true,
                items:[
                    {
                        xtype:'panel',
                        border:0,
                        anchor:'100%',
                        itemId:'topPanel',
                        layout:'column',
                        autoScroll:true,
                        items:[
                            {
                                xtype:'image',
                                itemId:'target_image',
                                width:150,
                                height:150,
                                src:'/images/target_placeholder.png'
                            },
                            {
                                xtype:'panel',
                                bodyPadding:30,
                                columnWidth:1.0,
                                border:0,
                                autoScroll:true,
                                itemId:'textDataPanel',
                                layout:'anchor',
                                items:[
                                    {xtype:'displayfield', anchor:'100%', itemId:'label', fieldCls:'target-title'},
                                    {xtype:'button', text:'Pharmacology Data', itemId:'pharmTargetButton', cls:'target-pharm-button'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'target_type', fieldLabel:'Target Type', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'organism', fieldLabel:'Organism', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'description', fieldLabel:'Description', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'synonyms', fieldLabel:'Synonyms', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'specific_function', fieldLabel:'Specific Function', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'cellular_function', fieldLabel:'Cellular Function', cls:'target-field-label'},
                                    {xtype:'displayfield', anchor:'100%', itemId:'keywords', fieldLabel:'Keywords', cls:'target-field-label'}            ,
                                    {xtype:'displayfield', anchor:'100%', itemId:'pdb_id_page', fieldLabel:'PDB Entry', cls:'target-field-label'},
                                    {
                                        xtype:'panel',
                                        border:0,
                                        anchor:'100%',
                                        itemId:'numericDataPanel',
                                        layout:'column',
                                        bodyPadding:30,
                                        items:[
                                            {xtype:'displayfield', itemId:'molecular_weight', columnWidth:0.33, fieldLabel:'Molecular Weight', cls:'target-field-bottom', fieldCls:'target-field-bottom-field', labelAlign:'top' },
                                            {xtype:'displayfield', itemId:'number_of_residues', columnWidth:0.33, fieldLabel:'Number of Residues', cls:'target-field-bottom', fieldCls:'target-field-bottom-field', labelAlign:'top' },
                                            {xtype:'displayfield', itemId:'theoretical_pi', columnWidth:0.33, fieldLabel:'Theoretical Pi', cls:'target-field-bottom', fieldCls:'target-field-bottom-field', labelAlign:'top' }
                                        ]
                                    }
                                ]
                            }

                        ]
                    }
                ]
            },
            {
                xtype:'displayfield',
                border:0,
                padding:'20px',
                itemId:'msg',
//                anchor:'100% 100%',
                region:'center',
                hidden:true,
                fieldCls:'target-message',
                value:'message here'
            }
        ];

        // var store = Ext.create('LDA.store.TargetStore');
        // store.addListener('load', this.showData, this);
        this.callParent(arguments);
    },

    resetAllFields:function () {
        var displayFields = this.query('displayfield');
        Ext.each(displayFields, function (field) {
            field.hide();
        }, this);
        var img = this.down('#target_image');
        img.setSrc('/images/target_placeholder.png');
        this.doLayout();
    },

    showMessage:function (message) {
        var dp = this.down('#dp');
        var msg = this.down('#msg');
        dp.setVisible(false);
        msg.setValue(message);
        msg.setVisible(true);
    },

    showData:function (store, records, successful) {
		console.log('LSP.view.target_by_name.TargetPanel: showData()');
        if (successful) {
            if (records.length > 0) {
                var dp = this.down('#dp');
                var msg = this.down('#msg');
                msg.setVisible(false);
                this.setValues(store.first());
                dp.setVisible(true);
            } else {
                this.showMessage('No records found within OPS for this search');
            }
        } else {
            this.showMessage('Server did not respond');
        }
        this.up('TargetByNameForm').setLoading(false);
        var searchButton = Ext.ComponentQuery.query('#TargetByNameSubmit_id')[0].enable();
    },

    clearDomBelow:function (domElement) {
        if (domElement.hasChildNodes()) {
            while (domElement.childNodes.length > 0) {
                domElement.removeChild(domElement.firstChild);
            }
        }
    },

    addKeywords:function (keywords) {
        var bits = keywords.split(',');
        var keywordDisplayField = this.down('#keywords');
        var bodyEl = keywordDisplayField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);
        var tpl = Ext.DomHelper.createTemplate({tag:'div', cls:'keyword', html:'{kw}'});
        Ext.each(bits, function (keyword) {
            tpl.append(bodyEl, {kw:keyword.trim()});
        }, this);
        keywordDisplayField.show();
    },

    addOrganism:function (organism) {
        var organismDisplayField = this.down('#organism');
        var bodyEl = organismDisplayField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);
        var tpl = Ext.DomHelper.createTemplate({tag:'div', cls:'organism', html:'{org}'});
        tpl.append(bodyEl, {org:organism});
        organismDisplayField.show();
    },

    addSynonyms:function (synonyms) {
        var bits = synonyms.split('; ');
        var synonymsField = this.down('#synonyms');
        var bodyEl = synonymsField.bodyEl;
        var domElem = bodyEl.dom;
        this.clearDomBelow(domElem);
        var tpl = Ext.DomHelper.createTemplate({tag:'div', cls:'synonym', html:'{syn}'});
        Ext.each(bits, function (synonym) {
            tpl.append(bodyEl, {syn:synonym});
        }, this);
        synonymsField.show();
    },

    addPDBImage:function (pdbIdPage) {
        //example http://www.pdb.org/pdb/explore/explore.do?structureId=1HOF
//        http://www.rcsb.org/pdb/images/1HOF_asr_r_250.jpg
        var stringURL = new String(pdbIdPage);
        var img = this.down('#target_image');
        var pdbID = stringURL.substr(stringURL.lastIndexOf('=') + 1);
        var pdbField = this.down('#pdbIdPage');
        pdbField.setRawValue('<a target=\'_blank\' href=\'' + pdbIdPage + '\'>' + pdbID + '</a>');
        pdbField.show();
        img.setSrc('http://www.rcsb.org/pdb/images/' + pdbID + '_asr_r_250.jpg');
        img.show();
    },

    setFieldValue:function (fieldId, value) {
        if (fieldId == 'synonyms') {
//            console.log('synonyms');
            this.addSynonyms(value);
        }
        else if (fieldId == 'keywords') {
//            console.log('keywords');
            this.addKeywords(value);
        }
        else if (fieldId == 'organism') {
//            console.log('organism');
            this.addOrganism(value);
        }
        else if (fieldId == 'pdb_id_page') {
			if (value != "") {
				this.addPDBImage(value);
			}
        }
        else {
//            console.log('standard field');
            var field = this.down('#' + fieldId);
			if (field != null) {
				field.setValue(value);
	            field.show();
			}
        }
    },


    setValues:function (target) {
        this.resetAllFields();
        var td = target.data;

        var pharmButton = this.down('#pharmTargetButton');
        pharmButton.hide();
        pharmButton.setHandler(function () {
                Ext.History.add('!p=PharmByTargetNameForm&u=' + target.store.proxy.extraParams.uri);
            }
        );
        pharmButton.show();

        for (var prop in td) {
            if (td.hasOwnProperty(prop)) {
//                console.log(prop);
                this.setFieldValue(prop, td[prop]);
            }
        }
        this.doLayout();
    }

});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 07:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.TargetModel', {
    extend:'Ext.data.Model',
    fields:[
        //this msay need to change (target information endpiint is down)

        'cw_target_uri',
        'chembl_target_uri',
        'drugbank_target_uri',

        //chembl
        'label',
        'label_src',

        'keywords',
        'keywords_src',

        'description',
        'description_src',

        'target_type',
        'target_type_src',

        'organism',
        'organism_src',

        'synonyms',
        'synonyms_src',

        'cellular_location',
        'cellular_location_src',

        'molecular_weight',
        'molecular_weight_src',

        'number_of_residues',
        'number_of_residues_src',

        'pdb_id_page',
        'pdb_id_page_src',

        'specific_function',
        'specific_function_src',

        'theoretical_pi',
        'theoretical_pi_src'

//        'cw_uri', 'cs_uri', 'chembl_uri', 'drugbank_uri',
//        'inchi', 'inchi_src',
//        'inchi_key', 'inchi_key_src',
//        'smiles', 'smiles_src',
//        'alogp', 'alogp_src',
//        'full_mwt', 'full_mwt_src',
//        'hba', 'hba_src',
//        'hbd', 'hbd_src',
//        'molform', 'molform_src',
//        'mw_freebase', 'mw_freebase_src',
//        'psa', 'psa_src',
//        'rtb', 'rtb_src',
//        'biotransformation', 'biotransformation_src',
//        'description', 'description_src',
//        'proteinBinding', 'proteinBinding_src',
//        'toxicity', 'toxicity_src',
//        'prefLabel', 'prefLabel_src'
    ]
});

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/
Ext.define('LSP.store.NavigationTree', {
    extend:'Ext.data.TreeStore',
    // proxy:{
    //         type:'ajax',
    //         url:'application_modules.json'
    //     }
	root: {
	        expanded: true,
	        children: [
			{
				xtype: "",
				cls: "folder",
				text: "OPS",
				leaf: false,
				expanded: false,
				children: [{
					xtype: "",
					cls: "folder",
					text: "Exemplars",
					leaf: false,
					children: [{
						xtype: "temp",
				        leaf: true,
				        text: "X-Chem-Bio Navigator",
				        cls: "file",
						application_type : 'grid'
					},
					{
						xtype: "temp",
				        leaf: true,
				        text: "X-Target Dossier",
				        cls: "file",
						application_type : 'grid'
					},
					{
						xtype: "temp",
				        leaf: true,
				        text: "X-Polypharmacology Browser",
				        cls: "file",
						application_type : 'grid'
					}]
				},
				// Summmary form is hidden for the moment
				// {
				// 					xtype: "",
				// 			        leaf: false,
				// 			        text: "Concept",
				// 			        cls: "folder",
				// 					children: [{
				// 						xtype: "SummeryForm",
				// 						home: "Concept properties and relations",
				// 				        leaf: true,
				// 				        text: "Summary",
				// 				        cls: "file",
				// 						application_type : 'grid'
				// 					}]
				// 				},
				{
					xtype: "",
			        leaf: false,
			        text: "Pharmacology",
			        cls: "folder",
					children: [{
						xtype: "PharmEnzymeForm",
				        home: "Compounds active against enzyme family",
				        leaf: true,
				        text: "Pharmacology by Enzyme family",
				        cls: "file",
						application_type : 'grid'
					},
					{
						xtype: "PharmByCmpdNameForm",
				        home: "Pharmacology by Compound name",
				        leaf: true,
				        text: "Pharmacology by Compound",
				        cls: "file",
						application_type : 'grid'
					},
					{
						xtype: "PharmByTargetNameForm",
				        home: "Pharmacology by Target Name",
				        leaf: true,
				        text: "Pharmacology by Target",
				        cls: "file",
						application_type : 'grid'
					}]
				},
				{
					xtype: "",
			        home: "",
			        leaf: false,
			        text: "Target",
			        cls: "folder",
					children: [{
						xtype: "temp",
				        home: "",
				        leaf: true,
				        text: "X-Target by sequence",
				        cls: "file",
						application_type : 'grid'
					},
					{
						xtype: "TargetByNameForm",
				        home: "Target by name",
				        leaf: true,
				        text: "Target by name",
				        cls: "file",
						application_type : 'grid'
					}]
				},
				{
					xtype: "",
			        home: "",
			        leaf: false,
			        text: "Compound",
			        cls: "folder",
					children: [{
						xtype: "SimSearchForm",
				        home: "Compound Structure Search",
				        leaf: true,
				        text: "Compound by structure",
				        cls: "file",
						application_type : 'grid'
					},
					{
						xtype: "CmpdByNameForm",
				        home: "Compound by name",
				        leaf: true,
				        text: "Compound by name",
				        cls: "file",
						application_type : 'grid'
					}]
				}]
			},
			{
				xtype: "",
		        home: "",
		        leaf: false,
		        text: "Searching",
		        cls: "folder",
				children: [{
					xtype: "queryform",
			        home: "SPARQL form",
			        leaf: true,
			        text: "SPARQL",
			        cls: "file",
			        url: "rdf.json"
				}]
			}
	        ]
	    }
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.CompoundModel', {
    extend:'Ext.data.Model',
    fields:['cw_uri', 'cs_uri', 'chembl_uri', 'drugbank_uri',
        'inchi', 'inchi_src',
        'inchi_key', 'inchi_key_src',
        'smiles', 'smiles_src',
        'alogp', 'alogp_src',
        'full_mwt', 'full_mwt_src',
        'hba', 'hba_src',
        'hbd', 'hbd_src',
        'molform', 'molform_src',
        'mw_freebase', 'mw_freebase_src',
        'psa', 'psa_src',
        'rtb', 'rtb_src',
        'biotransformation', 'biotransformation_src',
        'description', 'description_src',
        'proteinBinding', 'proteinBinding_src',
        'toxicity', 'toxicity_src',
        'prefLabel', 'prefLabel_src'
//        '', '_src',
    ]
});
Ext.define('LDA.helper.DynamicPagingToolbar', {
	extend: 'Ext.toolbar.Paging',
    alias: 'widget.dynamicpagingtoolbar',
    updatePager : function(){
        var me = this,
            pageData,
            currPage,
            pageCount,
            afterText,
            count,
            isEmpty;

        count = me.store.getCount();
        isEmpty = count === 0;
        if (!isEmpty) {
            pageData = me.getPageData();
            currPage = pageData.currentPage;
            pageCount = pageData.pageCount;
            afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
        } else {
            currPage = 0;
            pageCount = 0;
            afterText = Ext.String.format(me.afterPageText, 0);
        }

        Ext.suspendLayouts();
        me.child('#afterTextItem').setText(afterText);
        me.child('#inputItem').setDisabled(isEmpty).setValue(currPage);
        me.child('#first').setDisabled(currPage === 1 || isEmpty);
        me.child('#prev').setDisabled(currPage === 1  || isEmpty);
        me.child('#next').setDisabled(currPage === pageCount  || isEmpty);
        me.child('#last').setDisabled(currPage === pageCount  || isEmpty);
        me.child('#refresh').enable();
        me.updateInfo();
        Ext.resumeLayouts(true);

        if (me.rendered) {
            me.fireEvent('change', me, pageData);
        }
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 02/07/2012
 * Time: 16:53
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.JamesQueryStringEncoder', {
    extend:'Ext.Base',

    toQueryString:function (object) {
        var paramObjects = [],
            params = [],
            i, j, ln, paramObject, value;

        for (i in object) {
            if (object.hasOwnProperty(i)) {
                paramObjects = paramObjects.concat(Ext.Object.toQueryObjects(i, object[i], false));
            }
        }

        for (j = 0, ln = paramObjects.length; j < ln; j++) {
            paramObject = paramObjects[j];
            value = paramObject.value;

            if (Ext.isEmpty(value)) {
                continue;
            }
            else if (Ext.isDate(value)) {
                value = Ext.Date.toString(value);
            }

            params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
        }

        return params.join('&');
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.basestores.BaseStore', {
    extend:'Ext.data.Store',
    _format:'json',
    uri:'',
    BASE_URL:'',
	remoteSort: true,
    stringEncoder:Ext.create('LDA.helper.JamesQueryStringEncoder'),
		//     proxy:{
		//         type:'jsonp',
		//         noCache:false,
		//         startParam:undefined,
		// limitParam:undefined,
		// pageParam:undefined,
		//         //this is the only query param handled natively by the proxy, all others are handled in store config below.
		//         callbackKey:'_callback'
		//     },

    listeners:{
        //this is used to construct the proxy url before the load is done
        beforeprefetch:{

            fn:function () {
                var me = this;
                me.updateProxyURL();
            }
        },
        beforeload:{

            fn:function () {
                var me = this;
                me.updateProxyURL();
            }
        }
    },

    // because prefetchData is stored by index
    // this invalidates all of the prefetchedData
    sort: function() {
        var me = this,
            prefetchData = me.pageMap;

        if (me.buffered) {
            if (me.remoteSort) {
                prefetchData.clear();
				//get the specific store to sort the column
                this.sortColumn(arguments);
				this.currentPage = 1;
				this.guaranteeRange(0,49);
            } else {
                me.callParent(arguments);
            }
        } else {
            me.callParent(arguments);
        }
    },

    setURI:function (uri) {
        this.uri = uri;
    },

    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            this.stringEncoder.toQueryString(
                {
                    _format:this._format,
                    uri:this.uri
                });
//        console.log('Proxy: ' + Ext.ClassManager.getName(this) + ' URL updated to: ' + this.proxy.url);
    }

});


Ext.define('LDA.model.SimModel', {
    extend:'Ext.data.Model',
    fields:['cw_uri', 'cs_uri', 'chembl_uri', 'drugbank_uri',
        'inchi', 'inchi_src',
        'inchi_key', 'inchi_key_src',
        'smiles', 'smiles_src',
        'alogp', 'alogp_src',
        'full_mwt', 'full_mwt_src',
        'hba', 'hba_src',
        'hbd', 'hbd_src',
        'molform', 'molform_src',
        'mw_freebase', 'mw_freebase_src',
        'psa', 'psa_src',
        'rtb', 'rtb_src',
        'biotransformation', 'biotransformation_src',
        'description', 'description_src',
        'proteinBinding', 'proteinBinding_src',
        'toxicity', 'toxicity_src',
        'prefLabel', 'prefLabel_src'
//        '', '_src',
    ]
});
Ext.define('LDA.store.SimSearchStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.SimModel',
    storeId:'SimSearchStore',
    BASE_URL:simSearchUrl,
    proxy:{
        type:'ajax',
        noCache:false,
        startParam:undefined,
		limitParam:undefined,
		pageParam:undefined,
        //this is the only query param handled natively by the proxy, all others are handled in store config below.
        callbackKey:'_callback'
    },

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.SimReader');
        this.callParent(arguments);
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 07:41
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.TargetStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.TargetModel',
    storeId:'TargetStore',
    BASE_URL:'http://ops.few.vu.nl/target?',
    proxy:{
        type:'jsonp',
        noCache:false,
        startParam:undefined,
		limitParam:undefined,
		pageParam:undefined,
        //this is the only query param handled natively by the proxy, all others are handled in store config below.
        callbackKey:'_callback'
    },

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.TargetReader');
        this.callParent(arguments);
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.CompoundStore', {
    extend:'LDA.store.basestores.BaseStore',
    model:'LDA.model.CompoundModel',
    storeId:'CompoundStore',
    BASE_URL:'http://ops.few.vu.nl/compound?',
	    proxy:{
	        type:'jsonp',
	        noCache:false,
	        startParam:undefined,
	limitParam:undefined,
	pageParam:undefined,
	        //this is the only query param handled natively by the proxy, all others are handled in store config below.
	        callbackKey:'_callback'
	    },

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.CompoundReader');
        this.callParent(arguments);
    }
});

Ext.define('LDA.helper.LDAConstants', {
    singleton: true,
    LDA_IN_DATASET : 'inDataset',
	LDA_ABOUT : '_about',
	LDA_COMPOUND_PHARMACOLOGY_COUNT : 'compoundPharmacologyTotalResults',
	LDA_TARGET_PHARMACOLOGY_COUNT : 'targetPharmacologyTotalResults',
	LDA_ENZYME_FAMILY_COUNT : 'enzymePharmacologyTotalResults',
	LDA_PERMITTED_ACTIVITY_TYPES : ['IC50', 'Activity'],
	LDA_ON_ASSAY : 'onAssay',
	LDA_EXACT_MATCH : 'exactMatch',
	LDA_PRIMARY_TOPIC : 'primaryTopic',
	LDA_RESULT : 'result',
	LDA_ACTIVITY : 'activity',
	LDA_FOR_MOLECULE : 'forMolecule',
	LDA_ASSAY_TARGET : 'target',
	LDA_ITEMS : 'items',
	LDA_PAGINATED_NEXT : 'next',
	LDA_PAGINATED_PREVIOUS : 'prev',
	LDA_PAGINATED_PAGE_SIZE : 'itemsPerPage',
	LDA_PAGINATED_START_INDEX : 'startIndex',
	LDA_TARGET_OF_ASSAY : 'targetOfAssay',
	LDA_ASSAY_OF_ACTIVITY : 'assayOfActivity',
	LDA_SRC_CLS_MAPPINGS : {
		'http://www.conceptwiki.org': 'conceptWikiValue',
		'http://www.conceptwiki.org/': 'conceptWikiValue',
		'http://data.kasabi.com/dataset/chembl-rdf': 'chemblValue',
		'http://www4.wiwiss.fu-berlin.de/drugbank': 'drugbankValue',
		'http://linkedlifedata.com/resource/drugbank': 'drugbankValue',
		'http://www.chemspider.com': 'chemspiderValue',
		'http://www.chemspider.com/': 'chemspiderValue',
		'http://rdf.chemspider.com': 'chemspiderValue',
		'http://rdf.chemspider.com/': 'chemspiderValue'
	},
	LDA_PROVENANCE_OFF : 'Off',
	LDA_PROVENANCE_COLOUR : 'Colour',
	LDA_PROVENANCE_ICON : 'Icon',
	LDA_PROVENANCE_TEXT : 'Text',
	//this sets default provenance mode
	//TODO this should be updated by user cookie, user choice or set in Viewport when running LSP.
	LDAProvenanceMode : 'Colour',
	LDADataItems : {
		"compound_smiles": "smiles",
		"activity_standard_value": "std_value",
		"compound_inchikey": "inchikey",
		"activity_activity_type": "std_type",
		"activity_standard_units": "std_unit",
		"target_pref_label": "target_name",
		"activity_relation": "relation",
		"compound_inchi": "inchi",
		"compound_full_mwt": "molweight",
		"cw_compound_uri": "compound_cw",
		"compound_pref_label": "compound_name",
		"target_organism": "assay_organism"
	}
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.SimReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
// TODO check the format of the result and change this reader and the SimModel accordingly
    readRecords:function (data) {
        var pt = data['result']['primaryTopic'];
        var em = pt['exactMatch'];
        var chemspiderValue;
        var drugBankData;
		var chemblValue;
        Ext.each(em, function (match, index, matches) {
                var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                    chemspiderValue = match;
                } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                   drugBankData = match;
                } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                   chemblValue = match;
                }
            }
        );
        var record = Ext.create('LDA.model.SimModel', {
            cw_uri:pt[LDA.helper.LDAConstants.LDA_ABOUT],
            cs_uri:chemspiderValue[LDA.helper.LDAConstants.LDA_ABOUT],
            chembl_uri:chemblValue[LDA.helper.LDAConstants.LDA_ABOUT],
            drugbank_uri:drugBankData[LDA.helper.LDAConstants.LDA_ABOUT],
            inchi:chemspiderValue['inchi'],
            inchi_src:chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            inchi_key:chemspiderValue['inchikey'],
            inchi_key_src:chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            smiles:chemspiderValue['smiles'],
            smiles_src:chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            alogp:chemblValue['alogp'],
            alogp_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            full_mwt:chemblValue['full_mwt'],
            full_mwt_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            hba:chemblValue['hba'],
            hba_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            hbd:chemblValue['hbd'],
            hbd_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            molform:chemblValue['molform'],
            molform_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            mw_freebase:chemblValue['mw_freebase'],
            mw_freebase_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            psa:chemblValue['psa'],
            psa_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            rtb:chemblValue['rtb'],
            rtb_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            biotransformation:drugBankData['biotransformation'],
            biotransformation_src:drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET],
            description:drugBankData['description'],
            description_src:drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET],
            proteinBinding:drugBankData['proteinBinding'],
            proteinBinding_src:drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET],
            toxicity:drugBankData['toxicity'],
            toxicity_src:drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET],
            prefLabel:pt['prefLabel'],
            prefLabel_src:pt[LDA.helper.LDAConstants.LDA_IN_DATASET]
        });

//        console.log('LDA.model.CompoundModel: Compound');
//        console.log(JSON.stringify(record));

        return new Ext.data.ResultSet(
            {
                total:1,
                count:1,
                records:[record],
                success:true,
                message:'loaded'
            });
    }
})
;

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.mol_editor_forms.KetcherForm', {
    extend:'Ext.window.Window',
    alias:'widget.KetcherForm',

    requires:['Ext.form.Panel'],

    title:'Draw structure',
    layout:'fit',
    modal:true,
    autoShow:true,
    height:570,
    width:810,

    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                padding:'0 0 0 0',
                border:false,
                style:'background-color: #fff;',

                items:[
                    {
                        xtype:'box',
                        width:800,
                        height:520,
                        id:'ketcher_box_id',
                        autoEl:{
                            tag:'iframe',
                            src:'ketcher/ketcher.html'
                        }}
                ]
            }
        ];

        this.buttons = [
            {
                text:'Use structure',
                action:'commit_structure'
            },
            {
                text:'Cancel',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});

Ext.define('LSP.view.cmpd_by_name.CmpdByNameSingleDisplayForm', {
    extend:'Ext.form.Panel',
    alias:'widget.CmpdByNameSingleDisplayForm',
    title:'Compound by Name search results',
    anchor:'100% 100%',
    autoScroll:true,
    bodyPadding:'10px',
    layout:'anchor',

    initComponent:function () {
        this.items = [
            {
                // DISPLAY PANEL
                xtype:'panel',
                border:false,
                layout:'anchor',
                autoScroll:true,
                itemId:'displayPanel',
                bodyPadding:'20px',
                hidden:true,

                items:[
                    {
                        // TOP PANEL
                        xtype:'panel',
                        border:false,
                        anchor:'100%',
                        itemId:'topPanelDetails',
                        layout:'column',
                        //autoScroll:true,

                        items:[
                            {
                                // IMAGE AND FIGURES
                                xtype:'panel',
                                //name:'imageAndFigures',
                                itemId:'imageAndFigures',
                                layout:'anchor',
                                border: true,
                                bodyPadding: '8px',

                                items:[
                                    {
                                        // IMAGE
                                        xtype:'image',
                                        name:'image',
                                        itemId:'compound_form_imagepanel',
                                        width:150,
                                        height:150,
                                        src:'/images/target_placeholder.png'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'alogp',
                                        itemId:'alogp',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'20px 0 12px 0',
                                        fieldLabel:'ALogP',
                                        labelAlign:'top',
                                        columnWidth:.1

                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'hha',
                                        itemId:'hha',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label\
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'# H-Bond Receptors',
                                        columnWidth:.13,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'hhd',
                                        itemId:'hhd',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'# H-Bond Donors',
                                        columnWidth:.13,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'molweight',
                                        itemId:'molweight',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'Mol Weight',
                                        columnWidth:.1,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'mw_freebase',
                                        itemId:'mw_freebase',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'MW Freebase',
                                        columnWidth:.1,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'num_ro5_violations',
                                        itemId:'num_ro5_violations',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'# Rule of 5 Violations',
                                        columnWidth:.14,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'psa',
                                        itemId:'psa',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'Polar Surface Area',
                                        columnWidth:.12,
                                        labelAlign:'top'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'rtb',
                                        itemId:'rtb',
                                        fieldCls:'x-cmpBottomfieldValue', // value
                                        baseCls:'x-cmpBottomBase', // label
                                        anchor:'100%',
                                        padding:'0 0 12px 0',
                                        fieldLabel:'# Rotatable Bonds',
                                        columnWidth:.12,
                                        labelAlign:'top'
                                    }
                                ]


                            },
                            {
                                // MAIN DETAILS
                                xtype:'panel',
                                bodyPadding:30,
                                columnWidth:1.0,
                                border:false,
                                //autoScroll:true,
                                itemId:'dataPanel',
                                layout:'anchor',

                                items:[
                                    {
                                        xtype:'displayfield',
                                        name:'compound_name',
                                        itemId:'compound_name',
                                        //width:600,
                                        anchor:'100%',
                                        fieldCls:'x-cmpTitle'
                                    },{
                                        xtype:'displayfield',
                                        //value:'<br>',
                                        itemId:'spacer4'
                                    },

                                    {
                                        xtype:'button',
                                        text:'Pharmacology Data',
                                        itemId:'pharmCompoundButton'

                                    },
                                    {
                                        xtype:'displayfield',
                                        value:'<br>',
                                        itemId:'spacer1'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'description',
                                        itemId:'description',
                                        fieldCls:'x-cmpDescriptions',
                                        anchor:'90%',
                                        maxWidth:600
                                        //width:680

                                    },
                                    {
                                        xtype:'displayfield',
                                        itemId:'spacer2'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'biotransformation',
                                        itemId:'biotransformation',
                                        fieldCls:'x-cmpDescriptions',
                                        anchor:'90%',
                                        maxWidth:600
                                        //width:680

                                    },
                                    {
                                        xtype:'displayfield',
                                        itemId:'spacer3',
                                        value:'<br>'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'chemspider_id',
                                        itemId:'chemspider_id',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        labelAlign:'left',
                                        fieldLabel:'ChemSpider ID',
                                        anchor:'100%'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'molformula',
                                        itemId:'molformula',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Molecular Formula'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'smiles',
                                        itemId:'smiles',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'SMILES'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'inchi',
                                        itemId:'inchi',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Standard InChl'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'inchiKey',
                                        itemId:'inchiKey',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Standard InChlKey'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'affectedOrganism',
                                        itemId:'affectedOrganism',
                                        cls:'x-cmpfield',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Affected Organism'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'indication',
                                        itemId:'indication',
                                        cls:'x-cmpfield',
                                        fieldCls:'x-cmpDescriptions',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Indication'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'proteinBinding',
                                        itemId:'proteinBinding',
                                        cls:'x-cmpfield',
                                        fieldCls:'x-cmpDescriptions',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Protein Binding'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'toxicity',
                                        itemId:'toxicity',
                                        cls:'x-cmpfield',
                                        fieldCls:'x-cmpDescriptions',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Toxicity'
                                    },
                                    {
                                        xtype:'displayfield',
                                        name:'meltingPoint',
                                        itemId:'meltingPoint',
                                        cls:'x-cmpfield',
                                        fieldCls:'x-cmpDescriptions',
                                        labelWidth:120,
                                        padding:'10px 0 0 0',
                                        maxWidth:570,
                                        anchor:'80%',
                                        labelAlign:'left',
                                        fieldLabel:'Melting Point'
                                    }
                                ]


                            }


                        ]


                    },

                    {

                        // BOTTOM Panel
                        xtype:'panel',
                        itemId:'bottomPanelDetails',
                        bodyPadding:30,
                        border:false,
                        height:100,
                        layout:'column',
                        hidden:true,

                        fieldDefaults:{
                            labelAlign:'top',
                            labelWidth:120,
                            anchor:'100%'
                        },

                        items:[


                        ]

                    },
                    {
                        xtype:'displayfield',
                        border:0,
                        padding:'20px',
                        itemId:'msg',
                        region:'center',
                        hidden:true,
                        fieldCls:'compound-message',
                        value:'message here'
                    }
                ]

            }
        ]

        this.callParent(arguments);

    },

    showData:function (store, records, succesful) {
        if (succesful) {
            if (records.length > 0) {
                var record = store.first();

//                console.log("Number of records returned " + records.length);

                var displayPanel = this.query('#displayPanel')[0];
                displayPanel.show();

                var dp = this.query('#dataPanel')[0];
                dp.show();

                var tp = this.query('#topPanelDetails')[0];
                tp.show();

                var bp = this.query('#bottomPanelDetails')[0];
                bp.show();

                var ip = this.query('#compound_form_imagepanel')[0];
                var csid = record.data.csid_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
                ip.setSrc('http://www.chemspider.com/ImagesHandler.ashx?id=' + csid);
                ip.show();

                var msg = this.down('#msg');
                msg.hide();

                this.setValues(record);
            } else {
                this.showMessage('No records found within OPS for this search');
            }
        } else {
            this.showMessage('Server did not respond');
        }
        this.up('CmpdByNameForm').setLoading(false);
        var searchButton = Ext.ComponentQuery.query('#CmpdByNameSubmit_id')[0].enable();
    },

    resetAllFields:function () {
        var displayFields = this.query('displayfield');
        Ext.each(displayFields, function (field) {
            field.hide();
        }, this);
        this.doLayout();
    },

    showSpacerFields:function () {
        var spacer = this.down('#spacer1');
        spacer.show();
        spacer = this.down('#spacer2');
        spacer.show();
        spacer = this.down('#spacer3');
        spacer.show();
        spacer = this.down('#spacer4');
        spacer.show();
    },

    setValues:function (compound) {
        this.resetAllFields();
        this.showSpacerFields();
        var td = compound.data;

        var pharmButton = this.down('#pharmCompoundButton');
        pharmButton.hide();
        pharmButton.setHandler(function () {
                //                console.log('Pharma button clicked: ' + '!p=PharmByCmpdNameForm&u=' + target.store.proxy.extraParams.protein_uri);
                Ext.History.add('!p=PharmByCmpdNameForm&u=' + compound.store.proxy.extraParams.uri);
            }
        );
        pharmButton.show();

        for (var prop in td) {
            if (td.hasOwnProperty(prop)) {
//                console.log("Field: " + prop + " Value: " + td[prop]);

                var field = this.down('#' + prop);
                if (field) {

                    switch(prop) {

                        case 'alogp':
                            // change alogp value to 1 d.p
                            var alogpValue = new Number(td[prop]);
                            alogpValue = alogpValue.toFixed(1);
                            field.setValue(alogpValue);
                            field.show();
                            break;
                        case 'molformula':

                            // correctly format molecular formula
                            var molValue = td[prop];
                            molValue = molValue.replace(/(\d+)?\s*/g,"<sub>$1</sub>");
                            field.setValue(molValue);
                            field.show();
                            break;
                        default:
                            field.setValue(td[prop]);
                            field.show();

                    }


                } else {
//                    console.log("No itemId for: " + prop);
                }
            }
        }
        this.doLayout();
    },

    showMessage:function (message) {

        var displayPanel = this.query('#displayPanel')[0];
        displayPanel.show();

        var dp = this.query('#dataPanel')[0];
        dp.hide();

        var tp = this.query('#topPanelDetails')[0];
        tp.hide();

        var bp = this.query('#bottomPanelDetails')[0];
        bp.hide();

        var ip = this.query('#compound_form_imagepanel')[0];
        ip.hide();

        var msg = this.query('#msg')[0];
        msg.setValue(message);
        msg.setVisible(true);
    }
});
Ext.define('LSP.model.DynamicGrid', {
    extend:'Ext.data.Model',
    fields:[]
});

Ext.define('CW.model.ConceptWikiLookup', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'match', mapping: 'match', type: 'string' },
        { name: 'uuid', mapping: 'uuid', type: 'string' },
        { name: 'ops_uri', mapping: 'ops_uri', type: 'string' },
        { name: 'pref_label', mapping: 'pref_labels', type:'string'},
        { name: 'alt_labels', mapping: 'alt_labels', type: 'string' },
        { name: 'uuid', mapping: 'uuid', type: 'string' },
        { name: 'concept_type_tags', mapping: 'uuid_tags', type:'string'},
        { name: 'pref_url', mapping: 'pref_url', type: 'string' },
    ],
    getSomething: function () {
        if (this.something == null) this.parseSomething();

        return this.something;
    },
    parseSomething: function () {
        this.something = new Array();
        for (var i = 0; i < this.data.something.length; i++) {
            var syn = this.data.tags[i];
            if (syn.length == 1)
                this.something.push(syn);
        }
    }
});

Ext.define('CW.config.Settings', {
    singleton: true,
    searchByTagUrl: 'http://staging.conceptwiki.org/web-ws/concept/search/byTag',
    getConceptUrl: 'http://staging.conceptwiki.org/web-ws/concept/get',
    base_ops_uri: 'http://www.conceptwiki.org/concept/',
    lang_code: "en"
});


Ext.define('CW.store.ConceptWikiLookup', {
    extend: 'Ext.data.Store',
    requires: ['CW.model.ConceptWikiLookup', 'CW.config.Settings'],
    model: 'CW.model.ConceptWikiLookup',
    constructor: function () {
        this.callParent(arguments);
        this.setProxy({
            type: 'jsonp',
            timeout: 5000,
            url: CW.config.Settings.searchByTagUrl,
            reader: Ext.create('CW.helper.ConceptWikiJSONReader')
        });
    }
});

Ext.define('LSP.controller.CmpdByNameForm', {
        extend:'Ext.app.Controller',
        models:['LDA.model.CompoundModel'],
        stores:['LDA.store.CompoundStore'],
        views:['cmpd_by_name.CmpdByNameSingleDisplayForm'],

        refs:[
            {
                ref:'cmpdByNameSingleDisplayForm',
                selector:'CmpdByNameSingleDisplayForm'
            },
            {
                ref:'compoundImagePanel',
                selector:'CmpdByNameSingleDisplayForm #compound_form_imagepanel'
            },
            {
                ref:'formView',
                selector:'CmpdByNameForm'
            },
            {
                ref:'submitButton',
                selector:'#CmpdByNameSubmit_id'
            },
            {
                ref:'lookup',
                selector:'#compoundByNameLookup'
            }
        ],

        init:function () {
            this.control({
                'CmpdByNameForm button[action=query_cmpd_by_name]':{
                    click:this.submitQuery
                },
                'CmpdByNameForm conceptWikiCompoundLookup':{
                    select:this.enableSubmit
                },
                'CmpdByNameForm':{
                    historyToken:this.handleHistoryToken
                }
            });
        },

        handleHistoryToken:function (historyTokenObject) {
            console.log('CmpdByNameForm: handleHistoryToken()');
			var me = this;
			var target_panel = me.getFormView().down("CmpdByNameSingleDisplayForm");
            if (historyTokenObject.u) {
                var store = this.getLDAStoreCompoundStoreStore();
                if (historyTokenObject.u != store.proxy.extraParams.uri) {
                    store.proxy.extraParams.uri = historyTokenObject.u;
                    me.getFormView().setLoading(true);
                    store.load(function(records, operation, success) {
						console.log('LSP.controller.CmpdByNameForm: store is loaded ' + success);
						if (success) {
							me.getSubmitButton().enable();
							target_panel.setValues(records[0]);
							target_panel.down("#displayPanel").setVisible(true);
							target_panel.down('#msg').setVisible(false);
							me.getFormView().setLoading(false);
				        } else {
				            me.getFormView().down("TargetPanel").showMessage('Server did not respond');
				        }
					});
                }
            } else if (historyTokenObject.s) {
                var lookup = this.getLookup();
                lookup.setRawValue(historyTokenObject.s);
                lookup.doQuery(historyTokenObject.s);
            }
        },

        enableSubmit:function (compundLookup) {
            var form = this.getFormView();
            var button = this.getSubmitButton();
            button.enable();
        },

        submitQuery:function (button) {
            button.disable();
            var form = this.getFormView();
            var compound_uri = form.getValues().compound_uri;
            Ext.History.add('!p=CmpdByNameForm&u=' + compound_uri);
        }
    }
);

Ext.define('LSP.view.larkc_sim_search.SimSearchForm', {
    extend:'Ext.form.Panel',
    alias:'widget.SimSearchForm',
    requires:[
        'LSP.view.mol_editor_forms.KetcherForm'
    ],
    closable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
        console.log('LSP.view.larkc_sim_search.SimSearchForm: initComponent()');

        this.items = [
            {
                xtype:'form',
                padding:'5 5 5 5',
                border:false,
//                height:'100%',
                style:'background-color: #fff;',
                items:[
                    {
                        name:'molfile',
                        xtype:'hidden',
                        value:''
                    },
                    {
                        xtype:'fieldcontainer',
                        layout:'column',
                        collapsible:false,
                        defaults:{anchor:'100%'},
                        items:[
                            {
                                xtype:'textfield',
                                name:'smiles',
                                itemId:'smilesField',
                                emptyText:'Enter SMILES here or use the molecular editor to draw structure - click button ->',
                                fieldLabel:'Search for compounds similar to SMILES',
                                labelWidth:230,
                                width:650
                            },
                            {
                                xtype:'button',
                                action:'ketcher_editor',
                                text:'Draw structure'
                            }
                        ]
                    },
                    {
                        xtype:'radiogroup',
                        fieldLabel:'Search type',
                        itemId:'searchTypeRadio',
                        items:[
                            {boxLabel:'Exact structure search', name:'search_type', inputValue:1, checked:true},
                            {boxLabel:'Substructure search', name:'search_type', inputValue:2},
                            {boxLabel:'Structural similarity search', name:'search_type', inputValue:3}
                        ]
                    },
                    {
                        xtype:'button',
                        action:'query',
                        itemId:'sim_sss_start_search_button_id',
                        text:'Start search...'
                    }

                ]},
            {
                xtype:'SimSearchScrollingGrid',
                itemId:'simSearchGrid',
                title:'Structure search results',
                gridBaseTitle:'Structure search results',
                flex:1
            }
        ];

        this.callParent(arguments);
    },


    setFormData:function (historyTokenObject) {
        console.log('SimSearchForm setFormData()');
        //formdata comes directly from form via history
        //load data
        //this needs to be the function that does everything after clicking the button

//        s = smiles string
//        st = search type ['exact','substructure','structural']

        if (historyTokenObject.sm) {
            var smilesField = this.down('#smilesField');
            smilesField.setValue(historyTokenObject.sm);
            var searchTypeRadio = this.down('#searchTypeRadio');
            if (historyTokenObject.st) {
                if (historyTokenObject.st == 'exact') {
                    searchTypeRadio.setValue({search_type:1});
                } else if (historyTokenObject.st == 'sub') {
                    searchTypeRadio.setValue({search_type:2});
                } else if (historyTokenObject.st == 'sim') {
                    searchTypeRadio.setValue({search_type:3});
                }
            } else {
                searchTypeRadio.setValue({search_type:1});
            }
            this.fireEvent('historyToken', historyTokenObject);
        }


//        if (historyTokenObject.u) {
//            //gets ref to
//            var dg = this.down('#simSearchGrid');
//            var store = dg.store;
//            if (historyTokenObject.u != store.proxy.extraParams.compound_uri) {
//                store.proxy.extraParams.compound_uri = historyTokenObject.u;
//                store.load({params:{ offset:0, limit:100}});
//            }
//        } else if (historyTokenObject.s) {
//            var lookup = this.down('conceptWikiCompoundLookup');
//            lookup.setRawValue(historyTokenObject.s);
//            lookup.doQuery(historyTokenObject.s);
//        }


    }
});

Ext.define('CW.helper.ConceptWikiJSONReader', {
    extend:'Ext.data.reader.Json',
    
    readRecords:function (data) {

        var records = [];
        var count = 0;
        Ext.each(data, function (item) {
           var record = {};
           var pref_label = "";
           var alt_labels = [];
           // iterating over labels to get preferred and alternative labels in relevant language
           Ext.each(item.labels, function (label){
              if (label.language.code == CW.config.Settings.lang_code) {
                if (label.type == "PREFERRED") {
                    pref_label = label.text;
                }
                if (label.type == "ALTERNATIVE") {
                    alt_labels.push(label.text);
                }             
              }
           });
           // iterating over tags to get the different tag uuid types and tag texts
//// NB we do not care aboout these at the moment
            var concept_tag_uuids = [];
//            var concept_tag_labels = [];           
//            Ext.each(item.tags, function (tag){              
//                concept_tag_uuids.push(tag.uuid);         
//            });
           // iterating over urls to get first preferred url
           pref_url = "";
           Ext.each(item.urls, function (url){
              if (url.type == "PREFERRED") {
                    pref_url = url.value;
                    return false; // breaks loop
              }
           });

           // constructing the data record
        var record = Ext.create('CW.model.ConceptWikiLookup', {
          match: item.match.replace(/\<\/em\>/g,"</b>").replace(/\<em\>/g,"<b>"),
          uuid: item.uuid,
          ops_uri: CW.config.Settings.base_ops_uri + item.uuid,
          pref_label: pref_label,
          alt_labels: alt_labels.join("; "),
          concept_type_tags: concept_tag_uuids.join("; "),
          pref_url: pref_url
        });
        
        records.push(record);
        count++;
//        console.log(JSON.stringify(record));


       
    })
     return new Ext.data.ResultSet(
            {
                total  : count,
                count  : count,
                records: records,
                success:true,
                message:'loaded'
            });
    }
});


Ext.define('CW.view.ConceptWikiLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.conceptWikiLookup',
    requires:[
        'CW.model.ConceptWikiLookup',
        'CW.helper.ConceptWikiJSONReader',
        'CW.store.ConceptWikiLookup'
    ],
    cwTagUuid: 'pleaseConfigure[cwConceptTagUuid:]',
    store: Ext.create('CW.store.ConceptWikiLookup'),
    // search boks configs
    forceSelection:true,
    allowBlank:false,
    typeAhead:true,
    typeAheadDelay: 250,
    queryDelay: 250,
    queryCaching: false,
    queryParam: 'q',
    queryMode:'remote',
    valueField:'ops_uri',
    displayField:'pref_label',
    name: 'ops_uri',  // can be overwritten in view config
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    allowBlank:false,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    fieldLabel: 'Overwrite this in config',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching entities found.',
        getInnerTpl:function () {
            return '<p><span style="font-family: verdana; color: grey; "><small>Match: {match}</small></span><br/><b>{pref_label}</b> <a href="http://staging.conceptwiki.org/wiki/#/concept/{uuid}/view" target="_blank">(definition)</a></p>';
        }                                                                                                                                                                                        
    }
});
         
Ext.define('LSP.view.Settings', {
    extend:'Ext.form.Panel',
    alias:'widget.settingsform',
    height:'100%',
    initComponent:function () {

        this.items = [
            {
                xtype:'form',
                padding:'5 5 0 5',
                border:false,
                //height: '100%',
                style:'background-color: #fff;',
                items:[
                    {
                        xtype:'label',
                        text:'To use a different endpoint than the default Amsterdam VU one insert URL of sparql endpoint below and click save'
                    },
                    {
                        xtype:'textarea',
                        name:'endpoint',
                        heigth:50,
                        fieldLabel:'URL',
                        emptyText:'Insert full URL to the sparql endpoint used, eg: http://10.11.93.218:8183/sparql',
                        labelWidth:30
                    },
                    {
                        name:'utf8',
                        xtype:'hidden',
                        value:'&#x2713;'
                    },
                    {
                        name:'authenticity_token',
                        xtype:'hidden',
                        value:$$('meta[name=csrf-token]')[0].readAttribute('content')
                    },
                    {
                        xtype:'button',
                        text:'Save',
                        action:'save_endpoint'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:04
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.basestores.FilteringStore', {
    extend:'LDA.store.basestores.BaseStore',
    assay_organism:'',
    activity_type:'',
    activity_value:'',
	sort_column:'',
	
	// Set up the sort properties, check the direction of sort and prepend with
	// '-' if required
	sortColumn:function(arguments) {
		console.log('LDA.store.basestores.FilteringStore: sortColumn()');
		var sort_column = "?" + LDADataItems[arguments[0].property];
		var sort_direction = arguments[0].direction;
		if (sort_direction == "DESC") {
			sort_column = "DESC(" + sort_column + ")";
		}
		this.setSortColumn(sort_column);
	},

	setSortColumn:function(sortColumn) {
		this.sort_column = sortColumn;
	},

    setAssayOrganism:function (assayOrganism) {
        this.assay_organism = assayOrganism;
    },

    setActivityType:function (activityType) {
        if (LDA_PERMITTED_ACTIVITY_TYPES.indexOf(activityType) != -1) {
            this.activity_type = activityType;
        }
    },

    setActivityValue:function (activityValue) {
        if (typeof activityValue == 'number') {
            this.activity_value = activityValue;
        }
    },


    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            this.stringEncoder.toQueryString(
                {
                    assay_organism:this.assay_organism,
                    activity_type:this.activity_type,
                    activity_value:this.activity_value,
                    _format:this._format,
                    uri:this.uri
                });
//        console.log('Proxy: ' + Ext.ClassManager.getName(this) + ' URL updated to: ' + this.proxy.url);
    }

});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 15:23
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.PharmacologyCountModel', {
    extend:'Ext.data.Model',
    fields:['count', 'uri']
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:32
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.CompoundPharmacologyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'CompoundPharmacologyCountStore',
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology/count?',
		    proxy:{
		        type:'jsonp',
		        noCache:false,
		        startParam:undefined,
		limitParam:undefined,
		pageParam:undefined,
		        //this is the only query param handled natively by the proxy, all others are handled in store config below.
		        callbackKey:'_callback'
		    },

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.CompoundPharmacologyCountReader');
        this.callParent(arguments);
    }


});
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.controller.Settings', {
        extend:'Ext.app.Controller',

        views:['Settings'],

        init:function () {
            this.control({
                'settingsform button[action=save_endpoint]':{
                    click:this.saveEndpoint
                }
            });
        },
        saveEndpoint:function (button) {
            // Call to store endpoint in session
            var form = button.up('form');
            var values = form.getValues();
            form.submit({
                url:'/sparql_endpoint/settings.json',
                waitMsg:'Saving end point...',
                success:function (fp, o) {
                    Ext.Msg.alert('Success', 'Endpoint stored');
                }});

        }
    }
);

Ext.define('CW.controller.ConceptWikiLookup', {
    extend:'Ext.app.Controller',
    models: ['CW.model.ConceptWikiLookup'],
    views:['CW.view.ConceptWikiLookup'],
    
    init:function () {
        this.control({
            'conceptWikiLookup':{
                afterrender:this.prepProxy
            }
        });
    },

     // Fires when the box is rendered the first time
     prepProxy:function (cw_dropdown_view) {
        cw_dropdown_view.store.proxy.extraParams = {uuid: cw_dropdown_view.cwTagUuid, limit: 10};
       
    },
    
   
    setConcept:function (concept_url, cw_lookup) {
      var concept_uuid = concept_url.match(/http:\/\/www.conceptwiki.org\/concept\/([a-f0-9\-]+)/)[1];
      var store = Ext.create('Ext.data.Store', {
        model: 'CW.model.ConceptWikiLookup',
        proxy: {
          type: 'jsonp',
          url: CW.config.Settings.getConceptUrl,
          reader: Ext.create('CW.helper.ConceptWikiJSONGetReader')
      }
      });
      store.load({
          params: {'uuid': concept_uuid },
          callback:function (records, operation, success) {
              if (success) {
                console.log("Success",records[0]);
                cw_lookup.setValue(records[0]);
              }
              else {
              
              }
          }
      },this );
    }
})
;


                
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.CompoundPharmacologyCountReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
//    alias:'reader.ldajson',

    readRecords:function (data) {
//        console.log('readRecords');
//        console.log(data);

        var countVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_COMPOUND_PHARMACOLOGY_COUNT];
        var uriVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_ABOUT];

//        var record = new Ext.data.Model(undefined, undefined, {count:countVal}, convertedValues = {});
        var record = Ext.create('LDA.model.PharmacologyCountModel', {count:countVal, uri:uriVal});

       console.log('LDA.model.PharmacologyCountModel: CompoundPharmacologyCount');
//        console.log(JSON.stringify(record));

        return new Ext.data.ResultSet(
            {
                total:1,
                count:1,
                records:[record],
                success:true,
                message:'loaded'
            });
    }
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:24
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.CompoundPharmacologyCountGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.CompoundPharmacologyCountGrid',
    store:Ext.create('LDA.store.CompoundPharmacologyCountStore'),
    loadMask:true,
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },
        items:[
            {
                header:'Compound URI',
                dataIndex:'uri',
                width:400
            },
            {
                header:'Pharmacology Count',
                dataIndex:'count',
                width:60
            }
        ]
    }
});


/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:23
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.TargetPharmacologyCountStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyCountModel',
    storeId:'TargetPharmacologyCountStore',
    BASE_URL:'http://ops.few.vu.nl/target/pharmacology/count?',
    proxy:{
        type:'jsonp',
        noCache:false,
        startParam:undefined,
		limitParam:undefined,
		pageParam:undefined,
        //this is the only query param handled natively by the proxy, all others are handled in store config below.
        callbackKey:'_callback'
    },

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.TargetPharmacologyCountReader');
        this.callParent(arguments);
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:31
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.TargetPharmacologyCountReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
    readRecords:function (data) {

        var countVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_TARGET_PHARMACOLOGY_COUNT];
        var uriVal = data['result']['primaryTopic'][LDA.helper.LDAConstants.LDA_ABOUT];
        var record = Ext.create('LDA.model.PharmacologyCountModel', {count:countVal, uri:uriVal});

//        console.log('LDA.model.PharmacologyCountModel: TargetPharmacologyCount');
//        console.log(JSON.stringify(record));

        return new Ext.data.ResultSet(
            {
                total:1,
                count:1,
                records:[record],
                success:true,
                message:'loaded'
            });
    }
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 04/07/2012
 * Time: 16:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.TargetPharmacologyCountGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.TargetPharmacologyCountGrid',
    store:Ext.create('LDA.store.TargetPharmacologyCountStore'),
    loadMask:true,
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },

        items:[
            {
                header:'Target URI',
                dataIndex:'uri',
                width:400
            },
            {
                header:'Pharmacology Count',
                dataIndex:'count',
                width:60
            }
        ]
    }
})
;
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 14:00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.PharmacologyModel', {
    extend:'Ext.data.Model',
    fields:[
        //these fields are the union of the fields from compound and target pharmacology results
        //Most fields are present in both results

        'cs_compound_uri',
        'cw_compound_uri',
        'chembl_compound_uri',
        'drugbank_compound_uri',

        'cw_target_uri',
        'chembl_target_uri',
        'drugbank_target_uri',

        'chembl_assay_uri',

        'chembl_activity_uri',

        //specific to target pharma
        'target_preflabel',
        'target_preflabel_src',

        'target_title',
        'target_title_src',

        'target_organism',
        'target_organism_src',

        //specific to compound pharma (is CW UUID)
        'compound_uuid',
        'compound_uuid_src',

        'compound_drug_type',
        'compound_drug_type_src',

        'compound_generic_name',
        'compound_generic_name_src',

        'compound_full_mwt',
        'compound_full_mwt_src',

        'compound_num_ro5_violations',
        'compound_num_ro5_violations_src',

        'compound_inchi',
        'compound_inchi_src',

        'compound_inchi_key',
        'compound_inchi_key_src',

        'compound_smiles',
        'compound_smiles_src',

        'compound_preflabel',
        'compound_preflabel_src',

        'assay_organism',
        'assay_organism_src',

        'activity_relation',
        'activity_relation_src',

        'activity_standard_units',
        'activity_standard_units_src',

        'activity_standard_value',
        'activity_standard_value_src',

        'activity_activity_type',
        'activity_activity_type_src'
    ]
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:28
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.CompoundPharmacologyStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyModel',
    storeId:'CompoundPharmacologyStore',
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology?',
	    proxy:{
	        type:'jsonp',
	        noCache:false,
	        startParam:undefined,
	limitParam:undefined,
	pageParam:undefined,
	        //this is the only query param handled natively by the proxy, all others are handled in store config below.
	        callbackKey:'_callback'
	    },

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.CompoundPharmacologyReader');
        this.callParent(arguments);
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.CompoundPharmacologyReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
//    alias:'reader.ldajson',

    readRecords:function (data) {
        var me = this;
        var records = new Array();

        //big chunks of data
        var pt = data[LDA.helper.LDAConstants.LDA_RESULT][LDA.helper.LDAConstants.LDA_PRIMARY_TOPIC];
        var em = pt[LDA.helper.LDAConstants.LDA_EXACT_MATCH];
        var drugbankData = em[1];
        var chemspiderData = em[2];
        var chemblData = em[3];

        //shared data in all records

        //uris
        var cw_compound_uri = pt[LDA.helper.LDAConstants.LDA_ABOUT];
        var drugbank_compound_uri = drugbankData[LDA.helper.LDAConstants.LDA_ABOUT];
        var cs_compound_uri = chemspiderData[LDA.helper.LDAConstants.LDA_ABOUT];
        var chembl_compound_uri = chemblData[LDA.helper.LDAConstants.LDA_ABOUT];

        //data with sources
        var conceptwiki_src = pt[LDA.helper.LDAConstants.LDA_IN_DATASET];
        var prefLabel = pt['prefLabel'];

        var drugbank_src = drugbankData[LDA.helper.LDAConstants.LDA_IN_DATASET];
        var drugType = drugbankData['drugType'];
        var genericName = drugbankData['genericName'];

        var chemspider_src = chemspiderData[LDA.helper.LDAConstants.LDA_IN_DATASET];
        var inchi = chemspiderData['inchi'];
        var inchikey = chemspiderData['inchikey'];
        var smiles = chemspiderData['smiles'];

        var chembl_src = chemblData[LDA.helper.LDAConstants.LDA_IN_DATASET];
        var full_mwt = chemblData['full_mwt']

        Ext.each(chemblData[LDA.helper.LDAConstants.LDA_ACTIVITY],

            function (a, index, array) {
                //assay is inside activity
                var assayData = a[LDA.helper.LDAConstants.LDA_ON_ASSAY];
                if (assayData != undefined) {
                    var targetData = assayData[LDA.helper.LDAConstants.LDA_ASSAY_TARGET];

                    //record instance specific data

                    //uris
                    var chembl_activity_uri = a[LDA.helper.LDAConstants.LDA_ABOUT];
                    var chembl_assay_uri = assayData[LDA.helper.LDAConstants.LDA_ABOUT];
                    var chembl_target_uri = targetData[LDA.helper.LDAConstants.LDA_ABOUT];

                    //data values
                    var targetTitle = targetData['title'];
                    //the next two need changing in LDA query (values are correct but name is incorrect
                    var targetOrganism = targetData['assay_organism'];
                    var assayOrganism = assayData['assay_organism'];

                    var activityType = a['activity_type'];
                    var relation = a['relation'];
                    var standardValue = a['standardValue'];
                    var standardUnits = a['standardUnits'];

                    var record = new LDA.model.PharmacologyModel({
                            cs_compound_uri:cs_compound_uri,
                            cw_compound_uri:cw_compound_uri,
                            chembl_compound_uri:chembl_compound_uri,
                            drugbank_compound_uri:drugbank_compound_uri,

                            cw_target_uri:undefined,
                            chembl_target_uri:chembl_target_uri,
                            drugbank_target_uri:undefined,

                            chembl_assay_uri:chembl_assay_uri,

                            chembl_activity_uri:chembl_activity_uri,

                            //for target pharma
                            target_preflabel:undefined,
                            target_preflabel_src:undefined,

                            target_title:targetTitle,
                            target_title_src:chembl_src,

                            target_organism:targetOrganism,
                            target_organism_src:chembl_src,
//
//                        //for compound pharma (is CW UUID) (this seems to be missing in latest LDA 3/7/12)
                            compound_uuid:undefined,
                            compound_uuid_src:undefined,

                            compound_drug_type:drugType,
                            compound_drug_type_src:drugbank_src,

                            compound_generic_name:genericName,
                            compound_generic_name_src:drugbank_src,

                            compound_full_mwt:full_mwt,
                            compound_full_mwt_src:chembl_src,

                            compound_num_ro5_violations:undefined,
                            compound_num_ro5_violations_src:undefined,

                            compound_inchi:inchi,
                            compound_inchi_src:chemspider_src,

                            compound_inchi_key:inchikey,
                            compound_inchi_key_src:chemspider_src,

                            compound_smiles:smiles,
                            compound_smiles_src:chemspider_src,

                            compound_preflabel:prefLabel,
                            compound_preflabel_src:conceptwiki_src,

                            assay_organism:assayOrganism,
                            assay_organism_src:chembl_src,

                            activity_relation:relation,
                            activity_relation_src:chembl_src,

                            activity_standard_units:standardUnits,
                            activity_standard_units_src:chembl_src,

                            activity_standard_value:standardValue,
                            activity_standard_value_src:chembl_src,

                            activity_activity_type:activityType,
                            activity_activity_type_src:chembl_src

                        }
                    );
//                    console.log('LDA.model.PharmacologyModel: CompoundPharmacology');
//                    console.log(JSON.stringify(record));

                    records.push(record);
                } else {
                    //assayData and activity data are missing nothing to report
                }
            },
            //scope
            me
        );

        return new Ext.data.ResultSet(
            {
                total:records.length,
                count:records.length,
                records:records,
                success:true,
                message:'loaded'
            });
    }
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:25
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.CompoundPharmacologyGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.CompoundPharmacologyGrid',
    store:Ext.create('LDA.store.CompoundPharmacologyStore'),
    loadMask:true,
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            },
            width:200
        },
        items:[
//            'cs_compound_uri',
//            'cw_compound_uri',
//            'chembl_compound_uri',
//            'drugbank_compound_uri',
            {
                header:'ConceptWiki Compound URI',
                dataIndex:'cw_compound_uri'
            },
            {
                header:'Chemspider Compound URI',
                dataIndex:'cs_compound_uri'
            },
            {
                header:'ChEMBL Compound URI',
                dataIndex:'chembl_compound_uri'
            },
            {
                header:'DrugBank Compound URI',
                dataIndex:'drugbank_compound_uri'
            },

//            'cw_target_uri',
//            'chembl_target_uri',
//            'drugbank_target_uri',
            {
                header:'ConceptWiki Target URI',
                dataIndex:'cw_target_uri'
            },
            {
                header:'ChEMBL Target URI',
                dataIndex:'chembl_target_uri'
            },
            {
                header:'DrugBank Target URI',
                dataIndex:'drugbank_target_uri'
            },
//            'chembl_assay_uri',
//            'chembl_activity_uri',
            {
                header:'ChEMBL Assay URI',
                dataIndex:'chembl_assay_uri'
            },
            {
                header:'ChEMBL Activity URI',
                dataIndex:'chembl_activity_uri'
            },
//            'target_title',
//            'target_organism',
            {
                header:'Target Label',
                dataIndex:'target_title'
            },
            {
                header:'Target Organism',
                dataIndex:'target_organism'
            },
//            'compound_preflabel',
//            'compound_uuid',
//            'compound_drug_type',
//            'compound_generic_name',
//            'compound_full_mwt',
//            'compound_num_ro5_violations',
//            'compound_inchi',
//            'compound_inchi_key',
//            'compound_smiles',
            {
                header:'Compound Label',
                dataIndex:'compound_preflabel'
            },
            {
                header:'Compound UUID',
                dataIndex:'compound_uuid'
            },
            {
                header:'Compound Drug Type',
                dataIndex:'compound_drug_type'
            },
            {
                header:'Compound Generic Name',
                dataIndex:'compound_generic_name'
            },
            {
                header:'Compound Full Molecular Weight',
                dataIndex:'compound_full_mwt'
            },
            {
                header:'Compound Rule of 5 violations',
                dataIndex:'compound_num_ro5_violations'
            },
            {
                header:'Compound Inchi',
                dataIndex:'compound_inchi'
            },
            {
                header:'Compound Inchi Key',
                dataIndex:'compound_inchi_key'
            },
            {
                header:'Compound SMILES',
                dataIndex:'compound_smiles'
            },
            //this is the good stuff (notice units and values are standardised by LDC)
//            'assay_organism',
//            'activity_activity_type',
//            'activity_relation',
//            'activity_standard_value',
//            'activity_standard_units',


            {
                header:'Assay Organism',
                dataIndex:'assay_organism'
            },
            {
                header:'Activity Type',
                dataIndex:'activity_activity_type'
            },
            {
                header:'Activity Relation',
                dataIndex:'activity_relation'
            },
            {
                header:'Activity Value',
                dataIndex:'activity_standard_value'
            },
            {
                header:'Activity Units',
                dataIndex:'activity_standard_units'
            }

        ]
    }
})
;
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.basestores.PaginatedFilteringStore', {
    extend:'LDA.store.basestores.FilteringStore',
	pageSize: 50,
	buffered: true,
	    proxy:{
	        type:'jsonp',
	        noCache:false,
	        startParam:undefined,
	limitParam:'_pageSize',
	pageParam:'_page',
	// sortParam:'_sort',
	        //this is the only query param handled natively by the proxy, all others are handled in store config below.
	        callbackKey:'_callback'
	    },

    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            this.stringEncoder.toQueryString(
                {
                    // _page:this._page,
                    // _pageSize:this._pageSize,
                    assay_organism:this.assay_organism,
                    activity_type:this.activity_type,
                    activity_value:this.activity_value,
					_orderBy:this.sort_column,
                    _format:this._format,
                    uri:this.uri
                });
        console.log('Proxy: ' + Ext.ClassManager.getName(this) + ' URL updated to: ' + this.proxy.url);
    },
    /**
     * Due to the asynchronous nature of the Linked Data API the total count is returned
     * by a separate call. The total can then be set using this function.
     */
    setTotalCount: function(count) {
        this.totalCount = count;
    }

});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.model.PharmacologyPaginatedModel', {
    extend:'Ext.data.Model',
    fields:[

        //for page
        'page_uri',
        'next_page',
        'previous_page',
        'page_size',
        'start_index',

        //for compound
        'compound_inchikey',
        'compound_drug_type',
        'compound_generic_name',
        'target_title',
        'target_concatenated_uris',

        'compound_inchikey_src',
        'compound_drug_type_src',
        'compound_generic_name_src',
        'target_title_src',
        'target_concatenated_uris_src',


        //for target
        'chembl_activity_uri',
        'chembl_compound_uri',
        'compound_full_mwt',
        'cw_compound_uri',
        'compound_pref_label',
        'cs_compound_uri',
		'csid',
        'compound_inchi',
        'compound_smiles',
        'chembl_assay_uri',
        'chembl_target_uri',
        //this is labelled assay_organism
        'target_organism',
        'target_pref_label',
        //this value is missing totally from compound pharmacology paginated
        'assay_organism',
        'activity_relation',
        'activity_standard_units',
        'activity_standard_value',
        'activity_activity_type',

        'compound_full_mwt_src',
        'compound_pref_label_src',
        'compound_inchi_src',
        'compound_smiles_src',
        'target_organism_src',
        'target_pref_label_src',
        'assay_organism_src',
        'activity_relation_src',
        'activity_standard_units_src',
        'activity_standard_value_src',
        'activity_activity_type_src'


    ]
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:29
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.CompoundPharmacologyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'CompoundPharmacologyPaginatedStore',
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology/pages?',

    constructor:function (config, arguments) {
		console.log('CompoundPharmacologyPaginatedStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.CompoundPharmacologyPaginatedReader');
		// this.proxy.limitParam = '_pageSize';
		// this.proxy.pageParam = '_page';
        this.callParent(arguments);
    },

});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.CompoundPharmacologyPaginatedReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
//    alias:'reader.ldajson',

    readRecords:function (data) {
	    console.log('LDA.helper.CompoundPharmacologyPaginatedReader: readRecords');
        var me = this;
        var records = new Array();

        //big chunk of data
        var result = data[LDA.helper.LDAConstants.LDA_RESULT];
        var page_uri = result[LDA.helper.LDAConstants.LDA_ABOUT];
        var next_page = result[LDA.helper.LDAConstants.LDA_PAGINATED_NEXT];
        var previous_page = result[LDA.helper.LDAConstants.LDA_PAGINATED_PREVIOUS];
        var page_size = result[LDA.helper.LDAConstants.LDA_PAGINATED_PAGE_SIZE];
        var start_index = result[LDA.helper.LDAConstants.LDA_PAGINATED_START_INDEX];

        var items = result[LDA.helper.LDAConstants.LDA_ITEMS];

        Ext.each(items, function (item, index, items) {
            var chembl_activity_uri = item[LDA.helper.LDAConstants.LDA_ABOUT];
            var chembl_src = item[LDA.helper.LDAConstants.LDA_IN_DATASET];

            //big bits
            var forMolecule = item[LDA.helper.LDAConstants.LDA_FOR_MOLECULE];
			if (forMolecule != null) {
            	var chembl_compound_uri = forMolecule[LDA.helper.LDAConstants.LDA_ABOUT];
            	var compound_full_mwt = forMolecule['full_mwt'];
            	var em = forMolecule[LDA.helper.LDAConstants.LDA_EXACT_MATCH];
			}

            var cw_compound_uri, compound_pref_label, cw_src,
                cs_compound_uri, compound_inchi , compound_inchikey, compound_smiles, cs_src,
                drugbank_compound_uri, compound_drug_type, compound_generic_name, drugbank_src;

            Ext.each(em, function (match, index, matches) {
                    var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                        cw_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
                        compound_pref_label = match['prefLabel'];
                        cw_src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                        cs_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
						csid = cs_compound_uri.split('/').pop();
                        compound_inchi = match['inchi'];
                        compound_inchikey = match['inchikey'];
                        compound_smiles = match['smiles'];
                        cs_src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                        drugbank_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
                        compound_drug_type = match['drugType'];
                        compound_generic_name = match['genericName'];
                        drugbank_src = match[LDA.helper.LDAConstants.LDA_ABOUT];
                    }
                }
            );

            var onAssay = item[LDA.helper.LDAConstants.LDA_ON_ASSAY];
			if (onAssay != null) {
            	var chembl_assay_uri = onAssay[LDA.helper.LDAConstants.LDA_ABOUT];
            	var target = onAssay['target'];
			}
			if (target != null) {
				// sometimes an array, sometimes a hash
				var target_inner;
				try {
					target_inner = target.pop();
				} catch (err) {
					// not an array this time
					// not very nice but we have to deal with the inconsistency somehow
					target_inner = target;
				}
            	var target_title = target_inner['title'];
            	var target_organism = target_inner['target_organisms'];
            	var target_concatenated_uris = target_inner['concatenatedURIs'];
			}


            var activity_activity_type = item['activity_type'];
            var activity_standard_value = item['standardValue'];
            var activity_standard_units = item['standardUnits'];
            var activity_relation = item['relation'];


            var record = Ext.create('LDA.model.PharmacologyPaginatedModel', {
                //for page
                page_uri:page_uri,
                next_page:next_page,
                previous_page:previous_page,
                page_size:page_size,
                start_index:start_index,

                //for compound
                compound_inchikey:compound_inchikey,
                compound_drug_type:compound_drug_type,
                compound_generic_name:compound_generic_name,
                target_title:target_title,
                target_concatenated_uris:target_concatenated_uris,

                compound_inchikey_src:cs_src,
                compound_drug_type_src:drugbank_src,
                compound_generic_name_src:drugbank_src,
                target_title_src:chembl_src,
                target_concatenated_uris_src:chembl_src,


                //for target
                chembl_activity_uri:chembl_activity_uri,
                chembl_compound_uri:chembl_compound_uri,
                compound_full_mwt:compound_full_mwt,
                cw_compound_uri:cw_compound_uri,
                compound_pref_label:compound_pref_label,
                cs_compound_uri:cs_compound_uri,
				csid:csid,
                compound_inchi:compound_inchi,
                compound_smiles:compound_smiles,
                chembl_assay_uri:chembl_assay_uri,
                chembl_target_uri:undefined,
                //this is labelled assay_organism - actually now seems to be target_organisms
                target_organism:target_organism,
                target_pref_label:undefined,
                //this value is missing totally from compound pharmacology paginated
                assay_organism:undefined,
                activity_relation:activity_relation,
                activity_standard_units:activity_standard_units,
                activity_standard_value:activity_standard_value,
                activity_activity_type:activity_activity_type,

                compound_full_mwt_src:chembl_src,
                compound_pref_label_src:cw_src,
                compound_inchi_src:cs_src,
                compound_smiles_src:cs_src,
                target_organism_src:chembl_src,
                target_pref_label_src:undefined,
                assay_organism_src:chembl_src,
                activity_relation_src:chembl_src,
                activity_standard_units_src:chembl_src,
                activity_standard_value_src:chembl_src,
                activity_activity_type_src:chembl_src
            });


            records.push(record);

//            console.log('LDA.model.PharmacologyPaginatedModel: CompoundPharmacologyPaginated');
//            console.log(JSON.stringify(record));
        });
		var total_count = this.total_count;
        return new Ext.data.ResultSet(
            {
                total:total_count,
                count:records.length,
                records:records,
                success:true,
                message:'loaded'
            });
    }

});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 27/06/2012
 * Time: 20:26
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.CompoundPharmacologyPaginatedGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.CompoundPharmacologyPaginatedGrid',
    store:Ext.create('LDA.store.CompoundPharmacologyPaginatedStore'),
    loadMask:true,
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },
        items:[

            //for page
//                        'page_uri',
//                        'next_page',
//                        'previous_page',
//                        'page_size',
//                        'start_index',

            {
                header:'Page URI',
                dataIndex:'page_uri'
            },
            {
                header:'Next Page URI',
                dataIndex:'next_page'
            },
            {
                header:'Previous Page URI',
                dataIndex:'previous_page'
            },
            {
                header:'Page Size',
                dataIndex:'page_size'
            },
            {
                header:'Start Index',
                dataIndex:'start_index'
            },
            //for compound
//            'compound_inchikey',
//            'compound_drug_type',
//            'compound_generic_name',
//            'target_title',
//            'target_concatenated_uris',

            {
                header:'InchiKey',
                dataIndex:'compound_inchikey'
            },
            {
                header:'Drug Type',
                dataIndex:'compound_drug_type'
            },
            {
                header:'Generic Name',
                dataIndex:'compound_generic_name'
            },
            {
                header:'Target Title',
                dataIndex:'target_title'
            },
            {
                header:'Target Concatenated URIs',
                dataIndex:'target_concatenated_uris'
            },

            //for target
//            'chembl_activity_uri',
//            'chembl_compound_uri',
//            'compound_full_mwt',
//            'cw_compound_uri',
//            'compound_pref_label',
//            'cs_compound_uri',
//            'compound_inchi',
//            'compound_smiles',
//            'chembl_assay_uri',
//            'chembl_target_uri',
//            //this is labelled assay_organism
//            'target_organism',
//            'target_pref_label',
//            //this value is missing totally from compound pharmacology paginated
//            'assay_organism',
//            'activity_relation',
//            'activity_standard_units',
//            'activity_standard_value',
//            'activity_activity_type',


            {
                header:'ChEMBL Activity URI',
                dataIndex:'chembl_activity_uri'
            },
            {
                header:'ChEMBL Compound URI',
                dataIndex:'chembl_compound_uri'
            },
            {
                header:'Compound Full Molecular Weight',
                dataIndex:'compound_full_mwt'
            },
            {
                header:'ConceptWiki Compound URI',
                dataIndex:'cw_compound_uri'
            },
            {
                header:'Compound Label',
                dataIndex:'compound_pref_label'
            },
            {
                header:'ChemSpider Compound URI',
                dataIndex:'cs_compound_uri'
            },
            {
                header:'Inchi',
                dataIndex:'compound_inchi'
            },
            {
                header:'Smiles',
                dataIndex:'compound_smiles'
            },
            {
                header:'ChEMBL Assay URI',
                dataIndex:'chembl_assay_uri'
            },
            {
                header:'ChEMBL Target URI',
                dataIndex:'chembl_target_uri'
            },
            {
                header:'Target Organism',
                dataIndex:'target_organism'
            },
            {
                header:'Target Label',
                dataIndex:'target_pref_label'
            },
            {
                header:'Activity Type',
                dataIndex:'activity_activity_type'
            },
            {
                header:'Activity Relation',
                dataIndex:'activity_relation'
            },
            {
                header:'Activity Value',
                dataIndex:'activity_standard_value'
            },
            {
                header:'Activity Units',
                dataIndex:'activity_standard_units'
            }
        ]
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 25/06/2012
 * Time: 15:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.CompoundReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],

    readRecords:function (data) {
        var pt = data['result']['primaryTopic'];
        var em = pt['exactMatch'];
        var chemspiderValue;
        var drugBankData;
		var chemblValue;
        Ext.each(em, function (match, index, matches) {
                var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                    chemspiderValue = match;
                } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                   drugBankData = match;
                } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                   chemblValue = match;
                }
            }
        );
        var record = Ext.create('LDA.model.CompoundModel', {
            cw_uri:pt[LDA.helper.LDAConstants.LDA_ABOUT],
            cs_uri:chemspiderValue[LDA.helper.LDAConstants.LDA_ABOUT],
            chembl_uri:chemblValue[LDA.helper.LDAConstants.LDA_ABOUT],
            drugbank_uri: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_ABOUT] : null,
            inchi:chemspiderValue['inchi'],
            inchi_src:chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            inchi_key:chemspiderValue['inchikey'],
            inchi_key_src:chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            smiles:chemspiderValue['smiles'],
            smiles_src:chemspiderValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            alogp:chemblValue['alogp'],
            alogp_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            full_mwt:chemblValue['full_mwt'],
            full_mwt_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            hba:chemblValue['hba'],
            hba_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            hbd:chemblValue['hbd'],
            hbd_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            molform:chemblValue['molform'],
            molform_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            mw_freebase:chemblValue['mw_freebase'],
            mw_freebase_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            psa:chemblValue['psa'],
            psa_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            rtb:chemblValue['rtb'],
            rtb_src:chemblValue[LDA.helper.LDAConstants.LDA_IN_DATASET],
            biotransformation: drugBankData != null ? drugBankData['biotransformation'] : null,
            biotransformation_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            description: drugBankData != null ? drugBankData['description'] : null,
            description_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            proteinBinding: drugBankData != null ? drugBankData['proteinBinding'] : null,
            proteinBinding_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            toxicity: drugBankData != null ? drugBankData['toxicity'] : null,
            toxicity_src: drugBankData != null ? drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET] : null,
            prefLabel:pt['prefLabel'],
            prefLabel_src:pt[LDA.helper.LDAConstants.LDA_IN_DATASET]
        });

//        console.log('LDA.model.CompoundModel: Compound');
//        console.log(JSON.stringify(record));

        return new Ext.data.ResultSet(
            {
                total:1,
                count:1,
                records:[record],
                success:true,
                message:'loaded'
            });
    }
})
;

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 26/06/2012
 * Time: 21:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.CompoundGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.CompoundGrid',
    store:Ext.create('LDA.store.CompoundStore'),
    loadMask:true,
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },
        items:[
            {
                header:'Name',
                dataIndex:'prefLabel',
                width:100
            },
            {
                header:'CW URI',
                dataIndex:'cw_uri',
                width:400
            },
            {
                header:'CS URI',
                dataIndex:'cs_uri',
                width:400
            },
            {
                header:'Chembl URI',
                dataIndex:'chembl_uri',
                width:400
            },
            {
                header:'Drugbank URI',
                dataIndex:'drugbank_uri',
                width:400
            },
            {
                header:'Inchi',
                dataIndex:'inchi',
                width:100
            },
            {
                header:'Inchi key',
                dataIndex:'inchi_key',
                width:100
            },
            {
                header:'Smiles',
                dataIndex:'smiles',
                width:100
            },
            {
                header:'A log P',
                dataIndex:'alogp',
                width:100
            },
            {
                header:'Full Molecular Weight',
                dataIndex:'full_mwt',
                width:100
            },
            {
                header:'Hydrogen bond acceptors',
                dataIndex:'hba',
                width:100
            },
            {
                header:'Hydrogen bond donors',
                dataIndex:'hbd',
                width:100
            },
            {
                header:'Molecular forn',
                dataIndex:'molform',
                width:100
            },
            {
                header:'Freebase molecular weight',
                dataIndex:'mw_freebase',
                width:100
            },
            {
                header:'Polar surface area',
                dataIndex:'psa',
                width:100
            },
            {
                header:'Rotatable bonds',
                dataIndex:'rtb',
                width:100
            },
            {
                header:'Biotransformation',
                dataIndex:'biotransformation',
                width:400
            },
            {
                header:'Description',
                dataIndex:'description',
                width:400
            },
            {
                header:'Protein binding',
                dataIndex:'proteinBinding',
                width:400
            },
            {
                header:'Toxicity',
                dataIndex:'toxicity',
                width:400
            }
        ]
    }
})
;
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 07:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.TargetReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],

    readRecords:function (data) {
        var pt = data[LDA.helper.LDAConstants.LDA_RESULT][LDA.helper.LDAConstants.LDA_PRIMARY_TOPIC];
        var em = pt[LDA.helper.LDAConstants.LDA_EXACT_MATCH];
        // var chemblData = em[0];
        // var drugBankData = em[1];
        var chemblData;
        var drugBankData;
        Ext.each(em, function (match, index, matches) {
                var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                    chemblData = match;
                } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                   drugBankData = match;
                }
            }
        );
		var chembl_src;
		if (chemblData != null) {			
        	chembl_src = chemblData[LDA.helper.LDAConstants.LDA_IN_DATASET];
		}
		if (drugBankData != null) {
        	var drugBank_src = drugBankData[LDA.helper.LDAConstants.LDA_IN_DATASET];			
		}
        var record = Ext.create('LDA.model.TargetModel', {
            cw_target_uri:pt[LDA.helper.LDAConstants.LDA_ABOUT],
            chembl_target_uri:chemblData[LDA.helper.LDAConstants.LDA_ABOUT],
            drugbank_target_uri:drugBankData[LDA.helper.LDAConstants.LDA_ABOUT],

            label:chemblData['label'],
            label_src:chembl_src,

            keywords:chemblData['keyword'],
            keywords_src:chembl_src,

            description:chemblData['description'],
            description_src:chembl_src,

            target_type:chemblData['target_type'],
            target_type_src:chembl_src,

            organism:chemblData['organism'],
            organism_src:chembl_src,

            synonyms:chemblData['synonyms'],
            synonyms_src:chembl_src,

            cellular_location:drugBankData['cellularLocation'],
            cellular_location_src:drugBank_src,

            molecular_weight:drugBankData['molecularWeight'],
            molecular_weight_src:drugBank_src,

            number_of_residues:drugBankData['numberOfResidues'],
            number_of_residues_src:drugBank_src,

            pdb_id_page:drugBankData['pdbIdPage'],
            pdb_id_page_src:drugBank_src,

            specific_function:drugBankData['specificFunction'],
            specific_function_src:drugBank_src,

            theoretical_pi:drugBankData['theoreticalPi'],
            theoretical_pi_src:drugBank_src
        });

//        console.log('LDA.model.TargetModel: Target');
//        console.log(JSON.stringify(record));

        return new Ext.data.ResultSet(
            {
                total:1,
                count:1,
                records:[record],
                success:true,
                message:'loaded'
            });
    }
})
;

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 04/07/2012
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.TargetGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.TargetGrid',
    store:Ext.create('LDA.store.TargetStore'),
    loadMask:true,


    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },

        items:[
            {
                header:'ConceptWiki Target URI',
                dataIndex:'cw_target_uri',
                width:100
            },
            {
                header:'ChEMBL Target URI',
                dataIndex:'chembl_target_uri',
                width:100
            },
            {
                header:'DrugBank Target URI',
                dataIndex:'drugbank_target_uri',
                width:100
            }            ,
            {
                header:'Name',
                dataIndex:'label',
                width:100
            }
            ,
            {
                header:'Keywords',
                dataIndex:'keywords',
                width:100
            }
            ,
            {
                header:'Description',
                dataIndex:'description',
                width:100
            }
            ,
            {
                header:'Target Type',
                dataIndex:'target_type',
                width:100
            },
            {
                header:'Organism',
                dataIndex:'organism',
                width:100
            },
            {
                header:'Synonyms',
                dataIndex:'synonyms',
                width:100
            }
            ,
            {
                header:'Cellular Location',
                dataIndex:'cellular_location',
                width:100
            }
            ,
            {
                header:'Molecular Weight',
                dataIndex:'molecular_weight',
                width:100
            }
            ,
            {
                header:'Number of Residues',
                dataIndex:'number_of_residues',
                width:100
            }
            ,
            {
                header:'PDB ID',
                dataIndex:'pdb_id_page',
                width:100
            }
            ,
            {
                header:'Specific Function',
                dataIndex:'specific_function',
                width:100
            }
            ,
            {
                header:'Theoretical Pi',
                dataIndex:'theoretical_pi',
                width:100
            }
        ]


    }
})
;

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:23
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.store.TargetPharmacologyStore', {
    extend:'LDA.store.basestores.FilteringStore',
    model:'LDA.model.PharmacologyModel',
    storeId:'TargetPharmacologyStore',
    BASE_URL:'http://ops.few.vu.nl/target/pharmacology?',
	    proxy:{
	        type:'jsonp',
	        noCache:false,
	        startParam:undefined,
	limitParam:undefined,
	pageParam:undefined,
	        //this is the only query param handled natively by the proxy, all others are handled in store config below.
	        callbackKey:'_callback'
	    },

    constructor:function (config, arguments) {
        this.proxy.reader = Ext.create('LDA.helper.TargetPharmacologyReader');
        this.callParent(arguments);
    }
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.TargetPharmacologyReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
    readRecords:function (data) {
        var me = this;
        var records = new Array();

        //big chunks of data
        var pt = data[LDA.helper.LDAConstants.LDA_RESULT][LDA.helper.LDAConstants.LDA_PRIMARY_TOPIC];
        var em = pt[LDA.helper.LDAConstants.LDA_EXACT_MATCH];
        var chemblData = em[1];

        var cw_target_uri = pt[LDA.helper.LDAConstants.LDA_ABOUT];
        var chembl_target_uri = chemblData[LDA.helper.LDAConstants.LDA_ABOUT];

        var chembl_src = chemblData[LDA.helper.LDAConstants.LDA_IN_DATASET];

        var targetTitle = chemblData['title'];
        //this is labelled assay_organism in lda but is actually target organism
        var targetOrganism = chemblData['assay_organism'];

        var targetPrefLabel = pt['prefLabel'];


        var targetOfAssay = chemblData[LDA.helper.LDAConstants.LDA_TARGET_OF_ASSAY];

        Ext.each(targetOfAssay, function (assay, index, assays) {
            var chembl_assay_uri = assay[LDA.helper.LDAConstants.LDA_ABOUT];
            var assayOrganism = assay['assay_organism'];

            var assayOfActivity = assay[LDA.helper.LDAConstants.LDA_ASSAY_OF_ACTIVITY];

            Ext.each(assayOfActivity, function (activity, index, activities) {
                var chembl_activity_uri = activity[LDA.helper.LDAConstants.LDA_ABOUT];
                var activity_type = activity['activity_type'];
                var relation = activity['relation'];
                var standardValue = activity['standardValue'];
                var standardUnits = activity['standardUnits'];

                var forMolecule = activity[LDA.helper.LDAConstants.LDA_FOR_MOLECULE];
                var forMoleculeExactMatch = forMolecule[LDA.helper.LDAConstants.LDA_EXACT_MATCH];

                var chembl_compound_uri = forMolecule[LDA.helper.LDAConstants.LDA_ABOUT];

                var chemspiderData = undefined;
                var conceptWikiData = undefined;

                if (forMoleculeExactMatch.length == 2) {
                    var src = forMoleculeExactMatch[0][LDA.helper.LDAConstants.LDA_IN_DATASET];
                    if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                        chemspiderData = forMoleculeExactMatch[0];
                        conceptWikiData = forMoleculeExactMatch[1];
                    } else {
                        chemspiderData = forMoleculeExactMatch[1];
                        conceptWikiData = forMoleculeExactMatch[0];
                    }
                }

                //chembl bit of compound data
                var full_mwt = forMolecule['full_mwt'];
                var num_ro5_violations = forMolecule['num_ro5_violations'];

                //chemspider bit
                if (chemspiderData) {
                    var cs_compound_uri = chemspiderData[LDA.helper.LDAConstants.LDA_ABOUT];
                    var chemspider_src = chemspiderData[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    var inchi = chemspiderData['inchi'];
                    var smiles = chemspiderData['smiles'];
                }

                //conceptwiki bit
                if (conceptWikiData) {
                    var cw_compound_uri = conceptWikiData[LDA.helper.LDAConstants.LDA_ABOUT];
                    var conceptwiki_src = conceptWikiData[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    var compoundPrefLabel = conceptWikiData['prefLabel'];
                }


                var record = new LDA.model.PharmacologyModel({
                        cs_compound_uri:cs_compound_uri,
                        cw_compound_uri:cw_compound_uri,
                        chembl_compound_uri:chembl_compound_uri,
                        drugbank_compound_uri:undefined,

                        cw_target_uri:cw_target_uri,
                        chembl_target_uri:chembl_target_uri,
                        drugbank_target_uri:undefined,

                        chembl_assay_uri:chembl_assay_uri,

                        chembl_activity_uri:chembl_activity_uri,

                        //for target pharma
                        target_preflabel:targetPrefLabel,
                        target_preflabel_src:conceptwiki_src,

                        target_title:targetTitle,
                        target_title_src:chembl_src,

                        target_organism:targetOrganism,
                        target_organism_src:chembl_src,
                        //
                        //                        //for compound pharma (is CW UUID) (this seems to be missing in latest LDA 3/7/12)
                        compound_uuid:undefined,
                        compound_uuid_src:undefined,

                        compound_drug_type:undefined,
                        compound_drug_type_src:undefined,

                        compound_generic_name:undefined,
                        compound_generic_name_src:undefined,

                        compound_full_mwt:full_mwt,
                        compound_full_mwt_src:chembl_src,

                        compound_num_ro5_violations:num_ro5_violations,
                        compound_num_ro5_violations_src:chembl_src,

                        compound_inchi:inchi,
                        compound_inchi_src:chemspider_src,

                        compound_inchi_key:undefined,
                        compound_inchi_key_src:undefined,

                        compound_smiles:smiles,
                        compound_smiles_src:chemspider_src,

                        compound_preflabel:compoundPrefLabel,
                        compound_preflabel_src:conceptwiki_src,

                        assay_organism:assayOrganism,
                        assay_organism_src:chembl_src,

                        activity_relation:relation,
                        activity_relation_src:chembl_src,

                        activity_standard_units:standardUnits,
                        activity_standard_units_src:chembl_src,

                        activity_standard_value:standardValue,
                        activity_standard_value_src:chembl_src,

                        activity_activity_type:activity_type,
                        activity_activity_type_src:chembl_src

                    }
                );
                records.push(record);
            });
        });

        return new Ext.data.ResultSet(
            {
                total:records.length,
                count:records.length,
                records:records,
                success:true,
                message:'loaded'
            });
    }
})
;

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 04/07/2012
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.TargetPharmacologyGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.TargetPharmacologyGrid',
    store:Ext.create('LDA.store.TargetPharmacologyStore'),
    loadMask:true,
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },

        items:[
            //            'cw_target_uri',
            //            'chembl_target_uri',
            //            'drugbank_target_uri',
            {
                header:'ConceptWiki Target URI',
                dataIndex:'cw_target_uri'
            },
            {
                header:'ChEMBL Target URI',
                dataIndex:'chembl_target_uri'
            },
            {
                header:'DrugBank Target URI',
                dataIndex:'drugbank_target_uri'
            },
            //            'cs_compound_uri',
            //            'cw_compound_uri',
            //            'chembl_compound_uri',
            //            'drugbank_compound_uri',
            {
                header:'ConceptWiki Compound URI',
                dataIndex:'cw_compound_uri'
            },
            {
                header:'Chemspider Compound URI',
                dataIndex:'cs_compound_uri'
            },
            {
                header:'ChEMBL Compound URI',
                dataIndex:'chembl_compound_uri'
            },
            {
                header:'DrugBank Compound URI',
                dataIndex:'drugbank_compound_uri'
            },
            //            'chembl_assay_uri',
            //            'chembl_activity_uri',
            {
                header:'ChEMBL Assay URI',
                dataIndex:'chembl_assay_uri'
            },
            {
                header:'ChEMBL Activity URI',
                dataIndex:'chembl_activity_uri'
            },
            //            'target_preflabel',
            //            'target_title',
            //            'target_organism',
            {
                header:'Target Preferred Label',
                dataIndex:'target_preflabel'
            },
            {
                header:'Target Label',
                dataIndex:'target_title'
            },
            {
                header:'Target Organism',
                dataIndex:'target_organism'
            },
            //            'compound_preflabel',
            //            'compound_drug_type',
            //            'compound_generic_name',
            //            'compound_full_mwt',
            //            'compound_num_ro5_violations',
            //            'compound_inchi',
            //            'compound_inchi_key',
            //            'compound_smiles',
            {
                header:'Compound Label',
                dataIndex:'compound_preflabel'
            },
            {
                header:'Compound Drug Type',
                dataIndex:'compound_drug_type'
            },
            {
                header:'Compound Generic Name',
                dataIndex:'compound_generic_name'
            },
            {
                header:'Compound Full Molecular Weight',
                dataIndex:'compound_full_mwt'
            },
            {
                header:'Compound Rule of 5 violations',
                dataIndex:'compound_num_ro5_violations'
            },
            {
                header:'Compound Inchi',
                dataIndex:'compound_inchi'
            },
            {
                header:'Compound Inchi Key',
                dataIndex:'compound_inchi_key'
            },
            {
                header:'Compound SMILES',
                dataIndex:'compound_smiles'
            },
            //this is the good stuff (notice units and values are standardised by LDC)
            //            'assay_organism',
            //            'activity_activity_type',
            //            'activity_relation',
            //            'activity_standard_value',
            //            'activity_standard_units',
            {
                header:'Assay Organism',
                dataIndex:'assay_organism'
            },
            {
                header:'Activity Type',
                dataIndex:'activity_activity_type'
            },
            {
                header:'Activity Relation',
                dataIndex:'activity_relation'
            },
            {
                header:'Activity Value',
                dataIndex:'activity_standard_value'
            },
            {
                header:'Activity Units',
                dataIndex:'activity_standard_units'
            }

        ]
    }
})
;
Ext.define('LSP.view.dropdowns.conceptWikiProteinLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.conceptWikiProteinLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'concept_label'},
            {type:'string', name:'concept_url'},
            {type:'string', name:'define_url'},
            {type:'string', name:'concept_uuid'},
            {type:'string', name:'concept_alt_labels'},
            {type:'string', name:'tag_label'},
            {type:'string', name:'tag_uuid'},
            {type:'string', name:'match'}

        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/concept_wiki_api_calls/protein_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
    valueField:'concept_url',
    displayField:'concept_label',
    name:'protein_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    allowBlank:false,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    fieldLabel:'Protein name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching proteins found.',
        getInnerTpl:function () {
//                    return '<p><font face="verdana" color="grey"><small>Match: {match}</small></font><br/><b>{concept_label}</b> <a href="{define_url}" target="_blank">(definition)</a><br/ ><small>Alt. terms: <i>{concept_alt_labels}</i></small></p>';
            return '<p><span style="font-family: verdana; color: grey; "><small>Match: {match}</small></span><br/><b>{concept_label}</b> <a href="{define_url}" target="_blank">(definition)</a></p>';
        }
    }
});
         
           
/**
 * Created by JetBrains RubyMine.
 * User: jameseales
 * Date: 04/04/2012
 * Time: 11:52
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.model.GuiComponent', {
    extend:'Ext.data.Model',
    fields:['xtype', 'url', 'id', 'text', 'home']
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:24
 * To change this template use File | Settings | File Templates.
 */

Ext.define('LDA.store.TargetPharmacologyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'TargetPharmacologyPaginatedStore',
    BASE_URL:'http://ops.few.vu.nl/target/pharmacology/pages?',

    constructor:function (config, arguments) {
		console.log('TargetPharmacologyPaginatedStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.TargetPharmacologyPaginatedReader');
        this.callParent(arguments);
    }
	
});
/**
 * Created by JetBrains RubyMine.
 * User: jameseales
 * Date: 03/04/2012
 * Time: 12:42
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.store.GuiComponents', {
        extend:'Ext.data.Store',
        id:'GuiComponents',
        model:'LSP.model.GuiComponent',
        autoLoad:true,

        proxy:{
            type:'ajax',
            extraParams:{type:'grid'},
            url:'application_modules.json',
            reader:{
                type:'json'
            }
        },

        listeners:{
            load:{
                //triggered when GuiComponents store has loaded
                //load is triggered automatically by NavigationTree controller creation
                //check for an initial history token
                //then pass it to the central Viewport history token handler method, bypassing history change
                fn:function () {
                    var currentToken = Ext.History.getToken();
//                    console.log('GuiComponents onLoad: Initial HistoryToken: ' + currentToken);
                    if (currentToken) {
                        if (currentToken.length > 0) {
                            var viewPort = Ext.ComponentQuery.query('lspviewport')[0];
                            viewPort.handleHistoryToken(currentToken);
                        }
                    }
                }
            }
        }
    }
);

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.controller.NavigationTree', {
    extend:'Ext.app.Controller',

    stores:['NavigationTree', 'GuiComponents'],

    views:[
        'Appmoduletree'
    ],

    init:function () {

    }

});
Ext.define('LSP.view.target_by_name.TargetByNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.TargetByNameForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiProteinLookup',
        // 'LSP.view.dynamicgrid.DynamicGrid',
        'LSP.view.target_by_name.TargetPanel'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {

        this.items = [
            {
                xtype:'label',
                html:'<span style="font-family: verdana; color: grey; ">Hint: Start typing in protein name and species. E.g. \"Adenosine receptor A2a (Homo sapiens)\"</span>',
                labelWidth:400,
                padding:'5 0 0 140'
            },
            {
                xtype:'container',
                margin:'0 5 5 5',
                name:'form_fields',
                layout:{
                    type:'column'
                },
                style:'background-color: #fff;',
                items:[
                    {
                        xtype:'conceptWikiProteinLookup',
                        itemId:'targetByNameLookup'
                    },
                    {
                        xtype:'button',
                        padding:'5 5 5 5',
                        text:'Search',
                        itemId:'TargetByNameSubmit_id',
                        disabled:true,
                        action:'query_target_by_name'
                    }
                ]
            },
            {
                xtype:'TargetPanel',
                flex:1
            }
        ];
        this.callParent(arguments);
    }
});

Ext.define('LSP.controller.TargetByNameForm', {
        extend:'Ext.app.Controller',
        models:['LDA.model.TargetModel'],
        stores:['LDA.store.TargetStore'],
        views:['target_by_name.TargetByNameForm', 'target_by_name.TargetPanel'],

        refs:[
            {
                ref:'targetPanel',
                selector:'TargetPanel'
            },
            {
                ref:'formView',
                selector:'TargetByNameForm'
            },
            {
                ref:'submitButton',
                selector:'#TargetByNameSubmit_id'

            },
            {
                ref:'lookup',
                selector:'#targetByNameLookup'
            }
        ],

        init:function () {
            this.control({
                'TargetByNameForm button[action=query_target_by_name]':{
                    click:this.submitQuery
                },
                'TargetByNameForm conceptWikiProteinLookup':{
                    select:this.enableSubmit
                },
                'TargetByNameForm':{
                    historyToken:this.handleHistoryToken
                }
            });
        },

        handleHistoryToken:function (historyTokenObject) {
			console.log('LSP.controller.TargetByNameForm: handleHistoryToken()');
			var me = this;
			var target_panel = me.getFormView().down("TargetPanel");
            if (historyTokenObject.u) {
                var store = this.getLDAStoreTargetStoreStore();
                if (historyTokenObject.u != store.proxy.extraParams.uri) {
                    store.proxy.extraParams.uri = historyTokenObject.u;
                    me.getFormView().setLoading(true);
                    store.load(function(records, operation, success) {
						console.log('LSP.controller.TargetByNameForm: store is loaded ' + success);
						if (success) {
							me.getSubmitButton().enable();
							target_panel.setValues(records[0]);
							target_panel.down("#dp").setVisible(true);
							target_panel.down('#msg').setVisible(false);
							me.getFormView().setLoading(false);
				        } else {
				            me.getFormView().down("TargetPanel").showMessage('Server did not respond');
				        }
					});
                }
            } else if (historyTokenObject.s) {
                var lookup = this.getLookup();
                lookup.setRawValue(historyTokenObject.s);
                lookup.doQuery(historyTokenObject.s);
            }
        },

        enableSubmit:function () {
            var form = this.getFormView();
            var button = this.getSubmitButton();
            button.enable();
        },

        submitQuery:function (button) {
            button.disable();
            var form = this.getFormView();
            var target_uri = form.getValues().protein_uri;
            Ext.History.add('!p=TargetByNameForm&u=' + target_uri);
        }
    }
);

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 29/06/2012
 * Time: 11:32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.helper.TargetPharmacologyPaginatedReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
    readRecords:function (data) {
        var me = this;
        var records = new Array();

        //big chunk of data
        var result = data[LDA.helper.LDAConstants.LDA_RESULT];
        var page_uri = result[LDA.helper.LDAConstants.LDA_ABOUT];
        var next_page = result[LDA.helper.LDAConstants.LDA_PAGINATED_NEXT];
        var previous_page = result[LDA.helper.LDAConstants.LDA_PAGINATED_PREVIOUS];
        var page_size = result[LDA.helper.LDAConstants.LDA_PAGINATED_PAGE_SIZE];
        var start_index = result[LDA.helper.LDAConstants.LDA_PAGINATED_START_INDEX];

        var items = result[LDA.helper.LDAConstants.LDA_ITEMS];

        Ext.each(items, function (item, index, items) {
            var chembl_activity_uri = item[LDA.helper.LDAConstants.LDA_ABOUT];
            var chembl_src = item[LDA.helper.LDAConstants.LDA_IN_DATASET];

            //big bits
            var forMolecule = item[LDA.helper.LDAConstants.LDA_FOR_MOLECULE];
            var chembl_compound_uri = forMolecule[LDA.helper.LDAConstants.LDA_ABOUT];
            var compound_full_mwt = forMolecule['full_mwt'];

            var em = forMolecule[LDA.helper.LDAConstants.LDA_EXACT_MATCH];

            var cw_compound_uri, compound_pref_label, cw_src,
                cs_compound_uri, compound_inchi , compound_inchikey, compound_smiles, cs_src,
                drugbank_compound_uri, compound_drug_type, compound_generic_name, drugbank_src;

            Ext.each(em, function (match, index, matches) {
                    var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                        cw_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
                        compound_pref_label = match['prefLabel'];
                        cw_src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                        cs_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
						csid = cs_compound_uri.split('/').pop();
                        compound_inchi = match['inchi'];
                        compound_inchikey = match['inchikey'];
                        compound_smiles = match['smiles'];
                        cs_src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    } else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                        drugbank_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
                        compound_drug_type = match['drugType'];
                        compound_generic_name = match['genericName'];
                        drugbank_src = match[LDA.helper.LDAConstants.LDA_ABOUT];
                    }
                }
            );

            var onAssay = item[LDA.helper.LDAConstants.LDA_ON_ASSAY];
            var chembl_assay_uri = onAssay[LDA.helper.LDAConstants.LDA_ABOUT];
            var assay_organism = onAssay['assay_organism'];

            var target = onAssay['target'];
            var chembl_target_uri = target[LDA.helper.LDAConstants.LDA_ABOUT];
            var target_pref_label = target['prefLabel'];
            var target_title = target['title'];
            var target_organism = target['assay_organism'];
            var target_concatenated_uris = target['concatenatedURIs'];


            var activity_activity_type = item['activity_type'];
            var activity_standard_value = item['standardValue'];
            var activity_standard_units = item['standardUnits'];
            var activity_relation = item['relation'];


            var record = Ext.create('LDA.model.PharmacologyPaginatedModel', {
                //for page
                page_uri:page_uri,
                next_page:next_page,
                previous_page:previous_page,
                page_size:page_size,
                start_index:start_index,

                //for compound
                compound_inchikey:compound_inchikey,
                compound_drug_type:compound_drug_type,
                compound_generic_name:compound_generic_name,
                target_title:target_title,
                target_concatenated_uris:target_concatenated_uris,

                compound_inchikey_src:cs_src,
                compound_drug_type_src:drugbank_src,
                compound_generic_name_src:drugbank_src,
                target_title_src:chembl_src,
                target_concatenated_uris_src:chembl_src,


                //for target
                chembl_activity_uri:chembl_activity_uri,
                chembl_compound_uri:chembl_compound_uri,
                compound_full_mwt:compound_full_mwt,
                cw_compound_uri:cw_compound_uri,
                compound_pref_label:compound_pref_label,
                cs_compound_uri:cs_compound_uri,
				csid:csid,
                compound_inchi:compound_inchi,
                compound_smiles:compound_smiles,
                chembl_assay_uri:chembl_assay_uri,
                chembl_target_uri:chembl_target_uri,
                //this is labelled assay_organism
                target_organism:target_organism,
                target_pref_label:target_pref_label,
                //this value is missing totally from compound pharmacology paginated
                assay_organism:assay_organism,
                activity_relation:activity_relation,
                activity_standard_units:activity_standard_units,
                activity_standard_value:activity_standard_value,
                activity_activity_type:activity_activity_type,

                compound_full_mwt_src:chembl_src,
                compound_pref_label_src:cw_src,
                compound_inchi_src:cs_src,
                compound_smiles_src:cs_src,
                target_organism_src:chembl_src,
                target_pref_label_src:cw_src,
                assay_organism_src:chembl_src,
                activity_relation_src:chembl_src,
                activity_standard_units_src:chembl_src,
                activity_standard_value_src:chembl_src,
                activity_activity_type_src:chembl_src
            });


            records.push(record);

//            console.log('LDA.model.TargetPaginatedModel: TargetPharmacologyPaginated');
//            console.log(JSON.stringify(record));
        });
		var total_count = this.total_count;
        return new Ext.data.ResultSet(
            {
                total:total_count,
                count:records.length,
                records:records,
                success:true,
                message:'loaded'
            });
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 04/07/2012
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.TargetPharmacologyPaginatedGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.TargetPharmacologyPaginatedGrid',
    store:Ext.create('LDA.store.TargetPharmacologyPaginatedStore'),
    loadMask:true,
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },

        items:[

            //for page
//                        'page_uri',
//                        'next_page',
//                        'previous_page',
//                        'page_size',
//                        'start_index',

            {
                header:'Page URI',
                dataIndex:'page_uri'
            },
            {
                header:'Next Page URI',
                dataIndex:'next_page'
            },
            {
                header:'Previous Page URI',
                dataIndex:'previous_page'
            },
            {
                header:'Page Size',
                dataIndex:'page_size'
            },
            {
                header:'Start Index',
                dataIndex:'start_index'
            },
            //for compound
//            'compound_inchikey',
//            'compound_drug_type',
//            'compound_generic_name',
//            'target_title',
//            'target_concatenated_uris',

            {
                header:'InchiKey',
                dataIndex:'compound_inchikey'
            },
            {
                header:'Drug Type',
                dataIndex:'compound_drug_type'
            },
            {
                header:'Generic Name',
                dataIndex:'compound_generic_name'
            },
            {
                header:'Target Title',
                dataIndex:'target_title'
            },
            {
                header:'Target Concatenated URIs',
                dataIndex:'target_concatenated_uris'
            },

            //for target
//            'chembl_activity_uri',
//            'chembl_compound_uri',
//            'compound_full_mwt',
//            'cw_compound_uri',
//            'compound_pref_label',
//            'cs_compound_uri',
//            'compound_inchi',
//            'compound_smiles',
//            'chembl_assay_uri',
//            'chembl_target_uri',
//            //this is labelled assay_organism
//            'target_organism',
//            'target_pref_label',
//            //this value is missing totally from compound pharmacology paginated
//            'assay_organism',
//            'activity_relation',
//            'activity_standard_units',
//            'activity_standard_value',
//            'activity_activity_type',


            {
                header:'ChEMBL Activity URI',
                dataIndex:'chembl_activity_uri'
            },
            {
                header:'ChEMBL Compound URI',
                dataIndex:'chembl_compound_uri'
            },
            {
                header:'Compound Full Molecular Weight',
                dataIndex:'compound_full_mwt'
            },
            {
                header:'ConceptWiki Compound URI',
                dataIndex:'cw_compound_uri'
            },
            {
                header:'Compound Label',
                dataIndex:'compound_pref_label'
            },
            {
                header:'ChemSpider Compound URI',
                dataIndex:'cs_compound_uri'
            },
            {
                header:'Inchi',
                dataIndex:'compound_inchi'
            },
            {
                header:'Smiles',
                dataIndex:'compound_smiles'
            },
            {
                header:'ChEMBL Assay URI',
                dataIndex:'chembl_assay_uri'
            },
            {
                header:'ChEMBL Target URI',
                dataIndex:'chembl_target_uri'
            },
            {
                header:'Target Organism',
                dataIndex:'target_organism'
            },
            {
                header:'Target Label',
                dataIndex:'target_pref_label'
            },
            {
                header:'Activity Type',
                dataIndex:'activity_activity_type'
            },
            {
                header:'Activity Relation',
                dataIndex:'activity_relation'
            },
            {
                header:'Activity Value',
                dataIndex:'activity_standard_value'
            },
            {
                header:'Activity Units',
                dataIndex:'activity_standard_units'
            }
        ]
    }
});
Ext.define('LDA.store.EnzymeFamilyPaginatedStore', {
    extend:'LDA.store.basestores.PaginatedFilteringStore',
    model:'LDA.model.PharmacologyPaginatedModel',
    storeId:'EnzymeFamilyPaginatedStore',
    BASE_URL:'http://ops.few.vu.nl/target/enzyme/pharmacology/pages?',

    constructor:function (config, arguments) {
		console.log('EnzymeFamilyPaginatedStore: constructor()');
        this.proxy.reader = Ext.create('LDA.helper.EnzymeFamilyPaginatedReader');
        this.callParent(arguments);
    }
});
Ext.define('LDA.helper.EnzymeFamilyPaginatedReader', {
    extend:'Ext.data.reader.Json',
    requires:['LDA.helper.LDAConstants'],
    readRecords:function (data) {
	    console.log("LDA.helper.EnzymeFamilyPaginatedReader: readRecords()");
	    console.log(data);
        var me = this;
        var records = new Array();

        //big chunk of data
        var result = data[LDA.helper.LDAConstants.LDA_RESULT];
        var page_uri = result[LDA.helper.LDAConstants.LDA_ABOUT];
        var next_page = result[LDA.helper.LDAConstants.LDA_PAGINATED_NEXT];
        var previous_page = result[LDA.helper.LDAConstants.LDA_PAGINATED_PREVIOUS];
        var page_size = result[LDA.helper.LDAConstants.LDA_PAGINATED_PAGE_SIZE];
        var start_index = result[LDA.helper.LDAConstants.LDA_PAGINATED_START_INDEX];

        var items = result[LDA.helper.LDAConstants.LDA_ITEMS];

        Ext.each(items, function (item, index, items) {
	        console.log(index);
            var chembl_activity_uri = item[LDA.helper.LDAConstants.LDA_ABOUT];
            var chembl_src = item[LDA.helper.LDAConstants.LDA_IN_DATASET];

            //big bits
            var forMolecule = item[LDA.helper.LDAConstants.LDA_FOR_MOLECULE];
			if (forMolecule != null) {
				var chembl_compound_uri = forMolecule[LDA.helper.LDAConstants.LDA_ABOUT];
				var compound_full_mwt = forMolecule['full_mwt'];
				var em = forMolecule[LDA.helper.LDAConstants.LDA_EXACT_MATCH];
			}
            var cw_compound_uri, compound_pref_label, cw_src,
                cs_compound_uri, compound_inchi , compound_inchikey, compound_smiles, cs_src,
                drugbank_compound_uri, compound_drug_type, compound_generic_name, drugbank_src;
			if (forMolecule != null) {
            	Ext.each(em, function (match, index, matches) {
                    	var src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    	if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                        	cw_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
                        	compound_pref_label = match['prefLabel'];
                        	cw_src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    	} else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                        	cs_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
							csid = cs_compound_uri.split('/').last();
                        	compound_inchi = match['inchi'];
                        	compound_inchikey = match['inchikey'];
                        	compound_smiles = match['smiles'];
                        	cs_src = match[LDA.helper.LDAConstants.LDA_IN_DATASET];
                    	} else if (LDA.helper.LDAConstants.LDA_SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                        	drugbank_compound_uri = match[LDA.helper.LDAConstants.LDA_ABOUT];
                        	compound_drug_type = match['drugType'];
                        	compound_generic_name = match['genericName'];
                        	drugbank_src = match[LDA.helper.LDAConstants.LDA_ABOUT];
                    	}
                	}
            	);
			}

            var onAssay = item[LDA.helper.LDAConstants.LDA_ON_ASSAY];
			if (onAssay != null) {
            	var chembl_assay_uri = onAssay[LDA.helper.LDAConstants.LDA_ABOUT];
            	var assay_organism = onAssay['assay_organism'];
            	var target = onAssay['target'];
				if (target != null) {
            		var chembl_target_uri = target[LDA.helper.LDAConstants.LDA_ABOUT];
            		var target_pref_label = target['prefLabel'];
            		var target_title = target['title'];
            		var target_organism = target['assay_organism'];
            		var target_concatenated_uris = target['concatenatedURIs'];
				}
			}

            var activity_activity_type = item['activity_type'];
            var activity_standard_value = item['standardValue'];
            var activity_standard_units = item['standardUnits'];
            var activity_relation = item['relation'];


            var record = Ext.create('LDA.model.PharmacologyPaginatedModel', {
                //for page
                page_uri:page_uri,
                next_page:next_page,
                previous_page:previous_page,
                page_size:page_size,
                start_index:start_index,

                //for compound
                compound_inchikey:compound_inchikey,
                compound_drug_type:compound_drug_type,
                compound_generic_name:compound_generic_name,
                target_title:target_title,
                target_concatenated_uris:target_concatenated_uris,

                compound_inchikey_src:cs_src,
                compound_drug_type_src:drugbank_src,
                compound_generic_name_src:drugbank_src,
                target_title_src:chembl_src,
                target_concatenated_uris_src:chembl_src,


                //for target
                chembl_activity_uri:chembl_activity_uri,
                chembl_compound_uri:chembl_compound_uri,
                compound_full_mwt:compound_full_mwt,
                cw_compound_uri:cw_compound_uri,
                compound_pref_label:compound_pref_label,
                cs_compound_uri:cs_compound_uri,
				csid:csid,
                compound_inchi:compound_inchi,
                compound_smiles:compound_smiles,
                chembl_assay_uri:chembl_assay_uri,
                chembl_target_uri:chembl_target_uri,
                //this is labelled assay_organism
                target_organism:target_organism,
                target_pref_label:target_pref_label,
                //this value is missing totally from compound pharmacology paginated
                assay_organism:assay_organism,
                activity_relation:activity_relation,
                activity_standard_units:activity_standard_units,
                activity_standard_value:activity_standard_value,
                activity_activity_type:activity_activity_type,

                compound_full_mwt_src:chembl_src,
                compound_pref_label_src:cw_src,
                compound_inchi_src:cs_src,
                compound_smiles_src:cs_src,
                target_organism_src:chembl_src,
                target_pref_label_src:cw_src,
                assay_organism_src:chembl_src,
                activity_relation_src:chembl_src,
                activity_standard_units_src:chembl_src,
                activity_standard_value_src:chembl_src,
                activity_activity_type_src:chembl_src
            });


            records.push(record);

//            console.log('LDA.model.TargetPaginatedModel: TargetPharmacologyPaginated');
//            console.log(JSON.stringify(record));
        });
		var total_count = this.total_count;
        return new Ext.data.ResultSet(
            {
                total:total_count,
                count:records.length,
                records:records,
                success:true,
                message:'loaded'
            });
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 04/07/2012
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.grids.EnzymeFamilyPaginatedGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.EnzymeFamilyPaginatedGrid',
    store:Ext.create('LDA.store.EnzymeFamilyPaginatedStore'),
    loadMask:true,
    columns:{
        defaults:{
            renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
                    var data = this.columns[colIndex].dataIndex;
                    data += '_src';
                    var source = record.data[data];
                    var cls = LDA_SRC_CLS_MAPPINGS[source];
                    if (!cls) {
                        cls = 'defaultValue';
                    }
//                    console.log(data + ' : ' + source + ' : ' + cls);
                    cls += LDAProvenanceMode;
                    if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
                        //this needs an img adding in
                        return '<div class="' + cls + '">' + value + '</div>';
                    } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
                        return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
                    }
                } else {
                    return value;
                }
            }
        },

        items:[

            //for page
//                        'page_uri',
//                        'next_page',
//                        'previous_page',
//                        'page_size',
//                        'start_index',

            {
                header:'Page URI',
                dataIndex:'page_uri'
            },
            {
                header:'Next Page URI',
                dataIndex:'next_page'
            },
            {
                header:'Previous Page URI',
                dataIndex:'previous_page'
            },
            {
                header:'Page Size',
                dataIndex:'page_size'
            },
            {
                header:'Start Index',
                dataIndex:'start_index'
            },
            //for compound
//            'compound_inchikey',
//            'compound_drug_type',
//            'compound_generic_name',
//            'target_title',
//            'target_concatenated_uris',

            {
                header:'InchiKey',
                dataIndex:'compound_inchikey'
            },
            {
                header:'Drug Type',
                dataIndex:'compound_drug_type'
            },
            {
                header:'Generic Name',
                dataIndex:'compound_generic_name'
            },
            {
                header:'Target Title',
                dataIndex:'target_title'
            },
            {
                header:'Target Concatenated URIs',
                dataIndex:'target_concatenated_uris'
            },

            //for target
//            'chembl_activity_uri',
//            'chembl_compound_uri',
//            'compound_full_mwt',
//            'cw_compound_uri',
//            'compound_pref_label',
//            'cs_compound_uri',
//            'compound_inchi',
//            'compound_smiles',
//            'chembl_assay_uri',
//            'chembl_target_uri',
//            //this is labelled assay_organism
//            'target_organism',
//            'target_pref_label',
//            //this value is missing totally from compound pharmacology paginated
//            'assay_organism',
//            'activity_relation',
//            'activity_standard_units',
//            'activity_standard_value',
//            'activity_activity_type',


            {
                header:'ChEMBL Activity URI',
                dataIndex:'chembl_activity_uri'
            },
            {
                header:'ChEMBL Compound URI',
                dataIndex:'chembl_compound_uri'
            },
            {
                header:'Compound Full Molecular Weight',
                dataIndex:'compound_full_mwt'
            },
            {
                header:'ConceptWiki Compound URI',
                dataIndex:'cw_compound_uri'
            },
            {
                header:'Compound Label',
                dataIndex:'compound_pref_label'
            },
            {
                header:'ChemSpider Compound URI',
                dataIndex:'cs_compound_uri'
            },
            {
                header:'Inchi',
                dataIndex:'compound_inchi'
            },
            {
                header:'Smiles',
                dataIndex:'compound_smiles'
            },
            {
                header:'ChEMBL Assay URI',
                dataIndex:'chembl_assay_uri'
            },
            {
                header:'ChEMBL Target URI',
                dataIndex:'chembl_target_uri'
            },
            {
                header:'Target Organism',
                dataIndex:'target_organism'
            },
            {
                header:'Target Label',
                dataIndex:'target_pref_label'
            },
            {
                header:'Activity Type',
                dataIndex:'activity_activity_type'
            },
            {
                header:'Activity Relation',
                dataIndex:'activity_relation'
            },
            {
                header:'Activity Value',
                dataIndex:'activity_standard_value'
            },
            {
                header:'Activity Units',
                dataIndex:'activity_standard_units'
            }
        ]
    }
});
/**
 * @author Ed Spencer (http://sencha.com)
 * Transition plugin for DataViews
 */
Ext.define('Ext.ux.DataView.Animated', {

    /**
     * @property defaults
     * @type Object
     * Default configuration options for all DataViewTransition instances
     */
    defaults: {
        duration  : 750,
        idProperty: 'id'
    },
    
    /**
     * Creates the plugin instance, applies defaults
     * @constructor
     * @param {Object} config Optional config object
     */
    constructor: function(config) {
        Ext.apply(this, config || {}, this.defaults);
    },

    /**
     * Initializes the transition plugin. Overrides the dataview's default refresh function
     * @param {Ext.view.View} dataview The dataview
     */
    init: function(dataview) {
        /**
         * @property dataview
         * @type Ext.view.View
         * Reference to the DataView this instance is bound to
         */
        this.dataview = dataview;
        
        var idProperty = this.idProperty,
            store = dataview.store;
        
        dataview.blockRefresh = true;
        dataview.updateIndexes = Ext.Function.createSequence(dataview.updateIndexes, function() {
            this.getTargetEl().select(this.itemSelector).each(function(element, composite, index) {
                element.id = element.dom.id = Ext.util.Format.format("{0}-{1}", dataview.id, store.getAt(index).internalId);
            }, this);
        }, dataview);
        
        /**
         * @property dataviewID
         * @type String
         * The string ID of the DataView component. This is used internally when animating child objects
         */
        this.dataviewID = dataview.id;
        
        /**
         * @property cachedStoreData
         * @type Object
         * A cache of existing store data, keyed by id. This is used to determine
         * whether any items were added or removed from the store on data change
         */
        this.cachedStoreData = {};
        
        //catch the store data with the snapshot immediately
        this.cacheStoreData(store.data || store.snapshot);

        dataview.on('resize', function() {
            var store = dataview.store;
            if (store.getCount() > 0) {
                // reDraw.call(this, store);
            }
        }, this);
        
        dataview.store.on('datachanged', reDraw, this);
        
        function reDraw(store) {
            var parentEl = dataview.getTargetEl(),
                calcItem = store.getAt(0),
                added    = this.getAdded(store),
                removed  = this.getRemoved(store),
                previous = this.getRemaining(store),
                existing = Ext.apply({}, previous, added);
            
            //hide old items
            Ext.each(removed, function(item) {
                var id = this.dataviewID + '-' + item.internalId;
                Ext.fly(id).animate({
                    remove  : false,
                    duration: duration,
                    opacity : 0,
                    useDisplay: true,
                    callback: function() {
                        Ext.fly(id).setDisplayed(false);
                    }
                });
            }, this);
            
            //store is empty
            if (calcItem == undefined) {
                this.cacheStoreData(store);
                return;
            }
            
            this.cacheStoreData(store);
            
            var el = Ext.get(this.dataviewID + "-" + calcItem.internalId);
            
            //if there is nothing rendered, force a refresh and return. This happens when loading asynchronously (was not
            //covered correctly in previous versions, which only accepted local data)
            if (!el) {
                dataview.refresh();
                return true;
            }
            
            //calculate the number of rows and columns we have
            var itemCount   = store.getCount(),
                itemWidth   = el.getMargin('lr') + el.getWidth(),
                itemHeight  = el.getMargin('bt') + el.getHeight(),
                dvWidth     = parentEl.getWidth(),
                columns     = Math.floor(dvWidth / itemWidth),
                rows        = Math.ceil(itemCount / columns),
                currentRows = Math.ceil(this.getExistingCount() / columns);
            
            //stores the current top and left values for each element (discovered below)
            var oldPositions = {},
                newPositions = {},
                elCache      = {};
            
            //find current positions of each element and save a reference in the elCache
            Ext.iterate(previous, function(id, item) {
                var id = item.internalId,
                    el = elCache[id] = Ext.get(this.dataviewID + '-' + id);
                
                oldPositions[id] = {
                    top : el.getTop()  - parentEl.getTop()  - el.getMargin('t') - parentEl.getPadding('t'),
                    left: el.getLeft() - parentEl.getLeft() - el.getMargin('l') - parentEl.getPadding('l')
                };
            }, this);
            
            //make sure the correct styles are applied to the parent element
            parentEl.applyStyles({
                display : 'block',
                position: 'relative'
            });
            
            //set absolute positioning on all DataView items. We need to set position, left and 
            //top at the same time to avoid any flickering
            Ext.iterate(previous, function(id, item) {
                var oldPos = oldPositions[id],
                    el     = elCache[id];

                if (el.getStyle('position') != 'absolute') {
                    elCache[id].applyStyles({
                        position: 'absolute',
                        left    : oldPos.left + "px",
                        top     : oldPos.top + "px"
                    });
                }
            });
            
            //get new positions
            var index = 0;
            Ext.iterate(store.data.items, function(item) {
                var id = item.internalId,
                    el = elCache[id];
                
                var column = index % columns,
                    row    = Math.floor(index / columns),
                    top    = row    * itemHeight,
                    left   = column * itemWidth;
                
                newPositions[id] = {
                    top : top,
                    left: left
                };
                
                index ++;
            }, this);
            
            //do the movements
            var startTime  = new Date(),
                duration   = this.duration,
                dataviewID = this.dataviewID;
            
            var doAnimate = function() {
                var elapsed  = new Date() - startTime,
                    fraction = elapsed / duration,
                    id;

                if (fraction >= 1) {
                    for (id in newPositions) {
                        Ext.fly(dataviewID + '-' + id).applyStyles({
                            top : newPositions[id].top + "px",
                            left: newPositions[id].left + "px"
                        });
                    }

                    Ext.TaskManager.stop(task);
                } else {
                    //move each item
                    for (id in newPositions) {
                        if (!previous[id]) {
                            continue;
                        }
                        
                        var oldPos  = oldPositions[id],
                            newPos  = newPositions[id],
                            oldTop  = oldPos.top,
                            newTop  = newPos.top,
                            oldLeft = oldPos.left,
                            newLeft = newPos.left,
                            diffTop = fraction * Math.abs(oldTop  - newTop),
                            diffLeft= fraction * Math.abs(oldLeft - newLeft),
                            midTop  = oldTop  > newTop  ? oldTop  - diffTop  : oldTop  + diffTop,
                            midLeft = oldLeft > newLeft ? oldLeft - diffLeft : oldLeft + diffLeft;

                        Ext.fly(dataviewID + '-' + id).applyStyles({
                            top : midTop + "px",
                            left: midLeft + "px"
                        }).setDisplayed(true);
                    }
                }
            };
            
            var task = {
                run     : doAnimate,
                interval: 20,
                scope   : this
            };
            
            Ext.TaskManager.start(task);
            
            //show new items
            Ext.iterate(added, function(id, item) {
                Ext.fly(this.dataviewID + '-' + item.internalId).applyStyles({
                    top    : newPositions[item.internalId].top + "px",
                    left   : newPositions[item.internalId].left + "px"
                }).setDisplayed(true);
                
                Ext.fly(this.dataviewID + '-' + item.internalId).animate({
                    remove  : false,
                    duration: duration,
                    opacity : 1
                });
            }, this);
            
            this.cacheStoreData(store);
        }
    },
    
    /**
     * Caches the records from a store locally for comparison later
     * @param {Ext.data.Store} store The store to cache data from
     */
    cacheStoreData: function(store) {
        this.cachedStoreData = {};
        
        store.each(function(record) {
             this.cachedStoreData[record.internalId] = record;
        }, this);
    },
    
    /**
     * Returns all records that were already in the DataView
     * @return {Object} All existing records
     */
    getExisting: function() {
        return this.cachedStoreData;
    },
    
    /**
     * Returns the total number of items that are currently visible in the DataView
     * @return {Number} The number of existing items
     */
    getExistingCount: function() {
        var count = 0,
            items = this.getExisting();
        
        for (var k in items) {
            count++;
        }
        
        return count;
    },
    
    /**
     * Returns all records in the given store that were not already present
     * @param {Ext.data.Store} store The updated store instance
     * @return {Object} Object of records not already present in the dataview in format {id: record}
     */
    getAdded: function(store) {
        var added = {};
        
        store.each(function(record) {
            if (this.cachedStoreData[record.internalId] == undefined) {
                added[record.internalId] = record;
            }
        }, this);
        
        return added;
    },
    
    /**
     * Returns all records that are present in the DataView but not the new store
     * @param {Ext.data.Store} store The updated store instance
     * @return {Array} Array of records that used to be present
     */
    getRemoved: function(store) {
        var removed = [],
            id;
        
        for (id in this.cachedStoreData) {
            if (store.findBy(function(record) {return record.internalId == id;}) == -1) {
                removed.push(this.cachedStoreData[id]);
            }
        }
        
        return removed;
    },
    
    /**
     * Returns all records that are already present and are still present in the new store
     * @param {Ext.data.Store} store The updated store instance
     * @return {Object} Object of records that are still present from last time in format {id: record}
     */
    getRemaining: function(store) {
        var remaining = {};

        store.each(function(record) {
            if (this.cachedStoreData[record.internalId] != undefined) {
                remaining[record.internalId] = record;
            }
        }, this);
        
        return remaining;
    }
});

/* 
 * Purpose: to make text selectable in a Ext JS 4 grid
 *
 * Usage for MVC app:
 * 
 * 1. copy this file to feature/selectable.js
 * 2. add this to your grid config:

 features: [
 {ftype: 'selectable', id: 'selectable'}
 ],

 * Tested with Ext.grid.Panel in Ext JS 4.0.2a MVC app
 */

// append our CSS class to <head>
Ext.getHead().insertHtml("beforeEnd",
    '<style type="text/css">' +
        '.x-selectable, .x-selectable * {' +
        '    -khtml-user-select: text !important;' +
        '    -moz-user-select: text !important;' +
        '}' +
        '</style>'
);

Ext.require('Ext.view.Table', function () {
    Ext.override(Ext.view.Table, {
        afterrender:function () {
            var me = this;

            me.callParent();
            me.mon(me.el, {
                scroll:me.fireBodyScroll,
                scope:me
            });

            // in case the selectable feature is present, don't do me.el.unselectable() 
            if (me.getFeature('selectable') === undefined) {
                me.el.unselectable();
            }
            me.attachEventsForFeatures();
        }
    });
});

Ext.require('Ext.grid.feature.Feature', function () {
    Ext.define('LSP.view.dynamicgrid.feature.selectable', {
        extend:'Ext.grid.feature.Feature',
        alias:'feature.selectable',

        mutateMetaRowTpl:function (metaRowTpl) {
            var i,
                ln = metaRowTpl.length;

            for (i = 0; i < ln; i++) {
                tpl = metaRowTpl[i];
                tpl = tpl.replace(/x-grid-row/, 'x-grid-row x-selectable');
                tpl = tpl.replace(/x-grid-cell-inner x-unselectable/g, 'x-grid-cell-inner');
                tpl = tpl.replace(/unselectable="on"/g, '');
                metaRowTpl[i] = tpl;
            }
        }
    });
});  
/**
 * FiltersFeature is a grid {@link Ext.grid.feature.Feature feature} that allows for a slightly more
 * robust representation of filtering than what is provided by the default store.
 *
 * Filtering is adjusted by the user using the grid's column header menu (this menu can be
 * disabled through configuration). Through this menu users can configure, enable, and
 * disable filters for each column.
 *
 * #Features#
 *
 * ##Filtering implementations:##
 *
 * Default filtering for Strings, Numeric Ranges, Date Ranges, Lists (which can be backed by a
 * {@link Ext.data.Store}), and Boolean. Additional custom filter types and menus are easily
 * created by extending {@link Ext.ux.grid.filter.Filter}.
 *
 * ##Graphical Indicators:##
 *
 * Columns that are filtered have {@link #filterCls a configurable css class} applied to the column headers.
 *
 * ##Automatic Reconfiguration:##
 *
 * Filters automatically reconfigure when the grid 'reconfigure' event fires.
 *
 * ##Stateful:##
 *
 * Filter information will be persisted across page loads by specifying a `stateId`
 * in the Grid configuration.
 *
 * The filter collection binds to the {@link Ext.grid.Panel#beforestaterestore beforestaterestore}
 * and {@link Ext.grid.Panel#beforestatesave beforestatesave} events in order to be stateful.
 *
 * ##GridPanel Changes:##
 *
 * - A `filters` property is added to the GridPanel using this feature.
 * - A `filterupdate` event is added to the GridPanel and is fired upon onStateChange completion.
 *
 * ##Server side code examples:##
 *
 * - [PHP](http://www.vinylfox.com/extjs/grid-filter-php-backend-code.php) - (Thanks VinylFox)</li>
 * - [Ruby on Rails](http://extjs.com/forum/showthread.php?p=77326#post77326) - (Thanks Zyclops)</li>
 * - [Ruby on Rails](http://extjs.com/forum/showthread.php?p=176596#post176596) - (Thanks Rotomaul)</li>
 * - [Python](http://www.debatablybeta.com/posts/using-extjss-grid-filtering-with-django/) - (Thanks Matt)</li>
 * - [Grails](http://mcantrell.wordpress.com/2008/08/22/extjs-grids-and-grails/) - (Thanks Mike)</li>
 *
 * #Example usage:#
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         pageSize: 15
 *         ...
 *     });
 *
 *     var filtersCfg = {
 *         ftype: 'filters',
 *         autoReload: false, //don't reload automatically
 *         local: true, //only filter locally
 *         // filters may be configured through the plugin,
 *         // or in the column definition within the headers configuration
 *         filters: [{
 *             type: 'numeric',
 *             dataIndex: 'id'
 *         }, {
 *             type: 'string',
 *             dataIndex: 'name'
 *         }, {
 *             type: 'numeric',
 *             dataIndex: 'price'
 *         }, {
 *             type: 'date',
 *             dataIndex: 'dateAdded'
 *         }, {
 *             type: 'list',
 *             dataIndex: 'size',
 *             options: ['extra small', 'small', 'medium', 'large', 'extra large'],
 *             phpMode: true
 *         }, {
 *             type: 'boolean',
 *             dataIndex: 'visible'
 *         }]
 *     };
 *
 *     var grid = Ext.create('Ext.grid.Panel', {
 *          store: store,
 *          columns: ...,
 *          filters: [filtersCfg],
 *          height: 400,
 *          width: 700,
 *          bbar: Ext.create('Ext.PagingToolbar', {
 *              store: store
 *          })
 *     });
 *
 *     // a filters property is added to the GridPanel
 *     grid.filters
 */
Ext.define('Ext.ux.grid.FiltersFeature', {
    extend: 'Ext.grid.feature.Feature',
    alias: 'feature.filters',
    uses: [
        'Ext.ux.grid.menu.ListMenu',
        'Ext.ux.grid.menu.RangeMenu',
        'Ext.ux.grid.filter.BooleanFilter',
        'Ext.ux.grid.filter.DateFilter',
        'Ext.ux.grid.filter.ListFilter',
        'Ext.ux.grid.filter.NumericFilter',
        'Ext.ux.grid.filter.StringFilter'
    ],

    /**
     * @cfg {Boolean} autoReload
     * Defaults to true, reloading the datasource when a filter change happens.
     * Set this to false to prevent the datastore from being reloaded if there
     * are changes to the filters.  See <code>{@link #updateBuffer}</code>.
     */
    autoReload : true,
    /**
     * @cfg {Boolean} encode
     * Specify true for {@link #buildQuery} to use Ext.util.JSON.encode to
     * encode the filter query parameter sent with a remote request.
     * Defaults to false.
     */
    /**
     * @cfg {Array} filters
     * An Array of filters config objects. Refer to each filter type class for
     * configuration details specific to each filter type. Filters for Strings,
     * Numeric Ranges, Date Ranges, Lists, and Boolean are the standard filters
     * available.
     */
    /**
     * @cfg {String} filterCls
     * The css class to be applied to column headers with active filters.
     * Defaults to <tt>'ux-filterd-column'</tt>.
     */
    filterCls : 'ux-filtered-column',
    /**
     * @cfg {Boolean} local
     * <tt>true</tt> to use Ext.data.Store filter functions (local filtering)
     * instead of the default (<tt>false</tt>) server side filtering.
     */
    local : false,
    /**
     * @cfg {String} menuFilterText
     * defaults to <tt>'Filters'</tt>.
     */
    menuFilterText : 'Filters',
    /**
     * @cfg {String} paramPrefix
     * The url parameter prefix for the filters.
     * Defaults to <tt>'filter'</tt>.
     */
    paramPrefix : 'filter',
    /**
     * @cfg {Boolean} showMenu
     * Defaults to true, including a filter submenu in the default header menu.
     */
    showMenu : true,
    /**
     * @cfg {String} stateId
     * Name of the value to be used to store state information.
     */
    stateId : undefined,
    /**
     * @cfg {Number} updateBuffer
     * Number of milliseconds to defer store updates since the last filter change.
     */
    updateBuffer : 500,

    // doesn't handle grid body events
    hasFeatureEvent: false,


    /** @private */
    constructor : function (config) {
        var me = this;

        config = config || {};
        Ext.apply(me, config);

        me.deferredUpdate = Ext.create('Ext.util.DelayedTask', me.reload, me);

        // Init filters
        me.filters = me.createFiltersCollection();
        me.filterConfigs = config.filters;
    },

    attachEvents: function() {
        var me = this,
            view = me.view,
            headerCt = view.headerCt,
            grid = me.getGridPanel();

        me.bindStore(view.getStore(), true);

        // Listen for header menu being created
        headerCt.on('menucreate', me.onMenuCreate, me);

        view.on('refresh', me.onRefresh, me);
        grid.on({
            scope: me,
            beforestaterestore: me.applyState,
            beforestatesave: me.saveState,
            beforedestroy: me.destroy
        });

        // Add event and filters shortcut on grid panel
        grid.filters = me;
        grid.addEvents('filterupdate');
    },

    createFiltersCollection: function () {
        return Ext.create('Ext.util.MixedCollection', false, function (o) {
            return o ? o.dataIndex : null;
        });
    },

    /**
     * @private Create the Filter objects for the current configuration, destroying any existing ones first.
     */
    createFilters: function() {
        var me = this,
            hadFilters = me.filters.getCount(),
            grid = me.getGridPanel(),
            filters = me.createFiltersCollection(),
            model = grid.store.model,
            fields = model.prototype.fields,
            field,
            filter,
            state;

        if (hadFilters) {
            state = {};
            me.saveState(null, state);
        }

        function add (dataIndex, config, filterable) {
            if (dataIndex && (filterable || config)) {
                field = fields.get(dataIndex);
                filter = {
                    dataIndex: dataIndex,
                    type: (field && field.type && field.type.type) || 'auto'
                };

                if (Ext.isObject(config)) {
                    Ext.apply(filter, config);
                }

                filters.replace(filter);
            }
        }

        // We start with filters from our config
        Ext.Array.each(me.filterConfigs, function (filterConfig) {
            add(filterConfig.dataIndex, filterConfig);
        });

        // Then we merge on filters from the columns in the grid. The columns' filters take precedence.
        Ext.Array.each(grid.columns, function (column) {
            if (column.filterable === false) {
                filters.removeAtKey(column.dataIndex);
            } else {
                add(column.dataIndex, column.filter, column.filterable);
            }
        });
        

        me.removeAll();
        if (filters.items) {
            me.initializeFilters(filters.items);
        }

        if (hadFilters) {
            me.applyState(null, state);
        }
    },

    /**
     * @private
     */
    initializeFilters: function(filters) {
        var me = this,
            filtersLength = filters.length,
            i, filter, FilterClass;

        for (i = 0; i < filtersLength; i++) {
            filter = filters[i];
            if (filter) {
                FilterClass = me.getFilterClass(filter.type);
                filter = filter.menu ? filter : new FilterClass(filter);
                me.filters.add(filter);
                Ext.util.Observable.capture(filter, this.onStateChange, this);
            }
        }
    },

    /**
     * @private Handle creation of the grid's header menu. Initializes the filters and listens
     * for the menu being shown.
     */
    onMenuCreate: function(headerCt, menu) {
        var me = this;
        me.createFilters();
        menu.on('beforeshow', me.onMenuBeforeShow, me);
    },

    /**
     * @private Handle showing of the grid's header menu. Sets up the filter item and menu
     * appropriate for the target column.
     */
    onMenuBeforeShow: function(menu) {
        var me = this,
            menuItem, filter;

        if (me.showMenu) {
            menuItem = me.menuItem;
            if (!menuItem || menuItem.isDestroyed) {
                me.createMenuItem(menu);
                menuItem = me.menuItem;
            }

            filter = me.getMenuFilter();

            if (filter) {
                menuItem.setMenu(filter.menu, false);
                menuItem.setChecked(filter.active);
                // disable the menu if filter.disabled explicitly set to true
                menuItem.setDisabled(filter.disabled === true);
            }
            menuItem.setVisible(!!filter);
            this.sep.setVisible(!!filter);
        }
    },


    createMenuItem: function(menu) {
        var me = this;
        me.sep  = menu.add('-');
        me.menuItem = menu.add({
            checked: false,
            itemId: 'filters',
            text: me.menuFilterText,
            listeners: {
                scope: me,
                checkchange: me.onCheckChange,
                beforecheckchange: me.onBeforeCheck
            }
        });
    },

    getGridPanel: function() {
        return this.view.up('gridpanel');
    },

    /**
     * @private
     * Handler for the grid's beforestaterestore event (fires before the state of the
     * grid is restored).
     * @param {Object} grid The grid object
     * @param {Object} state The hash of state values returned from the StateProvider.
     */
    applyState : function (grid, state) {
        var me = this,
            key, filter;
        me.applyingState = true;
        me.clearFilters();
        if (state.filters) {
            for (key in state.filters) {
                if (state.filters.hasOwnProperty(key)) {
                    filter = me.filters.get(key);
                    if (filter) {
                        filter.setValue(state.filters[key]);
                        filter.setActive(true);
                    }
                }
            }
        }
        me.deferredUpdate.cancel();
        if (me.local) {
            me.reload();
        }
        delete me.applyingState;
        delete state.filters;
    },

    /**
     * Saves the state of all active filters
     * @param {Object} grid
     * @param {Object} state
     * @return {Boolean}
     */
    saveState : function (grid, state) {
        var filters = {};
        this.filters.each(function (filter) {
            if (filter.active) {
                filters[filter.dataIndex] = filter.getValue();
            }
        });
        return (state.filters = filters);
    },

    /**
     * @private
     * Handler called by the grid 'beforedestroy' event
     */
    destroy : function () {
        var me = this;
        Ext.destroyMembers(me, 'menuItem', 'sep');
        me.removeAll();
        me.clearListeners();
    },

    /**
     * Remove all filters, permanently destroying them.
     */
    removeAll : function () {
        if(this.filters){
            Ext.destroy.apply(Ext, this.filters.items);
            // remove all items from the collection
            this.filters.clear();
        }
    },


    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this view
     */
    bindStore : function(store) {
        var me = this;

        // Unbind from the old Store
        if (me.store && me.storeListeners) {
            me.store.un(me.storeListeners);
        }

        // Set up correct listeners
        if (store) {
            me.storeListeners = {
                scope: me
            };
            if (me.local) {
                me.storeListeners.load = me.onLoad;
            } else {
                me.storeListeners['before' + (store.buffered ? 'prefetch' : 'load')] = me.onBeforeLoad;
            }
            store.on(me.storeListeners);
        } else {
            delete me.storeListeners;
        }
        me.store = store;
    },

    /**
     * @private
     * Get the filter menu from the filters MixedCollection based on the clicked header
     */
    getMenuFilter : function () {
        var header = this.view.headerCt.getMenu().activeHeader;
        return header ? this.filters.get(header.dataIndex) : null;
    },

    /** @private */
    onCheckChange : function (item, value) {
        this.getMenuFilter().setActive(value);
    },

    /** @private */
    onBeforeCheck : function (check, value) {
        return !value || this.getMenuFilter().isActivatable();
    },

    /**
     * @private
     * Handler for all events on filters.
     * @param {String} event Event name
     * @param {Object} filter Standard signature of the event before the event is fired
     */
    onStateChange : function (event, filter) {
        if (event !== 'serialize') {
            var me = this,
                grid = me.getGridPanel();

            if (filter == me.getMenuFilter()) {
                me.menuItem.setChecked(filter.active, false);
            }

            if ((me.autoReload || me.local) && !me.applyingState) {
                me.deferredUpdate.delay(me.updateBuffer);
            }
            me.updateColumnHeadings();

            if (!me.applyingState) {
                grid.saveState();
            }
            grid.fireEvent('filterupdate', me, filter);
        }
    },

    /**
     * @private
     * Handler for store's beforeload event when configured for remote filtering
     * @param {Object} store
     * @param {Object} options
     */
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        this.cleanParams(options.params);
        var params = this.buildQuery(this.getFilterData());
        Ext.apply(options.params, params);
    },

    /**
     * @private
     * Handler for store's load event when configured for local filtering
     * @param {Object} store
     */
    onLoad : function (store) {
        store.filterBy(this.getRecordFilter());
    },

    /**
     * @private
     * Handler called when the grid's view is refreshed
     */
    onRefresh : function () {
        this.updateColumnHeadings();
    },

    /**
     * Update the styles for the header row based on the active filters
     */
    updateColumnHeadings : function () {
        var me = this,
            headerCt = me.view.headerCt;
        if (headerCt) {
            headerCt.items.each(function(header) {
                var filter = me.getFilter(header.dataIndex);
                header[filter && filter.active ? 'addCls' : 'removeCls'](me.filterCls);
            });
        }
    },

    /** @private */
    reload : function () {
        var me = this,
            store = me.view.getStore();

        if (me.local) {
            store.clearFilter(true);
            store.filterBy(me.getRecordFilter());
            store.sort();
        } else {
            me.deferredUpdate.cancel();
            if (store.buffered) {
                store.pageMap.clear();
            }
            store.loadPage(1);
        }
    },

    /**
     * Method factory that generates a record validator for the filters active at the time
     * of invokation.
     * @private
     */
    getRecordFilter : function () {
        var f = [], len, i;
        this.filters.each(function (filter) {
            if (filter.active) {
                f.push(filter);
            }
        });

        len = f.length;
        return function (record) {
            for (i = 0; i < len; i++) {
                if (!f[i].validateRecord(record)) {
                    return false;
                }
            }
            return true;
        };
    },

    /**
     * Adds a filter to the collection and observes it for state change.
     * @param {Object/Ext.ux.grid.filter.Filter} config A filter configuration or a filter object.
     * @return {Ext.ux.grid.filter.Filter} The existing or newly created filter object.
     */
    addFilter : function (config) {
        var me = this,
            columns = me.getGridPanel().columns,
            i, columnsLength, column, filtersLength, filter;

        
        for (i = 0, columnsLength = columns.length; i < columnsLength; i++) {
            column = columns[i];
            if (column.dataIndex === config.dataIndex) {
                column.filter = config;
            }
        }
        
        if (me.view.headerCt.menu) {
            me.createFilters();
        } else {
            // Call getMenu() to ensure the menu is created, and so, also are the filters. We cannot call
            // createFilters() withouth having a menu because it will cause in a recursion to applyState()
            // that ends up to clear all the filter values. This is likely to happen when we reorder a column
            // and then add a new filter before the menu is recreated.
            me.view.headerCt.getMenu();
        }
        
        for (i = 0, filtersLength = me.filters.items.length; i < filtersLength; i++) {
            filter = me.filters.items[i];
            if (filter.dataIndex === config.dataIndex) {
                return filter;
            }
        }
    },

    /**
     * Adds filters to the collection.
     * @param {Array} filters An Array of filter configuration objects.
     */
    addFilters : function (filters) {
        if (filters) {
            var me = this,
                i, filtersLength;
            for (i = 0, filtersLength = filters.length; i < filtersLength; i++) {
                me.addFilter(filters[i]);
            }
        }
    },

    /**
     * Returns a filter for the given dataIndex, if one exists.
     * @param {String} dataIndex The dataIndex of the desired filter object.
     * @return {Ext.ux.grid.filter.Filter}
     */
    getFilter : function (dataIndex) {
        return this.filters.get(dataIndex);
    },

    /**
     * Turns all filters off. This does not clear the configuration information
     * (see {@link #removeAll}).
     */
    clearFilters : function () {
        this.filters.each(function (filter) {
            filter.setActive(false);
        });
    },

    /**
     * Returns an Array of the currently active filters.
     * @return {Array} filters Array of the currently active filters.
     */
    getFilterData : function () {
        var filters = [], i, len;

        this.filters.each(function (f) {
            if (f.active) {
                var d = [].concat(f.serialize());
                for (i = 0, len = d.length; i < len; i++) {
                    filters.push({
                        field: f.dataIndex,
                        data: d[i]
                    });
                }
            }
        });
        return filters;
    },

    /**
     * Function to take the active filters data and build it into a query.
     * The format of the query depends on the <code>{@link #encode}</code>
     * configuration:
     * <div class="mdetail-params"><ul>
     *
     * <li><b><tt>false</tt></b> : <i>Default</i>
     * <div class="sub-desc">
     * Flatten into query string of the form (assuming <code>{@link #paramPrefix}='filters'</code>:
     * <pre><code>
filters[0][field]="someDataIndex"&
filters[0][data][comparison]="someValue1"&
filters[0][data][type]="someValue2"&
filters[0][data][value]="someValue3"&
     * </code></pre>
     * </div></li>
     * <li><b><tt>true</tt></b> :
     * <div class="sub-desc">
     * JSON encode the filter data
     * <pre><code>
filters[0][field]="someDataIndex"&
filters[0][data][comparison]="someValue1"&
filters[0][data][type]="someValue2"&
filters[0][data][value]="someValue3"&
     * </code></pre>
     * </div></li>
     * </ul></div>
     * Override this method to customize the format of the filter query for remote requests.
     * @param {Array} filters A collection of objects representing active filters and their configuration.
     *    Each element will take the form of {field: dataIndex, data: filterConf}. dataIndex is not assured
     *    to be unique as any one filter may be a composite of more basic filters for the same dataIndex.
     * @return {Object} Query keys and values
     */
    buildQuery : function (filters) {
        var p = {}, i, f, root, dataPrefix, key, tmp,
            len = filters.length;

        if (!this.encode){
            for (i = 0; i < len; i++) {
                f = filters[i];
                root = [this.paramPrefix, '[', i, ']'].join('');
                p[root + '[field]'] = f.field;

                dataPrefix = root + '[data]';
                for (key in f.data) {
                    p[[dataPrefix, '[', key, ']'].join('')] = f.data[key];
                }
            }
        } else {
            tmp = [];
            for (i = 0; i < len; i++) {
                f = filters[i];
                tmp.push(Ext.apply(
                    {},
                    {field: f.field},
                    f.data
                ));
            }
            // only build if there is active filter
            if (tmp.length > 0){
                p[this.paramPrefix] = Ext.JSON.encode(tmp);
            }
        }
        return p;
    },

    /**
     * Removes filter related query parameters from the provided object.
     * @param {Object} p Query parameters that may contain filter related fields.
     */
    cleanParams : function (p) {
        // if encoding just delete the property
        if (this.encode) {
            delete p[this.paramPrefix];
        // otherwise scrub the object of filter data
        } else {
            var regex, key;
            regex = new RegExp('^' + this.paramPrefix + '\[[0-9]+\]');
            for (key in p) {
                if (regex.test(key)) {
                    delete p[key];
                }
            }
        }
    },

    /**
     * Function for locating filter classes, overwrite this with your favorite
     * loader to provide dynamic filter loading.
     * @param {String} type The type of filter to load ('Filter' is automatically
     * appended to the passed type; eg, 'string' becomes 'StringFilter').
     * @return {Function} The Ext.ux.grid.filter.Class
     */
    getFilterClass : function (type) {
        // map the supported Ext.data.Field type values into a supported filter
        switch(type) {
            case 'auto':
              type = 'string';
              break;
            case 'int':
            case 'float':
              type = 'numeric';
              break;
            case 'bool':
              type = 'boolean';
              break;
        }
        return Ext.ClassManager.getByAlias('gridfilter.' + type);
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 20/06/2012
 * Time: 10:50
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LDA.view.LDAParserView', {
    extend:'Ext.form.Panel',
    alias:'widget.LDAParserView',
    requires:[
        'LDA.view.grids.CompoundPharmacologyCountGrid',
        'LDA.view.grids.CompoundGrid'  ,
        'LDA.view.grids.CompoundPharmacologyGrid',
        'LDA.view.grids.CompoundPharmacologyPaginatedGrid',
        'LDA.view.grids.TargetPharmacologyCountGrid',
        'LDA.view.grids.TargetGrid'  ,
        'LDA.view.grids.TargetPharmacologyGrid',
        'LDA.view.grids.TargetPharmacologyPaginatedGrid',
        'LDA.view.grids.EnzymeFamilyPaginatedGrid'
    ],
    layout:{
        type:'vbox'

    },
    items:[
//        {
//            xtype:'displayfield',
//            value:'foo'
//        },

        {
            xtype:'textfield',
            fieldLabel:'Compound Store URI',
            value:'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5',
            width:600,
            itemId:'ldacu'
        },

        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'CompoundGrid',
                    width:900,
                    height:300,
                    itemId:'ldacg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_c',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_c',
                            width:100
                        }
                    ]
                }
            ]
        },
        {
            xtype:'textfield',
            fieldLabel:'Compound Pharmacology Store URI',
            value:'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5',
            width:600,
            itemId:'ldacpu'
        },
        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'CompoundPharmacologyGrid',
                    width:900,
                    height:300,
                    itemId:'ldacpg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_cp',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_cp',
                            width:100
                        }
                    ]
                }
            ]
        },
        {
            xtype:'textfield',
            fieldLabel:'Compound Pharmacology Paginated Store URI',
            value:'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5',
            width:600,
            itemId:'ldacppu'
        },
        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'CompoundPharmacologyPaginatedGrid',
                    width:900,
                    height:300,
                    itemId:'ldacppg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_cpp',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_cpp',
                            width:100
                        }
                    ]
                }
            ]
        },
        {
            xtype:'textfield',
            fieldLabel:'Compound Pharmacology Count Store URI',
            value:'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5',
            width:600,
            itemId:'ldacpcu'
        },
        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'CompoundPharmacologyCountGrid',
                    width:900,
                    height:300,
                    itemId:'ldacpcg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_cpc',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_cpc',
                            width:100
                        }
                    ]
                }
            ]
        },

        {
            xtype:'textfield',
            fieldLabel:'Target Store URI',
            value:'http://www.conceptwiki.org/concept/59aabd64-bee9-45b7-bbe0-9533f6a1f6bc',
            width:600,
            itemId:'ldatu'
        },

        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'TargetGrid',
                    width:900,
                    height:300,
                    itemId:'ldatg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_t',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_t',
                            width:100
                        }
                    ]
                }
            ]
        },

        {
            xtype:'textfield',
            fieldLabel:'Target Pharmacology Store URI',
            value:'http://www.conceptwiki.org/concept/59aabd64-bee9-45b7-bbe0-9533f6a1f6bc',
            width:600,
            itemId:'ldatpu'
        },

        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'TargetPharmacologyGrid',
                    width:900,
                    height:300,
                    itemId:'ldatpg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_tp',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_tp',
                            width:100
                        }
                    ]
                }
            ]
        },

        {
            xtype:'textfield',
            fieldLabel:'Target Pharmacology Paginated Store URI',
            value:'http://www.conceptwiki.org/concept/59aabd64-bee9-45b7-bbe0-9533f6a1f6bc',
            width:600,
            itemId:'ldatppu'
        },

        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'TargetPharmacologyPaginatedGrid',
                    width:900,
                    height:300,
                    itemId:'ldatppg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_tpp',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_tpp',
                            width:100
                        }
                    ]
                }
            ]
        },

        {
            xtype:'textfield',
            fieldLabel:'Target Pharmacology Count Store URI',
            value:'http://www.conceptwiki.org/concept/59aabd64-bee9-45b7-bbe0-9533f6a1f6bc',
            width:600,
            itemId:'ldatpcu'
        },

        {
            xtype:'panel',
            layout:'hbox',
            items:[
                {
                    xtype:'TargetPharmacologyCountGrid',
                    width:900,
                    height:300,
                    itemId:'ldatpcg'
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'load',
                            action:'load_tpc',
                            width:100
                        },
                        {
                            xtype:'button',
                            text:'Log Store Details',
                            action:'log_tpc',
                            width:100
                        }
                    ]
                }
            ]
        }
//
//
//        {
//            xtype:'textarea',
//            itemId:'textarea2',
//            height:200,
//            width:800
//        },
//        {
//            xtype:'textarea',
//            itemId:'textarea1',
//            height:200,
//            width:800
//        }
//        {
//            xtype:'radiogroup',
//            itemId:'radio',
//
//        }

    ]
});
/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 20/06/2012
 * Time: 10:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.controller.LDAParserController', {
    extend:'Ext.app.Controller',
    requires:['LDA.view.LDAParserView'],
    refs:[
        {
            ref:'parserview',
            selector:'LDAParserView'
        },
        {
            ref:'rta',
            selector:'#textarea1'
        },
        {
            ref:'pta',
            selector:'#textarea2'
        }
    ],

    init:function () {
        var me = this;
        me.control(
            {
                'LDAParserView button':{
                    click:this.buttonClick
                }
//                },
//                'LDAParserView button[action=logstorec]':{
//                    click:this.logStoreDetails
//                },
//                'LDAParserView button[action=loadcpc]':{
//                    click:this.loadLDAData
//                },
//                'LDAParserView button[action=logstorecpc]':{
//                    click:this.logStoreDetails
//                }
            }
        );
    },

    buttonClick:function (button, event, eOpts) {
        var action = button.action;
        var bits = action.split('_');
        if (bits.length == 2) {
            var cmd = bits[0];
            var data = bits[1];
            if (cmd == 'load') {
                this.loadLDAData(data);
            } else if (cmd == 'log') {
                this.logStoreDetails(data);
            }

        }
    },


    logStoreDetails:function (data) {
//        console.log('logStoreDetails()');
        var grid = this.getParserview().down('#lda' + data + 'g');
        var store = grid.store;
        var logArea = Ext.ComponentQuery.query('#logarea')[0];
        var sbuff = '';
        logArea.setValue('');
        Ext.each(store.data.items, function (record, index, allRecords) {
            console.log(record.id);

            sbuff = '';
            sbuff = sbuff.concat(record.id + '\n');
            Ext.iterate(record.data,
                function (key, value, originalObject) {
                    console.log(key + ': ' + value);
                    sbuff = sbuff.concat(key + ': ' + value + '\n');
                }
            );
            var currValue = logArea.getValue();
            logArea.setValue(currValue.concat('\n' + sbuff + '\n'));
        });
    },


    loadLDAData:function (data) {
//        console.log('loadLDAData()');
        var grid = this.getParserview().down('#lda' + data + 'g');
        var uriField = this.getParserview().down('#lda' + data + 'u');
        var uri = uriField.getValue();
        var store = grid.getStore();

        grid.setLoading(true);
        store.setURI(uri);
        store.load(function () {
            grid.setLoading(false);
        });


//        store.load(function (records, operation, success) {
//            console.log('store loaded');
//            Ext.each(records, function (record, index, allRecords) {
//                console.log(record.id);
//                Ext.iterate(record.raw,
//                    function (key, value, originalObject) {
//                        console.log(key + ': ' + value);
//                    }
//                );
//            })
//        });


//        console.log(this);

//        Ext.data.JsonP.request(
//            {
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound/pharmacology?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//
//                success:function (response) {
//                    me.getRta().setValue(JSON.stringify(response, undefined, 2));
//                    console.log(response);
//                    me.processLDAJSON(response, me.getPta());
//                }
//            }
//
//        );

//        Ext.data.JsonP.request(
//            {
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound/pharmacology/pages?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//
//                success:function (response) {
//                    me.getRta().setValue(JSON.stringify(response, undefined, 2));
//                    console.log(response);
//                    me.processLDAJSON(response, me.getPta());
//                }
//            }
//
//        );

//        Ext.data.JsonP.request(
//            {
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound/pharmacology/count?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//
//                success:function (response) {
//                    me.getRta().setValue(JSON.stringify(response, undefined, 2));
//                    console.log(response);
//                    me.processLDAJSON(response, me.getPta());
//                }
//            }
//
//        );

//        var my_reader = Ext.create('app.lib.CompoundPharmacologyCountReader');
//
//        var store = Ext.create('Ext.data.Store', {
//            model:'User',
//            proxy:{
//                type:'jsonp',
//                noCache:false,
//                startParam:undefined,
//                limitParam:undefined,
//                pageParam:undefined,
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound/pharmacology/count?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//                reader:my_reader
//            }
//        });
//


//        Ext.data.JsonP.request(
//            {
//                callbackKey:'_callback',
//                url:'http://ops.few.vu.nl/compound?uri=http%3A%2F%2Fwww.conceptwiki.org%2Fconcept%2F38932552-111f-4a4e-a46a-4ed1d7bdf9d5&_format=json',
//
//                success:function (response) {
//                    me.getRta().setValue(JSON.stringify(response, undefined, 2));
//                    console.log(response);
//                    me.processLDAJSON(response, me.getPta());
//                }
//            }
//
//        );

//        Ext.Ajax.request({
//                url:'raw_compound_pharmacology.json',
//
//                success:function (response) {
//                    me.getRta().setValue(response.responseText);
//                    me.processLDAJSON(response.responseText, me.getPta());
//                }
//            }
//        );
    },

    processLDAJSON:function (ldaJson, pta) {

        var resArr = new Array();

        Ext.each(ldaJson['result']['primaryTopic']['exactMatch'][2]['activity'],
            function (activity, index, array) {
                var pObj = new Object();
                pObj['type'] = activity.type;
                pObj['relation'] = activity.relation;
                pObj['standard_value'] = activity.standardValue;
                pObj['standard_units'] = activity.standardUnits;
                resArr.push(pObj);
            }
        );

        console.log(resArr);

//        pta.setValue(Ext.encode(resArr));
        pta.setValue(JSON.stringify(resArr, undefined, 2));

    }


});
Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux.DataView', '/ext/examples/ux/DataView/');

Ext.define('LSP.view.dataview.StructureViewer', {
    extend:'Ext.window.Window',
    alias:'widget.StructureViewer',

    requires:['Ext.form.Panel', 'Ext.util.*', 'Ext.ux.DataView.Animated'],

    title:'Structures',
    layout:'fit',
    modal:true,
    autoShow:true,
    height:570,
    width:810,

    initComponent:function () {
        var store = structureViewStore;
        var dataview = Ext.create('Ext.view.View', {
            deferInitialRefresh:false,
            store:store,
            tpl:Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<div class="structure_data_view-wrap">',
                '<p height="180">',
                '<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
                '<br /><strong>Chemspider id : <a href ="http://inchi.chemspider.com/Chemical-Structure.{csid}.html" target="_blank">{csid}</a></strong>',
                '</p>',
                '</div>',
                '</tpl>'
            ),

            plugins:[
                Ext.create('Ext.ux.DataView.Animated', {
                    duration:550,
                    idProperty:'csid'
                })
            ],
            itemSelector:'div.structure_data_view-wrap',
            overItemCls:'x-view-over_structure_dv',
            singleSelect:true,
            autoScroll:true
        });

        this.items = [
            {
                xtype:'form',
                padding:'0 0 0 0',
                border:false,
                autoScroll:true,
                style:'background-color: #fff;',
                items:dataview
            }
        ];

        this.buttons = [
            {
                text:'Use structure',
                action:'commit_structure'
            },
            {
                text:'Cancel',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});
Ext.Loader.setConfig({
	enabled: true
});
Ext.Loader.setPath('Ext.ux.grid', 'ext/examples/ux/grid');
Ext.define('LSP.view.dynamicgrid.DynamicGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.dynamicgrid',
	requires: ['Ext.grid.RowNumberer', 'Ext.form.*', 'Ext.ux.grid.FiltersFeature', 'Ext.selection.CellModel', 'LSP.view.dynamicgrid.feature.selectable'],

	rowNumberer: true,
	defaultWidth: 200,
	showMenu: function(x, y, record) {
		var cmp = record.data.compound_pref_label;
		var tar = record.data.target_pref_label;
		var smi = record.data.compound_smiles;

		if (tar) {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: tar
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'Search for compound by name',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&s=' + cmp);
					}
				}, {
					text: 'Search for compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Search for target by name',
					itemId: 'searchForTarget',
					iconCls: 'menu-search-target',
					handler: function() {
						//                        console.log('Search for target by name');
						//                        console.log(tar);
						Ext.History.add('!p=TargetByNameForm&s=' + tar);
					}
				}, {
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
			contextMenu.showAt(x, y);
		} else {
			var cmpValueMenu = new Ext.menu.Menu({
				items: [{
					xtype: 'textfield',
					value: cmp
				}, {
					xtype: 'textfield',
					value: smi
				}]
			});

			var contextMenu = new Ext.menu.Menu({
				items: [{
					text: 'Search for compound by name',
					itemId: 'searchForCompoundByName',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by name');
						//                        console.log(cmp);
						Ext.History.add('!p=CmpdByNameForm&s=' + cmp);
					}
				}, {
					text: 'Search for compound by SMILES',
					itemId: 'searchForCompoundBySMILES',
					iconCls: 'menu-search-compound',
					handler: function() {
						//                        console.log('Search for compound by SMILES');
						//                        console.log(cmp);
						Ext.History.add('!p=SimSearchForm&sm=' + smi + '&st=exact');
					}
				}, {
					text: 'Copy Data',
					menu: cmpValueMenu
				}]
			});
			contextMenu.showAt(x, y);
		}

	},
	    initComponent:function () {
			console.log('DynamicGrid: initComponent()');
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
			//add the top bar here since the child may already have some docked items
	        var config = {

	            tbar:[
	                {
	                    xtype:'exporterbutton',
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
	                    iconCls:'icon-sdf',
	                    hidden:false,
	                    disabled:true
	                },
	                {
	                    xtype:'exporterbutton',
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
	            features:[groupingFeature, filters, cellTextSelector]
	        };

	        Ext.apply(this, config);
	        Ext.apply(this.initialConfig, config);
	        this.callParent(arguments);
			console.log('DynamicGrid: initComponent() 2');
	
	    }
});

/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.controller.grids.DynamicGrid', {
    extend:'Ext.app.Controller',

    views:[
        'dynamicgrid.DynamicGrid'
    ],

    models:['DynamicGrid'],

    refs:[
            {
                ref:'gridView',
                selector:'dynamicgrid'
            }
        ],

    init:function () {
		console.log('DynamicGrid: init()');
        this.control({
            'dynamicgrid':{
                itemdblclick:function (view, record, item, index, e, opts) {
                    if (record.data.cs_compound_uri !== undefined) {
                        var csid = record.data.cs_compound_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
                        if (parseInt(csid) >= 1) {
                            Ext.create('CS.view.CompoundWindow').showCompound(csid);
                        }
                    }
                },
                itemcontextmenu:function (view, record, itemHTMLElement, index, eventObject, eOpts) {
                    eventObject.preventDefault();
//                    console.log('itemcontextmenu');
                    this.getGridView().showMenu(eventObject.getX(), eventObject.getY(), record);
                }
            },
            'dynamicgrid toolbar #sdfDownloadProxy_id':{
                click:this.prepSDFile
            }
        })
    },
    onLaunch:function () {
    },


    testThis:function (args) {
    },

    addNextRecords:function (this_gridview, extraParams) {
		console.log('DynamicGrid: addNextRecords()');
        this_gridview.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
        this_gridview.down('#sdfDownload_id').disable();
        var this_store = this_gridview.store;
        var this_controller = this;
        var temp_store = Ext.create('LSP.store.DynamicGrid');
        // configure copy store:
        temp_store.proxy.extraParams = extraParams;
        temp_store.proxy.api.read = this_gridview.readUrl;
        temp_store.proxy.actionMethods = this_store.proxy.actionMethods;
        var offset = this_store.data.length + 1;
        // We load the copy store to get the new records
        this_gridview.setLoading(true);
        temp_store.load({params:{ offset:offset, limit:100}});
        temp_store.on('load', function (temp_store, new_records, success) {
            if (success === false) {
                Ext.MessageBox.show({
                    title:'Error',
                    msg:'Call to OpenPhacts API timed out.<br/>We are sorry, please try again later.',
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.ERROR
                });
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - Error on search!');
                this_gridview.setLoading(false);
                return false;
            }
            var idx_start = offset - 1;
            var row_count = 0;
            Ext.each(new_records, function (new_record) {
                new_record.index = idx_start + row_count;
                row_count++;
            });
            this_store.loadRecords(new_records, {addRecords:true});
            this_gridview.setLoading(false);
            this_gridview.recordsLoaded = this_store.data.length;
            if (temp_store.data.length < 100) {
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - All ' + this_gridview.recordsLoaded + ' records loaded');
                this_gridview.down('#nextRecords').disable();
            }
            else {
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - Records loaded: ' + this_store.data.length);
            }
        });

    },

    storeLoad:function (this_gridview, success) {
		console.log('DynamicGrid: storeLoad()');
        if (success === false) {
            Ext.MessageBox.show({
                title:'Error',
                msg:'Call to OpenPhacts API timed out.<br/>We are sorry, please try again later.',
                buttons:Ext.MessageBox.OK,
                icon:Ext.MessageBox.ERROR
            });
            this_gridview.setTitle(this_gridview.gridBaseTitle + ' - Error on search!');
            return false;
        }


        this_gridview.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');

        var this_controller = this;
        var dynamicgridStore = this_gridview.store;
        if (typeof(dynamicgridStore.proxy.reader.jsonData.columns) === 'object') {
            var columns = [];
            if (this_gridview.rowNumberer) {
                columns.push(Ext.create('Ext.grid.RowNumberer', {width:40}));
            }
            Ext.each(dynamicgridStore.proxy.reader.jsonData.columns, function (column) {
                columns.push(column);
                if (column.text == 'csid_uri') {
                    this_gridview.csid_column = true;
                    this_gridview.down('#sdfDownloadProxy_id').enable();
                }
            });
            this_gridview.reconfigure(dynamicgridStore, columns);
            this_gridview.recordsLoaded = dynamicgridStore.data.length;
            if (this_gridview.recordsLoaded == 0) {
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - No records found within OPS for this search!');
                Ext.MessageBox.show({
                    title:'Info',
                    msg:'The OPS system does not contain any data that match this search.',
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
            }
            else {
                this_gridview.setTitle(this_gridview.gridBaseTitle + ' - Records loaded: ' + this_gridview.recordsLoaded);
                if (this_gridview.recordsLoaded == this_gridview.limit) {
                    this_gridview.down('#nextRecords').enable();
                    //                     this_gridview.down('#csvDownloadProxy_id').enable();

                }
                else {
                    this_gridview.setTitle(this_gridview.gridBaseTitle + ' - All ' + this_gridview.recordsLoaded + ' records loaded');
                }
            }

        }
    },

    prepSDFile2:function (sdf_prep_button) {
        var gridview = sdf_prep_button.up('dynamicgrid');
        var grid_store = gridview.store;
        var items = grid_store.data.items;

        var compoundStore = Ext.create('CS.store.Compound');
        var item_count = items.length;
        var success_count = 0;
        var fail_count = 0;
        sdf_prep_button.setText('SD-file preparing...');
        Ext.each(items, function (item) {
			//TODO some of these items can be null, catch them and ignore (or report?) 
            var csid = item.data.cs_compound_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
            if (!isNaN(parseInt(csid))) {
                if (item.molfile === undefined || item.molfile.length < 30) {
                    compoundStore.load({
                        params:{ 'csids[0]':csid },
                        callback:function (records, operation, success) {
                            if (success) {
                                success_count++;
                                compound = compoundStore.first().raw.Mol;
                                item.molfile = compound;
                                sdf_prep_button.setText('SD-File ' + (100 * success_count / item_count).toFixed(0) + '% ready');
                                if (success_count === item_count) {
                                    sdf_prep_button.setText('SD-File ready! Click ->');
                                    gridview.down('#sdfDownload_id').enable();
                                }
                            }
                            else {
                                fail_count++;
                            }
                        }
                    }, this);
                }
                else {
                    success_count++;
                    sdf_prep_button.setText('SD-File ' + (100 * success_count / item_count).toFixed(0) + '% ready');
                }
            }
            else {
                fail_count++
            }

        })

    },

    prepSDFile:function (sdf_prep_button) {
        var gridview = sdf_prep_button.up('dynamicgrid');
        var grid_store = gridview.store;
        var items = grid_store.data.items;

        //    var compoundStore = Ext.create('CS.store.Compound');
        var item_count = items.length;
        var success_count = 0;
        var fail_count = 0;
        sdf_prep_button.setText('SD-file preparing...');
        csid_hash = {};
        csid_molfile_hash = {};
        Ext.each(items, function (item) {
            var csid = item.data.cs_compound_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
            if (!isNaN(parseInt(csid))) {
                if (item.molfile !== undefined && item.molfile.length > 30) {
                    csid_molfile_hash[csid] = item.molfile;
                }
                if (csid_hash[csid] === undefined) {
                    csid_hash[csid] = [item.index];
                }
                else {
                    csid_hash[csid].push(item.index);
                }
            }
        });
        for (var csid in csid_hash) {
            var csid_records = csid_hash[csid]; // record indices with this csid
            var has_molfile = (csid_molfile_hash[csid] !== undefined);   // true or false if molfile exists in store allready
            if (has_molfile) {
                var idx_len = csid_records.length;
                for (i = 0; i < idx_len; i++) {
                    var row = grid_store.getAt(csid_records[i]);
                    if (row.molfile == undefined) {
                        row.molfile = csid_molfile_hash[csid];
                    }
                }
                this.updateSDFStatus(sdf_prep_button, grid_store);
            }
            else {
                this.getMolfile(csid, csid_records, grid_store, sdf_prep_button);
            }
        }
    },

    updateSDFStatus:function (button, store) {
        var items = store.data.items;
        var item_count = items.length;
        var missing_count = 0;
        var success_count = 0;
        Ext.each(items, function (item) {
            if (item.molfile === undefined) {
                missing_count++;
            }
        });
        success_count = item_count - missing_count;
        button.setText('SD-File ' + (100 * success_count / item_count).toFixed(0) + '% ready');
        if (success_count === item_count) {
            button.setText('SD-File ready! Click ->');
            button.up('grid').down('#sdfDownload_id').enable();
        }
    },

    getMolfile:function (csid, row_idxs, grid_store, sdf_prep_button) {
        var me = this;
        var compoundStore = Ext.create('CS.store.Compound');
        var idx_len = row_idxs.length;
        compoundStore.load({
            params:{ 'csids[0]':csid },
            callback:function (obsrecords, operation, success) {
                if (success) {
                    var compound = compoundStore.first().raw.Mol;
                    for (i = 0; i < idx_len; i++) {
                        var item = grid_store.getAt(row_idxs[i]);
                        item.molfile = compound;
                    }
                    me.updateSDFStatus(sdf_prep_button, grid_store);
                }
                else {
                    // CHEMSIDER JSONP TIMES OUT!!! HANDLER..?
                }
            }
        }, this);

    },

    storeLoadComplete:function (store, records, success) {
		console.log('DynamicGrid: storeLoadComplete()');
		gridView = this.getGridView();
		gridView.setTitle(gridView.gridBaseTitle + ' - Total Records: ' + gridView.getStore().getTotalCount());
}
});
Ext.define('LSP.view.larkc_sim_search.SimSearchScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.SimSearchScrollingGrid',
        layout:'fit',
		//         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
		// 					itemId: 'pager_id',
		// 					store: 'CompoundPharmacologyPaginatedStore'
		// }),
		verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:[
        ],
		listeners: {
		    'sortchange': function(ct, column, direction, eOpts ) {
				console.log('SimSearchScrollingGrid: sortchange()');
				this.setLoading(true);
		    }
		},
		refs:[
			// {
			// 	ref:'pager',
			//         		selector:'#pager_id'
			// }
		],
        store:Ext.create('LDA.store.SimSearchStore', {}),
		// dockedItems: [{
		//         xtype: 'dynamicpagingtoolbar',
		// 		itemId: 'pager_id',
		//         dock: 'bottom',
		// 		store: 'CompoundPharmacologyPaginatedStore',
		//         displayInfo: true
		//     }],
        columns:[
				{
					xtype: 'rownumberer',
					width: 40
				},
                {
					//TODO: renderer for chemical structure image (from chemspider?)
                    header:'Structure',
                    dataIndex:'cs_compound_uri',
					xtype: 'templatecolumn',
					tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
					sortable:false
                },
                {
                    header:'Smiles',
                    dataIndex:'compound_smiles'
                },
                {
                    header:'Std Value',
                    dataIndex:'activity_standard_value'
                },
                {
                    header:'Chemspider ID',
                    dataIndex:'cs_compound_uri',
					sortable:false
                },
                {
                    header:'Inchi key',
                    dataIndex:'compound_inchikey'
                },
                {
                    header:'Std Type',
                    dataIndex:'activity_activity_type'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                },
                {
                    header:'Std Unit',
                    dataIndex:'activity_standard_units'
                },
                {
                    header:'Target Name',
                    dataIndex:'target_title'
                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation'
                },
                {
                    header:'Molweight',
                    dataIndex:'compound_full_mwt'
                },
                {
                    header:'Inchi',
                    dataIndex:'compound_inchi'
                },
                {
                    header:'Compound name',
                    dataIndex:'compound_pref_label'
                }
            ]
	}
);
Ext.define('LSP.controller.SimSearchForm', {
    extend:'Ext.app.Controller',

    views:['larkc_sim_search.SimSearchForm', 'mol_editor_forms.KetcherForm', 'dataview.StructureViewer','larkc_sim_search.SimSearchScrollingGrid'],

    refs:[
        {
            ref:'ssform', // reference to the view
            selector:'SimSearchForm'
        },
        {
            ref:'strucGrid',
            selector:'#simSearchGrid'
        },
        {
            ref:'submitButton',
            selector:'SimSearchForm #sim_sss_start_search_button_id'
        }
    ],

    init:function () {
	    console.log('LSP.controller.SimSearchForm: init()');
        this.control({
            'SimSearchForm button[action=ketcher_editor]':{
                click:this.launchKetcher
            },
            'KetcherForm button[action=commit_structure]':{
                click:this.getSmiles
            },
            'SimSearchForm button[action=query]':{
                click:this.submitQuery
            },
            'SimSearchForm':{
                historyToken:this.handleHistoryToken,
                afterrender:this.prepGrid
            }
        });


    },

    prepGrid:function () {
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

    storeLoadComplete:function (store, records, success) {
        console.log('PharmByTargetNameForm: storeLoadComplete()');
        this.getSubmitButton().enable();
        this.getSsform().doLayout();
		this.getSsform().setLoading(false);
		this.callParent();
    },

    hitCoreAPI:function (csid_list) {
        console.log('hitCoreAPI');
        console.log(csid_list)
        var grid = this.getStrucGrid();
//        grid.on('scrollershow', function() { grid.view.refresh(); alert("Refreshing..?"); }, this, {single: true, delay: 3000});
        grid.store.proxy.extraParams = {csids:csid_list.join(',')};
        grid.store.load({params:{offset:0, limit:100}});
    },

    handleHistoryToken:function (historyTokenObject) {
	    console.log('SimSearchForm: handleHistoryToken()');
        console.log(historyTokenObject);
        var me = this;
        var searchEngine = Ext.create('CS.engine.search.Structure', {
            listeners:{
                finished:function (sender, rid) {
                    searchEngine.loadCSIDs(function (csids) {
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
        if (values.search_type == '1') {    //  Exact structure search
            grid_title = 'Exact structure match';
            search_type = 'exact';
        }
        else if (values.search_type == '2') {   //  SubStructure search
            grid_title = 'Substructure structure';
            search_type = 'substructure';
        }
        else if (values.search_type == '3') {   //  Similarity search
            grid_title = 'Similarity search';
            search_type = 'similarity';
            //  In the future this parameters should be taken from the UI.
            //  But right now in order to make Similarity search more realistic they are entered manually.
            params['searchOptions.Threshold'] = 0.99;
            params['searchOptions.SimilarityType'] = 'Tanimoto';
        }
        else {
            //  Unsupported search type...
        }
        this.getStrucGrid().setTitle(grid_title);
        this.getSsform().setLoading(true);
        searchEngine.doSearch(search_type, params);
    },

    // Launch ketcher window
    launchKetcher:function (button) {
        // Launch the window
        var view = Ext.widget('KetcherForm');
        // Check to see if we already have a structure to modify and load it if we do
        fields = this.getSsform().form.getFields().items;
        var molfile = '';
        fields.forEach(function (item) {
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
    getSmiles:function (button) {
        var ketcher_window = document.getElementById('ketcher_box_id');
        // smiles is used for query
        smiles = ketcher_window.contentWindow.ketcher.getSmiles();
        // molfile is stored in hidden field for use when updating existing structure
        molfile = ketcher_window.contentWindow.ketcher.getMolfile();
        // We get all fields in form so that we can update the right one
        fields = this.getSsform().form.getFields().items;
        fields.forEach(function (item) {
            if (item.name == 'smiles') {
                item.setValue(smiles)
            } else if (item.name == 'molfile') {
                item.setValue(molfile)
            }
        });
        button.up('KetcherForm').close();
    },

    submitQuery:function (button) {
        console.log('submitQuery');
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
//       var temp_store =§ Ext.create('LSP.store.DynamicGrid');
//       temp_store.proxy.actionMethods = {read: 'POST'};
//       temp_store.proxy.api.read = '/core_api_calls/compound_info.json';
//       var offset = 0;
//     //  this_gridview.setLoading(true);
//       this.recursiveAddCompoundInfo(csids,this_store,temp_store,this_controller, 0);
//     },
//     
//     recursiveAddCompoundInfo: function(csids,grid_store, temp_store,this_controller, dept) {
//       var csid = csids[0];
//       var remaining_csids = csids.slice(1);
//       if (dept > 6) {return true;}
//       dept++;
//       var last_csid = remaining_csids.length == 0;
//       temp_store.load({params: { offset: 0, limit: 1, compound_uri: 'http://rdf.chemspider.com/' + csid}});
//       temp_store.on('load',function(){
//           grid_store.loadRecords(temp_store.getRange(),{addRecords: true});
//       });    
//       if (last_csid){ return;}
//       this_controller.recursiveAddCompoundInfo(remaining_csids,grid_store,temp_store,this_controller, dept);
//   //    })
//   }
});

Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.PharmByTargetNameForm',
    closable:true,
    requires:[
        'LSP.view.dynamicgrid.DynamicGrid'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },
	// Use a PagingGridScroller (this is interchangeable with a PagingToolbar)
	    verticalScrollerType: 'paginggridscroller',
	    // do not reset the scrollbar when the view refreshs
	    invalidateScrollerOnRefresh: false,
	    // infinite scrolling does not support selection
	    disableSelection: true,
    initComponent:function () {
		console.log('PharmByTargetNameForm: constructor()');
        this.items = [
            {
                xtype:'label',
                html:'<span style="font-family: verdana; color: grey; ">Hint: Type in protein name and species. E.g. \"ADA protein human\"</span>',
                labelWidth:400,
                padding:'5 0 0 140'
            },
            {
                xtype:'container',
                margin:'0 5 5 5',
                name:'form_fields',
                layout:{
                    type:'column'
                },
                style:'background-color: #fff;',
                items:[
                      Ext.create('CW.view.ConceptWikiLookup', {
                        xtype:'conceptWikiLookup',
                        fieldLabel:'Protein name',
                        itemId: 'pharmByProteinCWLookup',
                        name: 'protein_uri',
                        cwTagUuid: 'eeaec894-d856-4106-9fa1-662b1dc6c6f1'   // This is the ConceptWiki tag uuid for proteins. Must be set to use method!
                    }),
                    {
                        xtype:'button',
                        itemId:'pharmByTargetSubmit_id',
                        padding:'5 5 5 5',
                        text:'Search...',
                        disabled:true,
                        name:'query_summit_button',
                        action:'query_pharm_by_target_name'
                    }
                ]
            },
//                        dymgridwidget
//            {
//                xtype:'dynamicgrid3',
//                itemId:'pharmByTargetGrid_id',
//                title:'Pharmacology by Target name search results',
//                gridBaseTitle:'Pharmacology by Target name search results',
//                flex:1,
//                readUrl:'/core_api_calls/pharm_by_protein_name.json'
//    }
            {
	            // xtype:'PharmByTargetNameGrid',
                xtype:'PharmByTargetNameScrollingGrid',
                itemId:'pharmByTargetNameGrid',
                title:'Pharmacology by Target name search results',
                gridBaseTitle:'Pharmacology by Target name search results',
                flex:1
            }
        ];
        this.callParent(arguments);
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 12/07/2012
 * Time: 14:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.view.pharm_by_target_name2.PharmByTargetNameScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByTargetNameScrollingGrid',
        layout:'fit',
		verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:[
        ],
		listeners: {
		    'sortchange': function(ct, column, direction, eOpts ) {
				console.log('PharmByTargetNameGrid: sortchange()');
				this.setLoading(true);
		    }
		},
        store:'TargetPharmacologyPaginatedStore',
        columns:
			//TODO: removed this rendering because it stops the download as csv from working (this.geCell(record,index) fails with undefined error)
            // defaults:{
            //                 renderer:function (value, metaData, record, rowIndex, colIndex, store, view) {
            //                     if (LDAProvenanceMode != LDA_PROVENANCE_OFF) {
            //                         var data = this.columns[colIndex].dataIndex;
            //                         data += '_src';
            //                         var source = record.data[data];
            //                         var cls = LDA_SRC_CLS_MAPPINGS[source];
            //                         if (!cls) {
            //                             cls = 'defaultValue';
            //                         }
            //                         //                    console.log(data + ' : ' + source + ' : ' + cls);
            //                         cls += LDAProvenanceMode;
            //                         if (LDAProvenanceMode == LDA_PROVENANCE_COLOUR) {
            //                             return '<div class="' + cls + '">' + value + '</div>';
            //                         } else if (LDAProvenanceMode == LDA_PROVENANCE_ICON) {
            //                             //this needs an img adding in
            //                             return '<div class="' + cls + '">' + value + '</div>';
            //                         } else if (LDAProvenanceMode == LDA_PROVENANCE_TEXT) {
            //                             return '<div class="' + cls + '">' + value + ' (' + source + ')</div>';
            //                         }
            //                     } else {
            //                         return value;
            //                     }
            //                 }
            //             },

            [
			{
				xtype: 'rownumberer',
				width: 40
			},
            {
				//TODO: renderer for chemical structure image (from chemspider?)
                header:'Structure',
                dataIndex:'cs_compound_uri',
				xtype: 'templatecolumn',
				tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
				sortable:false
            },
            {
                header:'Smiles',
                dataIndex:'compound_smiles'
            },
            {
                header:'Std Value',
                dataIndex:'activity_standard_value'
            },
            {
                header:'Chemspider ID',
                dataIndex:'cs_compound_uri',
				sortable:false
            },
            {
                header:'Inchi key',
                dataIndex:'compound_inchikey'
            },
            {
                header:'Std Type',
                dataIndex:'activity_activity_type'
            },
            {
                header:'Std Unit',
                dataIndex:'activity_standard_units'
            },
            {
                header:'Target Name',
                dataIndex:'target_pref_label'
            },
            {
                header:'Relation',
                dataIndex:'activity_relation'
            },
            {
                header:'Molweight',
                dataIndex:'compound_full_mwt'
            },
            {
                header:'Inchi',
                dataIndex:'compound_inchi'
            },
            {
                header:'Compound name',
                dataIndex:'compound_pref_label'
            },
			{
				header: 'Compound cw',
				dataIndex: 'cw_compound_uri'
			}
            ]
        
    }
);
Ext.define('LSP.view.pharm_by_enzyme_family.PharmByEnzymeFamilyScrollingGrid', {
    extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByEnzymeFamilyScrollingGrid',
        layout:'fit',
 		verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:[

        ],
		listeners: {
		    'sortchange': function(ct, column, direction, eOpts ) {
				console.log('PharmByEnzymeFamilyScrollingGrid: sortchange()');
				this.setLoading(true);
		    }
		},
        store:'EnzymeFamilyPaginatedStore',
        columns:{
            defaults:{
            },

            items:[
				{
					xtype: 'rownumberer',
					width: 40
				},
                {
                    header:'Structure',
                    dataIndex:'cs_compound_uri',
					
					xtype: 'templatecolumn',
					tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
					sortable:false
                },
                {
                    header:'Smiles',
                    dataIndex:'compound_smiles'
                },
                {
                    header:'Std Value',
                    dataIndex:'activity_standard_value'
                },
                {
                    header:'Chemspider ID',
                    dataIndex:'cs_compound_uri',
					sortable:false
                },
                {
                    header:'Inchi key',
                    dataIndex:'compound_inchikey'
                },
                {
                    header:'Std Type',
                    dataIndex:'activity_activity_type'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                },
                {
                    header:'Assay Organism',
                    dataIndex:'assay_organism'
                },
                {
                    header:'Target Name',
                    dataIndex:'target_title'
                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation'
                },
                {
                    header:'Molweight',
                    dataIndex:'compound_full_mwt'
                },
                {
                    header:'Inchi',
                    dataIndex:'compound_inchi'
                },
                {
                    header:'Compound name',
                    dataIndex:'compound_pref_label'
                }
            ]
        }
    }
);
Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid', {
        extend:'LSP.view.dynamicgrid.DynamicGrid',
        alias:'widget.PharmByCmpdNameScrollingGrid',
        layout:'fit',
		//         verticalScroller: Ext.create('LDA.helper.DynamicPagingToolbar', {
		// 					itemId: 'pager_id',
		// 					store: 'CompoundPharmacologyPaginatedStore'
		// }),
		verticalScrollerType: Ext.create('LDA.helper.DynamicPagingToolbar',{itemId: 'pager_id'}),
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        requires:[
        ],
		listeners: {
		    'sortchange': function(ct, column, direction, eOpts ) {
				console.log('PharmByCmpdNameScrollingGrid: sortchange()');
				this.setLoading(true);
		    }
		},
		refs:[
			// {
			// 	ref:'pager',
			//         		selector:'#pager_id'
			// }
		],
        store:'CompoundPharmacologyPaginatedStore',
		// dockedItems: [{
		//         xtype: 'dynamicpagingtoolbar',
		// 		itemId: 'pager_id',
		//         dock: 'bottom',
		// 		store: 'CompoundPharmacologyPaginatedStore',
		//         displayInfo: true
		//     }],
        columns:[
				{
					xtype: 'rownumberer',
					width: 40
				},
                {
					//TODO: renderer for chemical structure image (from chemspider?)
                    header:'Structure',
                    dataIndex:'cs_compound_uri',
					xtype: 'templatecolumn',
					tpl:'<img width="128" height="128" src="http://www.chemspider.com/ImagesHandler.ashx?id={csid}&w=128&h=128" alt="CSID:{csid}"/>',
					sortable:false
                },
                {
                    header:'Smiles',
                    dataIndex:'compound_smiles'
                },
                {
                    header:'Std Value',
                    dataIndex:'activity_standard_value'
                },
                {
                    header:'Chemspider ID',
                    dataIndex:'cs_compound_uri',
					sortable:false
                },
                {
                    header:'Inchi key',
                    dataIndex:'compound_inchikey'
                },
                {
                    header:'Std Type',
                    dataIndex:'activity_activity_type'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                },
                {
                    header:'Std Unit',
                    dataIndex:'activity_standard_units'
                },
                {
                    header:'Target Name',
                    dataIndex:'target_title'
                },
                {
                    header:'Relation',
                    dataIndex:'activity_relation'
                },
                {
                    header:'Molweight',
                    dataIndex:'compound_full_mwt'
                },
                {
                    header:'Inchi',
                    dataIndex:'compound_inchi'
                },
                {
                    header:'Compound name',
                    dataIndex:'compound_pref_label'
                }
            ]
	}
);
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.Enzymetree', {
    extend:'Ext.tree.Panel',
    alias:'widget.enzymeTree',


    requires:[
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*'
    ],


    singleExpand:true,
    //simpleSelect: true,
    multiSelect:false,
    rootVisible:false,
    useArrows:true,
    frame:true,
    height:550,
    autoScroll:true,
    columns:[
        {
            xtype:'treecolumn', //this is so we know which column will show the tree
            text:'EC number',
            sortable:true,
            dataIndex:'ec_number',
            width:160
        },
        {
            text:'Enzyme family name',
            dataIndex:'name',
            width:290
        }
    ],


    initComponent:function () {
	    console.log('EnzymeTree: initComponent()');
        var config = {
            store:{
                fields:[
                    {name:'ec_number', type:'string', sortDir:'ASC'},
                    {name:'name', type:'string'}
                ],
                proxy:{
                    type:'ajax',
                    api:{
                        read:'enzymes.json'
                    },
                    reader:{
                        type:'json',
                        root:'objects',
                        totalProperty:'totalCount'
                    }
                },
                sorters:[
                    {
                        property:'ec_number',
                        direction:'ASC'
                    }
                ],
                sortOnLoad:true
            }
            // autoLoad: 'enzymes.json',
            // folderSort: true
        };

        Ext.apply(this, config);
        Ext.apply(this.initialConfig, config);
        this.callParent(arguments);
    }
});
Ext.define('LSP.view.dropdowns.conceptWikiCompoundLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.conceptWikiCompoundLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'concept_label'},
            {type:'string', name:'concept_url'},
            {type:'string', name:'define_url'},
            {type:'string', name:'concept_uuid'},
            {type:'string', name:'concept_alt_labels'},
            {type:'string', name:'tag_label'},
            {type:'string', name:'tag_uuid'},
            {type:'string', name:'match'}


        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/concept_wiki_api_calls/compound_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
    valueField:'concept_url',
    displayField:'concept_label',
    name:'compound_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    allowBlank:false,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    fieldLabel:'Compound name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching compounds found.',
        getInnerTpl:function () {
//                    return '<p><font face="verdana" color="grey"><small>Match: {match}</small></font><br/><b>{concept_label}</b> <a href="{define_url}" target="_blank">(definition)</a><br/ ><small>Alt. terms: <i>{concept_alt_labels}</i></small></p>';
            return '<p><span style="font-family: verdana; color: grey; "><small>Match: {match}</small></span><br/><b>{concept_label}</b> <a href="{define_url}" target="_blank">(definition)</a></p>';  // version without alternative labels for compounds

        }
    }
});

Ext.define('LSP.controller.PharmByTargetNameForm', {
        extend:'LSP.controller.grids.DynamicGrid',

    views:['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameScrollingGrid'],
    // views:['pharm_by_target_name2.PharmByTargetNameForm', 'pharm_by_target_name2.PharmByTargetNameGrid'],
    refs:[
        {
            ref:'gridView', // reference to the view
            selector:'#pharmByTargetNameGrid'
        },
        {
            ref:'formView',
            selector:'PharmByTargetNameForm'
        },
        {
            ref:'submitButton',
            selector:'#pharmByTargetSubmit_id'

        }
    ],

    init:function () {
		console.log('PharmByTargetNameForm: init()');
        this.control({
            'PharmByTargetNameForm button[action=query_pharm_by_target_name]':{
                click:this.submitQuery
            },
            'PharmByTargetNameForm conceptWikiLookup':{
                select:this.enableSubmit
            },
            'PharmByTargetNameForm':{
                afterrender:this.prepGrid,
                historyToken:this.handleHistoryToken
            }
        });
    },


    handleHistoryToken:function (historyTokenObject) {
	    if (historyTokenObject.u) {
            var dg = this.getGridView();
            var store = dg.store;
            if (historyTokenObject.u != store.proxy.extraParams.uri) {
                store.proxy.extraParams.uri = historyTokenObject.u;
				store.proxy.reader.uri = historyTokenObject.u;
                dg.setLoading(true);
				this.fetchTotalResults();
                // store.load();
            }
        } else if (historyTokenObject.s) {
            var lookup = this.getLookup();
            lookup.setRawValue(historyTokenObject.s);
            lookup.doQuery(historyTokenObject.s);
        }
    },

	fetchTotalResults:function() {
		console.log('PharmByTargetNameForm: fetchTotalResults()');
		var grid_view = this.getGridView();
		var grid_store = grid_view.getStore();
		var form = this.getFormView();
        var button = this.getSubmitButton();
		countStore = Ext.create('LDA.store.TargetPharmacologyCountStore');
		countStore.uri = grid_store.proxy.reader.uri;
			countStore.load(function(records, operation, success) {
				total = operation.response.result.primaryTopic.targetPharmacologyTotalResults;
				grid_store.proxy.reader.total_count = total;
				// we have the total number of results now and the proxy reader knows what it is so
				// fetch the first page of results
				if (total == 0) {
					grid_view.setTitle(grid_view.gridBaseTitle + ' - No records found within OPS for this search!');
					grid_view.down('#sdfDownload_id').disable();
					grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
			        grid_view.down('#sdfDownloadProxy_id').disable();
			        button.enable();
			        grid_view.setLoading(false);
						            Ext.MessageBox.show({
						                title:'Info',
						                msg:'The OPS system does not contain any data that match this search.',
						                buttons:Ext.MessageBox.OK,
						                icon:Ext.MessageBox.INFO
						            });
						        } else {
					// for paginated grid use this
					// grid_store.load();
					grid_store.guaranteeRange(0,49);
				}		
			});
	},

    prepGrid:function () {
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var grid_view = this.getGridView();
        var store = grid_view.getStore();
        store.on('prefetch', this.storeLoadComplete, this);
        // store.on('load', this.storeLoadComplete, this);
        // store.setPage(1);

//        var add_next_button = Ext.ComponentQuery.query('PharmByTargetNameForm dynamicgrid3 #nextRecords')[0];
//        add_next_button.on('click', function () {
//            var form_values = add_next_button.up('form').getValues();
//            grid_controller.addNextRecords(grid_view, form_values);
//        });

//        grid_view.store.proxy.actionMethods = {read:'POST'};
//        grid_view.store.proxy.api.read = grid_view.readUrl;
//        grid_view.store.proxy.params = {offset:0, limit:100};


    },

    storeLoadComplete:function (store, records, success) {
        console.log('PharmByTargetNameForm: storeLoadComplete()');
		grid_view = this.getGridView();
		grid_view.down('#sdfDownload_id').disable();
		grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
        grid_view.down('#sdfDownloadProxy_id').enable();
        var form = this.getFormView();
        var button = this.getSubmitButton();
        button.enable();
        grid_view.setLoading(false);
		this.callParent();
    },

    createGridColumns:function () {
	    console.log('PharmByTargetNameForm: createGridColumns()');
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var this_gridview = this.getGridView();
        grid_controller.storeLoad(this_gridview);
    },


    enableSubmit:function (proteinLookup) {
        var button = this.getSubmitButton();
        button.enable();
    },

    submitQuery:function (button) {
        var form = button.up('form');
        button.disable();
        var values = form.getValues();
        Ext.History.add('!p=PharmByTargetNameForm&u=' + values.protein_uri);
    }
});
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.tree_selector_forms.EnzymeTreeForm', {
    extend:'Ext.window.Window',
    alias:'widget.EnzymeTreeForm',

    requires:['Ext.form.Panel', 'LSP.view.Enzymetree'],

    title:'Select an enzyme family',
    layout:'fit',
    modal:true,
    autoShow:true,
    height:600,
    width:500,

    items:[
        {
            xtype:'form',
            padding:'0 0 0 0',
            border:false,
            style:'background-color: #fff;',

            items:[
                {
                    xtype:'enzymeTree'
                }
            ]
        }
    ],

    buttons:[
        {
            text:'Use selection',
            action:'get_enzyme'
        },
        {
            text:'Cancel',
            action:'hide_enzyme_form'
        }
    ],

    initComponent:function () {
		console.log('EnzymeTreeForm: initComponent()');
        this.callParent(arguments);
    }
})
;

Ext.define('LSP.view.pharm_by_enzyme_family.PharmEnzymeForm', {
    extend:'Ext.form.Panel',
    alias:'widget.PharmEnzymeForm',
    closable:true,
    requires:[
        'LSP.view.tree_selector_forms.EnzymeTreeForm',
	        'LSP.view.dynamicgrid.DynamicGrid'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
		console.log('PharmEnzymeForm: initComponent()');
        this.items = [
            {
                xtype:'container',
                height:34,
                name:'form_fields',
                //      width: 600,
                layout:{
                    type:'column'
                },
	                items:[
	                    {
	                        xtype:'displayfield',
	                        name:'enzyme_family',
	                        margin:'5 5 5 5',
	                        width:688,
	                        value:'No enzyme class selected - press button ->',
	                        fieldLabel:'Enzyme family class',
	                        labelWidth:130
	                    },
	                    {
	                        xtype:'button',
	                        padding:'5 5 5 5',
	                        text:'Browse EC codes',
	                        action:'enz_tree'
	                    },
	                    {
	                        name:'enz_name',
	                        xtype:'hidden',
	                        value:''
	                    },
	                    {
	                        name:'ec_number',
	                        xtype:'hidden',
	                        value:''
	                    }
	                ]
	            },
				{
				    xtype:'button',
					action:'query',
					itemId:'submitEnzymePharm_id',
					text:'Start search...'
				},
		        {
		            // xtype:'PharmByEnzymeFamilyGrid',
				    xtype:'PharmByEnzymeFamilyScrollingGrid',
		            itemId:'pharmByEnzymeFamilyGrid',
		            title:'Pharmacology by Enzyme Family search results',
		            gridBaseTitle:'Pharmacology by Enzyme Family search results',
		            flex:1
		        }
		    ];
        this.callParent(arguments);
    }
});
Ext.define('LSP.controller.PharmByEnzymeFamily', {
        extend:'LSP.controller.grids.DynamicGrid',

    views:['pharm_by_enzyme_family.PharmEnzymeForm','pharm_by_enzyme_family.PharmByEnzymeFamilyScrollingGrid', 'tree_selector_forms.EnzymeTreeForm'],
    // views:['pharm_by_enzyme_family.PharmEnzymeForm','pharm_by_enzyme_family.PharmByEnzymeFamilyGrid', 'tree_selector_forms.EnzymeTreeForm'],

    // stores:['LDA.store.EnzymeFamilyPaginatedStore'],

    refs:[
        {
            ref:'gridView', // reference to the view
            selector:'#pharmByEnzymeFamilyGrid'
        },
        {
            ref:'PEform',
            selector:'PharmEnzymeForm'
        },
        {
            ref:'submitButton',
            selector:'#submitEnzymePharm_id'
        
        }
    ],

    init:function () {
	    console.log('PharmByEnzymeFamily: init()');
        this.control({
            'PharmEnzymeForm button[action=enz_tree]':{
                click:this.launchEnzyme
            },
            'EnzymeTreeForm button[action=get_enzyme]':{
                click:this.getEnzyme
            },
            'EnzymeTreeForm button[action=hide_enzyme_form]':{
                click:this.hideEnzyme
            },
            'PharmEnzymeForm #submitEnzymePharm_id':{
                click:this.submitQuery
            },
            'PharmEnzymeForm':{
                afterrender:this.prepGrid,
                historyToken:this.handleHistoryToken
            }
        });
    },


    handleHistoryToken:function (historyTokenObject) {
 	    console.log('PharmByEnzymeFamily: handleHistoryToken()');
        if (historyTokenObject.ec) {
            var dg = this.getGridView();
            var store = dg.getStore();
            dg.setLoading(true);
            store.setURI("http://purl.uniprot.org/enzyme/" + historyTokenObject.ec);
			//use the reader uri when retrieving the count after store load
			store.proxy.reader.uri = "http://purl.uniprot.org/enzyme/" + historyTokenObject.ec;
            this.fetchTotalResults();
        }
    },

	fetchTotalResults:function() {
		console.log('PharmByEnzymeFamily: fetchTotalResults()');
		var grid_view = this.getGridView();
		var grid_store = grid_view.getStore();
		var form = this.getPEform();
        var button = this.getSubmitButton();
		countStore = Ext.create('LDA.store.EnzymeFamilyCountStore');
		countStore.uri = grid_store.proxy.reader.uri;
			countStore.load(function(records, operation, success) {
				if (success) {
				total = operation.response.result.primaryTopic.enzymePharmacologyTotalResults;
				grid_store.proxy.reader.total_count = total;
				// we have the total number of results now and the proxy reader knows what it is so
				// fetch the first page of results
				if (total == 0) {
					grid_view.setTitle(grid_view.gridBaseTitle + ' - No records found within OPS for this search!');
					grid_view.down('#sdfDownload_id').disable();
					grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
			        grid_view.down('#sdfDownloadProxy_id').disable();
			        button.enable();
			        grid_view.setLoading(false);
						            Ext.MessageBox.show({
						                title:'Info',
						                msg:'The OPS system does not contain any data that match this search.',
						                buttons:Ext.MessageBox.OK,
						                icon:Ext.MessageBox.INFO
						            });
						        } else {
					// for pagianted grid use this
					// grid_store.load();
					grid_store.guaranteeRange(0,49);
				}
				}		
			});
	},
	
    prepGrid:function () {
 		console.log('PharmByEnzymeFamily: prepGrid()');
        var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
        var grid_view = this.getGridView();
        var store = grid_view.getStore();
        store.on('prefetch', this.storeLoadComplete, this);
        // store.on('load', this.storeLoadComplete, this);
        // store.setPage(1);
    },

    storeLoadComplete:function (store, records, success) {
		console.log('PharmByEnzymeFamily: storeLoadComplete()');
		grid_view = this.getGridView();
		grid_view.down('#sdfDownload_id').disable();
		grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
        grid_view.down('#sdfDownloadProxy_id').enable();
        var form = this.getPEform();
        var button = this.getSubmitButton();
        button.enable();
        grid_view.setLoading(false);
		this.callParent();
    },

    createGridColumns:function () {
		console.log('PharmByEnzymeFamily: createGridColumns()');
		var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
		var this_gridview = this.getGridView();
		grid_controller.storeLoad(this_gridview);
    },


    // Launch Enzyme class selection window
    launchEnzyme:function (button) {
	    console.log('PharmByEnzymeFamily: launchEnzyme()');
	    // Launch the window
	    var view = Ext.ComponentQuery.query('EnzymeTreeForm')[0];
	    if (view) {
	        console.log('enzyme show');
	        view.show();
	    } else {
	        console.log('enzyme create');
	        view = Ext.widget('EnzymeTreeForm');
	        view.show();
	    }
	},

    hideEnzyme:function (button) {
	    console.log('PharmByEnzymeFamily: hideEnzyme()');
	    var view = Ext.ComponentQuery.query('EnzymeTreeForm')[0];
	    if (view) {
	        console.log('enzyme hide');
	        view.hide();
	    }
	},


	    // Get selection from the enzyme tree window
	    getEnzyme:function (button) {
			console.log('PharmByEnzymeFamily: getEnzyme()');
	        var tree = button.up().up().down('enzymeTree');
	        var selected = tree.getView().getSelectionModel().getSelection();
	        var sel_data = selected[0].data;

	        if (sel_data.leaf) {
	            Ext.Msg.show({
	                title:'Incorrect selection',
	                msg:'Please select an enzyme class (folder).',
	                buttons:Ext.MessageBox.OK,
	                icon:Ext.MessageBox.INFO
	            });
	        } else {
	            var disp_field = this.getPEform().getForm().findField('enzyme_family');
	            disp_field.setValue('<b>' + sel_data.ec_number + ' : ' + sel_data.name + '</b>');
	            var ec_num_field = this.getPEform().getForm().findField('ec_number');
	            ec_num_field.setValue(sel_data.ec_number);
	            var enz_name_field = this.getPEform().getForm().findField('enz_name');
	            enz_name_field.setValue(sel_data.name);
	            this.hideEnzyme('');
	        }
	    },

	    submitQuery:function (button) {
			console.log('PharmByEnzymeFamily: submitQuery()');
	        var form = button.up('form');
	        button.disable();
	        var values = form.getValues();
	        Ext.History.add('!p=PharmEnzymeForm&ec=' + values.ec_number);
	    }
})
;

Ext.define('LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.PharmByCmpdNameForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiCompoundLookup', 'LDA.helper.DynamicPagingToolbar'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },
	// Use a PagingGridScroller (this is interchangeable with a PagingToolbar)
	    // verticalScrollerType: 'dynamicpagingtoolbar',
	    // do not reset the scrollbar when the view refreshs
	    invalidateScrollerOnRefresh: false,
	    // infinite scrolling does not support selection
	    disableSelection: true,
    initComponent:function () {
		console.log('PharmByCmpdNameForm: constructor()');
        this.items = [
            {
                xtype:'label',
                html:'<span style="font-family: verdana; color: grey; ">Hint: Type in compound name. E.g. \"Aspirin\"</span>',
                labelWidth:400,
                padding:'5 0 0 140'
            },
            {
                xtype:'container',
                margin:'0 5 5 5',
                name:'form_fields',
                layout:{
                    type:'column'
                },
                style:'background-color: #fff;',
                items:[
                    {
                        name:'cmpd_uuid',
                        xtype:'hidden',
                        value:''
                    },
                    {
                        xtype:'conceptWikiCompoundLookup',
                        itemId:'pharmByCmpdLookup',
                        fieldLabel:'Compound name',
                        forceSelection:true,
                        allowBlank:false,
                        typeAhead:true,
                        typeAheadDelay:250,
                        queryDelay:200
                    },
                    {
                        xtype:'button',
                        itemId:'pharmByCmpdSubmit_id',
                        padding:'5 5 5 5',
                        text:'Search...',
                        disabled:true,
                        action:'query_pharm_by_cmpd_name'
                    }
                ]},
            {
                xtype:'PharmByCmpdNameScrollingGrid',
                itemId:'pharmByCmpdNameGrid',
                title:'Pharmacology by Compound name search results',
                gridBaseTitle:'Pharmacology by Compound name search results',
                flex:1
            }
        ];
        this.callParent(arguments);
    }
});

Ext.define('LSP.controller.PharmByCmpdNameForm', {
        extend:'LSP.controller.grids.DynamicGrid',
        views:['pharm_by_cmpd_name2.PharmByCmpdNameForm', 'pharm_by_cmpd_name2.PharmByCmpdNameScrollingGrid'],
        // views:['pharm_by_cmpd_name2.PharmByCmpdNameForm', 'pharm_by_cmpd_name2.PharmByCmpdNameGrid'],
        refs:[
            {
                ref:'gridView', // reference to the view
                selector:'#pharmByCmpdNameGrid'
            },
            {
                ref:'formView',
                selector:'PharmByCmpdNameForm'
            },
            {
                ref:'submitButton',
                selector:'#pharmByCmpdSubmit_id'
            },
            {
                ref:'nextRecordsButton',
                selector:'PharmByCmpdNameForm dynamicgrid3 #nextRecords'
            } ,
            {
                ref:'lookup',
                selector:'#pharmByCmpdLookup'
            }
        ],

        init:function () {
			console.log('PharmByCmpdNameForm: init()');
            this.control({
                'PharmByCmpdNameForm button[action=query_pharm_by_cmpd_name]':{
                    click:this.submitQuery
                },
                'PharmByCmpdNameForm conceptWikiCompoundLookup':{
                    select:this.enableSubmit
                },
                'PharmByCmpdNameForm':{
                    historyToken:this.handleHistoryToken,
                    afterrender:this.prepGrid
                }
            });
        },

        handleHistoryToken:function (historyTokenObject) {
            console.log('PharmByCmpdNameForm: handleHistoryToken()');
            if (historyTokenObject.u) {
                var dg = this.getGridView();
                var store = dg.store;
                if (historyTokenObject.u != store.proxy.extraParams.uri) {
                    store.proxy.extraParams.uri = historyTokenObject.u;
					store.proxy.reader.uri = historyTokenObject.u;
                    dg.setLoading(true);
					//loading the store is done after the total results are fetched
					this.fetchTotalResults();
                    // store.load();
                }
            } else if (historyTokenObject.s) {
                var lookup = this.getLookup();
                lookup.setRawValue(historyTokenObject.s);
                lookup.doQuery(historyTokenObject.s);
            }
        },
		fetchTotalResults:function() {
			console.log('PharmByCmpdNameForm: fetchTotalResults()');
			var grid_view = this.getGridView();
			var grid_store = grid_view.getStore();
			var form = this.getFormView();
	        var button = this.getSubmitButton();
			countStore = Ext.create('LDA.store.CompoundPharmacologyCountStore');
			countStore.uri = grid_store.proxy.reader.uri;
				countStore.load(function(records, operation, success) {
					total = operation.response.result.primaryTopic.compoundPharmacologyTotalResults;
					grid_store.proxy.reader.total_count = total;
					// we have the total number of results now and the proxy reader knows what it is so
					// fetch the first page of results
					if (total == 0) {
							            grid_view.setTitle(grid_view.gridBaseTitle + ' - No records found within OPS for this search!');
						grid_view.down('#sdfDownload_id').disable();
						grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
				        grid_view.down('#sdfDownloadProxy_id').disable();
				        button.enable();
				        grid_view.setLoading(false);
							            Ext.MessageBox.show({
							                title:'Info',
							                msg:'The OPS system does not contain any data that match this search.',
							                buttons:Ext.MessageBox.OK,
							                icon:Ext.MessageBox.INFO
							            });
							        } else {
						// for pagianted grid use this
						// grid_store.load();
						grid_store.guaranteeRange(0,49);
					}		
				});
		},

        prepGrid:function () {
            console.log('PharmByCmpdNameForm: prepGrid()');
            var grid_view = this.getGridView();
	        var store = grid_view.getStore();
	        store.on('prefetch', this.storeLoadComplete, this);
	        // store.setPage(1);
            // var add_next_button = this.getNextRecordsButton();
            // add_next_button.on('click', function () {
            //     var form_values = add_next_button.up('form').getValues();
            //     grid_controller.addNextRecords(grid_view, form_values);
            // });
            // 
            // grid_view.store.proxy.actionMethods = {read:'POST'};
            // grid_view.store.proxy.api.read = grid_view.readUrl;
//            grid_view.store.proxy.params = {offset:0, limit:100};

            // grid_view.store.on('load', this.storeLoadComplete, this);
        },

        storeLoadComplete:function (store, records, success) {
            console.log('PharmByCmpdNameForm: storeLoadComplete()');
			grid_view = this.getGridView();
			grid_view.down('#sdfDownload_id').disable();
			grid_view.down('#sdfDownloadProxy_id').setText('Prepare SD-file download');
	        grid_view.down('#sdfDownloadProxy_id').enable();
            // var controller = this.getController('LSP.controller.grids.DynamicGrid');
            // var grid_view = this.getGridView();
            var form = this.getFormView();
            var button = this.getSubmitButton();

            // controller.storeLoad(grid_view, success);
            // form.doLayout();
            button.enable();
            // grid_view.doLayout();
            // grid_view.doComponentLayout();
            grid_view.setLoading(false);
			this.callParent();
        },

        createGridColumns:function () {
	        console.log('PharmByCmpdNameForm: createGridColumns()');
            var grid_controller = this.getController('LSP.controller.grids.DynamicGrid');
            var this_gridview = this.getGridView();
            grid_controller.storeLoad(this_gridview);
        },

        enableSubmit:function (compoundLookup) {
			console.log('PharmByCmpdNameForm: enableSubmit()');
            var form = this.getFormView();
            var button = form.query('button[action=query_pharm_by_cmpd_name]')[0];
            button.enable();
        },

        submitQuery:function (button) {
			console.log('PharmByCmpdNameForm: submitQuery()');
            var form = button.up('form');
            button.disable();
            var values = form.getValues();
            Ext.History.add('!p=PharmByCmpdNameForm&u=' + values.compound_uri);
        }
    }
);

/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

(function () {

    // private property
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // private method for UTF-8 encoding
    function utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    Ext.define("Ext.ux.exporter.Base64", {
        statics:{
            //This was the original line, which tries to use Firefox's built in Base64 encoder, but this kept throwing exceptions....
            // encode : (typeof btoa == 'function') ? function(input) { return btoa(input); } : function (input) {
            encode:function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = utf8Encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                        keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) + keyStr.charAt(enc4);
                }
                return output;
            }}
    });
})();
/**
 * @class Ext.ux.Exporter.Button
 * @extends Ext.Component
 * @author Nige White, with modifications from Ed Spencer, with modifications from iwiznia.
 * Specialised Button class that allows downloading of data via data: urls.
 * Internally, this is just a link.
 * Pass it either an Ext.Component subclass with a 'store' property, or just a store or nothing and it will try to grab the first parent of this button that is a grid or tree panel:
 * new Ext.ux.Exporter.Button({component: someGrid});
 * new Ext.ux.Exporter.Button({store: someStore});
 * @cfg {Ext.Component} component The component the store is bound to
 * @cfg {Ext.data.Store} store The store to export (alternatively, pass a component with a getStore method)
 */
Ext.define("Ext.ux.exporter.Button", {
    extend:"Ext.Component",
    alias:"widget.exporterbutton",
    html:'<p></p>',
    config:{
        swfPath:'/flash/downloadify.swf',
        downloadImage:'/images/ext_reports/download.png',
        width:62,
        height:22,
        downloadName:"download"
    },

    constructor:function (config) {
        config = config || {};

        this.initConfig();
        Ext.ux.exporter.Button.superclass.constructor.call(this, config);

        var self = this;
        // this.store.on("load", function () { // We wait for the combo to be rendered, so we can look up to grab the component containing it
        //     self.setComponent(self.up("dynamicgrid3"), config);
        // }, this, {delay:1000});
      this.on("afterrender", function() { // We wait for the combo to be rendered, so we can look up to grab the component containing it
          self.setComponent(self.store || self.component || self.up("gridpanel") || self.up("treepanel"), config);
      });
    },

    setComponent:function (component, config) {
        this.component = component;
        this.store = !component.is ? component : component.getStore(); // only components or stores, if it doesn't respond to is method, it's a store
        this.setDownloadify(config);
    },

    setDownloadify:function (config) {
        var self = this;
        Downloadify.create(this.el.down('p').id, {
            filename:function () {
                return self.getDownloadName() + "." + Ext.ux.exporter.Exporter.getFormatterByName(self.formatter).extension;
            },
            data:function () {
                return Ext.ux.exporter.Exporter.exportAny(self.component, self.formatter, config);
            },
            onComplete:function () {
                alert('Your File Has Been Saved!');
            },
            onCancel:function () {
                alert('You have cancelled the saving of this file.');
            },
            onError:function () {
                alert('You must put something in the File Contents or there will be nothing to save!');
            },
            transparent:false,
            swf:this.getSwfPath(),
            downloadImage:this.getDownloadImage(),
            width:this.getWidth(),
            height:this.getHeight(),
            transparent:true,
            append:true
        });
    }
});
/**
 * @class Ext.ux.grid.menu.ListMenu
 * @extends Ext.menu.Menu
 * This is a supporting class for {@link Ext.ux.grid.filter.ListFilter}.
 * Although not listed as configuration options for this class, this class
 * also accepts all configuration options from {@link Ext.ux.grid.filter.ListFilter}.
 */
Ext.define('Ext.ux.grid.menu.ListMenu', {
    extend: 'Ext.menu.Menu',

    /**
     * @cfg {String} labelField
     * Defaults to 'text'.
     */
    labelField :  'text',
    /**
     * @cfg {String} paramPrefix
     * Defaults to 'Loading...'.
     */
    loadingText : 'Loading...',
    /**
     * @cfg {Boolean} loadOnShow
     * Defaults to true.
     */
    loadOnShow : true,
    /**
     * @cfg {Boolean} single
     * Specify true to group all items in this list into a single-select
     * radio button group. Defaults to false.
     */
    single : false,

    constructor : function (cfg) {
        var me = this,
            options,
            i,
            len,
            value;
            
        me.selected = [];
        me.addEvents(
            /**
             * @event checkchange
             * Fires when there is a change in checked items from this list
             * @param {Object} item Ext.menu.CheckItem
             * @param {Object} checked The checked value that was set
             */
            'checkchange'
        );

        me.callParent([cfg = cfg || {}]);

        if(!cfg.store && cfg.options) {
            options = [];
            for(i = 0, len = cfg.options.length; i < len; i++){
                value = cfg.options[i];
                switch(Ext.type(value)){
                    case 'array':  options.push(value); break;
                    case 'object': options.push([value.id, value[me.labelField]]); break;
                    case 'string': options.push([value, value]); break;
                }
            }

            me.store = Ext.create('Ext.data.ArrayStore', {
                fields: ['id', me.labelField],
                data:   options,
                listeners: {
                    load: me.onLoad,
                    scope:  me
                }
            });
            me.loaded = true;
            me.autoStore = true;
        } else {
            me.add({
                text: me.loadingText,
                iconCls: 'loading-indicator'
            });
            me.store.on('load', me.onLoad, me);
        }
    },

    destroy : function () {
        var me = this,
            store = me.store;
            
        if (store) {
            if (me.autoStore) {
                store.destroyStore();
            } else {
                store.un('unload', me.onLoad, me);
            }
        }
        me.callParent();
    },

    /**
     * Lists will initially show a 'loading' item while the data is retrieved from the store.
     * In some cases the loaded data will result in a list that goes off the screen to the
     * right (as placement calculations were done with the loading item). This adapter will
     * allow show to be called with no arguments to show with the previous arguments and
     * thus recalculate the width and potentially hang the menu from the left.
     */
    show : function () {
        if (this.loadOnShow && !this.loaded && !this.store.loading) {
            this.store.load();
        }
        this.callParent();
    },

    /** @private */
    onLoad : function (store, records) {
        var me = this,
            gid, itemValue, i, len,
            listeners = {
                checkchange: me.checkChange,
                scope: me
            };

        Ext.suspendLayouts();
        me.removeAll(true);

        gid = me.single ? Ext.id() : null;
        for (i = 0, len = records.length; i < len; i++) {
            itemValue = records[i].get('id');
            me.add(Ext.create('Ext.menu.CheckItem', {
                text: records[i].get(me.labelField),
                group: gid,
                checked: Ext.Array.contains(me.selected, itemValue),
                hideOnClick: false,
                value: itemValue,
                listeners: listeners
            }));
        }

        me.loaded = true;
        Ext.resumeLayouts(true);
        me.fireEvent('load', me, records);
    },

    /**
     * Get the selected items.
     * @return {Array} selected
     */
    getSelected : function () {
        return this.selected;
    },

    /** @private */
    setSelected : function (value) {
        value = this.selected = [].concat(value);

        if (this.loaded) {
            this.items.each(function(item){
                item.setChecked(false, true);
                for (var i = 0, len = value.length; i < len; i++) {
                    if (item.value == value[i]) {
                        item.setChecked(true, true);
                    }
                }
            }, this);
        }
    },

    /**
     * Handler for the 'checkchange' event from an check item in this menu
     * @param {Object} item Ext.menu.CheckItem
     * @param {Object} checked The checked value that was set
     */
    checkChange : function (item, checked) {
        var value = [];
        this.items.each(function(item){
            if (item.checked) {
                value.push(item.value);
            }
        },this);
        this.selected = value;

        this.fireEvent('checkchange', item, checked);
    }
});

/**
 * @class Ext.ux.grid.menu.RangeMenu
 * @extends Ext.menu.Menu
 * Custom implementation of {@link Ext.menu.Menu} that has preconfigured items for entering numeric
 * range comparison values: less-than, greater-than, and equal-to. This is used internally
 * by {@link Ext.ux.grid.filter.NumericFilter} to create its menu.
 */
Ext.define('Ext.ux.grid.menu.RangeMenu', {
    extend: 'Ext.menu.Menu',

    /**
     * @cfg {String} fieldCls
     * The Class to use to construct each field item within this menu
     * Defaults to:<pre>
     * fieldCls : Ext.form.field.Number
     * </pre>
     */
    fieldCls : 'Ext.form.field.Number',

    /**
     * @cfg {Object} fieldCfg
     * The default configuration options for any field item unless superseded
     * by the <code>{@link #fields}</code> configuration.
     * Defaults to:<pre>
     * fieldCfg : {}
     * </pre>
     * Example usage:
     * <pre><code>
fieldCfg : {
    width: 150,
},
     * </code></pre>
     */

    /**
     * @cfg {Object} fields
     * The field items may be configured individually
     * Defaults to <tt>undefined</tt>.
     * Example usage:
     * <pre><code>
fields : {
    gt: { // override fieldCfg options
        width: 200,
        fieldCls: Ext.ux.form.CustomNumberField // to override default {@link #fieldCls}
    }
},
     * </code></pre>
     */

    /**
     * @cfg {Object} iconCls
     * The iconCls to be applied to each comparator field item.
     * Defaults to:<pre>
iconCls : {
    gt : 'ux-rangemenu-gt',
    lt : 'ux-rangemenu-lt',
    eq : 'ux-rangemenu-eq'
}
     * </pre>
     */
    iconCls : {
        gt : 'ux-rangemenu-gt',
        lt : 'ux-rangemenu-lt',
        eq : 'ux-rangemenu-eq'
    },

    /**
     * @cfg {Object} fieldLabels
     * Accessible label text for each comparator field item. Can be overridden by localization
     * files. Defaults to:<pre>
fieldLabels : {
     gt: 'Greater Than',
     lt: 'Less Than',
     eq: 'Equal To'
}</pre>
     */
    fieldLabels: {
        gt: 'Greater Than',
        lt: 'Less Than',
        eq: 'Equal To'
    },

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     * Defaults to:<pre>
menuItemCfgs : {
    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125
}
     * </pre>
     */
    menuItemCfgs : {
        emptyText: 'Enter Number...',
        selectOnFocus: false,
        width: 155
    },

    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu.  Items are added to the menu
     * according to their position within this array. Defaults to:<pre>
     * menuItems : ['lt','gt','-','eq']
     * </pre>
     */
    menuItems : ['lt', 'gt', '-', 'eq'],


    constructor : function (config) {
        var me = this,
            fields, fieldCfg, i, len, item, cfg, Cls;

        me.callParent(arguments);

        fields = me.fields = me.fields || {};
        fieldCfg = me.fieldCfg = me.fieldCfg || {};
        
        me.addEvents(
            /**
             * @event update
             * Fires when a filter configuration has changed
             * @param {Ext.ux.grid.filter.Filter} this The filter object.
             */
            'update'
        );
      
        me.updateTask = Ext.create('Ext.util.DelayedTask', me.fireUpdate, me);
    
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                // defaults
                cfg = {
                    itemId: 'range-' + item,
                    enableKeyEvents: true,
                    hideLabel: false,
                    fieldLabel: me.iconTpl.apply({
                        cls: me.iconCls[item] || 'no-icon',
                        text: me.fieldLabels[item] || '',
                        src: Ext.BLANK_IMAGE_URL
                    }),
                    labelSeparator: '',
                    labelWidth: 29,
                    labelStyle: 'position: relative;',
                    listeners: {
                        scope: me,
                        change: me.onInputChange,
                        keyup: me.onInputKeyUp,
                        el: {
                            click: function(e) {
                                e.stopPropagation();
                            }
                        }
                    },
                    activate: Ext.emptyFn,
                    deactivate: Ext.emptyFn
                };
                Ext.apply(
                    cfg,
                    // custom configs
                    Ext.applyIf(fields[item] || {}, fieldCfg[item]),
                    // configurable defaults
                    me.menuItemCfgs
                );
                Cls = cfg.fieldCls || me.fieldCls;
                item = fields[item] = Ext.create(Cls, cfg);
            }
            me.add(item);
        }
    },

    /**
     * @private
     * called by this.updateTask
     */
    fireUpdate : function () {
        this.fireEvent('update', this);
    },
    
    /**
     * Get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var result = {}, key, field;
        for (key in this.fields) {
            field = this.fields[key];
            if (field.isValid() && field.getValue() !== null) {
                result[key] = field.getValue();
            }
        }
        return result;
    },
  
    /**
     * Set the value of this menu and fires the 'update' event.
     * @param {Object} data The data to assign to this menu
     */	
    setValue : function (data) {
        var me = this,
            key,
            field;

        for (key in me.fields) {
            
            // Prevent field's change event from tiggering a Store filter. The final upate event will do that
            field = me.fields[key];
            field.suspendEvents();
            field.setValue(key in data ? data[key] : '');
            field.resumeEvents();
        }

        // Trigger the filering of the Store
        me.fireEvent('update', me);
    },

    /**  
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp: function(field, e) {
        if (e.getKey() === e.RETURN && field.isValid()) {
            e.stopEvent();
            this.hide();
        }
    },

    /**
     * @private
     * Handler method called when the user changes the value of one of the input
     * items in this menu.
     */
    onInputChange: function(field) {
        var me = this,
            fields = me.fields,
            eq = fields.eq,
            gt = fields.gt,
            lt = fields.lt;

        if (field == eq) {
            if (gt) {
                gt.setValue(null);
            }
            if (lt) {
                lt.setValue(null);
            }
        }
        else {
            eq.setValue(null);
        }

        // restart the timer
        this.updateTask.delay(this.updateBuffer);
    }
}, function() {

    /**
     * @cfg {Ext.XTemplate} iconTpl
     * A template for generating the label for each field in the menu
     */
    this.prototype.iconTpl = Ext.create('Ext.XTemplate',
        '<img src="{src}" alt="{text}" class="' + Ext.baseCSSPrefix + 'menu-item-icon ux-rangemenu-icon {cls}" />'
    );

});

/**
 * @class Ext.ux.Exporter.Formatter
 * @author Ed Spencer (http://edspencer.net)
 * @cfg {Ext.data.Store} store The store to export
 */
Ext.define("Ext.ux.exporter.Formatter", {
    /**
     * Performs the actual formatting. This must be overridden by a subclass
     */
    format:Ext.emptyFn,
    constructor:function (config) {
        config = config || {};

        Ext.applyIf(config, {

        });
    }
});
/**
 * @class Ext.ux.grid.filter.Filter
 * @extends Ext.util.Observable
 * Abstract base class for filter implementations.
 */
Ext.define('Ext.ux.grid.filter.Filter', {
    extend: 'Ext.util.Observable',

    /**
     * @cfg {Boolean} active
     * Indicates the initial status of the filter (defaults to false).
     */
    active : false,
    /**
     * True if this filter is active.  Use setActive() to alter after configuration.
     * @type Boolean
     * @property active
     */
    /**
     * @cfg {String} dataIndex
     * The {@link Ext.data.Store} dataIndex of the field this filter represents.
     * The dataIndex does not actually have to exist in the store.
     */
    dataIndex : null,
    /**
     * The filter configuration menu that will be installed into the filter submenu of a column menu.
     * @type Ext.menu.Menu
     * @property
     */
    menu : null,
    /**
     * @cfg {Number} updateBuffer
     * Number of milliseconds to wait after user interaction to fire an update. Only supported
     * by filters: 'list', 'numeric', and 'string'. Defaults to 500.
     */
    updateBuffer : 500,

    constructor : function (config) {
        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event activate
             * Fires when an inactive filter becomes active
             * @param {Ext.ux.grid.filter.Filter} this
             */
            'activate',
            /**
             * @event deactivate
             * Fires when an active filter becomes inactive
             * @param {Ext.ux.grid.filter.Filter} this
             */
            'deactivate',
            /**
             * @event serialize
             * Fires after the serialization process. Use this to attach additional parameters to serialization
             * data before it is encoded and sent to the server.
             * @param {Array/Object} data A map or collection of maps representing the current filter configuration.
             * @param {Ext.ux.grid.filter.Filter} filter The filter being serialized.
             */
            'serialize',
            /**
             * @event update
             * Fires when a filter configuration has changed
             * @param {Ext.ux.grid.filter.Filter} this The filter object.
             */
            'update'
        );
        Ext.ux.grid.filter.Filter.superclass.constructor.call(this);

        this.menu = this.createMenu(config);
        this.init(config);
        if(config && config.value){
            this.setValue(config.value);
            this.setActive(config.active !== false, true);
            delete config.value;
        }
    },

    /**
     * Destroys this filter by purging any event listeners, and removing any menus.
     */
    destroy : function(){
        if (this.menu){
            this.menu.destroy();
        }
        this.clearListeners();
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * initialize the filter and install required menu items.
     * Defaults to Ext.emptyFn.
     */
    init : Ext.emptyFn,

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        return Ext.create('Ext.menu.Menu', config);
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * get and return the value of the filter.
     * Defaults to Ext.emptyFn.
     * @return {Object} The 'serialized' form of this filter
     * @methodOf Ext.ux.grid.filter.Filter
     */
    getValue : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * set the value of the filter and fire the 'update' event.
     * Defaults to Ext.emptyFn.
     * @param {Object} data The value to set the filter
     * @methodOf Ext.ux.grid.filter.Filter
     */
    setValue : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * return <tt>true</tt> if the filter has enough configuration information to be activated.
     * Defaults to <tt>return true</tt>.
     * @return {Boolean}
     */
    isActivatable : function(){
        return true;
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * get and return serialized filter data for transmission to the server.
     * Defaults to Ext.emptyFn.
     */
    getSerialArgs : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * validates the provided Ext.data.Record against the filters configuration.
     * Defaults to <tt>return true</tt>.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function(){
        return true;
    },

    /**
     * Returns the serialized filter data for transmission to the server
     * and fires the 'serialize' event.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     * @methodOf Ext.ux.grid.filter.Filter
     */
    serialize : function(){
        var args = this.getSerialArgs();
        this.fireEvent('serialize', args, this);
        return args;
    },

    /** @private */
    fireUpdate : function(){
        if (this.active) {
            this.fireEvent('update', this);
        }
        this.setActive(this.isActivatable());
    },

    /**
     * Sets the status of the filter and fires the appropriate events.
     * @param {Boolean} active        The new filter state.
     * @param {Boolean} suppressEvent True to prevent events from being fired.
     * @methodOf Ext.ux.grid.filter.Filter
     */
    setActive : function(active, suppressEvent){
        if(this.active != active){
            this.active = active;
            if (suppressEvent !== true) {
                this.fireEvent(active ? 'activate' : 'deactivate', this);
            }
        }
    }
});

/**
 * @class Ext.ux.Exporter.ExcelFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .xls files
 */
Ext.define("Ext.ux.exporter.excelFormatter.ExcelFormatter", {
    extend:"Ext.ux.exporter.Formatter",
    uses:[
        "Ext.ux.exporter.excelFormatter.Cell",
        "Ext.ux.exporter.excelFormatter.Style",
        "Ext.ux.exporter.excelFormatter.Worksheet",
        "Ext.ux.exporter.excelFormatter.Workbook"
    ],
    contentType:'data:application/vnd.ms-excel;base64,',
    extension:"xls",

    format:function (store, config) {
        var workbook = new Ext.ux.exporter.excelFormatter.Workbook(config);
        workbook.addWorksheet(store, config || {});

        return workbook.render();
    }
});
/**
 * @class Ext.ux.Exporter.CSVFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .csv files
 */
Ext.define("Ext.ux.exporter.csvFormatter.CsvFormatter", {
    extend:"Ext.ux.exporter.Formatter",
    contentType:'data:text/csv;base64,',
    separator:";",
    extension:"csv",

    format:function (store, config) {
        this.columns = config.columns || (store.fields ? store.fields.items : store.model.prototype.fields.items);
        return this.getHeaders() + "\n" + this.getRows(store);
    },
    getHeaders:function (store) {
        var columns = [], title;
        Ext.each(this.columns, function (col) {
            var title;
            if (col.text != undefined) {
                title = col.text;
            } else if (col.name) {
                title = col.name.replace(/_/g, " ");
                title = Ext.String.capitalize(title);
            }

            if (col.text != '&#160') {
                columns.push(title);
            }
        }, this);
        return columns.join(this.separator);
    },
    getRows:function (store) {
        var rows = [];
        store.each(function (record, index) {
            rows.push(this.geCell(record, index));
        }, this);

        return rows.join("\n");
    },
    geCell:function (record, index) {
        var cells = [];
        Ext.each(this.columns, function (col) {
            var name = col.name || col.dataIndex;
            if (name) {
                if (Ext.isFunction(col.renderer)) {
                    var value = col.renderer(record.get(name), null, record);
                } else {
                    var value = record.get(name);
                }
                cells.push(value);
            }
        });

        return cells.join(this.separator);
    }
});
/**
 * @class Ext.ux.Exporter.SDFFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .sdf files
 * Written by Sune Askj�r
 */
Ext.define("Ext.ux.exporter.sdfFormatter.SdfFormatter", {
    extend:"Ext.ux.exporter.Formatter",
    contentType:'data:text/plain;base64,',
    extension:"sdf",

    format:function (store, config) {
        var me = this;
        var sd_rows = [];
        store.each(function (record, index) {
            sd_rows.push(this.buildRecord(config.columns, record, record.molfile));
        }, this);

        return sd_rows.join("\n") + "\n";
    },

    buildRecord:function (columns, row, molfile) {
        var cols = [];
        var csid = row.data.cs_compound_uri.match(/http:\/\/rdf.chemspider.com\/(\d+)/)[1];
        Ext.each(columns, function (column) {
            var data_record = ">  <";
            // todo: check hidden props
            if (!column.hidden && column.text != '&#160') {
                var data = row.data[column.dataIndex];
                // the cell has a custom object instead of a string, use its text attribute
                if (data.text !== undefined) {
                    data = data.text;
                }
                var stripped = this.stripTags(data);
                var escapedText = this.escapeTextSeperator(stripped);
                data_record = data_record + this.stripTags(column.text) + "> (" + csid + ")\n";
                data_record = data_record + escapedText + "\n";
                if (escapedText !== "") {
                    cols.push(data_record);
                }
            }
        }, this);
        return molfile + cols.join("\n") + "\n$$$$";
    },

    /**
     * Little helper function to strip tags from a string.
     * @param strMod
     * @return strMod
     */
    stripTags:function (strMod) {
        if (typeof(strMod) === "string") {
            strMod = strMod.replace(/<(.|\n)*?>/gi, '');
        }
        var tarea = document.createElement('textarea');
        tarea.innerHTML = strMod;
        return tarea.value;
    },

    /**
     * Little helper function to escape CSV Text Seperator.
     * @param strMod
     * @return strMod
     */
    escapeTextSeperator:function (strMod) {
        if (typeof(strMod) === "string") {
            strMod = strMod.replace(/"/gi, '""');
        }
        var tarea = document.createElement('textarea');
        tarea.innerHTML = strMod;
        return tarea.value;
    }
});
/**
 * @class Ext.ux.grid.filter.BooleanFilter
 * @extends Ext.ux.grid.filter.Filter
 * Boolean filters use unique radio group IDs (so you can have more than one!)
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'boolean',
        dataIndex: 'visible'

        // optional configs
        defaultValue: null, // leave unselected (false selected by default)
        yesText: 'Yes',     // default
        noText: 'No'        // default
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.BooleanFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.boolean',

	/**
	 * @cfg {Boolean} defaultValue
	 * Set this to null if you do not want either option to be checked by default. Defaults to false.
	 */
	defaultValue : false,
	/**
	 * @cfg {String} yesText
	 * Defaults to 'Yes'.
	 */
	yesText : 'Yes',
	/**
	 * @cfg {String} noText
	 * Defaults to 'No'.
	 */
	noText : 'No',

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var gId = Ext.id();
		this.options = [
			Ext.create('Ext.menu.CheckItem', {text: this.yesText, group: gId, checked: this.defaultValue === true}),
			Ext.create('Ext.menu.CheckItem', {text: this.noText, group: gId, checked: this.defaultValue === false})];

		this.menu.add(this.options[0], this.options[1]);

		for(var i=0; i<this.options.length; i++){
			this.options[i].on('click', this.fireUpdate, this);
			this.options[i].on('checkchange', this.fireUpdate, this);
		}
	},

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
		return this.options[0].checked;
	},

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
	setValue : function (value) {
		this.options[value ? 0 : 1].setChecked(true);
	},

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
		var args = {type: 'boolean', value: this.getValue()};
		return args;
	},

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
		return record.get(this.dataIndex) == this.getValue();
	}
});

/**
 * @class Ext.ux.grid.filter.StringFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filter by a configurable Ext.form.field.Text
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'string',
        dataIndex: 'name',

        // optional configs
        value: 'foo',
        active: true, // default is false
        iconCls: 'ux-gridfilter-text-icon' // default
        // any Ext.form.field.Text configs accepted
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.StringFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.string',

    /**
     * @cfg {String} iconCls
     * The iconCls to be applied to the menu item.
     * Defaults to <tt>'ux-gridfilter-text-icon'</tt>.
     */
    iconCls : 'ux-gridfilter-text-icon',

    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125,

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        Ext.applyIf(config, {
            enableKeyEvents: true,
            iconCls: this.iconCls,
            hideLabel: true,
            listeners: {
                scope: this,
                keyup: this.onInputKeyUp,
                el: {
                    click: function(e) {
                        e.stopPropagation();
                    }
                }
            }
        });

        this.inputItem = Ext.create('Ext.form.field.Text', config);
        this.menu.add(this.inputItem);
        this.updateTask = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.inputItem.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.inputItem.setValue(value);
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        return this.inputItem.getValue().length > 0;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        return {type: 'string', value: this.getValue()};
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex);

        if(typeof val != 'string') {
            return (this.getValue().length === 0);
        }

        return val.toLowerCase().indexOf(this.getValue().toLowerCase()) > -1;
    },

    /**
     * @private
     * Handler method called when there is a keyup event on this.inputItem
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
            return;
        }
        // restart the timer
        this.updateTask.delay(this.updateBuffer);
    }
});

/**
 * @class Ext.ux.grid.filter.NumericFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filters using an Ext.ux.grid.menu.RangeMenu.
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        type: 'numeric',
        dataIndex: 'price'
    }]
});
 * </code></pre>
 * <p>Any of the configuration options for {@link Ext.ux.grid.menu.RangeMenu} can also be specified as
 * configurations to NumericFilter, and will be copied over to the internal menu instance automatically.</p>
 */
Ext.define('Ext.ux.grid.filter.NumericFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.numeric',
    uses: ['Ext.form.field.Number'],

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var me = this,
            menu;
        menu = Ext.create('Ext.ux.grid.menu.RangeMenu', config);
        menu.on('update', me.fireUpdate, me);
        return menu;
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.menu.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.menu.setValue(value);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var values = this.getValue(),
            key;
        for (key in values) {
            if (values[key] !== undefined) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var key,
            args = [],
            values = this.menu.getValue();
        for (key in values) {
            args.push({
                type: 'numeric',
                comparison: key,
                value: values[key]
            });
        }
        return args;
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex),
            values = this.getValue(),
            isNumber = Ext.isNumber;
        if (isNumber(values.eq) && val != values.eq) {
            return false;
        }
        if (isNumber(values.lt) && val >= values.lt) {
            return false;
        }
        if (isNumber(values.gt) && val <= values.gt) {
            return false;
        }
        return true;
    }
});

/**
 * @class Ext.ux.grid.filter.ListFilter
 * @extends Ext.ux.grid.filter.Filter
 * <p>List filters are able to be preloaded/backed by an Ext.data.Store to load
 * their options the first time they are shown. ListFilter utilizes the
 * {@link Ext.ux.grid.menu.ListMenu} component.</p>
 * <p>Although not shown here, this class accepts all configuration options
 * for {@link Ext.ux.grid.menu.ListMenu}.</p>
 *
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        type: 'list',
        dataIndex: 'size',
        phpMode: true,
        // options will be used as data to implicitly creates an ArrayStore
        options: ['extra small', 'small', 'medium', 'large', 'extra large']
    }]
});
 * </code></pre>
 *
 */
Ext.define('Ext.ux.grid.filter.ListFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.list',

    /**
     * @cfg {Array} options
     * <p><code>data</code> to be used to implicitly create a data store
     * to back this list when the data source is <b>local</b>. If the
     * data for the list is remote, use the <code>{@link #store}</code>
     * config instead.</p>
     * <br><p>Each item within the provided array may be in one of the
     * following formats:</p>
     * <div class="mdetail-params"><ul>
     * <li><b>Array</b> :
     * <pre><code>
options: [
    [11, 'extra small'],
    [18, 'small'],
    [22, 'medium'],
    [35, 'large'],
    [44, 'extra large']
]
     * </code></pre>
     * </li>
     * <li><b>Object</b> :
     * <pre><code>
labelField: 'name', // override default of 'text'
options: [
    {id: 11, name:'extra small'},
    {id: 18, name:'small'},
    {id: 22, name:'medium'},
    {id: 35, name:'large'},
    {id: 44, name:'extra large'}
]
     * </code></pre>
     * </li>
     * <li><b>String</b> :
     * <pre><code>
     * options: ['extra small', 'small', 'medium', 'large', 'extra large']
     * </code></pre>
     * </li>
     */
    /**
     * @cfg {Boolean} phpMode
     * <p>Adjust the format of this filter. Defaults to false.</p>
     * <br><p>When GridFilters <code>@cfg encode = false</code> (default):</p>
     * <pre><code>
// phpMode == false (default):
filter[0][data][type] list
filter[0][data][value] value1
filter[0][data][value] value2
filter[0][field] prod

// phpMode == true:
filter[0][data][type] list
filter[0][data][value] value1, value2
filter[0][field] prod
     * </code></pre>
     * When GridFilters <code>@cfg encode = true</code>:
     * <pre><code>
// phpMode == false (default):
filter : [{"type":"list","value":["small","medium"],"field":"size"}]

// phpMode == true:
filter : [{"type":"list","value":"small,medium","field":"size"}]
     * </code></pre>
     */
    phpMode : false,
    /**
     * @cfg {Ext.data.Store} store
     * The {@link Ext.data.Store} this list should use as its data source
     * when the data source is <b>remote</b>. If the data for the list
     * is local, use the <code>{@link #options}</code> config instead.
     */

    /**
     * @private
     * Template method that is to initialize the filter.
     * @param {Object} config
     */
    init : function (config) {
        this.dt = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
    },

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var menu = Ext.create('Ext.ux.grid.menu.ListMenu', config);
        menu.on('checkchange', this.onCheckChange, this);
        return menu;
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.menu.getSelected();
    },
    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.menu.setSelected(value);
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        return this.getValue().length > 0;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        return {type: 'list', value: this.phpMode ? this.getValue().join(',') : this.getValue()};
    },

    /** @private */
    onCheckChange : function(){
        this.dt.delay(this.updateBuffer);
    },


    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var valuesArray = this.getValue();
        return Ext.Array.indexOf(valuesArray, record.get(this.dataIndex)) > -1;
    }
});

/**
 * @class Ext.ux.grid.filter.DateFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filter by a configurable Ext.picker.DatePicker menu
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'date',
        dataIndex: 'dateAdded',

        // optional configs
        dateFormat: 'm/d/Y',  // default
        beforeText: 'Before', // default
        afterText: 'After',   // default
        onText: 'On',         // default
        pickerOpts: {
            // any DatePicker configs
        },

        active: true // default is false
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.DateFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.date',
    uses: ['Ext.picker.Date', 'Ext.menu.Menu'],

    /**
     * @cfg {String} afterText
     * Defaults to 'After'.
     */
    afterText : 'After',
    /**
     * @cfg {String} beforeText
     * Defaults to 'Before'.
     */
    beforeText : 'Before',
    /**
     * @cfg {Object} compareMap
     * Map for assigning the comparison values used in serialization.
     */
    compareMap : {
        before: 'lt',
        after:  'gt',
        on:     'eq'
    },
    /**
     * @cfg {String} dateFormat
     * The date format to return when using getValue.
     * Defaults to 'm/d/Y'.
     */
    dateFormat : 'm/d/Y',

    /**
     * @cfg {Date} maxDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Date} minDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu
     * Defaults to:<pre>
     * menuItems : ['before', 'after', '-', 'on'],
     * </pre>
     */
    menuItems : ['before', 'after', '-', 'on'],

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     */
    menuItemCfgs : {
        selectOnFocus: true,
        width: 125
    },

    /**
     * @cfg {String} onText
     * Defaults to 'On'.
     */
    onText : 'On',

    /**
     * @cfg {Object} pickerOpts
     * Configuration options for the date picker associated with each field.
     */
    pickerOpts : {},

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var me = this,
            pickerCfg, i, len, item, cfg;

        pickerCfg = Ext.apply(me.pickerOpts, {
            xtype: 'datepicker',
            minDate: me.minDate,
            maxDate: me.maxDate,
            format:  me.dateFormat,
            listeners: {
                scope: me,
                select: me.onMenuSelect
            }
        });

        me.fields = {};
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                cfg = {
                    itemId: 'range-' + item,
                    text: me[item + 'Text'],
                    menu: Ext.create('Ext.menu.Menu', {
                        items: [
                            Ext.apply(pickerCfg, {
                                itemId: item
                            })
                        ]
                    }),
                    listeners: {
                        scope: me,
                        checkchange: me.onCheckChange
                    }
                };
                item = me.fields[item] = Ext.create('Ext.menu.CheckItem', cfg);
            }
            //me.add(item);
            me.menu.add(item);
        }
    },

    onCheckChange : function () {
        this.setActive(this.isActivatable());
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
        }
    },

    /**
     * Handler for when the DatePicker for a field fires the 'select' event
     * @param {Ext.picker.Date} picker
     * @param {Object} date
     */
    onMenuSelect : function (picker, date) {
        var fields = this.fields,
            field = this.fields[picker.itemId];

        field.setChecked(true);

        if (field == fields.on) {
            fields.before.setChecked(false, true);
            fields.after.setChecked(false, true);
        } else {
            fields.on.setChecked(false, true);
            if (field == fields.after && this.getFieldValue('before') < date) {
                fields.before.setChecked(false, true);
            } else if (field == fields.before && this.getFieldValue('after') > date) {
                fields.after.setChecked(false, true);
            }
        }
        this.fireEvent('update', this);

        picker.up('menu').hide();
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var key, result = {};
        for (key in this.fields) {
            if (this.fields[key].checked) {
                result[key] = this.getFieldValue(key);
            }
        }
        return result;
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     * @param {Boolean} preserve true to preserve the checked status
     * of the other fields.  Defaults to false, unchecking the
     * other fields
     */
    setValue : function (value, preserve) {
        var key;
        for (key in this.fields) {
            if(value[key]){
                this.getPicker(key).setValue(value[key]);
                this.fields[key].setChecked(true);
            } else if (!preserve) {
                this.fields[key].setChecked(false);
            }
        }
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var key;
        for (key in this.fields) {
            if (this.fields[key].checked) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var args = [];
        for (var key in this.fields) {
            if(this.fields[key].checked){
                args.push({
                    type: 'date',
                    comparison: this.compareMap[key],
                    value: Ext.Date.format(this.getFieldValue(key), this.dateFormat)
                });
            }
        }
        return args;
    },

    /**
     * Get and return the date menu picker value
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Date} Gets the current selected value of the date field
     */
    getFieldValue : function(item){
        return this.getPicker(item).getValue();
    },

    /**
     * Gets the menu picker associated with the passed field
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Object} The menu picker
     */
    getPicker : function(item){
        return this.fields[item].menu.items.first();
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var key,
            pickerValue,
            val = record.get(this.dataIndex),
            clearTime = Ext.Date.clearTime;

        if(!Ext.isDate(val)){
            return false;
        }
        val = clearTime(val, true).getTime();

        for (key in this.fields) {
            if (this.fields[key].checked) {
                pickerValue = clearTime(this.getFieldValue(key), true).getTime();
                if (key == 'before' && pickerValue <= val) {
                    return false;
                }
                if (key == 'after' && pickerValue >= val) {
                    return false;
                }
                if (key == 'on' && pickerValue != val) {
                    return false;
                }
            }
        }
        return true;
    }
});

/**
 * @class Ext.ux.Exporter.ExcelFormatter.Cell
 * @extends Object
 * Represents a single cell in a worksheet
 */

Ext.define("Ext.ux.exporter.excelFormatter.Cell", {
    constructor:function (config) {
        Ext.applyIf(config, {
            type:"String"
        });

        Ext.apply(this, config);

        Ext.ux.exporter.excelFormatter.Cell.superclass.constructor.apply(this, arguments);
    },

    render:function () {
        return this.tpl.apply(this);
    },

    tpl:new Ext.XTemplate(
        '<ss:Cell ss:StyleID="{style}">',
        '<ss:Data ss:Type="{type}"><![CDATA[{value}]]></ss:Data>',
        '</ss:Cell>'
    )
});
/**
 * @class Ext.ux.Exporter.ExcelFormatter.Worksheet
 * @extends Object
 * Represents an Excel worksheet
 * @cfg {Ext.data.Store} store The store to use (required)
 */
Ext.define("Ext.ux.exporter.excelFormatter.Worksheet", {

    constructor:function (store, config) {
        config = config || {};

        this.store = store;

        Ext.applyIf(config, {
            hasTitle:true,
            hasHeadings:true,
            stripeRows:true,

            title:"Workbook",
            columns:store.fields == undefined ? {} : store.fields.items
        });

        Ext.apply(this, config);

        Ext.ux.exporter.excelFormatter.Worksheet.superclass.constructor.apply(this, arguments);
    },

    /**
     * @property dateFormatString
     * @type String
     * String used to format dates (defaults to "Y-m-d"). All other data types are left unmolested
     */
    dateFormatString:"Y-m-d",

    worksheetTpl:new Ext.XTemplate(
        '<ss:Worksheet ss:Name="{title}">',
        '<ss:Names>',
        '<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'{title}\'!R1:R2" />',
        '</ss:Names>',
        '<ss:Table x:FullRows="1" x:FullColumns="1" ss:ExpandedColumnCount="{colCount}" ss:ExpandedRowCount="{rowCount}">',
        '{columns}',
        '<ss:Row ss:Height="38">',
        '<ss:Cell ss:StyleID="title" ss:MergeAcross="{colCount - 1}">',
        '<ss:Data xmlns:html="http://www.w3.org/TR/REC-html40" ss:Type="String">',
        '<html:B><html:U><html:Font html:Size="15">{title}',
        '</html:Font></html:U></html:B></ss:Data><ss:NamedCell ss:Name="Print_Titles" />',
        '</ss:Cell>',
        '</ss:Row>',
        '<ss:Row ss:AutoFitHeight="1">',
        '{header}',
        '</ss:Row>',
        '{rows}',
        '</ss:Table>',
        '<x:WorksheetOptions>',
        '<x:PageSetup>',
        '<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />',
        '<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />',
        '<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />',
        '</x:PageSetup>',
        '<x:FitToPage />',
        '<x:Print>',
        '<x:PrintErrors>Blank</x:PrintErrors>',
        '<x:FitWidth>1</x:FitWidth>',
        '<x:FitHeight>32767</x:FitHeight>',
        '<x:ValidPrinterInfo />',
        '<x:VerticalResolution>600</x:VerticalResolution>',
        '</x:Print>',
        '<x:Selected />',
        '<x:DoNotDisplayGridlines />',
        '<x:ProtectObjects>False</x:ProtectObjects>',
        '<x:ProtectScenarios>False</x:ProtectScenarios>',
        '</x:WorksheetOptions>',
        '</ss:Worksheet>'
    ),

    /**
     * Builds the Worksheet XML
     * @param {Ext.data.Store} store The store to build from
     */
    render:function (store) {
        return this.worksheetTpl.apply({
            header:this.buildHeader(),
            columns:this.buildColumns().join(""),
            rows:this.buildRows().join(""),
            colCount:this.columns.length,
            rowCount:this.store.getCount() + 2,
            title:this.title
        });
    },

    buildColumns:function () {
        var cols = [];

        Ext.each(this.columns, function (column) {
            cols.push(this.buildColumn());
        }, this);

        return cols;
    },

    buildColumn:function (width) {
        return Ext.String.format('<ss:Column ss:AutoFitWidth="1" ss:Width="{0}" />', width || 164);
    },

    buildRows:function () {
        var rows = [];

        this.store.each(function (record, index) {
            rows.push(this.buildRow(record, index));
        }, this);

        return rows;
    },

    buildHeader:function () {
        var cells = [];

        Ext.each(this.columns, function (col) {
            var title;

            //if(col.dataIndex) {
            if (col.text != undefined) {
                title = col.text;
            } else if (col.name) {
                //make columns taken from Record fields (e.g. with a col.name) human-readable
                title = col.name.replace(/_/g, " ");
                title = Ext.String.capitalize(title);
            }

            cells.push(Ext.String.format('<ss:Cell ss:StyleID="headercell"><ss:Data ss:Type="String">{0}</ss:Data><ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>', title));
            //}
        }, this);

        return cells.join("");
    },

    buildRow:function (record, index) {
        var style,
            cells = [];
        if (this.stripeRows === true) style = index % 2 == 0 ? 'even' : 'odd';

        Ext.each(this.columns, function (col) {
            var name = col.name || col.dataIndex;

            if (name) {
                //if given a renderer via a ColumnModel, use it and ensure data type is set to String
                if (Ext.isFunction(col.renderer)) {
                    var value = col.renderer(record.get(name), null, record),
                        type = "String";
                } else {
                    var value = record.get(name),
                        type = this.typeMappings[col.type || record.fields.get(name).type.type];
                }

                cells.push(this.buildCell(value, type, style).render());
            }
        }, this);

        return Ext.String.format("<ss:Row>{0}</ss:Row>", cells.join(""));
    },

    buildCell:function (value, type, style) {
        if (type == "DateTime" && Ext.isFunction(value.format)) value = value.format(this.dateFormatString);

        return new Ext.ux.exporter.excelFormatter.Cell({
            value:value,
            type:type,
            style:style
        });
    },

    /**
     * @property typeMappings
     * @type Object
     * Mappings from Ext.data.Record types to Excel types
     */
    typeMappings:{
        'int':"Number",
        'string':"String",
        'float':"Number",
        'date':"DateTime"
    }
});
/**
 * @class Ext.ux.Exporter.ExcelFormatter.Style
 * @extends Object
 * Represents a style declaration for a Workbook (this is like defining CSS rules). Example:
 *
 * new Ext.ux.Exporter.ExcelFormatter.Style({
 *   attributes: [
 *     {
 *       name: "Alignment",
 *       properties: [
 *         {name: "Vertical", value: "Top"},
 *         {name: "WrapText", value: "1"}
 *       ]
 *     },
 *     {
 *       name: "Borders",
 *       children: [
 *         name: "Border",
 *         properties: [
 *           {name: "Color", value: "#e4e4e4"},
 *           {name: "Weight", value: "1"}
 *         ]
 *       ]
 *     }
 *   ]
 * })
 *
 * @cfg {String} id The ID of this style (required)
 * @cfg {Array} attributes The attributes for this style
 * @cfg {String} parentStyle The (optional parentStyle ID)
 */
Ext.define("Ext.ux.exporter.excelFormatter.Style", {
    constructor:function (config) {
        config = config || {};

        Ext.apply(this, config, {
            parentStyle:'',
            attributes:[]
        });

        Ext.ux.exporter.excelFormatter.Style.superclass.constructor.apply(this, arguments);

        if (this.id == undefined) throw new Error("An ID must be provided to Style");

        this.preparePropertyStrings();
    },

    /**
     * Iterates over the attributes in this style, and any children they may have, creating property
     * strings on each suitable for use in the XTemplate
     */
    preparePropertyStrings:function () {
        Ext.each(this.attributes, function (attr, index) {
            this.attributes[index].propertiesString = this.buildPropertyString(attr);
            this.attributes[index].children = attr.children || [];

            Ext.each(attr.children, function (child, childIndex) {
                this.attributes[index].children[childIndex].propertiesString = this.buildPropertyString(child);
            }, this);
        }, this);
    },

    /**
     * Builds a concatenated property string for a given attribute, suitable for use in the XTemplate
     */
    buildPropertyString:function (attribute) {
        var propertiesString = "";

        Ext.each(attribute.properties || [], function (property) {
            propertiesString += Ext.String.format('ss:{0}="{1}" ', property.name, property.value);
        }, this);

        return propertiesString;
    },

    render:function () {
        return this.tpl.apply(this);
    },

    tpl:new Ext.XTemplate(
        '<tpl if="parentStyle.length == 0">',
        '<ss:Style ss:ID="{id}">',
        '</tpl>',
        '<tpl if="parentStyle.length != 0">',
        '<ss:Style ss:ID="{id}" ss:Parent="{parentStyle}">',
        '</tpl>',
        '<tpl for="attributes">',
        '<tpl if="children.length == 0">',
        '<ss:{name} {propertiesString} />',
        '</tpl>',
        '<tpl if="children.length > 0">',
        '<ss:{name} {propertiesString}>',
        '<tpl for="children">',
        '<ss:{name} {propertiesString} />',
        '</tpl>',
        '</ss:{name}>',
        '</tpl>',
        '</tpl>',
        '</ss:Style>'
    )
});
/**
 * @class Ext.ux.Exporter.ExcelFormatter.Workbook
 * @extends Object
 * Represents an Excel workbook
 */
Ext.define("Ext.ux.exporter.excelFormatter.Workbook", {

    constructor:function (config) {
        config = config || {};

        Ext.apply(this, config, {
            /**
             * @property title
             * @type String
             * The title of the workbook (defaults to "Workbook")
             */
            title:"Workbook",

            /**
             * @property worksheets
             * @type Array
             * The array of worksheets inside this workbook
             */
            worksheets:[],

            /**
             * @property compileWorksheets
             * @type Array
             * Array of all rendered Worksheets
             */
            compiledWorksheets:[],

            /**
             * @property cellBorderColor
             * @type String
             * The colour of border to use for each Cell
             */
            cellBorderColor:"#e4e4e4",

            /**
             * @property styles
             * @type Array
             * The array of Ext.ux.Exporter.ExcelFormatter.Style objects attached to this workbook
             */
            styles:[],

            /**
             * @property compiledStyles
             * @type Array
             * Array of all rendered Ext.ux.Exporter.ExcelFormatter.Style objects for this workbook
             */
            compiledStyles:[],

            /**
             * @property hasDefaultStyle
             * @type Boolean
             * True to add the default styling options to all cells (defaults to true)
             */
            hasDefaultStyle:true,

            /**
             * @property hasStripeStyles
             * @type Boolean
             * True to add the striping styles (defaults to true)
             */
            hasStripeStyles:true,

            windowHeight:9000,
            windowWidth:50000,
            protectStructure:false,
            protectWindows:false
        });

        if (this.hasDefaultStyle) this.addDefaultStyle();
        if (this.hasStripeStyles) this.addStripedStyles();

        this.addTitleStyle();
        this.addHeaderStyle();
    },

    render:function () {
        this.compileStyles();
        this.joinedCompiledStyles = this.compiledStyles.join("");

        this.compileWorksheets();
        this.joinedWorksheets = this.compiledWorksheets.join("");

        return this.tpl.apply(this);
    },

    /**
     * Adds a worksheet to this workbook based on a store and optional config
     * @param {Ext.data.Store} store The store to initialize the worksheet with
     * @param {Object} config Optional config object
     * @return {Ext.ux.Exporter.ExcelFormatter.Worksheet} The worksheet
     */
    addWorksheet:function (store, config) {
        var worksheet = new Ext.ux.exporter.excelFormatter.Worksheet(store, config);

        this.worksheets.push(worksheet);

        return worksheet;
    },

    /**
     * Adds a new Ext.ux.Exporter.ExcelFormatter.Style to this Workbook
     * @param {Object} config The style config, passed to the Style constructor (required)
     */
    addStyle:function (config) {
        var style = new Ext.ux.exporter.excelFormatter.Style(config || {});

        this.styles.push(style);

        return style;
    },

    /**
     * Compiles each Style attached to this Workbook by rendering it
     * @return {Array} The compiled styles array
     */
    compileStyles:function () {
        this.compiledStyles = [];

        Ext.each(this.styles, function (style) {
            this.compiledStyles.push(style.render());
        }, this);

        return this.compiledStyles;
    },

    /**
     * Compiles each Worksheet attached to this Workbook by rendering it
     * @return {Array} The compiled worksheets array
     */
    compileWorksheets:function () {
        this.compiledWorksheets = [];

        Ext.each(this.worksheets, function (worksheet) {
            this.compiledWorksheets.push(worksheet.render());
        }, this);

        return this.compiledWorksheets;
    },

    tpl:new Ext.XTemplate(
        '<?xml version="1.0" encoding="utf-8"?>',
        '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">',
        '<o:DocumentProperties>',
        '<o:Title>{title}</o:Title>',
        '</o:DocumentProperties>',
        '<ss:ExcelWorkbook>',
        '<ss:WindowHeight>{windowHeight}</ss:WindowHeight>',
        '<ss:WindowWidth>{windowWidth}</ss:WindowWidth>',
        '<ss:ProtectStructure>{protectStructure}</ss:ProtectStructure>',
        '<ss:ProtectWindows>{protectWindows}</ss:ProtectWindows>',
        '</ss:ExcelWorkbook>',
        '<ss:Styles>',
        '{joinedCompiledStyles}',
        '</ss:Styles>',
        '{joinedWorksheets}',
        '</ss:Workbook>'
    ),

    /**
     * Adds the default Style to this workbook. This sets the default font face and size, as well as cell borders
     */
    addDefaultStyle:function () {
        var borderProperties = [
            {name:"Color", value:this.cellBorderColor},
            {name:"Weight", value:"1"},
            {name:"LineStyle", value:"Continuous"}
        ];

        this.addStyle({
            id:'Default',
            attributes:[
                {
                    name:"Alignment",
                    properties:[
                        {name:"Vertical", value:"Top"},
                        {name:"WrapText", value:"1"}
                    ]
                },
                {
                    name:"Font",
                    properties:[
                        {name:"FontName", value:"arial"},
                        {name:"Size", value:"10"}
                    ]
                },
                {name:"Interior"},
                {name:"NumberFormat"},
                {name:"Protection"},
                {
                    name:"Borders",
                    children:[
                        {
                            name:"Border",
                            properties:[
                                {name:"Position", value:"Top"}
                            ].concat(borderProperties)
                        },
                        {
                            name:"Border",
                            properties:[
                                {name:"Position", value:"Bottom"}
                            ].concat(borderProperties)
                        },
                        {
                            name:"Border",
                            properties:[
                                {name:"Position", value:"Left"}
                            ].concat(borderProperties)
                        },
                        {
                            name:"Border",
                            properties:[
                                {name:"Position", value:"Right"}
                            ].concat(borderProperties)
                        }
                    ]
                }
            ]
        });
    },

    addTitleStyle:function () {
        this.addStyle({
            id:"title",
            attributes:[
                {name:"Borders"},
                {name:"Font"},
                {
                    name:"NumberFormat",
                    properties:[
                        {name:"Format", value:"@"}
                    ]
                },
                {
                    name:"Alignment",
                    properties:[
                        {name:"WrapText", value:"1"},
                        {name:"Horizontal", value:"Center"},
                        {name:"Vertical", value:"Center"}
                    ]
                }
            ]
        });
    },

    addHeaderStyle:function () {
        this.addStyle({
            id:"headercell",
            attributes:[
                {
                    name:"Font",
                    properties:[
                        {name:"Bold", value:"1"},
                        {name:"Size", value:"10"}
                    ]
                },
                {
                    name:"Interior",
                    properties:[
                        {name:"Pattern", value:"Solid"},
                        {name:"Color", value:"#A3C9F1"}
                    ]
                },
                {
                    name:"Alignment",
                    properties:[
                        {name:"WrapText", value:"1"},
                        {name:"Horizontal", value:"Center"}
                    ]
                }
            ]
        });
    },

    /**
     * Adds the default striping styles to this workbook
     */
    addStripedStyles:function () {
        this.addStyle({
            id:"even",
            attributes:[
                {
                    name:"Interior",
                    properties:[
                        {name:"Pattern", value:"Solid"},
                        {name:"Color", value:"#CCFFFF"}
                    ]
                }
            ]
        });

        this.addStyle({
            id:"odd",
            attributes:[
                {
                    name:"Interior",
                    properties:[
                        {name:"Pattern", value:"Solid"},
                        {name:"Color", value:"#CCCCFF"}
                    ]
                }
            ]
        });

        Ext.each(['even', 'odd'], function (parentStyle) {
            this.addChildNumberFormatStyle(parentStyle, parentStyle + 'date', "[ENG][$-409]dd\-mmm\-yyyy;@");
            this.addChildNumberFormatStyle(parentStyle, parentStyle + 'int', "0");
            this.addChildNumberFormatStyle(parentStyle, parentStyle + 'float', "0.00");
        }, this);
    },

    /**
     * Private convenience function to easily add a NumberFormat style for a given parentStyle
     * @param {String} parentStyle The ID of the parentStyle Style
     * @param {String} id The ID of the new style
     * @param {String} value The value of the NumberFormat's Format property
     */
    addChildNumberFormatStyle:function (parentStyle, id, value) {
        this.addStyle({
            id:id,
            parentStyle:"even",
            attributes:[
                {
                    name:"NumberFormat",
                    properties:[
                        {name:"Format", value:value}
                    ]
                }
            ]
        });
    }
});
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.usergrid.UserGrid', {
    extend:'Ext.form.Panel',
    alias:'widget.usergrid',

    initComponent:function () {

        this.items = [
            grid = Ext.widget('dynamicgrid')
        ];
        grid.buttonRender(['new', 'edit', 'filter', 'delete', 'load', 'exporter']);
        this.callParent(arguments);
    }
});

Ext.define('LSP.view.sparqlform.Queryform', {
    extend:'Ext.form.Panel',
    alias:'widget.queryform',
    closable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {

        this.items = [
            {
                xtype:'form',
                padding:'5 5 0 5',
                border:false,
                style:'background-color: #fff;',
                items:[
                    {
                        xtype:'textarea',
                        name:'query',
                        id:'query_id',
                        fieldLabel:'SPARQL query',
                        height:120,
                        labelWidth:110,
                        width:700,
                        value:'SELECT *  WHERE { ?s ?p ?o}'
                    },
                    {
                        xtype:'fieldcontainer',
                        height:31,
                        width:700,
                        layout:{
                            type:'column'
                        },
                        items:[
                            {
                                xtype:'numberfield',
                                name:'limit',
                                margin:'0 10 0 110',
                                padding:'',
                                width:190,
                                fieldLabel:'Limit',
                                labelWidth:110,
                                autoStripChars:true,
                                maxValue:100,
                                minValue:1,
                                value:10,
                                allowDecimals:false
                            },
                            {
                                xtype:'numberfield',
                                name:'offset',
                                margin:'0 10 0 0',
                                width:190,
                                fieldLabel:'Offset',
                                labelWidth:110,
                                maxValue:10000,
                                minValue:0,
                                value:0,
                                allowDecimals:false
                            }
                        ]
                    },
                    {
                        xtype:'button',
                        action:'query',
                        text:'Submit query'
                    }
                ]
            },
            {
                xtype:'dynamicgrid3',
                title:'SPARQL query results',
                name:'sparql_query_results',
                flex:1
            }
        ];
        this.callParent(arguments);
    }
});

Ext.define('LSP.view.cmpd_by_name.CmpdByNameForm', {
    extend:'Ext.form.Panel',
    alias:'widget.CmpdByNameForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiCompoundLookup',
        'LSP.view.dynamicgrid.DynamicGrid',
        'LSP.view.cmpd_by_name.CmpdByNameSingleDisplayForm'
    ],
    layout:{
        type:'vbox',
        align:'stretch'
    },

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'label',
                    html:'<span style="font-family: verdana; color: grey; ">Hint: Type in compound name. E.g. \"Aspirin\"</span>',
                    labelWidth:400,
                    padding:'5 0 0 140'
                },
                {
                    xtype:'container',
                    margin:'0 5 5 5',
                    name:'form_fields',
                    layout:{
                        type:'column'
                    },
                    style:'background-color: #fff;',
                    items:[
                        {
                            xtype:'conceptWikiCompoundLookup',
                            itemId:'compoundByNameLookup'
                        },
                        {
                            xtype:'button',
                            padding:'5 5 5 5',
                            text:'Search...',
                            itemId:'CmpdByNameSubmit_id',
                            disabled:true,
                            action:'query_cmpd_by_name'
                        }
                    ]},
                {
                    xtype:'CmpdByNameSingleDisplayForm',
                    flex:1
                }
            ]
        });
        this.callParent(arguments);
    }
});

Ext.define('LSP.view.dropdowns.conceptWikiLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.conceptWikiLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'concept_label'},
            {type:'string', name:'concept_url'},
            {type:'string', name:'concept_uuid'},
            {type:'string', name:'concept_alt_labels'},
            {type:'string', name:'tag_label'},
            {type:'string', name:'tag_uuid'}


        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/concept_wiki_api_calls/concept_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
    valueField:'concept_url',
    displayField:'concept_label',
    name:'concept_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:70,
    typeAheadDelay:150,
    queryDelay:700,
    fieldLabel:'Concept name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching concepts found.',
        getInnerTpl:function () {
            return '<p><b>{concept_label}</b> <a href="{concept_url}" target="_blank">(definition)</a> <i>({tag_label})</i><br/ ><small><i>{concept_alt_labels}</i></small></p>';
        }

    }
});
Ext.define('LSP.view.concept.SummeryForm', {
    extend:'Ext.form.Panel',
    alias:'widget.SummeryForm',
    closable:true,
    requires:[
        'LSP.view.dropdowns.conceptWikiLookup'
    ],
    initComponent:function () {
        var me = this;
        me.items = [
            {
                xtype:'container',
                height:'6%',
                margin:'5 5 5 5',
                name:'form_fields',
                layout:{
                    type:'column'
                },
                items:[
                    {
                        xtype:'conceptWikiLookup'
                    },
                    {
                        xtype:'button',
                        padding:'5 5 5 5',
                        text:'Look up',
                        action:'look_up_concept'
                    },
                    {
                        name:'utf8',
                        xtype:'hidden',
                        value:'&#x2713;'
                    },
                    {
                        name:'authenticity_token',
                        xtype:'hidden',
                        value:$$('meta[name=csrf-token]')[0].readAttribute('content')
                    }
                ]},
            object_grid = Ext.widget('dynamicgrid2'),
            subject_grid = Ext.widget('dynamicgrid2')
        ];
        object_grid.setTitle('Concept Properties');
        object_grid.setHeight('47%');
        subject_grid.setTitle('Concept Relations');
        subject_grid.setHeight('47%');
        me.callParent(arguments);
    }
});
Ext.define('LSP.view.placeholder.temp', {
    extend:'Ext.form.Panel',
    alias:'widget.temp',
    closable:true,
    title:'OpenPhacts Exemplars',
    initComponent:function () {


        var me = this;

        Ext.applyIf(me, {
            xtype:'panel',
            bodyPadding:10,
            title:'OpenPhacts Exemplars',
            layout:'anchor',
            //         suspendLayout: true,
            autoScroll:true,


            items:[
                {
                    xtype:'label',
                    text:'This page contains links to the OpenPhacts exemplars',
                    labelWidth:600
                },
                {
                    xtype:'displayfield',
                    value:'<a target=\'_blank\' href=\'http://ws.bioinfo.cnio.es/OpenPHACTS/\'>Target Dossier</a>',
                    labelWidth:600
                },
                {
                    xtype:'displayfield',
                    value:'<a target=\'_blank\' href=\'http://cbn.zbh.uni-hamburg.de\'>ChemBioNavigator</a> - username/password: cbn/cbn4ops',
                    labelWidth:600
                },
                {
                    xtype:'displayfield',
                    value:'Polypharmacology Browser - no link yet',
                    labelWidth:600
                }
            ]});
        this.callParent(arguments);
    }
});

Ext.define('LSP.view.dropdowns.pmidLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.pmidLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'pmid'},
            {type:'string', name:'pmid_uri'}
        ],
        proxy:{
            type:'ajax',
            api:{
                read:'core_api_calls/pmid_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
    valueField:'pmid_uri',
    displayField:'pmid',
    name:'pmid_uri',
    minChars:2,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing Pubmed id...',
    margin:'5 5 5 5',
    width:600,
    queryDelay:700,
    fieldLabel:'Pubmed id',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...',
        emptyText:'No matching pubmed ids found.'
    }
});

Ext.define('LSP.view.textmining.pmidTextMiningHitsForm', {
    extend:'Ext.form.Panel',
    alias:'widget.pmidTextMiningHits',
    requires:[
        'LSP.view.dropdowns.pmidLookup'
    ],
    closable:true,
    height:560,
    width:606,
    bodyPadding:10,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'container',
                    activeItem:0,
                    layout:{
                        type:'column'
                    },
                    items:[
                        {
                            xtype:'pmidLookup',
                            margin:'0 10 0 10',
                            labelWidth:75,
                            width:650
                        },
                        {
                            xtype:'button',
                            text:'Search...',
                            action:'query',
                            disabled:true,
                            width:120
                        }
                    ]
                },
                {
                    xtype:'fieldset',
                    height:200,
                    layout:'anchor',
                    defaults:{labelWidth:75},
                    title:'Bibliographic information',
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel:'Title',
                            name:'title',
                            anchor:'100%'
                        },
                        {
                            xtype:'textarea',
                            height:150,
                            readOnly:true,
                            fieldLabel:'Abstract',
                            name:'abstract',
                            anchor:'100%'
                        }
                    ]
                },
                {
                    xtype:'dynamicgrid2',
                    title:'Text mined concepts',
                    gridBaseTitle:'Text mined concepts',
                    name:'textmining_hits',
                    flex:1
                }
            ]
        });

        me.callParent(arguments);
    }
});
Ext.define('LSP.view.dropdowns.wikiPathwaysCompoundLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.wikiPathwaysCompoundLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'compound_name'},
            {type:'string', name:'compound_uri'}
        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/core_api_calls/wiki_pathway_compound_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
//      valueField:'cmpd_uri',
    valueField:'compound_uri',
    displayField:'compound_name',
    name:'compound_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    queryDelay:700,
    fieldLabel:'Compound name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...'
    }
});

Ext.define('LSP.view.pathways.pathwayByCompoundForm', {
    extend:'Ext.form.Panel',
    alias:'widget.pathwayByCompoundForm',
    requires:[
        'LSP.view.dropdowns.wikiPathwaysCompoundLookup'
    ],
    closable:true,
    height:560,
    width:606,
    bodyPadding:10,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'container',
                    activeItem:0,
                    layout:{
                        type:'column'
                    },
                    items:[
                        {
                            xtype:'wikiPathwaysCompoundLookup',
                            margin:'0 10 0 10',
                            labelWidth:100,
                            width:650
                        },
                        {
                            xtype:'button',
                            text:'Search...',
                            disabled:true,
                            action:'query',
                            width:120
                        }
                    ]
                },
                {
                    xtype:'dynamicgrid2',
                    title:'Pathways including compound',
                    gridBaseTitle:'Pathways including compound',
                    name:'pathway_by_cmpd_grid',
                    flex:1,
                    dockedItems:[
                        {
                            xtype:'toolbar',
                            dock:'top',
                            items:[
                                {
                                    xtype:'button',
                                    text:'View pathway in WikiPathways applet (Google Chrome only)',
                                    action:'wp_view'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

Ext.define('LSP.view.dropdowns.wikiPathwaysProteinLookup', {
    extend:'Ext.form.ComboBox',
    alias:'widget.wikiPathwaysProteinLookup',

    store:Ext.create('Ext.data.Store', {
        fields:[
            {type:'string', name:'wp_protein_name'},
            {type:'string', name:'wp_protein_uri'}
        ],
        proxy:{
            type:'ajax',
            api:{
                read:'/core_api_calls/wiki_pathway_protein_lookup.json'
            },
            reader:{
                type:'json'
            }
        }
    }),
    queryMode:'remote',
//      valueField:'wp_protein_uri',
    valueField:'wp_protein_uri',
    displayField:'wp_protein_name',
    name:'wp_protein_uri',
    minChars:4,
    hideTrigger:true,
    forceSelection:true,
    typeAhead:true,
    emptyText:'Start typing...',
    margin:'5 5 5 5',
    width:700,
    queryDelay:700,
    fieldLabel:'Protein name',
    labelWidth:120,
    listConfig:{
        loadingText:'Searching...'
    }
});

Ext.define('LSP.view.pathways.pathwayByProteinForm', {
    extend:'Ext.form.Panel',
    alias:'widget.pathwayByProteinForm',
    requires:[
        'LSP.view.dropdowns.wikiPathwaysProteinLookup'
    ],
    closable:true,
    height:560,
    width:606,
    bodyPadding:10,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'container',
                    activeItem:0,
                    layout:{
                        type:'column'
                    },
                    items:[
                        {
                            xtype:'wikiPathwaysProteinLookup',
                            margin:'0 10 0 10',
                            labelWidth:100,
                            width:650
                        },
                        {
                            xtype:'button',
                            text:'Search...',
                            action:'query',
                            disabled:true,
                            width:120
                        }
                    ]
                },
                {
                    xtype:'dynamicgrid2',
                    title:'Pathways including protein',
                    gridBaseTitle:'Pathways including protein',
                    name:'pathway_by_protein_grid',
                    flex:1,
                    dockedItems:[
                        {
                            xtype:'toolbar',
                            dock:'top',
                            items:[
                                {
                                    xtype:'button',
                                    text:'View pathway in WikiPathways applet (Google Chrome only)',
                                    action:'wp_view'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

Ext.define('LSP.view.Viewer', {
    extend:'Ext.tab.Panel',
    alias:'widget.viewer',

    requires:[
		'LSP.view.dynamicgrid.DynamicGrid',
        'LSP.view.usergrid.UserGrid',
        'LSP.view.sparqlform.Queryform',
        'LSP.view.larkc_sim_search.SimSearchForm',
        'LSP.view.cmpd_by_name.CmpdByNameForm',
        'LSP.view.target_by_name.TargetByNameForm',
        'LSP.view.pharm_by_cmpd_name2.PharmByCmpdNameForm',
        'LSP.view.pharm_by_target_name2.PharmByTargetNameForm',
        'LSP.view.concept.SummeryForm',
        'LSP.view.placeholder.temp',
        'LSP.view.pharm_by_enzyme_family.PharmEnzymeForm',
        'LSP.view.textmining.pmidTextMiningHitsForm',
        'LSP.view.pathways.pathwayByCompoundForm',
        'LSP.view.pathways.pathwayByProteinForm',
    ],

    activeItem:0,
    margins:'0 4 4 4',
    //cls: 'preview',

    initComponent:function () {
		console.log('Viewer: initComponent()');
        this.callParent(arguments);
        this.on('tabchange', function (tabPanel, newCard, oldCard) {
            //this handles the user selecting a tab and updates the history token appropriately
            Ext.History.add('!p=' + newCard.xtype);
        });
    }
});

/**
 * Created with JetBrains RubyMine.
 * User: jameseales
 * Date: 24/04/2012
 * Time: 12:11
 * To change this template use File | Settings | File Templates.
 */
Ext.define('LSP.view.feedback.FeedbackPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.FeedbackPanel',
    layout:'anchor',
    bodyCls:'fb-panel',
    border:false,

    items:[
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer1'
        },
        {
            xtype:'displayfield',
            anchor:'100%',
            itemId:'fpUserMessage1',
            fieldCls:'fb-message',
            //value:'Please provide your feedback here. Unfortunately we can\'t promise to respond to every piece of feedback but we will read them.'
            value:'You can use this form to give us feedback or report any problems you encounter.  Please note that we read everything, but can\'t always respond.'
        },
        {
            xtype:'displayfield',
            value:'<br>',
            itemId:'spacer2'
        },
        {
            xtype:'textfield',
            anchor:'100%',
            vtype:'email',
            cls:'fb-email',
            labelAlign:'top',
            itemId:'fpUserEmail',
            fieldLabel:'Your contact email',
            allowBlank:false

        },

        {
            xtype:'textarea',
            anchor:'100% 60%',
            labelAlign:'top',
            itemId:'fpFeedbackText',
            fieldLabel:'Your feedback',
            allowBlank:false
        },
        {
            xtype:'button',
            cls:'fb-button',
            text:'Submit',
            handler:function () {

                var userEmailField = Ext.ComponentQuery.query('#fpUserEmail')[0];
                if (!userEmailField.isValid()) {
                    Ext.Msg.show({
                        title:'Missing Information',
                        msg:'Please supply a contact email address',
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    return;
                }
                var feedbackTextArea = Ext.ComponentQuery.query('#fpFeedbackText')[0];
                if (!feedbackTextArea.isValid()) {
                    Ext.Msg.show({
                        title:'Missing Information',
                        msg:'Please supply some feedback text',
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    return;
                }
                var feedbackData = Ext.create('LSP.model.Feedback', {
                    userEmail:userEmailField.getValue(),
                    feedbackText:feedbackTextArea.getValue(),
                    technicalInfo:Ext.History.getToken()
                });
                var fp = this.up('FeedbackPanel');
                fp.setLoading(true);
                Ext.Ajax.request({
                    url:'feedback.json',
                    method:'POST',
                    params:feedbackData.data,
                    success:function (response) {
                        fp.setLoading(false);
                        var jsonObj = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title:'Feedback sent',
                            msg:jsonObj.message,
                            buttons:Ext.MessageBox.OK,
                            icon:Ext.MessageBox.INFO
                        });

                    },
                    failure:function (response) {
                        fp.setLoading(false);
                        Ext.Msg.show({
                            title:'Error',
                            msg:'Your feedback could not be sent',
                            buttons:Ext.MessageBox.OK,
                            icon:Ext.MessageBox.INFO
                        });
                    }
                });
            }
        }
    ]
});
Ext.define('LSP.view.Navigator', {
    extend:'Ext.Panel',
    alias:'widget.navigator',

    requires:[
        'LSP.view.Appmoduletree',
        'Ext.layout.container.Accordion',
        'LSP.view.feedback.FeedbackPanel'
    ],

    collapsible:true,
    margins:'0 0 4 4',
    layout:'accordion',
    layoutConfig:{
        animate:true
    },

    initComponent:function () {
        this.items = [
            {
                title:'Navigation',
                autoScroll:true,
                layout:'fit',
                border:false,
                iconCls:'nav',
                items:[
                    {
                        xtype:'appmoduletree',
                        id:'appModuleTree'
                    }
                ]
            },
            //Removed this because it isn't actually used any more
//            {
//                title:'Settings',
//                border:false,
//                autoScroll:true,
//                iconCls:'settings',
//                items:[
//                    {
//                        xtype:'settingsform',
//                        id:'appSettings'
//                    }
//                ]
//            },
            {
                title:'Feedback',
                border:false,
                autoScroll:true,
                iconCls:'fb-accordion',
                bodyBorder:false,
                items:[
                    {
                        xtype:'FeedbackPanel'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.user.Loginbutton', {
    extend:'Ext.Button',
    alias:'widget.loginbutton',

    size:'small',
    text:'Log in',

    initComponent:function () {
        this.callParent(arguments);
    }
});
/*######################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.user.Logoutbutton', {
    extend:'Ext.Button',
    alias:'widget.logoutbutton',

    size:'small',
    text:'Log out',

    initComponent:function () {
        this.callParent(arguments);
    }
});
/*######################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

Ext.define('LSP.view.user.Newbutton', {
    extend:'Ext.Button',
    alias:'widget.usernewbutton',

    size:'small',
    text:'Create account',

    initComponent:function () {
        this.callParent(arguments);
    }
});
/*########################################################################################
 #
 #  Copyright H. Lundbeck A/S
 #  This file is part of LSP4All.
 #
 #  LSP4All is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or (at
 #  your option) any later version.
 #
 #  LSP4All IS MADE AVAILABLE FOR DISTRIBUTION WITHOUT ANY FORM OF WARRANTY TO THE
 #  EXTENT PERMITTED BY APPLICABLE LAW.  THE COPYRIGHT HOLDER PROVIDES THE PROGRAM \"AS IS\"
 #  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
 #  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 #  PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM LIES
 #  WITH THE USER.  SHOULD THE PROGRAM PROVE DEFECTIVE IN ANY WAY, THE USER ASSUMES THE
 #  COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. THE COPYRIGHT HOLDER IS NOT
 #  RESPONSIBLE FOR ANY AMENDMENT, MODIFICATION OR OTHER ENHANCEMENT MADE TO THE PROGRAM
 #  BY ANY USER WHO REDISTRIBUTES THE PROGRAM SO AMENDED, MODIFIED OR ENHANCED.
 #
 #  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL THE
 #  COPYRIGHT HOLDER BE LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
 #  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
 #  PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE
 #  OR LOSSES SUSTAINED BY THE USER OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO
 #  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER HAS BEEN ADVISED OF THE
 #  POSSIBILITY OF SUCH DAMAGES.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 #
 ########################################################################################*/

/* replace with the settings panel options later on */
iconSize = 'small';

Ext.define('LSP.view.Viewport', {
    extend:'Ext.container.Viewport',
    alias:'widget.lspviewport',

    requires:[
        'LSP.view.Viewer',
        'LSP.view.Navigator',
        'LSP.view.Settings',
        'LSP.view.user.Loginbutton',
        'LSP.view.user.Logoutbutton',
        'LSP.view.user.Newbutton',
        'Ext.layout.container.Border',
        'Ext.toolbar.Spacer',
        'LSP.store.GuiComponents'
    ],

    layout:'border',

    //gets a record from GuiComponents store by its xtype
    getFormByXtype:function (token) {
        var appModStore = Ext.data.StoreManager.lookup('GuiComponents');
        var records = appModStore.queryBy(
            function (record, id) {
                return record.raw.xtype == token;
            }
        );
        if (records) {
            if (records.getCount() > 0) {
                return records.first();
            }
        }
    },

//    getObjectFromString:function (queryString) {
//        var qBits = queryString.split('&');
//        console.log(qBits);
//        var obj = new Object();
//        Ext.each(qBits, function (item, index) {
//            console.log(item);
//            if (item.length > 0) {
//                var smallBits = item.split('=');
//                if (smallBits.length == 1) {
//                    obj[smallBits[0]] = '';
//                } else if (smallBits.l == 2) {
//                    obj[smallBits[0]] = smallBits[1];
//                }
//            }
//
//        });
////        console.dir(obj);
//        return obj;
//    },

//all UI changes should come through this function
    handleHistoryToken:function (token) {
        //not null
        if (token) {
            //must start with ! (shebang/hashbang can help with googlebot indexing, some people hate this kind of thing, personally i don't care)
            if (token.indexOf('!') == 0) {
//            console.log('Viewport History change: ' + token);
                //cut off shebang
//                var historyTokenObject = Ext.Object.fromQueryString(token.substring(1));
                var historyTokenObject = this.parseHistoryToken(token.substring(1));
//                console.dir(historyTokenObject);
                if (historyTokenObject.p) {
                    var form = this.getFormByXtype(historyTokenObject.p);
                    if (form) {
                        this.changeView(form, historyTokenObject);
                    }
                }
            }
        }
    },

    parseHistoryToken:function (stringToParse) {
        var obj = {};
        var andBits = stringToParse.split('&');
        Ext.each(andBits, function (bit) {
            var firstEquals = bit.indexOf('=');
            if (firstEquals != -1) {
                var key = bit.substring(0, firstEquals);
                var value = bit.substring(firstEquals + 1, bit.length)
                obj[key] = value;
            }
        });
        return obj;
    },

//this handles the changing of central ui panel
    changeView:function (record, formData) {
        var view;
        Ext.getCmp('centerView').items.each(function (curItem) {
            if (curItem.gridId == record.raw.id) {
                view = curItem;
                return;
            }
        });
        if (!view) {
            view = Ext.widget(record.raw.xtype);
            view.setTitle(record.raw.home);
            view.url = record.raw.url;
            view.gridId = record.raw.id;
            Ext.getCmp('centerView').add(view);
        }
        var centreView = Ext.getCmp('centerView');
        centreView.suspendEvents(false);
        centreView.setActiveTab(view);
        centreView.resumeEvents();

        //this handles any formData provided by the History token
        //e.g. record = 'CmpdByNameForm'
        // formData = 'http://www.conceptwiki.org/concept/59aabd64-bee9-45b7-bbe0-9533f6a1f6bc'
        //it is the individual forms responsibility to process the formData string
        if (formData) {
            if (view.setFormData) {
                view.setFormData(formData);
            } else {
                view.fireEvent('historyToken', formData);
            }
        }
    },


    initComponent:function () {
		console.log("Viewport: initComponent()");
        //set provenance to default of icon mode
        LDAProvenanceMode = LDA.helper.LDAConstants.LDA_PROVENANCE_COLOUR;
        //init history, needs to be done first
        Ext.History.init();
        //add event listener for History 'change' event
        //listener sends new history token to handleHistoryToken function with Viewport scope
        Ext.History.on('change', function (token) {
            if (token) {
                this.handleHistoryToken(token);
            }
        }, this);

        var ops_logo = Ext.create('Ext.Img', {src:'images/ops_logo.png', bodyStyle:{background:'transparent'}});
        this.items = [
            {
                region:'north',
                id:'northView',
                height:60,
                border:false,
                bodyStyle:{
                    background:'transparent'
                },
                layout:{
                    type:'hbox',
                    padding:'5',
                    align:'middle'
                },
                items:[
                    ops_logo,
                    {
                        id:'lsp-header',
                        xtype:'box',
                        html:'<h1>Open PHACTS GUI</h1>'
                    },
                    {
                        xtype:'tbspacer',
                        flex:1
                    },
                    {
                        xtype:'displayfield',
                        value:'Testing connection to OPS API...',
                        width:400,
                        name:'ops_api_staus',
                        id:'ops_api_staus_id',
						hidden: true
                    },
                    {
                        xtype:'tbspacer',
                        flex:1
                    },
                    {
                        xtype:'loginbutton',
                        id:'loginButton',
                        hidden:true
                    },
                    {
                        xtype:'usernewbutton',
                        id:'userNewButton',
                        hidden:true
                    },
                    {
                        xtype:'logoutbutton',
                        id:'logoutButton',
                        hidden:true
                    }
                ]
            },
            {
                region:'center',
                id:'centerView',
                xtype:'viewer'
            },
            {
                region:'west',
                id:'westView',
                width:225,
                xtype:'navigator'
            }
        ];
        this.callParent(arguments);
    }
})
;



