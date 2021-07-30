$(".custom-pagination").each(function () {
  var this_val = $(this);
  if ($('.custom-pagination').length > 0) {
      var totalRows = this_val.find('.item-listing .item-single').length;
      var pageSize = this_val.attr("data-count");
      var noOfPage = totalRows / pageSize;
      noOfPage = Math.ceil(noOfPage);
      var noOfPageCount = noOfPage;

      this_val.find('.total-page-count').remove();
      this_val.find('.item-pagination .page-count').after('<span class="total-page-count"> / ' + noOfPageCount + '</span>');

      for (var i = 1; i <= noOfPage; i++) {
          if (i == 1) {
              var classs = 'selected';
          } else {
              var classs = '';
          }
          this_val.find(".item-pagination .page-count").append('<b class=' + classs + '>' + i + '</b>');
      }

      var totalPagenum = this_val.find(".item-pagination .page-count b").length;
      if (totalPagenum > 1) {
          this_val.find(".item-pagination .page-count b").hide();
          this_val.find('.prev').addClass('pagi-disabled');
          for (var n = 1; n <= 1; n++) {
              this_val.find(".item-pagination .page-count b:nth-child(" + n + ")").show();
          }
      }
      else {
          this_val.find(".prev").hide();
          this_val.find(".next").hide();
      }
      this_val.find('.item-listing .item-single').hide();
      for (var j = 1; j <= pageSize; j++) {
          this_val.find(".item-listing .item-single:nth-child(" + j + ")").show();
      }
      displayevent($(this));
  }

  $(this).find('.next').on('click', function (ev) {
      ev.preventDefault();
      if ($(this_val).find("b.selected:last").nextAll('b').length > 1) {
          $(this_val).find("b.selected").last().nextAll(':lt(1)').show();
          $(this_val).find("b.selected").hide();
          displayevent($(this_val));
          $(this_val).find(".prev").removeClass('pagi-disabled');
          $(this_val).find(".next").removeClass('pagi-disabled');
      }
      else {
          $(this_val).find("b.selected").last().nextAll().show();
          $(this_val).find("b.selected").hide();
          displayevent($(this_val));
          $(this_val).find(".prev").removeClass('pagi-disabled');
          $(this_val).find(".next").addClass('pagi-disabled');
      }
      displayRows($(this_val));
  });

  $(this).find('.prev').on('click', function (ev) {
      ev.preventDefault();
      if ($(this_val).find("b.selected:first").prevAll('b').length > 1) {
          $(this_val).find("b.selected").first().prevAll(':lt(1)').show();
          $(this_val).find("b.selected").hide();
          $(this_val).find(".prev").removeClass('pagi-disabled');
          $(this_val).find(".next").removeClass('pagi-disabled');
          displayevent($(this_val));
      }
      else {
          $(this_val).find("b.selected").first().prevAll().show();
          $(this_val).find("b.selected").hide();
          $(this_val).find(".prev").addClass('pagi-disabled');
          $(this_val).find(".next").removeClass('pagi-disabled');
          displayevent($(this_val));
      }
      displayRows($(this_val));
  });

})


/* PAGINATION FUNCTIONS */

function displayRows(this_current) {
var currentPage = $(this_current).find('b.selected').text();
$(this_current).find(".item-listing .item-single").hide();
var pageSize = $(this_current).attr("data-count");
for (var k = (currentPage * pageSize) - (pageSize - 1) ; k <= (currentPage * pageSize) ; k++) {
$(this_current).find(".item-listing .item-single:nth-child(" + k + ")").show();
}

var customPaggiOffset = $(this_current).offset().top;
$('html, body').animate({ scrollTop: '' + (customPaggiOffset - 200) + 'px' }, 800);
}

function displayevent(this_current) {
$(this_current).find(".item-pagination .page-count b").each(function () {
if ($(this).css('display') === 'inline') {
$(this).addClass('selected');
}
else {
$(this).removeClass('selected');
}
});
}

/* PAGINATION FUNCTIONS END */