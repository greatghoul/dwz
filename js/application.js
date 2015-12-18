(function() {
  function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  $(function() {
    var $url_long   = $('#url-long')
      , $url_short  = $('#url-short')
      , $btn_submit = $('#btn-submit');

    function shorterUrl(url) {
      var url = $url_long.val();
      
      $url_short.val('');
      $url_short.parent().removeClass('has-error');

      if (!url) return;

      $.ajax({
        url: 'http://dwz.cn/create.php',
        type: 'POST',
        data: { url: url },
        dataType: 'json',
        beforeSend: function() {
          $btn_submit.attr('disabled', 'disabled');
        },
        success: function(result) {
          if (result.err_msg) {
            $url_short.val(result.err_msg);
            $url_short.parent().addClass('has-error');
          } else {
            $url_short.val(result.tinyurl).focus().select();
          }
        },
        error: function() {
          $url_short.val('请求失败，请重试。');
          $url_short.parent().addClass('has-error');
        },
        complete: function() {
          $btn_submit.removeAttr('disabled');    
        }
      });
    }

    $url_long.val(getParameterByName('url'));
    $btn_submit.on('click', shorterUrl)
    $btn_submit.trigger('click');

    $('#bookmarklet').attr('href', "javascript:(function(){window.open('__DWZ__?url='+encodeURIComponent(location.href),'_blank','width=450,height=260');})()".replace('__DWZ__', location.origin));
  });  
})();
