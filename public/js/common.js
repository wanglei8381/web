/**
 * 分页算法
 * @param container 分页的dom的容器
 * @param pageNo 第几页
 * @param total 总共几页
 */
var pagination = function (container, pageNo, total, callback) {

    var $pageContainer = container;
    if (!container instanceof jQuery) {
        $pageContainer = $('#' + container);
    }

    var begin = 1;
    var end = total;
    if (total > 10 && pageNo > 6) {
        begin = pageNo - 5;
        var cha = pageNo + 4 - total;
        end = cha >= 0 ? total : pageNo + 4;
        if (cha >= 0) {
            begin = begin - cha;
        }
    }
    var html = '<div class="hidden-xs">' +
      '<ul class="pagination paginationM">' +
      '<li class="j-page" data-page="1"><a href="#1">&laquo;第一页</a></li>';
    for (var i = begin; i <= end; i++) {
        if (i === pageNo) {
            html += '<li class="active j-page" data-page="' + i + '"><a href="#' + i + '">' + i + '</a></li>';
        } else {
            html += '<li class="j-page" data-page="' + i + '"><a href="#' + i + '">' + i + '</a></li>';
        }
    }
    html += '<li class="j-page" data-page="' + total + '"><a href="#' + total + '">最后一页&raquo;</a></li>' +
      '</ul>' +
      '</div>';

    var shang = pageNo - 1 > 0 ? pageNo - 1 : 1;
    var xia = pageNo + 1 > total ? total : pageNo + 1;
    html += '<div class="visible-xs">' +
      '<ul class="pagerM">' +
      '<li class="previous j-page" data-page="' + shang + '"><a href="#' + shang + '">&laquo;上一页</a></li>' +
      '<li class="next j-page" data-page="' + xia + '"><a href="#' + xia + '">下一页&raquo;</a></li>' +
      '</ul>' +
      '</div>';

    $pageContainer.html(html);
    $('.j-page').click(function () {
        callback(parseInt($(this).data('page')));
    });
};