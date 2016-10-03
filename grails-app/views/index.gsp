<!doctype html>
<html ng-app="finance" lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <style type="text/css">
    [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
        display: none !important;
    }
    </style>

    <asset:stylesheet src="application.css"/>

    <asset:link rel="icon" href="favicon.ico" type="image/x-ico"/>

    <script type="text/javascript">
        window.contextPath = "${request.contextPath}";
    </script>

    <title><g:message code="application.title"/></title>
</head>

<body>

<div id="wrapper">

    <navigation></navigation>

    %{--<div id="page-wrapper" ng-controller="IndexController as vm">--}%
        %{--<div class="row">--}%
            %{--<div class="col-md-12">--}%
                %{--<h1>{{vm.test}}</h1>--}%
            %{--</div>--}%
        %{--</div>--}%
    %{--</div>--}%

    <div id="page-wrapper" ui-view>
    </div>
    <!-- /#page-wrapper -->

</div>
<!-- /#wrapper -->

<div id="spinner" class="spinner" style="display:none;">
    <g:message code="spinner.alt" default="Loading&hellip;"/>
</div>

<asset:javascript src="/application.js"/>
</body>
</html>
