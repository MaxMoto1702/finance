<!DOCTYPE html>
<html ng-app='app'>

<head>
    <meta charset="utf-8">
    <title translate="TITLE">Basic usage</title>
    <style>body { text-align: center; }</style>
</head>

<body ng-controller="ctrl">

<!-- An example of changing language in runtime -->
<p>
    <a href="#" ng-click="setLang('en_US')">English</a>
    |
    <a href="#" ng-click="setLang('ru_RU')">Русский</a>
</p>

<!-- Translation by a filter -->
<h1>{{'HEADER' | translate}}</h1>

<!-- Translation by a directive -->
<h2 translate="SUBHEADER">Subheader</h2>

<!-- Using inner HTML as a key for translation -->
<p translate>HTML_KEYS</p>

<hr>

<!-- Passing a data object to the translation by the filter -->
<p>{{'DATA_TO_FILTER' | translate: tlData}}</p>

<!-- Passing a data object to the translation by the directive -->
<p translate="DATA_TO_DIRECTIVE" translate-values="{{tlData}}"></p>

<hr>

<!-- Passing a raw data to the filter -->
<p>{{'RAW_TO_FILTER' | translate:'{ type: "raw" }' }}</p>

<!-- Passing a raw data to the filter -->
<p translate="RAW_TO_DIRECTIVE" translate-values="{ type: 'directives' }"></p>

<hr>

<!-- Using a $translate service -->
<p>{{jsTrSimple}}</p>

<!-- Passing a data to the $translate service -->
<p>{{jsTrParams}}</p>

<asset:javascript src="/angular/angular.js"/>
<asset:javascript src="/angular/angular-translate.js"/>

%{--<script src="../bower_components/angular/angular.js"></script>--}%
%{--<script src="../dist/angular-translate.js"></script>--}%

<script>
    angular.module('app', ['pascalprecht.translate'])
            .config(['$translateProvider', function($translateProvider){
                // Adding a translation table for the English language
                $translateProvider.translations('en_US', {
                    "TITLE"     : "How to use",
                    "HEADER"    : "You can translate texts by using a filter.",
                    "SUBHEADER" : "And if you don't like filters, you can use a directive.",
                    "HTML_KEYS" : "If you don't like an empty elements, you can write a key for the translation as an inner HTML of the directive.",
                    "DATA_TO_FILTER"    : "Your translations might also contain any static ({{staticValue}}) or random ({{randomValue}}) values, which are taken directly from the model.",
                    "DATA_TO_DIRECTIVE" : "And it's no matter if you use filter or directive: static is still {{staticValue}} and random is still {{randomValue}}.",
                    "RAW_TO_FILTER"     : "In case you want to pass a {{type}} data to the filter, you have only to pass it as a filter parameter.",
                    "RAW_TO_DIRECTIVE"  : "This trick also works for {{type}} with a small mods.",
                    "SERVICE"        : "Of course, you can translate your strings directly in the js code by using a $translate service.",
                    "SERVICE_PARAMS" : "And you are still able to pass params to the texts. Static = {{staticValue}}, random = {{randomValue}}."
                });
                // Adding a translation table for the Russian language
                $translateProvider.translations('ru_RU', {
                    "TITLE"     : "Как пользоваться",
                    "HEADER"    : "Вы можете переводить тексты при помощи фильтра.",
                    "SUBHEADER" : "А если Вам не нравятся фильтры, Вы можете воспользоваться директивой.",
                    "HTML_KEYS" : "Если вам не нравятся пустые элементы, Вы можете записать ключ для перевода в как внутренний HTML директивы.",
                    "DATA_TO_FILTER"    : "Ваши переводы также могут содержать любые статичные ({{staticValue}}) или случайные ({{randomValue}}) значения, которые берутся прямо из модели.",
                    "DATA_TO_DIRECTIVE" : "И совершенно не важно используете ли Вы фильтр или директиву: статическое значение по прежнему {{staticValue}} и случайное - {{randomValue}}.",
                    "RAW_TO_FILTER"     : "Если вы хотите передать \"сырые\" ({{type}}) данные фильтру, Вам всего лишь нужно передать их фильтру в качестве параметров.",
                    "RAW_TO_DIRECTIVE"  : "Это также работает и для директив ({{type}}) с небольшими модификациями.",
                    "SERVICE"        : "Конечно, Вы можете переводить ваши строки прямо в js коде при помощи сервиса $translate.",
                    "SERVICE_PARAMS" : "И вы все еще можете передавать параметры в тексты. Статическое значение = {{staticValue}}, случайное = {{randomValue}}."
                });
                // Tell the module what language to use by default
                $translateProvider.preferredLanguage('en_US');
            }])
            .controller('ctrl', ['$scope', '$translate', function($scope, $translate) {
                $scope.tlData = {
                    staticValue : 42,
                    randomValue : Math.floor(Math.random() * 1000)
                };
                $scope.jsTrSimple = $translate.instant('SERVICE');
                $scope.jsTrParams = $translate.instant('SERVICE_PARAMS', $scope.tlData);
                $scope.setLang = function(langKey) {
                    // You can change the language during runtime
                    $translate.use(langKey);
                    // A data generated by the script have to be regenerated
                    $scope.jsTrSimple = $translate.instant('SERVICE');
                    $scope.jsTrParams = $translate.instant('SERVICE_PARAMS', $scope.tlData);
                };
            }]);
</script>

</body>
</html>