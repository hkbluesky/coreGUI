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
    proxy:{
        reader:Ext.create('LDA.helper.CompoundPharmacologyCountReader')
    },
    BASE_URL:'http://ops.few.vu.nl/compound/pharmacology/count?'
});