/***
* Code samples
**/

hljs.configure({tabReplace: '    '});
hljs.initHighlighting()

var code_samples = {
	cs : "public string Hello() {...}",
	python : "import invoked\n\nwith invoked.get_func(repo='invoked-example', func_name='javascript/addition.js:invoke') as clouded_function:\n\n    print clouded_function(2,3)\n\n    # prints 5",
	go : "func() {...}",
	ruby : "class Greeter\n  def salute\n    puts 'Hello #{@name}!'\n  end\nend\n\ng = Greeter.new('world')\ng.salute",
	js : "var invoked = require('invoked');\nvar ffmpeg = invoked('github/slvnperron/ffmpeg-invoked', 'tools/ffmpeg');\nvar result = ffmpeg({\n    frameRate: 45,\n	input: 'https://lol.com/myvideo.mp4'\n});"
}

function setActiveButton(elem){
	$('.select-langage').each(function(){
		$(this).removeClass('active');
	})

	$(elem).addClass('active');
}

function setCodeSample(elem){
	var targetLanguage = $(elem).data("langage");
	var code_sample = code_samples[targetLanguage];

	var highlighted = hljs.highlight(targetLanguage, code_sample);
	$('.editor-body pre code').html(highlighted.value);
}

$('.select-langage').click(function(){
	setActiveButton(this);
	setCodeSample(this);
});

$('#register').click(function(){
	$('.register-panel').each(function(){
		$(this).toggleClass('hidden');
	});
});

/***
* Payment
**/

var handler = StripeCheckout.configure({
    key: 'pk_test_XKRvmf8Gs4mO6fC7D7EsSrzH', //CHANGE THIS FOR YOUR OWN KEY.... THIS IS A TEST KEY
    token: function (token) {
        $.ajax({
            type: "POST",
            url: "/payment",
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(token),
            success: function (r) {
                console.log('success', r);
            }
        });
    }
});

$('#pay-button').click(function (e) {
    console.log('e');
    handler.open({
        name: 'Invoked.io',
        description: 'Private beta access',
        amount: 100,
        currency: 'CAD'
    });
    e.preventDefault();
});

// Close Checkout on page navigation
$(window).on('popstate', function () {
    handler.close();
});