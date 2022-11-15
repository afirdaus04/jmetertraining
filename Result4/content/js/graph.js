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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 13.0, "series": [{"data": [[600.0, 5.0], [4700.0, 1.0], [700.0, 3.0], [2900.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [800.0, 2.0], [900.0, 1.0], [500.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[600.0, 4.0], [1200.0, 1.0], [1500.0, 1.0], [500.0, 9.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[2300.0, 1.0], [600.0, 2.0], [300.0, 4.0], [2900.0, 1.0], [3100.0, 1.0], [400.0, 3.0], [200.0, 2.0], [800.0, 1.0], [3200.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[300.0, 11.0], [600.0, 1.0], [400.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[400.0, 10.0], [500.0, 5.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1100.0, 3.0], [2400.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [2900.0, 1.0], [6100.0, 1.0], [3300.0, 1.0], [1600.0, 1.0], [1800.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[300.0, 7.0], [3000.0, 1.0], [200.0, 5.0], [3400.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [600.0, 1.0], [400.0, 7.0], [1700.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1100.0, 4.0], [900.0, 6.0], [1000.0, 5.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[300.0, 10.0], [400.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 7.0], [600.0, 4.0], [400.0, 2.0], [1600.0, 1.0], [800.0, 1.0], [1800.0, 1.0], [3900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[4300.0, 1.0], [300.0, 5.0], [600.0, 4.0], [1200.0, 1.0], [2700.0, 1.0], [700.0, 1.0], [800.0, 1.0], [400.0, 2.0], [2000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[300.0, 12.0], [3000.0, 1.0], [200.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[2200.0, 1.0], [10600.0, 1.0], [1600.0, 2.0], [6600.0, 1.0], [800.0, 3.0], [900.0, 6.0], [1900.0, 1.0], [1000.0, 5.0]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[300.0, 9.0], [200.0, 2.0], [400.0, 2.0], [1600.0, 1.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 3.0], [4800.0, 1.0], [1200.0, 1.0], [700.0, 3.0], [1600.0, 1.0], [800.0, 1.0], [3400.0, 1.0], [900.0, 2.0], [500.0, 1.0], [4000.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[300.0, 5.0], [2400.0, 1.0], [700.0, 3.0], [3100.0, 1.0], [800.0, 2.0], [400.0, 5.0]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[600.0, 2.0], [300.0, 11.0], [700.0, 2.0], [400.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[300.0, 8.0], [200.0, 7.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[600.0, 2.0], [300.0, 8.0], [4900.0, 1.0], [2500.0, 1.0], [1300.0, 1.0], [200.0, 1.0], [800.0, 1.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1200.0, 1.0], [300.0, 8.0], [200.0, 1.0], [400.0, 4.0], [500.0, 3.0]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[300.0, 10.0], [1300.0, 1.0], [400.0, 1.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[300.0, 7.0], [200.0, 5.0], [800.0, 2.0], [400.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[300.0, 8.0], [1300.0, 1.0], [200.0, 4.0], [400.0, 4.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[300.0, 8.0], [200.0, 3.0], [400.0, 3.0], [900.0, 3.0]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[300.0, 9.0], [1300.0, 1.0], [3300.0, 1.0], [200.0, 3.0], [800.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[300.0, 9.0], [200.0, 5.0], [900.0, 1.0]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[300.0, 7.0], [600.0, 1.0], [700.0, 1.0], [200.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[300.0, 8.0], [400.0, 3.0], [200.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [4000.0, 1.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 13.0], [700.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[600.0, 1.0], [300.0, 11.0], [400.0, 2.0], [3800.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[600.0, 11.0], [700.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[4500.0, 1.0], [600.0, 6.0], [2600.0, 1.0], [700.0, 2.0], [2900.0, 1.0], [400.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1900.0, 2.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[300.0, 10.0], [200.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 6.0], [1300.0, 3.0], [1400.0, 2.0], [1500.0, 1.0]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[600.0, 2.0], [1200.0, 2.0], [300.0, 5.0], [700.0, 1.0], [3000.0, 1.0], [200.0, 2.0], [1600.0, 1.0], [400.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[4700.0, 1.0], [300.0, 5.0], [5900.0, 1.0], [6000.0, 1.0], [3100.0, 1.0], [1600.0, 1.0], [200.0, 1.0], [800.0, 2.0], [900.0, 1.0], [3900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[600.0, 1.0], [300.0, 9.0], [4900.0, 1.0], [700.0, 2.0], [1500.0, 1.0], [400.0, 1.0], [200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[300.0, 5.0], [400.0, 10.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 7.0], [1200.0, 1.0], [4900.0, 1.0], [2800.0, 1.0], [400.0, 4.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1200.0, 3.0], [1300.0, 7.0], [1400.0, 3.0], [1500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[0.0, 3.0], [1100.0, 1.0], [300.0, 2.0], [100.0, 7.0], [200.0, 2.0]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[600.0, 1.0], [300.0, 3.0], [2800.0, 1.0], [400.0, 2.0], [200.0, 7.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[300.0, 3.0], [1300.0, 1.0], [700.0, 1.0], [400.0, 9.0], [2000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[2200.0, 1.0], [1200.0, 2.0], [600.0, 1.0], [300.0, 1.0], [1300.0, 1.0], [700.0, 2.0], [2700.0, 1.0], [400.0, 3.0], [1700.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[2300.0, 1.0], [1100.0, 4.0], [2800.0, 1.0], [800.0, 2.0], [900.0, 4.0], [1800.0, 1.0], [4000.0, 1.0], [2000.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[2200.0, 1.0], [300.0, 4.0], [600.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [11900.0, 1.0], [400.0, 4.0], [3400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 1.0], [700.0, 1.0], [2900.0, 1.0], [13300.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [1200.0, 2.0], [4900.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [23000.0, 1.0], [24100.0, 1.0], [1700.0, 1.0], [7400.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [400.0, 9.0], [500.0, 3.0]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[9000.0, 1.0], [1100.0, 1.0], [600.0, 2.0], [300.0, 7.0], [2500.0, 1.0], [2600.0, 1.0], [5800.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[300.0, 6.0], [400.0, 2.0], [200.0, 7.0]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 3.0], [300.0, 4.0], [700.0, 3.0], [1600.0, 1.0], [800.0, 1.0], [400.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[300.0, 13.0], [400.0, 2.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[0.0, 2.0], [100.0, 13.0]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 6.0], [1300.0, 3.0], [1400.0, 2.0], [1600.0, 1.0]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[300.0, 11.0], [400.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[300.0, 1.0], [200.0, 12.0], [100.0, 2.0]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[300.0, 4.0], [600.0, 1.0], [200.0, 4.0], [400.0, 5.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[300.0, 8.0], [400.0, 2.0], [3300.0, 1.0], [200.0, 1.0], [900.0, 3.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[300.0, 8.0], [200.0, 7.0]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[300.0, 9.0], [1300.0, 1.0], [400.0, 2.0], [200.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[2400.0, 1.0], [800.0, 1.0], [3300.0, 1.0], [1000.0, 2.0], [4000.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [5400.0, 1.0], [1400.0, 1.0], [6300.0, 1.0], [6600.0, 1.0], [7200.0, 1.0], [1900.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[300.0, 6.0], [400.0, 2.0], [200.0, 6.0], [1000.0, 1.0]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[300.0, 13.0], [400.0, 2.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[300.0, 9.0], [400.0, 3.0], [800.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 6.0], [1200.0, 1.0], [5700.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [800.0, 1.0], [400.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[300.0, 8.0], [1400.0, 1.0], [400.0, 4.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[300.0, 9.0], [600.0, 2.0], [700.0, 1.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[4200.0, 1.0], [2300.0, 1.0], [1200.0, 1.0], [300.0, 2.0], [600.0, 1.0], [700.0, 1.0], [400.0, 4.0], [1000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[300.0, 8.0], [700.0, 2.0], [400.0, 3.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[2100.0, 1.0], [300.0, 6.0], [600.0, 1.0], [700.0, 1.0], [800.0, 1.0], [400.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1100.0, 2.0], [300.0, 6.0], [600.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [400.0, 2.0], [1800.0, 1.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[300.0, 5.0], [400.0, 5.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[300.0, 7.0], [400.0, 2.0], [200.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [400.0, 7.0], [500.0, 4.0]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 6.0], [1300.0, 4.0], [1400.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[4300.0, 1.0], [1100.0, 1.0], [5000.0, 1.0], [2900.0, 1.0], [1700.0, 2.0], [900.0, 4.0], [1900.0, 1.0], [1000.0, 5.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[300.0, 9.0], [400.0, 1.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1200.0, 1.0], [300.0, 7.0], [200.0, 3.0], [400.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [500.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[300.0, 3.0], [700.0, 2.0], [5900.0, 1.0], [800.0, 1.0], [400.0, 5.0], [7700.0, 1.0], [1000.0, 1.0], [500.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[4200.0, 1.0], [5100.0, 1.0], [700.0, 6.0], [800.0, 6.0], [3700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[300.0, 8.0], [400.0, 3.0], [200.0, 4.0]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[600.0, 2.0], [300.0, 7.0], [200.0, 4.0], [400.0, 2.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[4300.0, 1.0], [1100.0, 2.0], [600.0, 2.0], [1200.0, 1.0], [700.0, 4.0], [3200.0, 1.0], [800.0, 1.0], [900.0, 1.0], [3900.0, 1.0], [500.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[300.0, 7.0], [2700.0, 1.0], [700.0, 1.0], [6000.0, 1.0], [400.0, 3.0], [200.0, 1.0], [1000.0, 1.0], [4000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[600.0, 1.0], [300.0, 3.0], [700.0, 1.0], [400.0, 6.0], [800.0, 1.0], [3300.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[300.0, 1.0], [4900.0, 1.0], [5000.0, 1.0], [5900.0, 1.0], [800.0, 1.0], [400.0, 8.0], [1800.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[300.0, 10.0], [200.0, 3.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[600.0, 1.0], [300.0, 6.0], [2400.0, 1.0], [1300.0, 1.0], [200.0, 2.0], [400.0, 4.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[300.0, 1.0], [1200.0, 1.0], [400.0, 8.0], [1000.0, 3.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[300.0, 8.0], [2600.0, 1.0], [1400.0, 1.0], [400.0, 6.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[300.0, 1.0], [600.0, 5.0], [2800.0, 1.0], [700.0, 1.0], [5800.0, 1.0], [3000.0, 1.0], [13000.0, 1.0], [800.0, 1.0], [14000.0, 1.0], [900.0, 2.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[300.0, 8.0], [200.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[4200.0, 1.0], [600.0, 1.0], [300.0, 3.0], [700.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [800.0, 1.0], [400.0, 5.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[2300.0, 1.0], [300.0, 4.0], [1400.0, 1.0], [5700.0, 1.0], [6100.0, 1.0], [1500.0, 1.0], [200.0, 4.0], [400.0, 2.0], [1800.0, 1.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 24100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 172.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 883.0, "series": [{"data": [[0.0, 883.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 487.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 172.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 3.8235294117647065, "minX": 1.66668192E12, "maxY": 5.0, "series": [{"data": [[1.66668198E12, 5.0], [1.66668234E12, 5.0], [1.66668252E12, 4.568965517241379], [1.6666821E12, 5.0], [1.66668222E12, 5.0], [1.66668192E12, 3.8235294117647065], [1.6666824E12, 5.0], [1.66668204E12, 5.0], [1.66668228E12, 5.0], [1.66668246E12, 5.0], [1.66668216E12, 5.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66668252E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 107.66666666666669, "minX": 1.0, "maxY": 5438.823529411765, "series": [{"data": [[1.0, 588.0], [2.0, 658.0], [4.0, 811.5], [5.0, 1255.1333333333334], [3.0, 629.0]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[4.449999999999999, 1116.25]], "isOverall": false, "label": "/catalog/fetchImage-33-Aggregated", "isController": false}, {"data": [[5.0, 699.1999999999999]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[5.0, 699.1999999999999]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130-Aggregated", "isController": false}, {"data": [[5.0, 1129.7647058823532]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[5.0, 1129.7647058823532]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53-Aggregated", "isController": false}, {"data": [[5.0, 419.2]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[5.0, 419.2]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118-Aggregated", "isController": false}, {"data": [[5.0, 486.93333333333334]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[5.0, 486.93333333333334]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119-Aggregated", "isController": false}, {"data": [[5.0, 2064.5333333333333]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[5.0, 2064.5333333333333]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94-Aggregated", "isController": false}, {"data": [[5.0, 747.3529411764706]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[5.0, 747.3529411764706]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80-Aggregated", "isController": false}, {"data": [[5.0, 818.6666666666667]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[5.0, 818.6666666666667]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113-Aggregated", "isController": false}, {"data": [[5.0, 1043.2666666666669]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[5.0, 1043.2666666666669]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105-Aggregated", "isController": false}, {"data": [[5.0, 323.06666666666666]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[5.0, 323.06666666666666]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110-Aggregated", "isController": false}, {"data": [[2.0, 332.0], [4.0, 361.0], [5.0, 932.1249999999999], [3.0, 439.0]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[4.684210526315789, 844.5263157894738]], "isOverall": false, "label": "/catalog/fetchImage-36-Aggregated", "isController": false}, {"data": [[2.0, 383.3333333333333], [4.0, 1293.0], [5.0, 1009.8000000000002]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[4.449999999999998, 944.15]], "isOverall": false, "label": "/catalog/fetchImage-37-Aggregated", "isController": false}, {"data": [[5.0, 607.0588235294117]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[5.0, 607.0588235294117]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57-Aggregated", "isController": false}, {"data": [[1.0, 2289.0], [2.0, 1614.0], [4.0, 1005.5], [5.0, 2039.1999999999996], [3.0, 1663.0]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[4.449999999999999, 1908.25]], "isOverall": false, "label": "/catalog/fetchImage-34-Aggregated", "isController": false}, {"data": [[5.0, 533.8823529411765]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[5.0, 533.8823529411765]], "isOverall": false, "label": "Launch/css/images/logo.png-56-Aggregated", "isController": false}, {"data": [[2.0, 599.0], [4.0, 742.0], [5.0, 1576.375], [3.0, 632.0]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[4.684210526315789, 1431.3157894736842]], "isOverall": false, "label": "/catalog/fetchImage-35-Aggregated", "isController": false}, {"data": [[5.0, 799.7647058823529]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[5.0, 799.7647058823529]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62-Aggregated", "isController": false}, {"data": [[5.0, 526.5882352941177]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[5.0, 526.5882352941177]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74-Aggregated", "isController": false}, {"data": [[5.0, 312.3333333333333]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[5.0, 312.3333333333333]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114-Aggregated", "isController": false}, {"data": [[5.0, 908.8823529411762]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[5.0, 908.8823529411762]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50-Aggregated", "isController": false}, {"data": [[5.0, 451.2352941176471]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[5.0, 451.2352941176471]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59-Aggregated", "isController": false}, {"data": [[5.0, 537.4666666666666]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[5.0, 537.4666666666666]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117-Aggregated", "isController": false}, {"data": [[5.0, 441.8823529411764]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[5.0, 441.8823529411764]], "isOverall": false, "label": "Launch/app/views/home-page.html-65-Aggregated", "isController": false}, {"data": [[5.0, 417.8823529411765]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[5.0, 417.8823529411765]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76-Aggregated", "isController": false}, {"data": [[5.0, 453.2352941176471]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[5.0, 453.2352941176471]], "isOverall": false, "label": "Launch/css/images/facebook.png-78-Aggregated", "isController": false}, {"data": [[5.0, 613.3529411764705]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[5.0, 613.3529411764705]], "isOverall": false, "label": "Launch/css/images/twitter.png-79-Aggregated", "isController": false}, {"data": [[5.0, 354.8666666666667]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[5.0, 354.8666666666667]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109-Aggregated", "isController": false}, {"data": [[5.0, 370.8666666666666]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[5.0, 370.8666666666666]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115-Aggregated", "isController": false}, {"data": [[5.0, 808.8235294117648]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[5.0, 808.8235294117648]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55-Aggregated", "isController": false}, {"data": [[5.0, 486.764705882353]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[5.0, 486.764705882353]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73-Aggregated", "isController": false}, {"data": [[5.0, 601.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[5.0, 601.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100-Aggregated", "isController": false}, {"data": [[5.0, 658.4666666666667]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[5.0, 658.4666666666667]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112-Aggregated", "isController": false}, {"data": [[4.0, 885.0], [5.0, 1387.8823529411766]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[4.944444444444445, 1359.9444444444446]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43-Aggregated", "isController": false}, {"data": [[5.0, 322.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[5.0, 322.0]], "isOverall": false, "label": "Click Profile/treatment/get-139-Aggregated", "isController": false}, {"data": [[5.0, 1293.9333333333332]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[5.0, 1293.9333333333332]], "isOverall": false, "label": "Click Profile/treatment/get-138-Aggregated", "isController": false}, {"data": [[5.0, 784.7058823529411]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[5.0, 784.7058823529411]], "isOverall": false, "label": "Launch/services.properties-52-Aggregated", "isController": false}, {"data": [[5.0, 1903.2941176470583]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[5.0, 1903.2941176470583]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87-Aggregated", "isController": false}, {"data": [[5.0, 846.4117647058822]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[5.0, 846.4117647058822]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84-Aggregated", "isController": false}, {"data": [[5.0, 419.2]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[5.0, 419.2]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131-Aggregated", "isController": false}, {"data": [[5.0, 942.9411764705884]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[5.0, 942.9411764705884]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86-Aggregated", "isController": false}, {"data": [[5.0, 1401.2]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[5.0, 1401.2]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103-Aggregated", "isController": false}, {"data": [[5.0, 236.73333333333335]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[5.0, 236.73333333333335]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136-Aggregated", "isController": false}, {"data": [[4.0, 274.0], [5.0, 591.4]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[4.9375, 571.5625]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93-Aggregated", "isController": false}, {"data": [[5.0, 608.4117647058824]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[5.0, 608.4117647058824]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60-Aggregated", "isController": false}, {"data": [[5.0, 1117.3333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[5.0, 1117.3333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96-Aggregated", "isController": false}, {"data": [[5.0, 1568.533333333333], [3.0, 1130.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[4.875, 1541.1249999999998]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95-Aggregated", "isController": false}, {"data": [[5.0, 1532.9411764705883]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[5.0, 1532.9411764705883]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82-Aggregated", "isController": false}, {"data": [[5.0, 5438.823529411765]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[5.0, 5438.823529411765]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81-Aggregated", "isController": false}, {"data": [[5.0, 462.20000000000005]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[5.0, 462.20000000000005]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135-Aggregated", "isController": false}, {"data": [[5.0, 1711.2941176470586]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[5.0, 1711.2941176470586]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83-Aggregated", "isController": false}, {"data": [[5.0, 327.93333333333334]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[5.0, 327.93333333333334]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108-Aggregated", "isController": false}, {"data": [[1.0, 550.0], [5.0, 911.0588235294117]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[4.777777777777778, 891.0]], "isOverall": false, "label": "Launch/css/main.min.css-42-Aggregated", "isController": false}, {"data": [[5.0, 357.79999999999995]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[5.0, 357.79999999999995]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121-Aggregated", "isController": false}, {"data": [[5.0, 107.66666666666669]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[5.0, 107.66666666666669]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128-Aggregated", "isController": false}, {"data": [[5.0, 1299.533333333333]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[5.0, 1299.533333333333]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137-Aggregated", "isController": false}, {"data": [[5.0, 332.00000000000006]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[5.0, 332.00000000000006]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124-Aggregated", "isController": false}, {"data": [[5.0, 224.8]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[5.0, 224.8]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111-Aggregated", "isController": false}, {"data": [[4.0, 367.0], [5.0, 445.7333333333333]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[4.9375, 440.81249999999994]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99-Aggregated", "isController": false}, {"data": [[5.0, 678.7647058823528]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[5.0, 678.7647058823528]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66-Aggregated", "isController": false}, {"data": [[5.0, 311.1333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[5.0, 311.1333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123-Aggregated", "isController": false}, {"data": [[5.0, 460.6]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[5.0, 460.6]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129-Aggregated", "isController": false}, {"data": [[5.0, 3219.058823529412]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[5.0, 3219.058823529412]], "isOverall": false, "label": "Launch/main.min.js-49-Aggregated", "isController": false}, {"data": [[5.0, 381.19999999999993]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[5.0, 381.19999999999993]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127-Aggregated", "isController": false}, {"data": [[5.0, 352.5333333333333]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[5.0, 352.5333333333333]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120-Aggregated", "isController": false}, {"data": [[5.0, 372.94117647058823]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[5.0, 372.94117647058823]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77-Aggregated", "isController": false}, {"data": [[5.0, 1254.8666666666668]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[5.0, 1254.8666666666668]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98-Aggregated", "isController": false}, {"data": [[5.0, 512.1999999999999]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[5.0, 512.1999999999999]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102-Aggregated", "isController": false}, {"data": [[5.0, 441.05882352941177]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[5.0, 441.05882352941177]], "isOverall": false, "label": "Launch/catalog/fetchImage-67-Aggregated", "isController": false}, {"data": [[5.0, 964.0666666666665]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[5.0, 964.0666666666665]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97-Aggregated", "isController": false}, {"data": [[5.0, 485.40000000000003]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[5.0, 485.40000000000003]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101-Aggregated", "isController": false}, {"data": [[5.0, 590.8235294117648]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[5.0, 590.8235294117648]], "isOverall": false, "label": "Launch/catalog/fetchImage-68-Aggregated", "isController": false}, {"data": [[5.0, 704.8235294117649]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[5.0, 704.8235294117649]], "isOverall": false, "label": "Launch/catalog/fetchImage-69-Aggregated", "isController": false}, {"data": [[5.0, 564.3333333333334]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[5.0, 564.3333333333334]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104-Aggregated", "isController": false}, {"data": [[5.0, 343.66666666666663]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[5.0, 343.66666666666663]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125-Aggregated", "isController": false}, {"data": [[5.0, 480.53333333333336]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[5.0, 480.53333333333336]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134-Aggregated", "isController": false}, {"data": [[5.0, 1327.3333333333335]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[5.0, 1327.3333333333335]], "isOverall": false, "label": "Choose Item/treatment/get-106-Aggregated", "isController": false}, {"data": [[4.0, 961.0], [5.0, 1792.1333333333334]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[4.9375, 1740.1875]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91-Aggregated", "isController": false}, {"data": [[5.0, 335.9333333333333]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[5.0, 335.9333333333333]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116-Aggregated", "isController": false}, {"data": [[4.0, 304.0], [5.0, 652.2352941176471]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[4.944444444444445, 632.8888888888889]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44-Aggregated", "isController": false}, {"data": [[5.0, 1384.5882352941176]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[5.0, 1384.5882352941176]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75-Aggregated", "isController": false}, {"data": [[4.0, 700.0], [5.0, 1512.7333333333333]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[4.9375, 1461.9375]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92-Aggregated", "isController": false}, {"data": [[5.0, 339.80000000000007]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[5.0, 339.80000000000007]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122-Aggregated", "isController": false}, {"data": [[5.0, 452.5294117647059]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[5.0, 452.5294117647059]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64-Aggregated", "isController": false}, {"data": [[5.0, 1389.7058823529412]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[5.0, 1389.7058823529412]], "isOverall": false, "label": "Launch/catalog/fetchImage-70-Aggregated", "isController": false}, {"data": [[5.0, 1224.8823529411766]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[5.0, 1224.8823529411766]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85-Aggregated", "isController": false}, {"data": [[5.0, 687.3529411764706]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[5.0, 687.3529411764706]], "isOverall": false, "label": "Launch/catalog/fetchImage-71-Aggregated", "isController": false}, {"data": [[5.0, 1478.7647058823527]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[5.0, 1478.7647058823527]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89-Aggregated", "isController": false}, {"data": [[5.0, 373.86666666666673]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[5.0, 373.86666666666673]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126-Aggregated", "isController": false}, {"data": [[5.0, 658.5882352941178]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[5.0, 658.5882352941178]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54-Aggregated", "isController": false}, {"data": [[4.0, 1265.5], [5.0, 638.5384615384617]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[4.866666666666667, 722.1333333333334]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141-Aggregated", "isController": false}, {"data": [[2.0, 300.0], [5.0, 609.4375], [3.0, 313.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[4.722222222222222, 575.7777777777778]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39-Aggregated", "isController": false}, {"data": [[5.0, 2796.352941176471]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[5.0, 2796.352941176471]], "isOverall": false, "label": "Login/css/main.min.css-88-Aggregated", "isController": false}, {"data": [[5.0, 321.2]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[5.0, 321.2]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107-Aggregated", "isController": false}, {"data": [[5.0, 1190.2352941176468]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[5.0, 1190.2352941176468]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90-Aggregated", "isController": false}, {"data": [[4.0, 328.0], [5.0, 1454.8235294117649]], "isOverall": false, "label": "Launch/-41", "isController": false}, {"data": [[4.944444444444445, 1392.2222222222224]], "isOverall": false, "label": "Launch/-41-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 359.21666666666664, "minX": 1.66668192E12, "maxY": 169260.2, "series": [{"data": [[1.66668198E12, 128951.28333333334], [1.66668234E12, 137449.38333333333], [1.66668252E12, 38088.8], [1.6666821E12, 49728.2], [1.66668222E12, 169260.2], [1.66668192E12, 35152.05], [1.6666824E12, 139217.33333333334], [1.66668204E12, 60400.61666666667], [1.66668228E12, 35437.833333333336], [1.66668246E12, 72877.73333333334], [1.66668216E12, 80472.4]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66668198E12, 1839.1333333333334], [1.66668234E12, 2674.1666666666665], [1.66668252E12, 939.9833333333333], [1.6666821E12, 1742.4], [1.66668222E12, 2244.4333333333334], [1.66668192E12, 359.21666666666664], [1.6666824E12, 1978.5666666666666], [1.66668204E12, 653.45], [1.66668228E12, 2117.75], [1.66668246E12, 2831.866666666667], [1.66668216E12, 2554.6666666666665]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66668252E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 88.5, "minX": 1.66668192E12, "maxY": 20151.333333333332, "series": [{"data": [[1.66668234E12, 664.4], [1.66668252E12, 763.0], [1.66668192E12, 1928.4], [1.66668246E12, 603.0], [1.66668216E12, 1173.2]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[1.66668234E12, 555.0], [1.66668252E12, 571.0], [1.66668228E12, 578.3333333333334], [1.66668246E12, 819.0], [1.66668216E12, 808.8]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[1.66668198E12, 2167.4], [1.66668234E12, 578.6666666666666], [1.66668222E12, 410.0], [1.6666824E12, 1857.5], [1.66668246E12, 335.5], [1.66668216E12, 508.5]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[1.6666821E12, 350.3333333333333], [1.6666824E12, 324.0], [1.66668228E12, 336.6], [1.66668246E12, 589.0], [1.66668216E12, 437.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1.66668234E12, 472.0], [1.6666821E12, 540.0], [1.6666824E12, 470.0], [1.66668228E12, 451.25], [1.66668246E12, 487.25], [1.66668216E12, 494.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1.6666821E12, 1998.0], [1.66668222E12, 1817.6666666666667], [1.6666824E12, 1574.8], [1.66668204E12, 4757.0], [1.66668228E12, 1066.5]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[1.66668198E12, 1652.8], [1.66668234E12, 552.6666666666667], [1.66668222E12, 318.0], [1.6666824E12, 297.0], [1.66668246E12, 301.5], [1.66668216E12, 314.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[1.6666821E12, 1460.8], [1.6666824E12, 541.0], [1.66668228E12, 496.6], [1.66668246E12, 470.3333333333333]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1.6666821E12, 1075.2], [1.66668222E12, 970.5], [1.6666824E12, 990.5], [1.66668228E12, 1008.3333333333334], [1.66668246E12, 1108.6666666666667]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[1.6666821E12, 347.6], [1.66668222E12, 297.0], [1.6666824E12, 327.5], [1.66668228E12, 308.0], [1.66668246E12, 311.6666666666667]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1.66668198E12, 1626.0], [1.66668234E12, 614.2], [1.66668252E12, 402.5], [1.66668222E12, 3955.0], [1.66668192E12, 961.25], [1.66668246E12, 505.5], [1.66668216E12, 433.25]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[1.66668234E12, 643.2], [1.66668252E12, 524.3333333333334], [1.66668192E12, 1979.4], [1.66668246E12, 517.0], [1.66668216E12, 632.6]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[1.66668198E12, 997.0], [1.66668234E12, 344.3333333333333], [1.66668222E12, 305.6666666666667], [1.6666824E12, 1061.5], [1.66668246E12, 300.5], [1.66668216E12, 330.5]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1.66668234E12, 1164.8], [1.66668252E12, 978.0], [1.66668192E12, 4570.6], [1.66668246E12, 862.5], [1.66668216E12, 965.8]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[1.66668198E12, 734.2], [1.66668234E12, 341.0], [1.66668222E12, 357.6666666666667], [1.6666824E12, 1030.5], [1.66668246E12, 300.0], [1.66668216E12, 324.0]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1.66668198E12, 4180.0], [1.66668234E12, 1123.4], [1.66668252E12, 742.0], [1.66668222E12, 1028.0], [1.66668192E12, 1751.0], [1.66668246E12, 813.0], [1.66668216E12, 956.75]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[1.66668198E12, 1184.2], [1.66668234E12, 413.6666666666667], [1.66668222E12, 669.0], [1.6666824E12, 1443.0], [1.66668246E12, 399.5], [1.66668216E12, 371.0]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[1.66668198E12, 807.8], [1.66668234E12, 497.0], [1.66668222E12, 366.75], [1.6666824E12, 479.0], [1.66668246E12, 305.5], [1.66668216E12, 386.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[1.6666821E12, 315.6], [1.6666824E12, 321.5], [1.66668228E12, 310.2], [1.66668246E12, 304.3333333333333]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[1.66668198E12, 1214.25], [1.66668234E12, 453.75], [1.66668222E12, 939.0], [1.66668192E12, 4916.0], [1.6666824E12, 307.0], [1.66668246E12, 319.0], [1.66668216E12, 346.6666666666667]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1.66668198E12, 579.0], [1.66668234E12, 355.6666666666667], [1.66668222E12, 473.0], [1.6666824E12, 383.5], [1.66668246E12, 367.0], [1.66668216E12, 394.5]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[1.6666821E12, 911.6666666666667], [1.6666824E12, 334.0], [1.66668228E12, 572.6], [1.66668246E12, 343.75], [1.66668216E12, 377.5]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[1.66668198E12, 474.4], [1.66668234E12, 415.3333333333333], [1.66668222E12, 660.3333333333334], [1.6666824E12, 320.5], [1.66668246E12, 344.0], [1.66668216E12, 292.0]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[1.66668198E12, 562.6], [1.66668234E12, 470.0], [1.66668222E12, 337.0], [1.6666824E12, 324.0], [1.66668246E12, 300.5], [1.66668216E12, 284.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[1.66668198E12, 728.4], [1.66668234E12, 399.3333333333333], [1.66668222E12, 323.25], [1.6666824E12, 316.5], [1.66668246E12, 312.5], [1.66668216E12, 314.0]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[1.66668198E12, 1138.8], [1.66668234E12, 420.6666666666667], [1.66668222E12, 451.25], [1.6666824E12, 309.5], [1.66668246E12, 352.5], [1.66668216E12, 342.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[1.6666821E12, 316.4], [1.66668222E12, 661.5], [1.6666824E12, 294.5], [1.66668228E12, 312.6666666666667], [1.66668246E12, 297.0]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[1.6666821E12, 444.0], [1.6666824E12, 479.5], [1.66668228E12, 299.8], [1.66668246E12, 295.0]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[1.66668198E12, 1846.8], [1.66668234E12, 384.3333333333333], [1.66668222E12, 455.3333333333333], [1.6666824E12, 325.0], [1.66668246E12, 298.0], [1.66668216E12, 375.5]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1.66668198E12, 840.2], [1.66668234E12, 357.3333333333333], [1.66668222E12, 345.75], [1.6666824E12, 330.5], [1.66668246E12, 319.0], [1.66668216E12, 320.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[1.6666821E12, 351.25], [1.66668222E12, 383.3333333333333], [1.6666824E12, 1038.6], [1.66668204E12, 651.0], [1.66668228E12, 308.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1.6666821E12, 694.6], [1.6666824E12, 641.5], [1.66668228E12, 632.2], [1.66668246E12, 653.3333333333334]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[1.66668198E12, 1726.6666666666665], [1.66668234E12, 678.75], [1.66668252E12, 885.0], [1.66668222E12, 1969.0], [1.66668192E12, 3776.0], [1.6666824E12, 900.0], [1.66668246E12, 679.0], [1.66668216E12, 650.3333333333334]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[1.66668234E12, 340.6666666666667], [1.66668252E12, 311.5], [1.66668228E12, 310.5], [1.66668246E12, 323.6666666666667], [1.66668216E12, 318.6]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1.66668234E12, 1382.6666666666667], [1.66668252E12, 1243.5], [1.66668228E12, 1318.0], [1.66668246E12, 1196.6666666666667], [1.66668216E12, 1309.6]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[1.66668198E12, 1204.6], [1.66668234E12, 384.3333333333333], [1.66668222E12, 819.0], [1.6666824E12, 939.5], [1.66668246E12, 308.5], [1.66668216E12, 605.5]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[1.66668198E12, 5333.0], [1.66668234E12, 314.5], [1.66668252E12, 862.0], [1.66668222E12, 1762.6], [1.6666824E12, 583.3333333333334], [1.66668204E12, 2924.6666666666665]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[1.66668198E12, 1262.5], [1.66668234E12, 363.5], [1.66668252E12, 364.0], [1.66668222E12, 428.5], [1.6666824E12, 305.0], [1.66668204E12, 4970.0], [1.66668246E12, 341.0], [1.66668216E12, 308.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[1.66668234E12, 389.0], [1.66668252E12, 419.0], [1.66668228E12, 386.6666666666667], [1.66668246E12, 407.6666666666667], [1.66668216E12, 457.8]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1.66668198E12, 750.5], [1.66668234E12, 377.5], [1.66668252E12, 445.0], [1.66668222E12, 431.6], [1.6666824E12, 876.3333333333334], [1.66668204E12, 2736.333333333333], [1.66668246E12, 333.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1.6666821E12, 1341.8], [1.66668222E12, 1424.0], [1.6666824E12, 1342.5], [1.66668228E12, 1314.3333333333333], [1.66668246E12, 1611.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[1.66668234E12, 189.0], [1.66668252E12, 291.0], [1.66668228E12, 88.5], [1.66668246E12, 112.0], [1.66668216E12, 377.8]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[1.66668234E12, 563.5], [1.66668252E12, 274.0], [1.6666821E12, 298.0], [1.66668222E12, 403.3333333333333], [1.6666824E12, 323.6666666666667], [1.66668204E12, 1175.75], [1.66668228E12, 281.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[1.66668198E12, 802.8], [1.66668234E12, 504.6666666666667], [1.66668222E12, 433.0], [1.6666824E12, 890.5], [1.66668246E12, 402.5], [1.66668216E12, 465.0]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[1.66668234E12, 693.0], [1.6666821E12, 1612.3333333333333], [1.66668222E12, 820.6666666666666], [1.6666824E12, 1063.75], [1.66668204E12, 1758.5], [1.66668228E12, 498.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1.66668234E12, 1196.0], [1.66668252E12, 1130.0], [1.6666821E12, 1634.5], [1.66668222E12, 1236.6666666666667], [1.6666824E12, 1040.25], [1.66668204E12, 3114.0], [1.66668228E12, 925.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[1.66668198E12, 1481.5], [1.66668234E12, 434.0], [1.66668252E12, 446.0], [1.66668222E12, 863.5], [1.6666824E12, 851.3333333333334], [1.66668204E12, 11968.0], [1.66668246E12, 432.0], [1.66668216E12, 412.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[1.66668198E12, 2524.0], [1.66668234E12, 1251.0], [1.66668252E12, 1267.0], [1.66668222E12, 2874.0], [1.6666824E12, 2535.3333333333335], [1.66668204E12, 20151.333333333332], [1.66668246E12, 1213.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[1.66668234E12, 510.0], [1.66668252E12, 509.5], [1.66668228E12, 437.0], [1.66668246E12, 411.3333333333333], [1.66668216E12, 469.8]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[1.66668198E12, 3986.0], [1.66668234E12, 368.5], [1.66668252E12, 325.0], [1.66668222E12, 570.75], [1.6666824E12, 639.0], [1.66668204E12, 5888.0], [1.66668246E12, 327.0], [1.66668216E12, 1671.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[1.6666821E12, 339.8], [1.66668222E12, 421.5], [1.6666824E12, 315.5], [1.66668228E12, 290.3333333333333], [1.66668246E12, 291.6666666666667]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1.66668198E12, 1554.75], [1.66668234E12, 453.25], [1.66668252E12, 550.0], [1.66668222E12, 794.5], [1.66668192E12, 2066.0], [1.6666824E12, 431.0], [1.66668246E12, 471.5], [1.66668216E12, 809.0]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[1.66668234E12, 326.5], [1.6666821E12, 353.3333333333333], [1.6666824E12, 321.0], [1.66668228E12, 323.6666666666667], [1.66668246E12, 380.0], [1.66668216E12, 421.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[1.66668234E12, 110.0], [1.6666821E12, 105.66666666666667], [1.6666824E12, 103.0], [1.66668228E12, 102.0], [1.66668246E12, 114.75], [1.66668216E12, 105.0]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1.66668234E12, 1230.0], [1.66668252E12, 1299.0], [1.66668228E12, 1332.5], [1.66668246E12, 1266.3333333333333], [1.66668216E12, 1348.2]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[1.66668234E12, 353.0], [1.6666821E12, 364.0], [1.6666824E12, 320.0], [1.66668228E12, 293.3333333333333], [1.66668246E12, 326.75], [1.66668216E12, 337.5]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[1.6666821E12, 220.4], [1.66668222E12, 277.0], [1.6666824E12, 215.0], [1.66668228E12, 217.0], [1.66668246E12, 211.66666666666666]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[1.66668234E12, 441.0], [1.66668252E12, 367.0], [1.6666821E12, 478.0], [1.66668222E12, 399.3333333333333], [1.6666824E12, 446.0], [1.66668204E12, 553.0], [1.66668228E12, 286.5]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[1.66668198E12, 1321.6], [1.66668234E12, 370.6666666666667], [1.66668222E12, 572.0], [1.6666824E12, 302.5], [1.66668246E12, 333.0], [1.66668216E12, 416.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[1.66668234E12, 291.0], [1.6666821E12, 352.0], [1.6666824E12, 342.0], [1.66668228E12, 280.0], [1.66668246E12, 315.0], [1.66668216E12, 293.5]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[1.66668234E12, 355.0], [1.66668252E12, 883.5], [1.66668228E12, 522.6666666666666], [1.66668246E12, 400.3333333333333], [1.66668216E12, 332.6]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1.66668198E12, 4379.6], [1.66668234E12, 1448.25], [1.66668222E12, 7481.5], [1.6666824E12, 4076.0], [1.66668246E12, 1224.5], [1.66668216E12, 1848.3333333333335]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[1.66668234E12, 327.5], [1.6666821E12, 629.6666666666666], [1.6666824E12, 317.0], [1.66668228E12, 292.6666666666667], [1.66668246E12, 309.0], [1.66668216E12, 371.5]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[1.66668234E12, 369.0], [1.6666821E12, 351.0], [1.6666824E12, 357.0], [1.66668228E12, 327.6666666666667], [1.66668246E12, 367.5], [1.66668216E12, 343.5]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[1.66668198E12, 492.4], [1.66668234E12, 364.6666666666667], [1.66668222E12, 299.25], [1.6666824E12, 319.5], [1.66668246E12, 316.0], [1.66668216E12, 316.0]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1.66668234E12, 1936.0], [1.6666821E12, 918.0], [1.66668222E12, 553.6666666666666], [1.6666824E12, 1759.5], [1.66668204E12, 2379.0], [1.66668228E12, 338.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[1.6666821E12, 657.0], [1.66668222E12, 440.3333333333333], [1.6666824E12, 392.0], [1.66668204E12, 985.0], [1.66668228E12, 394.5]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[1.66668198E12, 464.6], [1.66668234E12, 504.0], [1.66668222E12, 475.75], [1.6666824E12, 362.0], [1.66668246E12, 354.0], [1.66668216E12, 328.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[1.66668234E12, 420.0], [1.6666821E12, 853.6666666666666], [1.66668222E12, 625.3333333333334], [1.6666824E12, 531.0], [1.66668204E12, 3295.0], [1.66668228E12, 445.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[1.6666821E12, 332.0], [1.66668222E12, 462.6666666666667], [1.6666824E12, 591.0], [1.66668204E12, 795.0], [1.66668228E12, 407.5]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[1.66668198E12, 846.2], [1.66668234E12, 425.0], [1.66668222E12, 624.3333333333334], [1.6666824E12, 398.5], [1.66668246E12, 476.5], [1.66668216E12, 457.5]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1.66668198E12, 842.8], [1.66668234E12, 951.3333333333333], [1.66668222E12, 680.5], [1.6666824E12, 543.0], [1.66668246E12, 355.5], [1.66668216E12, 395.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[1.6666821E12, 425.6], [1.66668222E12, 959.0], [1.6666824E12, 415.6666666666667], [1.66668228E12, 373.6666666666667], [1.66668246E12, 1025.5]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[1.66668234E12, 323.0], [1.6666821E12, 445.6666666666667], [1.6666824E12, 325.0], [1.66668228E12, 319.6666666666667], [1.66668246E12, 304.5], [1.66668216E12, 335.0]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[1.66668234E12, 485.5], [1.66668252E12, 456.5], [1.66668228E12, 420.6666666666667], [1.66668246E12, 519.3333333333334], [1.66668216E12, 500.8]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1.6666821E12, 1331.4], [1.66668222E12, 1387.5], [1.6666824E12, 1573.5], [1.66668228E12, 1227.3333333333333], [1.66668246E12, 1216.3333333333333]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1.66668234E12, 1841.5], [1.66668252E12, 961.0], [1.6666821E12, 978.0], [1.66668222E12, 1236.6666666666667], [1.6666824E12, 1045.3333333333333], [1.66668204E12, 3325.0], [1.66668228E12, 1037.5]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[1.6666821E12, 368.8], [1.6666824E12, 325.5], [1.66668228E12, 333.8], [1.66668246E12, 291.6666666666667]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1.66668198E12, 849.6666666666667], [1.66668234E12, 485.6], [1.66668252E12, 304.0], [1.66668222E12, 1043.0], [1.66668192E12, 1244.5], [1.66668246E12, 302.5], [1.66668216E12, 310.3333333333333]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[1.66668198E12, 2181.8], [1.66668234E12, 927.3333333333334], [1.66668222E12, 1828.75], [1.6666824E12, 644.0], [1.66668246E12, 407.0], [1.66668216E12, 430.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[1.66668234E12, 715.5], [1.66668252E12, 700.0], [1.6666821E12, 817.0], [1.66668222E12, 790.3333333333334], [1.6666824E12, 834.6666666666666], [1.66668204E12, 3504.25], [1.66668228E12, 775.5]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[1.66668234E12, 300.5], [1.6666821E12, 319.3333333333333], [1.6666824E12, 272.0], [1.66668228E12, 343.3333333333333], [1.66668246E12, 351.0], [1.66668216E12, 416.0]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[1.66668198E12, 520.6], [1.66668234E12, 467.0], [1.66668222E12, 597.0], [1.6666824E12, 359.0], [1.66668246E12, 302.5], [1.66668216E12, 287.5]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[1.66668198E12, 2708.4], [1.66668234E12, 914.6666666666666], [1.66668222E12, 871.25], [1.6666824E12, 819.5], [1.66668246E12, 749.5], [1.66668216E12, 716.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[1.66668198E12, 2570.25], [1.66668234E12, 393.5], [1.66668252E12, 353.0], [1.66668222E12, 467.25], [1.6666824E12, 906.3333333333333], [1.66668204E12, 4086.0], [1.66668246E12, 343.0], [1.66668216E12, 385.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[1.66668198E12, 593.6], [1.66668234E12, 484.6666666666667], [1.66668222E12, 1185.5], [1.6666824E12, 568.0], [1.66668246E12, 401.0], [1.66668216E12, 583.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[1.66668234E12, 460.0], [1.66668252E12, 442.5], [1.66668222E12, 831.6], [1.6666824E12, 420.0], [1.66668204E12, 3583.2]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[1.66668234E12, 350.5], [1.6666821E12, 540.0], [1.6666824E12, 320.0], [1.66668228E12, 334.6666666666667], [1.66668246E12, 333.0], [1.66668216E12, 315.5]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[1.66668198E12, 1310.2], [1.66668234E12, 433.3333333333333], [1.66668222E12, 326.6666666666667], [1.6666824E12, 447.0], [1.66668246E12, 435.0], [1.66668216E12, 300.5]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[1.66668234E12, 725.4], [1.66668252E12, 1187.0], [1.66668246E12, 429.0], [1.66668216E12, 557.2]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[1.66668198E12, 1563.5], [1.66668234E12, 429.4], [1.66668252E12, 332.0], [1.66668222E12, 433.0], [1.66668192E12, 699.0], [1.66668246E12, 381.5], [1.66668216E12, 366.25]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1.66668234E12, 844.5], [1.66668252E12, 609.0], [1.66668222E12, 1135.0], [1.6666824E12, 680.0], [1.66668204E12, 7383.2]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[1.6666821E12, 312.8], [1.66668222E12, 399.0], [1.6666824E12, 295.0], [1.66668228E12, 310.0], [1.66668246E12, 312.0]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[1.66668234E12, 588.0], [1.66668252E12, 401.5], [1.66668222E12, 578.8], [1.6666824E12, 417.6666666666667], [1.66668204E12, 2821.6]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[1.66668198E12, 1931.0], [1.66668234E12, 571.8], [1.66668252E12, 328.0], [1.66668222E12, 5954.0], [1.66668192E12, 1483.0], [1.66668246E12, 309.0], [1.66668216E12, 345.3333333333333]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66668252E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 44.666666666666664, "minX": 1.66668192E12, "maxY": 6682.6, "series": [{"data": [[1.66668234E12, 336.0], [1.66668252E12, 314.0], [1.66668192E12, 760.8], [1.66668246E12, 324.5], [1.66668216E12, 787.6]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[1.66668234E12, 555.0], [1.66668252E12, 571.0], [1.66668228E12, 578.0], [1.66668246E12, 819.0], [1.66668216E12, 808.6]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[1.66668198E12, 2091.0], [1.66668234E12, 571.3333333333334], [1.66668222E12, 400.0], [1.6666824E12, 1558.0], [1.66668246E12, 331.5], [1.66668216E12, 350.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[1.6666821E12, 350.3333333333333], [1.6666824E12, 324.0], [1.66668228E12, 336.6], [1.66668246E12, 589.0], [1.66668216E12, 437.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1.66668234E12, 472.0], [1.6666821E12, 540.0], [1.6666824E12, 470.0], [1.66668228E12, 451.0], [1.66668246E12, 487.25], [1.66668216E12, 494.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1.6666821E12, 300.0], [1.66668222E12, 420.0], [1.6666824E12, 386.4], [1.66668204E12, 756.0], [1.66668228E12, 292.5]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[1.66668198E12, 1652.8], [1.66668234E12, 552.6666666666667], [1.66668222E12, 318.0], [1.6666824E12, 297.0], [1.66668246E12, 301.5], [1.66668216E12, 314.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[1.6666821E12, 1460.6], [1.6666824E12, 540.5], [1.66668228E12, 496.6], [1.66668246E12, 470.3333333333333]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1.6666821E12, 1075.0], [1.66668222E12, 969.5], [1.6666824E12, 990.5], [1.66668228E12, 1008.3333333333334], [1.66668246E12, 1108.6666666666667]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[1.6666821E12, 347.4], [1.66668222E12, 297.0], [1.6666824E12, 327.5], [1.66668228E12, 308.0], [1.66668246E12, 311.6666666666667]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1.66668198E12, 1537.0], [1.66668234E12, 356.6], [1.66668252E12, 355.5], [1.66668222E12, 551.0], [1.66668192E12, 615.5], [1.66668246E12, 325.5], [1.66668216E12, 348.5]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[1.66668234E12, 426.2], [1.66668252E12, 396.6666666666667], [1.66668192E12, 1448.6], [1.66668246E12, 341.0], [1.66668216E12, 362.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[1.66668198E12, 997.0], [1.66668234E12, 344.0], [1.66668222E12, 305.6666666666667], [1.6666824E12, 1061.5], [1.66668246E12, 300.5], [1.66668216E12, 330.5]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1.66668234E12, 681.0], [1.66668252E12, 682.3333333333334], [1.66668192E12, 3586.0], [1.66668246E12, 579.0], [1.66668216E12, 655.6]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[1.66668198E12, 734.2], [1.66668234E12, 341.0], [1.66668222E12, 357.6666666666667], [1.6666824E12, 1030.5], [1.66668246E12, 300.0], [1.66668216E12, 324.0]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1.66668198E12, 580.0], [1.66668234E12, 414.4], [1.66668252E12, 372.0], [1.66668222E12, 470.0], [1.66668192E12, 387.3333333333333], [1.66668246E12, 370.0], [1.66668216E12, 333.5]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[1.66668198E12, 1184.0], [1.66668234E12, 413.6666666666667], [1.66668222E12, 669.0], [1.6666824E12, 1443.0], [1.66668246E12, 399.5], [1.66668216E12, 371.0]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[1.66668198E12, 804.2], [1.66668234E12, 494.0], [1.66668222E12, 360.75], [1.6666824E12, 470.0], [1.66668246E12, 299.0], [1.66668216E12, 386.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[1.6666821E12, 315.4], [1.6666824E12, 321.5], [1.66668228E12, 310.2], [1.66668246E12, 304.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[1.66668198E12, 1205.25], [1.66668234E12, 366.5], [1.66668222E12, 934.0], [1.66668192E12, 4402.0], [1.6666824E12, 306.0], [1.66668246E12, 315.5], [1.66668216E12, 342.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1.66668198E12, 579.0], [1.66668234E12, 355.6666666666667], [1.66668222E12, 473.0], [1.6666824E12, 383.5], [1.66668246E12, 367.0], [1.66668216E12, 394.5]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[1.6666821E12, 911.6666666666667], [1.6666824E12, 334.0], [1.66668228E12, 572.6], [1.66668246E12, 343.75], [1.66668216E12, 377.5]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[1.66668198E12, 474.2], [1.66668234E12, 415.3333333333333], [1.66668222E12, 660.3333333333334], [1.6666824E12, 320.5], [1.66668246E12, 344.0], [1.66668216E12, 292.0]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[1.66668198E12, 562.6], [1.66668234E12, 470.0], [1.66668222E12, 337.0], [1.6666824E12, 324.0], [1.66668246E12, 300.5], [1.66668216E12, 284.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[1.66668198E12, 728.2], [1.66668234E12, 399.3333333333333], [1.66668222E12, 323.25], [1.6666824E12, 316.5], [1.66668246E12, 312.5], [1.66668216E12, 314.0]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[1.66668198E12, 1138.8], [1.66668234E12, 420.6666666666667], [1.66668222E12, 451.25], [1.6666824E12, 309.0], [1.66668246E12, 352.5], [1.66668216E12, 342.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[1.6666821E12, 316.4], [1.66668222E12, 661.5], [1.6666824E12, 294.5], [1.66668228E12, 312.6666666666667], [1.66668246E12, 297.0]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[1.6666821E12, 444.0], [1.6666824E12, 479.5], [1.66668228E12, 299.8], [1.66668246E12, 295.0]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[1.66668198E12, 1846.4], [1.66668234E12, 384.0], [1.66668222E12, 455.0], [1.6666824E12, 325.0], [1.66668246E12, 298.0], [1.66668216E12, 375.0]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1.66668198E12, 823.6], [1.66668234E12, 355.0], [1.66668222E12, 337.25], [1.6666824E12, 328.0], [1.66668246E12, 317.5], [1.66668216E12, 307.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[1.6666821E12, 318.5], [1.66668222E12, 329.6666666666667], [1.6666824E12, 563.2], [1.66668204E12, 637.0], [1.66668228E12, 301.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1.6666821E12, 694.6], [1.6666824E12, 641.5], [1.66668228E12, 632.2], [1.66668246E12, 653.3333333333334]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[1.66668198E12, 1688.3333333333335], [1.66668234E12, 643.0], [1.66668252E12, 885.0], [1.66668222E12, 1964.5], [1.66668192E12, 3775.5], [1.6666824E12, 900.0], [1.66668246E12, 679.0], [1.66668216E12, 646.3333333333334]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[1.66668234E12, 340.6666666666667], [1.66668252E12, 311.5], [1.66668228E12, 310.5], [1.66668246E12, 323.6666666666667], [1.66668216E12, 318.6]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1.66668234E12, 1382.6666666666667], [1.66668252E12, 1243.5], [1.66668228E12, 1318.0], [1.66668246E12, 1196.3333333333333], [1.66668216E12, 1307.6]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[1.66668198E12, 1204.6], [1.66668234E12, 384.3333333333333], [1.66668222E12, 819.0], [1.6666824E12, 939.5], [1.66668246E12, 308.5], [1.66668216E12, 605.5]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[1.66668198E12, 5333.0], [1.66668234E12, 314.5], [1.66668252E12, 862.0], [1.66668222E12, 1762.6], [1.6666824E12, 583.3333333333334], [1.66668204E12, 2924.6666666666665]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[1.66668198E12, 1021.25], [1.66668234E12, 357.0], [1.66668252E12, 362.0], [1.66668222E12, 422.75], [1.6666824E12, 300.0], [1.66668204E12, 4959.0], [1.66668246E12, 341.0], [1.66668216E12, 306.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[1.66668234E12, 389.0], [1.66668252E12, 419.0], [1.66668228E12, 386.6666666666667], [1.66668246E12, 407.6666666666667], [1.66668216E12, 457.8]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1.66668198E12, 730.0], [1.66668234E12, 362.0], [1.66668252E12, 421.0], [1.66668222E12, 398.8], [1.6666824E12, 655.0], [1.66668204E12, 2063.3333333333335], [1.66668246E12, 321.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1.6666821E12, 1341.6], [1.66668222E12, 1423.5], [1.6666824E12, 1342.0], [1.66668228E12, 1314.3333333333333], [1.66668246E12, 1611.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[1.66668234E12, 85.0], [1.66668252E12, 177.5], [1.66668228E12, 53.0], [1.66668246E12, 44.666666666666664], [1.66668216E12, 51.6]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[1.66668234E12, 563.5], [1.66668252E12, 274.0], [1.6666821E12, 298.0], [1.66668222E12, 403.3333333333333], [1.6666824E12, 323.6666666666667], [1.66668204E12, 1175.75], [1.66668228E12, 281.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[1.66668198E12, 802.6], [1.66668234E12, 504.6666666666667], [1.66668222E12, 433.0], [1.6666824E12, 889.5], [1.66668246E12, 402.5], [1.66668216E12, 465.0]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[1.66668234E12, 683.0], [1.6666821E12, 628.0], [1.66668222E12, 495.6666666666667], [1.6666824E12, 619.75], [1.66668204E12, 767.0], [1.66668228E12, 344.5]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1.66668234E12, 901.0], [1.66668252E12, 724.0], [1.6666821E12, 608.0], [1.66668222E12, 669.3333333333334], [1.6666824E12, 711.75], [1.66668204E12, 1865.3333333333333], [1.66668228E12, 623.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[1.66668198E12, 835.75], [1.66668234E12, 390.5], [1.66668252E12, 428.0], [1.66668222E12, 763.5], [1.6666824E12, 600.3333333333334], [1.66668204E12, 3968.0], [1.66668246E12, 403.0], [1.66668216E12, 321.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[1.66668198E12, 364.0], [1.66668234E12, 442.5], [1.66668252E12, 311.0], [1.66668222E12, 778.6], [1.6666824E12, 311.0], [1.66668204E12, 3034.3333333333335], [1.66668246E12, 294.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[1.66668234E12, 508.0], [1.66668252E12, 505.0], [1.66668228E12, 435.3333333333333], [1.66668246E12, 411.3333333333333], [1.66668216E12, 468.8]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[1.66668198E12, 2409.5], [1.66668234E12, 310.0], [1.66668252E12, 306.0], [1.66668222E12, 322.75], [1.6666824E12, 595.6666666666666], [1.66668204E12, 3976.0], [1.66668246E12, 321.0], [1.66668216E12, 739.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[1.6666821E12, 339.8], [1.66668222E12, 421.5], [1.6666824E12, 315.5], [1.66668228E12, 290.3333333333333], [1.66668246E12, 291.6666666666667]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1.66668198E12, 1489.0], [1.66668234E12, 355.0], [1.66668252E12, 489.0], [1.66668222E12, 787.5], [1.66668192E12, 2051.0], [1.6666824E12, 385.0], [1.66668246E12, 330.5], [1.66668216E12, 628.6666666666666]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[1.66668234E12, 326.5], [1.6666821E12, 353.3333333333333], [1.6666824E12, 321.0], [1.66668228E12, 323.6666666666667], [1.66668246E12, 380.0], [1.66668216E12, 421.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[1.66668234E12, 110.0], [1.6666821E12, 105.33333333333333], [1.6666824E12, 103.0], [1.66668228E12, 102.0], [1.66668246E12, 114.75], [1.66668216E12, 105.0]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1.66668234E12, 1230.0], [1.66668252E12, 1299.0], [1.66668228E12, 1332.5], [1.66668246E12, 1266.3333333333333], [1.66668216E12, 1348.2]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[1.66668234E12, 353.0], [1.6666821E12, 363.6666666666667], [1.6666824E12, 320.0], [1.66668228E12, 293.3333333333333], [1.66668246E12, 326.5], [1.66668216E12, 337.5]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[1.6666821E12, 220.4], [1.66668222E12, 277.0], [1.6666824E12, 215.0], [1.66668228E12, 217.0], [1.66668246E12, 211.66666666666666]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[1.66668234E12, 441.0], [1.66668252E12, 367.0], [1.6666821E12, 478.0], [1.66668222E12, 399.3333333333333], [1.6666824E12, 446.0], [1.66668204E12, 553.0], [1.66668228E12, 286.5]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[1.66668198E12, 1321.6], [1.66668234E12, 370.6666666666667], [1.66668222E12, 571.6666666666666], [1.6666824E12, 302.5], [1.66668246E12, 333.0], [1.66668216E12, 416.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[1.66668234E12, 291.0], [1.6666821E12, 352.0], [1.6666824E12, 342.0], [1.66668228E12, 280.0], [1.66668246E12, 315.0], [1.66668216E12, 293.5]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[1.66668234E12, 355.0], [1.66668252E12, 883.5], [1.66668228E12, 522.6666666666666], [1.66668246E12, 400.3333333333333], [1.66668216E12, 332.6]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1.66668198E12, 916.8], [1.66668234E12, 325.0], [1.66668222E12, 435.0], [1.6666824E12, 2340.0], [1.66668246E12, 395.5], [1.66668216E12, 307.3333333333333]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[1.66668234E12, 327.5], [1.6666821E12, 629.6666666666666], [1.6666824E12, 317.0], [1.66668228E12, 292.6666666666667], [1.66668246E12, 309.0], [1.66668216E12, 371.5]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[1.66668234E12, 369.0], [1.6666821E12, 350.6666666666667], [1.6666824E12, 357.0], [1.66668228E12, 327.3333333333333], [1.66668246E12, 367.5], [1.66668216E12, 343.5]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[1.66668198E12, 492.4], [1.66668234E12, 364.6666666666667], [1.66668222E12, 299.25], [1.6666824E12, 319.5], [1.66668246E12, 316.0], [1.66668216E12, 316.0]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1.66668234E12, 1144.0], [1.6666821E12, 566.6666666666666], [1.66668222E12, 457.3333333333333], [1.6666824E12, 1613.25], [1.66668204E12, 1824.5], [1.66668228E12, 300.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[1.6666821E12, 388.25], [1.66668222E12, 366.0], [1.6666824E12, 355.8], [1.66668204E12, 510.0], [1.66668228E12, 373.5]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[1.66668198E12, 423.2], [1.66668234E12, 390.6666666666667], [1.66668222E12, 431.25], [1.6666824E12, 337.0], [1.66668246E12, 334.5], [1.66668216E12, 309.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[1.66668234E12, 318.0], [1.6666821E12, 309.3333333333333], [1.66668222E12, 401.6666666666667], [1.6666824E12, 421.75], [1.66668204E12, 2146.5], [1.66668228E12, 286.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[1.6666821E12, 318.25], [1.66668222E12, 405.6666666666667], [1.6666824E12, 477.2], [1.66668204E12, 792.0], [1.66668228E12, 326.5]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[1.66668198E12, 806.8], [1.66668234E12, 414.6666666666667], [1.66668222E12, 610.0], [1.6666824E12, 388.0], [1.66668246E12, 431.0], [1.66668216E12, 444.5]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1.66668198E12, 566.0], [1.66668234E12, 432.0], [1.66668222E12, 536.25], [1.6666824E12, 365.5], [1.66668246E12, 327.0], [1.66668216E12, 293.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[1.6666821E12, 425.6], [1.66668222E12, 959.0], [1.6666824E12, 415.6666666666667], [1.66668228E12, 373.6666666666667], [1.66668246E12, 1025.5]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[1.66668234E12, 323.0], [1.6666821E12, 445.6666666666667], [1.6666824E12, 325.0], [1.66668228E12, 319.6666666666667], [1.66668246E12, 304.5], [1.66668216E12, 335.0]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[1.66668234E12, 482.5], [1.66668252E12, 456.5], [1.66668228E12, 419.3333333333333], [1.66668246E12, 519.3333333333334], [1.66668216E12, 500.4]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1.6666821E12, 1331.4], [1.66668222E12, 1387.5], [1.6666824E12, 1573.5], [1.66668228E12, 1225.6666666666667], [1.66668246E12, 1216.3333333333333]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1.66668234E12, 1841.5], [1.66668252E12, 961.0], [1.6666821E12, 978.0], [1.66668222E12, 1236.6666666666667], [1.6666824E12, 1045.3333333333333], [1.66668204E12, 3325.0], [1.66668228E12, 1037.5]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[1.6666821E12, 368.8], [1.6666824E12, 325.5], [1.66668228E12, 333.8], [1.66668246E12, 291.6666666666667]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1.66668198E12, 849.6666666666667], [1.66668234E12, 485.6], [1.66668252E12, 304.0], [1.66668222E12, 1042.5], [1.66668192E12, 1244.0], [1.66668246E12, 302.5], [1.66668216E12, 310.3333333333333]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[1.66668198E12, 871.0], [1.66668234E12, 864.0], [1.66668222E12, 646.0], [1.6666824E12, 554.5], [1.66668246E12, 376.0], [1.66668216E12, 388.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[1.66668234E12, 715.5], [1.66668252E12, 700.0], [1.6666821E12, 817.0], [1.66668222E12, 790.3333333333334], [1.6666824E12, 834.6666666666666], [1.66668204E12, 3504.0], [1.66668228E12, 775.5]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[1.66668234E12, 300.5], [1.6666821E12, 319.0], [1.6666824E12, 272.0], [1.66668228E12, 343.3333333333333], [1.66668246E12, 351.0], [1.66668216E12, 416.0]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[1.66668198E12, 520.6], [1.66668234E12, 467.0], [1.66668222E12, 597.0], [1.6666824E12, 359.0], [1.66668246E12, 302.5], [1.66668216E12, 287.5]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[1.66668198E12, 930.2], [1.66668234E12, 323.3333333333333], [1.66668222E12, 361.0], [1.6666824E12, 373.5], [1.66668246E12, 361.5], [1.66668216E12, 324.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[1.66668198E12, 2288.75], [1.66668234E12, 390.0], [1.66668252E12, 353.0], [1.66668222E12, 465.75], [1.6666824E12, 902.3333333333333], [1.66668204E12, 4059.0], [1.66668246E12, 342.0], [1.66668216E12, 373.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[1.66668198E12, 458.0], [1.66668234E12, 423.0], [1.66668222E12, 1129.75], [1.6666824E12, 361.0], [1.66668246E12, 375.0], [1.66668216E12, 302.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[1.66668234E12, 460.0], [1.66668252E12, 442.5], [1.66668222E12, 831.6], [1.6666824E12, 420.0], [1.66668204E12, 3583.2]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[1.66668234E12, 350.5], [1.6666821E12, 540.0], [1.6666824E12, 320.0], [1.66668228E12, 334.6666666666667], [1.66668246E12, 333.0], [1.66668216E12, 315.5]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[1.66668198E12, 1177.4], [1.66668234E12, 419.6666666666667], [1.66668222E12, 323.6666666666667], [1.6666824E12, 437.5], [1.66668246E12, 424.5], [1.66668216E12, 299.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[1.66668234E12, 725.4], [1.66668252E12, 1186.6666666666667], [1.66668246E12, 429.0], [1.66668216E12, 557.2]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[1.66668198E12, 1554.0], [1.66668234E12, 427.8], [1.66668252E12, 328.0], [1.66668222E12, 429.0], [1.66668192E12, 498.0], [1.66668246E12, 377.5], [1.66668216E12, 364.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1.66668234E12, 836.5], [1.66668252E12, 600.0], [1.66668222E12, 1009.8], [1.6666824E12, 668.0], [1.66668204E12, 6682.6]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[1.6666821E12, 312.4], [1.66668222E12, 398.5], [1.6666824E12, 295.0], [1.66668228E12, 310.0], [1.66668246E12, 311.6666666666667]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[1.66668234E12, 588.0], [1.66668252E12, 401.5], [1.66668222E12, 578.8], [1.6666824E12, 417.6666666666667], [1.66668204E12, 2821.6]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[1.66668198E12, 1931.0], [1.66668234E12, 571.4], [1.66668252E12, 328.0], [1.66668222E12, 5954.0], [1.66668192E12, 1482.6666666666667], [1.66668246E12, 309.0], [1.66668216E12, 345.3333333333333]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66668252E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66668192E12, "maxY": 1797.4, "series": [{"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668192E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 248.4]], "isOverall": false, "label": "/catalog/fetchImage-33", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 205.33333333333331], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 155.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94", "isController": false}, {"data": [[1.66668198E12, 686.6000000000001], [1.66668234E12, 254.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80", "isController": false}, {"data": [[1.6666821E12, 931.6], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.66668192E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-36", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668192E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-37", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668192E12, 1797.4], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-34", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/logo.png-56", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.66668192E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "/catalog/fetchImage-35", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.66668192E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59", "isController": false}, {"data": [[1.6666821E12, 558.6666666666667], [1.6666824E12, 0.0], [1.66668228E12, 241.4], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/app/views/home-page.html-65", "isController": false}, {"data": [[1.66668198E12, 206.4], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/facebook.png-78", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/twitter.png-79", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 146.0], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.66668192E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Profile/treatment/get-139", "isController": false}, {"data": [[1.66668234E12, 1001.0], [1.66668252E12, 924.5], [1.66668228E12, 1004.0], [1.66668246E12, 888.6666666666666], [1.66668216E12, 1000.6]], "isOverall": false, "label": "Click Profile/treatment/get-138", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 375.0], [1.66668246E12, 0.0], [1.66668216E12, 310.5]], "isOverall": false, "label": "Launch/services.properties-52", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 567.0], [1.66668222E12, 128.6], [1.6666824E12, 0.0], [1.66668204E12, 537.6666666666666]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 206.33333333333331]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81", "isController": false}, {"data": [[1.66668234E12, 203.5], [1.66668252E12, 203.0], [1.66668228E12, 147.66666666666666], [1.66668246E12, 118.66666666666667], [1.66668216E12, 130.0]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135", "isController": false}, {"data": [[1.66668198E12, 231.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.66668192E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 205.66666666666669]], "isOverall": false, "label": "Launch/css/main.min.css-42", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", "isController": false}, {"data": [[1.66668234E12, 903.6666666666666], [1.66668252E12, 994.0], [1.66668228E12, 1011.0], [1.66668246E12, 962.3333333333334], [1.66668216E12, 1024.8]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124", "isController": false}, {"data": [[1.6666821E12, 114.0], [1.66668222E12, 113.5], [1.6666824E12, 110.5], [1.66668228E12, 111.33333333333333], [1.66668246E12, 99.33333333333333]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 509.0], [1.66668228E12, 214.33333333333334], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/main.min.js-49", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 520.75], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-67", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-68", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-69", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 566.5], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 631.0]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125", "isController": false}, {"data": [[1.66668234E12, 197.0], [1.66668252E12, 187.5], [1.66668228E12, 144.0], [1.66668246E12, 221.33333333333334], [1.66668216E12, 145.2]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", "isController": false}, {"data": [[1.6666821E12, 1009.4], [1.66668222E12, 1006.5], [1.6666824E12, 1270.0], [1.66668228E12, 905.6666666666666], [1.66668246E12, 921.3333333333334]], "isOverall": false, "label": "Choose Item/treatment/get-106", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.6666821E12, 0.0], [1.66668222E12, 241.0], [1.6666824E12, 0.0], [1.66668204E12, 414.25], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 144.2], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.66668192E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 1262.5], [1.66668228E12, 0.0]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-70", "isController": false}, {"data": [[1.66668198E12, 260.75], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/catalog/fetchImage-71", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 107.6], [1.6666824E12, 0.0], [1.66668204E12, 0.0]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.6666821E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", "isController": false}, {"data": [[1.66668234E12, 239.6], [1.66668252E12, 580.6666666666667], [1.66668246E12, 0.0], [1.66668216E12, 131.8]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.66668192E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 0.0]], "isOverall": false, "label": "Login/css/main.min.css-88", "isController": false}, {"data": [[1.6666821E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668228E12, 0.0], [1.66668246E12, 0.0]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107", "isController": false}, {"data": [[1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.6666824E12, 0.0], [1.66668204E12, 287.8]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90", "isController": false}, {"data": [[1.66668198E12, 0.0], [1.66668234E12, 0.0], [1.66668252E12, 0.0], [1.66668222E12, 0.0], [1.66668192E12, 0.0], [1.66668246E12, 0.0], [1.66668216E12, 0.0]], "isOverall": false, "label": "Launch/-41", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66668252E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 80.0, "minX": 1.66668192E12, "maxY": 24105.0, "series": [{"data": [[1.66668198E12, 9029.0], [1.66668234E12, 2453.0], [1.66668252E12, 2086.0], [1.6666821E12, 2934.0], [1.66668222E12, 7738.0], [1.66668192E12, 10612.0], [1.6666824E12, 5766.0], [1.66668204E12, 24105.0], [1.66668228E12, 1461.0], [1.66668246E12, 1947.0], [1.66668216E12, 3387.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66668198E12, 3276.2], [1.66668234E12, 1151.0], [1.66668252E12, 1267.9], [1.6666821E12, 1330.6], [1.66668222E12, 1697.2000000000012], [1.66668192E12, 4850.0], [1.6666824E12, 1310.5], [1.66668204E12, 12073.7], [1.66668228E12, 1019.8000000000002], [1.66668246E12, 1041.0999999999997], [1.66668216E12, 1202.6000000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66668198E12, 8051.459999999988], [1.66668234E12, 2064.2599999999998], [1.66668252E12, 2086.0], [1.6666821E12, 2686.839999999997], [1.66668222E12, 7406.389999999999], [1.66668192E12, 10612.0], [1.6666824E12, 5187.75], [1.66668204E12, 24105.0], [1.66668228E12, 1438.4500000000003], [1.66668246E12, 1496.5499999999959], [1.66668216E12, 2323.079999999992]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66668198E12, 4758.099999999998], [1.66668234E12, 1482.049999999999], [1.66668252E12, 1323.4499999999998], [1.6666821E12, 1825.5000000000016], [1.66668222E12, 2933.649999999999], [1.66668192E12, 7659.25], [1.6666824E12, 2170.5], [1.66668204E12, 14477.199999999975], [1.66668228E12, 1254.5999999999997], [1.66668246E12, 1221.1], [1.66668216E12, 1422.7000000000007]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66668198E12, 283.0], [1.66668234E12, 108.0], [1.66668252E12, 218.0], [1.6666821E12, 101.0], [1.66668222E12, 245.0], [1.66668192E12, 300.0], [1.6666824E12, 103.0], [1.66668204E12, 293.0], [1.66668228E12, 80.0], [1.66668246E12, 88.0], [1.66668216E12, 101.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66668198E12, 901.0], [1.66668234E12, 440.0], [1.66668252E12, 545.0], [1.6666821E12, 385.5], [1.66668222E12, 476.0], [1.66668192E12, 1755.0], [1.6666824E12, 401.0], [1.66668204E12, 3016.0], [1.66668228E12, 349.0], [1.66668246E12, 342.0], [1.66668216E12, 413.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66668252E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 320.0, "minX": 1.0, "maxY": 1004.0, "series": [{"data": [[2.0, 632.5], [8.0, 351.0], [9.0, 320.0], [10.0, 527.5], [11.0, 483.0], [3.0, 490.0], [12.0, 327.0], [13.0, 340.0], [1.0, 1004.0], [4.0, 446.5], [5.0, 397.0], [6.0, 422.5], [7.0, 410.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 318.5, "minX": 1.0, "maxY": 667.0, "series": [{"data": [[2.0, 459.0], [8.0, 341.0], [9.0, 318.5], [10.0, 372.0], [11.0, 408.0], [3.0, 427.0], [12.0, 325.0], [13.0, 337.0], [1.0, 667.0], [4.0, 409.5], [5.0, 374.0], [6.0, 351.5], [7.0, 364.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.65, "minX": 1.66668192E12, "maxY": 3.4833333333333334, "series": [{"data": [[1.66668198E12, 2.8833333333333333], [1.66668234E12, 3.4833333333333334], [1.66668252E12, 0.9333333333333333], [1.6666821E12, 2.216666666666667], [1.66668222E12, 3.3], [1.66668192E12, 0.65], [1.6666824E12, 2.85], [1.66668204E12, 0.9333333333333333], [1.66668228E12, 2.4], [1.66668246E12, 3.3], [1.66668216E12, 2.75]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66668252E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.66668192E12, "maxY": 3.466666666666667, "series": [{"data": [[1.66668198E12, 2.8833333333333333], [1.66668234E12, 3.466666666666667], [1.66668252E12, 0.9666666666666667], [1.6666821E12, 2.183333333333333], [1.66668222E12, 3.3666666666666667], [1.66668192E12, 0.5666666666666667], [1.6666824E12, 2.8666666666666667], [1.66668204E12, 0.9666666666666667], [1.66668228E12, 2.25], [1.66668246E12, 3.25], [1.66668216E12, 2.683333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.08333333333333333], [1.66668246E12, 0.05]], "isOverall": false, "label": "201", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66668252E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66668192E12, "maxY": 0.08333333333333333, "series": [{"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Special-offer.jpg-75-success", "isController": false}, {"data": [[1.66668234E12, 0.016666666666666666], [1.6666821E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.06666666666666667], [1.66668204E12, 0.03333333333333333], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-97-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.05], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/order/api/v1/shippingcost/-120-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/app/tempFiles/popularProducts.json-64-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.05], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/app/order/views/orderPayment-page.html-122-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/catalog/fetchImage-71-success", "isController": false}, {"data": [[1.66668234E12, 0.016666666666666666], [1.66668252E12, 0.016666666666666666], [1.6666821E12, 0.016666666666666666], [1.66668222E12, 0.05], [1.6666824E12, 0.06666666666666667], [1.66668204E12, 0.06666666666666667], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/css/images/Filter.png-99-success", "isController": false}, {"data": [[1.6666821E12, 0.06666666666666667], [1.66668222E12, 0.05], [1.6666824E12, 0.08333333333333333], [1.66668204E12, 0.016666666666666666], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-100-success", "isController": false}, {"data": [[1.66668234E12, 0.08333333333333333], [1.66668252E12, 0.05], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click Logout/accountservice/ws/AccountLogoutRequest-141-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.05], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetCountriesRequest-124-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/categories-60-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.08333333333333333], [1.66668246E12, 0.05]], "isOverall": false, "label": "Click Cart/order/api/v1/carts/800075438-113-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/all_data-103-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/catalog/fetchImage-69-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/deals/search-62-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668222E12, 0.08333333333333333], [1.6666824E12, 0.05], [1.66668204E12, 0.08333333333333333]], "isOverall": false, "label": "Login/accountservice/ws/AccountLoginRequest-89-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.016666666666666666], [1.6666821E12, 0.016666666666666666], [1.66668222E12, 0.05], [1.6666824E12, 0.05], [1.66668204E12, 0.06666666666666667], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/app/views/category-page.html-93-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05]], "isOverall": false, "label": "Choose Item/css/images/reviewUser.png-109-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05]], "isOverall": false, "label": "Choose Item/css/images/review_right.png-108-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.06666666666666667], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.016666666666666666], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.05]], "isOverall": false, "label": "Launch/main.min.js-49-success", "isController": false}, {"data": [[1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.08333333333333333], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdRequest-117-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/order/api/v1/carts/800075438-131-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/facebook.png-78-success", "isController": false}, {"data": [[1.66668234E12, 0.08333333333333333], [1.66668252E12, 0.05], [1.66668192E12, 0.08333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "/catalog/fetchImage-33-success", "isController": false}, {"data": [[1.66668198E12, 0.016666666666666666], [1.66668234E12, 0.08333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668222E12, 0.016666666666666666], [1.66668192E12, 0.06666666666666667], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.06666666666666667]], "isOverall": false, "label": "/catalog/fetchImage-36-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.08333333333333333], [1.66668246E12, 0.05]], "isOverall": false, "label": "Click Cart/app/views/shoppingCart.html-114-success", "isController": false}, {"data": [[1.66668198E12, 0.06666666666666667], [1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.05], [1.66668204E12, 0.016666666666666666], [1.66668246E12, 0.016666666666666666], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Banner2.jpg-82-success", "isController": false}, {"data": [[1.66668234E12, 0.05], [1.66668252E12, 0.03333333333333333], [1.66668228E12, 0.03333333333333333], [1.66668246E12, 0.05], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.05], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/User.jpg-126-success", "isController": false}, {"data": [[1.66668234E12, 0.05], [1.66668252E12, 0.03333333333333333], [1.66668228E12, 0.03333333333333333], [1.66668246E12, 0.05], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click Profile/treatment/get-139-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.05], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Shipex.png-127-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73-success", "isController": false}, {"data": [[1.6666821E12, 0.06666666666666667], [1.66668222E12, 0.05], [1.6666824E12, 0.08333333333333333], [1.66668204E12, 0.016666666666666666], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-101-success", "isController": false}, {"data": [[1.6666821E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.08333333333333333], [1.66668204E12, 0.03333333333333333], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/css/images/category_banner_4.png-94-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134-success", "isController": false}, {"data": [[1.66668198E12, 0.06666666666666667], [1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.05], [1.66668204E12, 0.016666666666666666], [1.66668246E12, 0.016666666666666666], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Popular-item3.jpg-84-success", "isController": false}, {"data": [[1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.08333333333333333], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118-success", "isController": false}, {"data": [[1.66668198E12, 0.05], [1.66668234E12, 0.08333333333333333], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.03333333333333333], [1.66668192E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.05]], "isOverall": false, "label": "Launch/css/images/Down_arrow.svg-44-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/accountservice/ws/GetAccountConfigurationRequest-59-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/catalog/fetchImage-70-success", "isController": false}, {"data": [[1.66668234E12, 0.05], [1.66668252E12, 0.03333333333333333], [1.66668228E12, 0.03333333333333333], [1.66668246E12, 0.05], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136-success", "isController": false}, {"data": [[1.66668234E12, 0.016666666666666666], [1.6666821E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.06666666666666667], [1.66668204E12, 0.03333333333333333], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-96-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/css/images/arrow_right.png-66-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05]], "isOverall": false, "label": "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.05], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/app/views/home-page.html-65-success", "isController": false}, {"data": [[1.66668198E12, 0.06666666666666667], [1.66668234E12, 0.06666666666666667], [1.66668222E12, 0.03333333333333333], [1.66668192E12, 0.016666666666666666], [1.6666824E12, 0.016666666666666666], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.05]], "isOverall": false, "label": "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.08333333333333333], [1.66668246E12, 0.05]], "isOverall": false, "label": "Click Cart/css/images/Master_credit.png-115-success", "isController": false}, {"data": [[1.66668234E12, 0.016666666666666666], [1.6666821E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.06666666666666667], [1.66668204E12, 0.03333333333333333], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-98-success", "isController": false}, {"data": [[1.66668198E12, 0.03333333333333333], [1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.08333333333333333], [1.6666824E12, 0.05], [1.66668204E12, 0.05], [1.66668246E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Popular-item1.jpg-86-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/catalog/fetchImage-68-success", "isController": false}, {"data": [[1.66668198E12, 0.03333333333333333], [1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.08333333333333333], [1.6666824E12, 0.05], [1.66668204E12, 0.05], [1.66668246E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Banner1.jpg-81-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/css/images/closeDark.png-57-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05]], "isOverall": false, "label": "Choose Item/catalog/api/v1/categories/4/products-105-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.05], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Bell.png-123-success", "isController": false}, {"data": [[1.66668198E12, 0.06666666666666667], [1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.05], [1.66668204E12, 0.016666666666666666], [1.66668246E12, 0.016666666666666666], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Popular-item2.jpg-85-success", "isController": false}, {"data": [[1.66668198E12, 0.03333333333333333], [1.66668234E12, 0.08333333333333333], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.03333333333333333], [1.66668192E12, 0.05], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.05]], "isOverall": false, "label": "Launch/-41-success", "isController": false}, {"data": [[1.66668198E12, 0.03333333333333333], [1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668222E12, 0.08333333333333333], [1.6666824E12, 0.05], [1.66668204E12, 0.05]], "isOverall": false, "label": "Login/css/images/FacebookLogo.png-87-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05]], "isOverall": false, "label": "Choose Item/css/images/review_Left_disabled.png-110-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.08333333333333333], [1.66668246E12, 0.05]], "isOverall": false, "label": "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112-success", "isController": false}, {"data": [[1.66668198E12, 0.03333333333333333], [1.66668234E12, 0.08333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668222E12, 0.016666666666666666], [1.66668192E12, 0.05], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.06666666666666667]], "isOverall": false, "label": "/catalog/fetchImage-35-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.016666666666666666], [1.6666821E12, 0.016666666666666666], [1.66668222E12, 0.05], [1.6666824E12, 0.05], [1.66668204E12, 0.06666666666666667], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/attributes-92-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/chat_logo.png-76-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05]], "isOverall": false, "label": "Choose Item/treatment/get-106-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.016666666666666666], [1.6666821E12, 0.016666666666666666], [1.66668222E12, 0.05], [1.6666824E12, 0.05], [1.66668204E12, 0.06666666666666667], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/catalog/api/v1/categories/4/products-91-success", "isController": false}, {"data": [[1.66668234E12, 0.08333333333333333], [1.66668252E12, 0.05], [1.66668192E12, 0.08333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "/catalog/fetchImage-34-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/GoUp.png-77-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55-success", "isController": false}, {"data": [[1.66668234E12, 0.05], [1.66668252E12, 0.03333333333333333], [1.66668228E12, 0.03333333333333333], [1.66668246E12, 0.05], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click Profile/treatment/get-138-success", "isController": false}, {"data": [[1.66668234E12, 0.08333333333333333], [1.66668252E12, 0.05], [1.66668192E12, 0.08333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "/catalog/fetchImage-37-success", "isController": false}, {"data": [[1.66668198E12, 0.05], [1.66668234E12, 0.06666666666666667], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.03333333333333333], [1.66668192E12, 0.03333333333333333], [1.6666824E12, 0.016666666666666666], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.05]], "isOverall": false, "label": "Launch/vendor/requirejs/require.js-43-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.05], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/css/images/Check.png-125-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.05], [1.66668228E12, 0.05], [1.66668246E12, 0.03333333333333333]], "isOverall": false, "label": "Choose Item/catalog/api/v1/products/20-104-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/offline/common/serviceworker.js-135-success", "isController": false}, {"data": [[1.66668198E12, 0.03333333333333333], [1.66668234E12, 0.08333333333333333], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.016666666666666666], [1.66668192E12, 0.05], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.06666666666666667]], "isOverall": false, "label": "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/catalog/fetchImage-67-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.08333333333333333], [1.66668246E12, 0.05]], "isOverall": false, "label": "Click Cart/css/images/SafePay.png-116-success", "isController": false}, {"data": [[1.66668234E12, 0.016666666666666666], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.06666666666666667], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/order/api/v1/carts/800075438-119-success", "isController": false}, {"data": [[1.66668198E12, 0.06666666666666667], [1.66668234E12, 0.06666666666666667], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.03333333333333333], [1.66668192E12, 0.016666666666666666], [1.6666824E12, 0.016666666666666666], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.05]], "isOverall": false, "label": "Launch/css/main.min.css-42-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/twitter.png-79-success", "isController": false}, {"data": [[1.6666821E12, 0.08333333333333333], [1.66668222E12, 0.03333333333333333], [1.6666824E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05]], "isOverall": false, "label": "Choose Item/app/views/product-page.html-107-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668222E12, 0.08333333333333333], [1.6666824E12, 0.05], [1.66668204E12, 0.08333333333333333]], "isOverall": false, "label": "Login/order/api/v1/carts/800075438-90-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/css/images/logo.png-56-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/linkedin.png-80-success", "isController": false}, {"data": [[1.66668234E12, 0.016666666666666666], [1.66668252E12, 0.016666666666666666], [1.6666821E12, 0.03333333333333333], [1.66668222E12, 0.05], [1.6666824E12, 0.06666666666666667], [1.66668204E12, 0.05], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-95-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.6666821E12, 0.05], [1.6666824E12, 0.016666666666666666], [1.66668228E12, 0.05], [1.66668246E12, 0.06666666666666667], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121-success", "isController": false}, {"data": [[1.66668198E12, 0.06666666666666667], [1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.016666666666666666], [1.66668222E12, 0.06666666666666667], [1.6666824E12, 0.05], [1.66668204E12, 0.016666666666666666], [1.66668246E12, 0.016666666666666666], [1.66668216E12, 0.016666666666666666]], "isOverall": false, "label": "Launch/css/images/Banner3.jpg-83-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668222E12, 0.08333333333333333], [1.6666824E12, 0.05], [1.66668204E12, 0.08333333333333333]], "isOverall": false, "label": "Login/css/main.min.css-88-success", "isController": false}, {"data": [[1.66668234E12, 0.03333333333333333], [1.66668252E12, 0.03333333333333333], [1.66668228E12, 0.05], [1.66668246E12, 0.05], [1.66668216E12, 0.08333333333333333]], "isOverall": false, "label": "Click Pay Now/order/api/v1/orders/users/800075438-130-success", "isController": false}, {"data": [[1.66668198E12, 0.08333333333333333], [1.66668234E12, 0.05], [1.66668222E12, 0.05], [1.6666824E12, 0.03333333333333333], [1.66668246E12, 0.03333333333333333], [1.66668216E12, 0.03333333333333333]], "isOverall": false, "label": "Launch/services.properties-52-success", "isController": false}, {"data": [[1.6666821E12, 0.06666666666666667], [1.66668222E12, 0.05], [1.6666824E12, 0.08333333333333333], [1.66668204E12, 0.016666666666666666], [1.66668228E12, 0.03333333333333333]], "isOverall": false, "label": "Click Item/catalog/fetchImage-102-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66668252E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.5666666666666667, "minX": 1.66668192E12, "maxY": 3.466666666666667, "series": [{"data": [[1.66668198E12, 2.8833333333333333], [1.66668234E12, 3.466666666666667], [1.66668252E12, 0.9666666666666667], [1.6666821E12, 2.2666666666666666], [1.66668222E12, 3.3666666666666667], [1.66668192E12, 0.5666666666666667], [1.6666824E12, 2.9], [1.66668204E12, 0.9666666666666667], [1.66668228E12, 2.3333333333333335], [1.66668246E12, 3.3], [1.66668216E12, 2.683333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66668252E12, "title": "Total Transactions Per Second"}},
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
