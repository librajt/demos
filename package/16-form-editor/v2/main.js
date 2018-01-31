
var $list = $('#type_list');
var $submit = $('#submit');
var $result = $('#result');

function changeTypeList(e) {
    var $me = $(this);
    typeEditor._updateGoodsProperties($me.val());
}
$list.on('change', changeTypeList);

function initTypeList() {
    var html = '';
    var data = window.TYPES_LIST;
    var item;
    
    for (var i = 0; i < data.length; i++) {
        item = data[i];
        html += '<option value="' + item.typeid + '">' + item.name + '</option>';
    }
    
    $list.append(html);
}

initTypeList();

function getGoodsInfo() {
    var ext = typeEditor._getExtProperty();
    $result.html(JSON.stringify(ext));
};
$submit.on('click', getGoodsInfo);



