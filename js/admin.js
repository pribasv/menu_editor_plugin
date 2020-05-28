
var HightlightButton = function(context) {
  var ui = $.summernote.ui;
  var button = ui.button({
    contents: '<i class="fa fa-file-code-o"/> Sección',
    tooltip: 'Inserta sección completa',
    click: function() {
      context.invoke('pasteHTML', '<div class="row">\n'+
'  <div class="col-xs-12 col-sm-12">\n'+
'    <div class="menu-section">\n'+
'      <h2 class="menu-section-title">Título</h2>\n'+
'        <div class="menu-item">\n'+
'          <div class="menu-item-name">Plato</div>\n'+
'          <div class="menu-item-price">--€</div>\n'+
'          <div class="menu-item-description"> Descripción. </div>\n'+
'        </div>\n'+
'      </div>\n'+
'    </div>\n'+
'</div>');
    }
  });

  return button.render();
}

var AlergenButton = function(context) {
  var ui = $.summernote.ui;
  var button = ui.button({
    contents: '<i class="fa fa-spoon"/> Alérgenos',
    tooltip: 'Alergenos',
    click: function() {
      context.invoke('pasteHTML', '<img src="/data/files/altramuz.png" style="width: 24px">\n'+
        '<img src="/data/files/apio.png" style="width: 24px">\n'+
        '<img src="/data/files/cacahuete.png" style="width: 24px">\n'+
        '<img src="/data/files/cascara.png" style="width: 24px">\n'+
        '<img src="/data/files/crustaceo.png" style="width: 24px">\n'+
        '<img src="/data/files/gluten.png" style="width: 24px">\n'+
        '<img src="/data/files/huevo.png" style="width: 24px">\n'+
        '<img src="/data/files/lacteo.png" style="width: 24px">\n'+
        '<img src="/data/files/molusco.png" style="width: 24px">\n'+
        '<img src="/data/files/mostaza.png" style="width: 24px">\n'+
        '<img src="/data/files/pescado.png" style="width: 24px">\n'+
		'<img src="/data/files/sesamo.png" style="width: 24px">\n'+
		'<img src="/data/files/soja.png" style="width: 24px">\n'+
		'<img src="/data/files/sulfito.png" style="width: 24px">\n');
    }
  });

  return button.render();
}
$(function() {
    var editElements = {};
    $('.editable').summernote({
        airMode: false,
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['style','highlight','alergen']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['fontsize', 'color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link','image', 'doc', 'picture', 'video']], // image and doc are customized buttons
            ['table', ['table']],
            ['misc', ['codeview']],
        ],
		buttons: {
			highlight: HightlightButton,
			alergen: AlergenButton
		},	
		styleTags: [
    'p',
        { title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' },
        'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
	],
		
        placeholder: 'Click here to enter content.',
        callbacks: {
            onChange: function(contents, $editable) {
                editElements[$(this).attr('id')] = contents;
            },
            onBlur: function() {
                if (editElements[$(this).attr('id')]!=undefined) {
                    var id = $(this).attr('id');
                    var content = editElements[$(this).attr('id')];
                    var target = ($(this).attr('data-target')!=undefined) ? $(this).attr('data-target'):'pages';
                    editElements[$(this).attr('id')] = undefined;
                    $.post("",{
                        fieldname: id,
                        content: content,
                        target: target,
                        token: token,
                    })
                    .done(function() {
                        $("#save").show();
                        $('#save').delay(100).fadeOut(); 
                    });
                }
            }
        },
    });
});
