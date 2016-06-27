---
layout: default
title: OBI | Home
stylesheets: |
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/inspire-tree/1.8.0/inspire-tree.css"></script>
scripts: |
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/inspire-tree/1.8.0/inspire-tree.min.js"></script>
  <script type="text/javascript" src="assets/obi.js"></script>
header: |
  <div class="jumbotron">
    <h1>Ontology for Biomedical Investigations</h1>
    <p class="lead">Clear communication for biomedical research</p>
    <p>
      <a class="btn btn-md btn-success" href="#" role="button">Browse OBI</a>
      <a class="btn btn-md btn-success" href="#" role="button">Download OBI</a>
      <a class="btn btn-md btn-success" href="#" role="button">View on Github</a>
    </p>
  </div>
---

OBI helps you communicate clearly about scientific investigations by defining more than 2500 terms for assays, devices, objectives, and more.

It's easy to use with many other
[Open Biomedical Ontologies](http://obofoundry.org),
including the
[Gene Ontology](),
[Protein Ontology](),
[Plant Ontology](),
[ChEBI](),
and [many more](http://obofoundry.org).

## How it works

Every OBI term has a textual definition, synonyms, English label, and other information. The key attribute is the **stable identifier**, or IRI/URI, which helps ensure consistent, appropriate usage.

<div id="term-search"></div>
<div id="term-view"></div>

Use the stable identifier in your spreadsheet or database. Then it's easier to share your data with other OBI users.

<table id="static-table"></table>

OBI terms also form a tree, with links to other terms that enable powerful search and data analysis.

<div id="term-tree"></div>

We can combine OBI terms (and other ontology terms) to enable powerful queries.

<div id="small-tree"></div>

<table id="interactive-table"></table>
