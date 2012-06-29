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
            this.page = activityValue;
        }
    },


    updateProxyURL:function () {
        this.proxy.url = this.BASE_URL +
            Ext.Object.toQueryString(
                {
                    assay_organism:this.assay_organism,
                    activity_type:this.activity_type,
                    activity_value:this.activity_value,
                    _format:this._format,
                    uri:this.uri
                });
    }

});
