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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8876828692779613, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.52, 500, 1500, "/catalog/fetchImage-33"], "isController": false}, {"data": [0.575, 500, 1500, "Click Pay Now/order/api/v1/orders/users/800075438-130"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118"], "isController": false}, {"data": [0.775, 500, 1500, "Click Checkout/order/api/v1/carts/800075438-119"], "isController": false}, {"data": [0.47619047619047616, 500, 1500, "Click Item/css/images/category_banner_4.png-94"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/linkedin.png-80"], "isController": false}, {"data": [0.825, 500, 1500, "Click Cart/order/api/v1/carts/800075438-113"], "isController": false}, {"data": [0.625, 500, 1500, "Choose Item/catalog/api/v1/categories/4/products-105"], "isController": false}, {"data": [0.975, 500, 1500, "Choose Item/css/images/review_Left_disabled.png-110"], "isController": false}, {"data": [1.0, 500, 1500, "/catalog/fetchImage-36"], "isController": false}, {"data": [0.98, 500, 1500, "/catalog/fetchImage-37"], "isController": false}, {"data": [0.98, 500, 1500, "Launch/css/images/closeDark.png-57"], "isController": false}, {"data": [0.44, 500, 1500, "/catalog/fetchImage-34"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/logo.png-56"], "isController": false}, {"data": [0.74, 500, 1500, "/catalog/fetchImage-35"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/api/v1/deals/search-62"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74"], "isController": false}, {"data": [1.0, 500, 1500, "Click Cart/app/views/shoppingCart.html-114"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/accountservice/ws/GetAccountConfigurationRequest-59"], "isController": false}, {"data": [0.975, 500, 1500, "Click Checkout/accountservice/ws/GetAccountByIdRequest-117"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/app/views/home-page.html-65"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/chat_logo.png-76"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/facebook.png-78"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/twitter.png-79"], "isController": false}, {"data": [0.975, 500, 1500, "Choose Item/css/images/reviewUser.png-109"], "isController": false}, {"data": [1.0, 500, 1500, "Click Cart/css/images/Master_credit.png-115"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73"], "isController": false}, {"data": [0.9523809523809523, 500, 1500, "Click Item/catalog/fetchImage-100"], "isController": false}, {"data": [0.5, 500, 1500, "Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112"], "isController": false}, {"data": [0.5, 500, 1500, "Launch/vendor/requirejs/require.js-43"], "isController": false}, {"data": [1.0, 500, 1500, "Click Profile/treatment/get-139"], "isController": false}, {"data": [0.475, 500, 1500, "Click Profile/treatment/get-138"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/services.properties-52"], "isController": false}, {"data": [1.0, 500, 1500, "Login/css/images/FacebookLogo.png-87"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Popular-item3.jpg-84"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/order/api/v1/carts/800075438-131"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Popular-item1.jpg-86"], "isController": false}, {"data": [0.5, 500, 1500, "Choose Item/catalog/api/v1/categories/all_data-103"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/app/views/category-page.html-93"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/api/v1/categories-60"], "isController": false}, {"data": [0.9772727272727273, 500, 1500, "Click Item/catalog/fetchImage-96"], "isController": false}, {"data": [0.4772727272727273, 500, 1500, "Click Item/catalog/fetchImage-95"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Banner2.jpg-82"], "isController": false}, {"data": [0.5208333333333334, 500, 1500, "Launch/css/images/Banner1.jpg-81"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/offline/common/serviceworker.js-135"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Banner3.jpg-83"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/css/images/review_right.png-108"], "isController": false}, {"data": [0.48, 500, 1500, "Launch/css/main.min.css-42"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128"], "isController": false}, {"data": [0.5, 500, 1500, "Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/accountservice/ws/GetCountriesRequest-124"], "isController": false}, {"data": [1.0, 500, 1500, "Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111"], "isController": false}, {"data": [0.9772727272727273, 500, 1500, "Click Item/css/images/Filter.png-99"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/arrow_right.png-66"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/css/images/Bell.png-123"], "isController": false}, {"data": [0.9, 500, 1500, "Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129"], "isController": false}, {"data": [0.5, 500, 1500, "Launch/main.min.js-49"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/css/images/Shipex.png-127"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/order/api/v1/shippingcost/-120"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/GoUp.png-77"], "isController": false}, {"data": [0.9545454545454546, 500, 1500, "Click Item/catalog/fetchImage-98"], "isController": false}, {"data": [1.0, 500, 1500, "Click Item/catalog/fetchImage-102"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/catalog/fetchImage-67"], "isController": false}, {"data": [0.9285714285714286, 500, 1500, "Click Item/catalog/fetchImage-97"], "isController": false}, {"data": [0.975, 500, 1500, "Click Item/catalog/fetchImage-101"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "Launch/catalog/fetchImage-68"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "Launch/catalog/fetchImage-69"], "isController": false}, {"data": [0.775, 500, 1500, "Choose Item/catalog/api/v1/products/20-104"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/css/images/Check.png-125"], "isController": false}, {"data": [1.0, 500, 1500, "Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134"], "isController": false}, {"data": [0.5, 500, 1500, "Choose Item/treatment/get-106"], "isController": false}, {"data": [0.6136363636363636, 500, 1500, "Click Item/catalog/api/v1/categories/4/products-91"], "isController": false}, {"data": [1.0, 500, 1500, "Click Cart/css/images/SafePay.png-116"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Down_arrow.svg-44"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/images/Special-offer.jpg-75"], "isController": false}, {"data": [0.8181818181818182, 500, 1500, "Click Item/catalog/api/v1/categories/attributes-92"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/app/order/views/orderPayment-page.html-122"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/app/tempFiles/popularProducts.json-64"], "isController": false}, {"data": [0.7291666666666666, 500, 1500, "Launch/catalog/fetchImage-70"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "Launch/css/images/Popular-item2.jpg-85"], "isController": false}, {"data": [0.9375, 500, 1500, "Launch/catalog/fetchImage-71"], "isController": false}, {"data": [1.0, 500, 1500, "Login/accountservice/ws/AccountLoginRequest-89"], "isController": false}, {"data": [1.0, 500, 1500, "Click Checkout/css/images/User.jpg-126"], "isController": false}, {"data": [1.0, 500, 1500, "Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54"], "isController": false}, {"data": [0.65, 500, 1500, "Click Logout/accountservice/ws/AccountLogoutRequest-141"], "isController": false}, {"data": [1.0, 500, 1500, "/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39"], "isController": false}, {"data": [0.4791666666666667, 500, 1500, "Login/css/main.min.css-88"], "isController": false}, {"data": [0.975, 500, 1500, "Choose Item/app/views/product-page.html-107"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "Login/order/api/v1/carts/800075438-90"], "isController": false}, {"data": [0.92, 500, 1500, "Launch/-41"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2119, 0, 0.0, 410.4667295894282, 17, 8142, 308.0, 778.0, 985.0, 1371.6000000000022, 3.527081460767669, 128.35908533749875, 2.6585377160732717], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/catalog/fetchImage-33", 25, 0, 0.0, 581.56, 311, 761, 572.0, 702.8000000000001, 747.5, 761.0, 0.04342592319170113, 2.7269240615223738, 0.02692916135422873], "isController": false}, {"data": ["Click Pay Now/order/api/v1/orders/users/800075438-130", 20, 0, 0.0, 597.8000000000001, 465, 1542, 516.5, 892.6000000000006, 1510.9499999999996, 1542.0, 0.04484948512791073, 0.03157859255588246, 0.07634048103315275], "isController": false}, {"data": ["Launch/css/fonts/roboto_light_macroman/Roboto-Light-webfont.woff-53", 24, 0, 0.0, 284.16666666666674, 251, 358, 274.5, 333.5, 357.0, 358.0, 0.0428003559562937, 1.0437184458834081, 0.027293586366659947], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetAccountByIdNewRequest-118", 20, 0, 0.0, 304.45000000000005, 282, 376, 306.0, 319.40000000000003, 373.19999999999993, 376.0, 0.044437334470929096, 0.07867664784745551, 0.0551127097442187], "isController": false}, {"data": ["Click Checkout/order/api/v1/carts/800075438-119", 20, 0, 0.0, 509.3499999999999, 412, 1138, 489.5, 527.6, 1107.4999999999995, 1138.0, 0.04442045739744982, 0.03294444958055983, 0.027806165226333335], "isController": false}, {"data": ["Click Item/css/images/category_banner_4.png-94", 21, 0, 0.0, 1019.2380952380952, 518, 8142, 598.0, 1178.4, 7448.69999999999, 8142.0, 0.03772913713463373, 17.0401953004991, 0.023285951825281755], "isController": false}, {"data": ["Launch/css/images/linkedin.png-80", 24, 0, 0.0, 299.74999999999994, 253, 383, 301.0, 370.5, 380.5, 383.0, 0.04270607013404368, 0.08778933362515814, 0.02598230634131759], "isController": false}, {"data": ["Click Cart/order/api/v1/carts/800075438-113", 20, 0, 0.0, 495.49999999999994, 419, 924, 466.0, 539.3000000000001, 904.8499999999997, 924.0, 0.043573744204692025, 0.03232499490731865, 0.027276142612507406], "isController": false}, {"data": ["Choose Item/catalog/api/v1/categories/4/products-105", 20, 0, 0.0, 530.95, 469, 717, 518.5, 613.3000000000001, 711.9499999999999, 717.0, 0.04399046286765029, 0.10360956869550682, 0.025861580709302223], "isController": false}, {"data": ["Choose Item/css/images/review_Left_disabled.png-110", 20, 0, 0.0, 315.5000000000001, 251, 826, 277.5, 394.50000000000006, 804.5999999999997, 826.0, 0.04401098514189142, 0.06382452435127808, 0.027291968325293993], "isController": false}, {"data": ["/catalog/fetchImage-36", 25, 0, 0.0, 287.32, 253, 359, 289.0, 330.00000000000006, 353.9, 359.0, 0.04344690353918476, 3.909695203679084, 0.026814885778090596], "isController": false}, {"data": ["/catalog/fetchImage-37", 25, 0, 0.0, 316.35999999999996, 255, 608, 307.0, 359.0, 534.1999999999998, 608.0, 0.043449470872343715, 2.568613910826044, 0.027071057047417278], "isController": false}, {"data": ["Launch/css/images/closeDark.png-57", 25, 0, 0.0, 293.72, 251, 512, 290.0, 316.6, 454.09999999999985, 512.0, 0.042596694496507076, 0.0622311083659908, 0.025957360708808996], "isController": false}, {"data": ["/catalog/fetchImage-34", 25, 0, 0.0, 996.56, 756, 1652, 880.0, 1538.2000000000003, 1631.8999999999999, 1652.0, 0.0433499450322697, 2.043167577232262, 0.02688204599169068], "isController": false}, {"data": ["Launch/css/images/logo.png-56", 24, 0, 0.0, 303.33333333333337, 248, 360, 307.0, 356.0, 359.0, 360.0, 0.042800126973710016, 0.12718826795019492, 0.025872342379615727], "isController": false}, {"data": ["/catalog/fetchImage-35", 25, 0, 0.0, 459.7199999999999, 259, 712, 508.0, 638.2, 698.5, 712.0, 0.04341634538571081, 9.726836904870444, 0.026965620766906322], "isController": false}, {"data": ["Launch/catalog/api/v1/deals/search-62", 24, 0, 0.0, 345.9583333333333, 339, 374, 345.0, 349.5, 368.0, 374.0, 0.042805623232038584, 0.032731252920592, 0.02554124589333552], "isController": false}, {"data": ["Launch/css/fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff-74", 24, 0, 0.0, 306.16666666666674, 250, 376, 306.0, 371.0, 375.25, 376.0, 0.04273778233647456, 1.0575514322499306, 0.0271702112314892], "isController": false}, {"data": ["Click Cart/app/views/shoppingCart.html-114", 20, 0, 0.0, 286.6000000000001, 251, 320, 298.5, 316.40000000000003, 319.85, 320.0, 0.04359834587875736, 0.08187462805161172, 0.024226033989270448], "isController": false}, {"data": ["Launch/css/fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff-50", 25, 0, 0.0, 288.44, 253, 377, 280.0, 334.0000000000001, 371.3, 377.0, 0.04265192616098543, 1.0585924837709422, 0.02736554246852288], "isController": false}, {"data": ["Launch/accountservice/ws/GetAccountConfigurationRequest-59", 24, 0, 0.0, 307.5416666666667, 265, 361, 305.0, 352.5, 359.5, 361.0, 0.04281112090217302, 0.0656381443519645, 0.050378320983514156], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetAccountByIdRequest-117", 20, 0, 0.0, 325.2, 282, 513, 302.0, 418.4000000000001, 508.49999999999994, 513.0, 0.044431115109911476, 0.08165952991880214, 0.054584319148699836], "isController": false}, {"data": ["Launch/app/views/home-page.html-65", 24, 0, 0.0, 277.12499999999994, 250, 311, 277.0, 309.0, 310.75, 311.0, 0.042807073868956845, 0.11249398025523719, 0.023660941220536694], "isController": false}, {"data": ["Launch/css/images/chat_logo.png-76", 24, 0, 0.0, 302.16666666666663, 252, 354, 305.5, 351.5, 353.75, 354.0, 0.042746688467477784, 0.14197410886512885, 0.026048763284869277], "isController": false}, {"data": ["Launch/css/images/facebook.png-78", 24, 0, 0.0, 294.29166666666663, 249, 405, 304.0, 358.0, 395.75, 405.0, 0.042730401434317146, 0.08266496605603738, 0.02599710946638631], "isController": false}, {"data": ["Launch/css/images/twitter.png-79", 24, 0, 0.0, 298.3333333333333, 248, 408, 307.0, 370.5, 404.0, 408.0, 0.04272264282268501, 0.10271791663032274, 0.02595066780831062], "isController": false}, {"data": ["Choose Item/css/images/reviewUser.png-109", 20, 0, 0.0, 304.54999999999995, 251, 775, 263.5, 353.90000000000003, 754.0499999999997, 775.0, 0.044017474937550205, 0.08339248181528067, 0.02686613460543836], "isController": false}, {"data": ["Click Cart/css/images/Master_credit.png-115", 20, 0, 0.0, 294.29999999999995, 253, 344, 306.0, 337.90000000000003, 343.75, 344.0, 0.04360290831398454, 0.08724839759311946, 0.02674084611443583], "isController": false}, {"data": ["Launch/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL-55", 24, 0, 0.0, 291.25000000000006, 253, 359, 304.5, 322.5, 351.0, 359.0, 0.04280050861271068, 0.2914809377234766, 0.02578897833402587], "isController": false}, {"data": ["Launch/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-73", 24, 0, 0.0, 303.125, 252, 365, 305.0, 355.0, 362.75, 365.0, 0.0427565123512875, 1.052336309364745, 0.02718211869207829], "isController": false}, {"data": ["Click Item/catalog/fetchImage-100", 21, 0, 0.0, 368.0476190476191, 254, 1361, 303.0, 768.0000000000003, 1312.0999999999992, 1361.0, 0.03770935425424365, 1.873951839879797, 0.023273742078791005], "isController": false}, {"data": ["Click Add to Cart/order/api/v1/carts/800075438/product/20/color/414141?quantity=1-112", 20, 0, 0.0, 720.9499999999998, 528, 1257, 631.0, 1249.1000000000001, 1257.0, 1257.0, 0.04401137253866399, 0.036700499033950375, 0.03580222004365928], "isController": false}, {"data": ["Launch/vendor/requirejs/require.js-43", 25, 0, 0.0, 582.32, 503, 713, 597.0, 654.2, 701.3, 713.0, 0.0426703442814058, 0.8954388415556243, 0.02362703633550497], "isController": false}, {"data": ["Click Profile/treatment/get-139", 20, 0, 0.0, 282.1500000000001, 246, 361, 265.0, 334.8, 359.75, 361.0, 0.04545206625093177, 0.032579899050960856, 0.11087818505354254], "isController": false}, {"data": ["Click Profile/treatment/get-138", 20, 0, 0.0, 1196.2, 1009, 2081, 1132.0, 1466.1000000000006, 2051.45, 2081.0, 0.04535404501388968, 0.03250963773456545, 0.11063906684052384], "isController": false}, {"data": ["Launch/services.properties-52", 25, 0, 0.0, 293.9200000000001, 251, 402, 302.0, 330.40000000000003, 383.4, 402.0, 0.04261542814868352, 0.05734771483289638, 0.023097229123554056], "isController": false}, {"data": ["Login/css/images/FacebookLogo.png-87", 24, 0, 0.0, 300.79166666666663, 251, 450, 278.0, 378.5, 432.75, 450.0, 0.04279562414743092, 0.05963804263514056, 0.02687264289726376], "isController": false}, {"data": ["Launch/css/images/Popular-item3.jpg-84", 24, 0, 0.0, 297.625, 252, 433, 304.5, 371.5, 418.5, 433.0, 0.04269156058999737, 1.0997662859409576, 0.026181933643084323], "isController": false}, {"data": ["Click Pay Now/order/api/v1/carts/800075438-131", 20, 0, 0.0, 346.65, 335, 379, 342.0, 369.6, 378.6, 379.0, 0.04490416328949938, 0.027451177948463492, 0.03385352935497415], "isController": false}, {"data": ["Launch/css/images/Popular-item1.jpg-86", 24, 0, 0.0, 296.95833333333337, 253, 406, 302.5, 361.0, 395.5, 406.0, 0.042567305117122166, 1.7932308673265782, 0.02610573009136008], "isController": false}, {"data": ["Choose Item/catalog/api/v1/categories/all_data-103", 20, 0, 0.0, 844.25, 779, 921, 835.5, 898.7, 919.9, 921.0, 0.04396425705901102, 0.38269726556059924, 0.025760306870514272], "isController": false}, {"data": ["Click Pay Now/static/offline/client/js/2561097574-offline_sw_bin_offline_main.js-136", 20, 0, 0.0, 24.199999999999996, 17, 31, 24.0, 29.900000000000002, 30.95, 31.0, 0.04493836702961888, 3.246094855905126, 0.029008066998611408], "isController": false}, {"data": ["Click Item/app/views/category-page.html-93", 22, 0, 0.0, 298.2272727272727, 250, 460, 283.5, 392.49999999999994, 452.3499999999999, 460.0, 0.03949255655064831, 0.04450626001899233, 0.021983161361200716], "isController": false}, {"data": ["Launch/catalog/api/v1/categories-60", 24, 0, 0.0, 340.875, 330, 360, 340.0, 346.5, 356.75, 360.0, 0.042806081317285805, 0.20519259503841847, 0.024705462947769447], "isController": false}, {"data": ["Click Item/catalog/fetchImage-96", 22, 0, 0.0, 338.8636363636364, 255, 1427, 273.0, 399.7, 1274.299999999998, 1427.0, 0.03945791992194506, 2.0982845361048934, 0.024352934951825465], "isController": false}, {"data": ["Click Item/catalog/fetchImage-95", 22, 0, 0.0, 919.8636363636364, 759, 2026, 847.0, 1181.8999999999999, 1909.5999999999983, 2026.0, 0.03942101283333154, 1.8176660145400823, 0.02433015635807181], "isController": false}, {"data": ["Launch/css/images/Banner2.jpg-82", 24, 0, 0.0, 290.25000000000006, 252, 369, 302.0, 332.5, 364.75, 369.0, 0.04270097927579139, 3.565031367427693, 0.02593750889603735], "isController": false}, {"data": ["Launch/css/images/Banner1.jpg-81", 24, 0, 0.0, 875.75, 263, 3781, 616.0, 1925.5, 3323.25, 3781.0, 0.042551531677842355, 20.643352010205273, 0.025846731155876896], "isController": false}, {"data": ["Click Pay Now/offline/common/serviceworker.js-135", 20, 0, 0.0, 300.2, 275, 395, 301.0, 325.40000000000003, 391.59999999999997, 395.0, 0.044909809874319896, 0.09660214132780344, 0.030480779162746417], "isController": false}, {"data": ["Launch/css/images/Banner3.jpg-83", 24, 0, 0.0, 312.625, 255, 409, 305.0, 392.5, 408.25, 409.0, 0.04267577083111064, 2.8696538594900245, 0.02592219673530353], "isController": false}, {"data": ["Choose Item/css/images/review_right.png-108", 20, 0, 0.0, 284.25, 251, 363, 274.0, 313.7, 360.54999999999995, 363.0, 0.04401921879092412, 0.06332061453030394, 0.026953174005770922], "isController": false}, {"data": ["Launch/css/main.min.css-42", 25, 0, 0.0, 644.3200000000002, 507, 1511, 605.0, 828.4000000000005, 1356.7999999999997, 1511.0, 0.042606712772810786, 1.2730985635998924, 0.02371662722705288], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetAccountPaymentPreferencesRequest-121", 20, 0, 0.0, 312.9, 288, 416, 303.0, 387.70000000000016, 414.9, 416.0, 0.04443940797820691, 0.04454356284065584, 0.05702478719078505], "isController": false}, {"data": ["Click Checkout/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSsQEJ0tKb5yhiIOgSBQ3njUAOEgUNzkFMehIFDXhvEhkSBQ0PFr4rEgUN77-NcxIFDQCgC8oSBQ1zED5aEgUNRS1WTBIFDUZnFX0SBQ2U1FseEgUNbtcpCxIFDYyqZn0SBQ2wnA4MEgUNftzV1BIFDaOKs4QSBQ0ZLMSKEgUNNzxzBBIFDZOoA5USBQ1e6_S9EgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-128", 20, 0, 0.0, 71.85, 60, 92, 72.0, 80.7, 91.44999999999999, 92.0, 0.0444670732439397, 0.032351532780014715, 0.03838759057386981], "isController": false}, {"data": ["Click P/v3/user/oranonymous?field=frontend_primaryLanguage&field=frontend_soundFluent&field=frontend_role&containerId=ND3BsujF1Vrx-137", 20, 0, 0.0, 1144.05, 1008, 1214, 1146.0, 1212.7, 1213.95, 1214.0, 0.04483922894461907, 0.07864380389114829, 0.038489924064765785], "isController": false}, {"data": ["Click Checkout/accountservice/ws/GetCountriesRequest-124", 20, 0, 0.0, 291.3, 257, 385, 287.0, 331.20000000000005, 382.4, 385.0, 0.04444612352022188, 0.2170654919185836, 0.05039252871775156], "isController": false}, {"data": ["Choose Item/v1/pages/ChVDaHJvbWUvMTA2LjAuNTI0OS4xMTkSTwlUzTP1oFGzihIFDeeNQA4SBQ3OQUx6EgUNeG8SGRIFDQ8WvisSBQ3yF2yJEgUNn-7I_xIFDZMEC9ASBQ3rSLtwEgUNxlbcmhIFDZ9DYl4=-111", 20, 0, 0.0, 105.35, 91, 133, 102.5, 124.9, 132.6, 133.0, 0.04404005883751861, 0.028600233522411984, 0.03234191820880273], "isController": false}, {"data": ["Click Item/css/images/Filter.png-99", 22, 0, 0.0, 309.6363636363637, 251, 882, 274.0, 346.4, 803.9999999999989, 882.0, 0.03948780724206385, 0.06991347122056812, 0.023947195602853175], "isController": false}, {"data": ["Launch/css/images/arrow_right.png-66", 24, 0, 0.0, 290.29166666666663, 251, 365, 302.0, 348.0, 361.25, 365.0, 0.042803027600818964, 0.058185365644863284, 0.026835491913794703], "isController": false}, {"data": ["Click Checkout/css/images/Bell.png-123", 20, 0, 0.0, 286.24999999999994, 250, 429, 259.5, 356.00000000000006, 425.44999999999993, 429.0, 0.044446419840881816, 0.07452588170585359, 0.027561988866171828], "isController": false}, {"data": ["Click Pay Now/accountservice/ws/UpdateSafePayMethodRequest-129", 20, 0, 0.0, 388.54999999999995, 266, 931, 301.0, 789.0000000000002, 924.4999999999999, 931.0, 0.04488501581074682, 0.0514161362753965, 0.061190900460744685], "isController": false}, {"data": ["Launch/main.min.js-49", 25, 0, 0.0, 926.4000000000001, 784, 1338, 923.0, 1033.0, 1247.3999999999999, 1338.0, 0.042573119332453495, 11.183572629741581, 0.02290799682830261], "isController": false}, {"data": ["Click Checkout/css/images/Shipex.png-127", 20, 0, 0.0, 281.54999999999995, 252, 351, 260.5, 344.6000000000001, 350.85, 351.0, 0.04445807825510934, 0.1123608462150615, 0.02696139316056924], "isController": false}, {"data": ["Click Checkout/order/api/v1/shippingcost/-120", 20, 0, 0.0, 300.7, 267, 368, 304.5, 315.7, 365.4, 368.0, 0.0444416791844063, 0.029772453047365942, 0.04188107462202351], "isController": false}, {"data": ["Launch/css/images/GoUp.png-77", 24, 0, 0.0, 291.45833333333337, 251, 367, 305.0, 352.5, 363.5, 367.0, 0.04274303422114178, 0.10485400582373841, 0.02583783025672535], "isController": false}, {"data": ["Click Item/catalog/fetchImage-98", 22, 0, 0.0, 354.6363636363636, 254, 1500, 302.0, 478.19999999999993, 1352.8499999999979, 1500.0, 0.039442498216123376, 1.9309823652814582, 0.024343416867763645], "isController": false}, {"data": ["Click Item/catalog/fetchImage-102", 20, 0, 0.0, 297.45000000000005, 253, 380, 304.5, 356.5, 378.84999999999997, 380.0, 0.04380748363242893, 2.53298592287583, 0.02703743130438973], "isController": false}, {"data": ["Launch/catalog/fetchImage-67", 24, 0, 0.0, 304.2916666666668, 254, 364, 307.0, 357.5, 362.5, 364.0, 0.04279425059243291, 2.687348687776714, 0.026537450318549705], "isController": false}, {"data": ["Click Item/catalog/fetchImage-97", 21, 0, 0.0, 356.6666666666666, 253, 1484, 267.0, 523.0, 1388.1999999999987, 1484.0, 0.03827018752391887, 2.6984059356377452, 0.023619881362418674], "isController": false}, {"data": ["Click Item/catalog/fetchImage-101", 20, 0, 0.0, 300.79999999999995, 254, 611, 301.5, 317.3, 596.3499999999998, 611.0, 0.04381237787299668, 3.047469633230155, 0.027040451968490135], "isController": false}, {"data": ["Launch/catalog/fetchImage-68", 24, 0, 0.0, 346.25000000000006, 256, 1374, 306.5, 383.5, 1132.0, 1374.0, 0.04280027962849357, 2.017156489302605, 0.026541189027434978], "isController": false}, {"data": ["Launch/catalog/fetchImage-69", 24, 0, 0.0, 314.875, 255, 784, 305.0, 370.5, 685.25, 784.0, 0.042759940349883216, 3.8479231168477726, 0.026390900684693543], "isController": false}, {"data": ["Choose Item/catalog/api/v1/products/20-104", 20, 0, 0.0, 617.0, 339, 1019, 378.0, 980.3000000000001, 1017.15, 1019.0, 0.04401214735266934, 0.043470591633290784, 0.02544452268826196], "isController": false}, {"data": ["Click Checkout/css/images/Check.png-125", 20, 0, 0.0, 280.0499999999999, 249, 332, 274.0, 316.0, 331.25, 332.0, 0.04444869176387966, 0.15396436492820426, 0.027606804650222132], "isController": false}, {"data": ["Click Pay Now/batch/drive/v2internal?%24ct=multipart%2Fmixed%3B%20boundary%3D%22%3D%3D%3D%3D%3Dmznc1rypis9v%3D%3D%3D%3D%3D%22&key=AIzaSyDrRZPb_oNAJLpNm167axWK5i85cuYG_HQ-134", 20, 0, 0.0, 291.0499999999999, 258, 393, 275.0, 373.50000000000006, 392.2, 393.0, 0.044911020041542696, 0.05917158465727278, 0.1295139083815191], "isController": false}, {"data": ["Choose Item/treatment/get-106", 20, 0, 0.0, 1163.9, 1033, 1331, 1152.0, 1294.3000000000002, 1329.35, 1331.0, 0.04392447625552625, 0.03145275606871545, 0.1071517008655318], "isController": false}, {"data": ["Click Item/catalog/api/v1/categories/4/products-91", 22, 0, 0.0, 593.4090909090909, 463, 1103, 549.0, 941.4999999999998, 1093.3999999999999, 1103.0, 0.039487736365512845, 0.09289994794798388, 0.023214470011756576], "isController": false}, {"data": ["Click Cart/css/images/SafePay.png-116", 20, 0, 0.0, 299.6, 251, 409, 305.5, 384.80000000000007, 407.95, 409.0, 0.04360794711228174, 0.2149735517800764, 0.026488420999843013], "isController": false}, {"data": ["Launch/css/images/Down_arrow.svg-44", 25, 0, 0.0, 293.32000000000005, 249, 363, 300.0, 358.6, 362.4, 363.0, 0.04270015269574604, 0.049830744600992696, 0.026062104916837185], "isController": false}, {"data": ["Launch/css/images/Special-offer.jpg-75", 24, 0, 0.0, 295.04166666666663, 251, 361, 306.0, 344.5, 359.75, 361.0, 0.0427142788494909, 3.388235086042575, 0.026195866325664337], "isController": false}, {"data": ["Click Item/catalog/api/v1/categories/attributes-92", 22, 0, 0.0, 477.3636363636363, 418, 616, 461.0, 532.1, 603.5499999999998, 616.0, 0.039487948995929154, 0.037945450988275675, 0.023214595015184913], "isController": false}, {"data": ["Click Checkout/app/order/views/orderPayment-page.html-122", 20, 0, 0.0, 296.75, 250, 379, 305.5, 361.90000000000003, 378.25, 379.0, 0.04444483950968453, 0.059549140436803885, 0.025173834878532253], "isController": false}, {"data": ["Launch/app/tempFiles/popularProducts.json-64", 24, 0, 0.0, 270.125, 251, 343, 255.0, 325.5, 341.5, 343.0, 0.042811197268645615, 0.04034453648851857, 0.025084685899597038], "isController": false}, {"data": ["Launch/catalog/fetchImage-70", 24, 0, 0.0, 557.7499999999999, 260, 2835, 463.5, 757.5, 2325.75, 2835.0, 0.04271906872430181, 9.570870476117372, 0.02653254659048433], "isController": false}, {"data": ["Launch/css/images/Popular-item2.jpg-85", 24, 0, 0.0, 305.3333333333333, 251, 638, 283.5, 392.0, 581.25, 638.0, 0.042683588338132274, 1.1874707661881954, 0.02617704441049518], "isController": false}, {"data": ["Launch/catalog/fetchImage-71", 24, 0, 0.0, 404.33333333333337, 256, 2564, 308.0, 450.5, 2054.75, 2564.0, 0.042794708434302095, 2.5299062851607563, 0.026663109356528065], "isController": false}, {"data": ["Login/accountservice/ws/AccountLoginRequest-89", 24, 0, 0.0, 359.5, 322, 448, 346.5, 443.5, 447.5, 448.0, 0.042774039009923576, 0.06440472572929737, 0.05208908852087373], "isController": false}, {"data": ["Click Checkout/css/images/User.jpg-126", 20, 0, 0.0, 279.4, 253, 356, 260.5, 340.4000000000001, 355.4, 356.0, 0.04444997599701296, 0.22971608689081308, 0.026869663224756857], "isController": false}, {"data": ["Launch/css/fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff-54", 24, 0, 0.0, 297.95833333333326, 252, 456, 302.0, 360.5, 433.5, 456.0, 0.04279638727164115, 1.0633481263206699, 0.027374642248950153], "isController": false}, {"data": ["Click Logout/accountservice/ws/AccountLogoutRequest-141", 20, 0, 0.0, 756.4, 340, 1001, 897.0, 988.8000000000001, 1000.45, 1001.0, 0.045262693356568184, 0.05100009335430505, 0.055429118622203614], "isController": false}, {"data": ["/css/fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff-39", 25, 0, 0.0, 289.2800000000001, 251, 400, 300.0, 339.40000000000003, 385.59999999999997, 400.0, 0.043409334395993836, 1.0684037644357742, 0.027597145206828114], "isController": false}, {"data": ["Login/css/main.min.css-88", 24, 0, 0.0, 665.25, 501, 1838, 586.0, 974.5, 1660.25, 1838.0, 0.0427618450310736, 1.2777832977801256, 0.02639207623011574], "isController": false}, {"data": ["Choose Item/app/views/product-page.html-107", 20, 0, 0.0, 320.99999999999994, 252, 816, 305.0, 383.30000000000007, 794.5999999999997, 816.0, 0.04399830166555571, 0.12108126376321875, 0.0244482750465832], "isController": false}, {"data": ["Login/order/api/v1/carts/800075438-90", 24, 0, 0.0, 382.7916666666667, 326, 572, 353.5, 496.5, 556.5, 572.0, 0.04275559831115387, 0.02620033001977446, 0.0267640024584469], "isController": false}, {"data": ["Launch/-41", 25, 0, 0.0, 380.08000000000004, 252, 1840, 259.0, 807.2000000000002, 1546.8999999999992, 1840.0, 0.04270598806282222, 0.1361253369502458, 0.02798409959975948], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2119, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
