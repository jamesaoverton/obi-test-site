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
});
