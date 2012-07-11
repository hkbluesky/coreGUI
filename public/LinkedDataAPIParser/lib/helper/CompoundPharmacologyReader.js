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
        var pt = data[LDA_RESULT][LDA_PRIMARY_TOPIC];
        var em = pt[LDA_EXACT_MATCH];
        var drugbankData = em[1];
        var chemspiderData = em[2];
        var chemblData = em[3];

        //shared data in all records

        //uris
        var cw_compound_uri = pt[LDA_ABOUT];
        var drugbank_compound_uri = drugbankData[LDA_ABOUT];
        var cs_compound_uri = chemspiderData[LDA_ABOUT];
        var chembl_compound_uri = chemblData[LDA_ABOUT];

        //data with sources
        var conceptwiki_src = pt[LDA_IN_DATASET];
        var prefLabel = pt['prefLabel'];

        var drugbank_src = drugbankData[LDA_IN_DATASET];
        var drugType = drugbankData['drugType'];
        var genericName = drugbankData['genericName'];

        var chemspider_src = chemspiderData[LDA_IN_DATASET];
        var inchi = chemspiderData['inchi'];
        var inchikey = chemspiderData['inchikey'];
        var smiles = chemspiderData['smiles'];

        var chembl_src = chemblData[LDA_IN_DATASET];
        var full_mwt = chemblData['full_mwt']

        Ext.each(chemblData[LDA_ACTIVITY],

            function (a, index, array) {
                //assay is inside activity
                var assayData = a[LDA_ON_ASSAY];
                if (assayData != undefined) {
                    var targetData = assayData[LDA_ASSAY_TARGET];

                    //record instance specific data

                    //uris
                    var chembl_activity_uri = a[LDA_ABOUT];
                    var chembl_assay_uri = assayData[LDA_ABOUT];
                    var chembl_target_uri = targetData[LDA_ABOUT];

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