Ext.define('LSP.view.pharm_by_enzyme_lda.PharmEnzymeGrid', {
        extend:'Ext.grid.Panel',
        alias:'widget.PharmEnzymeGrid',
        layout:'fit',
        verticalScroller:{
            xtype:'paginggridscroller'
        },
        requires:[

        ],
        store:'EnzymePaginatedStore',
        columns:{
            defaults:{
            },

            items:[

                {
                    header:'Compound Label',
                    dataIndex:'compound_pref_label'
                },
//                {
//                    header:'Generic Name',
//                    dataIndex:'compound_generic_name'
//                },
//                {
//                    header:'Drug Type',
//                    dataIndex:'compound_drug_type'
//                },
                {
                    header:'ChemSpider Compound URI',
                    dataIndex:'cs_compound_uri'
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
                },
                {
                    header:'Target Label',
                    dataIndex:'target_pref_label'
                },
                {
                    header:'Target Organism',
                    dataIndex:'target_organism'
                }


                //for page
                //                        'page_uri',
                //                        'next_page',
                //                        'previous_page',
                //                        'page_size',
                //                        'start_index',

//                {
//                    header:'Page URI',
//                    dataIndex:'page_uri'
//                },
//                {
//                    header:'Next Page URI',
//                    dataIndex:'next_page'
//                },
//                {
//                    header:'Previous Page URI',
//                    dataIndex:'previous_page'
//                },
//                {
//                    header:'Page Size',
//                    dataIndex:'page_size'
//                },
//                {
//                    header:'Start Index',
//                    dataIndex:'start_index'
//                },
                //for compound
                //            'compound_inchikey',
                //            'compound_drug_type',
                //            'compound_generic_name',
                //            'target_title',
                //            'target_concatenated_uris',
//
//                {
//                    header:'InchiKey',
//                    dataIndex:'compound_inchikey'
//                },
//
//
//                {
//                    header:'Target Title',
//                    dataIndex:'target_title'
//                },
//                {
//                    header:'Target Concatenated URIs',
//                    dataIndex:'target_concatenated_uris'
//                },

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


//                {
//                    header:'ChEMBL Activity URI',
//                    dataIndex:'chembl_activity_uri'
//                },
//                {
//                    header:'ChEMBL Compound URI',
//                    dataIndex:'chembl_compound_uri'
//                },
//                {
//                    header:'Compound Full Molecular Weight',
//                    dataIndex:'compound_full_mwt'
//                },
//                {
//                    header:'ConceptWiki Compound URI',
//                    dataIndex:'cw_compound_uri'
//                },

//
//                {
//                    header:'Inchi',
//                    dataIndex:'compound_inchi'
//                },
//                {
//                    header:'Smiles',
//                    dataIndex:'compound_smiles'
//                },
//                {
//                    header:'ChEMBL Assay URI',
//                    dataIndex:'chembl_assay_uri'
//                },
//                {
//                    header:'ChEMBL Target URI',
//                    dataIndex:'chembl_target_uri'
//                },


            ]
        }
    }
);