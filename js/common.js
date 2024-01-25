(function (win, $) {
    /*========= 싱글 선택 ==========*/
    $.fn.dropdown = function(){
        var $btn_click = $('.radio');
        var $open_ul = $('ul.select_lst');
        $( $btn_click ).next().addClass("viewHide");
        $( $btn_click ).on("click", function(){
            $( this ).next().removeClass("viewHide");
        });
        $($open_ul).find("input[type=radio]").on("click", function(){
            var $var = $( this ).next().text();
            $( this ).parent().parent().prev().children().text( $var );
            $( this ).parent().parent().prev().children().addClass( "active" );
            $(this).next().addClass("active"); $(this).parent().siblings().find("label").removeClass("active");
            $( this ).parent().parent().addClass("viewHide");
        });
        $($open_ul).find("input[type=radio]").on("focus", function(){
            var $var = $( this ).next().text();
            $( this ).parent().parent().prev().children().text( $var );
            $( this ).parent().parent().prev().children().addClass( "active" );
            $(this).next().addClass("active"); $(this).parent().siblings().find("label").removeClass("active");
        });
        $($open_ul).find("input[type=radio]").on("blur", function(){
            $( this ).parent().parent().prev().children().removeClass( "active" );
        });
        $( $btn_click ).next().on("mouseleave", function(){
            $( $btn_click ).next().addClass( "viewHide" );
        });
    };


    /*============= 멀티선택 ================*/
    $(document).on("click", ".dropdown button", function(){
        $(this).parent().children().find("ul").slideToggle('fast');
    });

    // 외부 링크
    $(document).bind('click', function(e) {
      var $clicked = $(e.target);
      if (!$clicked.parents().hasClass("dropdown")) {
        $(".dropdown ul").hide();
      };
    });

    //체크박스 체크할때
    $(document).on("click", ".mutliSelect input[type='checkbox']", function(){
      var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),
        title = $(this).val() + ",";

      if ($(this).is(':checked')) {
        var html = '<span title="' + title + '">' + title + '</span>';
        $(this).closest('.mutliSelect').parent().children().find(".multiSel").append(html);
        $(this).closest('.mutliSelect').parent().children().find(".hida").hide();
      }
      else {
        $(this).closest('.mutliSelect').parent().children().find(".multiSel").find('span[title="' + title + '"]').remove();
        var checkLength = $(this).closest('.mutliSelect').parent().children().find(".multiSel").find('span').length;
        if(checkLength == 0){
            $(this).closest('.mutliSelect').parent().children().find(".hida").show();
        }
      }
    });


    /*==== Gnb 영역 너무 길때 생긴 버튼 ====*/
    // $(document).on("click", ".btn_arrow", function(){
    //     $(this).parents().find('.wrap').toggleClass('resize');
    //     $(this).toggleClass('on');
    // });
    /*==== Gnb menu active ====*/
    $(document).on("click", ".gnb li a", function(){
        $('.gnb li').removeClass('active');
        $(this).parent().addClass('active');
    });

    /*==== User menu ====*/
    $(document).on("click", ".user_login", function(){
        $(this).toggleClass('rotate');
        $(this).next().toggleClass('block');
    });
    $(document).on("click", ".user_menu li a", function(){
        $(this).parent().parent().removeClass('block');
        $(this).parent().parent().prev().removeClass('rotate');
    });
    $('html').click(function(e){
        var $clicked2 = $(e.target);
        if (!$clicked2.hasClass("user_menu")) {
            $('.user_menu').removeClass('block');
            $('.user_login').removeClass('rotate');
        };
    });


    /*==== Lnb menu active ====*/
    $(document).on("click", ".lnb li li>a", function(){
        $('.lnb li li').removeClass('active');
        $(this).parent().addClass('active');
    });
    /*====== 달력 =======*/
    $(function () {
        $(".datepicker").datepicker({
          showOn: "button",
          buttonImage: "../img/icon_calendar.png",
          buttonImageOnly: true,
          buttonText: "Select date",
        });
    });

    /*====== 레이어 파업 열고 닫기 =======*/
    $(function ($) {
        var $modal = $('.modal_wrap');

        // Modal Anchor Click
        $('a[href^="#modal-"]').click(function(){
            var $this = $(this);
            var $target = $($this.attr('href'));
            $this.addClass('active');
            $target.appendTo('body').attr('tabindex','0').fadeIn(200).focus(); // Target is move to body, and show.
            return false;
        });

        // Close modal window and bg
        function closeModal(){
            $('a[href^="#modal-"].active').focus().removeClass('active');
        };
        // Close button
        $('.btn_close,.modal_footer button').click(function(){
            $(this).parent().parent().parent().fadeOut(200);
        });
        $modal.find('.btn_close').click(function(){
            closeModal();
        });
        // ESC button
        $(document).keydown(function(e){
            if(e.keyCode != 27) return true;
            return closeModal();
        });
    });

    /*====== 테이블 헤더 고정 =======*/
    var sl = 0;
    $(function(){
        $.fn.hasYScrollBar = function() {
            return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0)
                    || (this.prop("scrollHeight") > this.prop("clientHeight"));
        };

        $.fn.hasXScrollBar = function() {
            return (this.prop("scrollWidth") == 0 && this.prop("clientWidth") == 0)
                    || (this.prop("scrollWidth") > this.prop("clientWidth"));
        };

        $(".tbl_body_scroll").scroll(function(event){
            // data 테이블 x축 스크롤을 움직일 때header 테이블 x축 스크롤을 똑같이 움직인다
            if (sl != $(".tbl_body_scroll").scrollLeft()) {
                sl = $(".tbl_body_scroll").scrollLeft();
                $(".tbl_head").scrollLeft(sl);
            }
        });

        if ($(".tbl_body_scroll").hasYScrollBar()) {
            //y축 스크롤이 있으면 스크롤 넓이인 8px만큼 header 마지막 열 크기를 늘린다
            $(".tbl_head colgroup col:last-child").width($(".tbl_body_scroll colgroup col:last-child").width() + 8);
        } else {
            $(".tbl_head colgroup col:last-child").width($(".tbl_body_scroll colgroup col:last-child").width());
        }
    });

    /*==== lnb 영역 접고/닫기 버튼 ====*/
    $(document).on("click", ".btn.fold", function(){
        $(this).parent().parent().parent().toggleClass('collapse');
    });

    /*==== 결재 버튼 ====*/
    $(document).on("click", ".toggle", function(){
        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
    });
    $(document).on("click", ".pay_close", function(){
        $(this).parent().remove()
    });
    $(document).on("click", ".approver_list_wrap.person .approver_list li", function(){
        $('.approver_list_wrap.person .approver_list li').removeClass('active');
        $(this).addClass('active');
    });



})(window, window.jQuery);

$(document).ready(function() {
   $('.select_box').dropdown();
});