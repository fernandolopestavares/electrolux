$(document).ready(function() {
    DEFAULT.init();
});

var DEFAULT = {
    init: function() {
        $('<div class="fundo-busca" style="width:100%;height:100%;background:#05386c;opacity:0.8;position:fixed;top:0;left:0;z-index:1;display:none;"></div>').prependTo('body');        
        DEFAULT.hover_menu();
        DEFAULT.nav_mobile();
        DEFAULT.hover_menu_mobile();
        DEFAULT.menu_busca();
        DEFAULT.lazy_load();
        DEFAULT.busca();
        DEFAULT.assine_news();
        DEFAULT.scroll_menu();
        DEFAULT.carrinho();
        DEFAULT.drop_cart();        

        if($('body').hasClass('home'))
            HOME.init();

        if($('body').hasClass('departamento'))
            DEP.init();

        if($('body').hasClass('categoria'))
            CAT.init();

        if($('body').hasClass('busca'))
            BUSCA.init();

        if($('body').hasClass('produto'))
            PRODUTO.init();        
    },
    hover_menu: function() {

        $('.navegacao nav.menu-navegacao ul li a').click(function(){
            if( $(window).width() <= 768 || DEFAULT.verificaMobile() ) {
                if( !$(this).hasClass('firstClick') ) {
                    $(this).addClass('firstClick');
                    console.log( 'firstClick' );
                    return false;
                }
                else
                {
                    console.log( 'lastClick' );                    
                }
            }
        });

        $('.navegacao nav.menu-navegacao > ul > li').hoverIntent({
            sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
            interval: 60, // number = milliseconds of polling interval
            over: function() {
                $('.dropdown-navegacao', this).fadeIn(250, "easeOutExpo");
                $(this).find('>a').addClass('active');
            },
            timeout: 500,
            out: function() {
                $('.dropdown-navegacao', this).fadeOut(250, "easeOutExpo");
                $(this).find('>a').removeClass('active');
            }
        });

        $('.navegacao nav.menu-navegacao > ul > li ul.item-dropdown-02 > li').hoverIntent({
            sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
            interval: 60, // number = milliseconds of polling interval
            over: function() {
                HOME.left_menu = $('.dropdown-sub-nivel-03', this).css('left');                
                $('.dropdown-sub-nivel-03', this).css('left', '-'+HOME.left_menu).show();
                $('.dropdown-sub-nivel-03', this).animate({ left: HOME.left_menu }, 200, function(){
                    $(this).removeAttr('style');
                });

                $(this).find('>a').addClass('active');
            },
            timeout: 60,
            out: function() {
                $('.dropdown-sub-nivel-03', this).fadeOut(200, "easeOutExpo", function(){
                    $('.dropdown-sub-nivel-03', this).css('left', HOME.left_menu);
                });
                //$('.dropdown-sub-nivel-03', this).slideDown(800, "easeOutExpo");
                $(this).find('>a').removeClass('active');
            }
        });

        $('.navegacao nav.menu-navegacao > ul > li ul.item-dropdown-02 > li ul.item-dropdown-03 > li').hoverIntent({
            sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
            interval: 60, // number = milliseconds of polling interval
            over: function() {
                HOME.left_menu = $('.dropdown-sub-nivel-04', this).css('left');                
                $('.dropdown-sub-nivel-04', this).css('left', '-'+HOME.left_menu).show();
                $('.dropdown-sub-nivel-04', this).animate({ left: HOME.left_menu }, 200, function(){
                    $(this).removeAttr('style');
                });
                //$('.dropdown-sub-nivel-04', this).slideDown(800, "easeOutExpo");
                $(this).find('>a').addClass('active');
            },
            timeout: 60,
            out: function() {
                $('.dropdown-sub-nivel-04', this).fadeOut(200, "easeOutExpo", function(){
                    $('.dropdown-sub-nivel-04', this).css('left', HOME.left_menu);
                });
                //$('.dropdown-sub-nivel-04', this).slideDown(800, "easeOutExpo");
                $(this).find('>a').removeClass('active');
            }
        });
    },
    nav_mobile: function() {
        /*MENU MOBILE CLICAR NO ICONE*/
        $("a#mobile-nav").click(function() {
            if ($(this).hasClass('active')) {
                $(".bg-menu-mobile").fadeOut('fast');
                $(".menu-mobile").slideUp(1000, "easeInOutExpo");
                $("a#mobile-nav").removeClass('active');
            } else {
                $(".bg-menu-mobile").fadeIn('fast');
                $(".menu-mobile").slideDown(1000, "easeInOutExpo");
                $(this).addClass('active');
            }
            return false;
        });
    },
    hover_menu_mobile: function() {
        // CLICANDO NOS ICONES DE + ou - DO MENU NAVEGAÇÂO MOBILE
        $("a.btn-bullet").click(function() {
            $(this).parent().parent().find(".navegacao-mobile-conteudo").slideUp(1000, "easeInOutExpo");
            if (!$(this).hasClass('active')) {
                $(this).parent().find(".navegacao-mobile-conteudo").slideDown(1000, "easeInOutExpo");
                $("a.btn-bullet").removeClass('active');
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
            return false;
        });
    },
    menu_busca : function() {
        $('.fundo-busca').click(function(){
            $('.btn-search-fechar').click();
            $('.drop-busca').fadeOut('fast');
        });

        $('.navegacao').css('z-index', '5');

        //CLICK NO BOTÂO SEARCH
        $("a.btn-search").click(function() {
            //$(".search").show().animate({width: '100%'}, 500);
            $(".search").slideDown(800, "easeOutExpo", function(){
                $(this).css('overflow','visible');
            });
            //$('.fundo-busca').fadeIn('fast');
            return false;
        });

        $("a.btn-search-fechar").click(function() {
            $('.search .search-main .drop-busca').slideUp('fast');
            $('.search .search-main > input').val('');
            $(".search").slideUp(800, "easeOutExpo");
            $('.fundo-busca').fadeOut('fast');
            return false;
        });

        //SEARCH MOBILE QUANDO CLICA NA LUPA
        $("a.btn-search-branco").click(function() {
            if ($(this).hasClass('active')) {
                $(".bg-menu-mobile").fadeOut('fast');
                $(".search-mobile").slideUp(1000, "easeInOutExpo");
                $(".btn-search-branco").removeClass('active');
            } else {
                $(".bg-menu-mobile").fadeIn('fast');
                $(".search-mobile").slideDown(1000, "easeInOutExpo");
                $(this).addClass('active');
            }
            return false;
        });

        //SEARCH MOBILE QUANDO CLICA NO BOTAO DE FECHAR
        $("a.btn-search-fechar-mobile").click(function() {
            $(".bg-menu-mobile").fadeOut('fast');
            $(".btn-search-branco").removeClass('active');
            $(".search-mobile").slideUp(800, "easeOutExpo");
            return false;
        });
        
        //BOTÃƒO DE SUBIR TOPO
        $("a.btnTopo").click(function() {
            var target = ($.browser.opera) ? 'html' : 'html,body';
            var targetOffset = $(".wrapper").offset().top;
            $(target).animate({
                scrollTop: targetOffset
            }, 700);
            return false;
        });
    },
    busca_pagina: function(url, PS, sl, cc, sm, PageNumber, fq) {
        if( url == '' ){
            return $.ajax({
                url: '/buscapagina',
                type: 'GET',
                dataType: 'HTML',
                data: {
                    fq: fq,
                    PS: PS,
                    sl: sl,
                    cc: cc,
                    sm: sm,
                    PageNumber: PageNumber
                }
            });            
        }
        else
        {
            url = url.replace('&PageNumber=','');
            url += '&PageNumber='+PageNumber;
            return $.ajax({
                url: url,
                type: 'GET',
                dataType: 'HTML',
            }); 
        }
    },
    lazy_load : function() {        
        $('.load-assync').each(function(i, item) {
            var src='', alt='', content='', href='javascript:void(0)';

            if( $(item).is(':visible') && $(item).find('img').length == 0 && $(item).find('noscript').text() !== '' ) {

                if( $(item).find('noscript').text().search('src') > - 1 ) {
                    src = $(item).find('noscript').text().match(/src="(.*?)"/)[1];
                    if( $(item).parent().parent().parent().parent().parent().parent().parent().parent().hasClass('produto-size-g') ) {
                        src = src.replace('-390-390', '-320-320');                        
                    }
                }
                
                if( $(item).find('noscript').text().search('alt') > - 1 )
                    alt = $(item).find('noscript').text().match(/alt="(.*?)"/)[1];                
                          
                if( $(item).find('noscript').text().search('href') > -1 ) {
                    href = $(item).find('noscript').text().match(/href="(.*?)"/)[1];
                }
                
                content += '<span class="loading" style="display:block"><img src="/arquivos/ajax-loader.gif" style="margin: 0 auto;display:block" /></span>';
                
                $(item).find('noscript').text().search('box-banner') > -1 ? content += '<a href="'+href+'">' : '';

                content += '<img data-layzr="'+src+'" alt="'+alt+'" class="lazyr img-responsive" style="display:none;" />';
                
                $(item).find('noscript').text().search('box-banner') > -1 ? content += '</a>' : '';

                $(item).prepend(content);                
            }
        });

        setTimeout(function(){ DEFAULT.load_images(); }, 200);

        setTimeout(function(){
            DEFAULT.lazy_load();
        }, 800);
    },
    load_images : function() {
        $('.lazyr').not('.loading-complete').each(function(i, item){
            var carregar, obj = $(item);
            
            function loadImagem( src )
            {
                carregar = new Image();
                carregar.src = src;                
                setTimeout(function(){ verificaCarregamento(), 800 });
            }
             
            function verificaCarregamento()
            {
                if( carregar.complete )
                {   
                    obj.parent().addClass('load');
                    obj.parent().parent().find('.loading').hide();
                    obj.attr('src', carregar.src);
                    obj.addClass('loading-complete')
                    obj.fadeIn(800, 'easeOutExpo');
                }
                else
                {
                    setTimeout(function(){ verificaCarregamento(), 800 });
                }
            }
            
            loadImagem($(item).attr('data-layzr'));
        });
    },
    busca : function() {
        var intervalo, conteudo, busca;

        $('.search-mobile .search-main-mobile input').keyup(function(event) {
            if( event.keyCode == 13 ){
                window.location.href = '/'+$('.search-mobile .search-main-mobile input').val();
            }
        });

        $('.search-main > input').keyup(function(event) {
            _b = $(this);
            busca = $(this).val();
            conteudo = '';
            
            if( event.keyCode == 13 ){
                window.location.href = '/'+busca;
            }

            console.log( 'get busca' );

            clearInterval(intervalo);
            intervalo = setTimeout(function() {
                if( $.trim(busca) !== '' ) {
                    $.ajax({
                        url: '/buscaautocomplete/',
                        type: 'GET',
                        dataType: 'JSON',
                        data: {
                            maxRows: 12,
                            productNameContains: busca
                        }
                    })
                    .done(function(data) {
                        console.log("success",data);
                        $(data.itemsReturned).each(function(i,item){
                            if( item.thumb !== '' && item.thumb !== undefined )
                                conteudo += '<li><a href="'+item.href+'">'+item.name+'</a></li>';                        
                        });

                        if( conteudo == '' ){
                            _b.parent().find('.drop-busca').find('ul').html('<p style="margin-left: 20px;">Nenhum resultado encontrado!</p>');
                            _b.parent().find('.drop-busca').slideDown('fast');
                        }
                        else
                        {
                            _b.parent().find('.drop-busca').find('ul').html(conteudo);
                            _b.parent().find('.drop-busca').slideDown('fast');                          
                        }

                        $('.fundo-busca').fadeIn('fast');
                    });                
                }
                else
                {
                    $('.search-main .drop-busca ul').html('');
                    $('.search-main .drop-busca').slideUp('fast');
                }
            }, 800);
        });

        $('.search-main > .btn-search-lupa').click(function(){
            var busca = $(this).parent().find('input').val();
            window.location.href = '/'+busca;
            return false;
        });
    },
    assine_news : function() {
        $('.news form').each(function(){
            $(this).parent().append('<p class="msg-sucess col-xs-12 col-sm-12 col-md-6 col-lg-6" style="display:none;">Cadastro realizado com sucesso.</p>');
            $(this).validate({
                rules: {
                    nome: 'required',
                    email: {
                        required: true,
                        email: true
                    }
                },
                submitHandler: function(form) {
                    var news = {
                        newsInternalCampaign: 'newsletter:opt-in',
                        newsInternalPage: '_',
                        newsInternalPart: 'newsletter',
                        newsletterClientName: $(form).find('input[name="nome"]').val(),
                        newsletterClientEmail: $(form).find('input[name="email"]').val()
                    };

                    $.ajax({
                        url: '/no-cache/Newsletter.aspx',
                        type: 'POST',
                        data: news,
                        complete: function(a) {
                            $(form).fadeOut('fast', 'easeOutExpo', function(){
                                $(form).find('input[name="nome"]').val('');
                                $(form).find('input[name="email"]').val('');
                                $(form).parent().find('.msg-sucess').fadeIn('fast', 'easeOutExpo');
                                setTimeout(function(){
                                    $(form).parent().find('.msg-sucess').fadeOut('fast', 'easeOutExpo', function(){
                                        $(form).fadeIn('fast', 'easeOutExpo');
                                    });
                                }, 5000);
                            });
                        }
                    });
                }
            });
        });
    },
    scroll_menu : function() {
        
        var scroll_old = $(window).scrollTop(), scroll_new, intervalo;
        
        $(window).scroll(function() {
            clearInterval(intervalo);
            intervalo = setTimeout(function() {
                scroll_new = $(window).scrollTop();
                if( scroll_new > 100 && $(window).width() >= 700 ) {           
                    if( scroll_old > scroll_new ) {
                        console.log( ' subindo ' );
                        
                        $('.menu-flutuante-down').fadeOut('fast', function(){
                            $('.menu-flutuante-up').show().animate({top: 0}, {effect: 'easeOutExpo', duration: '800'});
                            $('.menu-flutuante-down').css({top: '-100%'});
                        });
                    }
                    else if( scroll_old < scroll_new ) {
                        console.log( ' descendo ' );
                        
                        $('.menu-flutuante-up').fadeOut('fast', function(){
                            $('.menu-flutuante-down').show().animate({top: 0}, {effect: 'easeOutExpo', duration: '800'});
                            $('.menu-flutuante-up').css({top: '-100%'});
                        });
                    }                    
                }
                else
                {
                    $('.menu-flutuante-up').fadeOut('fast', function(){
                        $('.menu-flutuante-up').css({top: '-100%'});
                    });

                    $('.menu-flutuante-down').fadeOut('fast', function(){
                        $('.menu-flutuante-down').css({top: '-100%'});
                    });
                }
                scroll_old = $(window).scrollTop();
            }, 100);
        });
    },
    qtd_cart : '',
    carrinho : function() {        
        $.ajax({
            url: '/api/checkout/pub/orderForm/',
            type: 'GET',
            async: true
        }).done(function(sacola){
            if( DEFAULT.qtd_cart !== sacola.items.length ) {
                console.log( sacola );

                var cart = '';
                
                $('.qtd_cart').text(sacola.items.length);
                DEFAULT.qtd_cart = sacola.items.length;

                $(sacola.items).each(function(i, item){
                    cart += '\
                    <li>\
                        <a class="remove-cart"></a>\
                        <a href="'+item.detailUrl+'">\
                            <figure class="load-assync"><noscript><img src="'+item.imageUrl.replace('-55-55', '-100-100')+'" class="lazyr img-responsive"/></noscript></figure>\
                            <p class="desc">\
                                '+item.name+'<br /><br />\
                                '+item.quantity+'UND. R$'+item.price+'\
                            </p>\
                        </a>\
                    </li>';
                });

                $('.drop_cart ul').html('').html(cart);
            }

            setTimeout(function(){
                DEFAULT.carrinho();
            }, 2000);
        });
    },
    drop_cart : function() {
        $('.cart-content').hoverIntent({
            sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
            interval: 60, // number = milliseconds of polling interval
            over: function() {
                $(this).find('.drop_cart').slideDown(800, "easeOutExpo");
                $(this).find('.btn-carrinho').addClass('active');
            },
            timeout: 500,
            out: function() {
                $(this).find('.drop_cart').slideUp(800, "easeOutExpo");
                $(this).find('.btn-carrinho').removeClass('active');
            }
        });

        $('.btn-carrinho-branco').click(function(){
            if( $(this).parent().find('.drop_cart').is(':visible') ){
                $(this).parent().find('.drop_cart').slideUp(800, "easeOutExpo");
            }
            else
            {
                $(this).parent().find('.drop_cart').slideDown(800, "easeOutExpo");
            }
            return false;
        });
    },    
    verificaMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}

var HOME = {
    left_menu: { },
    init: function() {
        
        HOME.banner();
        HOME.banner_mobile();
        HOME.carrousel_simple();
        HOME.produtos_bottom();
        HOME.modal_welcome();        

        $('.banners img').addClass('img-responsive');
        $('.banners').parent().css('padding', '0');

        $('.banners .left > div:eq(1)').addClass('bottom');
    },
    banner: function() {
        $('.banner').owlCarousel({
            items: 1,
            singleItem: true,
            navigation: true,
            navigationText: ['', ''],
            responsive: true,
            responsiveRefreshRate : 200,
            responsiveBaseWidth: window,
            transitionStyle : false,
            afterInit: function() {
                $('.banner .owl-prev').addClass('hidden-xs hidden-sm');
                $('.banner .owl-next').addClass('hidden-xs hidden-sm');
                $('.banner .owl-pagination').addClass('hidden-md hidden-lg');
                $(window).load(function(){
                    $(window).resize(function() {
                        $('.banner').data('owlCarousel').reinit();
                    });        
                });
            }
        });
    },
    banner_mobile: function() {
        $('.banner-mobile').owlCarousel({
            items: 1,
            singleItem: true,
            navigation: true,
            navigationText: ['', ''],
            afterInit: function() {
                $('.banner-mobile .owl-prev').addClass('hidden-xs');
                $('.banner-mobile .owl-next').addClass('hidden-xs');
                $(window).load(function(){
                    $(window).resize(function() {
                        $('.banner-mobile').data('owlCarousel').reinit();
                    });        
                });
            }
        });
    },    
    carrousel_simple: function() {
        $('.carrousel-simple ul .helperComplement').remove();
        // $('.carrousel-simple ul').addClass('col-md-12').addClass('col-lg-12');

        $('.carrousel-simple ul').addClass('row');
        $('.carrousel-simple ul li article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
        $('.carrousel-simple ul li figure').addClass('col-xs-5 col-sm-5 col-md-5 col-lg-5');
        $('.carrousel-simple ul li .box-info').addClass('col-xs-7 col-sm-7 col-md-7 col-lg-7');

        $('.carrousel-simple ul').owlCarousel({
            items: 2,
            itemsCustom: [800, 1],
            itemsCustom: [1024, 2],
            navigation: true,
            navigationText: ['', ''],
            beforeInit: function() {

            },
            afterInit: function() {
                $('.carrousel-simple .owl-prev').addClass('hidden-xs hidden-sm hidden-md');
                $('.carrousel-simple .owl-next').addClass('hidden-xs hidden-sm hidden-md');
                $('.carrousel-simple .owl-page').addClass('hidden-lg');
                $('.carrousel-simple img').addClass('img-responsive');
                $(window).load(function(){
                    $(window).resize(function() {
                        $('.carrousel-simple ul').data('owlCarousel').reinit();
                    });        
                });
            }
        });
    },
    produtos_bottom: function() {
        var firstClick = true;

        $('.produto-size-g').addClass('hidden-xs');        
        $('.container-produtos').parent().addClass('produto-bottom-row');
        $('.container-produtos').parent().prepend('\
            <span class="loading" style="display:none;width:100%;height:100%;position:absolute;top:0;left:0;z-index:9;background:#FFF;opacity:0.8;">\
            <img src="/arquivos/ajax-loader.gif" style="margin:0 auto;display:block;position:absolute;top:50%;left:50%;margin-top:-16px;" />\
        </span>');

        $('.gray .menu ul li a').click(function() {
            var top = $(this).offset().top;
            var number = $(this).attr('href').toString().split('-');
            number = number[1];

            $('.container-produtos').parent().find('>.loading').show();

            $('body.home .gray .menu ul li').removeClass('active');
            $(this).parent().addClass('active');

            $('.container-produtos').find('.owl-next').fadeOut('fast');
            $('.container-produtos').find('.owl-prev').fadeOut('fast');

            $('.produtos-bottom-' + number).parent().find('.owl-next').fadeIn('fast');
            $('.produtos-bottom-' + number).parent().find('.owl-prev').fadeIn('fast');

            if( $(window).width() >= 640 ){
                $('div[class*="produtos-bottom"]').fadeOut(200, 'easeOutExpo');
                $('.produto-size-g').fadeOut(200, 'easeOutExpo');
            }
            else
            {
                $('div[class*="produtos-bottom"]').slideUp('fast');                
            }

            if ($('.produto-size-g .produto-size-g-' + number).html() === '') {

                DEFAULT.busca_pagina('', 1, '71063314-ff81-4143-9962-106a5993ba9f', 1, 0, number, 'H:145').done(function(data) {                    
                    $('.produto-size-g .produto-size-g-' + number).html(data);

                    $('.produto-size-g .produto-size-g-' + number).find('.helperComplement').remove();
                    $('.produto-size-g .produto-size-g-' + number).find('ul').addClass('row');
                    $('.produto-size-g .produto-size-g-' + number).find('li').addClass('hidden-xs col-md-12 col-lg-12');
                    $('.produto-size-g .produto-size-g-' + number).find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
                    $('.produto-size-g .produto-size-g-' + number).find('li').find('article').find('figure').addClass('col-xs-4 col-sm-12 col-md-12 col-lg-12');
                    $('.produto-size-g .produto-size-g-' + number).find('li').find('article').find('.box-info').addClass('col-xs-8 col-sm-12 col-md-12 col-lg-12');
                });
            }

            if ($('.produtos-bottom-' + number).html() === '') {

                DEFAULT.busca_pagina('', 12, '71063314-ff81-4143-9962-106a5993ba9f', 4, 0, number, 'H:145').done(function(data) {
                    $('.produtos-bottom-' + number).html(data);
                    //$('.produtos-bottom-'+number).addClass('col-xs-6 col-sm-6');
                    $('.produtos-bottom-' + number).find('img').addClass('img-responsive');
                    $('.produtos-bottom-' + number).find('.helperComplement').remove();
                    $('.produtos-bottom-' + number).find('ul').addClass('item');
                    $('.produtos-bottom-' + number).find('li').addClass('col-xs-12 col-sm-12 col-md-6 col-lg-6');
                    $('.produtos-bottom-' + number).find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
                    $('.produtos-bottom-' + number).find('li').find('article').find('figure').addClass('col-xs-5 col-sm-5 col-md-5 col-lg-5');
                    $('.produtos-bottom-' + number).find('li').find('article').find('.box-info').addClass('col-xs-7 col-sm-7 col-md-7 col-lg-7');

                    $('.produtos-bottom-' + number).find('ul').each(function() {
                        $(this).find('li').eq(1).addClass('hidden-xs');
                        $(this).find('li').eq(2).addClass('hidden-xs hidden-sm');
                        $(this).find('li').eq(3).addClass('hidden-xs hidden-sm');
                    });

                    $('.produtos-bottom-' + number).find('.prateleira').owlCarousel({
                        items: 1,
                        singleItem: true,
                        navigation: true,
                        navigationText: ['', ''],
                        afterInit: function() {
                            $('.produtos-bottom-' + number + ' .owl-prev').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
                            $('.produtos-bottom-' + number + ' .owl-next').addClass('hidden-xs hidden-sm hidden-md hidden-lg');

                            $('.produtos-bottom-' + number + ' .owl-pagination').addClass('hidden-lg');
                            $('.produtos-bottom-' + number + ' .owl-pagination').addClass('hidden-lg');

                            $('.produtos-bottom-' + number).parent().append('<span class="hidden-xs hidden-sm hidden-md owl-next"></span><span class="hidden-xs hidden-sm hidden-md owl-prev"></span>');
                            
                            $('.produtos-bottom-' + number).parent().find('.owl-next').click(function(){ 
                                $('.produtos-bottom-' + number).find('.prateleira').data('owlCarousel').next();
                            });

                            $('.produtos-bottom-' + number).parent().find('.owl-prev').click(function(){ 
                                $('.produtos-bottom-' + number).find('.prateleira').data('owlCarousel').prev();
                            });                            
                        }
                    });                    

                    if( $(window).width() >= 640 ){
                        $('.produtos-bottom-' + number).fadeIn(500, 'easeOutExpo');
                        $('.produto-size-g .produto-size-g-' + number).parent().fadeIn(500, 'easeOutExpo');
                    }
                    else
                    {
                        $('.produtos-bottom-' + number).slideDown('fast');
                    }

                    setTimeout(function(){ $('.container-produtos').parent().find('.loading').hide(); }, 500);
                });
            }
            else
            {
                if( $(window).width() >= 640 ){
                    setTimeout(function(){
                        $('.produtos-bottom-' + number).fadeIn(500, 'easeOutExpo');
                        $('.produto-size-g .produto-size-g-' + number).parent().fadeIn(500, 'easeOutExpo');
                    }, 500);
                }
                else
                {
                    $('.produtos-bottom-' + number).slideDown('fast');                    
                }

                setTimeout(function(){ $('.container-produtos').parent().find('.loading').hide(); }, 500);
            }
            //console.log( firstClick, top );

            return false;
        });

        $('body.home .gray .menu ul li a:eq(0)').click();
        $('body.home .row.gray > .container .container-produtos > a').eq(0).addClass('active');

        /*MOBILE*/
        $('body.home .row.gray > .container .container-produtos > a').click(function(){
            var h = $(this).attr('href');
            $('body.home .row.gray > .container .container-produtos > a').removeClass('active');
            $(this).addClass('active');
            $('body.home .gray .menu ul li a[href="'+h+'"]').click();
            return false;
        });
    },
    modal_welcome: function(){        
        console.log('start_modal');

        //colocando o fundo preto
        createCookie('welcome', true, -1);        
        if( !readCookie('welcome') && !readCookie('welcome') == true ) {
            if( !DEFAULT.verificaMobile() && $(window).width() >= 800 ) {
                $('#start').css({position: 'fixed', top: '50%', 'margin-top': ($('#start').height() / 2)*-1});                
            }

            $('#mascara').fadeIn(1000);
            $('#start').fadeIn(800, "easeOutExpo");
        }

        $('.btn-close, #mascara').click(function(){
            createCookie('welcome', 'true', 30);
            $("#mascara").fadeOut(1000);
            $(".window").fadeOut("slow");
            return false;
        });

        //FORMULARIO DE CONTATO
        $(".formBemVindo").validate({
            //errorContainer: $(".formBemVindo .msgError"), 
            //errorLabelContainer: $(".formBemVindo .msgError"),
            rules : {
                nome: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages : {
                nome: 'Insira seu nome',
                email: {
                    required: 'Insira seu e-mail',
                    email: 'Insira um e-mail válido',
                }
            },
            submitHandler: function() {
                var news = {
                    newsInternalCampaign: 'newsletter:opt-in',
                    newsInternalPage: '_',
                    newsInternalPart: 'newsletter',
                    newsletterClientEmail: $('.formBemVindo input#nome').val(),
                    newsletterClientName: $('.formBemVindo input#email').val()
                };              
                
                $.ajax({
                    url: '/no-cache/Newsletter.aspx',
                    type: 'POST',
                    data: news,
                    success: function(a) {
                        console.log(a);

                        if (a.responseText != 'false') {                   
                            $('.formBemVindo input#nome, .formBemVindo input#email').val('');
                            $('.formBemVindo').fadeOut().delay(4000).fadeIn().delay(5000);
                            $(".sucesso").html('Cadastro efetuado com sucesso.').fadeIn().delay(3000).fadeOut();
                            $('.formBemVindo .btnCadastrar').attr('disabled', false).show();
                        }
                        else
                        {                            
                            $('.formBemVindo').fadeOut().delay(4000).fadeIn().delay(5000);
                            $(".sucesso").html('Erro ao cadastrar e-mail.').fadeIn().delay(3000).fadeOut();
                        }
                    }
                });
            }
        });
    },
}

var DEP = {
    init : function() {
        DEP.remove_numeros();
        APILOADMORE.prateleira();
        APILOADMORE.init();
        
        console.log( 'DEP INIT' );
        $('.box-banner').find('img').addClass('img-responsive');
    },
    remove_numeros : function() {        
        $('body.departamento .filtros-departamento a').each(function(i, item){
            var ex = $(this).text().split('(');
            $(this).text(ex[0]);
        });
    }
}

var CAT = {
    init : function() {
        console.log( 'CAT INIT' );

        $('.filtro-superior-left span').prepend( $('.resultado-busca-numero .value').eq(0).text() + ' ' );

        //$('.filtro-superior-right .selectOrdenar').prepend('<span>Selecione</span>');        
        //$('.departamento-prateleira').prepend('<a href="#" class="col-xs-4 hidden-sm hidden-md hidden-lg toogleFiltros open">Filtros <i class="fa fa-angle-right"></i></a>');
        //$('.box-banner').find('img').addClass('img-responsive');
        $('.search-multiple-navigator').prepend('<a href="#" class="col-xs-12 hidden-sm hidden-md hidden-lg toogleFiltros close">Fechar</a>');
        
        /*ORDERNAR POR*/
        $('.filtro-superior-right .selectOrdenar').click(function(){
            if( !$('.outras-descricoes',this).is(':visible') )
                $('.outras-descricoes',this).slideDown('slow', 'easeInOutExpo');
            else
                $('.outras-descricoes',this).slideUp('fast', 'easeInOutExpo');
            return false;
        });

        PRODUTO.breadcrumb();
        APILOADMORE.prateleira();
        APILOADMORE.init();
        CAT.filtros();
        CAT.produto_destaque();
        CAT.ar_condicionado();
    },
    filtros : function() {
        $('.toogleFiltros').click(function(){
            var left = $('.filtros-departamento').css('left');
            left = left.replace('px','') * 1;

            console.log( left );

            if( left >= -20 )
                $('.filtros-departamento').animate({left: '-100%'}, 1500, 'easeOutExpo');
            else
                $('.filtros-departamento').animate({left: -15}, 1500, 'easeOutExpo');

            return false;
        });
    },
    produto_destaque : function() {        
        $('.produto-destaque-banner ul li article > a').addClass('col-xs-12 col-sm-4 col-md-4 col-lg-4');
        $('.produto-destaque-banner ul li article > figure').addClass('col-xs-12 col-sm-4 col-md-4 col-lg-4');
        $('.produto-destaque-banner ul li article > .box-info').addClass('col-xs-12 col-sm-4 col-md-4 col-lg-4');

        $('.produto-destaque-banner ul li article > figure img').addClass('img-responsive');
    },
    ar_condicionado : function() {
        $('.btnCalcularAr').click(function(){
            if( !$(this).hasClass('active') ) {
                $('.boxCalcularAr').slideDown('fast');
                $(this).addClass('active');
            }
            else
            {
                $('.boxCalcularAr').slideUp('fast');
                $(this).removeClass('active');
            }
            return false;
        });
    }
}

var BUSCA = {
    init : function() {
        $(".bread-crumb ul").append('<li><a title="Resultado de Busca" href="javascript:void(0);">Resultado de Busca</a></li>');
        APILOADMORE.prateleira();
        APILOADMORE.init();
        PRODUTO.breadcrumb();        
        BUSCA.filtros();
        BUSCA.termo();
        
        console.log( 'BUSCA INIT' );
        $('.box-banner').find('img').addClass('img-responsive');
        $('.filtro-superior-left span').prepend( $('.resultado-busca-numero .value').eq(0).text() + ' ' );
        $('.filtro-superior-right .selectOrdenar').click(function(){
            if( !$('.outras-descricoes',this).is(':visible') )
                $('.outras-descricoes',this).slideDown('slow', 'easeInOutExpo');
            else
                $('.outras-descricoes',this).slideUp('fast', 'easeInOutExpo');
            return false;
        });

    },  
    filtros : function() {
        $('.search-single-navigator').prepend('<a href="#" class="col-xs-12 hidden-sm hidden-md hidden-lg toogleFiltros close">Fechar</a>');        
        $('.toogleFiltros').click(function(){
            var left = $('.filtros-departamento').css('left');
            left = left.replace('px','') * 1;

            console.log( left );

            if( left >= -20 )
                $('.filtros-departamento').animate({left: '-100%'}, 1500, 'easeOutExpo');
            else
                $('.filtros-departamento').animate({left: -15}, 1500, 'easeOutExpo');

            return false;
        });
    },
    termo : function(){
        $('<div class="termo-busca row"><div class="container"><p></p></div></div>').insertBefore('.filtro-superior');
        $('.termo-busca p').text(window.dataLayer[0].siteSearchTerm);
   }
}

var APILOADMORE = {
    url : {},
    url_default : {},
    page_number: {},
    order : '',
    init : function() {
        $("script:not([src])").each(function(){
            b=jQuery(this)[0].innerHTML;
            c=/\/buscapagina\?.+&PageNumber=/i;

            if(-1<b.search(/\/buscapagina\?/i)){
                APILOADMORE.url_default = c.exec(b),!1
                APILOADMORE.url_default = APILOADMORE.url_default[0];
            }
        });

        APILOADMORE.page_number = 1;
        APILOADMORE.url = APILOADMORE.url_default;
        
        console.log( 'init loader', APILOADMORE.url_default, APILOADMORE.page_number );

        DEFAULT.busca_pagina(APILOADMORE.url_default, '', '', '', '', APILOADMORE.page_number+1, '').done(function(data) {
            data == '' ? $('.btn-carregar-mais').text('Todos produtos carregados').addClass('inactive') : $('.btn-carregar-mais').text('Carregar mais').removeClass('inactive');
        });

        $('.fa-refresh').removeClass('fa-spin');

        $('.btn-carregar-mais').live('click', function(){
            
            if( $(this).hasClass('inactive') ) return false;
            
            $('.fa-refresh').addClass('fa-spin');
            
            setTimeout(function(){
                APILOADMORE.page_number += 1;            
                        
                DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number, '').done(function(data) {

                    data = $(data)[0];

                    console.log( 'content load', data );

                    $('.resultItemsWrapper div[id*="ResultItems_"] > .prateleira').append('<div class="vitrine-new col-xs-12 col-sm-12 col-md-12 col-lg-12" style="overflow:hidden;display:none">'+$(data).html()+'</div>');
                    
                    APILOADMORE.prateleira();
                    
                    $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').slideDown(1500);
                    $('html,body').animate({ scrollTop: $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').offset().top - 40 }, {duration:1800, easing: 'easeOutExpo'});

                    setTimeout(function(){ $('.fa-refresh').removeClass('fa-spin'); }, 3500);

                    DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number+1, '').done(function(data) {
                        data == '' ? $('.btn-carregar-mais').text('Todos produtos carregados').addClass('inactive') : '';
                    });
                });

            }, 1000);

            return false;
        });

        $('.search-multiple-navigator label').live('click', function() {
            
            $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');            
            
            APILOADMORE.page_number = 1;
            APILOADMORE.url = APILOADMORE.url_default;

            $('.search-multiple-navigator label.active').each(function(i, item) {
                APILOADMORE.url += '&'+$(item).find('input').attr('rel');
            });

            APILOADMORE.url += APILOADMORE.order;

            DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number, '').done(function(data) {
                data = $(data)[0];

                if( data == '' || data == undefined ){
                    data = '<span>Nenhum resultado encontrado!</span>';
                }

                console.log( 'content load filter', data );

                $('.resultItemsWrapper div[id*="ResultItems_"] > .prateleira').html('<div class="vitrine-new col-xs-12 col-sm-12 col-md-12 col-lg-12" style="overflow:hidden;display:none">'+$(data).html()+'</div>');                
                
                APILOADMORE.prateleira();
                
                $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').slideDown(1000);
                $('html,body').animate({ scrollTop: $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').offset().top - 40 }, {duration:1800, easing: 'easeOutExpo'});

                setTimeout(function(){ $('.fa-refresh').removeClass('fa-spin'); }, 1500);

                DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number+1, '').done(function(data) {
                    data == '' ? $('.btn-carregar-mais').text('Todos produtos carregados').addClass('inactive') : $('.btn-carregar-mais').text('Carregar mais').removeClass('inactive');
                });
            });

            return false;
        });

        $('.outras-descricoes a').click(function(){
            $('.outras-descricoes').slideUp('fast', 'easeInOutExpo');
            $('.filtro-superior-right .selectOrdenar span').text( $(this).text() ).attr('rel', $(this).attr('href') );
            
            APILOADMORE.order = '&O='+$(this).attr('href');

            APILOADMORE.page_number = 1;
            APILOADMORE.url = APILOADMORE.url_default;

            $('.search-multiple-navigator label.active').each(function(i, item) {
                APILOADMORE.url += '&'+$(item).find('input').attr('rel');
            });

            APILOADMORE.url += APILOADMORE.order;

            DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number, '').done(function(data) {
                data = $(data)[0];

                if( data == '' || data == undefined ){
                    data = '<span>Nenhum resultado encontrado!</span>';
                }

                console.log( 'content load filter', data );

                $('.resultItemsWrapper div[id*="ResultItems_"] > .prateleira').html('<div class="vitrine-new col-xs-12 col-sm-12 col-md-12 col-lg-12" style="overflow:hidden;display:none">'+$(data).html()+'</div>');                
                
                APILOADMORE.prateleira();
                
                $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').slideDown(1000);
                $('html,body').animate({ scrollTop: $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').offset().top - 40 }, {duration:1800, easing: 'easeOutExpo'});

                setTimeout(function(){ $('.fa-refresh').removeClass('fa-spin'); }, 1500);

                DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number+1, '').done(function(data) {
                    data == '' ? $('.btn-carregar-mais').text('Todos produtos carregados').addClass('inactive') : $('.btn-carregar-mais').text('Carregar mais').removeClass('inactive');
                });
            });

            return false;
        });
    },
    prateleira : function() {
        $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
        $('.prateleira').find('ul').find('li.helperComplement').remove();        
        $('.prateleira').find('ul').find('li').addClass('load col-xs-12 col-sm-6 col-md-4 col-lg-4');
        $('.prateleira').find('ul').find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
        $('.prateleira').find('ul').find('li').find('img').addClass('img-responsive');

        if( $('body').hasClass('categoria') ) {
            $('.prateleira').find('ul').find('li').find('figure').addClass('col-xs-4 col-sm-12 col-md-12 col-lg-12');
            $('.prateleira').find('ul').find('li').find('.box-info').addClass('col-xs-8 col-sm-12 col-md-12 col-lg-12');
        }
        else
        if( $('body').hasClass('busca') ) {
            $('.prateleira').find('ul').find('li').find('figure').addClass('col-xs-4 col-sm-12 col-md-12 col-lg-12');
            $('.prateleira').find('ul').find('li').find('.box-info').addClass('col-xs-8 col-sm-12 col-md-12 col-lg-12');
        }
        else
        {
            $('.prateleira').find('ul').find('li').find('figure').addClass('col-xs-4 col-sm-5 col-md-12 col-lg-12');    
            $('.prateleira').find('ul').find('li').find('.box-info').addClass('col-xs-8 col-sm-7 col-md-12 col-lg-12');
        }
    }
}

var PRODUTO = {
    idProduto : '',
    init : function() {
        console.log('PRODUTO init');
        
        PRODUTO.idProduto = skuJson.skus[0].sku;
        PRODUTO.breadcrumb();
        PRODUTO.fotos();
        PRODUTO.info();
        //PRODUTO.scroll_price();
        PRODUTO.compre_junto();
        PRODUTO.prateleira_bottom();
        PRODUTO.voltagem();
    },
    breadcrumb : function() {
        $('.bread-crumb ul li:eq(0)').addClass('fa').addClass('fa-home').css({'cursor': 'pointer'}).find('a').css({'font-size': 0});
        $('.bread-crumb ul li').not('.fa').addClass('fa').addClass('fa-long-arrow-right');

        $('.bread-crumb ul li:eq(0)').click(function(){
            window.location.href = '/';
        });
    },
    fotos : function(){
        // TEMPORARY
        $('.thumbs').parent().css({'padding-left': 0});
        $('.carrousel').html('');
        $('.carrousel').parent().parent().find('.col-md-2').html('<ul class="thumbs"></ul>');
        
        //console.log( PRODUTO.load_fotos() );

        $(PRODUTO.load_fotos()).each(function(i, item){
            $('.carrousel').append('\
                <div class="item">\
                    <a href="'+item[0].Path.replace('-390-390', '-1000-1000')+'">\
                        <img data-src="'+item[0].Path.replace('-390-390', '-422-422')+'" class="img-responsive lazyOwl"/>\
                    </a>\
                </div>');
            $('.thumbs').append('<li><a href="'+i+'"><img src="'+item[0].Path.replace('-390-390', '-140-140')+'" class="img-responsive"/></a></li>');
        });

        $('.carrousel').owlCarousel({
            items: 1,
            singleItem: true,
            navigation: true,
            navigationText: ['', ''],
            lazyLoad: true,
            afterInit: function() {
                $('.produto-superior .carrousel .owl-prev').addClass('hidden-xs hidden-sm');
                $('.produto-superior .carrousel .owl-next').addClass('hidden-xs hidden-sm');

                $('.produto-superior .carrousel .owl-pagination').addClass('hidden-md hidden-lg');

                // $('.carrousel .item').zoom({
                //     //touch: true,              
                //     callback : function(item) {                        
                //         $(this).attr('src', $(this).attr('src').replace('-422-422', '-1000-1000'));
                //         $(this).css({'width': '1000px', 'height': '1000px'});
                //     }
                // }); // add zoom

                $('.carrousel .item').easyZoom();
            },
            afterLazyLoad : function(item) {
                console.log( 'after lazy - zoom qtd' );
            }
        });
        
        $('.thumbs').parent().append('<div class="container-thumbs"><a href="#" class="fa fa-chevron-up"></a><a href="#" class="fa fa-chevron-down"></a></div>');
        $('.thumbs').appendTo('.container-thumbs');

        if( $('.thumbs li').length > 5 ){
            $('.thumbs').ulslide({
                width: 87,
                height: 87,
                effect: {
                    type: 'carousel', // slide or fade
                    axis: 'y',        // x, y
                    showCount: 5,
                    distance: 5 // Distance between frames
                },
                nextButton: '.container-thumbs .fa-chevron-up',
                prevButton: '.container-thumbs .fa-chevron-down',
                duration: 800,                
            });

            $('.container-thumbs .fa-chevron-up, .container-thumbs .fa-chevron-down').fadeIn('fast');
        }        

        $('.thumbs li a').click(function(){
            $('.carrousel').data('owlCarousel').goTo( $(this).attr('href') );
            //$('.carrousel').data('owlCarousel').reinit();
            return false;
        });
    },
    info : function() {
        //$('.produto-inferior').html('<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8"> <div class="menu hidden-xs col-sm-12 col-md-4 col-lg-4"> <ul> <li class="active"><a href="#resumo">Resumo do produto<i class="fa fa-angle-right"></i></a></li> <li><a href="#detalhes">Detalhes do produto<i class="fa fa-angle-right"></i></a></li> <li><a href="#especificacao">Especificações técnicas<i class="fa fa-angle-right"></i></a></li> <li><a href="#apoio">Apoio ao cliente<i class="fa fa-angle-right"></i></a></li> </ul> </div> <div class="conteudo col-xs-12 col-sm-12 col-md-8 col-lg-8"> <div class="container-conteudo"> <a href="#resumo" class="hidden-sm hidden-md hidden-lg menu-mobile-info active">Resumo do produto<i class="fa fa-angle-down"></i></a> <div class="resumo col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div> </div> <div class="container-conteudo"> <a href="#detalhes" class="hidden-sm hidden-md hidden-lg menu-mobile-info">Detalhes do produto<i class="fa fa-angle-down"></i></a> <div class="detalhes col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div> </div> <div class="container-conteudo"> <a href="#especificacao" class="hidden-sm hidden-md hidden-lg menu-mobile-info">Especificações técnicas<i class="fa fa-angle-down"></i></a> <div class="especificacao col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div> </div> <div class="container-conteudo"> <a href="#apoio" class="hidden-sm hidden-md hidden-lg menu-mobile-info">Apoio ao cliente<i class="fa fa-angle-down"></i></a> <div class="apoio col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div> </div> </div> </div>');
        
        $('.info-gerais > div > h4').each(function(i, item){            
            if( $(item).hasClass('Caracteristicas') ) {
                $('.container-conteudo .resumo').append( $(item).next('table').find('.value-field').html() );
            }

            if( $(item).hasClass('Este-Produto-Inclui') ) {
                $(item).next('table').clone().appendTo('.container-conteudo .detalhes');
            }

            if( $(item).hasClass('Especificacoes-Tecnicas') ) {
                $(item).next('table').clone().appendTo('.container-conteudo .especificacao');
            }

            if( $(item).hasClass('Apoio-ao-Cliente') ) {
                $(item).next('table').clone().appendTo('.container-conteudo .apoio');
            }
        });

        $('.container-conteudo > div table').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
        $('.container-conteudo > div th').addClass('col-xs-8 col-sm-6 col-md-8 col-lg-8');
        $('.container-conteudo > div td').addClass('col-xs-4 col-sm-6 col-md-4 col-lg-4');

        $('.container-conteudo a.menu-mobile-info').click(function(){
            var _this = $(this);
            if( _this.hasClass('active') ) {
                _this.next('div').slideUp(1500, 'easeOutExpo');
                _this.removeClass('active');
            }
            else
            {
                $('.container-conteudo').find('> a').removeClass('active');
                _this.addClass('active');

                $('.container-conteudo').find('> div').slideUp(1500, 'easeOutExpo');
                _this.next('div').slideDown(1500, 'easeOutExpo');
            }            
            return false;
        });

        $('.produto-inferior .menu ul li a').click(function(){
            $('.produto-inferior .menu ul li a').removeClass('active');
            $(this).addClass('active');

            var href = $(this).attr('href').replace('#', '');
            
            if( $(window).width() <= 992 ){
                $('.container-conteudo > div').slideUp(1500, 'easeOutExpo');
                $('.container-conteudo > div[class*="'+href+'"]').slideDown(1500, 'easeOutExpo');
            }
            else
            {
                $('.produto-inferior .conteudo').css({'height': $('.produto-inferior .conteudo').height(), 'overflow': 'hidden'});
                $('.container-conteudo > div').fadeOut(800, 'easeOutExpo');
                
                setTimeout(function(){
                    var h = $('.container-conteudo > div[class*="'+href+'"]').height() + 10;
                    $('.container-conteudo > div[class*="'+href+'"]').fadeIn(800, 'easeOutExpo');
                    $('.produto-inferior .conteudo').animate({height: h}, {duration: 800, easing: 'easeOutExpo'});
                    $('.produto-inferior .menu').animate({height: h+10}, {duration: 800, easing: 'easeOutExpo'});
                }, 900);
            }
            return false;
        });
    },
    top_price : 46,
    bottom_price: '',
    posicao_rol_price: '',
    limite_rol_price: '',
    scroll_price : function() {
            
        PRODUTO.bottom_price = PRODUTO.top_price + $('.produto-superior > .row > .col-md-12 > .col-md-4').height() - 50;
        
        var interval;  

        $(window).scroll(function(){
            if( $(window).width() >= 992 ) {
                clearTimeout(interval);
                interval = setTimeout(function(){
                    PRODUTO.posicao_rol_price = $('.produto-superior > .row > .col-md-12 > .col-md-4').offset().top + $('.produto-superior > .row > .col-md-12 > .col-md-4').height();
                    PRODUTO.limite_rol_price = $('.rodape-frete').offset().top - 100;

                    console.log( PRODUTO.posicao_rol_price, PRODUTO.limite_rol_price );

                    if( $(window).scrollTop() > PRODUTO.bottom_price ){
                        if( PRODUTO.limite_rol_price > PRODUTO.posicao_rol_price )
                            $('.produto-superior > .row > .col-md-12 > .col-md-4').css({ top: $(window).scrollTop() - 100 });
                    }
                    else
                    {
                        $('.produto-superior > .row > .col-md-12 > .col-md-4').css({ top: PRODUTO.top_price });
                    }
                }, 800);
            }
        });
    },
    compre_junto : function () {
        if( $('.compre-junto-content .buy-together-content').html() !== '' ) {

            $('.compre-junto, .compre-junto-content').fadeIn('fast');

            $('.compre-junto .economize strong').text( $.trim($('.buy-together-content .buy > strong:eq(2)').html().split(':')[1]) );

            $('.compre-junto-content .prateleira-compre').prepend('\
            <ul class="col-sm-12 col-md-12 col-lg-12">\
                <li class="col-sm-4 col-md-4 col-lg-4 first-item">'+$('.buy-together-content .itemA').html()+'</li>\
                <li class="col-sm-1 col-md-1 col-lg-1"><i class="fa fa-plus"></i></li>\
                <li class="col-sm-4 col-md-4 col-lg-4 second-item">'+$('.buy-together-content .itemA').html()+'</li>\
                <li class="col-sm-1 col-md-1 col-lg-1"><i class="fa equal">=</i></li>\
                <li class="col-sm-2 col-md-2 col-lg-2">\
                    <span class="valor-por">POR '+$('.buy-together-content .buy > strong:eq(1)').text().toUpperCase()+'</span>\
                    <span class="parcela">até '+$('.buy-together-content .buy > strong:eq(0)').text().replace('x','')+' vezes</span>\
                    <a href="'+$('#lnkComprar').attr('href')+'" class="btn-compre">adicionar ao carrinho</a>\
                </li>\
            </ul>');

            $('.compre-junto-content .prateleira-compre .first-item a, .compre-junto-content .prateleira-compre .first-item h3').addClass('col-sm-6 col-md-6 col-lg-6');
            $('.compre-junto-content .prateleira-compre .first-item a img').attr('src', $('.compre-junto-content .prateleira-compre .first-item a img').attr('src').replace('-90-90', '-200-200')).addClass('img-responsive');
            $('.compre-junto-content .prateleira-compre .first-item a img').addClass('img-responsive').removeAttr('width height');

            $('.compre-junto-content .prateleira-compre .second-item a, .compre-junto-content .prateleira-compre .second-item h3').addClass('col-sm-6 col-md-6 col-lg-6');
            $('.compre-junto-content .prateleira-compre .second-item a img').attr('src', $('.compre-junto-content .prateleira-compre .second-item a img').attr('src').replace('-90-90', '-200-200'));
            $('.compre-junto-content .prateleira-compre .second-item a img').addClass('img-responsive').removeAttr('width height');
        }
    },
    prateleira_bottom : function() {
        var number=1;
        var container='.prateleira-bottom';

        if( $('.notifyme.sku-notifyme').is(':visible') ) {
            container='.prateleira-bottom.produto-indisponivel ';
            $('.prateleira-bottom.produto-indisponivel').fadeIn(800, 'easeOutExpo');
            $('.prateleira-bottom:not(.produto-indisponivel)').hide();
        }
        else
        {
            container='.prateleira-bottom:not(.produto-indisponivel) ';
        }
        
        var colecao_size = $(container + '.produto-size-g .produto-size-g-' + number).text();
        var colecao_produtos = $(container + '.produtos-bottom-' + number).text();

        DEFAULT.busca_pagina('', 1, '71063314-ff81-4143-9962-106a5993ba9f', 1, 0, number, 'H:'+colecao_size).done(function(data) {                    
            $(container + '.produto-size-g .produto-size-g-' + number).html(data).fadeIn('fast','easeOutExpo');

            $(container + '.produto-size-g .produto-size-g-' + number).find('img').addClass('img-responsive');
            $(container + '.produto-size-g .produto-size-g-' + number).find('.helperComplement').remove();
            $(container + '.produto-size-g .produto-size-g-' + number).find('ul').addClass('row');
            $(container + '.produto-size-g .produto-size-g-' + number).find('li').addClass('hidden-xs col-md-12 col-lg-12');
            $(container + '.produto-size-g .produto-size-g-' + number).find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
            $(container + '.produto-size-g .produto-size-g-' + number).find('li').find('article').find('figure').addClass('col-xs-4 col-sm-12 col-md-12 col-lg-12');
            $(container + '.produto-size-g .produto-size-g-' + number).find('li').find('article').find('.box-info').addClass('col-xs-8 col-sm-12 col-md-12 col-lg-12');                    
        });

        DEFAULT.busca_pagina('', 12, '71063314-ff81-4143-9962-106a5993ba9f', 4, 0, number, 'H:'+colecao_produtos).done(function(data) {
            $(container + '.produtos-bottom-' + number).html(data).fadeIn('fast','easeOutExpo');
            //$(container + '.produtos-bottom-'+number).addClass('col-xs-6 col-sm-6');
            $(container + '.produtos-bottom-' + number).find('img').addClass('img-responsive');
            $(container + '.produtos-bottom-' + number).find('.helperComplement').remove();
            $(container + '.produtos-bottom-' + number).find('ul').addClass('item');
            $(container + '.produtos-bottom-' + number).find('li').addClass('col-xs-12 col-sm-12 col-md-6 col-lg-6');
            $(container + '.produtos-bottom-' + number).find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
            $(container + '.produtos-bottom-' + number).find('li').find('article').find('figure').addClass('col-xs-5 col-sm-5 col-md-5 col-lg-5');
            $(container + '.produtos-bottom-' + number).find('li').find('article').find('.box-info').addClass('col-xs-7 col-sm-7 col-md-7 col-lg-7');

            $(container + '.produtos-bottom-' + number).find('ul').each(function() {
                $(this).find('li').eq(1).addClass('hidden-xs');
                $(this).find('li').eq(2).addClass('hidden-xs hidden-sm');
                $(this).find('li').eq(3).addClass('hidden-xs hidden-sm');
            });

            $(container + '.produtos-bottom-' + number).find('.prateleira').owlCarousel({
                items: 1,
                singleItem: true,
                navigation: true,
                navigationText: ['', ''],
                afterInit: function() {
                    $(container + '.produtos-bottom-' + number + ' .owl-prev').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
                    $(container + '.produtos-bottom-' + number + ' .owl-next').addClass('hidden-xs hidden-sm hidden-md hidden-lg');

                    $(container + '.produtos-bottom-' + number + ' .owl-pagination').addClass('hidden-lg');
                    $(container + '.produtos-bottom-' + number + ' .owl-pagination').addClass('hidden-lg');

                    $(container + '.produtos-bottom-' + number).parent().append('<span class="hidden-xs hidden-sm hidden-md owl-next"></span><span class="hidden-xs hidden-sm hidden-md owl-prev"></span>');
                    
                    $(container + '.produtos-bottom-' + number).parent().find('.owl-next').click(function(){ 
                        $(container + '.produtos-bottom-' + number).find('.prateleira').data('owlCarousel').next();
                    });

                    $(container + '.produtos-bottom-' + number).parent().find('.owl-prev').click(function(){ 
                        $(container + '.produtos-bottom-' + number).find('.prateleira').data('owlCarousel').prev();
                    });                            
                }
            });
        });
    },
    voltagem : function() {
        if( $('.notifyme.sku-notifyme').is(':visible') ){
            $('.portal-notify-me-ref form fieldset input.sku-notifyme-client-email').addClass('col-xs-12 col-sm-8 col-md-9 col-lg-9');
            $('.portal-notify-me-ref form fieldset input.sku-notifyme-button-ok').addClass('col-xs-12 col-sm-4 col-md-3 col-lg-3').val('Enviar');
            $('.sku-selector-container, .produto-superior>.row .frete').hide();
            return false;
        }
        else 
        if( $('.sku-selector-container > ul .skuList label').length == 1 ) {
            if( $('.sku-selector-container > ul .skuList label').attr('class').toLowerCase().search('biv') > -1 ){
                $('.sku-selector-container > ul .specification').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
                $('.sku-selector-container > ul .skuList').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');                
                $('.sku-selector-container').slideDown(800, 'easeOutExpo');
            }
            else 
            if( $('.sku-selector-container > ul .skuList label').attr('class').toLowerCase().search('n-a') > -1 ){
                $('.sku-selector-container').hide();
            }
            else
            {
                $('.sku-selector-container > ul .specification').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 vol-unica');                
                $('.sku-selector-container > ul .skuList').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6');
                $('.sku-selector-container').slideDown(800, 'easeOutExpo');
            }
        }
        else
        {
            $('.sku-selector-container > ul .specification').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6');
            $('.sku-selector-container > ul .skuList').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6');
            $('.sku-selector-container').slideDown(800, 'easeOutExpo');
        }
    },
    load_fotos : function() {
        var fotos;
        $.ajax({
            url: '/produto/sku/'+PRODUTO.idProduto,
            type: 'GET',
            dataType: 'JSON',
            async: false     
        }).done(function(data){
            fotos = data[0].Images
        });

        return fotos;
    }
}