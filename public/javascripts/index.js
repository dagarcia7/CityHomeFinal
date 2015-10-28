/* -------------------- Helper functions ------------------ */
Handlebars.registerPartial('object-thumbnail', Handlebars.templates['object-thumbnail']);

//Neat code used to make it easier for handlebars templates to be able to 
//compare things
Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

$(document).ready(function () {
    loadDashboard();
});

//Attaches a handlebars template to the #main-container div in the index.ejs 
//file in the 'views' folder. 
var loadPage = function (template, data) {
    data = data || {};
    $('#main-container').html(Handlebars.templates[template](data));
};

//Function that makes a request to get all objects in the database and load them 
//Onto the dashboard handelbars page. 
var loadDashboard = function(additional) {    
    $.get('/objects/', function (response) {
        loadPage(
            'dashboard',
            $.extend(
                {}, 
                {objects: response.response.objects},
                additional
            )
        );
    });
};