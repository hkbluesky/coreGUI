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
    proxy:{
        reader:Ext.create('LDA.helper.TargetPharmacologyPaginatedReader')
    },
    BASE_URL:'http://ops.few.vu.nl/target/pharmacology/pages?'
});