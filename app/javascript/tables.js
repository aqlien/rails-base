import $ from 'jquery'
require( 'datatables.net-bs5' )();
window.dataTableSetup = dataTableSetup;

function dataTableSetup(tableSelector, options = {}) {
  var defaultLengthMenu = [10, 25, 50, 100];
  if (options['pageLength']){ defaultLengthMenu.push(options['pageLength']) }
  lengthMenu = [...new Set(defaultLengthMenu)].sort(function (a, b) { return a - b;}) // remove duplicates and sort
  options['lengthMenu'] = [[...lengthMenu, -1], [...lengthMenu, 'All']]

  var columnDefs = options['columnDefs'] || []
  columnDefs.push({orderable: false, targets: ['actions', 'nosort']})
  columnDefs.push({visible: false, targets: 'hidden'})
  options['columnDefs'] = columnDefs

  options['initComplete'] = function(){ this.api().setupSearch() }

  dataTableInstall(tableSelector, options)
  dataTableUninstall(tableSelector)
}

function dataTableInstall(tableSelector, options = {}) {
  options['destroy'] = true // Stop turbolinks errors
  $(tableSelector).DataTable(options)
}

function dataTableUninstall(tableSelector) {
  document.addEventListener('turbo:before-cache', () => {
    if ($.fn.dataTable.isDataTable(tableSelector)) {
      $(tableSelector).DataTable().destroy()
    }
  })
};

$.fn.dataTable.Api.register('setupSearch', function(){
  api = this
  tableID = $(api.table().node()).attr('id')

  api.columns( $('.searchable_select') ).eq(0).each( function(colIndex){
    title = $(this.column(colIndex).header()).text()
    inputID = 'search_'+tableID+'_'+colIndex.toString()
    input = $('<select/>', {
      id: inputID,
      class: "form-control input-sm",
      style: "width: 100%;"
    })
    input.on('click', function(e){ e.stopPropagation(); })
    input.on('change', function(){
      val = $(this).val()
      if(val != ''){  val = "^" + val + "$"  }
      api.column( colIndex ).search(val, true, false).draw();
    });
    input.append("<option value=''>"+title+": (All)</option>")
    // input.append("<option value='^.+$'>"+title+": (Any)</option>")
    // input.append("<option value='^$'>"+title+": (Blank)</option>")
    $(this.column(colIndex).header()).html(input)
    this.column(colIndex).data().unique().sort().each(function(dataValue, dataIndex){ $('#'+inputID).append('<option value="'+dataValue+'">'+title+': '+dataValue+'</option>') })
  });

  api.columns( $('.searchable_text') ).eq(0).each( function(colIndex){
    title = $(this.column(colIndex).header()).text()
    inputID = 'search_'+tableID+'_'+colIndex.toString()
    input = $('<input/>', {
      id: inputID,
      type: 'text',
      placeholder: title,
      class: "form-control input-sm",
      style: "width: 95%;"
    })
    input.on('click', function(e){ e.stopPropagation(); })
    input.on('keyup change', function(){
      api.column( colIndex ).search(this.value).draw();
    });
    $(this.column(colIndex).header()).html(input)
  })
});
