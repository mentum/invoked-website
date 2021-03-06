/***
* Code samples
**/

hljs.configure({tabReplace: '    '});
hljs.initHighlighting();

var code_samples = {
    cs : 'using Invoked\n\ntry {\n    var cloudPhpAdd = new Invokable<int>("github/mentum/invoked-samples", "php-addition");\n    var result = await add.CallAsync(5, 10);\n    Console.WriteLine("Success: {0}", result); // Prints 15\n}\ncatch(Exception e) {\n    Console.WriteLine("Error: {0}", e.Message);\n}',
    python : "import invoked\n\nwith invoked('invoked-example', 'javascript-addition') as js_func:\n\n    print js_func(2,3).result()     # prints 5",
    go : 'import (\n    "fmt"\n    "github.com/mentum/invoked"\n)\n\nCloudCsharpAdd := invoked("github/mentum/invoked-samples", "csharp-addition")\n\nres := CloudCsharpAdd(8, 7)\nfmt.Println(<-res)    // prints 15',
    ruby : "class Greeter\n  def salute\n    puts 'Hello #{@name}!'\n  end\nend\n\ng = Greeter.new('world')\ng.salute",
    js : "var invoked = require('invoked');\n\nvar cloudCsharpAdd = invoked('github/mentum/invoked-samples', 'csharp-addition');\ncloudCsharpAdd(5, 10, function(err, result) {\n    if (err) console.log('Error: ', err);\n    else     console.log('Success: ', result); // Prints 15\n});",
    sh: "$ curl -X POST https://api.invoked.io/github/mentum/invoked-samples/csharp-addition/invoke \ \n    -H 'Content-Type: application/json'\ \n    -u 'api:<your api key here>'\ \n    -d '{\"a\":5,\"b\":\"10\"}' "
}

function setActiveButton(elem){
    $('.select-language').each(function(){
        $(this).removeClass('active');
    })

    $(elem).addClass('active');
}

function setCodeSample(elem){
    var targetLanguage = $(elem).data("language");
    var code_sample = code_samples[targetLanguage];

    var highlighted = hljs.highlight(targetLanguage, code_sample);
    $('.editor-body pre code').html(highlighted.value);
}

$('.select-language').click(function(){
    setActiveButton(this);
    setCodeSample(this);
});

$('#register').click(function(){
    $('.register-panel').each(function(){
        $(this).toggleClass('hidden');
    });
});

/***
* Register panel
**/

var handlePaymentForm = function (e) {
    e.preventDefault();
    handler.open({
        name: 'Invoked.io',
        description: 'Private beta access',
        amount: 100,
        currency: 'CAD'
    });
}

$('#pay-button').click(handlePaymentForm);
$('#pay-button-2').click(handlePaymentForm);

/***
* Payment
**/

var handler = StripeCheckout.configure({
    key: 'pk_live_rNaGl0f4EhfQzMebKLvT8aNx',
    token: function (token) {
        $.ajax({
            type: "POST",
            url: "/payment",
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(token),
            success: function (r) {
                if(console && console.log){
                    console.log('success', r);
                }
            }
        });
    }
});

// Close Checkout on page navigation
$(window).on('popstate', function () {
    handler.close();
});
