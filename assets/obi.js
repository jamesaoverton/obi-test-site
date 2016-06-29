// Define table data.
var table_data = [
  ["Assay ID", "Assay Type", "Anatomy"],
  ["1", "histology", "lung"],
  ["2", "imaging assay", "lung"],
  ["3", "histology", "foot"]
];

// Given a term map, update the term search results box.
function showTerm(term) {
  $('#term-view').empty();
  $('#term-view').append('<p id="term-label"><span><strong>Label:</strong></span> </p>');
  $('#term-label').append(term.name);
  $('#term-view').append('<p id="term-id"><span><strong>ID:</strong></span> </p>');
  $('#term-id').append(term.id);
  $('#term-view').append('<p id="term-iri"><span><strong>IRI:</strong></span> </p>');
  $('#term-iri').append(term.iri);
  $('#term-view').append('<p id="term-definition"><span><strong>Definition:</strong></span> </p>');
  $('#term-definition').append(term.definition);
  $('#term-view').append('<p id="term-synonyms"><span><strong>Synonyms:</strong></span> </p>');
  $('#term-synonyms').append(term.synonyms);
}

// Given a selector and a 2D array,
// select the table and fill it with the data.
function fillTable(selector, data) {
  var table = $(selector);
  table.empty();
  for (var i=0; i < data.length; i++) {
    row = $('<tr>').attr('id', selector.substr(1) + '-' + i);
    for (var j=0; j < data[i].length; j++) {
      var html = i == 0 ? '<th>' : '<td>';
      var cell = $(html).append(data[i][j]);
      row.append(cell);
    }
    table.append(row);
  }
}

var small_tree;

// When a node in the small tree is (de)selected,
// update the interactive-table.
function updateInteractiveTable(event, node) {
  var selected_node = small_tree.selected();
  var selected_names = [];
  for (var i=0; i < selected_node.length; i++) {
    selected_names.push(selected_node[i].text);
  }
  console.log(selected_names);
  // TODO: implement correct show/hide logic.
  $('#interactive-table-1').toggle();
}

$(document).ready(function(){
  // Load a map of all OBI terms.
  var terms;
  $.getJSON('assets/terms.json', function(data) {
    terms = data;
    showTerm(terms['OBI:0000070']);
  });

  // Create a term search input field.
  $('#term-search').addClass('form-group')
    .append('<input id="term-input" type="text" autocomplete="off">');
  var input = $('#term-input')
  input.addClass('form-control').change(function() {
    var current = input.typeahead("getActive");
    if (current && current.name == input.val()) {
      showTerm(terms[current.id]);
    }
  });

  // Load a list of OBI labels and synonyms.
  $.getJSON('assets/term-list.json', function(data){
    input.typeahead({
      source: data,
      autoSelect: true
    });
    input.val('assay');
  });

  // Generate the static table.
  $('#static-table').addClass('table');
  fillTable('#static-table', table_data);

  // Generate tree of all OBI terms.
  new InspireTree({
    target: '#term-tree',
    data: $.getJSON('assets/term-tree.json')
  });

  // Generate small tree
  small_tree = new InspireTree({
    target: '#small-tree',
    selection: {
      mode: 'checkbox',
      multiple: true
    },
    data: [
      {text: 'assay',
        children: [
        {text: 'histology'},
        {text: 'imaging assay'}]},
      {text: 'gross anatomical part',
        children: [
        {text: 'lung'},
        {text: 'foot'}]}]
  });
  small_tree.expand().select();
  small_tree.on('node.selected', updateInteractiveTable);
  small_tree.on('node.deselected', updateInteractiveTable);

  // Generate the interactive table.
  $('#interactive-table').addClass('table');
  fillTable('#interactive-table', table_data);
});
