/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 5.0, "series": [{"data": [[500.0, 5.0]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1200.0, 5.0]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[700.0, 3.0], [800.0, 2.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1000.0, 5.0]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1100.0, 1.0], [1000.0, 4.0]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 40.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 435.0, "series": [{"data": [[0.0, 435.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 40.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 4.267368421052629, "minX": 1.6659984E12, "maxY": 4.267368421052629, "series": [{"data": [[1.6659984E12, 4.267368421052629]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6659984E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 24.0, "minX": 1.0, "maxY": 1282.0, "series": [{"data": [[1.0, 528.0], [2.0, 512.0], [4.0, 509.0], [5.0, 514.0], [3.0, 514.0]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[3.0, 515.4]], "isOverall": false, "label": "/catalog/fetchImage-33-Aggregated", "isController": false}, {"data": [[2.0, 476.0], [5.0, 492.0], [3.0, 508.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[3.4, 488.8]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130-Aggregated", "isController": false}, {"data": [[5.0, 258.0], [3.0, 255.5]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[4.2, 257.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53-Aggregated", "isController": false}, {"data": [[4.0, 290.0], [5.0, 284.0], [3.0, 283.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[4.4, 285.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118-Aggregated", "isController": false}, {"data": [[4.0, 433.0], [5.0, 410.5], [3.0, 426.5]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[4.0, 421.4]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119-Aggregated", "isController": false}, {"data": [[5.0, 275.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[5.0, 275.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94-Aggregated", "isController": false}, {"data": [[4.0, 257.0], [5.0, 253.25]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[4.8, 254.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80-Aggregated", "isController": false}, {"data": [[4.0, 414.0], [5.0, 423.0], [3.0, 422.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[4.4, 421.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113-Aggregated", "isController": false}, {"data": [[4.0, 489.0], [5.0, 488.25]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[4.8, 488.4]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105-Aggregated", "isController": false}, {"data": [[4.0, 251.0], [5.0, 253.25]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[4.8, 252.8]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110-Aggregated", "isController": false}, {"data": [[1.0, 260.0], [2.0, 259.0], [4.0, 260.0], [5.0, 259.0], [3.0, 263.0]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[3.0, 260.2]], "isOverall": false, "label": "/catalog/fetchImage-36-Aggregated", "isController": false}, {"data": [[1.0, 257.0], [2.0, 261.0], [4.0, 258.0], [5.0, 264.0], [3.0, 257.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[3.0, 259.4]], "isOverall": false, "label": "/catalog/fetchImage-37-Aggregated", "isController": false}, {"data": [[2.0, 264.0], [4.0, 255.0], [5.0, 253.0], [3.0, 255.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[3.8, 256.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57-Aggregated", "isController": false}, {"data": [[1.0, 1281.0], [2.0, 1272.0], [4.0, 1278.0], [5.0, 1282.0], [3.0, 1275.0]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[3.0, 1277.6]], "isOverall": false, "label": "/catalog/fetchImage-34-Aggregated", "isController": false}, {"data": [[2.0, 265.0], [4.0, 255.0], [5.0, 255.0], [3.0, 254.0]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[3.8, 256.8]], "isOverall": false, "label": "Launch/css/images/logo.png-56-Aggregated", "isController": false}, {"data": [[1.0, 511.0], [2.0, 266.0], [4.0, 517.0], [5.0, 265.0], [3.0, 518.0]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[3.0, 415.4]], "isOverall": false, "label": "/catalog/fetchImage-35-Aggregated", "isController": false}, {"data": [[4.0, 345.0], [5.0, 342.6666666666667], [3.0, 350.0]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[4.4, 344.6]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62-Aggregated", "isController": false}, {"data": [[4.0, 256.0], [5.0, 257.5]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[4.8, 257.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74-Aggregated", "isController": false}, {"data": [[4.0, 256.0], [5.0, 255.33333333333334], [3.0, 253.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[4.4, 255.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114-Aggregated", "isController": false}, {"data": [[2.0, 254.0], [4.0, 255.0], [5.0, 253.0], [3.0, 256.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[3.8, 254.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50-Aggregated", "isController": false}, {"data": [[4.0, 290.0], [5.0, 275.3333333333333], [3.0, 269.0]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[4.4, 277.0]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59-Aggregated", "isController": false}, {"data": [[4.0, 283.0], [5.0, 285.0], [3.0, 301.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[4.4, 287.8]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117-Aggregated", "isController": false}, {"data": [[4.0, 253.0], [5.0, 253.33333333333334], [3.0, 255.0]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[4.4, 253.6]], "isOverall": false, "label": "Launch/app/views/home-page.html-65-Aggregated", "isController": false}, {"data": [[4.0, 257.0], [5.0, 254.25]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[4.8, 254.8]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76-Aggregated", "isController": false}, {"data": [[4.0, 255.0], [5.0, 254.5]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[4.8, 254.6]], "isOverall": false, "label": "Launch/css/images/facebook.png-78-Aggregated", "isController": false}, {"data": [[4.0, 255.0], [5.0, 253.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[4.8, 253.4]], "isOverall": false, "label": "Launch/css/images/twitter.png-79-Aggregated", "isController": false}, {"data": [[5.0, 254.75], [3.0, 257.0]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[4.6, 255.2]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109-Aggregated", "isController": false}, {"data": [[4.0, 253.0], [5.0, 253.33333333333334], [3.0, 258.0]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[4.4, 254.2]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115-Aggregated", "isController": false}, {"data": [[2.0, 258.0], [4.0, 276.0], [5.0, 258.0], [3.0, 257.0]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[3.8, 261.4]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55-Aggregated", "isController": false}, {"data": [[4.0, 267.0], [5.0, 259.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[4.8, 260.6]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73-Aggregated", "isController": false}, {"data": [[5.0, 257.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[5.0, 257.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100-Aggregated", "isController": false}, {"data": [[4.0, 577.0], [5.0, 534.0], [3.0, 539.0]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[4.4, 543.6]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112-Aggregated", "isController": false}, {"data": [[2.0, 262.0], [4.0, 259.0], [5.0, 258.0], [3.0, 258.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[3.8, 259.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43-Aggregated", "isController": false}, {"data": [[4.0, 263.0], [2.0, 253.0], [1.0, 265.0], [5.0, 276.0], [3.0, 251.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[3.0, 261.6]], "isOverall": false, "label": "Click Profile/treatment/get-139-Aggregated", "isController": false}, {"data": [[4.0, 264.0], [2.0, 255.0], [1.0, 264.0], [5.0, 280.0], [3.0, 252.0]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[3.0, 263.0]], "isOverall": false, "label": "Click Profile/treatment/get-138-Aggregated", "isController": false}, {"data": [[2.0, 253.0], [4.0, 253.0], [5.0, 252.5], [3.0, 254.0]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[3.8, 253.0]], "isOverall": false, "label": "Launch/services.properties-52-Aggregated", "isController": false}, {"data": [[5.0, 254.2]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[5.0, 254.2]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87-Aggregated", "isController": false}, {"data": [[5.0, 256.6]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[5.0, 256.6]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84-Aggregated", "isController": false}, {"data": [[4.0, 352.0], [2.0, 349.0], [1.0, 359.0], [5.0, 367.0], [3.0, 345.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[3.0, 354.4]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131-Aggregated", "isController": false}, {"data": [[5.0, 257.2]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[5.0, 257.2]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86-Aggregated", "isController": false}, {"data": [[4.0, 804.0], [5.0, 784.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[4.8, 788.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103-Aggregated", "isController": false}, {"data": [[4.0, 27.0], [2.0, 25.0], [1.0, 24.0], [5.0, 26.0], [3.0, 30.0]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[3.0, 26.4]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136-Aggregated", "isController": false}, {"data": [[5.0, 257.2]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[5.0, 257.2]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93-Aggregated", "isController": false}, {"data": [[4.0, 339.0], [5.0, 340.6666666666667], [3.0, 342.0]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[4.4, 340.6]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60-Aggregated", "isController": false}, {"data": [[5.0, 257.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[5.0, 257.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96-Aggregated", "isController": false}, {"data": [[5.0, 257.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[5.0, 257.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95-Aggregated", "isController": false}, {"data": [[4.0, 261.0], [5.0, 257.5]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[4.8, 258.2]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82-Aggregated", "isController": false}, {"data": [[5.0, 275.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[5.0, 275.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81-Aggregated", "isController": false}, {"data": [[4.0, 303.0], [2.0, 299.0], [1.0, 281.0], [5.0, 283.0], [3.0, 285.0]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[3.0, 290.2]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135-Aggregated", "isController": false}, {"data": [[5.0, 258.2]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[5.0, 258.2]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83-Aggregated", "isController": false}, {"data": [[4.0, 258.0], [5.0, 256.3333333333333], [3.0, 252.0]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[4.4, 255.8]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108-Aggregated", "isController": false}, {"data": [[2.0, 265.0], [4.0, 262.0], [5.0, 260.0], [3.0, 263.0]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[3.8, 262.0]], "isOverall": false, "label": "Launch/css/main.min.css-42-Aggregated", "isController": false}, {"data": [[4.0, 318.0], [2.0, 289.0], [5.0, 291.5], [3.0, 298.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[3.8, 297.6]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [2.0, 67.0], [5.0, 64.5], [3.0, 65.0]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[3.8, 66.2]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128-Aggregated", "isController": false}, {"data": [[4.0, 1010.0], [2.0, 1002.0], [1.0, 1018.0], [5.0, 1029.0], [3.0, 1003.0]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[3.0, 1012.4]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137-Aggregated", "isController": false}, {"data": [[4.0, 258.0], [2.0, 258.0], [5.0, 259.5], [3.0, 257.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[3.8, 258.4]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124-Aggregated", "isController": false}, {"data": [[4.0, 89.0], [5.0, 109.75]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[4.8, 105.6]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111-Aggregated", "isController": false}, {"data": [[5.0, 257.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[5.0, 257.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99-Aggregated", "isController": false}, {"data": [[4.0, 256.0], [5.0, 254.0], [3.0, 252.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[4.4, 254.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66-Aggregated", "isController": false}, {"data": [[4.0, 253.0], [2.0, 253.0], [5.0, 253.5], [3.0, 254.0]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[3.8, 253.4]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123-Aggregated", "isController": false}, {"data": [[4.0, 267.0], [2.0, 264.0], [5.0, 277.0], [3.0, 267.0]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[3.8, 270.4]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129-Aggregated", "isController": false}, {"data": [[2.0, 513.0], [4.0, 516.0], [5.0, 511.5], [3.0, 514.0]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[3.8, 513.2]], "isOverall": false, "label": "Launch/main.min.js-49-Aggregated", "isController": false}, {"data": [[4.0, 253.0], [2.0, 253.0], [5.0, 255.5], [3.0, 254.0]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[3.8, 254.2]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127-Aggregated", "isController": false}, {"data": [[4.0, 280.0], [2.0, 289.0], [5.0, 280.0], [3.0, 272.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[3.8, 280.2]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120-Aggregated", "isController": false}, {"data": [[4.0, 254.0], [5.0, 253.75]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[4.8, 253.8]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77-Aggregated", "isController": false}, {"data": [[5.0, 261.4]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[5.0, 261.4]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98-Aggregated", "isController": false}, {"data": [[5.0, 259.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[5.0, 259.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102-Aggregated", "isController": false}, {"data": [[4.0, 260.0], [5.0, 258.6666666666667], [3.0, 260.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[4.4, 259.2]], "isOverall": false, "label": "Launch/catalog/fetchImage-67-Aggregated", "isController": false}, {"data": [[5.0, 259.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[5.0, 259.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97-Aggregated", "isController": false}, {"data": [[5.0, 260.2]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[5.0, 260.2]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101-Aggregated", "isController": false}, {"data": [[4.0, 259.0], [5.0, 257.0], [3.0, 258.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[4.4, 257.6]], "isOverall": false, "label": "Launch/catalog/fetchImage-68-Aggregated", "isController": false}, {"data": [[4.0, 260.0], [5.0, 259.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[4.6, 259.4]], "isOverall": false, "label": "Launch/catalog/fetchImage-69-Aggregated", "isController": false}, {"data": [[5.0, 339.4]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[5.0, 339.4]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104-Aggregated", "isController": false}, {"data": [[4.0, 254.0], [2.0, 254.0], [5.0, 256.5], [3.0, 255.0]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[3.8, 255.2]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125-Aggregated", "isController": false}, {"data": [[4.0, 270.0], [2.0, 267.0], [1.0, 267.0], [5.0, 279.0], [3.0, 271.0]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[3.0, 270.8]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134-Aggregated", "isController": false}, {"data": [[4.0, 1062.0], [5.0, 1052.0]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[4.8, 1054.0]], "isOverall": false, "label": "Choose Item/treatment/get-106-Aggregated", "isController": false}, {"data": [[5.0, 482.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[5.0, 482.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91-Aggregated", "isController": false}, {"data": [[4.0, 252.0], [5.0, 256.0], [3.0, 255.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[4.4, 255.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116-Aggregated", "isController": false}, {"data": [[2.0, 253.0], [4.0, 254.0], [5.0, 255.0], [3.0, 260.0]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[3.8, 255.4]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44-Aggregated", "isController": false}, {"data": [[4.0, 258.0], [5.0, 257.25]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[4.8, 257.4]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75-Aggregated", "isController": false}, {"data": [[5.0, 429.6]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[5.0, 429.6]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92-Aggregated", "isController": false}, {"data": [[4.0, 254.0], [2.0, 256.0], [5.0, 254.0], [3.0, 258.0]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[3.8, 255.2]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122-Aggregated", "isController": false}, {"data": [[4.0, 253.0], [5.0, 252.33333333333334], [3.0, 255.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[4.4, 253.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64-Aggregated", "isController": false}, {"data": [[4.0, 268.0], [5.0, 268.75]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[4.8, 268.6]], "isOverall": false, "label": "Launch/catalog/fetchImage-70-Aggregated", "isController": false}, {"data": [[5.0, 259.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[5.0, 259.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85-Aggregated", "isController": false}, {"data": [[4.0, 261.0], [5.0, 257.6666666666667], [3.0, 258.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[4.4, 258.4]], "isOverall": false, "label": "Launch/catalog/fetchImage-71-Aggregated", "isController": false}, {"data": [[5.0, 335.6]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[5.0, 335.6]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89-Aggregated", "isController": false}, {"data": [[4.0, 253.0], [2.0, 256.0], [5.0, 259.0], [3.0, 254.0]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[3.8, 256.2]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126-Aggregated", "isController": false}, {"data": [[4.0, 256.0], [5.0, 255.0], [3.0, 255.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[4.4, 255.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54-Aggregated", "isController": false}, {"data": [[4.0, 341.0], [2.0, 364.0], [1.0, 341.0], [5.0, 346.0], [3.0, 340.0]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[3.0, 346.4]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141-Aggregated", "isController": false}, {"data": [[2.0, 256.0], [4.0, 259.0], [5.0, 259.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[3.6, 257.8]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39-Aggregated", "isController": false}, {"data": [[5.0, 261.8]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[5.0, 261.8]], "isOverall": false, "label": "Login/css/main.min.css-88-Aggregated", "isController": false}, {"data": [[4.0, 254.0], [5.0, 256.75]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[4.8, 256.2]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107-Aggregated", "isController": false}, {"data": [[5.0, 337.2]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[5.0, 337.2]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90-Aggregated", "isController": false}, {"data": [[2.0, 256.0], [4.0, 254.0], [5.0, 256.5], [3.0, 254.0]], "isOverall": false, "label": "Launch/-41", "isController": false}, {"data": [[3.8, 255.4]], "isOverall": false, "label": "Launch/-41-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 6226.083333333333, "minX": 1.6659984E12, "maxY": 282146.4166666667, "series": [{"data": [[1.6659984E12, 282146.4166666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6659984E12, 6226.083333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6659984E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 26.4, "minX": 1.6659984E12, "maxY": 1277.6, "series": [{"data": [[1.6659984E12, 515.4]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[1.6659984E12, 488.8]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[1.6659984E12, 285.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1.6659984E12, 421.4]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1.6659984E12, 275.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[1.6659984E12, 254.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[1.6659984E12, 421.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1.6659984E12, 488.4]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[1.6659984E12, 252.8]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1.6659984E12, 260.2]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[1.6659984E12, 259.4]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[1.6659984E12, 256.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1.6659984E12, 1277.6]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[1.6659984E12, 256.8]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1.6659984E12, 415.4]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[1.6659984E12, 344.6]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[1.6659984E12, 257.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[1.6659984E12, 255.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[1.6659984E12, 254.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1.6659984E12, 277.0]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[1.6659984E12, 287.8]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[1.6659984E12, 253.6]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[1.6659984E12, 254.8]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[1.6659984E12, 254.6]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[1.6659984E12, 253.4]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[1.6659984E12, 255.2]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[1.6659984E12, 254.2]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[1.6659984E12, 261.4]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1.6659984E12, 260.6]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[1.6659984E12, 257.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1.6659984E12, 543.6]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[1.6659984E12, 259.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[1.6659984E12, 261.6]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1.6659984E12, 263.0]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[1.6659984E12, 253.0]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[1.6659984E12, 254.2]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[1.6659984E12, 256.6]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[1.6659984E12, 354.4]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1.6659984E12, 257.2]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1.6659984E12, 788.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[1.6659984E12, 26.4]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[1.6659984E12, 257.2]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[1.6659984E12, 340.6]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[1.6659984E12, 257.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[1.6659984E12, 258.2]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[1.6659984E12, 275.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[1.6659984E12, 290.2]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[1.6659984E12, 258.2]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[1.6659984E12, 255.8]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1.6659984E12, 262.0]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[1.6659984E12, 297.6]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[1.6659984E12, 66.2]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1.6659984E12, 1012.4]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[1.6659984E12, 258.4]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[1.6659984E12, 105.6]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[1.6659984E12, 254.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[1.6659984E12, 253.4]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[1.6659984E12, 270.4]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1.6659984E12, 513.2]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[1.6659984E12, 254.2]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[1.6659984E12, 280.2]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[1.6659984E12, 253.8]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1.6659984E12, 261.4]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[1.6659984E12, 259.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[1.6659984E12, 259.2]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[1.6659984E12, 259.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[1.6659984E12, 260.2]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[1.6659984E12, 257.6]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1.6659984E12, 259.4]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[1.6659984E12, 339.4]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[1.6659984E12, 255.2]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[1.6659984E12, 270.8]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1.6659984E12, 1054.0]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1.6659984E12, 482.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[1.6659984E12, 255.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1.6659984E12, 255.4]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[1.6659984E12, 257.4]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[1.6659984E12, 429.6]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[1.6659984E12, 255.2]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[1.6659984E12, 253.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[1.6659984E12, 268.6]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[1.6659984E12, 259.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[1.6659984E12, 258.4]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[1.6659984E12, 335.6]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[1.6659984E12, 256.2]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[1.6659984E12, 255.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[1.6659984E12, 346.4]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[1.6659984E12, 257.8]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1.6659984E12, 261.8]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[1.6659984E12, 256.2]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[1.6659984E12, 337.2]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[1.6659984E12, 255.4]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6659984E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 9.2, "minX": 1.6659984E12, "maxY": 1054.0, "series": [{"data": [[1.6659984E12, 261.6]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[1.6659984E12, 488.8]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[1.6659984E12, 285.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1.6659984E12, 421.4]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[1.6659984E12, 254.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[1.6659984E12, 421.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1.6659984E12, 488.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[1.6659984E12, 252.8]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1.6659984E12, 258.6]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[1.6659984E12, 258.8]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[1.6659984E12, 256.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1.6659984E12, 1025.8]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[1.6659984E12, 256.8]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1.6659984E12, 260.6]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[1.6659984E12, 344.6]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[1.6659984E12, 257.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[1.6659984E12, 254.8]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[1.6659984E12, 254.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1.6659984E12, 276.8]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[1.6659984E12, 287.8]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[1.6659984E12, 253.4]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[1.6659984E12, 254.6]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[1.6659984E12, 254.6]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[1.6659984E12, 253.4]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[1.6659984E12, 255.2]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[1.6659984E12, 254.2]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[1.6659984E12, 261.0]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1.6659984E12, 260.4]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[1.6659984E12, 257.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1.6659984E12, 543.6]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[1.6659984E12, 258.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[1.6659984E12, 261.2]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1.6659984E12, 263.0]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[1.6659984E12, 253.0]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[1.6659984E12, 254.2]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[1.6659984E12, 255.8]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[1.6659984E12, 354.4]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1.6659984E12, 787.8]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[1.6659984E12, 9.2]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[1.6659984E12, 340.4]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[1.6659984E12, 257.2]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1.6659984E12, 256.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[1.6659984E12, 259.2]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[1.6659984E12, 288.8]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[1.6659984E12, 256.4]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[1.6659984E12, 255.8]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1.6659984E12, 260.8]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[1.6659984E12, 297.6]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[1.6659984E12, 66.2]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1.6659984E12, 1012.2]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[1.6659984E12, 258.4]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[1.6659984E12, 105.6]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[1.6659984E12, 254.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[1.6659984E12, 253.4]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[1.6659984E12, 270.2]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1.6659984E12, 258.4]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[1.6659984E12, 254.2]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[1.6659984E12, 280.2]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[1.6659984E12, 253.8]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1.6659984E12, 261.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[1.6659984E12, 258.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[1.6659984E12, 258.2]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[1.6659984E12, 257.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[1.6659984E12, 257.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[1.6659984E12, 257.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1.6659984E12, 258.6]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[1.6659984E12, 339.4]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[1.6659984E12, 255.2]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[1.6659984E12, 269.4]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1.6659984E12, 1054.0]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1.6659984E12, 481.8]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[1.6659984E12, 255.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1.6659984E12, 255.4]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[1.6659984E12, 255.2]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[1.6659984E12, 429.6]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[1.6659984E12, 255.2]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[1.6659984E12, 253.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[1.6659984E12, 262.2]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[1.6659984E12, 257.6]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[1.6659984E12, 257.8]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[1.6659984E12, 335.6]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[1.6659984E12, 256.2]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[1.6659984E12, 255.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[1.6659984E12, 346.4]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[1.6659984E12, 256.8]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1.6659984E12, 260.2]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[1.6659984E12, 256.0]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[1.6659984E12, 337.2]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[1.6659984E12, 255.4]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6659984E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6659984E12, "maxY": 792.2, "series": [{"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1.6659984E12, 515.2]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[1.6659984E12, 35.6]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1.6659984E12, 760.2]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[1.6659984E12, 35.6]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[1.6659984E12, 32.4]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1.6659984E12, 792.2]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[1.6659984E12, 0.0]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6659984E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 24.0, "minX": 1.6659984E12, "maxY": 1282.0, "series": [{"data": [[1.6659984E12, 1282.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6659984E12, 481.2000000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6659984E12, 1272.72]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6659984E12, 530.1999999999998]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6659984E12, 24.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6659984E12, 259.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6659984E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 255.0, "minX": 2.0, "maxY": 385.5, "series": [{"data": [[8.0, 258.5], [2.0, 303.0], [9.0, 289.0], [10.0, 255.0], [11.0, 258.5], [3.0, 385.5], [13.0, 275.0], [14.0, 259.0], [15.0, 259.0], [4.0, 263.5], [16.0, 258.0], [17.0, 257.0], [18.0, 258.0], [5.0, 259.5], [20.0, 260.5], [6.0, 259.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 255.0, "minX": 2.0, "maxY": 302.5, "series": [{"data": [[8.0, 257.5], [2.0, 302.5], [9.0, 289.0], [10.0, 255.0], [11.0, 258.0], [3.0, 259.5], [13.0, 275.0], [14.0, 257.0], [15.0, 258.0], [4.0, 262.0], [16.0, 257.0], [17.0, 256.0], [18.0, 256.5], [5.0, 258.0], [20.0, 260.0], [6.0, 259.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 7.916666666666667, "minX": 1.6659984E12, "maxY": 7.916666666666667, "series": [{"data": [[1.6659984E12, 7.916666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6659984E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.6659984E12, "maxY": 7.833333333333333, "series": [{"data": [[1.6659984E12, 7.833333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "201", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6659984E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.6659984E12, "maxY": 0.08333333333333333, "series": [{"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-71-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-69-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/main.min.js-49-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/facebook.png-78-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "/catalog/fetchImage-33-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "/catalog/fetchImage-36-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Profile/treatment/get-139-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-70-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/app/views/home-page.html-65-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-68-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/-41-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "/catalog/fetchImage-35-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/treatment/get-106-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "/catalog/fetchImage-34-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Profile/treatment/get-138-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "/catalog/fetchImage-37-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-67-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/main.min.css-42-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/twitter.png-79-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/logo.png-56-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Login/css/main.min.css-88-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/services.properties-52-success", "isController": false}, {"data": [[1.6659984E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6659984E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 7.916666666666667, "minX": 1.6659984E12, "maxY": 7.916666666666667, "series": [{"data": [[1.6659984E12, 7.916666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6659984E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
