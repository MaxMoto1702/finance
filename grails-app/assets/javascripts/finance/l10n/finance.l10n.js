//= wrapped
//= require /angular/angular-translate
//= require_self
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
        .preferredLanguage('ru_RU');
}