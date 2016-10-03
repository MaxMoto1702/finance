//= wrapped
//= require /angular/angular-translate
//= require_tree translations

angular.module('finance.l10n', ['pascalprecht.translate'])
    .config(translateConfig);

function translateConfig($translateProvider) {
    var translations = {
        HEADLINE: 'What an awesome module!',
        PARAGRAPH: 'Srsly!',
        NAMESPACE: {
            PARAGRAPH: 'And it comes with awesome features!'
        }
    };
    // add translation table
    $translateProvider
        .translations('en_US', translations)
        .translations('ru_RU', ru_RU)
        .preferredLanguage('ru_RU');
}