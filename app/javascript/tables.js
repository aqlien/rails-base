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
