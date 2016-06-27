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
  $('#term-view').append('<p id="term-label"><span>Label:</span> </p>');
  $('#term-label').append(term.name);
  $('#term-view').append('<p id="term-id"><span>ID:</span> </p>');
  $('#term-id').append(term.id);
  $('#term-view').append('<p id="term-iri"><span>IRI:</span> </p>');
  $('#term-iri').append(term.iri);
  $('#term-view').append('<p id="term-definition"><span>Definition:</span> </p>');
  $('#term-definition').append(term.definition);
  $('#term-view').append('<p id="term-synonyms"><span>Synonyms:</span> </p>');
  $('#term-synonyms').append(term.synonyms);
}

// Given a selector and a 2D array,
// select the table and fill it with the data.
function fillTable(selector, data) {
  var table = $(selector);
  table.empty();
  var row = $('<tr>');
  var i = 0;
  for (var j=0; j < data[i].length; j++) {
    var cell = $('<th>').append(data[i][j]);
    row.append(cell);
  }
  table.append(row);
  for (var i=1; i < data.length; i++) {
    row = $('<tr>');
    for (var j=0; j < data[i].length; j++) {
      var cell = $('<td>').append(data[i][j]);
      row.append(cell);
    }
    table.append(row);
  }
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
    .append('<input id="term-input" type="text">');
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
});
