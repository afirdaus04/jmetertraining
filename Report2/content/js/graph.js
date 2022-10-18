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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 24.0, "series": [{"data": [[600.0, 7.0], [300.0, 1.0], [700.0, 2.0], [500.0, 15.0]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[600.0, 2.0], [1500.0, 1.0], [400.0, 4.0], [900.0, 1.0], [500.0, 12.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[300.0, 10.0], [200.0, 14.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[300.0, 12.0], [200.0, 8.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1100.0, 1.0], [400.0, 11.0], [500.0, 8.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[600.0, 4.0], [1200.0, 1.0], [700.0, 1.0], [800.0, 2.0], [500.0, 11.0], [1000.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[300.0, 13.0], [200.0, 11.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[400.0, 12.0], [900.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [400.0, 5.0], [500.0, 13.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[300.0, 6.0], [200.0, 13.0], [800.0, 1.0]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[300.0, 12.0], [200.0, 13.0]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[300.0, 16.0], [600.0, 1.0], [200.0, 8.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[300.0, 11.0], [200.0, 13.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 1.0], [700.0, 3.0], [1500.0, 2.0], [1600.0, 1.0], [800.0, 10.0], [900.0, 6.0], [1000.0, 1.0]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[300.0, 18.0], [200.0, 6.0]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[600.0, 6.0], [300.0, 5.0], [700.0, 1.0], [200.0, 5.0], [400.0, 2.0], [500.0, 6.0]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[300.0, 24.0]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[300.0, 15.0], [200.0, 9.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[300.0, 10.0], [200.0, 10.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[300.0, 11.0], [200.0, 14.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[300.0, 14.0], [200.0, 10.0]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[300.0, 10.0], [200.0, 8.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[300.0, 7.0], [200.0, 17.0]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[300.0, 15.0], [200.0, 9.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[300.0, 12.0], [200.0, 11.0], [400.0, 1.0]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[300.0, 13.0], [200.0, 10.0], [400.0, 1.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[300.0, 6.0], [700.0, 1.0], [200.0, 13.0]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[300.0, 13.0], [200.0, 7.0]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[300.0, 13.0], [200.0, 11.0]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[300.0, 15.0], [200.0, 9.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[300.0, 10.0], [1300.0, 1.0], [200.0, 9.0], [800.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 2.0], [600.0, 8.0], [1000.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[600.0, 11.0], [700.0, 1.0], [500.0, 13.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[300.0, 8.0], [200.0, 12.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1100.0, 9.0], [1200.0, 4.0], [1400.0, 1.0], [1000.0, 5.0], [2000.0, 1.0]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[300.0, 12.0], [200.0, 12.0], [400.0, 1.0]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[300.0, 8.0], [200.0, 15.0], [400.0, 1.0]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[300.0, 13.0], [200.0, 10.0], [400.0, 1.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[300.0, 20.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[300.0, 12.0], [200.0, 11.0], [400.0, 1.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[700.0, 2.0], [800.0, 17.0], [900.0, 1.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[300.0, 8.0], [200.0, 12.0], [400.0, 2.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[300.0, 24.0]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[300.0, 6.0], [1400.0, 1.0], [200.0, 14.0], [400.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1200.0, 1.0], [700.0, 7.0], [800.0, 7.0], [900.0, 5.0], [1000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[300.0, 13.0], [200.0, 11.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[600.0, 8.0], [1200.0, 2.0], [300.0, 2.0], [700.0, 1.0], [800.0, 1.0], [200.0, 2.0], [900.0, 1.0], [3700.0, 1.0], [1900.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[300.0, 11.0], [200.0, 9.0]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[300.0, 12.0], [200.0, 10.0], [400.0, 2.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[300.0, 8.0], [200.0, 12.0]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[600.0, 9.0], [700.0, 2.0], [1500.0, 1.0], [900.0, 1.0], [500.0, 12.0]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[300.0, 10.0], [200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1100.0, 10.0], [1200.0, 6.0], [1000.0, 4.0]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[300.0, 8.0], [200.0, 12.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[0.0, 7.0], [100.0, 13.0]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[300.0, 9.0], [200.0, 12.0], [800.0, 1.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[300.0, 13.0], [200.0, 11.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[300.0, 5.0], [200.0, 14.0], [400.0, 1.0]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[300.0, 5.0], [600.0, 1.0], [200.0, 10.0], [800.0, 1.0], [400.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1300.0, 1.0], [700.0, 2.0], [800.0, 9.0], [900.0, 9.0], [1000.0, 4.0]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[300.0, 8.0], [200.0, 12.0]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[300.0, 12.0], [200.0, 8.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[300.0, 13.0], [200.0, 11.0]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[300.0, 10.0], [1500.0, 1.0], [200.0, 10.0], [500.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[300.0, 11.0], [200.0, 9.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[300.0, 17.0], [200.0, 7.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[300.0, 5.0], [1400.0, 1.0], [200.0, 13.0], [500.0, 2.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[300.0, 9.0], [600.0, 1.0], [200.0, 10.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[300.0, 12.0], [1300.0, 1.0], [200.0, 10.0], [400.0, 1.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[300.0, 13.0], [700.0, 1.0], [200.0, 10.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[300.0, 11.0], [800.0, 2.0], [900.0, 6.0], [1000.0, 1.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[300.0, 6.0], [200.0, 14.0]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[300.0, 5.0], [200.0, 15.0]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1100.0, 11.0], [1200.0, 5.0], [1300.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 3.0], [700.0, 1.0], [400.0, 5.0], [500.0, 11.0], [1000.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[300.0, 10.0], [200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[300.0, 13.0], [200.0, 12.0]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[300.0, 14.0], [200.0, 10.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[600.0, 1.0], [400.0, 14.0], [500.0, 7.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[300.0, 12.0], [200.0, 8.0]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[300.0, 4.0], [200.0, 20.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[600.0, 7.0], [300.0, 5.0], [700.0, 2.0], [2800.0, 1.0], [200.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[300.0, 10.0], [600.0, 1.0], [200.0, 12.0], [400.0, 1.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[300.0, 14.0], [2500.0, 1.0], [200.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[300.0, 20.0], [400.0, 4.0]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[300.0, 6.0], [200.0, 14.0]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[300.0, 12.0], [400.0, 1.0], [200.0, 11.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[300.0, 6.0], [800.0, 4.0], [900.0, 9.0], [1000.0, 1.0]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[300.0, 12.0], [200.0, 12.0], [400.0, 1.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 7.0], [800.0, 2.0], [1800.0, 1.0], [500.0, 13.0]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[300.0, 10.0], [200.0, 9.0], [800.0, 1.0]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[300.0, 18.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[300.0, 5.0], [700.0, 1.0], [200.0, 17.0], [800.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 8100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 15.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1658.0, "series": [{"data": [[0.0, 1658.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 446.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 15.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 4.33734939759036, "minX": 1.66606242E12, "maxY": 5.0, "series": [{"data": [[1.66606248E12, 5.0], [1.66606296E12, 5.0], [1.66606266E12, 5.0], [1.66606284E12, 5.0], [1.66606254E12, 5.0], [1.66606302E12, 4.766304347826089], [1.66606272E12, 5.0], [1.66606242E12, 4.33734939759036], [1.6660629E12, 5.0], [1.6660626E12, 5.0], [1.66606278E12, 5.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66606302E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 24.199999999999996, "minX": 1.0, "maxY": 8142.0, "series": [{"data": [[1.0, 615.0], [2.0, 311.0], [4.0, 761.0], [5.0, 583.952380952381], [3.0, 589.0]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[4.6, 581.56]], "isOverall": false, "label": "/catalog/fetchImage-33-Aggregated", "isController": false}, {"data": [[5.0, 597.8000000000001]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[5.0, 597.8000000000001]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130-Aggregated", "isController": false}, {"data": [[5.0, 284.16666666666674]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[5.0, 284.16666666666674]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53-Aggregated", "isController": false}, {"data": [[5.0, 304.45000000000005]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[5.0, 304.45000000000005]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118-Aggregated", "isController": false}, {"data": [[5.0, 509.3499999999999]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[5.0, 509.3499999999999]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119-Aggregated", "isController": false}, {"data": [[5.0, 663.0999999999999], [3.0, 8142.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[4.904761904761905, 1019.2380952380952]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94-Aggregated", "isController": false}, {"data": [[5.0, 299.74999999999994]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[5.0, 299.74999999999994]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80-Aggregated", "isController": false}, {"data": [[5.0, 495.49999999999994]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[5.0, 495.49999999999994]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113-Aggregated", "isController": false}, {"data": [[5.0, 530.95]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[5.0, 530.95]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105-Aggregated", "isController": false}, {"data": [[5.0, 315.5000000000001]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[5.0, 315.5000000000001]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110-Aggregated", "isController": false}, {"data": [[1.0, 307.0], [2.0, 303.0], [5.0, 286.0909090909091], [3.0, 279.0]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[4.639999999999999, 287.32]], "isOverall": false, "label": "/catalog/fetchImage-36-Aggregated", "isController": false}, {"data": [[1.0, 307.0], [2.0, 307.0], [5.0, 319.8636363636363], [3.0, 258.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[4.639999999999999, 316.35999999999996]], "isOverall": false, "label": "/catalog/fetchImage-37-Aggregated", "isController": false}, {"data": [[5.0, 284.625], [3.0, 512.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[4.92, 293.72]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57-Aggregated", "isController": false}, {"data": [[1.0, 1585.0], [2.0, 1362.0], [4.0, 1652.0], [5.0, 899.9047619047617], [3.0, 1417.0]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[4.6, 996.56]], "isOverall": false, "label": "/catalog/fetchImage-34-Aggregated", "isController": false}, {"data": [[5.0, 303.33333333333337]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[5.0, 303.33333333333337]], "isOverall": false, "label": "Launch/css/images/logo.png-56-Aggregated", "isController": false}, {"data": [[2.0, 439.0], [5.0, 463.95454545454544], [3.0, 408.0]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[4.679999999999999, 459.7199999999999]], "isOverall": false, "label": "/catalog/fetchImage-35-Aggregated", "isController": false}, {"data": [[5.0, 345.9583333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[5.0, 345.9583333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62-Aggregated", "isController": false}, {"data": [[5.0, 306.16666666666674]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[5.0, 306.16666666666674]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74-Aggregated", "isController": false}, {"data": [[5.0, 286.6000000000001]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[5.0, 286.6000000000001]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114-Aggregated", "isController": false}, {"data": [[5.0, 284.75], [3.0, 377.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[4.92, 288.44]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50-Aggregated", "isController": false}, {"data": [[5.0, 307.5416666666667]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[5.0, 307.5416666666667]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59-Aggregated", "isController": false}, {"data": [[5.0, 325.2]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[5.0, 325.2]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117-Aggregated", "isController": false}, {"data": [[5.0, 277.12499999999994]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[5.0, 277.12499999999994]], "isOverall": false, "label": "Launch/app/views/home-page.html-65-Aggregated", "isController": false}, {"data": [[5.0, 302.16666666666663]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[5.0, 302.16666666666663]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76-Aggregated", "isController": false}, {"data": [[5.0, 294.29166666666663]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[5.0, 294.29166666666663]], "isOverall": false, "label": "Launch/css/images/facebook.png-78-Aggregated", "isController": false}, {"data": [[5.0, 298.3333333333333]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[5.0, 298.3333333333333]], "isOverall": false, "label": "Launch/css/images/twitter.png-79-Aggregated", "isController": false}, {"data": [[5.0, 304.54999999999995]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[5.0, 304.54999999999995]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109-Aggregated", "isController": false}, {"data": [[5.0, 294.29999999999995]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[5.0, 294.29999999999995]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115-Aggregated", "isController": false}, {"data": [[5.0, 291.25000000000006]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[5.0, 291.25000000000006]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55-Aggregated", "isController": false}, {"data": [[5.0, 303.125]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[5.0, 303.125]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73-Aggregated", "isController": false}, {"data": [[1.0, 872.0], [5.0, 342.85]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[4.809523809523809, 368.0476190476191]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100-Aggregated", "isController": false}, {"data": [[5.0, 720.9499999999998]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[5.0, 720.9499999999998]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112-Aggregated", "isController": false}, {"data": [[4.0, 636.0], [5.0, 574.3043478260869], [3.0, 713.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[4.880000000000001, 582.32]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43-Aggregated", "isController": false}, {"data": [[5.0, 282.1500000000001]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[5.0, 282.1500000000001]], "isOverall": false, "label": "Click Profile/treatment/get-139-Aggregated", "isController": false}, {"data": [[5.0, 1196.2]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[5.0, 1196.2]], "isOverall": false, "label": "Click Profile/treatment/get-138-Aggregated", "isController": false}, {"data": [[5.0, 289.41666666666674], [3.0, 402.0]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[4.92, 293.9200000000001]], "isOverall": false, "label": "Launch/services.properties-52-Aggregated", "isController": false}, {"data": [[4.0, 450.0], [5.0, 294.30434782608694]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[4.958333333333333, 300.79166666666663]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87-Aggregated", "isController": false}, {"data": [[5.0, 297.625]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[5.0, 297.625]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84-Aggregated", "isController": false}, {"data": [[5.0, 346.65]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[5.0, 346.65]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131-Aggregated", "isController": false}, {"data": [[5.0, 296.95833333333337]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[5.0, 296.95833333333337]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86-Aggregated", "isController": false}, {"data": [[5.0, 844.25]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[5.0, 844.25]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103-Aggregated", "isController": false}, {"data": [[5.0, 24.199999999999996]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[5.0, 24.199999999999996]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136-Aggregated", "isController": false}, {"data": [[5.0, 295.57142857142856], [3.0, 354.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[4.909090909090909, 298.2272727272727]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93-Aggregated", "isController": false}, {"data": [[5.0, 340.875]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[5.0, 340.875]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60-Aggregated", "isController": false}, {"data": [[5.0, 335.5238095238095], [3.0, 409.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[4.909090909090909, 338.8636363636364]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96-Aggregated", "isController": false}, {"data": [[5.0, 904.1428571428571], [3.0, 1250.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[4.909090909090909, 919.8636363636364]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95-Aggregated", "isController": false}, {"data": [[5.0, 290.25000000000006]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[5.0, 290.25000000000006]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82-Aggregated", "isController": false}, {"data": [[5.0, 875.75]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[5.0, 875.75]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81-Aggregated", "isController": false}, {"data": [[5.0, 300.2]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[5.0, 300.2]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135-Aggregated", "isController": false}, {"data": [[5.0, 312.625]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[5.0, 312.625]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83-Aggregated", "isController": false}, {"data": [[5.0, 284.25]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[5.0, 284.25]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108-Aggregated", "isController": false}, {"data": [[5.0, 608.2083333333335], [3.0, 1511.0]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[4.92, 644.3200000000002]], "isOverall": false, "label": "Launch/css/main.min.css-42-Aggregated", "isController": false}, {"data": [[5.0, 312.9]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[5.0, 312.9]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121-Aggregated", "isController": false}, {"data": [[5.0, 71.85]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[5.0, 71.85]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128-Aggregated", "isController": false}, {"data": [[5.0, 1144.05]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[5.0, 1144.05]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137-Aggregated", "isController": false}, {"data": [[5.0, 291.3]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[5.0, 291.3]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124-Aggregated", "isController": false}, {"data": [[5.0, 105.35]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[5.0, 105.35]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111-Aggregated", "isController": false}, {"data": [[5.0, 307.14285714285717], [3.0, 362.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[4.909090909090909, 309.6363636363637]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99-Aggregated", "isController": false}, {"data": [[5.0, 290.29166666666663]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[5.0, 290.29166666666663]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66-Aggregated", "isController": false}, {"data": [[5.0, 286.24999999999994]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[5.0, 286.24999999999994]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123-Aggregated", "isController": false}, {"data": [[5.0, 388.54999999999995]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[5.0, 388.54999999999995]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129-Aggregated", "isController": false}, {"data": [[5.0, 909.2500000000001], [3.0, 1338.0]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[4.92, 926.4000000000001]], "isOverall": false, "label": "Launch/main.min.js-49-Aggregated", "isController": false}, {"data": [[5.0, 281.54999999999995]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[5.0, 281.54999999999995]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127-Aggregated", "isController": false}, {"data": [[5.0, 300.7]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[5.0, 300.7]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120-Aggregated", "isController": false}, {"data": [[5.0, 291.45833333333337]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[5.0, 291.45833333333337]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77-Aggregated", "isController": false}, {"data": [[4.0, 1500.0], [2.0, 519.0], [5.0, 289.15]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[4.818181818181818, 354.6363636363636]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98-Aggregated", "isController": false}, {"data": [[5.0, 297.45000000000005]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[5.0, 297.45000000000005]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102-Aggregated", "isController": false}, {"data": [[5.0, 304.2916666666668]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[5.0, 304.2916666666668]], "isOverall": false, "label": "Launch/catalog/fetchImage-67-Aggregated", "isController": false}, {"data": [[4.0, 1484.0], [5.0, 300.2999999999999]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[4.9523809523809526, 356.6666666666666]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97-Aggregated", "isController": false}, {"data": [[5.0, 300.79999999999995]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[5.0, 300.79999999999995]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101-Aggregated", "isController": false}, {"data": [[5.0, 346.25000000000006]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[5.0, 346.25000000000006]], "isOverall": false, "label": "Launch/catalog/fetchImage-68-Aggregated", "isController": false}, {"data": [[5.0, 314.875]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[5.0, 314.875]], "isOverall": false, "label": "Launch/catalog/fetchImage-69-Aggregated", "isController": false}, {"data": [[5.0, 617.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[5.0, 617.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104-Aggregated", "isController": false}, {"data": [[5.0, 280.0499999999999]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[5.0, 280.0499999999999]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125-Aggregated", "isController": false}, {"data": [[5.0, 291.0499999999999]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[5.0, 291.0499999999999]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134-Aggregated", "isController": false}, {"data": [[5.0, 1163.9]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[5.0, 1163.9]], "isOverall": false, "label": "Choose Item/treatment/get-106-Aggregated", "isController": false}, {"data": [[5.0, 593.5238095238095], [3.0, 591.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[4.909090909090909, 593.4090909090909]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91-Aggregated", "isController": false}, {"data": [[5.0, 299.6]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[5.0, 299.6]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116-Aggregated", "isController": false}, {"data": [[4.0, 308.0], [5.0, 289.65217391304355], [3.0, 363.0]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[4.880000000000001, 293.32000000000005]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44-Aggregated", "isController": false}, {"data": [[5.0, 295.04166666666663]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[5.0, 295.04166666666663]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75-Aggregated", "isController": false}, {"data": [[5.0, 474.85714285714283], [3.0, 530.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[4.909090909090909, 477.3636363636363]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92-Aggregated", "isController": false}, {"data": [[5.0, 296.75]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[5.0, 296.75]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122-Aggregated", "isController": false}, {"data": [[5.0, 270.125]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[5.0, 270.125]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64-Aggregated", "isController": false}, {"data": [[5.0, 557.7499999999999]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[5.0, 557.7499999999999]], "isOverall": false, "label": "Launch/catalog/fetchImage-70-Aggregated", "isController": false}, {"data": [[5.0, 305.3333333333333]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[5.0, 305.3333333333333]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85-Aggregated", "isController": false}, {"data": [[5.0, 404.33333333333337]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[5.0, 404.33333333333337]], "isOverall": false, "label": "Launch/catalog/fetchImage-71-Aggregated", "isController": false}, {"data": [[4.0, 448.0], [5.0, 355.6521739130435]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[4.958333333333333, 359.5]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89-Aggregated", "isController": false}, {"data": [[5.0, 279.4]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[5.0, 279.4]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126-Aggregated", "isController": false}, {"data": [[5.0, 297.95833333333326]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[5.0, 297.95833333333326]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54-Aggregated", "isController": false}, {"data": [[5.0, 756.4]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[5.0, 756.4]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141-Aggregated", "isController": false}, {"data": [[2.0, 252.0], [4.0, 400.0], [5.0, 285.3636363636364], [3.0, 302.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[4.760000000000001, 289.2800000000001]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39-Aggregated", "isController": false}, {"data": [[4.0, 819.0], [5.0, 658.5652173913044]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[4.958333333333333, 665.25]], "isOverall": false, "label": "Login/css/main.min.css-88-Aggregated", "isController": false}, {"data": [[5.0, 320.99999999999994]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[5.0, 320.99999999999994]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107-Aggregated", "isController": false}, {"data": [[4.0, 572.0], [5.0, 374.5652173913044]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[4.958333333333333, 382.7916666666667]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90-Aggregated", "isController": false}, {"data": [[4.0, 284.0], [5.0, 320.7826086956523], [3.0, 1840.0]], "isOverall": false, "label": "Launch/-41", "isController": false}, {"data": [[4.880000000000001, 380.08000000000004]], "isOverall": false, "label": "Launch/-41-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 873.0166666666667, "minX": 1.66606242E12, "maxY": 247069.35, "series": [{"data": [[1.66606248E12, 197461.81666666668], [1.66606296E12, 52058.78333333333], [1.66606266E12, 22168.733333333334], [1.66606284E12, 111403.93333333333], [1.66606254E12, 18858.3], [1.66606302E12, 145878.01666666666], [1.66606272E12, 186072.68333333332], [1.66606242E12, 74429.21666666666], [1.6660629E12, 169586.73333333334], [1.6660626E12, 247069.35], [1.66606278E12, 91118.18333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66606248E12, 2885.0833333333335], [1.66606296E12, 2808.6], [1.66606266E12, 2208.9], [1.66606284E12, 3278.9], [1.66606254E12, 2427.4333333333334], [1.66606302E12, 2050.85], [1.66606272E12, 3268.5833333333335], [1.66606242E12, 873.0166666666667], [1.6660629E12, 2549.35], [1.6660626E12, 3081.95], [1.66606278E12, 1826.15]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66606302E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 22.4, "minX": 1.66606242E12, "maxY": 8142.0, "series": [{"data": [[1.66606296E12, 565.5], [1.66606284E12, 565.5], [1.66606254E12, 716.0], [1.66606302E12, 576.0], [1.66606272E12, 573.4], [1.66606242E12, 568.6], [1.6660629E12, 565.0], [1.6660626E12, 612.0]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[1.66606296E12, 552.4], [1.66606266E12, 469.0], [1.66606284E12, 521.6], [1.66606254E12, 797.6], [1.66606272E12, 553.3333333333334]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[1.66606248E12, 281.0], [1.66606296E12, 255.0], [1.66606284E12, 290.0], [1.66606302E12, 323.3333333333333], [1.66606272E12, 264.8], [1.66606242E12, 257.0], [1.6660629E12, 292.0], [1.6660626E12, 296.8]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[1.66606296E12, 296.0], [1.66606266E12, 315.6], [1.66606284E12, 313.3333333333333], [1.66606254E12, 303.4], [1.66606278E12, 287.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1.66606296E12, 484.0], [1.66606266E12, 457.8], [1.66606284E12, 634.75], [1.66606254E12, 489.0], [1.66606278E12, 494.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1.66606248E12, 712.0], [1.66606266E12, 532.0], [1.66606302E12, 8142.0], [1.6660629E12, 582.6], [1.6660626E12, 736.0], [1.66606278E12, 662.6]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[1.66606248E12, 287.0], [1.66606284E12, 301.5], [1.66606302E12, 334.75], [1.66606272E12, 283.0], [1.6660629E12, 331.3333333333333], [1.6660626E12, 287.4], [1.66606278E12, 254.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[1.66606248E12, 515.0], [1.66606296E12, 590.4], [1.66606266E12, 453.0], [1.66606284E12, 524.0], [1.66606254E12, 469.25], [1.66606278E12, 444.25]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1.66606248E12, 576.75], [1.66606296E12, 559.0], [1.66606266E12, 521.2], [1.66606254E12, 477.0], [1.6660629E12, 515.0], [1.66606278E12, 522.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[1.66606248E12, 279.75], [1.66606296E12, 398.0], [1.66606266E12, 288.4], [1.66606254E12, 264.0], [1.6660629E12, 411.25], [1.66606278E12, 288.4]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1.66606296E12, 299.25], [1.66606284E12, 301.25], [1.66606254E12, 307.0], [1.66606302E12, 342.0], [1.66606272E12, 267.6], [1.66606242E12, 280.6], [1.6660629E12, 265.0], [1.6660626E12, 281.5]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[1.66606296E12, 316.0], [1.66606284E12, 303.5], [1.66606254E12, 308.0], [1.66606302E12, 304.0], [1.66606272E12, 307.0], [1.66606242E12, 357.4], [1.6660629E12, 357.0], [1.6660626E12, 285.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[1.66606248E12, 290.5], [1.66606296E12, 266.0], [1.66606284E12, 294.0], [1.66606302E12, 355.75], [1.66606272E12, 268.4], [1.66606242E12, 287.3333333333333], [1.6660629E12, 283.5], [1.6660626E12, 284.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1.66606296E12, 879.5], [1.66606284E12, 863.75], [1.66606254E12, 921.0], [1.66606302E12, 762.0], [1.66606272E12, 848.2], [1.66606242E12, 1504.6], [1.6660629E12, 804.0], [1.6660626E12, 922.5]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[1.66606248E12, 331.0], [1.66606296E12, 304.0], [1.66606284E12, 325.0], [1.66606302E12, 305.6666666666667], [1.66606272E12, 282.8], [1.66606242E12, 307.0], [1.6660629E12, 255.0], [1.6660626E12, 315.4]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1.66606296E12, 511.0], [1.66606284E12, 374.0], [1.66606254E12, 615.0], [1.66606302E12, 712.0], [1.66606272E12, 379.6], [1.66606242E12, 408.8], [1.6660629E12, 551.0], [1.6660626E12, 533.25]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[1.66606248E12, 351.5], [1.66606284E12, 344.5], [1.66606302E12, 346.75], [1.66606272E12, 342.6], [1.66606242E12, 346.0], [1.6660629E12, 345.3333333333333], [1.6660626E12, 345.2]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[1.66606248E12, 306.75], [1.66606284E12, 314.5], [1.66606302E12, 308.75], [1.66606272E12, 310.4], [1.66606242E12, 308.0], [1.6660629E12, 314.0], [1.6660626E12, 291.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[1.66606248E12, 308.0], [1.66606296E12, 279.2], [1.66606266E12, 287.2], [1.66606284E12, 308.0], [1.66606254E12, 273.5], [1.66606278E12, 297.5]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[1.66606248E12, 257.0], [1.66606296E12, 255.0], [1.66606284E12, 279.6666666666667], [1.66606302E12, 330.5], [1.66606272E12, 286.2], [1.66606242E12, 289.3333333333333], [1.6660629E12, 253.5], [1.6660626E12, 295.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1.66606248E12, 312.0], [1.66606296E12, 299.0], [1.66606284E12, 320.3333333333333], [1.66606302E12, 289.6666666666667], [1.66606272E12, 296.2], [1.66606242E12, 277.0], [1.6660629E12, 322.0], [1.6660626E12, 320.4]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[1.66606296E12, 336.8], [1.66606266E12, 342.6], [1.66606284E12, 299.0], [1.66606254E12, 319.8], [1.66606278E12, 305.5]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[1.66606248E12, 297.25], [1.66606284E12, 283.0], [1.66606302E12, 279.5], [1.66606272E12, 280.6], [1.66606242E12, 253.0], [1.6660629E12, 274.6666666666667], [1.6660626E12, 259.6]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[1.66606248E12, 296.75], [1.66606284E12, 319.5], [1.66606302E12, 319.5], [1.66606272E12, 283.6], [1.66606242E12, 305.0], [1.6660629E12, 286.6666666666667], [1.6660626E12, 313.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[1.66606248E12, 336.0], [1.66606284E12, 266.0], [1.66606302E12, 304.0], [1.66606272E12, 296.2], [1.66606242E12, 306.0], [1.6660629E12, 271.0], [1.6660626E12, 274.2]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[1.66606248E12, 304.0], [1.66606284E12, 288.0], [1.66606302E12, 311.0], [1.66606272E12, 296.75], [1.66606242E12, 251.0], [1.6660629E12, 304.6666666666667], [1.6660626E12, 302.6], [1.66606278E12, 259.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[1.66606248E12, 294.25], [1.66606296E12, 251.0], [1.66606266E12, 282.4], [1.66606254E12, 255.0], [1.6660629E12, 280.0], [1.66606278E12, 375.2]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[1.66606248E12, 306.0], [1.66606296E12, 301.2], [1.66606266E12, 283.8], [1.66606284E12, 257.0], [1.66606254E12, 290.75], [1.66606278E12, 308.75]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[1.66606248E12, 288.0], [1.66606296E12, 274.0], [1.66606284E12, 280.0], [1.66606302E12, 290.6666666666667], [1.66606272E12, 287.6], [1.66606242E12, 289.0], [1.6660629E12, 317.5], [1.6660626E12, 297.6]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1.66606248E12, 288.25], [1.66606284E12, 287.0], [1.66606302E12, 293.75], [1.66606272E12, 340.0], [1.66606242E12, 306.0], [1.6660629E12, 286.6666666666667], [1.6660626E12, 301.4]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[1.66606248E12, 269.6], [1.66606266E12, 1361.0], [1.66606302E12, 872.0], [1.6660629E12, 301.8], [1.6660626E12, 294.75], [1.66606278E12, 292.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1.66606248E12, 950.0], [1.66606296E12, 660.0], [1.66606266E12, 596.8], [1.66606254E12, 627.5], [1.6660629E12, 899.25], [1.66606278E12, 614.6]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[1.66606248E12, 542.5], [1.66606296E12, 515.0], [1.66606284E12, 629.0], [1.66606302E12, 575.75], [1.66606272E12, 590.8], [1.66606242E12, 596.3333333333334], [1.6660629E12, 533.0], [1.6660626E12, 591.8]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[1.66606296E12, 291.0], [1.66606284E12, 301.4], [1.66606254E12, 280.75], [1.66606302E12, 258.0], [1.66606272E12, 257.0], [1.6660626E12, 306.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1.66606296E12, 1363.0], [1.66606284E12, 1213.0], [1.66606254E12, 1188.8], [1.66606302E12, 1106.0], [1.66606272E12, 1071.4]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[1.66606248E12, 266.5], [1.66606296E12, 257.0], [1.66606284E12, 286.3333333333333], [1.66606302E12, 328.5], [1.66606272E12, 283.6], [1.66606242E12, 287.6666666666667], [1.6660629E12, 295.5], [1.6660626E12, 302.6]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[1.66606248E12, 285.0], [1.66606302E12, 361.75], [1.66606272E12, 287.0], [1.6660629E12, 294.8], [1.6660626E12, 296.8], [1.66606278E12, 271.6666666666667]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[1.66606248E12, 288.0], [1.66606284E12, 281.0], [1.66606302E12, 342.25], [1.66606272E12, 277.75], [1.6660629E12, 268.3333333333333], [1.6660626E12, 310.0], [1.66606278E12, 306.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[1.66606296E12, 350.8], [1.66606266E12, 344.0], [1.66606284E12, 350.8], [1.66606254E12, 341.8], [1.66606272E12, 342.6666666666667]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1.66606248E12, 289.0], [1.66606284E12, 309.5], [1.66606302E12, 314.0], [1.66606272E12, 291.75], [1.6660629E12, 255.66666666666666], [1.6660626E12, 304.6], [1.66606278E12, 350.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1.66606248E12, 852.75], [1.66606296E12, 834.0], [1.66606266E12, 869.0], [1.66606254E12, 896.0], [1.6660629E12, 824.25], [1.66606278E12, 820.4]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[1.66606296E12, 26.2], [1.66606266E12, 23.0], [1.66606284E12, 23.8], [1.66606254E12, 22.4], [1.66606272E12, 25.333333333333332]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[1.66606248E12, 283.2], [1.66606266E12, 268.0], [1.66606302E12, 381.5], [1.6660629E12, 262.8], [1.6660626E12, 290.25], [1.66606278E12, 327.8]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[1.66606248E12, 344.25], [1.66606296E12, 341.0], [1.66606284E12, 334.3333333333333], [1.66606302E12, 341.6666666666667], [1.66606272E12, 341.6], [1.66606242E12, 339.0], [1.6660629E12, 345.0], [1.6660626E12, 339.6]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[1.66606248E12, 281.4], [1.66606266E12, 259.0], [1.66606302E12, 918.0], [1.6660629E12, 295.6], [1.6660626E12, 267.5], [1.66606278E12, 281.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1.66606248E12, 839.4], [1.66606266E12, 920.0], [1.66606302E12, 1638.0], [1.6660629E12, 802.6], [1.6660626E12, 885.5], [1.66606278E12, 857.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[1.66606248E12, 292.6], [1.66606284E12, 309.5], [1.66606302E12, 310.5], [1.66606272E12, 272.25], [1.6660629E12, 271.0], [1.6660626E12, 296.8], [1.66606278E12, 256.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[1.66606248E12, 805.6], [1.66606284E12, 510.0], [1.66606302E12, 913.75], [1.66606272E12, 1229.75], [1.6660629E12, 777.6666666666666], [1.6660626E12, 898.2], [1.66606278E12, 572.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[1.66606296E12, 284.6], [1.66606266E12, 283.0], [1.66606284E12, 314.0], [1.66606254E12, 306.2], [1.66606272E12, 304.6666666666667]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[1.66606248E12, 316.6], [1.66606284E12, 266.0], [1.66606302E12, 324.25], [1.66606272E12, 278.0], [1.6660629E12, 364.0], [1.6660626E12, 316.8], [1.66606278E12, 303.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[1.66606248E12, 306.5], [1.66606296E12, 262.0], [1.66606266E12, 281.8], [1.66606254E12, 255.0], [1.6660629E12, 268.75], [1.66606278E12, 291.6]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1.66606248E12, 667.0], [1.66606296E12, 657.0], [1.66606284E12, 583.0], [1.66606302E12, 807.75], [1.66606272E12, 542.8], [1.66606242E12, 785.6666666666666], [1.6660629E12, 616.5], [1.6660626E12, 566.6]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[1.66606296E12, 310.8], [1.66606266E12, 320.8], [1.66606284E12, 301.4], [1.66606254E12, 318.6]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[1.66606296E12, 72.2], [1.66606266E12, 69.2], [1.66606284E12, 74.4], [1.66606254E12, 71.6]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1.66606296E12, 1112.0], [1.66606266E12, 1104.5], [1.66606284E12, 1122.0], [1.66606254E12, 1189.6], [1.66606272E12, 1184.6666666666667]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[1.66606296E12, 277.4], [1.66606266E12, 288.6], [1.66606284E12, 314.4], [1.66606254E12, 284.8]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[1.66606248E12, 99.0], [1.66606296E12, 102.0], [1.66606266E12, 102.2], [1.66606254E12, 93.0], [1.6660629E12, 113.75], [1.66606278E12, 110.0]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[1.66606248E12, 289.4], [1.66606266E12, 304.0], [1.66606302E12, 622.0], [1.6660629E12, 260.0], [1.6660626E12, 293.0], [1.66606278E12, 269.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[1.66606248E12, 305.0], [1.66606284E12, 280.5], [1.66606302E12, 281.0], [1.66606272E12, 287.4], [1.66606242E12, 252.0], [1.6660629E12, 272.6666666666667], [1.6660626E12, 311.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[1.66606296E12, 293.6], [1.66606266E12, 302.6], [1.66606284E12, 262.4], [1.66606254E12, 286.4]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[1.66606296E12, 372.4], [1.66606266E12, 270.5], [1.66606284E12, 365.6], [1.66606254E12, 303.2], [1.66606272E12, 674.6666666666666]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1.66606248E12, 836.5], [1.66606296E12, 857.0], [1.66606284E12, 858.0], [1.66606302E12, 1002.25], [1.66606272E12, 843.2], [1.66606242E12, 1013.3333333333334], [1.6660629E12, 1008.0], [1.6660626E12, 955.0]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[1.66606296E12, 294.6], [1.66606266E12, 270.0], [1.66606284E12, 265.2], [1.66606254E12, 296.4]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[1.66606296E12, 316.8], [1.66606266E12, 287.8], [1.66606284E12, 292.2], [1.66606254E12, 306.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[1.66606248E12, 281.5], [1.66606284E12, 306.0], [1.66606302E12, 311.5], [1.66606272E12, 294.6], [1.66606242E12, 308.0], [1.6660629E12, 274.0], [1.6660626E12, 281.6]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1.66606248E12, 310.4], [1.66606266E12, 255.0], [1.66606302E12, 1009.5], [1.6660629E12, 288.2], [1.6660626E12, 288.25], [1.66606278E12, 276.4]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[1.66606248E12, 330.6], [1.66606266E12, 316.0], [1.6660629E12, 297.8], [1.6660626E12, 261.0], [1.66606278E12, 289.4]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[1.66606248E12, 307.0], [1.66606284E12, 282.5], [1.66606302E12, 307.75], [1.66606272E12, 314.8], [1.66606242E12, 334.0], [1.6660629E12, 300.3333333333333], [1.6660626E12, 294.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[1.66606248E12, 332.0], [1.66606266E12, 305.0], [1.66606302E12, 1484.0], [1.6660629E12, 280.0], [1.6660626E12, 333.0], [1.66606278E12, 261.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[1.66606248E12, 270.8], [1.66606266E12, 611.0], [1.6660629E12, 309.8], [1.6660626E12, 282.75], [1.66606278E12, 274.2]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[1.66606248E12, 320.0], [1.66606284E12, 301.5], [1.66606302E12, 304.75], [1.66606272E12, 298.0], [1.66606242E12, 256.0], [1.6660629E12, 645.6666666666667], [1.6660626E12, 305.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1.66606248E12, 305.75], [1.66606284E12, 284.5], [1.66606302E12, 414.0], [1.66606272E12, 279.6], [1.66606242E12, 310.0], [1.6660629E12, 309.6666666666667], [1.6660626E12, 294.4]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[1.66606248E12, 581.8], [1.66606296E12, 354.0], [1.66606266E12, 852.0], [1.6660629E12, 481.0], [1.66606278E12, 578.6]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[1.66606296E12, 262.2], [1.66606266E12, 269.0], [1.66606284E12, 295.6], [1.66606254E12, 293.4]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[1.66606296E12, 289.0], [1.66606266E12, 269.0], [1.66606284E12, 315.4], [1.66606254E12, 294.8], [1.66606272E12, 262.3333333333333]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1.66606248E12, 1161.75], [1.66606296E12, 1033.0], [1.66606266E12, 1163.8], [1.66606254E12, 1179.0], [1.6660629E12, 1182.75], [1.66606278E12, 1173.8]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1.66606248E12, 554.4], [1.66606266E12, 506.0], [1.66606302E12, 598.0], [1.6660629E12, 545.8], [1.6660626E12, 495.75], [1.66606278E12, 773.8]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[1.66606248E12, 308.0], [1.66606296E12, 300.4], [1.66606266E12, 287.6], [1.66606284E12, 356.0], [1.66606254E12, 290.5], [1.66606278E12, 306.5]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1.66606248E12, 278.5], [1.66606296E12, 253.0], [1.66606284E12, 287.3333333333333], [1.66606302E12, 301.25], [1.66606272E12, 303.4], [1.66606242E12, 288.3333333333333], [1.6660629E12, 307.5], [1.6660626E12, 291.8]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[1.66606248E12, 281.0], [1.66606284E12, 311.5], [1.66606302E12, 307.5], [1.66606272E12, 318.5], [1.66606242E12, 265.0], [1.6660629E12, 299.0], [1.6660626E12, 272.0], [1.66606278E12, 308.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[1.66606248E12, 486.4], [1.66606266E12, 454.0], [1.66606302E12, 573.0], [1.6660629E12, 454.6], [1.6660626E12, 451.0], [1.66606278E12, 478.6]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[1.66606296E12, 288.6], [1.66606266E12, 295.4], [1.66606284E12, 318.2], [1.66606254E12, 284.8]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[1.66606248E12, 267.25], [1.66606284E12, 297.0], [1.66606302E12, 258.5], [1.66606272E12, 268.8], [1.66606242E12, 254.0], [1.6660629E12, 304.6666666666667], [1.6660626E12, 254.8]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[1.66606248E12, 622.75], [1.66606284E12, 298.0], [1.66606302E12, 482.75], [1.66606272E12, 285.4], [1.66606242E12, 717.0], [1.6660629E12, 518.6666666666666], [1.6660626E12, 933.6]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[1.66606248E12, 343.4], [1.66606284E12, 278.5], [1.66606302E12, 331.25], [1.66606272E12, 279.5], [1.6660629E12, 320.3333333333333], [1.6660626E12, 267.8], [1.66606278E12, 311.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[1.66606248E12, 839.5], [1.66606284E12, 307.0], [1.66606302E12, 300.25], [1.66606272E12, 321.4], [1.66606242E12, 352.0], [1.6660629E12, 357.0], [1.6660626E12, 300.2]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[1.66606248E12, 352.2], [1.66606302E12, 420.25], [1.66606272E12, 336.0], [1.6660629E12, 338.0], [1.6660626E12, 356.2], [1.66606278E12, 347.6666666666667]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[1.66606296E12, 263.2], [1.66606266E12, 287.2], [1.66606284E12, 276.2], [1.66606254E12, 291.0]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[1.66606248E12, 323.3333333333333], [1.66606296E12, 284.0], [1.66606284E12, 291.3333333333333], [1.66606302E12, 306.6666666666667], [1.66606272E12, 267.0], [1.66606242E12, 359.5], [1.6660629E12, 310.5], [1.6660626E12, 285.6]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[1.66606296E12, 640.0], [1.66606284E12, 914.0], [1.66606254E12, 970.5], [1.66606302E12, 346.0], [1.66606272E12, 672.6], [1.6660629E12, 375.0], [1.6660626E12, 962.3333333333334]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[1.66606296E12, 287.0], [1.66606284E12, 279.25], [1.66606254E12, 306.0], [1.66606302E12, 352.0], [1.66606272E12, 269.0], [1.66606242E12, 296.0], [1.6660629E12, 254.0], [1.6660626E12, 307.5]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1.66606248E12, 576.4], [1.66606302E12, 1021.5], [1.66606272E12, 870.5], [1.6660629E12, 578.2], [1.6660626E12, 531.2], [1.66606278E12, 570.0]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[1.66606248E12, 408.5], [1.66606296E12, 388.0], [1.66606266E12, 281.2], [1.66606254E12, 341.0], [1.6660629E12, 308.25], [1.66606278E12, 283.6]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[1.66606248E12, 391.8], [1.66606302E12, 470.5], [1.66606272E12, 344.0], [1.6660629E12, 373.0], [1.6660626E12, 340.6], [1.66606278E12, 363.3333333333333]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[1.66606248E12, 291.0], [1.66606296E12, 770.0], [1.66606284E12, 290.6666666666667], [1.66606302E12, 819.0], [1.66606272E12, 255.4], [1.66606242E12, 284.3333333333333], [1.6660629E12, 255.5], [1.6660626E12, 272.2]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66606302E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 7.0, "minX": 1.66606242E12, "maxY": 1363.0, "series": [{"data": [[1.66606296E12, 274.75], [1.66606284E12, 304.25], [1.66606254E12, 307.0], [1.66606302E12, 271.0], [1.66606272E12, 304.4], [1.66606242E12, 311.8], [1.6660629E12, 257.0], [1.6660626E12, 304.25]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[1.66606296E12, 552.4], [1.66606266E12, 469.0], [1.66606284E12, 521.4], [1.66606254E12, 797.2], [1.66606272E12, 553.3333333333334]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[1.66606248E12, 281.0], [1.66606296E12, 255.0], [1.66606284E12, 290.0], [1.66606302E12, 322.6666666666667], [1.66606272E12, 264.8], [1.66606242E12, 257.0], [1.6660629E12, 292.0], [1.6660626E12, 296.8]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[1.66606296E12, 296.0], [1.66606266E12, 315.4], [1.66606284E12, 313.3333333333333], [1.66606254E12, 303.2], [1.66606278E12, 287.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1.66606296E12, 484.0], [1.66606266E12, 457.8], [1.66606284E12, 634.75], [1.66606254E12, 489.0], [1.66606278E12, 494.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1.66606248E12, 279.0], [1.66606266E12, 255.0], [1.66606302E12, 461.0], [1.6660629E12, 312.8], [1.6660626E12, 289.75], [1.66606278E12, 272.6]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[1.66606248E12, 287.0], [1.66606284E12, 301.5], [1.66606302E12, 334.75], [1.66606272E12, 283.0], [1.6660629E12, 331.0], [1.6660626E12, 287.4], [1.66606278E12, 254.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[1.66606248E12, 515.0], [1.66606296E12, 590.4], [1.66606266E12, 452.8], [1.66606284E12, 524.0], [1.66606254E12, 469.25], [1.66606278E12, 444.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1.66606248E12, 576.75], [1.66606296E12, 559.0], [1.66606266E12, 520.8], [1.66606254E12, 477.0], [1.6660629E12, 515.0], [1.66606278E12, 522.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[1.66606248E12, 279.75], [1.66606296E12, 398.0], [1.66606266E12, 288.4], [1.66606254E12, 264.0], [1.6660629E12, 411.25], [1.66606278E12, 288.4]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1.66606296E12, 298.5], [1.66606284E12, 299.5], [1.66606254E12, 307.0], [1.66606302E12, 339.0], [1.66606272E12, 265.2], [1.66606242E12, 280.4], [1.6660629E12, 262.0], [1.6660626E12, 280.75]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[1.66606296E12, 315.75], [1.66606284E12, 303.0], [1.66606254E12, 308.0], [1.66606302E12, 303.0], [1.66606272E12, 305.0], [1.66606242E12, 356.6], [1.6660629E12, 357.0], [1.6660626E12, 283.75]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[1.66606248E12, 290.5], [1.66606296E12, 266.0], [1.66606284E12, 293.6666666666667], [1.66606302E12, 355.75], [1.66606272E12, 268.4], [1.66606242E12, 287.3333333333333], [1.6660629E12, 283.5], [1.6660626E12, 284.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1.66606296E12, 615.25], [1.66606284E12, 575.0], [1.66606254E12, 614.0], [1.66606302E12, 506.0], [1.66606272E12, 577.0], [1.66606242E12, 1227.2], [1.6660629E12, 555.0], [1.6660626E12, 611.75]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[1.66606248E12, 331.0], [1.66606296E12, 304.0], [1.66606284E12, 325.0], [1.66606302E12, 305.6666666666667], [1.66606272E12, 282.6], [1.66606242E12, 307.0], [1.6660629E12, 255.0], [1.6660626E12, 315.4]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1.66606296E12, 272.25], [1.66606284E12, 295.25], [1.66606254E12, 308.0], [1.66606302E12, 356.0], [1.66606272E12, 265.2], [1.66606242E12, 350.6], [1.6660629E12, 298.0], [1.6660626E12, 304.75]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[1.66606248E12, 351.5], [1.66606284E12, 344.5], [1.66606302E12, 346.75], [1.66606272E12, 342.6], [1.66606242E12, 346.0], [1.6660629E12, 345.0], [1.6660626E12, 345.2]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[1.66606248E12, 306.75], [1.66606284E12, 314.5], [1.66606302E12, 308.75], [1.66606272E12, 310.2], [1.66606242E12, 308.0], [1.6660629E12, 314.0], [1.6660626E12, 291.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[1.66606248E12, 308.0], [1.66606296E12, 279.2], [1.66606266E12, 287.2], [1.66606284E12, 307.0], [1.66606254E12, 273.5], [1.66606278E12, 297.5]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[1.66606248E12, 257.0], [1.66606296E12, 255.0], [1.66606284E12, 279.6666666666667], [1.66606302E12, 330.5], [1.66606272E12, 285.6], [1.66606242E12, 289.3333333333333], [1.6660629E12, 253.5], [1.6660626E12, 295.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1.66606248E12, 312.0], [1.66606296E12, 299.0], [1.66606284E12, 320.3333333333333], [1.66606302E12, 289.6666666666667], [1.66606272E12, 296.2], [1.66606242E12, 277.0], [1.6660629E12, 322.0], [1.6660626E12, 320.4]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[1.66606296E12, 336.8], [1.66606266E12, 342.6], [1.66606284E12, 299.0], [1.66606254E12, 319.8], [1.66606278E12, 305.5]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[1.66606248E12, 296.5], [1.66606284E12, 282.5], [1.66606302E12, 279.25], [1.66606272E12, 280.4], [1.66606242E12, 253.0], [1.6660629E12, 274.6666666666667], [1.6660626E12, 259.6]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[1.66606248E12, 296.75], [1.66606284E12, 319.5], [1.66606302E12, 319.5], [1.66606272E12, 283.6], [1.66606242E12, 305.0], [1.6660629E12, 286.6666666666667], [1.6660626E12, 313.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[1.66606248E12, 336.0], [1.66606284E12, 266.0], [1.66606302E12, 304.0], [1.66606272E12, 296.2], [1.66606242E12, 306.0], [1.6660629E12, 271.0], [1.6660626E12, 274.2]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[1.66606248E12, 304.0], [1.66606284E12, 288.0], [1.66606302E12, 311.0], [1.66606272E12, 296.75], [1.66606242E12, 251.0], [1.6660629E12, 304.6666666666667], [1.6660626E12, 302.6], [1.66606278E12, 259.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[1.66606248E12, 294.25], [1.66606296E12, 251.0], [1.66606266E12, 282.4], [1.66606254E12, 255.0], [1.6660629E12, 280.0], [1.66606278E12, 375.2]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[1.66606248E12, 306.0], [1.66606296E12, 301.2], [1.66606266E12, 283.8], [1.66606284E12, 257.0], [1.66606254E12, 290.75], [1.66606278E12, 308.75]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[1.66606248E12, 288.0], [1.66606296E12, 274.0], [1.66606284E12, 279.6666666666667], [1.66606302E12, 290.0], [1.66606272E12, 287.2], [1.66606242E12, 288.6666666666667], [1.6660629E12, 317.5], [1.6660626E12, 297.2]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1.66606248E12, 288.25], [1.66606284E12, 287.0], [1.66606302E12, 293.5], [1.66606272E12, 340.0], [1.66606242E12, 306.0], [1.6660629E12, 286.6666666666667], [1.6660626E12, 301.2]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[1.66606248E12, 269.0], [1.66606266E12, 1110.0], [1.66606302E12, 519.0], [1.6660629E12, 301.6], [1.6660626E12, 293.75], [1.66606278E12, 291.8]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1.66606248E12, 950.0], [1.66606296E12, 660.0], [1.66606266E12, 596.8], [1.66606254E12, 627.5], [1.6660629E12, 899.25], [1.66606278E12, 614.6]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[1.66606248E12, 542.5], [1.66606296E12, 514.0], [1.66606284E12, 628.6666666666666], [1.66606302E12, 575.25], [1.66606272E12, 590.2], [1.66606242E12, 596.3333333333334], [1.6660629E12, 532.5], [1.6660626E12, 591.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[1.66606296E12, 291.0], [1.66606284E12, 301.2], [1.66606254E12, 280.75], [1.66606302E12, 258.0], [1.66606272E12, 257.0], [1.6660626E12, 306.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1.66606296E12, 1363.0], [1.66606284E12, 1212.2], [1.66606254E12, 1188.6], [1.66606302E12, 1106.0], [1.66606272E12, 1071.4]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[1.66606248E12, 266.5], [1.66606296E12, 257.0], [1.66606284E12, 286.3333333333333], [1.66606302E12, 328.5], [1.66606272E12, 283.6], [1.66606242E12, 287.6666666666667], [1.6660629E12, 295.5], [1.6660626E12, 302.6]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[1.66606248E12, 285.0], [1.66606302E12, 361.75], [1.66606272E12, 287.0], [1.6660629E12, 294.8], [1.6660626E12, 296.8], [1.66606278E12, 271.6666666666667]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[1.66606248E12, 288.0], [1.66606284E12, 281.0], [1.66606302E12, 342.25], [1.66606272E12, 277.5], [1.6660629E12, 267.6666666666667], [1.6660626E12, 310.0], [1.66606278E12, 306.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[1.66606296E12, 350.8], [1.66606266E12, 344.0], [1.66606284E12, 350.8], [1.66606254E12, 341.6], [1.66606272E12, 342.3333333333333]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1.66606248E12, 288.4], [1.66606284E12, 309.5], [1.66606302E12, 313.75], [1.66606272E12, 291.75], [1.6660629E12, 255.66666666666666], [1.6660626E12, 304.6], [1.66606278E12, 350.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1.66606248E12, 852.25], [1.66606296E12, 833.0], [1.66606266E12, 868.8], [1.66606254E12, 896.0], [1.6660629E12, 824.0], [1.66606278E12, 820.2]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[1.66606296E12, 9.4], [1.66606266E12, 7.0], [1.66606284E12, 9.2], [1.66606254E12, 9.8], [1.66606272E12, 9.666666666666666]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[1.66606248E12, 283.2], [1.66606266E12, 268.0], [1.66606302E12, 381.5], [1.6660629E12, 262.8], [1.6660626E12, 290.25], [1.66606278E12, 327.8]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[1.66606248E12, 344.0], [1.66606296E12, 340.0], [1.66606284E12, 333.6666666666667], [1.66606302E12, 341.3333333333333], [1.66606272E12, 341.2], [1.66606242E12, 339.0], [1.6660629E12, 344.5], [1.6660626E12, 339.4]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[1.66606248E12, 280.0], [1.66606266E12, 256.0], [1.66606302E12, 564.5], [1.6660629E12, 295.0], [1.6660626E12, 267.25], [1.66606278E12, 280.2]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1.66606248E12, 550.8], [1.66606266E12, 612.0], [1.66606302E12, 1080.0], [1.6660629E12, 524.6], [1.6660626E12, 602.5], [1.66606278E12, 573.4]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[1.66606248E12, 292.4], [1.66606284E12, 309.5], [1.66606302E12, 309.75], [1.66606272E12, 270.75], [1.6660629E12, 269.6666666666667], [1.6660626E12, 296.0], [1.66606278E12, 256.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[1.66606248E12, 298.2], [1.66606284E12, 349.5], [1.66606302E12, 437.5], [1.66606272E12, 269.5], [1.6660629E12, 378.3333333333333], [1.6660626E12, 290.8], [1.66606278E12, 312.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[1.66606296E12, 284.0], [1.66606266E12, 281.0], [1.66606284E12, 313.0], [1.66606254E12, 306.2], [1.66606272E12, 304.6666666666667]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[1.66606248E12, 314.4], [1.66606284E12, 264.0], [1.66606302E12, 321.75], [1.66606272E12, 277.75], [1.6660629E12, 362.6666666666667], [1.6660626E12, 316.4], [1.66606278E12, 303.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[1.66606248E12, 306.5], [1.66606296E12, 262.0], [1.66606266E12, 281.8], [1.66606254E12, 255.0], [1.6660629E12, 268.75], [1.66606278E12, 291.6]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1.66606248E12, 342.0], [1.66606296E12, 348.0], [1.66606284E12, 293.3333333333333], [1.66606302E12, 296.25], [1.66606272E12, 270.0], [1.66606242E12, 368.6666666666667], [1.6660629E12, 269.5], [1.6660626E12, 267.6]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[1.66606296E12, 310.8], [1.66606266E12, 320.8], [1.66606284E12, 301.4], [1.66606254E12, 318.6]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[1.66606296E12, 72.2], [1.66606266E12, 69.2], [1.66606284E12, 74.4], [1.66606254E12, 71.6]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1.66606296E12, 1112.0], [1.66606266E12, 1104.5], [1.66606284E12, 1122.0], [1.66606254E12, 1189.6], [1.66606272E12, 1184.6666666666667]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[1.66606296E12, 277.4], [1.66606266E12, 288.4], [1.66606284E12, 314.4], [1.66606254E12, 284.6]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[1.66606248E12, 99.0], [1.66606296E12, 102.0], [1.66606266E12, 102.2], [1.66606254E12, 93.0], [1.6660629E12, 113.75], [1.66606278E12, 110.0]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[1.66606248E12, 289.4], [1.66606266E12, 304.0], [1.66606302E12, 622.0], [1.6660629E12, 260.0], [1.6660626E12, 293.0], [1.66606278E12, 269.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[1.66606248E12, 305.0], [1.66606284E12, 280.5], [1.66606302E12, 281.0], [1.66606272E12, 287.4], [1.66606242E12, 252.0], [1.6660629E12, 272.6666666666667], [1.6660626E12, 311.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[1.66606296E12, 293.6], [1.66606266E12, 302.6], [1.66606284E12, 262.4], [1.66606254E12, 286.4]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[1.66606296E12, 372.4], [1.66606266E12, 270.5], [1.66606284E12, 365.6], [1.66606254E12, 303.2], [1.66606272E12, 674.6666666666666]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1.66606248E12, 261.5], [1.66606296E12, 259.0], [1.66606284E12, 270.6666666666667], [1.66606302E12, 334.25], [1.66606272E12, 273.2], [1.66606242E12, 306.3333333333333], [1.6660629E12, 322.0], [1.6660626E12, 319.4]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[1.66606296E12, 294.6], [1.66606266E12, 270.0], [1.66606284E12, 265.2], [1.66606254E12, 296.4]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[1.66606296E12, 316.6], [1.66606266E12, 287.6], [1.66606284E12, 292.2], [1.66606254E12, 306.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[1.66606248E12, 281.5], [1.66606284E12, 306.0], [1.66606302E12, 311.5], [1.66606272E12, 294.6], [1.66606242E12, 308.0], [1.6660629E12, 274.0], [1.6660626E12, 281.6]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1.66606248E12, 310.4], [1.66606266E12, 255.0], [1.66606302E12, 648.5], [1.6660629E12, 287.4], [1.6660626E12, 287.75], [1.66606278E12, 276.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[1.66606248E12, 330.6], [1.66606266E12, 316.0], [1.6660629E12, 297.8], [1.6660626E12, 261.0], [1.66606278E12, 283.2]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[1.66606248E12, 306.75], [1.66606284E12, 282.5], [1.66606302E12, 307.0], [1.66606272E12, 314.4], [1.66606242E12, 334.0], [1.6660629E12, 298.0], [1.6660626E12, 292.4]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[1.66606248E12, 281.2], [1.66606266E12, 305.0], [1.66606302E12, 383.0], [1.6660629E12, 278.8], [1.6660626E12, 266.75], [1.66606278E12, 261.6]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[1.66606248E12, 269.6], [1.66606266E12, 359.0], [1.6660629E12, 309.0], [1.6660626E12, 282.5], [1.66606278E12, 273.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[1.66606248E12, 319.75], [1.66606284E12, 301.0], [1.66606302E12, 304.75], [1.66606272E12, 297.2], [1.66606242E12, 256.0], [1.6660629E12, 532.3333333333334], [1.6660626E12, 304.8]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1.66606248E12, 304.5], [1.66606284E12, 283.0], [1.66606302E12, 412.5], [1.66606272E12, 278.6], [1.66606242E12, 310.0], [1.6660629E12, 309.6666666666667], [1.6660626E12, 292.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[1.66606248E12, 581.8], [1.66606296E12, 353.0], [1.66606266E12, 852.0], [1.6660629E12, 481.0], [1.66606278E12, 578.6]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[1.66606296E12, 262.2], [1.66606266E12, 269.0], [1.66606284E12, 295.6], [1.66606254E12, 293.4]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[1.66606296E12, 288.6], [1.66606266E12, 267.0], [1.66606284E12, 314.8], [1.66606254E12, 294.8], [1.66606272E12, 261.3333333333333]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1.66606248E12, 1161.75], [1.66606296E12, 1033.0], [1.66606266E12, 1163.8], [1.66606254E12, 1179.0], [1.6660629E12, 1182.5], [1.66606278E12, 1173.8]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1.66606248E12, 554.4], [1.66606266E12, 506.0], [1.66606302E12, 598.0], [1.6660629E12, 545.8], [1.6660626E12, 495.25], [1.66606278E12, 773.6]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[1.66606248E12, 308.0], [1.66606296E12, 300.2], [1.66606266E12, 287.6], [1.66606284E12, 356.0], [1.66606254E12, 290.5], [1.66606278E12, 306.5]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1.66606248E12, 278.5], [1.66606296E12, 253.0], [1.66606284E12, 287.3333333333333], [1.66606302E12, 301.25], [1.66606272E12, 303.4], [1.66606242E12, 288.3333333333333], [1.6660629E12, 307.5], [1.6660626E12, 291.8]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[1.66606248E12, 280.5], [1.66606284E12, 308.5], [1.66606302E12, 306.5], [1.66606272E12, 318.0], [1.66606242E12, 265.0], [1.6660629E12, 297.3333333333333], [1.6660626E12, 270.6], [1.66606278E12, 308.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[1.66606248E12, 486.2], [1.66606266E12, 454.0], [1.66606302E12, 573.0], [1.6660629E12, 454.6], [1.6660626E12, 451.0], [1.66606278E12, 478.6]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[1.66606296E12, 288.6], [1.66606266E12, 295.4], [1.66606284E12, 318.2], [1.66606254E12, 284.6]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[1.66606248E12, 267.0], [1.66606284E12, 297.0], [1.66606302E12, 258.5], [1.66606272E12, 268.6], [1.66606242E12, 253.0], [1.6660629E12, 304.6666666666667], [1.6660626E12, 254.8]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[1.66606248E12, 319.0], [1.66606284E12, 289.5], [1.66606302E12, 312.25], [1.66606272E12, 283.6], [1.66606242E12, 316.0], [1.6660629E12, 324.6666666666667], [1.6660626E12, 318.6]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[1.66606248E12, 277.4], [1.66606284E12, 278.0], [1.66606302E12, 331.25], [1.66606272E12, 279.5], [1.6660629E12, 320.3333333333333], [1.6660626E12, 267.8], [1.66606278E12, 311.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[1.66606248E12, 278.75], [1.66606284E12, 307.0], [1.66606302E12, 298.75], [1.66606272E12, 321.2], [1.66606242E12, 352.0], [1.6660629E12, 268.3333333333333], [1.6660626E12, 298.6]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[1.66606248E12, 352.2], [1.66606302E12, 420.25], [1.66606272E12, 336.0], [1.6660629E12, 338.0], [1.6660626E12, 356.2], [1.66606278E12, 347.6666666666667]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[1.66606296E12, 263.2], [1.66606266E12, 287.2], [1.66606284E12, 276.2], [1.66606254E12, 291.0]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[1.66606248E12, 323.3333333333333], [1.66606296E12, 284.0], [1.66606284E12, 291.3333333333333], [1.66606302E12, 306.6666666666667], [1.66606272E12, 266.4], [1.66606242E12, 359.5], [1.6660629E12, 310.5], [1.6660626E12, 284.4]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[1.66606296E12, 640.0], [1.66606284E12, 914.0], [1.66606254E12, 970.5], [1.66606302E12, 346.0], [1.66606272E12, 672.6], [1.6660629E12, 375.0], [1.6660626E12, 962.3333333333334]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[1.66606296E12, 286.75], [1.66606284E12, 278.0], [1.66606254E12, 306.0], [1.66606302E12, 352.0], [1.66606272E12, 269.0], [1.66606242E12, 296.0], [1.6660629E12, 254.0], [1.6660626E12, 307.25]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1.66606248E12, 575.4], [1.66606302E12, 1020.0], [1.66606272E12, 870.0], [1.6660629E12, 577.4], [1.6660626E12, 530.4], [1.66606278E12, 568.6666666666666]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[1.66606248E12, 408.5], [1.66606296E12, 388.0], [1.66606266E12, 281.2], [1.66606254E12, 341.0], [1.6660629E12, 308.25], [1.66606278E12, 283.6]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[1.66606248E12, 391.6], [1.66606302E12, 470.5], [1.66606272E12, 344.0], [1.6660629E12, 373.0], [1.6660626E12, 340.6], [1.66606278E12, 363.3333333333333]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[1.66606248E12, 291.0], [1.66606296E12, 769.0], [1.66606284E12, 290.6666666666667], [1.66606302E12, 818.75], [1.66606272E12, 255.2], [1.66606242E12, 284.0], [1.6660629E12, 255.5], [1.6660626E12, 272.0]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66606302E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66606242E12, "maxY": 1086.0, "series": [{"data": [[1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606272E12, 0.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 149.25], [1.66606254E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 102.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606254E12, 0.0], [1.6660629E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606254E12, 0.0], [1.6660629E12, 143.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 643.4], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606254E12, 0.0], [1.6660629E12, 0.0], [1.66606278E12, 102.19999999999999]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 599.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1.66606248E12, 389.66666666666663], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606254E12, 0.0], [1.6660629E12, 291.25], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1.66606296E12, 1086.0], [1.66606284E12, 856.0], [1.66606254E12, 889.4], [1.66606302E12, 846.0], [1.66606272E12, 815.6]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606272E12, 0.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606254E12, 0.0], [1.6660629E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606272E12, 0.0]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[1.66606296E12, 26.6], [1.66606266E12, 29.0], [1.66606284E12, 30.0], [1.66606254E12, 30.6], [1.66606272E12, 36.333333333333336]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606254E12, 0.0], [1.6660629E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1.66606296E12, 852.6], [1.66606266E12, 832.0], [1.66606284E12, 841.6], [1.66606254E12, 893.0], [1.66606272E12, 871.0]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[1.66606248E12, 29.0], [1.66606296E12, 28.0], [1.66606266E12, 32.6], [1.66606254E12, 29.0], [1.6660629E12, 39.0], [1.66606278E12, 36.0]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606272E12, 384.0]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 174.66666666666666], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[1.66606248E12, 235.8], [1.66606296E12, 0.0], [1.66606266E12, 502.4], [1.6660629E12, 126.75], [1.66606278E12, 230.8]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[1.66606296E12, 30.4], [1.66606266E12, 39.0], [1.66606284E12, 33.0], [1.66606254E12, 31.0], [1.66606272E12, 29.333333333333332]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1.66606248E12, 852.75], [1.66606296E12, 778.0], [1.66606266E12, 891.2], [1.66606254E12, 922.0], [1.6660629E12, 886.0], [1.66606278E12, 864.4]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 229.2]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606266E12, 0.0], [1.66606302E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[1.66606296E12, 291.5], [1.66606284E12, 558.25], [1.66606254E12, 610.5], [1.66606302E12, 0.0], [1.66606272E12, 315.8], [1.6660629E12, 0.0], [1.6660626E12, 557.3333333333334]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[1.66606296E12, 0.0], [1.66606284E12, 0.0], [1.66606254E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[1.66606248E12, 131.5], [1.66606296E12, 0.0], [1.66606266E12, 0.0], [1.66606254E12, 0.0], [1.6660629E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606302E12, 0.0], [1.66606272E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0], [1.66606278E12, 0.0]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[1.66606248E12, 0.0], [1.66606296E12, 514.0], [1.66606284E12, 0.0], [1.66606302E12, 512.0], [1.66606272E12, 0.0], [1.66606242E12, 0.0], [1.6660629E12, 0.0], [1.6660626E12, 0.0]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66606302E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 17.0, "minX": 1.66606242E12, "maxY": 8142.0, "series": [{"data": [[1.66606248E12, 2564.0], [1.66606296E12, 2081.0], [1.66606266E12, 1361.0], [1.66606284E12, 1490.0], [1.66606254E12, 1542.0], [1.66606302E12, 8142.0], [1.66606272E12, 3781.0], [1.66606242E12, 1652.0], [1.6660629E12, 1374.0], [1.6660626E12, 2835.0], [1.66606278E12, 1331.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66606248E12, 729.6000000000005], [1.66606296E12, 837.2], [1.66606266E12, 882.1000000000001], [1.66606284E12, 804.5000000000008], [1.66606254E12, 946.1000000000005], [1.66606302E12, 821.0], [1.66606272E12, 749.8000000000004], [1.66606242E12, 992.2], [1.6660629E12, 723.5], [1.6660626E12, 615.2], [1.66606278E12, 848.2000000000003]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66606248E12, 1288.3100000000002], [1.66606296E12, 1409.920000000008], [1.66606266E12, 1304.0000000000007], [1.66606284E12, 1214.27], [1.66606254E12, 1428.5099999999957], [1.66606302E12, 2943.4000000000347], [1.66606272E12, 1208.98], [1.66606242E12, 1652.0], [1.6660629E12, 1253.0], [1.6660626E12, 1333.5600000000047], [1.66606278E12, 1244.61]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66606248E12, 921.3], [1.66606296E12, 1061.3999999999996], [1.66606266E12, 1041.7000000000003], [1.66606284E12, 1059.2999999999988], [1.66606254E12, 1202.35], [1.66606302E12, 1404.75], [1.66606272E12, 928.8], [1.66606242E12, 1405.9999999999998], [1.6660629E12, 864.0], [1.6660626E12, 917.1999999999996], [1.66606278E12, 985.0499999999995]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66606248E12, 91.0], [1.66606296E12, 21.0], [1.66606266E12, 22.0], [1.66606284E12, 20.0], [1.66606254E12, 17.0], [1.66606302E12, 251.0], [1.66606272E12, 22.0], [1.66606242E12, 251.0], [1.6660629E12, 94.0], [1.6660626E12, 248.0], [1.66606278E12, 102.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66606248E12, 308.0], [1.66606296E12, 306.0], [1.66606266E12, 305.0], [1.66606284E12, 307.0], [1.66606254E12, 307.0], [1.66606302E12, 333.0], [1.66606272E12, 307.0], [1.66606242E12, 307.0], [1.6660629E12, 311.5], [1.6660626E12, 309.0], [1.66606278E12, 310.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66606302E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 290.0, "minX": 1.0, "maxY": 510.0, "series": [{"data": [[2.0, 424.0], [8.0, 307.0], [9.0, 299.5], [10.0, 300.5], [11.0, 299.5], [3.0, 314.0], [12.0, 302.5], [13.0, 308.0], [14.0, 290.0], [1.0, 510.0], [4.0, 310.0], [5.0, 308.0], [6.0, 306.0], [7.0, 308.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 14.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 286.0, "minX": 1.0, "maxY": 499.0, "series": [{"data": [[2.0, 355.5], [8.0, 303.0], [9.0, 289.0], [10.0, 296.5], [11.0, 299.5], [3.0, 308.0], [12.0, 295.0], [13.0, 307.0], [14.0, 286.0], [1.0, 499.0], [4.0, 308.0], [5.0, 307.0], [6.0, 304.0], [7.0, 307.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 14.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.4333333333333333, "minX": 1.66606242E12, "maxY": 4.666666666666667, "series": [{"data": [[1.66606248E12, 4.233333333333333], [1.66606296E12, 2.95], [1.66606266E12, 2.5833333333333335], [1.66606284E12, 3.65], [1.66606254E12, 2.316666666666667], [1.66606302E12, 3.033333333333333], [1.66606272E12, 4.183333333333334], [1.66606242E12, 1.4333333333333333], [1.6660629E12, 3.716666666666667], [1.6660626E12, 4.666666666666667], [1.66606278E12, 2.55]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66606302E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66606242E12, "maxY": 4.683333333333334, "series": [{"data": [[1.66606248E12, 4.216666666666667], [1.66606296E12, 2.9], [1.66606266E12, 2.5166666666666666], [1.66606284E12, 3.6666666666666665], [1.66606254E12, 2.2666666666666666], [1.66606302E12, 3.066666666666667], [1.66606272E12, 4.166666666666667], [1.66606242E12, 1.3833333333333333], [1.6660629E12, 3.6666666666666665], [1.6660626E12, 4.683333333333334], [1.66606278E12, 2.45]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66606248E12, 0.05], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.03333333333333333], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "201", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66606302E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66606242E12, "maxY": 0.08333333333333333, "series": [{"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.06666666666666667], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.016666666666666666], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64-success", "isController": false}, {"data": [[1.66606248E12, 0.05], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.05], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.03333333333333333], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-71-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.016666666666666666], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100-success", "isController": false}, {"data": [[1.66606296E12, 0.06666666666666667], [1.66606284E12, 0.06666666666666667], [1.66606254E12, 0.03333333333333333], [1.66606302E12, 0.016666666666666666], [1.66606272E12, 0.08333333333333333], [1.6660629E12, 0.016666666666666666], [1.6660626E12, 0.05]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.05], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60-success", "isController": false}, {"data": [[1.66606248E12, 0.016666666666666666], [1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.016666666666666666], [1.66606254E12, 0.06666666666666667], [1.66606278E12, 0.06666666666666667]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.016666666666666666], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-69-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.05]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.016666666666666666], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.016666666666666666], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/main.min.js-49-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.05], [1.66606254E12, 0.08333333333333333], [1.66606278E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.03333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333], [1.66606272E12, 0.05]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/facebook.png-78-success", "isController": false}, {"data": [[1.66606296E12, 0.06666666666666667], [1.66606284E12, 0.06666666666666667], [1.66606254E12, 0.016666666666666666], [1.66606302E12, 0.016666666666666666], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.08333333333333333], [1.6660629E12, 0.016666666666666666], [1.6660626E12, 0.06666666666666667]], "isOverall": false, "label": "/catalog/fetchImage-33-success", "isController": false}, {"data": [[1.66606296E12, 0.06666666666666667], [1.66606284E12, 0.06666666666666667], [1.66606254E12, 0.016666666666666666], [1.66606302E12, 0.016666666666666666], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.08333333333333333], [1.6660629E12, 0.016666666666666666], [1.6660626E12, 0.06666666666666667]], "isOverall": false, "label": "/catalog/fetchImage-36-success", "isController": false}, {"data": [[1.66606248E12, 0.016666666666666666], [1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.016666666666666666], [1.66606254E12, 0.06666666666666667], [1.66606278E12, 0.06666666666666667]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.06666666666666667], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.03333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333], [1.66606272E12, 0.05]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126-success", "isController": false}, {"data": [[1.66606296E12, 0.06666666666666667], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.06666666666666667], [1.66606302E12, 0.016666666666666666], [1.66606272E12, 0.08333333333333333], [1.6660626E12, 0.016666666666666666]], "isOverall": false, "label": "Click Profile/treatment/get-139-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.016666666666666666], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.03333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333], [1.66606272E12, 0.05]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.06666666666666667], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.05], [1.66606254E12, 0.08333333333333333], [1.66606278E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.05], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-70-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.03333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333], [1.66606272E12, 0.05]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.016666666666666666], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.03333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333], [1.66606272E12, 0.05]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/app/views/home-page.html-65-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50-success", "isController": false}, {"data": [[1.66606248E12, 0.016666666666666666], [1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.016666666666666666], [1.66606254E12, 0.06666666666666667], [1.66606278E12, 0.06666666666666667]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.06666666666666667], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-68-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.06666666666666667], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.016666666666666666], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.06666666666666667], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/-41-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.05]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.016666666666666666], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110-success", "isController": false}, {"data": [[1.66606248E12, 0.05], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.03333333333333333], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112-success", "isController": false}, {"data": [[1.66606296E12, 0.06666666666666667], [1.66606284E12, 0.06666666666666667], [1.66606254E12, 0.016666666666666666], [1.66606302E12, 0.016666666666666666], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.08333333333333333], [1.6660629E12, 0.016666666666666666], [1.6660626E12, 0.06666666666666667]], "isOverall": false, "label": "/catalog/fetchImage-35-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.016666666666666666], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/treatment/get-106-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91-success", "isController": false}, {"data": [[1.66606296E12, 0.06666666666666667], [1.66606284E12, 0.06666666666666667], [1.66606254E12, 0.016666666666666666], [1.66606302E12, 0.016666666666666666], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.08333333333333333], [1.6660629E12, 0.016666666666666666], [1.6660626E12, 0.06666666666666667]], "isOverall": false, "label": "/catalog/fetchImage-34-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.05], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55-success", "isController": false}, {"data": [[1.66606296E12, 0.06666666666666667], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333], [1.66606302E12, 0.016666666666666666], [1.66606272E12, 0.08333333333333333]], "isOverall": false, "label": "Click Profile/treatment/get-138-success", "isController": false}, {"data": [[1.66606296E12, 0.06666666666666667], [1.66606284E12, 0.06666666666666667], [1.66606254E12, 0.016666666666666666], [1.66606302E12, 0.016666666666666666], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.08333333333333333], [1.6660629E12, 0.016666666666666666], [1.6660626E12, 0.06666666666666667]], "isOverall": false, "label": "/catalog/fetchImage-37-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.03333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333], [1.66606272E12, 0.05]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135-success", "isController": false}, {"data": [[1.66606296E12, 0.06666666666666667], [1.66606284E12, 0.06666666666666667], [1.66606254E12, 0.016666666666666666], [1.66606302E12, 0.016666666666666666], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.08333333333333333], [1.6660629E12, 0.016666666666666666], [1.6660626E12, 0.06666666666666667]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-67-success", "isController": false}, {"data": [[1.66606248E12, 0.016666666666666666], [1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.016666666666666666], [1.66606254E12, 0.06666666666666667], [1.66606278E12, 0.06666666666666667]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.06666666666666667], [1.66606254E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/main.min.css-42-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.06666666666666667], [1.66606242E12, 0.016666666666666666], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/twitter.png-79-success", "isController": false}, {"data": [[1.66606248E12, 0.06666666666666667], [1.66606296E12, 0.016666666666666666], [1.66606266E12, 0.08333333333333333], [1.66606254E12, 0.016666666666666666], [1.6660629E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.05]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.05], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/images/logo.png-56-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.05], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.06666666666666667], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.66606302E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.08333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606284E12, 0.03333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.06666666666666667], [1.6660629E12, 0.05], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.03333333333333333], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.08333333333333333], [1.66606278E12, 0.05]], "isOverall": false, "label": "Login/css/main.min.css-88-success", "isController": false}, {"data": [[1.66606296E12, 0.08333333333333333], [1.66606266E12, 0.03333333333333333], [1.66606284E12, 0.08333333333333333], [1.66606254E12, 0.08333333333333333], [1.66606272E12, 0.05]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130-success", "isController": false}, {"data": [[1.66606248E12, 0.03333333333333333], [1.66606296E12, 0.016666666666666666], [1.66606284E12, 0.05], [1.66606302E12, 0.06666666666666667], [1.66606272E12, 0.08333333333333333], [1.66606242E12, 0.05], [1.6660629E12, 0.03333333333333333], [1.6660626E12, 0.08333333333333333]], "isOverall": false, "label": "Launch/services.properties-52-success", "isController": false}, {"data": [[1.66606248E12, 0.08333333333333333], [1.66606266E12, 0.016666666666666666], [1.6660629E12, 0.08333333333333333], [1.6660626E12, 0.06666666666666667], [1.66606278E12, 0.08333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66606302E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.3833333333333333, "minX": 1.66606242E12, "maxY": 4.683333333333334, "series": [{"data": [[1.66606248E12, 4.266666666666667], [1.66606296E12, 2.9166666666666665], [1.66606266E12, 2.6], [1.66606284E12, 3.6666666666666665], [1.66606254E12, 2.3], [1.66606302E12, 3.066666666666667], [1.66606272E12, 4.166666666666667], [1.66606242E12, 1.3833333333333333], [1.6660629E12, 3.7333333333333334], [1.6660626E12, 4.683333333333334], [1.66606278E12, 2.533333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66606302E12, "title": "Total Transactions Per Second"}},
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
