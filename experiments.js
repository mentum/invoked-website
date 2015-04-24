$('#register').click(function(){
    analytics.track('Clicked on get started');
});

$('#pay-button').click(function(){
    analytics.track('Clicked on pay 1$ from header');
});

$('#pay-button-2').click(function(){
    analytics.track('Clicked on pay 1$ from middle section');
});

$('.select-langage').click(function(event){
    analytics.track('Clicked on langage ' + $(event.target).data('langage'));
});

analytics.trackLink($('#tweet'), 'Clicked on tweet from header');
analytics.trackLink($('#tweet-2'), 'Clicked on tweet from middle section');
