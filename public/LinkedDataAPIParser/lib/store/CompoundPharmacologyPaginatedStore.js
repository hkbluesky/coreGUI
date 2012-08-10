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
        this.proxy.reader = Ext.create('LDA.helper.CompoundPharmacologyPaginatedReader');
		// this.proxy.limitParam = '_pageSize';
		// this.proxy.pageParam = '_page';
        this.callParent(arguments);
    },
    /**
     * Due to the asynchronous nature of the Linked Data API the total count is returned
     * by a separate call. The total can then be set using this function.
     */
    setTotalCount: function(count) {
        this.totalCount = count;
    }

});
